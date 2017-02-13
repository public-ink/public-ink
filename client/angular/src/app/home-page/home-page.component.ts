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

  data: any
  articles: any
  loading: boolean
  publications: any = []

  constructor(
    private backend: BackendService,
    private apollo: Apollo,
  ) { }

  ngOnInit() {

    const ArticlesQuery = gql`
      query something {
        articles {
          title
          created
          updated
          author {
            name
          }
        }
      }
    `
    const PublicationsQuery = gql`
{
  publications {
    id
    name
    author {
      id
      name
      about
    }
    articles {
      title
      teaser
      created
      updated
      id
      author {
        id
        name
      }
    }
  }
}
    `


    this.apollo.watchQuery({
      query: ArticlesQuery
    }).subscribe((result) => {
      this.data = result.data
      console.log('got data!', result.data)
    })

    interface PubResult {
      data: any
      loading: any
      
    }


    this.apollo.watchQuery({
      query: PublicationsQuery
    }).subscribe((result: PubResult) => {
      this.publications = result.data.publications
      console.log('got publications', result.data.publications)
    })

  }

}
