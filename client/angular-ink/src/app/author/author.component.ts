import { Component, OnInit, Input } from '@angular/core'


@Component({
  selector: 'app-author',
  template: `
  <app-content-width>
  <flex-col-center style="padding: 100px;">
      <div style="background-color: black; width: 150px; height: 150px; border-radius: 100%;"></div>
      <input type="text" [(ngModel)]="author.name">
      <div>{{ author.about }}</div>
      <div>a lot of articles in {{ author.publications.length }} publications </div>
      <br><br>
      <span (click)="author.state = author.state === 'collapsed' ? 'expanded' : 'collapsed'">expand / collapse author</span>
    </flex-col-center>
  </app-content-width>
  `,
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {

  @Input('author') author

  constructor() { }

  ngOnInit() {
    if (!this.author) {
      this.author = {
        name: '',
        about: '',
        publications: []
      }
    }
  }

}
