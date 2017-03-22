import { Component, OnInit, ViewChild } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'

import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription'
import 'rxjs/Rx' // why?

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

  keyboardSubscription: Subscription

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private backend: BackendService,
    private apollo: Apollo,
    private ui: UIService,
  ) {
    console.log('article page constructed')

    // keyboard shortcuts
    this.keyboardSubscription = Observable.fromEvent(window, 'keydown').subscribe((event: KeyboardEvent) => {

      if ((event.metaKey || event.ctrlKey) && event.keyCode === 83) { /*ctrl s */
        // cmd + s
        this.saveArticle()
        event.preventDefault()

      } else if ((event.metaKey || event.ctrlKey) && event.keyCode === 68) {
        // cmd + d
        this.deleteArticle()
        event.preventDefault()
      }
    })
  }


  ngOnInit() {

    // subscribe to media clicks
    this.ui.mediaClickObservable.subscribe(image => {
      this.articleCmp.insertImage(image.url + '&w=' + (this.ui.contentWidth - 300))
    })

    // get route params
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
          this.article = JSON.parse(JSON.stringify(article))
        })
      }
    })
  }

  /**
   * Creates a new article, or updates an exisiting one
   */
  saveArticle(): void {
    this.ui.show('loading', 'saving article...')
    this.backend.saveArticle(
      this.authorID,
      this.publicationID,
      this.articleID,
      this.article).subscribe(reply => {
        this.ui.show('success', 'done!', 1000)
        /* not sure why this check is required here but not on publication page */
        if (this.articleID === 'create-article') {
          this.router.navigate(['/', reply.article.publication.author.id, reply.article.publication.id, reply.article.id])
        }
      })
  }

  /**
   * Deletes the article
   */
  deleteArticle(): void {
    this.backend.deleteArticle(this.article).subscribe(info => {
      this.ui.flashMessage(info.message)
      this.router.navigate(['/', this.authorID, this.publicationID])
    })
  }

  /**
   * on destroy: unsubscribe from keyboard
   */
  ngOnDestroy() {
    console.log('article page destroyed')
    this.keyboardSubscription.unsubscribe()
  }

}
