import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'

import gql from 'graphql-tag'
import { Apollo } from 'apollo-angular'

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



  constructor(
    private route: ActivatedRoute,
    private router: Router,

    private apollo: Apollo,
  ) { }

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
          teaser
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

      console.log('got article!', result.data)
    })
  }

  doMutate() {
    const mutation = gql`
      mutation {
        updateArticle (authorID:"hoffer", publicationID:"atomic-angular", articleID: "on-being-awesome", title: "such mutated by apollo"){
          article {
            title
            teaser
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
      let data = JSON.parse(JSON.stringify(result.data))
      let article = data.updateArticle.article
      console.log('mutation result', data.updateArticle.article)
      this.article = article
      
    })
  }




  save() {
    console.log(this.article.title)
    this.doMutate()
  }

}
