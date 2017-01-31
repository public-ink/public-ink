import { Component, OnInit, Input } from '@angular/core'

import { UIService } from '../ui.service'
import { StyleService} from '../style.service'

import { Article } from '../interfaces'

@Component({
  selector: 'app-article-preview',
  templateUrl: './article-preview.component.html',
  styleUrls: ['./article-preview.component.css']
})
export class ArticlePreviewComponent implements OnInit {

  // todo: move interfaces!
  @Input() article: Article

  constructor(
    private ui:UIService,
    private style: StyleService,
  ) { }

  ngOnInit() {
  }

  

  heroStyle(): any {
    let style
    if (!this.article || !this.article.imageUrl) {
      style = {}
    }
    else {
      style = {
        backgroundImage: `url("${this.article.imageUrl}=s${this.style.theme.contentWidth}")`,
        'height.px': 200,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }
    }
    return style
  }

}
