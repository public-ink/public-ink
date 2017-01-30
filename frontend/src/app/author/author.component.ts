import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute, Params } from '@angular/router'
import 'rxjs/add/operator/switchMap'
import { Observable } from 'rxjs/Observable'

import { BackendService } from '../backend.service'
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
    private ui: UIService,

    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.authorID = params['authorID']

      if (this.authorID === 'new') {
        this.author = this.backend.newAuthor
        // do we need to tell the backend? I guess so
        this.backend.currentResource = this.author
        this.makeQuills()
        return
      }

      return this.backend.getAuthorByID(this.authorID).subscribe((author) => {
        this.author = author
        this.backend.currentResource = this.author  
        this.makeQuills()      
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
    // Publication Name
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
      placeholder: 'Boom!',
    })
    this.ui.toolbarState.second = 'authorName'

    // load content
    this.nameQuill.setContents(JSON.parse(this.author.name))

    // keep data fresh
    this.nameQuill.on('text-change', (delta, oldDelta, source) => {
      this.author.nameText = this.nameQuill.getText()
      this.author.name = JSON.stringify(this.nameQuill.getContents())
    })

  }

}
