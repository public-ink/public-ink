import { Injectable } from '@angular/core'
import { Http, Headers, RequestOptions, Response } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'
import 'rxjs/add/operator/map'

// graphql
import gql from 'graphql-tag'
import { Apollo } from 'apollo-angular'

// ink
import { UIService } from './ui.service'
import { environment } from '../environments/environment'
import { Song } from './hero/song'


/**
 * LATEST AND MOST AWESOME TYPINGS!
 */

/**
 * shape of an info object
 */
export interface InfoFragment {
  success: boolean
  message: string
}

/**
 * Shape of an account as returned by GraphQL
 */
export interface AccountFragment {
  email: string
  authenticated: boolean
  verified: boolean
  jwt?: string
  authors: any[]
  totalViews?: number
  dailyViews?: Object
}

/**
 * The shape of a GraphQL ArticleResponse
 */
export interface ArticleResponse {
  errors?:  string[]
  data: {
    article: {
      article: ArticleFragment
      info: InfoFragment
    }
  }
}
export interface PublicationResponse {
  data: {

  }
}

export interface AccountResponse {
  errors?: string[]
  data: {
    account: {
      account: AccountFragment
      info: InfoFragment
    }
  }
}
export interface jwtLoginResponse {
  errors?: string[]
  data: {
    jwtLogin: {
      account: AccountFragment
      info: InfoFragment
    }
  }
}
export interface resetLinkResponse {
  errors?: string[]
  data: {
    requestResetPasswordLink: InfoFragment
  }
}

/**
 * The shape of an article as returned by GraphQL
 */
export interface ArticleFragment {
  id: string
  title: string
  bodyOps: string
  publishedAt?: number
  // parent publication
  publication: PublicationFragment
}
/**
 * The shape of a publication as returned by GraphQL
 */
export interface PublicationFragment {
  id: string
  name: string
  about: string
  imageURL: string
  // parent author
  author: AuthorFragment
}
/**
 * The shape of an author as returned by GraphyQL
 */
export interface AuthorFragment {
  id: string
  name: string
  about: string
  imageURL: string
}

@Injectable()
export class BackendService {

  backendHost: string = environment.backendHost
  backendDelay: number = environment.backendDelay

  /* the object containing everything by the current user */
  userAccount: AccountFragment
  userImages: any[]

  // fires when a login happened
  loginSubject = new Subject()

  songs = []

  // content for the homepage currently
  hoffData


