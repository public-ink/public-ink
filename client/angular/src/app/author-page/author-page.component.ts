// Angular
import { Component, OnInit, OnDestroy, Input } from '@angular/core'
import { Router, ActivatedRoute, Params } from '@angular/router'

// RX
import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription'
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
export class AuthorPageComponent implements OnInit, OnDestroy {

  // the ID is taken from the current route
  authorID: string
  // the author is retrieved from the backend
  author: any
  publications: any
  editable: boolean = false

  // keyboard observation
  keyboardSubscription: Subscription


  constructor(
    // angular
    private route: ActivatedRoute,
    private router: Router,
    // ink
    public backend: BackendService,
    public ui: UIService,
    // graphql
    private apollo: Apollo,
  ) {
    console.log('author page constructed')

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
      } else {
        this.backend.getAuthor(this.authorID).subscribe(author => {
          this.author = JSON.parse(JSON.stringify(author))
        })
      }
    })

    // observe keyboard
    this.keyboardSubscription = Observable.fromEvent(window, 'keydown').subscribe((event: KeyboardEvent) => {

      if ((event.metaKey || event.ctrlKey) && event.keyCode === 83) {
        // cmd + s
        this.saveAuthor()
        event.preventDefault()
      } else if ((event.metaKey || event.ctrlKey) && event.keyCode === 68) {
        // cmd + d
        this.deleteAuthor()
        event.preventDefault()
      }
    })
  }


  /**
   * Deletes the author, and redirects to my-account
   */
  deleteAuthor() {
    // confirm dialog
    this.ui.confirm('Are you sure you want to delete ' + this.author.name).subscribe(
      // user confirms
      (yes) => {
        this.ui.show('loading', 'deleting author')

        this.backend.deleteAuthor(this.authorID).subscribe((info: iInfo) => {
          this.ui.show('success', 'done!', 1000)
          this.router.navigate(['/my-account'])
        }, (error) => {
          // think about displaying multiple errors
          this.ui.show('error', error.graphQLErrors[0])
        })
      // user cancels
      }, (no) => {
        this.ui.hide()
      })

  }

  /**
   * The author instance data can get changed by the author component, 
   * and trigger an update here
   */
  saveAuthor() {
    console.log('save author')
    this.ui.show('loading', 'saving')
    this.backend.saveAuthor(this.author).subscribe((authorResponse: any) => {
      //this.ui.flashMessage(authorResponse.info.message)
      this.ui.show('success', 'done', 1000)
      // in case of create-author, we need to redirect
      this.router.navigate(['/', authorResponse.author.id])
      console.log(authorResponse.author.id)
    })
  }

  ngOnInit() {
    /**
     * On media click, we update the author's image url
     */
    this.ui.mediaClickObservable.subscribe(image => {
      this.author.imageURL = image.url
    })
  }

  /**
   * Unsubscribe from keyboard events
   */
  ngOnDestroy() {
    console.log('author page destroyed')
    this.keyboardSubscription.unsubscribe()
  }

}
