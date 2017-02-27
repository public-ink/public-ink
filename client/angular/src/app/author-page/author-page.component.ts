// Angular
import { Component, OnInit, Input } from '@angular/core'
import { Router, ActivatedRoute, Params } from '@angular/router'

// Services
import { BackendService, iInfo } from '../backend.service'
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

  @Input() editable: boolean = false

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
          new: true,
          name: 'chose wisely!',
          about: 'about this author',
          imageURL: '/assets/images/mask.png',
          publications: [],
        }
        return
      }

      const query = gql`
        {author(authorID:"${this.authorID}"){
          id          
          name
          about
          imageURL
          created
          updated
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
        // is this an immutable fucker?
      }) 

    })
    console.log(this.authorID)
  }

  create() {
    /**
     * called from the child <app-author> component. 
     * create an author from the bound author data!
     * on success, navigate to the new author's page
     */
    this.backend.createAuthor(this.author).subscribe(result => {
      const id = result.data.createAuthor.id
      this.backend.userAccount.authors.push(this.author)
      this.router.navigate(['/', id])
    })
  }
  delete() {
    this.backend.deleteAuthor(this.authorID).subscribe((info: iInfo) => {
      console.log('author page received delete result', info)
      this.ui.message = info.message
      // todo: remove from backend!! actually, backend should do that
      this.router.navigate(['/my-account'])
    })
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
