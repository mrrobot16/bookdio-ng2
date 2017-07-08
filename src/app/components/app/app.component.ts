import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <div class="container body-container">
  <div>
    <span class='flex-center'><h1>Welcome to our Book Recommendations</h1></span>
    <top-nav-bar></top-nav-bar>
  </div>
<!--<router-outlet></router-outlet>-->
</div>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

}
