// ng
import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute, Params } from '@angular/router'

// ink
import { BackendService, Author, Publication, Article } from '../backend.service'


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
    private backend: BackendService,
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.authorID = params['authorID']
      this.publicationID = params['publicationID']
      this.articleID = params['articleID']


      if (this.articleID === 'create-article') {
        // create a new publicaiton object
        this.article = {
          id: 'create-article',
          title: '',
          prefoldJSON: '{}',
          postfoldJSON: '{}',
          state: '',
        }
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

}
