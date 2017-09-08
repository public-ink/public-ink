import { Component, OnInit } from '@angular/core'

import gql from 'graphql-tag'
import { Apollo } from 'apollo-angular'

import { BackendService } from '../backend.service'
import { UIService } from '../ui.service'

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
    public ui: UIService,
  ) {

  }

  ngOnInit() {
    
    // load hoff for homepage content for now
    // try simple cache first
    if (this.backend.hoffData) {
      this.hoff = JSON.parse(JSON.stringify(this.backend.hoffData))
      return
    }
    // reload if needed
    this.ui.backendBusyStream.next(true)
    this.backend.loadHoff('hoff').subscribe(hoff => {
      this.hoff = JSON.parse(JSON.stringify(hoff))
      this.ui.backendBusyStream.next(false)
    }, error => {
      // todo: message
      alert('an error occured')
      this.ui.backendBusyStream.next(false)
    })
  }

  expandPublication(publication) {
    publication.expanded = true
    publication.showArticleNumer = 10
  }
  
}
