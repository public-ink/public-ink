import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute, Params } from '@angular/router'
import 'rxjs/add/operator/switchMap'
import { Observable } from 'rxjs/Observable'

import { BackendService } from '../backend.service'
import { StyleService } from '../style.service'
import { UIService } from '../ui.service'

import  { Author, Publication } from '../interfaces'

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent implements OnInit {

  nameQuill: any
  aboutQuill: any
  madeQuills: boolean = false

  authorID: string
  publicationID: string

  // from backend
  publication: Publication
  author: Author
  

  error

  constructor(
    private backend: BackendService,
    private style: StyleService,
    private ui: UIService,

    private route: ActivatedRoute,
    private router: Router,
  ) {
    /**
    * Subscribe to media clicks
    */
    this.backend.mediaStreamOut.subscribe(media => {
      this.publication.imageUrl = media.url
      console.log('jo', this.publication.imageUrl)
    })
  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.authorID = params['authorID']
      this.publicationID = params['publicationID']

      

      

      if (this.publicationID === 'new') {
        // get the author (we don't have a publication with an author inside)
        this.backend.getAuthorByID(this.authorID).subscribe((author: Author) => {
          this.author = author
          this.publication = this.backend.startPublication(this.author)
          this.backend.currentResource = this.publication
        })
        return
      }

      // else: load existing publication
      this.backend.getPublicationByIDs(this.authorID, this.publicationID).subscribe(
        (publication) => {
          this.publication = publication
          console.log('existing pub', this.publication)
          this.backend.currentResource = this.publication
        }, (error) => {
          this.error = error
        }

      )
    })
  }



  /**
   * opens ui for selecting / uploading photos
   * on confirm, add this image as publication background
   */
  titleImageHandler() {
    console.log('quill title image handler here', this)
    this.publication.imageUrl = 'http://placehold.it/300/400'
  }



  heroStyle(): any {
    let style
    if (!this.publication) {
      style = {}
    }
    else {
      style = {
        backgroundImage: `url("${this.publication.imageUrl}=s${this.ui.vw(100)}")`,
        'height.vh': 50,
      }
    }
    return style
  }



}
