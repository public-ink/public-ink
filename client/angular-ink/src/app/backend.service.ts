// angular
import { Injectable } from '@angular/core'
import { Http } from '@angular/http'

// rx
import { Subject } from 'rxjs/Subject'
import { Observable } from 'rxjs/Observable'

const api_url = 'http://localhost:8080/api/graphql'
const backendHost = 'http://localhost:8080'


const fragments = {
  article: `
    article {
      id
      title
      prefoldJSON
      postfoldJSON
      publishedAt
    }
  `,
  publication: `
    publication {
      id
      name
      about
      imageURL
    }
  `,
  author: `
    author {
      id
      name
      about
      imageURL
    }
  `,
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
              prefoldJSON
              postfoldJSON
              publishedAt
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
  publications?: Publication[]
}

export interface Publication {
  id: string
  name: string
  about: string
  imageURL: string
  articles?: Article[]
  author?: Author
}

export interface Article {
  id: string
  title: string
  prefoldJSON: string
  postfoldJSON: string
  // collpased or expanded
  state: string
  author?: Author
  publication?: Publication
}

interface CreateAccountResponse {
  info: Info
  account?: Account
}

interface DeleteAuthorResponse {
  data: {
    deleteAuthor: {
      success: boolean
      message: string
    }
  }
  errors: string[]
}

export interface SavePublicationResponse {
  data: {
    savePublication: {
      info: {
        success: boolean
        message: string
      }
      publication: {
        id: string
        name: string
        about: string
        imageURL: string
        articles: any[]
      }
    }
  }
  errors: string[]
}

interface DeletePublicationResponse {
  data: {
    deletePublication: {
      success: boolean
      message: string
    }
  }
  errors: string[]
}

interface DeleteArticleResponse {
  data: {
    deleteArticle: {
      success: boolean
      message: string
    }
  }
  errors: string[]
}

interface SaveArticleResponse {
  data: {
    saveArticle: {
      info: {
        success: boolean
        message: string
      }
      article: {
        id
        title
        prefoldJSON
        postfoldJSON
        publishedAt
      }
    }
  }
  errors: string[]
}

interface PublishArticleResponse {
  data: {
    publishArticle: {
      info: {
        success: boolean
        message: string
      }
      article: {
        id
        title
        prefoldJSON
        postfoldJSON
        publishedAt
      }
    }
  }
  errors: string[]
}


interface SaveAuthorResponse {
  data: {
    saveAuthor: {
      info: {
        success: boolean
        message: string
      }
      author: {
        id
        name
        about
        imageURL
      }
    }
  }
  errors: string[]
}

@Injectable()
export class BackendService {

  /**
   * The user's account if authenticated
   * false if not authenticated
   */
  account: Account

