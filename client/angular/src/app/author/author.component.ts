// Angular
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core'

import { Author } from '../models'


@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {

  // the ID is taken from the current route
  authorID: string
  // the author is retrieved from the backend
  @Input() author: Author
  @Output() onSave: EventEmitter<any> = new EventEmitter()

  constructor(
    
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
