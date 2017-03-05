import { Component, OnInit, ViewChild } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'

import { Observable } from 'rxjs/Observable'
import 'rxjs/Rx'

import gql from 'graphql-tag'
import { Apollo } from 'apollo-angular'

import { BackendService } from '../backend.service'
import { UIService } from '../ui.service'
import { ArticleComponent } from '../article/article.component'

import { iArticle } from '../models'

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

  @ViewChild(ArticleComponent) articleCmp: ArticleComponent

  authorID: string
  publicationID: string
  articleID: string

  // loaded via graphql
  data: any
  article: iArticle
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
    //this.makeQuill()

  }

  ngAfterViewInit() {
    if (this.articleCmp) {
      //this.articleCmp.test()
    }
  }

  ngOnInit() {

    // subscribe to media clicks
    this.ui.mediaClickObservable.subscribe(image => {
      this.articleCmp.insertImage(image.url + '&w=600')
    })

    this.route.params.subscribe(params => {

      this.authorID = params['authorID']
      this.publicationID = params['publicationID']
      this.articleID = params['articleID']

      if (this.articleID === 'create-article') {
        this.backend.getPublication(this.authorID, this.publicationID).subscribe(pub => {
          this.article = {
            id: 'create-article',
            title: 'no title yet',
            bodyOps: '{}',
            publication: JSON.parse(JSON.stringify(pub))
          }
        })

      } else {
        this.backend.getArticle(this.authorID, this.publicationID, this.articleID).subscribe(article => {
          console.log('received article', article)
          this.article = JSON.parse(JSON.stringify(article))
          //this.makeQuill()
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




}
