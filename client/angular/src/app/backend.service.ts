import { Injectable } from '@angular/core'
import { Http, Headers, RequestOptions, Response } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'

import gql from 'graphql-tag'
import { Apollo } from 'apollo-angular'


import {
  PublicationData,
  IBackendData, IResource, Author, AuthorData, Publication, Resource
} from './models'

import { iPublication } from './publication/publication.component'

import { iAccount } from './auth-page/auth-page.component'

interface xAuthorData {
  id: string
  name:string
  about:string
  imageURL:string
}
interface AuthorReply {

}

@Injectable()
export class BackendService {

  backendHost: string = 'http://localhost:8080'

  userAccount: iAccount = {
    authenticated: false,
    verified: false,
    email: '',
  }

  userAuthenticated: boolean = false
  userVerified: boolean = false
  userEmail: string
  userAuthors: any[] = []

  fragments = {
    account: gql`
      fragment accountStatus on AuthSchema {
        email
        authenticated
        verified
        jwt
      }
    `
  }
  

  constructor(
    private http: Http,
    private apollo: Apollo,
  ) {
    this.jwtLogin()
  }


  /**
   * Verify and email with token (usually by following email link)
   *  */  
  verifyEmail(email: string, token: string) {
    const xquery = gql`
      {verifyEmail(email:"${email}", token:"${token}"){
        ...accountStatus
      }}
      ${this.fragments.account}
    `
    const query = gql`
    {verifyEmail(email:"${email}", token:"${token}"){
        email
        authenticated
        verified
        jwt
      }}
    `
    const querySub = this.apollo.watchQuery<any>({
      query: xquery,
    })
    return new Observable<iAccount>(stream => {
      querySub.subscribe(result => {
        const account = result.data.verifyEmail
        this.userAccount = account
        stream.next(account)
      },
      error => {
        alert('apollo query error: verify email')
        stream.error('error verifying account')
      })
    })
    
    
  }

  logoutUser() {
    localStorage.removeItem('jwt')
    this.userAuthenticated = false
  }

  jwtLogin() {
    console.log('attempting jwt login')
    const jwt = localStorage.getItem('jwt')
    const query = gql`
    {
      jwtLogin(jwt: "${jwt}") {
        authenticated
        message
        jwt
        verified
        email
        authors {
          id
          name
          about
          imageURL
          created
          updated
        }
      }
    }
    `
    console.log(query)
    this.apollo.watchQuery<any>({
      query: query
    }).subscribe(result => {
      console.log('jwt login result', result)
      const authData = result.data.jwtLogin
      if (authData.authenticated) {
        localStorage.setItem('jwt', authData.jwt)
        this.userAuthenticated = authData.authenticated
        this.userVerified = authData.verified
        this.userEmail = authData.email
        this.userAuthors = authData.authors
      }
    }, 
    error => {
      alert('I caught the error')
    })
  }

  // now a query
  loginUser(email:string, password: string) {
    const query = gql`
       {
          loginUser(email: "${email}", pw: "${password}") {
            authenticated,
            verified,
            email
            message
            jwt
          }
        }
    `
    // add result typing!
    this.apollo.watchQuery<any>({
      query: query
    }).subscribe(result => {
      
      const authData = result.data.loginUser
      this.userAuthenticated = authData.authenticated
      this.userVerified = authData.verified
      this.userEmail = authData.email
      localStorage.setItem('jwt', authData.jwt)
      alert(authData.message)
    })
  }


  registerUser(email, password) {
    console.log('register', email, 'with', password)
    const query = gql`
      {
        createUser(email:"${email}", password:"${password}") {
          authenticated,
            verified,
            email
            message
            jwt
        }}
    `
    this.apollo.watchQuery<any>({
      query: query
    }).subscribe(result => {
      const authData = result.data.createUser
      console.log('register result', authData)
      this.userAuthenticated = authData.authenticated
      this.userVerified = authData.verififed
      this.userEmail = authData.email
      localStorage.setItem('jwt', authData.jwt)
    })
  }

  // new version of register user, this time, we intercept errors, and return an account observable
  createAccount(email:string, password: string) {
    const query = gql`
      {createAccount {
        email
        authenticated
        verified
        jwt
      }}
    `
    const querySub = this.apollo.watchQuery<any>({
      query: query,
      variables: {
        email: email,
        password: password,
      }
    })
    return new Observable<iAccount>(input => {
      querySub.subscribe(result => {
        console.log('account result', result)
        const account: iAccount = result.data.createAccount
        this.userAccount = account
        console.log(this.userAccount)
        input.next(account)
      },
      (error) => {
        alert('create account backend error!')
        console.log(error)
        input.error('create account backend error')
      })
    })
  }

