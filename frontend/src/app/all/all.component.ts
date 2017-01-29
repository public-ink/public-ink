import {
  Component, OnInit, trigger,
  state,
  style,
  transition,
  animate
} from '@angular/core'
import { Router, ActivatedRoute, Params } from '@angular/router'

import { BackendService } from '../backend.service'
import { StyleService } from '../style.service'
import { UIService } from '../ui.service'

import { Observable } from 'rxjs/Observable'
import 'rxjs/Rx'


@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css'],
  animations: [
    trigger('editState', [
      state('inactive', style({
        height: 0,
        opacity: 0,
      })),
      state('active', style({
        opacity: 1,
        height: '40px',
      })),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out'))
    ])
  ],
})
export class AllComponent implements OnInit {

  state: string = 'root'

  editState: string = 'inactive'
  createState: string = 'inactive'

  toggleEdit() {
    let next = this.editState === 'active' ? 'inactive' : 'active'
    this.editState = next
    if (next === 'active') {
      this.setState('editing')
    } else {
      this.setState('root')
    }
    console.log(next)
  }
  toggleCreate() {
    let next = this.createState === 'active' ? 'inactive' : 'active'
    this.createState = next
    if (next === 'active') {
      this.setState('creating')
    } else {
      this.setState('root')
    }
}

setState(state: string) {
  this.state = state
}

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
    private ui: UIService,

    private route: ActivatedRoute,
    private router: Router
  ) {
    

  }

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
      let bodyContents = JSON.parse(this.article.body)
      this.bodyQuill.setContents(bodyContents)
      this.makeArticleQuill()
    })
  }
  newArticle() {
    this.article = this.backend.newArticle
    this.article.url = `/author/${this.authorID}/publication/${this.publicationID}/article/new`
    this.setState('editing')
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
    return ''
    


  }

  imageHandler() {
    console.log('image handler!')
  }

  saveArticle() {
    

    this.article.body = JSON.stringify(this.bodyQuill.getContents())
    this.article.bodyText = this.bodyQuill.getText()
    this.article.teaserText = this.article.bodyText.substring(0, 140);
    this.backend.updateArticle(this.article)
  }




}
