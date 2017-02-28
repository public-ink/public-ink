import { Injectable } from '@angular/core'
import { Http, Headers, RequestOptions, Response } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import { Observer } from 'rxjs/Observer'
import 'rxjs/add/operator/map'

// Services
import { UIService } from './ui.service'

import { Resource } from './models'

// Interfaces
import { Author, Publication, Article, Comment, ServerError } from './interfaces'


@Injectable()
export class BackendService {

  currentResource: Article | Publication

  userImages = []

  loginUrl: string
  logoutUrl: string
  userAuthenticated: boolean = false
  userEmail: string

  /*putResource(resouce: Resource) {
    this.http.put(resouce.url, resouce.data())
  }*/

  saveCurrentResource() {
    console.log('wanna save', this.currentResource)
    this.ui.overlay = true
    if (this.currentResource.id === 'new') {
      this.http.put(this.BACKEND_URL + this.currentResource.url, this.currentResource, this.defaultOptions()).map(res => res.json()).subscribe(
        (resource) => {
          console.log('created', resource)
          this.currentResource = resource
          setTimeout(() => {this.ui.overlay = false}, 1000)
        },
        (error) => {
          console.log('caught create error')
        }
      )
    } else {
      this.http.post(this.BACKEND_URL + this.currentResource.url, this.currentResource, this.defaultOptions()).map(res => res.json()).subscribe(
        (resource) => {
          console.log('updated', resource)
          setTimeout(() => {this.ui.overlay = false}, 1000)
        },
        (error) => {
          console.log('caught update error')
        }
      )
    }
  }

  saveResource(resource) {
    this.currentResource = resource
    this.saveCurrentResource()
  }

  closeOverlay() {
    this.ui.overlay = false
  }

  newArticle: Article = {
    id: 'new',
    title: '{}',
    titleText: '',
    teaser: '{}',
    teaserText: '',
    body: '{}',
    bodyText: ''
  }

  newAuthor: Author = {
    id: 'new',
    name: '{}',
    nameText: '',
    about: '{}',
    aboutText: '',
    url: '/author/new',
  }
  
  startPublication(author: Author) {
    let pub: Publication = {
      id: 'new',
      name: '{}',
      nameText: 'such new',
      about: '{}',
      aboutText: 'yea about that...',
      url: '/author/' + author.id + '/publication/new',
      author: author,
      articles: [],
    }
    return pub
  }



  BACKEND_URL = 'http://localhost:8080'

  // new author name, for creating a new author
  newAuthorName: string = ''
  // new publication name, for create a new publication
  newPublicationName: string = ''

  // the authors associated with the current user
  userAuthors: Author[] = []
  // the current Author identity as which the user acts
  userIdentity: Author

  // local state: saving
  saving: boolean = false

  // media click informer
  mediaStreamIn: Observer<any>
  mediaStreamOut: Observable<any>

  constructor(
    private http: Http,
    private ui: UIService,
  ) {
    this.me()
    this.whoami()
    this.getUserImages()

   this.mediaStreamOut = Observable.create(input => {
      this.mediaStreamIn = input
      console.log('click input', input)
    })
  }

  /**
   * General Stuff
   */

  defaultOptions(): RequestOptions {
    let headers = new Headers({ 'Content-Type': 'application/json' })
    return new RequestOptions({ headers: headers, withCredentials: true })
  }

  /**
   * Author stuff
   */

  /**
   * retrieves a list of authors which belong to the current user
   */
  me() {
    let url = this.BACKEND_URL + '/me'
    this.http.get(url, this.defaultOptions()).map(res => res.json()).subscribe((authors: Author[]) => {
      this.userAuthors = authors
      console.log('your authors', authors)
      if (this.userAuthors.length === 1) {
        // become the one you were last active with
        this.assumeIdentity(this.userAuthors[0])
      }
      this.assumeIdentity(this.userAuthors[0])
    })
  }

  whoami() {
    let url = this.BACKEND_URL + '/whoami'
    this.http.get(url, this.defaultOptions()).map(res => res.json()).subscribe((reply) => {
      this.loginUrl = reply.loginUrl
      this.logoutUrl = reply.logoutUrl
      console.log('authend?', reply.authenticated, reply)
      this.userAuthenticated = reply.authenticated
      this.userEmail = reply.email
    })
  }

  /**
   * create a new author
   */
  createAuthor(name: string) {
    let id = name.toLowerCase().replace(/ /g, '-')
    let url = this.BACKEND_URL + '/author/' + id
    let data = { name: name }
    this.http.put(url, data, this.defaultOptions()).map(res => res.json()).subscribe(
      (author: Author) => {
        console.log('created author', author)
      },
      (error: ServerError) => {
        console.log(error)
        alert(error)
      }
    )
  }

  /**
   * Delete an author
   */
  deleteAuthor(author: Author) {
    let url = this.BACKEND_URL + '/author/' + author.id
    this.http.delete(url, this.defaultOptions()).map(res => res.json()).subscribe((deletedAuthor: Author) => {
      author = deletedAuthor
      alert('deleted author')
      console.log('deleted author')
    })
  }

  /**
   * GET by id
   */
  getAuthorByID(authorID: string): Observable<Author> {
    let url = this.BACKEND_URL + '/author/' + authorID
    return this.http.get(url).map(res => res.json())
  }

