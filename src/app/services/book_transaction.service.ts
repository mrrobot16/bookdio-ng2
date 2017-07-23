import { Injectable } from '@angular/core';
import { Http} from '@angular/http';
import { BOOK_BASE } from '../constants/http.constants'
import 'rxjs/add/operator/map';
declare var Headers, Request, fetch
@Injectable()
export class BookTransactionService {
  book_transactions_endpoint = BOOK_BASE+'/books/:book_id/book_transactions';
  update_book_transaction = BOOK_BASE+'/books/:book_id/book_transactions/:id';
  constructor(private http: Http) {
  }

  getBookTransactions(id){
    let all_book_transactions = this.http.get(BOOK_BASE+'/books/'+id+'/book_transactions', {headers: new Headers({ 'Content-Type' : 'application/json; charset=utf-8'})}).map((res)=>{
      return res.json()
    })
    return all_book_transactions;
  }

  postBookTransaction(book){
    let request = new Request(BOOK_BASE+'/books/'+book.book.id+'/book_transactions', {method:"POST", mode:"cors", headers: new Headers({"Content-Type":"application/json"}), body:JSON.stringify(book)});
    return fetch(request).then((res)=>{return res.json()}).then((res)=> { res }, (error)=>{console.log("Error occurred: ", error)});
  }

  updateBookTransaction(book_transaction){
    let book = {
      book_transaction: {
        id:book_transaction.id
      }
    }
    let endpoint = BOOK_BASE+'/books/'+book_transaction.book_id+'/book_transactions/'+book_transaction.id
    let request = new Request(endpoint, {method:"PUT", mode:"cors", headers: new Headers({"Content-Type":"application/json"}), body:JSON.stringify(book)})
    return fetch(request).then((res)=>{return res.json()}).then((res)=> {res}, (error)=>{console.log("Error occurred: ", error)});
  }

}
