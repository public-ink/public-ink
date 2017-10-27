// ng
import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute, Params } from '@angular/router'

// ink
import { BackendService, Author, Publication, Article } from '../backend.service'
import { UIService } from '../ui.service'

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.css']
})
export class ArticlePageComponent implements OnInit {

  // route params
  authorID: string
  publicationID: string
  articleID: string

  // article
  author: Author
  article: Article
  publication: Publication

  constructor(
    // ng
    private router: Router,
    private activatedRoute: ActivatedRoute,
    // ink
    public backend: BackendService,
    public ui: UIService,
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.authorID = params['authorID']
      this.publicationID = params['publicationID']
      this.articleID = params['articleID']


      if (this.articleID === 'create-article') {
        this.backend.loadPublication(this.authorID, this.publicationID).subscribe(res => {
          this.publication = res.data.publication
          this.author = this.publication.author
          // create a new publicaiton object
          this.article = {
            id: 'create-article',
            title: '',
            prefoldJSON: '{}',
            prefoldHTML: '',
            postfoldJSON: '{}',
            postfoldHTML: '',
            new: true,
            position: 0,
          }
        })


      } else if (this.article && this.article.id === this.articleID) {
        // not reloading because we have this publication (after create)
      } else {
        // load that publication!
        this.backend.loadArticle(this.authorID, this.publicationID, this.articleID).subscribe((reply: any) => {
          this.article = reply.data.article.article
          this.author = this.article.author
          this.publication = this.article.publication
        })
      }
    })
  }

  // new methods
  /** excplicitly create (with or without publishing) */
  save(publish = false) {
    this.backend.saveArticle(this.author.id, this.publication.id, this.article).subscribe(res => {
      console.log('article component saved explicityl', res)
      this.article = res.data.saveArticle.article
      this.router.navigate(['/', this.authorID, this.publication.id, this.article.id])
    })
  }

  update() {}

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

}
