// angular
import { Injectable } from '@angular/core'
import { Http } from '@angular/http'

// rx
import { Subject } from 'rxjs/Subject'
import { Observable } from 'rxjs/Observable'

const api_url = 'http://localhost:8080/api/graphql'
const backendHost = 'http://localhost:8080'


const fragments = {
  info: `
    info {
      success
      message
    }`,
  account: `
    account {
      email
      verified
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
            articles {
              id
              title
              bodyOps
            }
          }
      }
    }`
}


export interface Info {
  success: boolean
  message: string
}

interface Image {
  id: string
  url: string
}

interface Account {
  email: string
  verified: boolean
  jwt: string
  authors: Author[]
  images: Image[]
}

export interface Author {
  id: string
  name: string
  about: string
  imageURL: string
  publications: Publication[]
}

export interface Publication {
  id: string
  name: string
  about: string
  imageURL: string
  articles: Article[]
}

export interface Article {
  id: string
  title: string
  prefoldJSON: string
  prefoldHTML: string
  postfoldJSON: string
  postfoldHTML: string
  bodyOps: string
  // collpased or expanded
  state: string
}

interface CreateAccountResponse {
  info: Info
  account?: Account
}

@Injectable()
export class BackendService {

  /**
   * The user's account if authenticated
   * false if not authenticated
   */
  account: Account

  constructor(
    private http: Http
  ) {
    this.jwtLogin()
  }

  /**
   * Attempts at creating a user account with a given
   * email address and password
   */
  createAccount(email: string, password: string) {
    const createAccountSubject = new Subject<Info>()
    const query = `
    {createAccount {
      ${fragments.info}
      ${fragments.account}
    }}`
    const variables = {email: email, password: password}
    this.http.post(api_url, { query: query, variables: variables }).subscribe(result => {
      console.log('create account', result)
      const reply = result.json().data.createAccount
      const info: Info = reply.info
      const account: Account = reply.account
      if (info.success ) {
        this.account = account
        localStorage.setItem('jwt', this.account.jwt)
        createAccountSubject.next(info)
      } else {
        createAccountSubject.error(info.message)
      }
    })
    return createAccountSubject
  }

  /**
   * Attempts at logging in with an email and password
   */
  epLogin(email: string, password: string) {
    const loginSubject = new Subject<Info>()
    const query = `
    {epLogin {
      ${fragments.account}
      ${fragments.info}
    }}`
    const variables = {email: email, password: password}
    this.http.post(api_url, {query: query, variables: variables}).subscribe(result => {
      console.log('ep login', result)
      const reply = result.json().data.epLogin
      const info: Info = reply.info
      const account: Account = reply.account
      // this check is wrong. only return in error stream
      if (info.success ) {
        this.account = account
        localStorage.setItem('jwt', this.account.jwt)
      }
      // even if it didn't work
      loginSubject.next(info)
    }, error => {
      // here is backend error
      loginSubject.error('backend error')
    })
    return loginSubject
  }

  /**
   * Login via JSON WEB TOKEN
   */
  jwtLogin() {
    const loginSubject = new Subject<Info>()
    const jwt = localStorage.getItem('jwt')
    console.log(jwt)
    const query = `
    {jwtLogin {
      ${fragments.account}
      ${fragments.info}
    }}`
    const variables = {jwt: jwt}
    this.http.post(api_url, {query: query, variables: variables}).subscribe(result => {
      console.log('jwt login', result)
      const reply = result.json().data.jwtLogin
      const info: Info = reply.info
      const account: Account = reply.account
      if (info.success ) {
        this.account = account
        for (const author of this.account.authors) {
          for (const pub of author.publications) {
            for (const art of pub.articles) {
              art.state = 'collapsed'
            }
          }
        }
        localStorage.setItem('jwt', this.account.jwt)
        loginSubject.next(info)
        // new: load images
        this.loadImages(this.account.jwt)
      } else {
        loginSubject.error(info.message)
      }
    })
    return loginSubject
  }

