// Components
import { AppComponent } from './components/app/app.component';
import { TopNavBar } from './components/nav-bar/top-bar.component';
// import { BookComponent} from './components/book/book.component';
// import { BookItem } from './components/book/book_item.component';
// import { BookFormComponent } from './components/book/book_form.component';
// import { BookTransactionComponent } from './components/book_transactions/book_transaction.component';
// Services
// import { BookService } from './services/book.service';
import { SharedService } from './services/shared.service';
// import { BookTransactionService } from './services/book_transaction.service';
// import { HelperService } from './helpers/helper.service';

// Pipes
// import { ReturnMonthYearPipe, ReturnTimeShortDate } from './pipes/datetime.pipe';
// Directive
// import { HighlightDirective } from './directives/highlight.directive';
// Export all
// export const CORE_PROVIDERS = [BookService, BookTransactionService, SharedService, HelperService];
export const CORE_PROVIDERS = [SharedService;
// export const CORE_DECLARATIONS = [AppComponent, TopNavBar, BookComponent, BookItem, BookFormComponent, BookTransactionComponent, HighlightDirective, ReturnMonthYearPipe, ReturnTimeShortDate];
export const CORE_DECLARATIONS = [AppComponent, TopNavBar, ];
// export { AppComponent, TopNavBar,BookComponent, BookTransactionComponent, BookItem, HelperService};
export { AppComponent, TopNavBar};