  fragments = {
    account: gql`
      fragment account on AccountSchema {
        email
        verified
        authenticated
        jwt
        totalViews
        dailyViews

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
              imageURL
            }
            articles (includeDrafts: true) {
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
    author: gql`
      fragment author on AuthorSchema {
        id
        name
        about
        imageURL
      }
    `,
    publication: gql`
      fragment publication on PublicationSchema {
        id
        name
        about
        imageURL
      }
    `,
    article: gql`
      fragment article on ArticleSchema {
        id
        title
        bodyOps
        publishedAt
      }
    `
  }


  constructor(
    private http: Http,
    private apollo: Apollo,
  ) {

    const jwt = localStorage.getItem('jwt')
    if (jwt) {
      this.jwtLogin().subscribe(info => {
        this.loadImages(jwt)
      }, error => {
        console.warn(error)
      })
    }
  }

  /**
   * Loads all content by author hoff, for use on home page
   * 
   * @param authorID 
   */
  loadHoff(authorID: string = 'hoff') {
    const query = gql`
      {
        author(authorID: "hoff") {
          publications {
            id
            name
            about
            imageURL
            articles {
              id
              title
              bodyOps
              publishedAt
              publication {
                id
                name
                author {
                  name
                  id
                }
              }
            }
            author {
              id
              name
            }
          }
        }
      }
      
    `
    //${this.fragments.author}
    const apolloQuery = this.apollo.watchQuery<any>({
      query: query,
      fetchPolicy: 'network-only'
    })
    let hoffSubject = new Subject()
    apolloQuery.delay(this.backendDelay).subscribe(result => {
      this.hoffData = result.data
      hoffSubject.next(this.hoffData)
    })
    return hoffSubject
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
      fetchPolicy: 'network-only',
    })
    apolloQuery.delay(this.backendDelay).subscribe(result => {
      this.userImages = JSON.parse(JSON.stringify(result.data.images))
    }, error => {
      console.error('loadImages: unhandled backend error')
    })
  }

  /** Load Songs */
  loadSong(id) {
    const query = gql`
      {song (id:"${id}"){
        title
        tracksString
        bpm
        artist
        trackCount
      }}
    `
    const apolloQuery = this.apollo.watchQuery<any>({
      query: query,
      fetchPolicy: 'network-only'
    })
    let songSubject = new Subject()
    apolloQuery.delay(this.backendDelay).subscribe(result => {
      let song = JSON.parse(JSON.stringify(result.data.song))
      songSubject.next(song)
    })
    return songSubject
  }

  // TODO: remove 
  searchSongs(searchTerm: string) {
    const query = gql`
      {songSearch (q:"${searchTerm}"){
        title
        keyId
      }}
    `
    const apolloQuery = this.apollo.watchQuery<any>({
      query: query,
      variables: {
        q: searchTerm,
      },
      fetchPolicy: 'network-only',
    })

    return new Observable(stream => {
      apolloQuery.delay(this.backendDelay).subscribe(result => {
        const data = result.data
        stream.next(data)
      })
    })
  }

  /**
   * Loads comments for a given article
   * 
   * @param article 
   */
  loadComments(article: ArticleFragment) {
    let authorID = article.publication.author.id
    let publicationID = article.publication.id
    let articleID = article.id
    const query = gql`
      {
        loadComments(authorID: "${authorID}", publicationID: "${publicationID}", articleID: "${articleID}") {
          name
          body
        }
      }
    `
    const apolloQuery = this.apollo.watchQuery<any>({
      query: query,
      // variables: {},
      fetchPolicy: 'network-only',
    })
    const commentSubject = new Subject()
    apolloQuery.delay(this.backendDelay).subscribe(result => {
      const data = result.data.loadComments
      commentSubject.next(data)
    }, error => {
      console.error('loadComments: unhandled backend error')
      commentSubject.error('unhandled backend error')
    })
    return commentSubject
  }

  /**
   * Post a comment for a given article
   * TODO:author check
   * 
   * @param article 
   * @param name 
   * @param email 
   * @param body 
   */
  postComment(article: ArticleFragment, name: string, email: string, body: string) {
    let authorID = article.publication.author.id
    let publicationID = article.publication.id
    let articleID = article.id
    const query = gql`
      {
        postComment {
          success
          message
        }
      }
    `
    const apolloQuery = this.apollo.watchQuery<any>({
      query: query,
      fetchPolicy: 'network-only',
      variables: {
        authorID: authorID,
        publicationID: publicationID,
        articleID: articleID,
        name: name,
        email: email,
        body: body,
      },
    })

    let subject = new Subject()
    apolloQuery.delay(this.backendDelay).subscribe(result => {
      subject.next(result.data.postComment)
    }, errors => {
      console.log('errors posting comment!', errors)
    })
    return subject
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
      fetchPolicy: 'network-only',
      variables: {
        email: email,
        password: password,
      },
    })

    const loginSubject = new Subject()
    apolloQuery.delay(this.backendDelay).subscribe(result => {
      const info = result.data.epLogin.info

      if (info.success) {
        const account = result.data.epLogin.account
        this.userAccount = Object.assign({}, account)
        localStorage.setItem('jwt', account.jwt)
        this.loadImages(account.jwt)
      }
      // both for successful and unsuccessful attempts
      loginSubject.next(info)
    }, (error) => {
      // an actual backend error
      loginSubject.error(error)
    })
    return loginSubject

  }

  /**
   * Request a reset-password-link for a given email address
   * 
   * @param email 
   */
  requestResetPasswordLink(email: string) {
    let resetSubject = new Subject()
    const query = gql`
      {requestResetPasswordLink(email: "${email}"){
        success
        message
      }}
    `
    const apolloQuery = this.apollo.watchQuery<any>({
      query: query,
      fetchPolicy: 'network-only',
    })
    apolloQuery.delay(this.backendDelay).subscribe((result: resetLinkResponse) => {
      resetSubject.next(result)
    }, error => {
      resetSubject.error('unexpected backend error')
    })
    return resetSubject
  }

  /**
   * Sets a new password for a given account
   * 
   * @param email 
   * @param token 
   * @param password 
   */
  resetPassword(email: string, token: string, password: string) {
    let resetSubject = new Subject()
    const query = gql`
      {resetPassword(email: "${email}", token: "${token}", password: "${password}")
          {
            success
            message
          }
      }
    `
    this.apollo.watchQuery<any>({
      query: query,
    }).subscribe(result => {
      resetSubject.next(result)
    })
    return resetSubject
  }

  /**
   * Record an analytics event
   * 
   * @param name 
   * @param authorID 
   * @param publicationID 
   * @param articleID 
   */
  recordEvent(name: string, authorID?: string, publicationID?: string, articleID?: string) {
    const query = gql`
      {
        recordEvent {
          success
          message
        }
      }
    `
    const apolloQuery = this.apollo.watchQuery<any>({
      query: query,
      variables: {
        name: name,
        authorID: authorID,
        publicationID: publicationID,
        articleID: articleID,
        path: 'somepath', //window.location,
        agent: navigator.userAgent,
      },
    })
    let recordEventSubject = new Subject()
    apolloQuery.delay(this.backendDelay).subscribe((result) => {
      recordEventSubject.next(result.data)
    }, error => {
      recordEventSubject.error(error)
    })
    return recordEventSubject
  }

  /**
   * Checks if a given author id is one of the current user's authors
   * 
   * @param authorID 
   */
  isOwner(authorID: string): Boolean {
    if (!this.userAccount) { return false }
    let authorIDs = this.userAccount.authors.map(author => { return author.id })
    return authorIDs.includes(authorID)
  }


  /**
   * Verify and email with token (usually by following email link)
   * 
   * @param email 
   * @param token 
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
    const apolloQuery = this.apollo.watchQuery<any>({
      query: query,
    })

    let verifySubject = new Subject()
    apolloQuery.delay(this.backendDelay).subscribe(result => {
      // this contains all listed in fragment
      const account = result.data.verifyEmail
      this.userAccount = JSON.parse(JSON.stringify(account))
      verifySubject.next(account)
    },
      error => {
        verifySubject.error('error verifying account')
      })
    return verifySubject
  }


  /**
   * Log out the current user
   * 
   * Re-sets the local user account, and removes
   * the JWT from local storage
   */
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
    // console.log('attempting jwt login')
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
      fetchPolicy: 'network-only',
    })

    const jwtLoginSubject = new Subject()
    apolloQuery.delay(this.backendDelay).subscribe((result: jwtLoginResponse) => {
      
      const errors = result.errors
      const info = result.data.jwtLogin.info
      if (info.success) {
        const account = result.data.jwtLogin.account
        this.userAccount = JSON.parse(JSON.stringify(account))
        localStorage.setItem('jwt', account.jwt)
        jwtLoginSubject.next(info)
        this.loginSubject.next(this.userAccount)
      } else {
        jwtLoginSubject.error(info.message)
      }
    }, (error) => {
      console.error('unhandled jwtLogin backend error')
    })
    return jwtLoginSubject
  }



  /**
   * ACCOUNT CREATION with email and password
   * If successful, returns an iAccount, and also sets it as the userAccount
   */
  createAccount(email: string, password: string): Observable<any> {
    const query = gql`
    {createAccount {
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
      fetchPolicy: 'network-only',
      variables: {
        email: email,
        password: password,
      },
    })

    const createAccountSubject = new Subject()
    apolloQuery.delay(this.backendDelay).subscribe(result => {
      const info = result.data.createAccount.info
      if (info.success) {
        const account = result.data.createAccount.account
        this.userAccount = account
        localStorage.setItem('jwt', account.jwt)
      }
      createAccountSubject.next(info)
    },
      // un-expected Backend error
      (error) => {
        createAccountSubject.error('unexpected backend error')
      })
    return createAccountSubject

  }


