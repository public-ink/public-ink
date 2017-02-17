import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'

import gql from 'graphql-tag'
import { Apollo } from 'apollo-angular'

@Component({
  selector: 'app-email-verification-page',
  templateUrl: './email-verification-page.component.html',
  styleUrls: ['./email-verification-page.component.css']
})
export class EmailVerificationPageComponent implements OnInit {

  email: string
  token: string

  constructor(
    private route: ActivatedRoute,
    private router: Router,

    private apollo: Apollo,
  ) { 

    this.route.params.subscribe(params => {
      this.email = params['email']
      this.token = params['token']
      this.verifyEmail()
    })

  }

  ngOnInit() {
  }

  verifyEmail() {
    const query = gql`
      {verifyEmail(email:"${this.email}", token:"${this.token}")}
    `
    this.apollo.watchQuery<any>({
      query: query
    }).subscribe(result => {
      console.log(result)
      alert(result.data.verifyEmail)
    })

  }

}
