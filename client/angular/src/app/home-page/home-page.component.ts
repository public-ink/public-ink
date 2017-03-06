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

  constructor(
    private backend: BackendService,
  ) {

  }

  ngOnInit() {
    // home article
    this.backend.getArticle('public-ink', 'about-public-ink', 'hi-there').subscribe(article => {
      this.article = article
    })
  }
  
}
