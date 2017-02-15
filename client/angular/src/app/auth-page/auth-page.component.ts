import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

  register() {
    console.log('register', this.registerEmail, 'with', this.registerPassword)
  }

}
