import { Component, OnInit } from '@angular/core'

import gql from 'graphql-tag'
import { Apollo } from 'apollo-angular'

import { BackendService } from '../backend.service'

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent implements OnInit {

  // template bindings 
  registerEmail: string = ''
  registerPassword: string = ''

  loginEmail: string = ''
  loginPassword: string = ''

  constructor(
    private backend: BackendService,
    private apollo: Apollo,
  ) { }

  ngOnInit() {
  }

  // todo: verify form
  register() {
    this.backend.registerUser(this.registerEmail, this.registerPassword)
  }

  login() {
    console.log('login!')
    this.backend.loginUser(this.loginEmail, this.loginPassword)
  }

}
