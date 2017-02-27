import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'

import { Observable } from 'rxjs/Observable'
import 'rxjs/Rx'

import gql from 'graphql-tag'
import { Apollo } from 'apollo-angular'

import { BackendService } from '../backend.service'
import { UIService } from '../ui.service'

interface Quill {
  new (container: string | Element, options?: any): Quill;
}

interface UpdateResponse {

  updateArticle: {
    article: {
      title: string
      teaser: string
    }
  }
}

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.css']
})
export class ArticlePageComponent implements OnInit {

  authorID: string
  publicationID: string
  articleID: string

  // loaded via graphql
  data: any
  article: any
  // quill
  bodyQuill: any
  madeQuill: boolean = false



  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private backend: BackendService,
    private apollo: Apollo,
    private ui: UIService,
  ) { 

    // keyboard shortcuts
    Observable.fromEvent(window, 'keydown').subscribe((event: KeyboardEvent) => {

      // save article
      if ((event.metaKey || event.ctrlKey) && event.keyCode === 83) { /*ctrl s */
        this.save()
        event.preventDefault()
      }
    })

  }

  ngAfterViewChecked() {
    this.makeQuill()
  }

  ngOnInit() {

    this.route.params.subscribe(params => {

      this.authorID = params['authorID']
      this.publicationID = params['publicationID']
      this.articleID = params['articleID']

      if (this.articleID === 'create-article') {
        this.article = {
          title: 'no title yet',
          bodyOps: '{}',
        }
      } else {
        this.backend.getArticle(this.authorID, this.publicationID, this.articleID).subscribe(article => {
          this.article = JSON.parse(JSON.stringify(article))
          this.makeQuill()
        })
      }
    })
  }


  save() {
    console.log('saving' + this.article.title)
    this.backend.saveArticle(
      this.authorID,
      this.publicationID,
      this.articleID,
      this.article).subscribe(info => {
        this.ui.message = 'article saved'
        setTimeout(() => this.ui.message = '', 1000)
    })
  }
  delete() {

    this.backend.deleteArticle(this.article).subscribe(info => {
      this.ui.message = info.message
      this.router.navigate(['/', this.authorID, this.publicationID])
    })
  }

  makeQuill() {
    // this needs to change to a ref, in case there are more than one.
    let el = document.getElementById('articleBodyEditor')
    if (!el || !this.article || this.madeQuill) {
      return
    }
    this.bodyQuill = new Quill('#articleBodyEditor', {
      modules: {
        /*toolbar: {
          container: '#articleBodyToolbar',
          //handlers: {'image': this.titleImageHandler},
        },*/
      },
      theme: 'snow',
      placeholder: 'here is where you lay your words down...',
    })
    let bodyContents = "{}"
    try {
      bodyContents = JSON.parse(this.article.body)
      console.warn('successfully parsed json')
      console.warn(this.article.body)
    } catch(e) {
      console.warn('error parsing json, this is the offender')
      console.warn(this.article.body)
    }
    this.bodyQuill.setContents(bodyContents)

    this.bodyQuill.on('text-change', (delta, oldDelta, source) => {
      /* currently, we don't need to do anything here
      at the time of saving, we converting quill content to json
      */
      
    })
    this.madeQuill = true
  }


}
