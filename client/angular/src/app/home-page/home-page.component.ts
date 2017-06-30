import { Component, OnInit } from '@angular/core'

import gql from 'graphql-tag'
import { Apollo } from 'apollo-angular'

import { BackendService } from '../backend.service'

interface results {
  data: {articles: any}
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  article: any
  hoff // currently, the author hoff, with his publications, which is currently displayed on home.

  constructor(
    public backend: BackendService,
  ) {

  }

  ngOnInit() {
    
    // load hoff for now
    this.backend.loadHoff('hoff').subscribe(hoff => {
      this.hoff = JSON.parse(JSON.stringify(hoff))
    })
  }

  expandPublication(publication) {
    publication.expanded = true
  }
  
}
