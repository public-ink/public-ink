import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import { Router, ActivatedRoute, Params } from '@angular/router'
import 'rxjs/add/operator/switchMap'
import { Observable } from 'rxjs/Observable'

import { BackendService } from '../backend.service'
import { StyleService } from '../style.service'

//import { Quill } from 'quill'

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  // title editor
  @ViewChild('titleEditorTools') titleEditorTools: ElementRef
  @ViewChild('titleEditor') titleEditor: ElementRef
  // teaser editor
  @ViewChild('teaserEditorTools') teaserEditorTools: ElementRef
  @ViewChild('teaserEditor') teaserEditor: ElementRef
  // body editor
  @ViewChild('bodyEditorTools') bodyEditorTools: ElementRef
  @ViewChild('bodyEditor') bodyEditor: ElementRef

  // quill in town!
  titleQuill: any
  teaserQuill: any
  bodyQuill: any

  // get from backend
  article: any
  // incoming url params
  authorID: string
  publicationID: string
  articleID: string

  // local state
  editing: boolean

  bodyToolbar: boolean = false

  constructor(
    private backend: BackendService,
    private style: StyleService,

    private route: ActivatedRoute,
    private router: Router
  ) { }


  // to prevent this.quill error
  quill

  imageHandler() {
    let quill = this.quill
    console.log(quill, 'rock! custom handler here!')
    var range = quill.getSelection()
    if (!range) { return }
    let value = prompt('What is the image URL')
    //let value = 'http://placehold.it/300'
    quill.insertEmbed(range.index, 'image', value, 'user')
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.authorID = params['authorID']
      this.publicationID = params['publicationID']
      this.articleID = params['articleID']

      if (this.articleID === 'new') {
        this.article = this.backend.newArticle
        this.article.url = `/author/${this.authorID}/publication/${this.publicationID}/article/new`
        return
      }

      return this.backend.getArticleByIDs(this.authorID, this.publicationID, this.articleID).subscribe((article) => {
        this.article = article
      })
    })

    // set up quill (needed?)
    let coreModule = Quill.import('core/module')
    Quill.register('modules/modules', coreModule)


    
  }

  

  makeQuill() {
    let titleEditorEl = this.titleEditor.nativeElement
    let titleEditorToolsEL = this.titleEditorTools.nativeElement
    this.titleQuill = new Quill(
      titleEditorEl, {
        modules: { toolbar: titleEditorToolsEL },
        theme: 'snow',
        placeholder: 'Title goes here',        
      }
    )
    let titleContents = JSON.parse(this.article.title)
    this.titleQuill.setContents(titleContents)


    let teaserEditorEl = this.teaserEditor.nativeElement
    let teaserEditorToolsEL = this.teaserEditorTools.nativeElement
    let teaserToolbarOptions = [['image']]
    this.teaserQuill = new Quill(
      teaserEditorEl, {
        modules: {
          modules: { toolbar: teaserToolbarOptions /*bodyEditorToolsEL*/ },
          
        },

        theme: 'snow',
        placeholder: 'Teaser goes here',
      }
    )

    var toolbar = this.teaserQuill.getModule('toolbar')
    toolbar.addHandler('image', this.imageHandler)

    let teaserContents = JSON.parse(this.article.teaser)
    this.teaserQuill.setContents(teaserContents)


    let bodyToolbarOptions = [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],

      ['link', 'image', 'video', 'formula'],          // add's image support

/*

      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
      //[{ 'direction': 'rtl' }],                         // text direction

      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      */
      [{ 'header': [1, 2, false] }],
/*
      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],*/

      ['clean']                                         // remove formatting button
    ]

    let bodyEditorEl = this.bodyEditor.nativeElement
    let bodyEditorToolsEL = this.bodyEditorTools.nativeElement
    this.bodyQuill = new Quill(
      bodyEditorEl, {
        modules: { toolbar: bodyToolbarOptions /*bodyEditorToolsEL*/ },
        theme: 'snow',
        placeholder: 'Body goes here',
        
      }
    )

    var toolbar = this.bodyQuill.getModule('toolbar')
    toolbar.addHandler('image', this.imageHandler)

    let bodyContents = JSON.parse(this.article.body)
    this.bodyQuill.setContents(bodyContents)

  }


  ngAfterViewChecked() {
    if (!this.titleQuill && this.titleEditor) {
      this.makeQuill()
    }
  }

  saveArticle() {
    
    this.article.title = JSON.stringify(this.titleQuill.getContents())
    this.article.teaser = JSON.stringify(this.teaserQuill.getContents())
    this.article.body = JSON.stringify(this.bodyQuill.getContents())
    if (this.article.id === 'new') {
      this.article.titleText = this.titleQuill.getText()
      this.backend.createArticle(this.article)
      return
    }
    this.backend.updateArticle(this.article)
  }

  toggleToolbar(editor: string) {
    if (editor === 'title') {

      this.titleQuill.getModule('toolbar').container.style.display = 'none'
    } else if (editor == 'body') {

      let next
      if (this.bodyToolbar) {
        next = 'none'
        this.bodyToolbar = false
      } else {
        next = 'block'
        this.bodyToolbar = true
      }

      this.bodyQuill.getModule('toolbar').container.style.display = next
      this.bodyQuill.getModule('toolbar').container.style.backgroundColor = 'white'

      let containerStyle = this.bodyQuill.getModule('toolbar').container.style
      containerStyle.width = '100%'
      containerStyle.maxWidth = this.style.theme.contentWidth + 'px'
      containerStyle.backgroundColor = 'lime'
      containerStyle.zIndex = 3
    }


  }
  isHidden(el) {
    return (el.offsetParent === null)
  }

}
