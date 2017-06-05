// Angular
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core'
import { DomSanitizer } from '@angular/platform-browser'

// Ink
//import { iAuthor } from '../models'
import { UIService } from '../ui.service'

interface iAuthor {
    id: string
    name: string
    about: string
    imageURL: string
    new?: boolean
}


@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {

  // the ID is taken from the current route
  authorID: string
  // the author is retrieved from the backend, or 'new'
  @Input() author: iAuthor
  @Input() editable: boolean = false
  @Input() size: string
  @Output() onSave: EventEmitter<any> = new EventEmitter()

  // this output is emitted straight from the template!
  @Output() create: EventEmitter<any> = new EventEmitter()

  imageStyle = {
    boxShadow: this.sanitizer.bypassSecurityTrustStyle('inset 0 1.5px 3px 0 rgba(0,0,0,.15), 0 1.5px 3px 0 rgba(0,0,0,.15)'),
    border: this.size === 'sticker' ? '3px solid green' : '8px solid #fff',
  }

  imgStyle() {
    if (this.size === 'sticker') {
      return {
        'width.px': 70,
        'height.px': 70,
      }
    }
    else {
      return {
        'width.px': 250,
        'height.px': 250,
      }
    }
  }
  nameStyle(): any {
    if (this.size === 'sticker') {
      return {
        'font-size.px': 14,
        'margin': '5px 0',
        'font-weight': 'bold',
      }
    }
    else {
      return {
        'font-size.px': 50,
        'font-weight': 'bold',
        'margin': '10px 0',
        'border': 0,
        'width.%': 100,
        'textAlign': 'center',
      }
    }
  }
  aboutStyle() {
    if (this.size === 'sticker') {
      return {
        'font-size.px': 12,
      }
    }
    else {
      return {
        'font-size.px': 18,
      }
    }
  }
  pad = this.size === 'sticker' ? 5 : 20



  constructor(
    private ui: UIService,
    private sanitizer: DomSanitizer,
  ) {
    
  }



  ngOnInit() {
    console.log('author cmp here', this.author)

  }

  ngOnChanges() {
    console.log('author cmp input changed', this.author)
  }

  emitSaveAuthor() {
    console.log('author cmp emits onSave')
    this.onSave.emit()
  }

}
