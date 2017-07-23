// Components
import { AppComponent } from './components/app/app.component';
import { TopNavBar } from './components/navbar/top_bar.component';
import { BookComponent } from './components/book/book.component';
import { BookItem } from './components/book/book_item/book_item.component';
import { BookFormComponent } from './components/book/book_form/book_form.component';
import { BookTransactionComponent } from './components/book_transactions/book_transaction.component';
// Services
import { BookService } from './services/book.service';
import { SharedService } from './services/shared.service';
import { BookTransactionService } from './services/book_transaction.service';
import { HelperService } from './helpers/helper.service';

// Pipes
import { ReturnMonthYearPipe, ReturnTimeShortDate } from './pipes/datatime.pipe';
// Directive
import { HighlightDirective } from './directives/highlight.directive';

export const CORE_PROVIDERS = [BookService, BookTransactionService, SharedService, HelperService];

export const CORE_DECLARATIONS = [AppComponent, TopNavBar, BookComponent, BookItem, BookFormComponent, BookTransactionComponent, HighlightDirective, ReturnMonthYearPipe, ReturnTimeShortDate];

export { AppComponent, TopNavBar,BookComponent, BookTransactionComponent, BookItem, HelperService};
