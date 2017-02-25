import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core'

// ink
import { Article } from '../models'

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  @Input() article: any // iArticle
  @ViewChild('editor') editor: ElementRef
  @ViewChild('toolbar') toolbar: ElementRef
  

  quill: any

  constructor() { }

  ngOnInit() {
    console.log('got article', this.article)
    console.log('jo', this.editor)
    this.makeQuill()
  }

  makeQuill() {
    this.quill = new Quill(this.editor.nativeElement, {
      modules: {
        toolbar: {
          container: this.toolbar.nativeElement,
          //handlers: {'image': this.titleImageHandler},
        },
      },
      theme: 'snow',
      placeholder: 'here is where you lay your words down...',
    })

    let ops 
    try {
      ops = JSON.parse(this.article.bodyOps)
    } catch(e) {
      console.warn('error parsing json, this is the offender:', this.article.bodyOps)
      ops = {"ops":[{"insert":"error parsing json\n"}]}
    }

    this.quill.setContents(ops)

    this.quill.on('text-change', (delta, oldDelta, source) => {
      /* 
      keep the article bodyOps property in sync, for saving.
      */
      this.article.bodyOps = JSON.stringify(this.quill.getContents())
      
    })
  }

}
