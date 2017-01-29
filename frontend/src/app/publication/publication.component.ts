import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute, Params } from '@angular/router'
import 'rxjs/add/operator/switchMap'
import { Observable } from 'rxjs/Observable'

import { BackendService } from '../backend.service'
import { UIService } from '../ui.service'

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent implements OnInit {

  nameQuill: any
  aboutQuill: any
  madeQuills: boolean = false

  publication: any
  authorID: string
  publicationID: string

  error

  constructor(
    private backend: BackendService,
    private ui: UIService,

    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.authorID = params['authorID']
      this.publicationID = params['publicationID']

      if (this.publicationID === 'new') {
        this.publication = this.backend.startPublication(this.authorID)
        this.backend.currentResource = this.publication
        this.makeQuills()
        return
      }

      return this.backend.getPublicationByIDs(this.authorID, this.publicationID).subscribe(
        (publication) => {
          this.publication = publication
          this.backend.currentResource = this.publication
          this.makeQuills()
        }, (error) => {
          this.error = error
        }

      )
    })
  }


  /**
 * Make Publication Quills
 */
  makeQuills() {
    if (this.madeQuills) {
      return
    }
    this.madeQuills = true

  
    // Publication Name
    this.nameQuill = new Quill('#publicationNameEditor', {
      modules: {
        toolbar: {
          container: '#publicationNameToolbar', 
          handlers: {'image': this.titleImageHandler},
        },
      },
      theme: 'snow',
      placeholder: 'Boom!',
    })
    // Publication About
    this.aboutQuill = new Quill('#publicationAboutEditor', {
      modules: {
        toolbar: {
          container: '#publicationAboutToolbar',  
        },
      },
      theme: 'snow',
      placeholder: 'Click on any text to change it.',
    })

  }

  /**
   * opens ui for selecting / uploading photos
   * on confirm, add this image as publication background
   */
  titleImageHandler() {
    console.log('quill title image handler here', this)
  }

}
