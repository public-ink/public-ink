import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'

import gql from 'graphql-tag'
import { Apollo } from 'apollo-angular'

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

    private apollo: Apollo,
  ) { }

  ngAfterViewChecked() {
    this.makeQuill()
  }

  ngOnInit() {

    this.route.params.subscribe(params => {

      this.authorID = params['authorID']
      this.publicationID = params['publicationID']
      this.articleID = params['articleID']

      this.doQuery()
    })
  }

  doQuery() {
    const query = gql`
      query anArticle {
        article(authorID:"${this.authorID}", publicationID:"${this.publicationID}", articleID:"${this.articleID}") {
          title
          body
          created
          updated
          author {
            name
            id
          }
        }
      }
    `
    this.apollo.watchQuery({
      query: query
    }).subscribe((result) => {
      // this is not a local object but probably in redux
      this.data = result.data
      this.article = JSON.parse(JSON.stringify(result.data)).article
      console.log('got article!', this.article)
      // make quill! 
      let el = document.getElementById('articleBodyEditor')
      console.log(el)
      this.makeQuill()
    })
  }

  doMutate() {
    const mutation = gql`
      mutation {
        updateArticle (
          authorID:"${this.authorID}", 
          publicationID:"${this.publicationID}", 
          articleID: "${this.articleID}", 
          title: "${this.article.title}", 
          body: "{"ops":[{"insert":"mega\n"}]}"
        ){
          article {
            title
            body
            created
            updated
            author {
              name
            }
          }
        }
      }
    `
    this.apollo.mutate({
      mutation: mutation
    }).subscribe(result => {
      const data = JSON.parse(JSON.stringify(result.data))
      this.article = data.updateArticle.article
      console.log('mutation result article', this.article)
    })
  }


  save() {
    console.log('saving' + this.article.title)
    this.doMutate()
  }

  makeQuill() {
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
    //let bodyContents = JSON.parse(this.article.body)
    let bodyContents = {}
    this.bodyQuill.setContents(bodyContents)

    this.bodyQuill.on('text-change', (delta, oldDelta, source) => {
      this.article.bodyText = this.bodyQuill.getText()
      console.log(JSON.stringify(this.bodyQuill.getContents()))
      this.article.body = JSON.stringify(this.bodyQuill.getContents())
    })
    this.madeQuill = true
  }


}
