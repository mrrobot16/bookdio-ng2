import { Component,  OnInit } from '@angular/core';
import { BookFormComponent } from './book_form/book_form.component'
import { BookService } from '../../services/book.service';
import { SharedService } from '../../services/shared.service';
import { HelperService } from '../../helpers/helper.service';

@Component({
  selector: 'books',
  templateUrl: './book.component.html',
  // styleUrls: ['./css/stylesheet.css','./css/mobile.css']
  styleUrls: ['./book.scss']
})
export class BookComponent implements OnInit {
  book_id:number
  books = []
  current_books = []
  page_number = 1
  all_books = []

  constructor(private book_service: BookService, private shared_service: SharedService, private helper_service: HelperService ){

  }

  ngOnInit(){
    this.setBookID(0)
    this.displayBooks()
  }

  displayBooks(){
    let books = this.book_service.getBooks()
    books.subscribe((books)=>{
      this.books = books.sort((a,b)=>{
        return b.book_issued - a.book_issued
      })
      this.current_books = books
      this.setBookPage(this.page_number)
    }, this.helper_service.logError)
  }

  selectBookID(selected_book){
    this.all_books = [].slice.call(selected_book.event.target.parentElement.parentElement.children)
    this.all_books.forEach((book)=>{
      book.classList.contains('selectedBook') && book != selected_book.event.target.parentElement ? this.setBookID(0) : this.helper_service.returnNone();
    })
    if(selected_book.event.target.parentElement.classList.contains('selectedBook')){
      selected_book.event.target.parentElement.classList.remove('selectedBook')
      this.setBookID(0)
    }
    else {
      this.unSelectBooks(this.all_books)
      selected_book.event.target.parentElement.classList.add('selectedBook')
      this.setBookID(selected_book.id)
    }
  }

  setBookID(id){
      this.book_id = id
      this.emitBookChange(this.book_id)
      this.shared_service.setBookID(this.book_id)
  }

  emitBookChange(id){
    this.shared_service.pushBookID(id);
  }

  unSelectBooks(books){
    if(books){
      let promise;
      // let promise = new Promise( (r,e)=>{
      //   books.forEach((book)=>{
      //     if (book.classList.contains('selectedBook')){
      //       book.classList.remove('selectedBook')
      //     }
      //   })
      // }, this.helper_service.logError)
      return promise;
    }
    else {
      this.all_books.forEach((book)=>{
        if(book.classList.contains('selectedBook')){
            book.classList.remove('selectedBook')
            this.setBookID(0)
        }
      })
    }
  }

  setBookPage(page_number){
    if(page_number === 1){
      this.page_number = 1
      this.current_books = this.books.slice(0,10)
    }
    else {
      this.page_number = page_number
      this.current_books = this.books.slice((page_number-1)*10, page_number*10)
    }
  }

  paginateBooks(state){
    this.setBookID(0)
    if(state=='previous'){
      if(this.page_number < 2){
        this.page_number = 1
        return
      }
      this.setBookPage(this.page_number-1)
    }
    if(state=="next"){
      if(this.current_books.length < 9){
        return;
      }
      else {
        this.setBookPage(this.page_number+1)
      }
    }
  }
}