  createAuthor(author: any) {
    const jwt = localStorage.getItem('jwt')
    const query = gql`
      {
        createAuthor(jwt:"${jwt}", name: "${author.name}", about:"${author.about}", imageURL:"${author.imageURL}"){
          id
          name
        }
      }
    `
    const subscription = this.apollo.watchQuery<any>({
      query:query
    })
    subscription.subscribe(result => {
      
      console.log('create author result', result)
      //const authData = result.data.createAuthor
      //this.userAuthenticated = authData.authenticated
      //this.userVerified = authData.verififed
      //this.userEmail = authData.email
      //this.userAuthors = authData.authorsx
      //localStorage.setItem('jwt', authData.jwt)
    })
    return subscription
  }

  /** GET OR LOAD AUTHOR */
  getAuthor(authorID: string) {
    // check locally: ToDo!
    const query = gql`
      {author(authorID:"${authorID}"){
        id, name, about, imageURL
      }}
    `
    const sub = this.apollo.watchQuery<any>({query: query})
    sub.subscribe(result => {
      console.log('be get author:', result.data.author)
    })
    return sub
  }

  /** GET OR LOAD PUBLICATION */
  /**
   * Returns a Publication observable
   */
  getPublication(authorID: string, publicationID: string):Observable<iPublication> {

    return new Observable(emitter => {
      const query = gql`
        {publication {
          id
          name
          author {
            id
            name
            about
            imageURL
          }
          articles {
            id
            title
          }
        }}
      `
      this.apollo.watchQuery<any>({
        query: query,
        variables: {
          authorID: authorID,
          publicationID: publicationID
        }
      }).subscribe(result => {
        emitter.next(result.data.publication)
      })
    })

    
  }


/**
 * PUBLICATION
 */
savePublication(publication) {
  const jwt = localStorage.getItem('jwt')
    const query = gql`
      {
        savePublication {
          name
        }
      }
    `
    const subscription = this.apollo.watchQuery<any>({
      query: query,
      variables: {
        jwt: jwt,
        authorID: publication.author.id,
        publicationID: publication.id,
        name: publication.name,
      }
    })
    subscription.subscribe(result => {
      console.log('backend saved publication', result)
    })
    return subscription
}








  /**
   * Creates a resource, via PUT
   */
  putResource(resource: IResource): Observable<AuthorData | PublicationData> {
    if (resource.isValid()) {
      // go ahead and PUT
      return this.http.put(resource.url, resource.data(), this.defaultOptions()).map(res => res.json())
    } else {
      // return validation error, via subscription
      return Observable.create(input => { input.error({ status: 999 }) })
    }
  }

  /**
   * Updates a resource, via POST
   */
  postResource(resource: IResource): Observable<AuthorData | PublicationData> {
    if (resource.isValid()) {
      // go ahead and POST
      return this.http.post(resource.url, resource.data(), this.defaultOptions()).map(res => res.json())
    } else {
      // return validation error, via subscription
      return Observable.create(input => { input.error({ status: 999 }) })
    }
  }
  /**
   * Deletes a resource, via DELETE
   */
  deleteResource(resource: IResource): Observable<AuthorData | PublicationData> {
    return this.http.delete(resource.url, this.defaultOptions()).map(res => res.json())
  }

  /**
   * Gets a resource, given its IDs
   * -authorID (required)
   * -publicationID
   * -articleID
   */
  getResourceByIDs(authorID: string, publicationID?: string, articleID?: string) {
    let url = this.backendHost + '/author/' + authorID
    url += publicationID ? `/publication/${publicationID}` : ''
    url += articleID ? `/article/${articleID}` : ''
    return this.http.get(url, this.defaultOptions()).map(res => res.json())
  }

  /**
   * Gets a resource from a given URL
   */
  getResourceByUrl(url: string): Observable<AuthorData | PublicationData> {
    return this.http.get(url, this.defaultOptions()).map(res => res.json())
  }

  /** 
   * Gets a list of resource from a given URL
   */
  getResourcesByUrl(url: string): Observable<IBackendData[]> {
    return this.http.get(url, this.defaultOptions()).map(res => res.json())
  }

  /**
   * Returns RequestOptions of content-type: json, withCredentials: true
   */
  defaultOptions(): RequestOptions {
    let headers = new Headers({ 'Content-Type': 'application/json' })
    return new RequestOptions({ headers: headers, withCredentials: true })
  }

}
