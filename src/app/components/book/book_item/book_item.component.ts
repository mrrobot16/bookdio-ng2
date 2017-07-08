import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'book-item',
  template: `
    <table id='books' class="table" width="400" height="5">
    <thead>
      <tr class="background-top">
        <th>Book Name</th>
        <th>Author</th>
        <th>ISBN</th>
        <th>Book Quantity</th>
        <th>Published Date</th>
        <th>Book Category</th>
        <th>Books Issued</th>
      </tr>
    </thead>
    <tbody>
          <tr class="animate" id="{{book.id}}" [myHighlight]="blue" [ngClass]="selectBook"  *ngFor="let book of current_books" (click)="selectBookID($event, book.id)">
            <td data-label="Book Name">{{book.book_name }}</td>
            <td data-label="Author">{{book.author_name}}</td>
            <td data-label="ISBN">{{book.isbn_code}}</td>
            <td data-label="Book Quantity">{{book.book_quantity}}</td>
            <td data-label="Published Date">{{book.published_date | date | returnMonthYear }}</td>
            <td data-label="Book Category">{{book.book_category}}</td>
            <td data-label="Books Issued">{{book.book_issued}}</td>
          </tr>
    </tbody>
  </table>
  `,
  // styleUrls: ['./css/stylesheet.css']
  styleUrls: ['./book_item.scss']
})
export class BookItem implements OnInit {
  @Input() current_books;
  @Output() selectBook = new EventEmitter();
  constructor(){
  }

  ngOnInit(){
  }

  selectBookID(event, id){
    this.selectBook.emit({ event: event, id:id})
  }


}
