// ng
import { Component, OnInit, Input, ViewChild, ElementRef, ChangeDetectionStrategy } from '@angular/core'
import { trigger, state, style, transition, animate } from '@angular/animations'

// rx
import { Observable } from 'rxjs/Observable'

// quill
import * as Quill from 'quill'

// ink
import { BackendService } from '../backend.service'
import { UIService } from '../ui.service'

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  animations: [
    trigger('articleState', [
      state('expanded', style({
        height: '*',
        opacity: 1,
      })),
      state('collapsed',   style({
        height: 0,
        opacity: 0,
      })),
      transition('collapsed => expanded', animate('400ms ease-in')),
      transition('expanded => collapsed', animate('400ms ease-out'))
    ]),
  ],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleComponent implements OnInit {

  // Data Inputs
  @Input('author') author
  @Input('publication') publication
  @Input('article') article

  @Input('editable') editable = false

  // HTML Elements
  @ViewChild('title') title: ElementRef

  // Editors
  @ViewChild('prefoldToolbar') prefoldToolbar: ElementRef
  @ViewChild('prefoldEditor') prefoldEditor: ElementRef

  @ViewChild('postfoldToolbar') postfoldToolbar: ElementRef
  @ViewChild('postfoldEditor') postfoldEditor: ElementRef

  // Quill Editors
  prefoldQuill: Quill
  postfoldQuill: Quill

  // styles
  style = {
    title: () => {
      return {
        'font-weight': 'bold',
        'outline': 'none',
        'border': 0,
        'font-size.px': this.ui.responsiveValue(35, 40),
        'margin-top.px': this.ui.responsiveValue(40, 50),
        'margin-bottom.px': 5,
        'width.%': 100,
      }
    }
  }

  constructor(
    public backend: BackendService,
    public ui: UIService,
  ) {}

  ngOnInit() {

    // editor setup
    this.makeQuill()

    // auto-save
    if (this.editable) {
      Observable.fromEvent(this.title.nativeElement, 'keyup').debounceTime(1000).subscribe(event => {
        this.autosave()
      })
    }
  }

  autosave() {
    if (this.article.id === 'create-article') { return }
    this.backend.saveArticle(this.author.id, this.publication.id, this.article).subscribe(res => {
      console.log('article component update', res)
    })
  }

  /** excplicitly create (with or without publishing) */
  save(publish = false) {
    this.backend.saveArticle(this.author.id, this.publication.id, this.article).subscribe(res => {
      // todo: swap the 'create-article' with the backend one.
      console.log('article component saved explicityl', res)
      this.article = res.data.saveArticle.article
    })
  }

  publish() {
    this.backend.publishArticle(this.author.id, this.publication.id, this.article.id).subscribe(res => {
      console.log(res)
      this.article = res.data.publishArticle.article
    })
  }
  unpublish() {
    this.backend.publishArticle(this.author.id, this.publication.id, this.article.id, true).subscribe(res => {
      console.log(res)
      this.article = res.data.publishArticle.article
    })
  }

  delete() {
    this.backend.deleteArticle(this.author.id, this.publication.id, this.article.id).subscribe(res => {
      console.log('article cmp delte article', res)
    })
  }

  makeQuill() {

    // PREFOLD EDITOR
    this.prefoldQuill = new Quill(this.prefoldEditor.nativeElement,  {
      modules: { toolbar: { container: this.prefoldToolbar.nativeElement }},
      theme: 'snow',
      placeholder: 'above the fold...',
    })

    // set content
    const prefoldContent = JSON.parse(this.article.prefoldJSON)
    this.prefoldQuill.setContents(prefoldContent)

    // record changes to model
    this.prefoldQuill.on('text-change', (delta, oldDelta, source) => {
      console.log('prefold text change')
      this.article.prefoldJSON = JSON.stringify(this.prefoldQuill.getContents())
      // todo: catch all focus events (even when nothing was typed)
      // this.lastRange = this.quill.getSelection()
    })

    // POSTFOLD EDITOR
    this.postfoldQuill = new Quill(this.postfoldEditor.nativeElement,  {
      modules: { toolbar: { container: this.postfoldToolbar.nativeElement }},
      theme: 'snow',
      placeholder: 'below the fold...',
    })

    // set content
    const postfoldContent = JSON.parse(this.article.postfoldJSON)
    this.postfoldQuill.setContents(postfoldContent)

    // record changes to model
    this.postfoldQuill.on('text-change', (delta, oldDelta, source) => {
      console.log('postfold text change')
      this.article.postfoldJSON = JSON.stringify(this.postfoldQuill.getContents())
      // todo: catch all focus events (even when nothing was typed)
      // this.lastRange = this.quill.getSelection()
    })
  }

}
