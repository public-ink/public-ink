// ng
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core'
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
  ]
})
export class ArticleComponent implements OnInit {

  // Data Inputs
  @Input('author') author
  @Input('publication') publication
  @Input('article') article

  // HTML Elements
  @ViewChild('title') title: ElementRef

  // this will become obsolete
  @ViewChild('toolbar') toolbar: ElementRef
  @ViewChild('editor') editor: ElementRef

  @ViewChild('prefoldToolbar') prefoldToolbar: ElementRef
  @ViewChild('prefoldEditor') prefoldEditor: ElementRef

  @ViewChild('postfoldToolbar') postfoldToolbar: ElementRef
  @ViewChild('postfoldEditor') postfoldEditor: ElementRef

  prefoldQuill: Quill
  postfoldQuill: Quill

  quill: Quill

  style = {
    title: () => {
      return {
        'font-size.px': this.ui.responsiveValue(30, 40),
        'font-weight': 'bold',
        'outline': 'none',
        'border': 0,
      }
    }
  }

  constructor(
    public backend: BackendService,
    public ui: UIService,
  ) {}

  ngOnInit() {
    this.makeQuill()

    Observable.fromEvent(this.title.nativeElement, 'keyup').debounceTime(1000).subscribe(event => {
      console.log('title up after 1 sec')
      this.save()
    })


  }

  save() {
    this.backend.saveArticle(this.author.id, this.publication.id, this.article).subscribe(res => {
      console.log('article component saved like a bro', res)
    })
  }

  makeQuill() {
    const modules = {
      toolbar: {
        container: this.toolbar.nativeElement,
      },
    }

    this.quill = new Quill(this.editor.nativeElement, {
      modules: modules,
      theme: 'snow',
      placeholder: 'Your story goes here...',
    })
    const ops = JSON.parse(this.article.bodyOps)
    this.quill.setContents(ops)


    // prefold
    this.prefoldQuill = new Quill(this.prefoldEditor.nativeElement,  {
      modules: modules,
      theme: 'snow',
      placeholder: 'above the fold...',
    })
    // todo: parse prefold ops
    this.prefoldQuill.setContents(ops)

    // postfold
    this.postfoldQuill = new Quill(this.postfoldEditor.nativeElement,  {
      modules: modules,
      theme: 'snow',
      placeholder: 'below the fold...',
    })
    // todo: parse postfold ops
    this.postfoldQuill.setContents(ops)

  }

}
