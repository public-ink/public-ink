import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'

// ink
import { BackendService } from '../backend.service'

/**
 * Shows 2 password inputs, that allow the user to reset their password
 */
@Component({
  selector: 'app-reset-password-page',
  templateUrl: './reset-password-page.component.html',
  styleUrls: ['./reset-password-page.component.css']
})
export class ResetPasswordPageComponent implements OnInit {

  email: string // coming from route
  token: string // coming from route

  password = ''

  public resetPasswordForm = this.fb.group({
    password:  ["", Validators.required],
    password2: ["", Validators.required],
  })

  constructor(
    // ng
    private route: ActivatedRoute,
    public fb: FormBuilder,
    
    // ink
    private backend: BackendService,
  ) { 
    this.route.params.subscribe(params => {
      this.email = params['email']
      this.token = params['token']
    })
  }

  ngOnInit() {
  }

  submitResetPassword() {
    const password = this.resetPasswordForm.value.password
    const password2 = this.resetPasswordForm.value.password2
    this.backend.resetPassword(this.email, this.token, password).subscribe(result => {
      console.log('submit reset password received result!', result)
    })
  }

}