  requestResetPasswordLink(...args) {
    return new Subject()
  }

  /**
   * Load images
   */
  loadImages(jwt: string) {
    const query = `
      {images(jwt:"${jwt}"){
        url
        id
      }}
    `
    this.http.post(api_url, {query: query}).subscribe(result => {
      const images = result.json().data.images
      this.account.images = images
      console.log('loaded images?', images)
    })
  }

  /**
   * Image Upload
   *
   * @param file
   */
  uploadFile(file: File): Observable<any> {
    const jwt = localStorage.getItem('jwt')
    if (!jwt) {
      alert('no jwt in upload file handler! ui needs to prevent this')
      return
    }

    return Observable.create(progressStream => {

      const formData: FormData = new FormData()
      const xhr: XMLHttpRequest = new XMLHttpRequest()

      // uploads[] is how we pick things up in the backend
      formData.append('uploads[]', file, file.name)
      formData.append('jwt', jwt)

      /** on progress, push to stream! */
      xhr.addEventListener('progress', event => {
        const percent = Math.ceil((event.loaded / event.total) * 100)
        console.log('upload percent', percent)
        progressStream.next(percent)
      })

      /** listen to a success message from the server */
      xhr.onreadystatechange = () => {
        console.log('read state change', xhr.readyState, xhr.status)
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log('image upload response', xhr.response)
            const imageInfo = JSON.parse(xhr.response)
            progressStream.next(100)
            // progressStream.next(JSON.parse(xhr.response));
            // TODO: are there benefits over using complete over next? looks cool...
            progressStream.complete()
            this.account.images.unshift(imageInfo)
          } else {
            // on error - what do they look like?
            progressStream.error(xhr.response)
          }
        }
      }
      // request an upload URL, then kick off upload!
      this.http.get(backendHost + '/api/image/upload-url').map(
        res => { return res.json() }).subscribe(data => {
        xhr.open('POST', data.url, true)
        xhr.send(formData)
      })
    })
  }

  /**
   * Article saving
   */
  saveArticle(authorID: string, publicationID: string, article: Article) {
    const saveSubject = new Subject()
    const jwt = localStorage.getItem('jwt')
    const query = `
      {saveArticle {
        ${fragments.info}
      }}
    `
    const variables = {
      jwt: jwt,
      authorID: authorID,
      publicationID: publicationID,
      articleID: article.id,
      title: article.title,
      bodyOps: article.bodyOps,
    }
    this.http.post(api_url, {query: query, variables: variables}).map(res => {
      res.json()
    }).subscribe(result => {
      console.log('save article?', result)
      saveSubject.next()
    })
    return saveSubject
  }

  /**
   * save publication
   */
  savePublication(authorID: string, publication: Publication) {
    const saveSubject = new Subject()
    const jwt = localStorage.getItem('jwt')
    const query = `
      {savePublication {
        ${fragments.info}
      }}
    `
    const variables = {
      jwt: jwt,
      authorID: authorID,
      publicationID: publication.id,
      about: publication.about,
      name: publication.name,
      imageURL: publication.imageURL,
    }
    this.http.post(api_url, {query: query, variables: variables}).map(res => {
      res.json()
    }).subscribe(result => {
      console.log('be saved publication', result)
      saveSubject.next()
    })
    return saveSubject
  }

  saveAuthor(author: Author) {
    const saveSubject = new Subject()
    const jwt = localStorage.getItem('jwt')
    const query = `
      {saveAuthor {
        ${fragments.info}
      }}
    `
    const variables = {
      jwt: jwt,
      authorID: author.id,
      name: author.name,
      about: author.about,
      imageURL: author.imageURL,
    }
    this.http.post(api_url, {query: query, variables: variables}).map(res => {
      res.json()
    }).subscribe(result => {
      console.log('be saved author', result)
      saveSubject.next()
    })
    return saveSubject
  }


}
