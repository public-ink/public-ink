// ng
import { Component, OnInit, Input, Output, ViewChild, ElementRef, EventEmitter } from '@angular/core'
import { Router } from '@angular/router'

// rx
import { Observable } from 'rxjs/Observable'

// ink
import { BackendService, Author } from '../backend.service'
import { UIService } from '../ui.service'


@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {

  @Input('author') author: Author
  @Input('editable') editable: Boolean

  @ViewChild('name') name: ElementRef
  @ViewChild('about') about: ElementRef

  @Output() updateAuthor = new EventEmitter()
  @Output() deleteAuthor = new EventEmitter()

  badgeSize = 180

  style = {
    badge: () => {
      return {
        display: 'none',
        padding: '15px',
        border: '2px dotted #eee',
        'border-radius.%': 100,
      }
    },
    name: () => {
      return {
        'font-size.px': this.ui.responsiveValue(30, 40),
        'font-weight': 'bold',
        'outline': 'none',
        'border': 0,
        'text-align': 'left',
        'margin-bottom.px': 50,
      }
    },
    about: () => {
      return {
        'font-size.px': this.ui.responsiveValue(18, 20),
        'font-weight': 'normal',
        'outline': 'none',
        'border': 0,
        'text-align': 'left',
        'width.%': 100,
        'font-family': 'Zillo Slab, serif'
      }
    },
  }

  constructor(
    // ng
    public router: Router,
    // ink
    public backend: BackendService,
    public ui: UIService,
  ) { }

  ngOnInit() {
    // autosave on about edit
    if (!this.author.new) {
      // also observe drop
      Observable.fromEvent(this.about.nativeElement, 'keyup').debounceTime(1000).subscribe(() => {
        if (this.author.id !== 'create-author') {
          this.updateAuthor.next()
        }
      })
    }
  }


  /** dropping images in the authors picture */
  onDragOver($event) {
    $event.preventDefault()
    $event.stopPropagation()
  }

  onDrop($event) {
    this.author.imageURL = this.ui.beingDragged.url
    if (!this.author.new) { this.updateAuthor.next() }
    $event.preventDefault()
    $event.stopPropagation()
  }

}
