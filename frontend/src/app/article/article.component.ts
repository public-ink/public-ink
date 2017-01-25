import { Component, OnInit, ViewChild } from '@angular/core'
import { Router, ActivatedRoute, Params } from '@angular/router'
import 'rxjs/add/operator/switchMap'
import { Observable } from 'rxjs/Observable'

import { BackendService } from '../backend.service'

//import { Quill } from 'quill'

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  @ViewChild('editor') editor

  // quill in town!
  quill: any

  // what we want
  article: any

  authorID: string
  publicationID: string
  articleID: string

  //jsonContents = `{"ops":[{"insert":"Hello World!\n"}]}`
  

  constructor(
    private backend: BackendService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.authorID = params['authorID']
      this.publicationID = params['publicationID']
      this.articleID = params['articleID']
      return this.backend.getArticleByIDs(this.authorID, this.publicationID, this.articleID).subscribe((article) => {
        this.article = article
      })
    })
  }
  makeQuill() {
    console.log('editor element', this.editor.nativeElement)
    this.quill = new Quill(this.editor.nativeElement, {
        modules: { toolbar: '#toolbar' },
        theme: 'snow'
      });
    let contents = JSON.parse(this.article.body)
    this.quill.setContents(contents)
  }
  saveQuill() {
    this.article.body = JSON.stringify(this.quill.getContents())
    this.backend.updateArticle(this.article)
  }

  ngAfterViewChecked() {
    if (!this.quill && this.editor) {
      this.makeQuill()
    }
  }

}