  /**
   * Saves an existing or creates a new author
   * 
   * @param author 
   */
  saveAuthor(author: any) {
    const saveAuthorSubject = new Subject()
    const jwt = localStorage.getItem('jwt')
    if (!jwt) {
      saveAuthorSubject.error('not authenticated')
      return saveAuthorSubject
    }
    const query = gql`
      {saveAuthor {
        info {
          ...info
        }
        author {
          id
        }
      }}
      ${this.fragments.info}
    `
    const apolloQuery = this.apollo.watchQuery<any>({
      query: query,
      fetchPolicy: 'network-only',
      variables: {
        jwt: jwt,
        authorID: author.id,
        name: author.name,
        about: author.about,
        imageURL: author.imageURL
      },
    })
    apolloQuery.delay(this.backendDelay).subscribe(result => {
      if (result.data.saveAuthor.info.success === true) {
        saveAuthorSubject.next(result.data.saveAuthor)
        if (author.id === 'create-author') this.jwtLogin()
      } else {
        saveAuthorSubject.error(result.data.saveAuthor.info)
      }
    })
    return saveAuthorSubject
  }


  /**
   * Loads an author and their content
   * 
   * @param authorID 
   */
  getAuthor(authorID: string) {
    // check locally: ToDo!
    const query = gql`
      {author {
        id, name, about, imageURL
      }}
    `
    const querySubscription = this.apollo.watchQuery<any>({
      query: query,
      fetchPolicy: 'network-only',
      variables: {
        authorID: authorID,
      },
    })
    const authorSubject = new Subject()
    querySubscription.subscribe(result => {
      const author = result.data.author
      authorSubject.next(author)
    },
      (error) => {
        authorSubject.error('error getting author')
      })
    return authorSubject

  }

