import { Component, OnInit } from '@angular/core'

import gql from 'graphql-tag'
import { Apollo } from 'apollo-angular'

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
    private apollo: Apollo,
  ) { }

  ngOnInit() {
  }

  register() {
    // todo: verify form
    console.log('register', this.registerEmail, 'with', this.registerPassword)
    const mutation = gql`
      mutation createUser {
        createUser(email:"${this.registerEmail}", password:"${this.registerPassword}") {
          jwt, success, email
        }}
    `
    this.apollo.mutate({
      mutation: mutation
    }).subscribe(result => {
      let data = JSON.parse(JSON.stringify(result.data))
      let success = data.createUser.success
      if (success) {
        alert('success!')
        localStorage.setItem('jwt', data.createUser.jwt)
      } else {
        alert('not success')
      }
      console.log('create user response', result.data)
    })
  }

  login() {
    // todo: verify form
    console.log('login', this.loginEmail, 'with', this.loginPassword)
    const mutation = gql`
      mutation loginUser {
        loginUser(email:"${this.loginEmail}", password:"${this.loginPassword}") {
          jwt, success, email
        }}
    `
    this.apollo.mutate({
      mutation: mutation
    }).subscribe(result => {
      console.log('login result', result)
      let data = JSON.parse(JSON.stringify(result.data))
      let success = data.loginUser.success
      if (success) {
        alert('success!')
        localStorage.setItem('jwt', data.loginUser.jwt)
      } else {
        alert('not success')
      }
      console.log('create user response', result.data)
    })
  }



}
