// ng
import { Component, OnInit, AfterViewInit, Input, ViewChild, ElementRef, ChangeDetectionStrategy } from '@angular/core'
import { trigger, state, style, transition, animate } from '@angular/animations'
import { DomSanitizer } from '@angular/platform-browser'

// rx
import { Observable } from 'rxjs/Observable'

// quill
import * as Quill from 'quill'

// ink
import { BackendService } from '../backend.service'
import { UIService } from '../ui.service'

// animations
const styles = {
  backgroundExtended: {
    'height': '60vh',
  },
  backgroundCompact: {
    'height': '*',
  },
  hideExtended: {
    // 'transform': 'scale(1)',
    height: '*',
    opacity: 1
  },
  hideCompact: {
    // 'transform': 'scaleY(0)',
    'height': '0px',
    'opacity': 0,
  },
  gone: {
    'height': '0px',
    'opacity': 0,
  },
  shown: {
    height: '*',
    opacity: 1
  }
}

const timings = {
  background: '300ms ease-in'
}

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  animations: [
    trigger('goneAnimation', [
      state('hidden', style(styles.gone)),
      state('compact', style(styles.shown)),
      transition('compact <=> hidden', animate(timings.background))
    ]),
    trigger('hideAnimation', [
      state('expanded', style(styles.hideExtended)),
      state('compact', style(styles.hideCompact)),
      transition('expanded <=> compact', animate(timings.background))
    ]),
    trigger('articleState', [
      state('expanded', style({
        height: '*',
        opacity: 1,
      })),
      state('collapsed', style({
        height: 0,
        opacity: 0,
      })),
      transition('collapsed => expanded', animate('400ms ease-in')),
      transition('expanded => collapsed', animate('400ms ease-out'))
    ]),
  ],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleComponent implements OnInit, AfterViewInit {

  // Data Inputs
  @Input('author') author
  @Input('publication') publication
  @Input('article') article

  // @Input('editable') editable = false
  editable = true // article cmp is for editing

  // pre / postfold
  @Input('expanded') expanded = 'expanded'
  @Input('preview') preview = false

  // HTML Elements
  @ViewChild('title') title: ElementRef

  // Editors
  @ViewChild('prefoldToolbar') prefoldToolbar: ElementRef
  @ViewChild('prefoldEditor') prefoldEditor: ElementRef

  @ViewChild('postfoldToolbar') postfoldToolbar: ElementRef
  @ViewChild('postfoldEditor') postfoldEditor: ElementRef

  accordionState = 'expanded'

  // Quill Editors
  prefoldQuill: Quill
  postfoldQuill: Quill

  // styles
  style = {
    title: () => {
      return {
        'font-weight': 'normal',
        'outline': 'none',
        'border': 0,
        'font-size.px': this.ui.responsiveValue(30, 35),
        'margin-top.px': this.ui.responsiveValue(40, 50),
        'margin-bottom.px': 5,
        'width.%': 100,
      }
    },
    body: () => {
      return {
        'font-family': 'Zilla Slab',
        'font-size.px': this.ui.responsiveValue(18, 20),
      }
    }
  }

  constructor(
    // ng
    public sanitizer: DomSanitizer,
    // ink
    public backend: BackendService,
    public ui: UIService,
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    console.log('article after view init: make quill')
    this.makeQuill()

    Observable.merge(
      Observable.fromEvent(this.prefoldEditor.nativeElement, 'keyup'),
      Observable.fromEvent(this.postfoldEditor.nativeElement, 'keyup'),
      Observable.fromEvent(this.title.nativeElement, 'keyup')
    ).debounceTime(1000).subscribe(event => {
      // emit event instead
      this.autosave()
    })
  }

  autosave() {
    // emit even instead
    if (this.article.new) { return }
    this.backend.saveArticle(this.author.id, this.publication.id, this.article).subscribe(res => {
      console.log('article component autosaved', res)
    })
  }

  create() {
    this.backend.saveArticle(this.author.id, this.publication.id, this.article).subscribe(res => {
      console.log('article component created article', res)
    })
  }


  makeQuill() {

    // PREFOLD EDITOR
    this.prefoldQuill = new Quill(this.prefoldEditor.nativeElement, {
      modules: { toolbar: { container: this.prefoldToolbar.nativeElement } },
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
      // might want to make more robust like: document.querySelector(".ql-editor").innerHTML
      this.article.prefoldHTML = this.prefoldEditor.nativeElement.children[0].innerHTML
      // todo: catch all focus events (even when nothing was typed)
      // this.lastRange = this.quill.getSelection()
    })

    // POSTFOLD EDITOR
    this.postfoldQuill = new Quill(this.postfoldEditor.nativeElement, {
      modules: { toolbar: { container: this.postfoldToolbar.nativeElement } },
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
      this.article.postfoldHTML = this.postfoldEditor.nativeElement.children[0].innerHTML
      // todo: catch all focus events (even when nothing was typed)
      // this.lastRange = this.quill.getSelection()
    })
  }

  safeHTML(html: string) {
    return this.sanitizer.bypassSecurityTrustHtml(html)
  }

}
