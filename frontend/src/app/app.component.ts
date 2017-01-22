import { Component } from '@angular/core'
import { BackendService } from './backend.service' 

@Component({
  selector: 'app-root',
  //templateUrl: './app.component.html',
  template: `
  <h1>{{ title }} </h1>
  <input type="text" [(ngModel)]="authorName" />
<button (click)="backend.createAuthor(authorName)">create author</button>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!'
  authorName = ''

  constructor(
    private backend: BackendService
  ) {

  }
}
