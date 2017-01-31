import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core'

import { UIService } from '../ui.service'
import { StyleService} from '../style.service'

import { Article } from '../interfaces'

@Component({
  selector: 'app-article-preview',
  templateUrl: './article-preview.component.html',
  styleUrls: ['./article-preview.component.css']
})
export class ArticlePreviewComponent implements OnInit {

  @Input() article: Article
  @ViewChild('quill') quillContainer: ElementRef


  bodyQuill: any

  constructor(
    private ui:UIService,
    private style: StyleService,
  ) { }

  ngOnInit() {
    this.makeQuill()
  }

  makeQuill() {
    // article title
    this.bodyQuill = new Quill(this.quillContainer.nativeElement, {
      modules: {
        toolbar: {
          container: '#articleTitleToolbar',
        },
      },
      theme: 'snow',
      placeholder: 'such article title!',
    })
    let ops = JSON.parse(this.article.body).ops
    console.log(ops)
    let teaser = {ops: [ops[0]]}
    this.bodyQuill.setContents(teaser)
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
