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

  // expect media clicks
  expectArticleImage: boolean = true

  constructor(
    private backend: BackendService,
    private style: StyleService,
    private ui: UIService,

    private route: ActivatedRoute,
    private router: Router
  ) {


    /**
     * Subscribe to media clicks
     */
    this.backend.mediaStreamOut.subscribe(media => {
      console.log('article knows media was selected!', media)
      if (this.expectArticleImage === false) {
        let range = this.bodyQuill.getSelection()
        this.bodyQuill.insertEmbed(range.index, 'image', media.url, 'user')
      } else {
        this.article.imageUrl = media.url
      }
    })
  }



  titleImageHandler() {
    console.log(this)
    //article.image = 'https://images.unsplash.com/photo-1480321182142-e77f14b9aa64?dpr=2&auto=format&fit=crop&w=767&h=511&q=80&cs=tinysrgb&crop='
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

  }

  /* cleanup */
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
          handlers: {
            'image': () => {
              console.log('handler', this)
              this.article.image = 'https://images.unsplash.com/photo-1480321182142-e77f14b9aa64?dpr=2&auto=format&fit=crop&w=767&h=511&q=80&cs=tinysrgb&crop='
            }
          },
        },
      },
      theme: 'snow',
      placeholder: 'such article title!',
    })
    this.ui.toolbarState.second = 'articleTitle'
    this.titleQuill.setContents(JSON.parse(this.article.title))
    this.titleQuill.on('text-change', (delta, oldDelta, source) => {
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
      placeholder: 'here is where you lay your words down...',
    })
    this.ui.toolbarState.second = 'articleTitle'
    let bodyContents = JSON.parse(this.article.body)
    this.bodyQuill.setContents(bodyContents)

    this.bodyQuill.on('text-change', (delta, oldDelta, source) => {
      this.article.bodyText = this.bodyQuill.getText()
      this.article.body = JSON.stringify(this.bodyQuill.getContents())
    })

  }

  imageStyle(): any {
    let style
    if (!this.article || !this.article.imageUrl) {
      style = {}
    }
    else {
      style = {
        backgroundImage: `url("${this.article.imageUrl}=s${this.style.theme.contentWidth}")`,
        'height.px': 400,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }
    }
    return style
  }

  $(selector) {
    return document.getElementById('selector')
  }

}

export class Resource {

}

export class Article extends Resource {
  id: string
  titleText: string
}