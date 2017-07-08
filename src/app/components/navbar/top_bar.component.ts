import {Component} from '@angular/core';
import {SharedService} from '../../services/shared.service';
import {Router} from '@angular/router';
@Component({
  selector: 'top-nav-bar',
  template: `
        <div class="top-nav flex-center container">
          <button class="btn-primary" type="button" name="button" (click)="viewBooks()">View Books</button>
          <button class="btn btn-warning" [disabled]='button_disable' type="button" name="button" (click)="viewBookTransactions()">View Book Transactions</button>
        </div>
  `,
  styleUrls:['./top_bar.scss']
})
export class TopNavBar {
  constructor(shared_service: SharedService, router: Router) {
    // this.router = router
    // this.shared_service = shared_service
    // this.router.location._platformStrategy._platformLocation.location.hash
    // this.enableBookTransactions()
  }
  enableBookTransactions(){
    // this.shared_service.pushedBookID.subscribe(
      // (book_id) => {
        // this.button_disable = true
        // this.book_id = book_id
        // this.book_id ? this.button_disable = false : this.button_disable = true
      // }
    // )
  }
  viewBooks(){
    // this.router.navigate(['books'])
  }
  viewBookTransactions(){
    // this.router.navigate(['book/'+this.book_id+'/book_transactions'])
  }
}
