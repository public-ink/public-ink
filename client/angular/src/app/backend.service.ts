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

  userAuthenticated: boolean = false
  userVerified: boolean = false
  userEmail: string
  userAuthors: any[] = []
  

  constructor(
    private http: Http,
    private apollo: Apollo,
  ) {
    this.jwtLogin()
  }

  verifyEmail(email: string, token: string) {
    const query = gql`
      {verifyEmail(email:"${email}", token:"${token}"){
        authenticated
        message
        jwt
        authenticated
        verified
      }}
    `
    this.apollo.watchQuery<any>({
      query: query
    }).subscribe(result => {
      console.log(result)
      const authData = result.data.verifyEmail
      if (authData.authenticated) {
        localStorage.setItem('jwt', authData.jwt)
        this.userAuthenticated = authData.authenticated
        this.userVerified = authData.verified
        this.userEmail = authData.email
      }
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
