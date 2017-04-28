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

// Ink Interfaces
import { iPublication } from '../publication/publication.component'
import { iPublicationResponse } from '../models'

@Component({
  selector: 'app-publication-page',
  templateUrl: './publication-page.component.html',
  styleUrls: ['./publication-page.component.css']
})
export class PublicationPageComponent implements OnInit {

  authorID: string
  publicationID: string
  publication: iPublication

  keyboardSubscription: Subscription

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
    console.log('publication page constructed')
    this.route.params.subscribe(params => {

      console.log('pub page router change, constructor')

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
            new: true,
            id: this.publicationID,
            name: 'no name yet',
            articles: [],
            imageURL: '',
          }
        })

        return
      }
      this.backend.getPublication(this.authorID, this.publicationID).subscribe(publication => {
        this.publication = JSON.parse(JSON.stringify(publication))
      })
    })
  }

  ngOnInit() {
    // listen to media click
    // simply sets the imageURL of the publication
    this.ui.mediaClickObservable.subscribe(image => {
      console.log('jo')
      this.publication.imageURL = image.url // size?
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
      console.log(publicationResponse)
      this.router.navigate(['/', publicationResponse.publication.author.id, publicationResponse.publication.id])
    })
  }
  /**
   * Deletes the current publication
   */
  deletePublication() {
    this.backend.deletePublication(this.publication).subscribe(info => {
      this.ui.flashMessage(info.message)
      this.router.navigate(['/', this.authorID])
    })
  }

  ngOnDestroy() {
    console.log('publication page destroyed')
    this.keyboardSubscription.unsubscribe()
  }

}
