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
     this.ui.show(Indicator.loading, 'logging in')
     this.backend.epLogin(email, password).subscribe((info: any) => {
       console.log('ep lopgin', info)
       if (info.success) {
         this.ui.show(Indicator.success, 'done!', 1000)
       } else {
         this.ui.show(Indicator.error, info.message, 1000)
       }
     }, error => {
       this.ui.show(Indicator.error, 'an unexpected backend error')
     })
   }

   /**
    * Can only be called once the registration form is valid
    * Receives information (success, and message) about the result
    */
   createAccount() {
     const email = this.registrationForm.value.email
     const password = this.registrationForm.value.password
     this.ui.show(Indicator.loading, 'creating account...')
     this.backend.createAccount(email, password).subscribe(
       (info: Info) => {
         if (info.success) {
           this.ui.show(Indicator.success, 'account created!', 1000)
         } else {
           this.ui.show(Indicator.error, 'could not create account: ' + info.message)
         }
       }, (error) => {
         this.ui.show(Indicator.error, 'an unexpected backend error')
       }
     )
   }

   /**
    * submits the request password reset form
    * and shows appropriate messages
    */
   requestPasswordResetLink() {
     const email = this.resetPasswordForm.value.email
     this.ui.show(Indicator.loading, 'generating link')
     this.backend.requestResetPasswordLink(email).subscribe(
       (result: any) => {
         if (result.data.requestResetPasswordLink.success) {
           this.ui.show(Indicator.success, 'Done, check your email.')
         } else {
           // sucess and error messages are the same so not to give away information
           this.ui.show(Indicator.error, 'Done, check your email.')
           this.resetPasswordForm.reset()
         }
       }, (error) => {
         this.ui.show(Indicator.error, 'unexpected backend error!')
         this.resetPasswordForm.reset()
       })
   }

}
