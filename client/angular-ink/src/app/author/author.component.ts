// ng
import { Component, OnInit, AfterViewInit, Input, Output, ViewChild, ElementRef, EventEmitter } from '@angular/core'
import { Router } from '@angular/router'
import { trigger, state, style, transition, animate } from '@angular/animations'


// rx
import { Observable } from 'rxjs/Observable'

// ink
import { BackendService, Author } from '../backend.service'
import { UIService } from '../ui.service'
import { AnimationService } from '../animation.service'


@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  animations: [
    trigger('arrowAnimation', [
      state('expanded', style({
        transform: 'rotate(225deg)'
      })),
      state('compact', style({
        transform: 'rotate(135deg)'
      })),
      transition('expanded <=> compact', animate('200ms ease-in')),
    ]),
    trigger('hideAnimation', [
      state('expanded', style({
        height: '*',
        opacity: 1,
      })),
      state('compact', style({
        height: 0,
        opacity: 0,
      })),
      transition('expanded <=> compact', animate('200ms ease-in')),
    ])
  ],
})
export class AuthorComponent implements OnInit, AfterViewInit {

  accordionState = 'compact'

  @Input('author') author: Author
  @Input('editable') editable: Boolean

  @ViewChild('name') name: ElementRef
  @ViewChild('about') about: ElementRef

  @Output() updateAuthor = new EventEmitter()
  @Output() deleteAuthor = new EventEmitter()

  badgeSize = 180

  publicationAccordionState = 'expanded'

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
        'color': 'white',
        'background': 'black',
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
        'font-family': 'Zilla Slab, serif'
      }
    },
  }

  

  constructor(
    // ng
    public router: Router,
    // ink
    public backend: BackendService,
    public ui: UIService,
    public animation: AnimationService,
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

  ngAfterViewInit() {
  }
  getAboutHeight() {
    const aboutHeight = this.about.nativeElement.scrollHeight
  }

  toggleAuthor() {
    this.author.accordionState = this.author.accordionState === 'compact' ? 'expanded' : 'compact'
    for (const publication of this.author.publications) {
      publication.accordionState = this.author.accordionState
      for (const article of publication.articles) {
        article.accordionState = this.author.accordionState
      }
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
