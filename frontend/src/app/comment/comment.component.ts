import { Component, OnInit, Input } from '@angular/core'

import { BackendService } from '../backend.service'

import { Comment, Article } from '../interfaces'

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() article: Article
  @Input() comment: Comment

  constructor(
    private backend: BackendService,
  ) { }

  ngOnInit() {
    if (!this.comment) {
      this.comment = {
        id: 'new',
        userID: '',
        body: '',
        bodyText: 'such comment, body!',
        url: this.article.url + '/comment/new'
      }
    }
  }

  stil = {
    body: () => {
      return {
        width: '100%',
        'fontSize.px': 30,
      }
    }
  }
}
