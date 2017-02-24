// Angular
import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute, Params } from '@angular/router'

// GraphQL Tools
import { Apollo } from 'apollo-angular'
import gql from 'graphql-tag'

// Ink Services
import { BackendService } from '../backend.service'
import { UIService } from '../ui.service'

// Ink Interfaces
import { iPublication } from '../publication/publication.component'

@Component({
  selector: 'app-publication-page',
  templateUrl: './publication-page.component.html',
  styleUrls: ['./publication-page.component.css']
})
export class PublicationPageComponent implements OnInit {

  authorID: string

  publicationID: string
  publication: iPublication

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
        this.backend.getAuthor(this.authorID).subscribe(result => {
          this.publication = {
            // got to get author!
            author: result.data.author,
            new: true,
            id: this.publicationID,
            name: 'no name yet',
            articles: [],
          }
        })
        
        return
      }
      console.log('new get')
      this.backend.getPublication(this.authorID, this.publicationID).subscribe(publication => {
        console.log('pub page got put', publication)
        this.publication = publication
      })

      /*const query = gql`
        {publication(publicationID:"${this.publicationID}"){name}}
      `
      this.apollo.watchQuery<any>({
        query: query
      }).subscribe(result => {
        console.log('publication result', result)
        this.publication = result.data.publication
      })*/

      
    })
  }

  ngOnInit() {

  }

  /**old it seems, we use 'save publication' now for new and existing */
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
      query: query,
      variables: {
        jwt: jwt,
        name: this.publication.name,
        authorID: this.authorID,
      }
    }).subscribe(result => {
      console.log(result)
    })

  }
  savePublication() {
    this.backend.savePublication(this.publication).subscribe(info => {
      console.log('publication page save publication info')
    })
  }
  deletePublication() {
    this.backend.deletePublication(this.publication).subscribe(info => {
      this.ui.message = info.message
      console.log('pub page delete info', info)
    })
  }

}
