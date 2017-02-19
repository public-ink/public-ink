// Angular
import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute, Params } from '@angular/router'

// GraphQL Tools
import gql from 'graphql-tag'
import { Apollo } from 'apollo-angular'

// Ink Services
import { BackendService } from '../backend.service'
import { UIService } from '../ui.service'

@Component({
  selector: 'app-publication-page',
  templateUrl: './publication-page.component.html',
  styleUrls: ['./publication-page.component.css']
})
export class PublicationPageComponent implements OnInit {

  authorID: string

  publicationID: string
  publication: any

  constructor(
    // angular
    private route: ActivatedRoute,
    private router: Router,
    // ink
    private backend: BackendService,
    private ui: UIService,
    // graphql
    private apollo: Apollo,
  ) { 
     this.route.params.subscribe(params => {

      console.log(params)

      this.authorID = params['authorID']
      this.publicationID = params['publicationID']

      if (this.publicationID === 'create-publication') {
        this.publication = {
          name: 'no name yet'
        }
        return
      }

      const query = gql`
        {publication(publicationID:"${this.publicationID}"){name}}
      `
      this.apollo.watchQuery<any>({
        query: query
      }).subscribe(result => {
        console.log('publication result', result)
        this.publication = result.data.publication
      })

      
    })
  }

  ngOnInit() {

  }

  createPublication() {
    const jwt = localStorage.getItem('jwt')
    const query = gql`
      {
        createPublication(jwt:"${jwt}", name:"${this.publication.name}", authorID:"${this.authorID}"){
          name
        }
      }
    `
    this.apollo.watchQuery<any>({
      query: query
    }).subscribe(result => {
      console.log(result)
    })

  }

}
