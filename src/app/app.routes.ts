// import { BookComponent, BookTransactionComponent } from './index';
import { BookComponent } from './index';
export const routes = [
  { path: '', component: BookComponent, pathMatch: 'full' },
  { path: 'books', component: BookComponent },
  // { path:'book/:id/book_transactions', component: BookTransactionComponent}
];
