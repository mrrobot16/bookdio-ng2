import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookTransactionService } from '../../services/book_transaction.service';
import { BookService } from '../../services/book.service';
import { SharedService } from '../../services/shared.service';
import { HelperService } from '../../helpers/helper.service';

@Component({
  selector: 'book-transactions',
  templateUrl: './book_transaction.component.html',
  // styleUrls: ['./css/stylesheet.css']
})
export class BookTransactionComponent implements OnInit {
  book = {}
  page_number = 1
  book_transactions = []
  current_book_transactions = []
  book_id:any
  zero_transaction_message:boolean
  constructor(
    private book_service: BookService, private book_transaction_service: BookTransactionService,
    private shared_service: SharedService, private router: ActivatedRoute, private helper_service: HelperService){

  }

  ngOnInit(){
    this.book_id = parseInt(this.router.snapshot.params["id"])
    this.getBook(this.book_id)
    this.getBookTransactions(this.book_id)
    this.zero_transaction_message = false;
  }

  getBook(id){
    if(id){
      let book = this.book_service.getBook(id)
      book.subscribe((book)=>{
        this.book = book;
      })
    }
  }

  getBookTransactions(id){
    if(id){
      let book_transactions = this.book_transaction_service.getBookTransactions(id)
      book_transactions.subscribe((book_transactions)=>{
        this.book_transactions = book_transactions
        this.current_book_transactions = this.book_transactions
        this.setBookTransactionPage(this.page_number)
        if(this.book_transactions.length === 0){
          this.zero_transaction_message = true
        }
        return;
      }, this.helper_service.logError)
    }
  }

  returnBookIssue(book_transaction){
    this.book_transaction_service.updateBookTransaction(book_transaction).then(()=>{
      this.getBookTransactions(this.book_id)
    })
  }
  paginateBooks(state){
    if (state=='previous'){
      if(this.page_number < 2){
        this.page_number = 1
        return
      }
      this.setBookTransactionPage(this.page_number-1)
    }
    if (state=='next') {
      if(this.current_book_transactions.length < 9){
        return;
      }
      else {
        this.setBookTransactionPage(this.page_number+1)
      }
    }
  }

  setBookTransactionPage(page_number){
    if(page_number === 1){
      this.page_number = 1
      // console.log(this.current_book_transactions.length);
      this.current_book_transactions = this.book_transactions.slice(0,10)
      // console.log(this.current_book_transactions.length);
    }
    else {
      this.page_number = page_number
      this.current_book_transactions = this.book_transactions.slice((page_number-1)*10, page_number*10)
    }
  }
}
