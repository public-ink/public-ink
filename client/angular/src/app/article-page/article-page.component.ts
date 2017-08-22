import { Component, OnInit, ViewChild } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'

import { Observable, Subscribable } from 'rxjs/Observable'
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

interface Comment {
  name?: string
  email?: string
  body: string

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

  savedArticleJSON: string



  // comments
  comments: Comment[] = []

  // new comment
  commentName: string = ''
  commentEmail: string = ''
  commentBody: string = ''

  // subscriptions (so we can un-subscribe)
  routerSubscription: Subscription
  keyboardSubscription: Subscription
  mediaClickSubscription: any


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public backend: BackendService,
    private apollo: Apollo,
    public ui: UIService,
  ) {

    // advanced auto-save:)
    this.autoSaveTimer()

    // keyboard shortcuts
    this.keyboardSubscription = Observable.fromEvent(window, 'keydown').subscribe((event: KeyboardEvent) => {

      // only available to owners
      if (!this.isOwner()) { return }

      if ((event.metaKey || event.ctrlKey) && event.keyCode === 83) {
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
    this.mediaClickSubscription = this.ui.mediaClickObservable.subscribe(image => {
      this.articleCmp.insertImage(image.url + '&w=' + (this.ui.contentWidth - 0) + '&size=content')
    })

    // get route params
    this.routerSubscription = this.route.params.subscribe(params => {

      console.log('article page on route!')

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

          // this might actually return more often!!!

          // what is going on here?
          this.article = JSON.parse(JSON.stringify(article))
          this.savedArticleJSON = JSON.stringify(this.article)

          // and here
          this.recordView()

          // get comments!
          console.log('get comments')
          this.backend.loadComments(this.article).subscribe(comments => {
            console.log('comments are', comments)
            this.comments = JSON.parse(JSON.stringify(comments))
          })
        })
      }
    })
  }

  canAutoSave() {
    return this.article && this.isOwner() && this.savedArticleJSON != JSON.stringify(this.article) && this.article.id != 'create-article'
  }

  autoSaveTimer() {
    Observable.fromEvent(window, 'keydown').debounceTime(1000).subscribe(event => {
     // user stopped typing for a seconds
      if (this.canAutoSave()) {
        this.saveArticle(true)
      }
    })
  }

  /**
   * Creates a new article, or updates an exisiting one
   */
  saveArticle(silent = false): void {
    if (silent) {
      this.ui.show('silent', 'saving article...')
    } else {
      this.ui.show('loading', 'saving article...')
    }
    this.backend.saveArticle(
      this.authorID,
      this.publicationID,
      this.articleID,
      this.article).subscribe(reply => {

        // check status
        console.log(reply)

        if (reply.info.success) {

          // update saved version for autosave
          this.savedArticleJSON = JSON.stringify(this.article)
          if (!silent) {
            this.ui.show('success', 'done!', 1000)
          } else {
            this.ui.loading = false
            this.ui.overlay = false
          }
          /* not sure why this check is required here but not on publication page */
          if (this.articleID === 'create-article') {
            console.log('navigating to article')
            this.router.navigate(['/', reply.article.publication.author.id, reply.article.publication.id, reply.article.id])
          }
        } else {
          this.ui.show('error', reply.info.message)
        }
      })
  }

  publishArticle(article) {
    this.ui.show('loading', 'publishing ' + this.article.title)
    this.backend.publishArticle(article).subscribe((result: any) => {
      // this.article = JSON.parse(JSON.stringify(result.article))
      // this.savedArticleJSON = JSON.stringify(this.article)
      this.ui.show('success', 'great success!', 1000)
    })
  }
  unpublishArticle(article) {
    this.ui.show('loading', 'un-publishing ' + this.article.title)
    this.backend.publishArticle(article, true).subscribe((result: any) => {
      //this.article = JSON.parse(JSON.stringify(result.article))
      //this.savedArticleJSON = JSON.stringify(this.article)
      this.ui.show('success', 'now a draft!', 1000)
    })
  }

  recordView() {
    this.backend.recordEvent(
      'article view',
      this.article.publication.author.id,
      this.article.publication.id,
      this.article.id,
    ).subscribe(msg => {
      console.log('record view returned', msg)
    })
  }

  postComment() {
    this.ui.show('loading', 'saving your thoughts...')
    this.backend.postComment(this.article, this.commentName, this.commentEmail, this.commentBody).subscribe((msg: any) => {

      this.comments.unshift({ name: this.commentName, body: this.commentBody })
      this.commentBody = ''
      this.commentEmail = ''
      this.commentName = ''
      if (msg.success === true) {
        this.ui.show('success', 'done!', 1000)
      } else {
        this.ui.show('error', 'sorry, an error occured', 2000)
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
   * on destroy: unsubscribe from subscriptions
   */
  ngOnDestroy() {
    this.keyboardSubscription.unsubscribe()
    this.routerSubscription.unsubscribe()
    this.mediaClickSubscription.unsubscribe()

    // save if owner and changed
    if (this.canAutoSave()) {
      // todo: better quite
      this.saveArticle(true)
    }
  }

  /** check if the current article is owned by the current user */
  isOwner() {
    return this.backend.isOwner(this.article.publication.author.id)

  }

}