  /**
   * Update an author's details
   */
  updateAuthor(author: Author) {
    let url = this.BACKEND_URL + '/author/' + author.id
    let data = {
      name: author.name,
      about: author.about,
    }
    this.http.post(url, data, this.defaultOptions()).map(res => res.json()).subscribe(
      (updatedAuthor: Author) => {
        author = updatedAuthor
        console.log('updated author', updatedAuthor)
      },
      (error) => {
        alert('server error')
        console.log(error)
      }
    )
  }

  /**
   * Become the given author
   */
  assumeIdentity(author: Author): void {
    this.userIdentity = author

  }

  /**
   * PUBLICATIONS
   */
  createPublication(name: string) {
    // only works if you've identified yourself
    let url = this.BACKEND_URL + '/author/' + this.userIdentity.id + '/publication/' + name.toLowerCase().replace(/ /g, '-')
    let data = { name: name }
    this.http.put(url, data, this.defaultOptions()).map(res => res.json()).subscribe(
      (publication: Publication) => {
        console.log('created publication', publication)
      })
  }

  /**
   * Update Publication
   */
  updatePublication(publication: Publication) {
    let url = this.BACKEND_URL + publication.url
    let data = {
      // expand, add about
      name: publication.name,
    }
    this.http.post(url, data, this.defaultOptions()).map(res => res.json()).subscribe(
      (publication: Publication) => {
        console.log('update publication', publication)
      },
      (error) => {
        alert('error updating publication!')
      }
    )
  }

  /**
   * Delete Publication
   */
  deletePublication(publication: Publication) {
    let url = this.BACKEND_URL + publication.url
    console.log(url)
    this.http.delete(url, this.defaultOptions()).map(res => res.json()).subscribe(
      (publication) => {
        console.log('deleted publication', publication)
      },
      (error) => {
        alert('error deleting publication')
      }
    )
  }

  getPublication(publication: Publication) {
    let url = this.BACKEND_URL + publication.url
    this.http.get(url, this.defaultOptions()).map(res => res.json()).subscribe(
      (publication: Publication) => {
        console.log('loaded publication', publication)
      },
      (error) => {
        console.log('error loading publication', error)
      }
    )
  }

  getPublicationByIDs(authorID: string, publicationID: string): Observable<Publication> {
    let url = this.BACKEND_URL + '/author/' + authorID + '/publication/' + publicationID
    return this.http.get(url).map(res => res.json())
  }

// NEW: get multiple publications for Home Page
  getPublications(): Observable<Publication> {
    let url = this.BACKEND_URL + '/publications'
    return this.http.get(url).map(res => res.json())
  }

  /**
   * Articles, the last missing piece, for now :)
   * 
   */
  createArticle(article: Article) {
    // try using new if the id is not enforced anyway
    let url = this.BACKEND_URL + article.url
    let data = {
      titleText: article.titleText,
      title: article.title,
      teaser: article.teaser,
      body: article.body,
    }
    this.http.put(url, data, this.defaultOptions()).map(res => res.json()).subscribe(
      (article: Article) => {
        console.log('created article!', article)
      },
      (error) => {
        this.handleError(error)
        //alert('error creating article')
      }
    )
  }

  getArticle(articleURL: string) {
    /**
     * Retrievs an article from a given url
     */
    let url = this.BACKEND_URL + articleURL
    this.http.get(url).map(res => res.json()).subscribe(
      (article: Article) => {
        console.log('loaded article', article)
      },
      (error) => {
        this.handleError(error)
      }
    )
  }

  getArticleByIDs(authorID: string, publicationID: string, articleID: string): Observable<Article> {
    let url = this.BACKEND_URL + `/author/${authorID}/publication/${publicationID}/article/${articleID}`
    return this.http.get(url).map(res => res.json())
  }


  updateArticle(article: Article) {
    this.saving = true
    let url = this.BACKEND_URL + article.url
    let data = article
    this.http.post(url, article, this.defaultOptions()).map(res => res.json()).subscribe(
      (article: Article) => {
        console.log('update article', article)
        this.saving = false
      },
      (error) => {
        this.handleError(error)
      }
    )
  }

  deleteArticle(article: Article) {
    article.deleted = true
    this.updateArticle(article)
  }


  getUserImages() {
    this.http.get(this.BACKEND_URL + '/userimage', this.defaultOptions()).map(res => res.json()).subscribe(
      (images) => {
        this.userImages = images
      },
      (error) => {
        console.log('caught error getting user images', error)
      }
    )
  }


  


  /**
   * File Uploader for backend!
   */

  uploadFile(file: File): Observable<any> {
    return Observable.create(observer => {
      let formData: FormData = new FormData()
      let xhr: XMLHttpRequest = new XMLHttpRequest()
      // can the string be anything?
      formData.append('uploads[]', file, file.name);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            let data = JSON.parse(xhr.response)
            observer.next(JSON.parse(xhr.response));
            observer.complete()
            // add the new image to your list of images!
            console.log('wanna add', data)
            this.userImages.unshift(data)
          } else {
            observer.error(xhr.response);
          }
        }
      }
      // attaching an onprogres handler breaks cors
      /*xhr.upload.onprogress = (event) => {
          this.progress = Math.round(event.loaded / event.total * 100);
          this.progressObserver.next(this.progress);
      };*/
      // get an upload url, then post!
      this.http.get(this.BACKEND_URL + '/image/upload-url').map(res => { return res.json() }).subscribe(data => {
        console.log('posting to ' + data.url)
        xhr.open('POST', data.url, true)
        xhr.withCredentials = true
        xhr.send(formData);
      })
    })
  }


  /**
   * Helpers
   */
  private handleError(error: Response | any) {

    console.error(error)
    alert('error handler')

  }

}
