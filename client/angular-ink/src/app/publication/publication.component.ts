// ng
import { Component, OnInit, AfterViewInit, Input, Output, ViewChild, ElementRef, EventEmitter } from '@angular/core'
import { DomSanitizer } from '@angular/platform-browser'
import { trigger, state, style, transition, animate } from '@angular/animations'


// rx
import { Observable } from 'rxjs/Observable'

// ink
import { UIService } from '../ui.service'
import { BackendService } from '../backend.service'

// interfaces
import {Author, Publication, SavePublicationResponse} from '../backend.service'

// animations
const styles = {
  backgroundExtended: {
    'height': '60vh',
  },
  backgroundCompact: {
    'height': '*',
    'background-position-y': '50%',
  },
  hideExtended: {
    // 'transform': 'scale(1)',
    height: '*',
    opacity: 1
  },
  hideCompact: {
    // 'transform': 'scaleY(0)',
    'height': '0px',
    'opacity': 0,
  }
}

const timings = {
  background: '300ms ease-in'
}

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  animations: [
    trigger('backgroundAnimation', [
      state('expanded', style(styles.backgroundExtended)),
      state('compact', style(styles.backgroundCompact)),
      transition('expanded <=> compact', animate(timings.background))
    ]),
    trigger('hideAnimation', [
      state('expanded', style(styles.hideExtended)),
      state('compact', style(styles.hideCompact)),
      transition('expanded <=> compact', animate(timings.background))
    ])
  ]
})
export class PublicationComponent implements OnInit, AfterViewInit {

  @Input('author') author: Author
  @Input('publication') publication: Publication
  @Input('editable') editable: Boolean

  @ViewChild('name') name: ElementRef
  @ViewChild('about') about: ElementRef

  // cozy or compact! as string
  cozyState = 'cozy'
  // accordionState = 'expanded'
  @Input('accordionState') accordionState = 'expanded'

  styles = {
    name: (transparent?) => {
      return {
        'font-size.px': this.ui.responsiveValue(40, 45),
        'font-weight': 'bold',
        // 'font-weight': this.publication.accordionState === 'compact' ? 'normal' : 'bold',
        'color': transparent ? 'rgba(0,0,0,0)' : '#fff',
        'margin': '80px 0px 80px 0px',
        // 'background-color': 'transparent',
        'text-align': 'left',
        'width.%': 100,
        'outline': 'none',
        'border': 0,
      }
    },
    about: () => {
      return {
        'font-size.px': this.ui.responsiveValue(15, 20),
        'font-weight': 'normal',
        'color': '#fff',
        'text-align': 'left',
        'outline': 'none',
        'border': 0,
        'width.%': 100,
      }
    },
    button: () => {
      return {
        'color': 'white',
        'border-radius': '2px',
        'padding': '5px 20px',
        'font-size': '18px',
        'border': '1px solid #ddd',
        'background-color': 'rgba(255, 255, 255, 0.05)',
      }
    }
  }

  deleted = false

  constructor(
    // ng
    public sanitizer: DomSanitizer,
    // ink
    public ui: UIService,
    public backend: BackendService,
  ) { }

  toggle() {
    this.publication.accordionState = this.publication.accordionState === 'expanded' ? 'compact' : 'expanded'
    for (let article of this.publication.articles) {
      article.accordionState = this.publication.accordionState
    }
  }

  ngOnInit() {
    if (!this.publication) {
      this.publication = {
        id: 'create-publication',
        name: '',
        about: '',
        imageURL: '',
        articles: [],
        position: 600000
      }
    }
  }

  ngAfterViewInit() {

    if (this.editable) {
       // stop listening to name, it will be disabled. instead, to drop! :)
        Observable.merge(
          Observable.fromEvent(this.name.nativeElement, 'keyup'),
          Observable.fromEvent(this.about.nativeElement, 'keyup'),
        ).debounceTime(1000).subscribe(() => {
          if (this.publication.id !== 'create-publication') {
            this.updatePublication()
          }
        })
    }
  }

  onDragOver($event) {
    $event.preventDefault()
    $event.stopPropagation()
  }

  onDrop() {
    console.log('publication drop')
    this.publication.imageURL = this.ui.beingDragged.url
    if (this.publication.id !== 'create-publication') {
      this.updatePublication()
    }
  }

  safeBG(url: string) {
    const str = `url(${this.publication.imageURL}&w=${this.ui.deviceWidth})`
    return this.sanitizer.bypassSecurityTrustStyle(str)
  }

  deletePublication() {
    const answer = window.confirm('wanna delete this publications?')
    if (answer) {
      this.backend.deletePublication(this.author.id, this.publication.id).subscribe(res => {
        console.log('delete publication?', res)
        // hide, mark deleted or whatever.
        if (res.data.deletePublication.success) {
          // remove from account - with animation would be nice
          // this.deleted = true
          console.warn('todo: remove publication from account.')
        }
      })
    }
  }

  updatePublication() {
    this.backend.loading = true
    this.backend.savePublication(this.author.id, this.publication).subscribe(res => {
      console.log('publication saved publication!')
      this.backend.loading = false
    })
  }


  // todo: author id?
  create() {
    this.backend.loading = true
    this.backend.savePublication(this.author.id, this.publication).subscribe((res: SavePublicationResponse) => {
      if (res.data.savePublication.info.success) {
        this.backend.loading = false
        // you have to set the publication to expanded...
        // do we still have expanded??
        // console.log('saved publication')
        // this.publication = res.data.savePublication.publication
      }
    })
  }

  startArticle() {
    const newArticle = {
      id: 'create-article',
      title: 'such article',
      prefoldJSON: '{}',
      prefoldHTML: '',
      postfoldJSON: '{}',
      postfoldHTML: '',
      position: 300,
      new: true,
    }
    this.publication.articles.unshift(newArticle)
  }

}
