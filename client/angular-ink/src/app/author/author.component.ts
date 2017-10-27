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

  // @Output() updateAuthor = new EventEmitter()
  // @Output() deleteAuthor = new EventEmitter()

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
        'margin-bottom.px': 0,
        'text-align': 'center',
        'color': 'black',
        'background': 'white',
        'font-style': 'italic',
      }
    },
    about: () => {
      return {
        'font-size.px': this.ui.responsiveValue(18, 20),
        'font-weight': 'normal',
        'outline': 'none',
        'border': 0,
        'padding': '20px 10px',
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
          this.updateAuthor()
          //this.updateAuthor.next()
        }
      })
    }
  }

  ngAfterViewInit() {
  }
  getAboutHeight() {
    const aboutHeight = this.about.nativeElement.scrollHeight
  }

  /**
   * allow to compact them publications
   */
  setPublicationView(state) {
    for (let publication of this.author.publications) {
      publication.accordionState = state
      for (let article of publication.articles) {
        if (state === 'compact') {
          article.accordionState = 'hidden'
        }
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
    // autosave?
    if (!this.author.new) { this.updateAuthor() }
    $event.preventDefault()
    $event.stopPropagation()
  }

  /**
   * creates a new author, and navigates, again to this component
   * in that case, our router subscription won't do anything (not create a new object, nor load from backend again)
   */
  createAuthor() {
    this.backend.saveAuthor(this.author).subscribe(result => {
      this.author = result.data.saveAuthor.author
      this.router.navigate(['/', this.author.id])
    })
  }

  /**
   * same as create, just without the navigation
   */
  updateAuthor() {
    this.backend.saveAuthor(this.author).subscribe(result => {
      this.author = result.data.saveAuthor.author
    })
  }

  deleteAuthor() {
    const answer: any = confirm('are you sure you want to delte ' + this.author.name)
    console.log(answer, 'answer')
    if (answer) {
        // go ahead
        this.backend.deleteAuthor(this.author.id).subscribe(result => {
          console.log('author page delete author', result)
          if (result.data.deleteAuthor.success) {
            console.log('deleted! neet to navigate somewhere:)')
            this.backend.account.authors = this.backend.account.authors.filter(author => author.id !== this.author.id)
            this.router.navigate(['/'])
          }
        })
    }
  }


  /**
   * start publication
   */
  startPublication() {
    this.author.publications.unshift(
      {
        id: 'create-publication',
        accordionState: 'expanded',
        name: 'so new',
        about: 'such about',
        imageURL: '',
        new: true,
        position: 400000,
        articles: []
      }
    )
  }
}
