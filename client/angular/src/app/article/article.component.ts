import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core'

// ink
import { Article } from '../models'

import { UIService } from '../ui.service'

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  @Input() article: any // iArticle
  @Input() editable: boolean = false
  @Input() preview: boolean = false

  @ViewChild('editor') editor: ElementRef
  @ViewChild('hidden') hidden: ElementRef

  quill: any
  lastRange: any

  constructor(
    private ui: UIService,
  ) { }

  ngOnInit() {
    this.makeQuill()
    this.ui.mediaClickObservable.subscribe(image => {
      this.insertImage(image.url + '&w=700')
    })
  }

  makeQuill() {

    let modules
    if (this.editable) {
      console.log('editbale article!')
      modules = {
        toolbar: {
          container: document.getElementById('toolbar'),
          //handlers: {'image': this.titleImageHandler},
        },
      }
    } else {
      console.log('making quill with hidden toolbar', this.hidden.nativeElement)
      modules = {
        toolbar: {
          container: this.hidden.nativeElement,
          //handlers: {'image': this.titleImageHandler},
        },
      }
    }

    this.quill = new Quill(this.editor.nativeElement, {
      modules: modules,
      theme: 'snow',
      placeholder: 'here is where you lay your words down...',
    })

    let ops
    try {
      ops = JSON.parse(this.article.bodyOps)
      if (this.preview) {
        console.warn(ops)
        let OpsObs = ops.ops.slice(0,5)
        ops.ops = OpsObs
      }
    } catch (e) {
      console.error(e)
      console.warn('error parsing json, this is the offender:', this.article.bodyOps)
      ops = { "ops": [{ "insert": "error parsing json\n" }] }
    }

    this.quill.setContents(ops)
    if (!this.editable) {
      this.quill.disable()
    }

    this.quill.on('text-change', (delta, oldDelta, source) => {
      /* 
      keep the article bodyOps property in sync, for saving.
      */
      this.article.bodyOps = JSON.stringify(this.quill.getContents())
      this.lastRange = this.quill.getSelection()
    })
  }

  insertImage(url: string) {
    this.quill.insertEmbed(this.lastRange.index, 'image', url, 'user')
  }

}
