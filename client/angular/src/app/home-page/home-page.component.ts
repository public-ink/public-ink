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

  constructor(
    private backend: BackendService,
  ) {

  }

  ngOnInit() {

  }
  
}
