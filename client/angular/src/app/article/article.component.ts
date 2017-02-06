import { Component, OnInit, Input } from '@angular/core'

// ink
import { Article } from '../models'

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  @Input() article: Article

  constructor() { }

  ngOnInit() {
    console.log('got article', this.article)
  }

}
