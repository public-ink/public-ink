import { Injectable } from '@angular/core'
import { Http, Headers, RequestOptions } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'

interface Author {
  id: string;
  name: string;
  email: string;
  about: string | null;
}

interface ServerError {
  message: string;
}


@Injectable()
export class BackendService {

  BACKEND_URL = 'http://localhost:8080/'

  // new author name, for creating a new author
  newAuthorName: string = ''
  // new publication name, for create a new publication
  newPublicationName: string = ''

  // the authors associated with the current user
  userAuthors: Author[] = []
  // the current Author identity as which the user acts
  userIdentity: Author

  constructor(
    private http: Http
  ) {
    this.me()
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
    let url = this.BACKEND_URL + 'me'
    this.http.get(url, this.defaultOptions()).map(res => res.json()).subscribe((authors: Author[]) => {
      this.userAuthors = authors
    })
  }

  /**
   * create a new author
   */
  createAuthor(name: string) {
    let id = name.toLowerCase().replace(/ /g, '-')
    let url = this.BACKEND_URL + 'author/' + id
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
   * Delete and author
   */
  deleteAuthor(author: Author) {
    let url = this.BACKEND_URL + 'author/' + author.id
    this.http.delete(url, this.defaultOptions()).map(res => res.json()).subscribe((deletedAuthor: Author) => {
      author = deletedAuthor
      console.log('deleted author')
    })
  }

  /**
   * Update an author's details
   */
  updateAuthor(author: Author) {
    let url = this.BACKEND_URL + 'author/' + author.id
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
  assumeIdentity(author: Author) {
    this.userIdentity = author
  }

  /**
   * PUBLICATIONS
   */
  createPublication(name: string) {
    let url = this.BACKEND_URL + ''
  }

}
