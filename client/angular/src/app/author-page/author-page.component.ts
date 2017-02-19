// Angular
import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute, Params } from '@angular/router'

// Services
import { BackendService } from '../backend.service'
import { UIService } from '../ui.service'

// Models (hmm)
import { 
  Author, AuthorData,
  ValidationError, ServerError,
} from '../models'

import gql from 'graphql-tag'
import { Apollo } from 'apollo-angular'

@Component({
  selector: 'app-author-page',
  templateUrl: './author-page.component.html',
  styleUrls: ['./author-page.component.css']
})
export class AuthorPageComponent implements OnInit {

  // the ID is taken from the current route
  authorID: string
  // the author is retrieved from the backend
  author: any

  constructor(
    // angular
    private route: ActivatedRoute,
    private router: Router,
    // ink
    private backend: BackendService,
    private ui: UIService,
    // graphql
    private apollo: Apollo,
  ) {

    this.route.params.subscribe(params => {
      this.authorID = params['authorID']

      if (this.authorID === 'create-author') {
        this.author = {
          name: 'chose wisely',
          publications: []
        }
        return
      }

      const query = gql`
        {author(authorID:"${this.authorID}"){
          name
          publications {
            name
            id
          }
        }}
      `
      this.apollo.watchQuery<any>({
        query: query
      }).subscribe(result => {
        console.log('author result', result)
        this.author = result.data.author
      }) 

      /*if (this.authorID === 'new') {
        this.author = Author.createNew()
      } else {
        this.backend.getResourceByIDs(this.authorID).subscribe(
          (authorData: AuthorData) => {
          this.author = new Author(authorData)
        },
        (error: ServerError | ValidationError) => {
          this.ui.handleError(error)
        })
      }*/
    })
    console.log(this.authorID)
  }

  /**
   * The author instance data can get changed by the author component, 
   * and trigger an update here
   */
  saveAuthor() {
    this.backend.postResource(this.author).subscribe(
      (authorData: AuthorData) => {
      this.author = new Author(authorData)
    },
      (error: ValidationError | ServerError) => {
        
        this.ui.handleError(error)
      }
    )
  }

  ngOnInit() {
    
  }

}
