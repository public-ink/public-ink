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




@Injectable()
export class BackendService {

  backendHost: string = 'http://localhost:8080'

  userAccount: iAccount = {
    authenticated: false,
    verified: false,
    email: '',
  }


  userAuthors: any[] = []

  fragments = {
    accountStatus: gql`
      fragment accountStatus on AuthSchema {
        success
        message
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
    const jwt = localStorage.getItem('jwt')
    if (jwt) {
      this.jwtLogin(jwt).subscribe(account => {
        this.userAccount = account
      }, error => {
        console.warn(error)
      })
    }
  }


  /**
   * Verify and email with token (usually by following email link)
   *
   * */
  verifyEmail(email: string, token: string) {
    const xquery = gql`
      {verifyEmail(email:"${email}", token:"${token}"){
        ...accountStatus
      }}
      ${this.fragments.accountStatus}
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
        const account = result.data.verifyEmail // this contains all listed in fragment
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
    this.userAccount = {
      authenticated: false,
      verified: false,
      email: ''
    }
  }

  /**
   * Authentication with jwt token from localStorage
   */
  jwtLogin(jwt: string): Observable<iAccount> {
    console.log('attempting jwt login')
    const query = gql`
    {jwtLogin(jwt: "${jwt}") {
        ...accountStatus
    }}
    ${this.fragments.accountStatus}
    `
    const querySubscription = this.apollo.watchQuery<any>({
      query: query,
      // consider sticking jwt into variables 
    })

    return new Observable<iAccount>(stream => {
      querySubscription.subscribe(result => {
        const account: iAccount = result.data.jwtLogin
        stream.next(account)
      },
        error => {
          stream.error('jwt login failed')
        })
    })

  }

  /**
   * USER LOGIN, with email and password
   * Retuns an iAccount if successful, and also sets it as the userAccount
   */
  loginUser(email: string, password: string): Observable<iAccount> {
    const query = gql`
       {
          loginUser(email: "${email}", pw: "${password}") {
            ...accountStatus
          }
        }
        ${this.fragments.accountStatus}
    `
    const querySubscription = this.apollo.watchQuery<any>({
      query: query
    })
    return new Observable(stream => {
      querySubscription.subscribe(result => {
        const account: iAccount = result.data.loginUser
        stream.next(account)
      },
        error => {
          stream.error('user login failed')
        })
    })
  }

  test() {
    return new Observable(stream => {
      const query = gql`{test}`
      const wq = this.apollo.query({query:query, forceFetch:true})
      wq.subscribe(result => {
        console.log(result.data)
      })
    }).subscribe(jo => {return})
    
    
  }

  /**
   * ACCOUNT CREATION with email and password
   * If successful, returns an iAccount, and also sets it as the userAccount
   */
  createAccount(email: string, password: string): Observable<iAccount> {

    //alert('backend create account call starting')
    const query = gql`
      {createAccount {
        ...accountStatus
        success
        message
      }}
      ${this.fragments.accountStatus}
    `
    const querySubscription = this.apollo.query<any>({
      query: query,
      variables: {
        email: email,
        password: password,
      },
      forceFetch: true, // this is important
    })
    console.log(querySubscription, 'jo')
    return new Observable<iAccount>(stream => {
      let sub = querySubscription.subscribe(result => {
        // expected Backend error (like email exists, invalid, reserved)
        if (!result.data.createAccount.success) {
          stream.error(result.data.createAccount.message)
          return
        }
        // on Success
        const account: iAccount = {
          email: result.data.email,
          authenticated: result.data.createAccount.authenticated,
          verified: result.data.createAccount.verified
        }
        this.userAccount = account
        stream.next(account)
      },
        // un-expected Backend error
        (error) => {
          stream.error('un-expected backend error')
        })
    })
  }


  /**
   * AUTHOR CREATION
   */

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
      query: query
    })
    subscription.subscribe(result => {


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
    const sub = this.apollo.watchQuery<any>({ query: query })
    sub.subscribe(result => {
      console.log('be get author:', result.data.author)
    })
    return sub
  }


  /**
   * GET a single Publication, from cache or backend
   */
  getPublication(authorID: string, publicationID: string): Observable<iPublication> {

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
    const querySubscription = this.apollo.watchQuery<any>({
      query: query,
      variables: {
        authorID: authorID,
        publicationID: publicationID
      }
    })
    return new Observable(stream => {
      querySubscription.subscribe(result => {
        const publication = result.data.publication
        stream.next(publication)
      },
        error => {
          stream.error('error getting publication')
        })
    })
  }

  /**
   * SAVE PUBLICATION (new or existing, me thinks...)
   */
  savePublication(publication): Observable<iPublication> {
    const jwt = localStorage.getItem('jwt')
    const query = gql`
      {
        savePublication {
          name
        }
      }
    `
    const querySubscription = this.apollo.watchQuery<any>({
      query: query,
      variables: {
        jwt: jwt,
        authorID: publication.author.id,
        publicationID: publication.id,
        name: publication.name,
      }
    })
    return new Observable(stream => {
      querySubscription.subscribe(result => {
        const publication: iPublication = result.data.savePublication
        stream.next(publication)
      },
        error => {
          stream.error('error saving publication')
        })
    })
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
