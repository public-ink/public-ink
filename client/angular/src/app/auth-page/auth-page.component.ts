import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'

// graphql
import gql from 'graphql-tag'
import { Apollo } from 'apollo-angular'

import { BackendService } from '../backend.service'
import { UIService } from '../ui.service'

export interface iAccount {
  email: string
  authenticated: boolean
  verified: boolean
  jwt?: string
}

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
  // network status
  loginLoading: boolean = false

  public loginForm = this.fb.group({
    email: ["", Validators.required],
    password: ["", Validators.required]
  })

  constructor(
    private backend: BackendService,
    private apollo: Apollo,
    public fb: FormBuilder,
    private ui: UIService,
  ) { }

  doLogin(event) {
    const email = this.loginForm.value.email
    const password = this.loginForm.value.password
    this.loginLoading = true
    this.backend.epLogin(email, password).subscribe(info => {
        this.loginLoading = false
        this.ui.message = info.message
      })
    // we only care about the status. the account is handled by the backend.
  }

  ngOnInit() {
  }

  // todo: verify form
  register() {
    //this.backend.registerUser(this.registerEmail, this.registerPassword)
    this.backend.createAccount(this.registerEmail, this.registerPassword).subscribe(
      info => {
        console.log(info)
      }
    )
  }

}
