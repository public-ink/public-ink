import { Injectable } from '@angular/core'
import { Http, Headers, RequestOptions, Response } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'

// graphql
import gql from 'graphql-tag'
import { Apollo } from 'apollo-angular'

// ink services
import { UIService } from './ui.service'


import {
  PublicationData,
  IBackendData, IResource, Author, AuthorData, Publication, Resource
} from './models'

import { iPublication } from './publication/publication.component'
import { iAccount } from './auth-page/auth-page.component'

export interface iInfo {
  success: boolean
  message: string
}
export interface iArticle {
  id: string
  title: string
}




@Injectable()
export class BackendService {

  backendHost: string = 'http://localhost:8080'
  backendDelay: number = 0

  /* the object containing everything by the current user */
  userAccount: iAccount
  userImages: any[]


  fragments = {
    account: gql`
      fragment account on AccountSchema {
        email
        verified
        authenticated
        jwt

        authors {
          id
          name
          about
          imageURL
          publications {
            id
            name
            about
            imageURL
            author {
              id
              name
            }
            articles {
              id
              title
              bodyOps
              publication {
                id
                name
                imageURL
                author {
                  id
                  name
                  imageURL
                }
              }
            }
          }
        }
      }
    `,
    info: gql`
      fragment info on InfoSchema {
        success
        message
      }
    `,
    article: gql`
      fragment article on ArticleSchema {
        id
        title
      }
    `
  }


  constructor(
    private http: Http,
    private apollo: Apollo,

    private ui: UIService,
  ) {
    //this.epLogin('xxhoff@hoff.com', 'hoffi')

    const jwt = localStorage.getItem('jwt')
    if (!jwt) {
      console.log('no jwt in local storage! not signed in!')
    }
    else {
      this.jwtLogin().subscribe(info => {
        console.log('jwt reply', info)
        // we don't care about the response here
      }, error => {
        console.warn(error)
      })
      this.loadImages(jwt)
    }
  }

  /** Load User Images */
  loadImages(jwt: string) {
    const query = gql`
      {images(jwt:"${jwt}"){
        url
        id
      }}
    `
    const apolloQuery = this.apollo.watchQuery<any>({
      query: query,
      forceFetch: true
    })
    apolloQuery.subscribe(result => {
      this.userImages = result.data.images
    })

  }

  /**
   * Email / Password Login
   */
  epLogin(email: string, password: string): Observable<any> {
    const endpoint = 'epLogin'
    const query = gql`
      {
        ${endpoint} {
          info {
            ...info
          }
          account {
            ...account
          }
        }
      }
      ${this.fragments.account}
      ${this.fragments.info}
    `
    const apolloQuery = this.apollo.watchQuery<any>({
      query: query,
      variables: {
        email: email,
        password: password,
      },
      forceFetch: true
    })

    return new Observable(stream => {
      apolloQuery.delay(this.backendDelay).subscribe(result => {
        const info = result.data[endpoint].info
        if (info.success) {
          const account = result.data[endpoint].account
          //this.userAccount = account
          this.userAccount = Object.assign({}, account)
          console.log('user account is now', this.userAccount)
          localStorage.setItem('jwt', account.jwt)
        }
        // in any case return the info!
        stream.next(info)
      })
    })
  }