  /**
   * Deletes an author and all their content
   * 
   * @param authorID 
   */
  deleteAuthor(authorID): Observable<any> {
    /**
     * Deletes an Author, removes it from the userAccount's authors, 
     * and returns information about the status
     */
    const jwt = localStorage.getItem('jwt')
    let query = gql`
      {deleteAuthor(jwt:"${jwt}", authorID: "${authorID}"){
        ...info
      }}
      ${this.fragments.info}
    `
    const apolloQuery = this.apollo.watchQuery<any>({
      query: query,
      fetchPolicy: 'network-only',
    })
    const deleteSubject = new Subject()
    apolloQuery.delay(this.backendDelay).subscribe(result => {
      
      const info: InfoFragment = result.data.deleteAuthor 
      deleteSubject.next(info)
      deleteSubject.complete()
      if (info.success) {
        // reissue jwt
        this.jwtLogin()
      }
    }, (error) => {
      deleteSubject.error(error)
    })
    return deleteSubject
  }


  /**
   * Load a publication, given its author and publication ID
   * 
   * @param authorID 
   * @param publicationID 
   */
  getPublication(authorID: string, publicationID: string): Observable<any> {

    // TODO: revisit this query, use fragments
    /**
     * here is room for optimization. we already know hte publication and author
     * we could just stick it into each article instead of requesting it always
     */
    const query = gql`
        {publication {
          ...publication
          author {
            ...author
          }
          articles {
            ...article
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
        ${this.fragments.publication}
        ${this.fragments.author}
        ${this.fragments.article}
      `
    const querySubscription = this.apollo.watchQuery<any>({
      query: query,
      fetchPolicy: 'network-only',
      variables: {
        authorID: authorID,
        publicationID: publicationID
      },
    })
    const publicationSubject = new Subject()
    querySubscription.subscribe(result => {
      // TODO: why does this not need to be unpacked?
      const publication = result.data.publication
      publicationSubject.next(publication)
    },
      error => {
        publicationSubject.error('error getting publication')
      })
    return publicationSubject
  }

  /**
   * Save an existing or create a new publication
   * 
   * @param publication 
   */
  savePublication(publication): Observable<any> {
    const jwt = localStorage.getItem('jwt')
    const query = gql`
      {
       savePublication {
          publication {
            ...publication
            author {
              ...author
            }
          }
          info {
            ...info
          }
        }
      }
      ${this.fragments.info}
      ${this.fragments.publication}
      ${this.fragments.author}
    `
    const querySubscription = this.apollo.watchQuery<any>({
      query: query,
      fetchPolicy: 'network-only',
      variables: {
        jwt: jwt,
        authorID: publication.author.id,
        publicationID: publication.id,
        name: publication.name,
        about: publication.about,
        imageURL: publication.imageURL,
      },
    })
    const saveSubject = new Subject()
    querySubscription.delay(this.backendDelay).subscribe(result => {
      const publication = result.data.savePublication.publication
      const info = result.data.savePublication.info
      if (info.success) {
        saveSubject.next(result.data.savePublication)
      } else {
        saveSubject.error(info.message)
      }
    },
      // unchaught backend exception?
      error => {
        saveSubject.error('error saving publication')
      })
    return saveSubject


  }

