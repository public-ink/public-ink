import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute, Params } from '@angular/router'

import { BackendService } from '../backend.service'
import { StyleService } from '../style.service'

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit {

  // get from backend
  homePublications: any
  author: any
  publication: any
  article = this.backend.newArticle

  // incoming url params
  authorID: string
  publicationID: string
  articleID: string

  // where are we?
  location: string

  // quills
  bodyQuill: any
  madeQuill: boolean = false

  constructor(
    private backend: BackendService,
    private style: StyleService,

    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    console.log('all init!')
    this.route.params.subscribe(params => {
      console.log('route changed')
      this.makeArticleQuill()

      this.authorID = params['authorID']
      this.publicationID = params['publicationID']
      this.articleID = params['articleID']

      if (this.articleID) {
        this.location = 'article'
        if (this.articleID == 'new') {
          this.newArticle()
        } else {
          this.loadArticle()
        }
      } else if (this.publicationID) {
        this.location = 'publication'
        this.loadPublication()
      } else if (this.authorID) {
        this.location = 'author'
        this.loadAuthor()
      } else {
        this.location = 'home'
        this.loadHomePublications()
      }
    })
  }
  /**
   * Home Publications
   */
  loadHomePublications() {
    this.backend.getPublications().subscribe((publications) => { // todo: use interface
      this.homePublications = publications
    })
  }

  /**
   * Article
   */
  loadArticle() {
    this.backend.getArticleByIDs(this.authorID, this.publicationID, this.articleID).subscribe((article) => {
      this.article = article
      this.makeArticleQuill()
    })
  }
  newArticle() {
    this.article = this.backend.newArticle
    this.article.url = `/author/${this.authorID}/publication/${this.publicationID}/article/new`
  }

  /**
   * Publication
   */
  loadPublication() {
    this.backend.getPublicationByIDs(this.authorID, this.publicationID).subscribe((publication) => {
      this.publication = publication
    })
  }

  /**
   * Author
   */
  loadAuthor() {
    this.backend.getAuthorByID(this.authorID).subscribe((author) => {
      this.author = author
    })
  }

  /**
   * Make Article Quill
   */
  makeArticleQuill() {
    if (this.madeQuill) {
      console.log('already made quill, leave me alone!')
      return
    }
    console.log('because quill is', this.bodyQuill)
    console.log('making quill')
    this.madeQuill = true


    /** don't know how to pass them in, ask on github! */
    let bodyToolbarOptions = [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      ['link', 'image', 'video', 'formula'],
      [{ 'header': [1, 2, false] }],
      ['clean']
    ]

    this.bodyQuill = new Quill('#bodyEditor', {
      modules: {
        toolbar: {
          //options: [['bold', 'italic'], ['link', 'image']],
          container: '#bodyToolbar',  // Selector for toolbar container
          handlers: {
            'image': this.imageHandler
          },
        },
      },
      theme: 'snow',
      placeholder: 'your body here',
    })
  }

  imageHandler() {
    console.log('image handler!')
  }




}