  /**
   * Verify and email with token (usually by following email link)
   */
  verifyEmail(email: string, token: string) {
    const query = gql`
      {verifyEmail(email:"${email}", token:"${token}"){
        info {...info}
        account {...account}
      }}
      ${this.fragments.account}
      ${this.fragments.info}
    `
    const querySub = this.apollo.watchQuery<any>({
      query: query,
    })
    return new Observable<iAccount>(stream => {
      querySub.delay(this.backendDelay).subscribe(result => {
        const account = result.data.verifyEmail // this contains all listed in fragment
        this.userAccount = account
        // duplicate with jwt and all...
        this.userAccount = JSON.parse(JSON.stringify(account))
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
      email: '',
      authors: [],
    }
  }

  /**
   * Authentication with jwt token from localStorage
   */
  jwtLogin(): Observable<any> {
    console.log('attempting jwt login')
    const endpoint = 'jwtLogin'
    const jwt = localStorage.getItem('jwt')
    const query = gql`
    {jwtLogin(jwt: "${jwt}") {
      info {
          ...info
        }
        account {
          ...account
        }
    }}
    ${this.fragments.account}
    ${this.fragments.info}
    `
    const apolloQuery = this.apollo.watchQuery<any>({
      query: query,
      forceFetch: true,
      // consider sticking jwt into variables 
    })

    return new Observable(stream => {
      apolloQuery.delay(this.backendDelay).subscribe(result => {
        const info = result.data[endpoint].info
        if (info.success) {
          /* include authors! and all the other things! */
          const account = result.data[endpoint].account
          // duplicate in epLogin and all...
          this.userAccount = JSON.parse(JSON.stringify(account))
          localStorage.setItem('jwt', account.jwt)
        }
        // in any case return the info!
        stream.next(info)
      })
    })
  }

  test() {
    return new Observable(stream => {
      const query = gql`{test}`
      const wq = this.apollo.query({ query: query, forceFetch: true })
      wq.subscribe(result => {
        console.log(result.data)
      })
    }).subscribe(jo => { return })


  }

  /**
   * ACCOUNT CREATION with email and password
   * If successful, returns an iAccount, and also sets it as the userAccount
   */
  createAccount(email: string, password: string): Observable<any> {

    //alert('backend create account call starting')
    const endpoint = 'createAccount'
    const query = gql`
    {${endpoint} {
        info {
            ...info
          }
          account {
            ...account
          }
    }}
    ${this.fragments.account}
    ${this.fragments.info}
    `
    const apolloQuery = this.apollo.watchQuery<any>({
      query: query,
      variables: {
        email: email,
        password: password,
      },
      forceFetch: true,
    })

    return new Observable<iAccount>(stream => {
      apolloQuery.delay(this.backendDelay).subscribe(result => {
        const info = result.data[endpoint].info
        if (info.success) {
          const account = result.data[endpoint].account
          this.userAccount = account
          localStorage.setItem('jwt', account.jwt)
        }
        // in any case return the info!
        stream.next(info)
      },
        // un-expected Backend error
        (error) => {
          stream.error('un-expected backend error')
        })
    })
  }


  

  /** new kid */
  saveAuthor(author: any) {
    const jwt = localStorage.getItem('jwt')
    const query = gql`
      {saveAuthor {
        info {
          ...info
        }
      }}
      ${this.fragments.info}
    `
    const apolloQuery = this.apollo.watchQuery<any>({
      query: query,
      variables: {
        jwt: jwt,
        authorID: author.id,
        name: author.name,
        about: author.about,
        imageURL: author.imageURL
      },
      forceFetch: true,
    })
    return new Observable(stream => {
      apolloQuery.subscribe(result => {
        stream.next(result.data.saveAuthor.info)
      })
    })
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
  deleteAuthor(authorID): Observable<iInfo> {
    /**
     * Deletes an Author, removes it from the userAccount's authors, 
     * and returns information about the status
     */
    const jwt = localStorage.getItem('jwt')
    const query = gql`
      {deleteAuthor(jwt:"${jwt}", authorID: "${authorID}"){
        ...info
      }}
      ${this.fragments.info}
    `
    const apolloQuery = this.apollo.watchQuery<any>({
      query: query,
    })
    return new Observable(stream => {
      apolloQuery.subscribe(result => {
        const info = result.data.deleteAuthor
        let authors = this.userAccount.authors
        if (info.success) {
          // remove author from userAccount's authors
          authors = authors.filter(author => author.id !== authorID)
          this.userAccount.authors = authors
        }
        stream.next(info)
      })
    })
  }


  /**
   * GET a single Publication, from cache or backend
   */
  getPublication(authorID: string, publicationID: string): Observable<iPublication> {

    const query = gql`
        {publication {
          id
          name
          about
          imageURL
          author {
            id
            name
            about
            imageURL
          }
          articles {
            id
            title
            bodyOps
            publication {
              id
              name
              author {
                name
                id
              }
            }
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
   * SAVE PUBLICATION (new or existing)
   */
  savePublication(publication): Observable<iPublication> {
    const jwt = localStorage.getItem('jwt')
    const query = gql`
      {
        savePublication {
          id
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
        about: publication.about,
        imageURL: publication.imageURL,
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
   * SAVE ARTICLE - create new / update existing!
   */
  saveArticle(authorID: string, publicationID: string, articleID: string, article): Observable<any> {
    console.log('save article', article)
    const jwt = localStorage.getItem('jwt')
    const endpoint = 'saveArticle'
    const query = gql`
      {
        ${endpoint} {
          info {
            ...info
          }
          article {
            ...article
          }
        }
      }
      ${this.fragments.article}
      ${this.fragments.info}
    `
    const apolloQuery = this.apollo.watchQuery<any>({
      query: query,
      variables: {
        jwt: jwt,
        authorID: authorID,
        publicationID: publicationID,
        articleID: articleID,
        title: article.title,
        bodyOps: article.bodyOps
      },
      forceFetch: true,
    })
    return new Observable(stream => {
      apolloQuery.subscribe(result => {
        const article = result.data.article
        const info = result.data.info
        console.log('backend saved article', result)
        stream.next(info)
      })
    })
  }

  deleteArticle(article): Observable<iInfo> {
    console.log('be delete', article)
    const jwt = localStorage.getItem('jwt')
    const query = gql`
      {deleteArticle {
         ...info
      }}
       ${this.fragments.info}
    `
    const apolloQuery = this.apollo.watchQuery<any>({
      query: query,
      variables: {
        jwt: jwt,
        authorID: article.author.id,
        publicationID: article.publication.id,
        articleID: article.id
      }
    })
    return new Observable(stream => {
      apolloQuery.subscribe(result => {
        const info = result.data.deleteArticle
        stream.next(info)
      })
    })
  }

  getArticle(authorID: string, publicationID: string, articleID: string) {
    /** now, we load the path up to author. */
    const query = gql`
      {article {
        id
        title
        bodyOps
        publication {
          id
          name
          imageURL
          author {
            id
            name
            about
          }
        }
      }}
    `
    const apolloQuery = this.apollo.watchQuery<any>({
      query: query,
      variables: {
        authorID: authorID,
        publicationID: publicationID,
        articleID: articleID,
      }
    })
    return new Observable(stream =>  {
      apolloQuery.subscribe(result => {
        console.log('get article result', result)
        stream.next(result.data.article)
      })
    })
  }


  deletePublication(publication: iPublication): Observable<iInfo> {
    /**
     * Deletes a publication, removes it from the respetive's userAccount's author's publications TODO, 
     * and returns information about the status
     */
    const jwt = localStorage.getItem('jwt')
    const query = gql`
      {deletePublication {
        ...info
      }}
      ${this.fragments.info}
    `
    const apolloQuery = this.apollo.watchQuery<any>({
      query: query,
      variables: {
        jwt: jwt,
        authorID: publication.author.id,
        publicationID: publication.id,
      }
    })
    return new Observable(stream => {
      apolloQuery.subscribe(result => {
        const info = result.data.deletePublication
        let authors = this.userAccount.authors
        if (info.success) {
          // TODO
          // remove publication from userAccount's author's publications
          //authors = authors.filter(author => author.id !== authorID)
          //this.userAccount.authors = authors
        }
        stream.next(info)
      })
    })
  }



  /**
   * IMAGE UPLOAD
   */
  uploadFile(file: File): Observable<any> {
    let jwt = localStorage.getItem('jwt')
    if (!jwt) {
      alert('no jwt in upload file handler! ui needs to prevent this')
      return
    }

    return Observable.create(progressStream => {

      let formData: FormData = new FormData()
      let xhr: XMLHttpRequest = new XMLHttpRequest()

      // uploads[] is how we pick things up in the backend
      formData.append('uploads[]', file, file.name)
      formData.append('jwt', jwt)

      /** on progress, push to stream! */
      xhr.addEventListener('progress', event => {
        let percent = Math.ceil((event.loaded / event.total) * 100)
        progressStream.next(percent)
      })

      /** listen to a success message from the server */
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            let data = JSON.parse(xhr.response)
            progressStream.next(100)
            //progressStream.next(JSON.parse(xhr.response));
            progressStream.complete() // next would also be an option...
            // we should pass the server response down stream!
            console.log('wanna add', data)
          } else {
            // on error - what do they look like?
            progressStream.error(xhr.response);
          }
        }
      }
      // request an upload URL, then kick off upload!
      this.http.get(this.backendHost + '/image/upload-url').map(res => { return res.json() }).subscribe(data => {
        xhr.open('POST', data.url, true)
        xhr.send(formData);
      })
    })
  }

  deleteImage(id: string) {
    const query = gql`
      {
        deleteImage(id: "${id}") {
          message
        }
      }
    `
    const apolloQuery = this.apollo.watchQuery<any>({
      query: query,
      forceFetch: true
    })
    return new Observable(stream => {
      apolloQuery.subscribe(result => {
        stream.next(result.data.deleteImage.message)
        alert(result.data.deleteImage.message)
      })
      
      
    }).subscribe()

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
