import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute, Params } from '@angular/router'
import 'rxjs/add/operator/switchMap'
import { Observable } from 'rxjs/Observable'

import { BackendService } from '../backend.service'
import { StyleService } from '../style.service'
import { UIService } from '../ui.service'

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {

  author: any
  authorID: string

  nameQuill: any
  aboutQuill: any
  madeQuills: boolean = false

  constructor(
    private backend: BackendService,
    private style: StyleService,
    private ui: UIService,

    private route: ActivatedRoute,
    private router: Router
  ) { 

    this.backend.mediaStreamOut.subscribe((media) => {
      this.author.imageUrl = media.url
      console.log(media)
    })

  }

  stil = {
    authorName: {
      'fontSize.px': 24,
      'fontWeight': 700
    },
    author140: {
      'fontSize.px': 14,
      'fontFamily': this.style.theme.prime,
    }
  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.authorID = params['authorID']

      if (this.authorID === 'new') {
        this.author = this.backend.newAuthor
        // do we need to tell the backend? I guess so
        this.backend.currentResource = this.author
        //this.makeQuills()
        return
      }

      return this.backend.getAuthorByID(this.authorID).subscribe((author) => {
        this.author = author
        this.backend.currentResource = this.author  
        //this.makeQuills()      
      })
    })
  }

  makeQuills() {
    if (this.madeQuills) {
      console.log('already made quills')
      this.nameQuill.setContents(JSON.parse(this.author.name))
      this.aboutQuill.setContents(JSON.parse(this.author.about))
      return
    }
    this.madeQuills = true

    // author Name
    this.nameQuill = new Quill('#authorNameEditor', {
      modules: {
        toolbar: {
          container: '#authorNameToolbar',
          handlers: { 'image': () => {
            this.author.image = 'http://placehold.it/300/400'
          }},
        },
      },
      theme: 'snow',
      placeholder: 'Author Name or Pseudonym',
    })
    this.ui.toolbarState.second = 'authorName'

    // load content
    this.nameQuill.setContents(JSON.parse(this.author.name))

    // keep data fresh
    this.nameQuill.on('text-change', (delta, oldDelta, source) => {
      this.author.nameText = this.nameQuill.getText()
      this.author.name = JSON.stringify(this.nameQuill.getContents())
    })

    // author About
    this.aboutQuill = new Quill('#authorAboutEditor', {
      modules: {
        toolbar: {
          container: '#authorAboutToolbar',
          handlers: { 'image': () => {
            this.author.image = 'http://placehold.it/300/400'
          }},
        },
      },
      theme: 'snow',
      placeholder: 'A little introduction? (optional)',
    })
    this.ui.toolbarState.second = 'authorName'

    // load content
    this.aboutQuill.setContents(JSON.parse(this.author.about))

    // keep data fresh
    this.aboutQuill.on('text-change', (delta, oldDelta, source) => {
      this.author.aboutText = this.aboutQuill.getText()
      this.author.about = JSON.stringify(this.aboutQuill.getContents())
    })

  }

  
  

}
