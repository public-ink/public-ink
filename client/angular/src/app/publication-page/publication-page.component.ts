// Angular
import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute, Params } from '@angular/router'

// RX
import { Observable } from 'rxjs/Observable'
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

      console.log(params)

      this.authorID = params['authorID']
      this.publicationID = params['publicationID']

      // keyboard shortcuts
      Observable.fromEvent(window, 'keydown').subscribe((event: KeyboardEvent) => {
        // save article
        if ((event.metaKey || event.ctrlKey) && event.keyCode === 83) { /*ctrl s */
          this.savePublication()
          event.preventDefault()
        }
      })

      if (this.publicationID === 'create-publication') {
        this.backend.getAuthor(this.authorID).subscribe(result => {
          this.publication = {
            // got to get author!
            author: result.data.author,
            new: true,
            id: this.publicationID,
            name: 'no name yet',
            articles: [],
            imageURL: '',
          }
        })

        return
      }
      console.log('new get')
      this.backend.getPublication(this.authorID, this.publicationID).subscribe(publication => {
        console.log('pub page got put', publication)
        this.publication = JSON.parse(JSON.stringify(publication))
      })
    })
  }

  ngOnInit() {
    // listen to media click
    this.ui.mediaClickObservable.subscribe(image => {
      console.log('pub page:', image)
      this.publication.imageURL = image.url
    })
  }

  /** 
   * Save (creates of updates) the local publication!
   */
  savePublication() {
    console.log(this.publication)
    if (this.publication.name === '') {
      alert('no name on publication')
      return
    }
    this.backend.savePublication(this.publication).subscribe((info: any) => {
      this.ui.flashMessage(info.message)
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

}
