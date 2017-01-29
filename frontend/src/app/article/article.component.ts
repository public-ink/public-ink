import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import { Router, ActivatedRoute, Params } from '@angular/router'
import 'rxjs/add/operator/switchMap'
import { Observable } from 'rxjs/Observable'

import { BackendService } from '../backend.service'
import { StyleService } from '../style.service'
import { UIService } from '../ui.service'

//import { Quill } from 'quill'

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  madeQuills: boolean = false

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

  constructor(
    private backend: BackendService,
    private style: StyleService,
    private ui: UIService,

    private route: ActivatedRoute,
    private router: Router
  ) { }



  titleImageHandler() {
    console.log('title imge handler')
    /*var range = this.quill.getSelection()
    if (!range) { return }
    let value = prompt('What is the image URL')
    quill.insertEmbed(range.index, 'image', value, 'user')*/
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.authorID = params['authorID']
      this.publicationID = params['publicationID']
      this.articleID = params['articleID']

      if (this.articleID === 'new') {
        this.article = this.backend.newArticle
        this.article.url = `/author/${this.authorID}/publication/${this.publicationID}/article/new`
        this.backend.currentResource = this.article
        this.makeQuills()
        return
      }

      return this.backend.getArticleByIDs(this.authorID, this.publicationID, this.articleID).subscribe((article) => {
        this.article = article
        this.backend.currentResource = this.article
        this.makeQuills()
      })
    })

    // set up quill (needed?)
    /*let coreModule = Quill.import('core/module')
    Quill.register('modules/modules', coreModule)*/



  }

  ngAfterViewChecked() {
    //this.makeQuills()
  }



  makeQuills() {
    console.log('make quills')
    if (this.madeQuills) {
      console.log('already done...')
      return
    }


    let editorEl = document.getElementById('articleTitleEditor')
    let toolbarEl = document.getElementById('articleTitleToolbar')
    console.log('article quill with', editorEl, toolbarEl)


    if (!editorEl) {
      return
    }
    this.madeQuills = true


    // article title
    this.titleQuill = new Quill('#articleTitleEditor', {
      modules: {
        toolbar: {
          container: '#articleTitleToolbar',
          //handlers: {'image': this.titleImageHandler},
        },
      },
      theme: 'snow',
      placeholder: 'such article title!',
    })
    this.ui.toolbarState.second = 'articleTitle'
    let titleContents = JSON.parse(this.article.title)
    this.titleQuill.setContents(titleContents)
    this.titleQuill.on('text-change', (delta, oldDelta, source)  => {
      this.article.titleText = this.titleQuill.getText()
      this.article.title = JSON.stringify(this.titleQuill.getContents())
    })

    // article title
    this.bodyQuill = new Quill('#articleBodyEditor', {
      modules: {
        toolbar: {
          container: '#articleBodyToolbar',
          //handlers: {'image': this.titleImageHandler},
        },
      },
      theme: 'snow',
      placeholder: 'such article title!',
    })
    this.ui.toolbarState.second = 'articleTitle'
    let bodyContents = JSON.parse(this.article.body)
    this.bodyQuill.setContents(bodyContents)

    this.bodyQuill.on('text-change', (delta, oldDelta, source)  => {
      this.article.bodyText = this.bodyQuill.getText()
      this.article.body = JSON.stringify(this.bodyQuill.getContents())
    })

  }

  $(selector) {
    return document.getElementById('selector')
  }

}
