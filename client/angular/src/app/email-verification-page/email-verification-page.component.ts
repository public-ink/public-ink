import { Component } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'

import gql from 'graphql-tag'
import { Apollo } from 'apollo-angular'

import { BackendService } from '../backend.service'

@Component({
  selector: 'app-email-verification-page',
  templateUrl: './email-verification-page.component.html',
  styleUrls: ['./email-verification-page.component.css']
})
export class EmailVerificationPageComponent {

  email: string
  token: string
  status: string = 'checking'

  constructor(
    private route: ActivatedRoute,
    private router: Router,

    private apollo: Apollo,
    private backend: BackendService,
  ) { 
    this.route.params.subscribe(params => {
      this.email = params['email']
      this.token = params['token']
      this.backend.verifyEmail(this.email, this.token).subscribe((account: any) => {
        if (account.verified) {
          this.status = 'success' 
        } else {
          this.status = 'verification failed'
        }
      },
      (error) => {
        this.status = 'sorry, an error occured'
      })
    })
  }
}
