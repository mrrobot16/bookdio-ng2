import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routes } from './app.routes';
import {CORE_DECLARATIONS, CORE_PROVIDERS} from './'

@NgModule({
  declarations: [
    CORE_DECLARATIONS
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  providers: [CORE_PROVIDERS],
  bootstrap: [CORE_DECLARATIONS[0]]
})
export class AppModule { }
