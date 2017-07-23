import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
// Form Objects
import { FormBuilder, FormGroup } from '@angular/forms';

// Services
import { BookService } from '../../../services/book.service';
import { BookTransactionService } from '../../../services/book_transaction.service';
import { SharedService } from '../../../services/shared.service';
import { HelperService } from '../../../helpers/helper.service';


@Component({
  selector: 'book-form',
  templateUrl: './book_form.component.html',
  // styleUrls:['./css/stylesheet.css']
})
export class BookFormComponent implements OnInit {
  @Input() book_id;
  @Input() all_books;
  @Input() page_number
  @Output() getAllBooks = new EventEmitter()
  @Output() deSelect = new EventEmitter()
  property_names:any;
  duplicate_isbn:boolean
  editMode:boolean
  button_disable:boolean
  button_issue_disable:boolean
  button_edit_disable:boolean
  toggleShow:string
  toggleMessage:string
  toggleEditError:string
  status:string;
  isbn_code: string;
  bookForm: FormGroup;
  constructor(private book_service: BookService, private book_transaction_service: BookTransactionService,
    private shared_service: SharedService, private builder: FormBuilder, private helper_service: HelperService){
  }

  ngOnInit(){
    this.property_names = ["book_name", "author_name", "isbn_code",
    "published_date", "book_category", "book_quantity"]
    this.duplicate_isbn = null
    this.setToggleMode()
    this.disableButton()
    this.createForm()
  }

  setToggleMode(){
    this.editMode = false;
    this.toggleShow = 'hide';
    this.toggleMessage = 'hideMessage'
    this.toggleEditError = 'hideMessage'
    this.button_disable = true
    this.button_issue_disable = true
    this.button_edit_disable = true
  }

  disableButton(){
    this.shared_service.pushedBookID.subscribe(
      (book_id) => {
        this.book_id = book_id
        if(this.book_id){
          this.button_edit_disable = false
          var book = this.all_books.filter((book)=>{
            return book.id === book_id
          })[0]
          this.editBook()
        }
        (book_id && book.book_quantity >=1) ? this.button_issue_disable = false : this.helper_service.returnNone();
        (book_id && book.book_issued) < 1 ? this.button_disable = false : this.helper_service.returnNone();
        if(book_id === 0) {
          this.button_edit_disable = true
          this.cleanForm()
          this.toggleDisabled("on")
          this.button_disable = true
          this.button_issue_disable =true
        }
      }
    )
  }

  toggleEditMessage(){
    this.toggleEditError = 'showMessage'
    this.toggleEditError == 'showMessage' ? this.toggleEditError = 'hideMessage' : this.toggleEditError = 'showMessage';
  }

  filterBookByID(books, book_id){
    let book = books.filter((book)=>{
      return book.id === book_id
    })
    return book[0];
  }

  issueBook(){
    if(this.book_id){
      let book = this.filterBookByID(this.all_books, this.book_id)
      if(book.book_quantity > 0){
        book = {
          book: {
            id:this.book_id
          }
      }
      return this.book_transaction_service.postBookTransaction(book).then(()=>{
        this.getAllBooks.emit(this.page_number);
        this.deSelect.emit()
        this.book_id = 0
        });
      }
    }
  }

  createForm(){
    this.bookForm = this.builder.group({
        book_name: [''],
        author_name: [''],
        isbn_code: [''],
        book_quantity: [''],
        published_date: [''],
        book_category: ['']
    })
    this.checkBookDuplicates();
   }

   checkBookDuplicates(){
     this.bookForm.get('isbn_code').valueChanges.subscribe((res)=>{
       this.isbn_code = res
         let book = this.all_books.filter((book)=>{
         return book.isbn_code == this.isbn_code
        })
        if(book.length > 0){
          this.duplicate_isbn = true
          this.toggleMessage = 'showMessage'
        }
        else {
          this.duplicate_isbn = false
          this.toggleMessage = 'hideMessage'
        }
    })
   }

   postBook(book){
     return this.book_service.postBook(book).then(()=>{
       this.getAllBooks.emit();
       this.bookForm.reset();
     })
   }

   onSubmit(bookForm, event){
     event.preventDefault();
     if(this.editMode && this.book_id){
       return this.book_service.updateBook(this.book_id, bookForm.book_quantity).then(()=>{
         this.getAllBooks.emit(this.page_number)
       })
     }
     else if (this.duplicate_isbn && !this.editMode) {
       let book = this.all_books.filter((book)=>{
         return book.isbn_code == this.isbn_code
       })[0]
       book.book_quantity = bookForm.book_quantity + book.book_quantity
       return this.book_service.updateBook(book.id, book.book_quantity).then(()=>{
         this.getAllBooks.emit()
       })
     }
     else {
       this.postBook(bookForm)
     }
   }


  toggleDisabled(status) {
    let property_names = this.property_names.filter(property=>{
      return property != "book_quantity"
    })
    this.status = status;
    if(this.status=="off"){
     property_names.forEach((inputs)=>{
        this.bookForm.root.get(inputs).disable();
     })
    }
    if(this.status=="on") {
      property_names.forEach((inputs)=>{
         this.bookForm.root.get(inputs).enable();
      })
    }
  }

  showForm(){
    this.cleanForm()
    this.toggleEditError = 'hideMessage'
    let book_id = 0
    if(this.editMode){
      this.editMode = false;
      this.toggleDisabled("on")
    }
    else {
      this.editMode = false
      this.toggleDisabled("on")
    }
    if(this.toggleShow == 'hide'){
      if(this.editMode){
        this.editMode = false;
      }
      else {
        this.toggleShow = 'show'
      }
      if(this.toggleShow == 'hide'){
        this.toggleShow = 'show'
        this.toggleDisabled("on")
      }
      else {
        this.toggleDisabled("on")
        }
    }
  }

  editBook(){
    this.loadBookEdit()
    this.toggleEditError = 'hideMessage'
    if(this.book_id){
      this.editMode = !this.editMode;
      if(this.toggleShow == 'hide'){
        this.toggleShow = 'show'
        this.toggleDisabled("off")
      }
      else {
        this.toggleDisabled("off")
      }
    }
    else {
      this.toggleEditError = 'showMessage'

    }
    this.toggleMessage = 'hideMessage'
  }

  loadBookEdit(){
    if(this.book_id){
      let book = this.all_books.filter((book)=>{return book.id == this.book_id})
      this.property_names.forEach(prop_name=>{
        prop_name=='published_date' ? this.bookForm.get(prop_name).setValue(book[0][prop_name].slice(0,-3)) : this.bookForm.get(prop_name).setValue(book[0][prop_name])
      })
    }
  }
  cleanForm(){
    this.deSelect.emit()
    this.property_names.forEach((prop_name)=>{
      this.bookForm.get(prop_name).setValue(null)
    })
  }

  deleteBook(){
    if(this.book_id){
      let book = this.all_books.filter((book)=>{
        return book.id == this.book_id
      });
      if(book[0].book_issued < 1){
        return this.book_service.deleteBook(this.book_id).then(()=>{
          this.getAllBooks.emit();
        }).then(()=>{
          this.cleanForm()
        })
      }
    }
  }
}
