import { Component, OnInit } from '@angular/core'
import { DomSanitizer } from '@angular/platform-browser'

import { Http } from '@angular/http'
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations'

// ink
import { UIService } from '../ui.service'

@Component({
  selector: 'app-paper-tree',
  templateUrl: './paper-tree.component.html',
  styleUrls: ['./paper-tree.component.css'],
  animations: [
    trigger('heroState', [
      state('inactive', style({
        backgroundColor: '#eee',
        transform: 'scale(1)'
      })),
      state('active',   style({
        backgroundColor: '#cfd8dc',
        transform: 'scale(1.1)'
      })),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out'))
    ]),
    trigger('authorState', [
      state('collapsed', style({
        height: '*',
      })),
      state('expanded',   style({
        height: 0,
      })),
      transition('collapsed => expanded', animate('400ms ease-in')),
      transition('expanded => collapsed', animate('400ms ease-out'))
    ]),
    trigger('publicationState', [
      state('collapsed', style({
        height: '*',
      })),
      state('expanded',   style({
        height: 0,
      })),
      transition('collapsed => expanded', animate('400ms ease-in')),
      transition('expanded => collapsed', animate('400ms ease-out'))
    ]),
  ]
})
export class PaperTreeComponent implements OnInit {

  thedata: any
  authors = []



  constructor(
    public http: Http,
    public sanitizer: DomSanitizer,
    // ink
    public ui: UIService,
  ) { }

  safeBG(url: string) {
    const str = `url(${url}&w=${this.ui.deviceWidth})`
    return this.sanitizer.bypassSecurityTrustStyle(str)
  }

  ngOnInit() {
    const query = `
    {
      author(authorID: "hoff") {
        id
        name
        about
        publications {
          id
          name
          articles {
            title
            bodyOps
          }
        }
      }
    }
    `
    this.http.post('http://localhost:8080/api/graphql', {query: query}).subscribe(result => {
      console.log('loaded', result.json())
      this.thedata = result.json()
      this.authors.push(this.thedata.data.author)
    })
  }

}