  loading = false

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
    this.loading = true
    this.http.post(api_url, { query: query, variables: variables }).subscribe(result => {
      console.log('create account', result)
      this.loading = false
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
    this.loading = true
    this.http.post(api_url, {query: query, variables: variables}).subscribe(result => {
      console.log('ep login', result)
      this.loading = false
      const reply = result.json().data.epLogin
      const info: Info = reply.info
      const account: Account = reply.account
      // this check is wrong. only return in error stream
      if (info.success ) {
        this.account = account
        localStorage.setItem('jwt', this.account.jwt)
        this.loadImages(this.account.jwt)
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
    const query = `
    {jwtLogin {
      ${fragments.account}
      ${fragments.info}
    }}`
    const variables = {jwt: jwt}
    this.loading = true
    this.http.post(api_url, {query: query, variables: variables}).subscribe(result => {
      this.loading = false
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
        res => res.json() ).subscribe(data => {
        xhr.open('POST', data.url, true)
        xhr.send(formData)
      })
    })
  }

  /**
   * Article saving
   */
  saveArticle(authorID: string, publicationID: string, article: Article): Subject<SaveArticleResponse> {
    console.log('saving in pu', publicationID)
    const saveSubject = new Subject<SaveArticleResponse>()
    const jwt = localStorage.getItem('jwt')
    const query = `
      {saveArticle {
        ${fragments.info}
        ${fragments.article}
      }}
    `
    const variables = {
      jwt: jwt,
      authorID: authorID,
      publicationID: publicationID,
      articleID: article.id,
      title: article.title,
      prefoldJSON: article.prefoldJSON,
      postfoldJSON: article.postfoldJSON,
    }
    this.loading = true
    this.http.post(api_url, {query: query, variables: variables}).map(res => {
      return res.json()
    }).subscribe((result: SaveArticleResponse) => {
      this.loading = false
      console.log('save article?', result)
      saveSubject.next(result)
    })
    return saveSubject
  }

  publishArticle(authorID: string, publicationID: string, articleID: Article, unpublish = false): Subject<PublishArticleResponse> {
    const saveSubject = new Subject<PublishArticleResponse>()
    const jwt = localStorage.getItem('jwt')
    const query = `
      {publishArticle {
        ${fragments.info}
        ${fragments.article}
      }}
    `
    const variables = {
      jwt: jwt,
      authorID: authorID,
      publicationID: publicationID,
      articleID: articleID,
      unpublish: unpublish,
    }
    this.loading = true
    this.http.post(api_url, {query: query, variables: variables}).map(res => {
      return res.json()
    }).subscribe((result: PublishArticleResponse) => {
      this.loading = false
      console.log('published article?', result)
      saveSubject.next(result)
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
        ${fragments.publication}
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

    this.loading = true
    this.http.post(api_url, {query: query, variables: variables}).map(res => {
      return res.json()
    }).subscribe(result => {
      this.loading = false
      console.log('be saved publication', result)
      saveSubject.next(result)
    })
    return saveSubject
  }

  deletePublication(authorID: string, publicationID: string): Subject<DeletePublicationResponse> {
    const deleteSubject = new Subject<DeletePublicationResponse>()
    const jwt = localStorage.getItem('jwt')
    const query = `
      {deletePublication {
        success
        message
      }}
    `
    const variables = {jwt: jwt, authorID: authorID, publicationID: publicationID}
    this.http.post(api_url, {query: query, variables}).map(res => {
      return res.json()
    }).subscribe((result: DeletePublicationResponse) => {
      deleteSubject.next(result)
    })
    return deleteSubject
  }

  deleteArticle(authorID: string, publicationID: string, articleID: string): Subject<DeleteArticleResponse> {
    const deleteSubject = new Subject<DeleteArticleResponse>()
    const jwt = localStorage.getItem('jwt')
    const query = `
      {deleteArticle {
        success
        message
      }}
    `
    const variables = {jwt: jwt, authorID: authorID, publicationID: publicationID, articleID: articleID}
    this.http.post(api_url, {query: query, variables}).map(res => {
      return res.json()
    }).subscribe((result: DeleteArticleResponse) => {
      deleteSubject.next(result)
    })
    return deleteSubject
  }

  saveAuthor(author: Author): Subject<SaveAuthorResponse> {
    const saveSubject = new Subject<SaveAuthorResponse>()
    const jwt = localStorage.getItem('jwt')
    const query = `
      {saveAuthor {
        ${fragments.info}
        ${fragments.author}
      }}
    `
    const variables = {
      jwt: jwt,
      authorID: author.id,
      name: author.name,
      about: author.about,
      imageURL: author.imageURL,
    }

    this.loading = true
    this.http.post(api_url, {query: query, variables: variables}).map(res => {
      return res.json()
    }).subscribe(result => {
      this.loading = false
      console.log('be saved author', result)
      saveSubject.next(result)
    })
    return saveSubject
  }

  deleteAuthor(authorID: string) {
    const deleteSubject = new Subject<DeleteAuthorResponse>()
    const jwt = localStorage.getItem('jwt')
    const query = `
      {deleteAuthor {
        success
        message
      }}
    `
    const variables = {jwt: jwt, authorID: authorID}
    this.http.post(api_url, {query: query, variables}).map(res => {
      return res.json()
    }).subscribe((result: DeleteAuthorResponse) => {
      deleteSubject.next(result)
    })
    return deleteSubject
  }

  loadAuthor(authorID: string) {
    const loadSubject = new Subject()
    const query = `
    {
      author(authorID: "${authorID}") {
        id
        name
        about
        imageURL
        publications {
          id
          about
          name
          imageURL
          articles {
            id
            title
            prefoldJSON
            postfoldJSON
            publishedAt
          }
        }
      }
    }
    `
    this.http.post(api_url, {query: query}).delay(500).map(res => {
      return res.json()
    }).subscribe((result: any) => {
      loadSubject.next(result)
    })
    return loadSubject
  }

  loadPublication(authorID: string, publicationID: string) {
    const loadSubject = new Subject()
    const query = `
    {
      publication(authorID: "${authorID}", publicationID: "${publicationID}") {
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
      }
    }
    `
    this.http.post(api_url, {query: query}).delay(500).map(res => {
      return res.json()
    }).subscribe((result: any) => {
      loadSubject.next(result)
    })
    return loadSubject
  }

  loadArticle(authorID: string, publicationID: string, articleID: string) {
    const loadSubject = new Subject()
    const query = `
    {
      article(authorID: "${authorID}", publicationID: "${publicationID}", articleID: "${articleID}") {
        article {
          title
          prefoldJSON
          postfoldJSON
          publishedAt
          publication {
            id
            name
          }
          author {
            id
          }
        }
      }
    }
    `
    this.http.post(api_url, {query: query}).delay(500).map(res => {
      return res.json()
    }).subscribe((result: any) => {
      loadSubject.next(result)
    })
    return loadSubject
  }


}
