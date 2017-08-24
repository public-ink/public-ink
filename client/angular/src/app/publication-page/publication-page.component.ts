// Angular
import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute, Params } from '@angular/router'

// RX
import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription'
import 'rxjs/Rx'

// GraphQL Tools
import { Apollo } from 'apollo-angular'
import gql from 'graphql-tag'

// Ink Services
import { BackendService } from '../backend.service'
import { UIService } from '../ui.service'

// Ink Interfaces impor modelsss! and use them:)

@Component({
  selector: 'app-publication-page',
  templateUrl: './publication-page.component.html',
  styleUrls: ['./publication-page.component.css']
})
export class PublicationPageComponent implements OnInit {

  authorID: string
  publicationID: string
  publication: any //Publication

  bottomBarVisible = false
  notFound = false

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
    // console.log('publication page constructed')
    // log.lifecyle(..)
    this.route.params.subscribe(params => {

      //console.log('pub page router change, constructor')
      // log.route(...)

      this.authorID = params['authorID']
      this.publicationID = params['publicationID']

      // keyboard shortcuts
      this.keyboardSubscription = Observable.fromEvent(window, 'keydown').subscribe((event: KeyboardEvent) => {

        if ((event.metaKey || event.ctrlKey) && event.keyCode === 83) {
          // cmd + s
          this.savePublication()
          event.preventDefault()

        } else if ((event.metaKey || event.ctrlKey) && event.keyCode === 68) {
          // cmd + d
          this.deletePublication()
          event.preventDefault()
        }
      })

      if (this.publicationID === 'create-publication') {
        this.backend.getAuthor(this.authorID).subscribe((author: any) => {
          this.publication = {
            // got to get author!
            author: author,
            // new: true,
            id: this.publicationID,
            name: 'no name yet',
            nameText: 'this seems old, remove me!',
            about: 'what about',
            aboutText: 'yea right',
            data: {},
            articles: [],
            imageURL: '',
          }
        })

        return
      }
      this.ui.backendBusy = true
      this.backend.getPublication(this.authorID, this.publicationID).subscribe(publication => {
        this.ui.backendBusy = false
        if (!publication) {
          this.notFound = true
        } else {
          this.publication = JSON.parse(JSON.stringify(publication))
        }
      }, error => {
        this.ui.backendBusy = false
        console.log(error)
      })
    })
  }

  ngOnInit() {
    // listen to media click
    // simply sets the imageURL of the publication
    this.ui.mediaClickObservable.subscribe(image => {
      this.publication.imageURL = image.url 
    })
  }

  /** 
   * Save (creates of updates) the local publication!
   */
  savePublication() {
    // todo: validation
    this.ui.show('loading', 'saving publication')
    this.backend.savePublication(this.publication).subscribe((publicationResponse: any) => {
      this.ui.show('success', 'done!', 1000)
      // coule be that we are already here, this is for creates
      // TODO: are we always navigating? console.log(publicationResponse)
      this.router.navigate(['/', publicationResponse.publication.author.id, publicationResponse.publication.id])
    })
  }
  /**
   * Deletes the current publication
   */
  deletePublication() {

    this.ui.confirm('Are you sure you want to delete this publication and all x of its articles?').subscribe(response => {
      if (response === 'no') {
        this.ui.resetState()
      } else {
        this.ui.show('loading', 'deleting publication')
        this.backend.deletePublication(this.publication).subscribe(info => {
          this.ui.flashMessage('the publication has been deleted')
          this.router.navigate(['/', this.authorID])
        })
      }
    })

  }

  ngOnDestroy() {
    // console.log('publication page destroyed')
    this.keyboardSubscription.unsubscribe()
  }

}
