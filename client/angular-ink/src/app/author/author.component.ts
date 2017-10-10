// ng
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core'

// rx
import { Observable } from 'rxjs/Observable'

// ink
import { BackendService } from '../backend.service'
import { UIService } from '../ui.service'


@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {

  @Input('author') author

  @ViewChild('name') name: ElementRef
  @ViewChild('about') about: ElementRef

  badgeSize = 180

  style = {
    name: () => {
      return {
        'font-size.px': this.ui.responsiveValue(30, 40),
        'font-weight': 'bold',
        'outline': 'none',
        'border': 0,
        'text-align': 'center',
      }
    }
  }

  constructor(
    public backend: BackendService,
    public ui: UIService,
  ) { }

  ngOnInit() {
    if (!this.author) {
      this.author = {
        name: '',
        about: '',
        publications: []
      }
    }

    Observable.merge(
      Observable.fromEvent(this.name.nativeElement, 'keyup'),
      Observable.fromEvent(this.about.nativeElement, 'keyup'),
    ).debounceTime(1000).subscribe(() => {
      this.save()
    })

  }

  /**
   * creates the author
   *
   *
   */
  create() {
    
  }

  /**
   * Updates the author
   */
  update() {

  }

  /**
   * Deletes the author
   */
  delete() {

  }

  save() {
    console.log('save!')
    this.backend.saveAuthor(this.author).subscribe(result => {
      console.log('author saved author!')
    })
  }


  /** dropping images in the authors picture */
  onDragOver($event) {
    $event.preventDefault()
    $event.stopPropagation()
  }

  onDrop($event) {
    this.author.imageURL = this.ui.beingDragged.url + `&w=${this.badgeSize}&h=${this.badgeSize}`
    $event.preventDefault()
    $event.stopPropagation()
  }


}
