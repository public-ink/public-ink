// angular
import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router'

// ink
import { UIService } from '../ui.service'
import { BackendService } from '../backend.service'
import { environment } from '../../environments/environment'

// interfaces
import { Info } from '../backend.service'
import { Indicator } from '../ui.service'


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {

  // template bindings
  registerEmail = ''
  registerPassword = ''
  registrationLoading = false

  loginEmail = ''
  loginPassword = ''

  signupEnabled = true // environment.signupEnabled
  newAuthorImage = 'http://www.public.ink/api/image/serve?key=AMIfv97Y5kOgfP5bBcja_VK30EDu1cG3QIEEfFCUAt2fEiqh0xTKKCcJVIPkCNQfjCMf0lcJ66wUEw3N9JG_tsOb4PKYJPzUxmQdOVd16fW9q43mARgZoYJURTg3GA5GlXC8TjsI2SA-hj0mfWyUFqjG9VTSoerS-Eed7Bv_5MExYmIbT9lem7wlSK3sOt6MXApAmEur0vvVWjLBPZMX9BxVDkml1qwuYA758WjmsjR9Sl55fb430qcNAjK_IHd1pCiSLeCl2UhwhpCG9RtE5dHLF4r_blV7Dx-pDPwuxB2-w7ML-BKLEk2C8mIaVd5TjJD6kKk6ICXAFiI5GQW_Cgz2yztR_ssnT3eXfUCmZHMzm-yrll6wLwGizjKzWoQ33v-ogPlUH2GpkH7w0ifKAX5mD5v3ofQiPA&w=200&h=200'

  public loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  })

  public registrationForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
    password2: ['', Validators.required],
    terms: ['', Validators.requiredTrue],
  })

  public resetPasswordForm = this.fb.group({
    email: ['', Validators.required],
  })

  styles = {
    input: () => {
      return {
        'font-size.px': this.ui.responsiveValue(16, 22),
        'padding': '16px 10px',
        'border': '1px solid #ddd',
      }
    },
    terms: () => {
      return {
        'font-size.px': this.ui.responsiveValue(16, 18),
        'margin': '16px 0px',
      }
    }
  }

  constructor(
    public backend: BackendService,
    public fb: FormBuilder,
    public ui: UIService,
    private router: Router,
  ) { }

  /**
   *
   * email / password login form submission
   */
  doLogin() {
    const email = this.loginForm.value.email
    const password = this.loginForm.value.password
    this.ui.overlay('loading', 'logging in')
    this.backend.epLogin(email, password).subscribe((info: any) => {
      console.log('ep lopgin', info)
      if (info.success) {
        this.ui.overlay('success', 'done!', 1000)
      } else {
        this.ui.overlay('error', info.message, 1000)
      }
    }, error => {
      this.ui.overlay('error', 'an unexpected backend error')
    })
  }

  /**
   * Can only be called once the registration form is valid
   * Receives information (success, and message) about the result
   */
  createAccount() {
    const email = this.registrationForm.value.email
    const password = this.registrationForm.value.password
    this.ui.overlay('loading', 'creating account...')
    this.backend.createAccount(email, password).subscribe(
      (info: Info) => {
        if (info.success) {
          this.ui.overlay('success', 'account created!', 1000)
        } else {
          this.ui.overlay('error', 'could not create account: ' + info.message)
        }
      }, (error) => {
        this.ui.overlay('error', 'an unexpected backend error')
      }
    )
  }

  /**
   * submits the request password reset form
   * and shows appropriate messages
   */
  requestPasswordResetLink() {
    const email = this.resetPasswordForm.value.email
    this.ui.overlay('loading', 'generating link')
    this.backend.requestResetPasswordLink(email).subscribe(
      (result: any) => {
        if (result.data.requestResetPasswordLink.success) {
          this.ui.overlay('success', 'Done, check your email.')
        } else {
          // sucess and error messages are the same so not to give away information
          this.ui.overlay('error', 'Done, check your email.')
          this.resetPasswordForm.reset()
        }
      }, (error) => {
        this.ui.overlay('error', 'unexpected backend error!')
        this.resetPasswordForm.reset()
      })
  }

  logout() {
    this.backend.account = undefined
    localStorage.removeItem('jwt')
  }

}
