// ng
import { Component, OnInit, AfterViewInit, Input, Output, ViewChild, ElementRef, EventEmitter } from '@angular/core'
import { DomSanitizer } from '@angular/platform-browser'

// rx
import { Observable } from 'rxjs/Observable'

// ink
import { UIService } from '../ui.service'
import { BackendService } from '../backend.service'

// interfaces
import {Author, Publication, SavePublicationResponse} from '../backend.service'



@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent implements OnInit, AfterViewInit {

  @Input('author') author: Author
  @Input('publication') publication: Publication
  @Input('editable') editable: Boolean

  @ViewChild('name') name: ElementRef
  @ViewChild('about') about: ElementRef

  @Output() updatePublication = new EventEmitter()

  styles = {
    name: () => {
      return {
        'font-size.px': this.ui.responsiveValue(40, 45),
        'font-weight': 'bold',
        'color': '#fff',
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

  ngOnInit() {
    if (!this.publication) {
      this.publication = {
        id: 'create-publication',
        name: '',
        about: '',
        imageURL: '',
        articles: [],
      }
    }
  }

  ngAfterViewInit() {

    /* // stop listening to name, it will be disabled. instead, to drop! :)
    Observable.merge(
      Observable.fromEvent(this.name.nativeElement, 'keyup'),
      Observable.fromEvent(this.about.nativeElement, 'keyup'),
    ).debounceTime(1000).subscribe(() => {
      if (this.publication.id !== 'create-publication') {
        this.updatePublication.next()
      }
    }) */
  }

  onDragOver($event) {
    $event.preventDefault()
    $event.stopPropagation()
  }

  onDrop() {
    console.log('publication drop')
    this.publication.imageURL = this.ui.beingDragged.url
    if (this.publication.id !== 'create-publication') {
      this.updatePublication.next()
    }
  }

  safeBG(url: string) {
    const str = `url(${this.publication.imageURL}&w=${this.ui.deviceWidth})`
    return this.sanitizer.bypassSecurityTrustStyle(str)
  }


}
