import { Component, OnInit } from '@angular/core'

import gql from 'graphql-tag'

import { BackendService } from '../backend.service'

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  data: any

  constructor(
    private backend: BackendService,
  ) { }

  ngOnInit() {


    const TestQuery = gql`
      query test {
            rebels {
                name
                hero {
                    name
                }
            }
        }
    `
    console.log('kicking off query')
    let sub = this.backend.apolloClient.watchQuery({
      query: TestQuery
    })
    console.log('subscription', sub.result)

    this.data = this.backend.apolloClient.watchQuery({ query: TestQuery })


  }

}
