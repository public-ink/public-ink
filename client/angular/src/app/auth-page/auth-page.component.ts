import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router'

// graphql
import gql from 'graphql-tag'
import { Apollo } from 'apollo-angular'

// ink
import { environment } from '../../environments/environment'
import { BackendService } from '../backend.service'
import { UIService } from '../ui.service'

import 'rxjs/Rx'

export interface iAccount {
  email: string
  authenticated: boolean
  verified: boolean
  jwt?: string
  authors: any[]
  totalViews?: number
}

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent {

  // template bindings 
  registerEmail: string = ''
  registerPassword: string = ''
  registrationLoading: boolean = false

  loginEmail: string = ''
  loginPassword: string = ''

  signupEnabled = environment.signupEnabled

  public loginForm = this.fb.group({
    email: ["", Validators.required],
    password: ["", Validators.required]
  })

  public registrationForm = this.fb.group({
    email: ["", Validators.required],
    password: ["", Validators.required],
    password2: ["", Validators.required],
    terms: ["", Validators.requiredTrue],
  })

  public resetPasswordForm = this.fb.group({
    email: ["", Validators.required],
  })

  constructor(
    public backend: BackendService,
    private apollo: Apollo,
    public fb: FormBuilder,
    public ui: UIService,
    private router: Router,
  ) { }

  /**
   * Try to authenticate with email and password
   * If successfull, the backend's userAccount will be updated
   * In any case, we receive the info (success and msg)
   */
  doLogin(event) {
    const email = this.loginForm.value.email
    const password = this.loginForm.value.password
    this.ui.show('loading', 'logging in...')
    this.backend.epLogin(email, password).subscribe(info => {
      if (info.success) {
        this.ui.show('success', 'done!', 1000)
        if (info.success === true) {
          this.router.navigate(['/', 'my-account'])
        }
      } else {
        this.ui.show('error', 'login failed')
      }

    })
    // we only care about the status. the account is handled by the backend.
  }

  /**
   * Can only be called once the registration form is valid
   * Receives information (success, and message) about the result
   */
  createAccount() {

    const email = this.registrationForm.value.email
    const password = this.registrationForm.value.password
    this.ui.show('loading', 'creating account...')
    this.backend.createAccount(email, password).subscribe(
      info => {
        if (info.success === true) {
          this.ui.show('success', 'account created!', 1000)
          this.router.navigate(['/', 'my-account'])
        } else {
          this.ui.show('error', 'could not create account: ' + info.message)
        }
      }
    )
  }

  requestPasswordResetLink() {
    const email = this.resetPasswordForm.value.email
    this.ui.show('loading', 'generating link')
    this.backend.requestResetPasswordLink(email).subscribe(result => {
      this.ui.show('success', 'Done, check your email.')
    })
  }

}