  /**
   * Save a existing or create an new article
   * 
   * @param authorID 
   * @param publicationID 
   * @param articleID 
   * @param article 
   */
  saveArticle(authorID: string, publicationID: string, articleID: string, article): Observable<any> {
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
            publication {
              ...publication
              author {
                ...author
              }
            }
          }
        }
      }
      ${this.fragments.article}
      ${this.fragments.publication}
      ${this.fragments.author}
      ${this.fragments.info}
    `
    const apolloQuery = this.apollo.watchQuery<any>({
      query: query,
      fetchPolicy: 'network-only',
      variables: {
        jwt: jwt,
        authorID: authorID,
        publicationID: publicationID,
        articleID: articleID,
        title: article.title,
        bodyOps: article.bodyOps
      },
    })
    const saveSubject = new Subject()
    apolloQuery.delay(this.backendDelay).subscribe(result => {
      const article = result.data[endpoint].article
      const info = result.data[endpoint].info

      const reply = result.data[endpoint]
      if (info.success) {
        saveSubject.next(reply)
        saveSubject.complete()
      } else {
        saveSubject.error(reply.info.message)
      }
    }, (error) => {
      saveSubject.error('an unexpected error occured')
    })
    return saveSubject
  }

  /**
   * Publish or un-publish an article
   * 
   * @param article 
   * @param unpublish 
   */
  publishArticle(article, unpublish = false) {
    const jwt = localStorage.getItem('jwt')
    const query = gql`
      { publishArticle {
        info {
          ...info
        }
        article {
          ...article
          publication {
            ...publication
            author {
              ...author
            }
          }
        }
      }}
      ${this.fragments.info}
      ${this.fragments.article}
      ${this.fragments.publication}
      ${this.fragments.author}
    `
    const apolloQuery = this.apollo.watchQuery<any>({
      fetchPolicy: 'network-only',
      query: query, variables: {
        jwt: jwt,
        authorID: article.publication.author.id,
        publicationID: article.publication.id,
        articleID: article.id,
        unpublish: unpublish,
      },
    })
    let publishSubject = new Subject()
    apolloQuery.delay(this.backendDelay).subscribe(result => {
      const info = result.data.publishArticle
      publishSubject.next(info)
    })
    return publishSubject

  }

  /**
   * Delete a given article
   * 
   * @param article 
   */
  deleteArticle(article): Observable<any> {
    console.log(article)
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
      fetchPolicy: 'network-only',
      variables: {
        jwt: jwt,
        authorID: article.publication.author.id,
        publicationID: article.publication.id,
        articleID: article.id
      },
    })
    const deleteSubject = new Subject()
    apolloQuery.delay(this.backendDelay).subscribe(result => {
      const info = result.data.deleteArticle
      deleteSubject.next(info)
    })
    return deleteSubject
  }


  /**
   * Saves an authors order of publications and articles
   * 
   * @param author 
   */
  saveAuthorOrder(author) {
    let authorDict = {
      authorID: author.id,
      publications: [],
    }
    for (let publication of author.publications) {
      let publicationDict = {
        publicationID: publication.id,
        articles: []
      }
      for (let article of publication.articles) {
        publicationDict.articles.push(article.id)
      }
      authorDict.publications.push(publicationDict)
    }
    const authorData = JSON.stringify(authorDict)
    console.log(authorData)
    const query = gql`
      {
        saveAuthorOrder {
          message
          success
        }
      }
    `
    const apolloQuery = this.apollo.watchQuery<any>({
      query: query,
      fetchPolicy: 'network-only',
      variables: {
        authorData: authorData,
      },
    })
    const saveSubject = new Subject()
    apolloQuery.delay(this.backendDelay).subscribe(result => {
      console.log('save author data returned', result)
      saveSubject.next(result.data)
    })
    return saveSubject
  }


  /**
   * Loads an article from given IDs
   * includes the article's publication and the publication's author
   * 
   * @param authorID 
   * @param publicationID 
   * @param articleID 
   */
  getArticle(authorID: string, publicationID: string, articleID: string) {
    const query = gql`
    { article {
      info {
        ...info
      }
      article {
        ...article
        publication {
          ...publication
          author {
            ...author
          }
        }
      }
    }}
    ${this.fragments.info}
    ${this.fragments.article}
    ${this.fragments.publication}
    ${this.fragments.author}
    `
    const apolloQuery = this.apollo.watchQuery<any>({
      query: query,
      fetchPolicy: 'network-only',
      variables: {
        authorID: authorID,
        publicationID: publicationID,
        articleID: articleID,
      },
    })
    const articleSubject = new Subject()
    apolloQuery.delay(this.backendDelay)
      .subscribe((reply: ArticleResponse )=> {
        if (reply.data.article.info.success) {
          articleSubject.next(reply.data.article.article)
          articleSubject.complete()
        } else { 
          articleSubject.error(reply)
        }
      }, error => {
        articleSubject.error('unexpected backend error')
      })
    return articleSubject
  }

  /**
   * Deletes a given publication server-side
   * 
   * TODO: remove publication from local state
   * check the way it's done above (filter)
   * 
   * @param publication 
   */
  deletePublication(publication: PublicationFragment): Observable<any> {

    const jwt = localStorage.getItem('jwt')
    const query = gql`
      {deletePublication {
        ...info
      }}
      ${this.fragments.info}
    `
    const apolloQuery = this.apollo.watchQuery<any>({
      query: query,
      fetchPolicy: 'network-only',
      variables: {
        jwt: jwt,
        authorID: publication.author.id,
        publicationID: publication.id,
      },
    })
    const deleteSubject = new Subject()
    apolloQuery.delay(this.backendDelay).subscribe(result => {
      const info = result.data.deletePublication
      let authors = this.userAccount.authors
      if (info.success) {
        // TODO: see docstring
      }
      deleteSubject.next(info)
    })
    return deleteSubject
  }



  /**
   * Image Upload
   * 
   * @param file 
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
        console.log('upload percent', percent)
        progressStream.next(percent)
      })

      /** listen to a success message from the server */
      xhr.onreadystatechange = () => {
        console.log('read state change', xhr.readyState, xhr.status)
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log('image upload response', xhr.response)
            let imageInfo = JSON.parse(xhr.response)
            progressStream.next(100)
            //progressStream.next(JSON.parse(xhr.response));
            // TODO: are there benefits over using complete over next? looks cool...
            progressStream.complete()
            this.userImages.unshift(imageInfo)
          } else {
            // on error - what do they look like?
            progressStream.error(xhr.response);
          }
        }
      }
      // request an upload URL, then kick off upload!
      this.http.get(this.backendHost + '/api/image/upload-url').map(res => { return res.json() }).subscribe(data => {
        xhr.open('POST', data.url, true)
        xhr.send(formData);
      })
    })
  }

  /**
   * Deletes a users image permanently on the backend
   * and from the local state (user images)
   * 
   * @param userImage 
   */
  deleteImage(userImage) {
    const query = gql`{
      deleteImage(id: "${userImage.id}") {
        message
      }
    }`
    const apolloQuery = this.apollo.watchQuery<any>({
      query: query,
      fetchPolicy: 'network-only',
      variables: {
        jwt: localStorage.getItem('jwt'),
        id: userImage.id,
      }
    })
    const deleteSubject = new Subject()
    apolloQuery.delay(this.backendDelay).subscribe(result => {
      const index = this.userImages.indexOf(userImage)
      this.userImages.splice(index, 1)
      deleteSubject.next(result.data.deleteImage.message)
    })
    return deleteSubject
  }




  /**
   * Returns RequestOptions of content-type: json, withCredentials: true
   * NOT IN USE
   */
  defaultOptions(): RequestOptions {
    let headers = new Headers({ 'Content-Type': 'application/json' })
    return new RequestOptions({ headers: headers, withCredentials: true })
  }

}
