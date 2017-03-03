// Angular
import { Component, OnInit, Input } from '@angular/core'
import { Router, ActivatedRoute, Params } from '@angular/router'

// RX
import { Observable } from 'rxjs/Observable'
import 'rxjs/Rx'

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

  

  // the ID is taken from the current route
  authorID: string
  // the author is retrieved from the backend
  author: any
  publications: any
  editable: boolean = false

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
        this.editable = true
        this.author = {
          new: true,
          id: 'create-author', // not ideal
          name: '',
          about: '',
          imageURL: '/assets/images/mask.png',
          publications: [],
        }
        return
      }

      /** Like we said, we want to show publications, so we have to get their path up to author as well
       * Or, we could just stick it the author we already got. Try that!
       */
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
            imageURL
            author {
              name
              id
              imageURL
            }
          }
        }}
      `
      this.apollo.watchQuery<any>({
        query: query
      }).subscribe(result => {
        console.log('author result', result)
        this.author = JSON.parse(JSON.stringify(result.data.author))
        this.publications = this.author.publications
        // is this an immutable fucker?
      }) 

    })
    console.log(this.authorID)

    // keyboard shortcuts
    Observable.fromEvent(window, 'keydown').subscribe((event: KeyboardEvent) => {
      // save article
      if ((event.metaKey || event.ctrlKey) && event.keyCode === 83) { /*ctrl s */
        this.saveAuthor()
        event.preventDefault()
      }
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
    console.log('save!')
    this.backend.saveAuthor(this.author).subscribe((info: any) => {
      this.ui.message = info.message
    })
  }

  ngOnInit() {
    this.ui.mediaClickObservable.subscribe(image => {
      console.log('author page', image)
      this.author.imageURL = image.url
    })
  }

  // listen to media clicks, to set the author image (only for new, or editing)
  

}
