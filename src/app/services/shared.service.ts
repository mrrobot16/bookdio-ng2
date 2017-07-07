import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
@Injectable()
export class SharedService {
  pushedBookID = new EventEmitter();
  book_id = 0;
  constructor(){}

  getBookID(){
    this.book_id ? this.book_id : 0
  }

  setBookID(id){
    this.book_id = id
  }

  pushBookID(id) {
      this.pushedBookID.emit(id);
  }

}
