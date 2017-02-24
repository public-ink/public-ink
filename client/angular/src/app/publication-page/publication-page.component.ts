// Angular
import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute, Params } from '@angular/router'

// GraphQL Tools
import { Apollo } from 'apollo-angular'
import gql from 'graphql-tag'

// Ink Services
import { BackendService } from '../backend.service'
import { UIService } from '../ui.service'

// Ink Interfaces
import { iPublication } from '../publication/publication.component'

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

      if (this.publicationID === 'create-publication') {
        this.backend.getAuthor(this.authorID).subscribe(result => {
          this.publication = {
            // got to get author!
            author: result.data.author,
            new: true,
            id: this.publicationID,
            name: 'no name yet',
            articles: [],
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
    this.backend.savePublication(this.publication).subscribe(info => {
      console.log('publication page save publication info')
      this.ui.message = 'publication_saved, i guess'
    })
  }
  /**
   * Deletes the current publication
   */
  deletePublication() {
    this.backend.deletePublication(this.publication).subscribe(info => {
      this.ui.message = info.message
      console.log('pub page delete info', info)
    })
  }

}
