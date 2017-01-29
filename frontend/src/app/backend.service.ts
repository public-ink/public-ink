import { Injectable } from '@angular/core'
import { Http, Headers, RequestOptions, Response } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'

interface Author {
  id: string;
  name: string;
  email: string;
  about: string | null;
  publications: Publication[];
}

// expand
interface Publication {
  id: string;
  name: string;
  url?: string;
}

interface Article {
  id: string;
  title: string;
  titleText: string;
  teaser: string;
  teaserText: string;
  body: string;
  bodyText: string;
  url?: string; // only optional because of newArticle...
  deleted?: boolean; // only optional because of new...
}

interface ServerError {
  message: string;
}



@Injectable()
export class BackendService {

  currentResource: Article | Publication

  saveCurrentResource() {
    console.log('wanna save', this.currentResource)
    if (this.currentResource.id === 'new') {
      this.http.put(this.BACKEND_URL + this.currentResource.url, this.currentResource, this.defaultOptions()).map(res => res.json()).subscribe(
        (resource) => {
          console.log('created', resource)
        },
        (error) => {
          console.log('caught create error')
        }
      )
    } else {
      this.http.post(this.BACKEND_URL + this.currentResource.url, this.currentResource, this.defaultOptions()).map(res => res.json()).subscribe(
      (resource) => {
          console.log('update', resource)
        },
        (error) => {
          console.log('caught update error')
        }
      )
    }
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
  newPublication: Publication = {
    id: 'new',
    name: 'A new publication',
  }
  startPublication(authorID) {
    let pub = {
      id: 'new',
      name: 'A new publication',
      about: 'yea, about that...',
      url: '/author/' + authorID + '/publication/new'
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

  constructor(
    private http: Http
  ) {
    this.me()
    //this.getPublication('hoff', 'atomic-angular')
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
        this.assumeIdentity(this.userAuthors[0])
      }
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
  getPublications():Observable<Publication> {
    let url = this.BACKEND_URL + '/publications'
    return this.http.get(url).map(res => res.json())
  }

  /**
   * Articles, the last missing piece, for now :)
   * 
   */
  createArticle(article: Article) {
    // try using new if the id is not enforced anyway
    let url = this.BACKEND_URL  + article.url
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


  /**
   * Helpers
   */
  private handleError(error: Response | any) {
    
    console.error(error)
    alert('error handler')

  }

}
