import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute, Params } from '@angular/router'
import 'rxjs/add/operator/switchMap'
import { Observable } from 'rxjs/Observable'

import { BackendService } from '../backend.service'
import { StyleService } from '../style.service'
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
        this.publication = this.backend.startPublication(this.authorID)
        console.log('new pub', this.publication)
        this.backend.currentResource = this.publication
        this.makeQuills()
        return
      }

      return this.backend.getPublicationByIDs(this.authorID, this.publicationID).subscribe(
        (publication) => {
          this.publication = publication
          console.log('existing pub', this.publication)
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
      console.log('already made quills')
      this.nameQuill.setContents(JSON.parse(this.publication.name))
      this.aboutQuill.setContents(JSON.parse(this.publication.about))

      return
    }
    this.madeQuills = true


    // Publication Name
    this.nameQuill = new Quill('#publicationNameEditor', {
      modules: {
        toolbar: {
          container: '#publicationNameToolbar',
          handlers: {
            'image': () => {
              this.publication.image = 'http://placehold.it/300/400'
            }
          },
        },
      },
      theme: 'snow',
      placeholder: 'Boom!',
    })
    this.ui.toolbarState.second = 'publicationName'

    // load content
    this.nameQuill.setContents(JSON.parse(this.publication.name))

    // keep data fresh
    this.nameQuill.on('text-change', (delta, oldDelta, source) => {
      this.publication.nameText = this.nameQuill.getText()
      this.publication.name = JSON.stringify(this.nameQuill.getContents())
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

    // load content
    this.aboutQuill.setContents(JSON.parse(this.publication.about))
    // keep data fresh
    this.aboutQuill.on('text-change', (delta, oldDelta, source) => {
      this.publication.aboutText = this.aboutQuill.getText()
      this.publication.about = JSON.stringify(this.aboutQuill.getContents())
    })

  }

  /**
   * opens ui for selecting / uploading photos
   * on confirm, add this image as publication background
   */
  titleImageHandler() {
    console.log('quill title image handler here', this)
    this.publication.image = 'http://placehold.it/300/400'
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
