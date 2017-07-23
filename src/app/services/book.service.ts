import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BOOK_BASE } from '../constants/http.constants'
import 'rxjs/add/operator/map';
declare var Headers, Request, fetch
@Injectable()
export class BookService {
  books_endpoint = BOOK_BASE+'/books';
  // books_endpoint = "http://bookdio.herokuapp.com/books"
  constructor(private http: Http) {
  }

  getBooks(){
    let all_books = this.http.get(this.books_endpoint, {headers: new Headers({ 'Content-Type' : 'application/json; charset=utf-8'})}).map((res)=>{
      return res.json()
    });
    return all_books
  }

  getBook(id){
    let book = this.http.get(this.books_endpoint+'/'+id, {headers: new Headers({ 'Content-Type' : 'application/json; charset=utf-8'})}).map((res)=>{
      return res.json()
    });
    return book
  }

  postBook(book){
    let book_params = {
      book: {
        book_name: book.book_name,
        author_name:book.author_name,
        isbn_code:book.isbn_code,
        book_category:book.book_category,
        book_quantity:book.book_quantity,
        published_date:new Date(book.published_date)
      }
    }
    let request = new Request(this.books_endpoint, {method:"POST", mode:"cors", headers: new Headers({"Content-Type":"application/json"}), body:JSON.stringify(book_params)});
    return fetch(request).then((res)=>{return res.json()}).then((res)=> { res }, (error)=>{console.log("Error occurred: ", error)});
  }

  updateBook(id, quantity){
    let book_params = {
      book: {
        id:id,
        book_quantity: quantity
      }
    }
    let request = new Request(this.books_endpoint+"/"+book_params.book.id, {
      method:"PUT",
      mode:"cors",
      redirect:"follow",
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body:JSON.stringify(book_params)
    })
    return fetch(request).then((res)=>{ }, (error)=>{console.log("error message: ", error)});
  }

  deleteBook(id){
    let book_params ={
      book: {
        id:id
      }
    }
    let request = new Request(this.books_endpoint+"/"+book_params.book.id, {
      method:"DELETE",
      mode:"cors",
      redirect:"follow",
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body:JSON.stringify(book_params)
    })
    return fetch(request).then((res)=>{ }, (error)=>{console.log("error: ", error)})
  }

}
