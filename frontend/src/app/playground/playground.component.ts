import { Component, OnInit } from '@angular/core'

import { BackendService } from '../backend.service'
import { Http, Headers, RequestOptions, Response } from '@angular/http'
import { UIService } from '../ui.service'

import {
  PublicationData,
  IBackendData, IResource, Author, AuthorData, Publication, Resource
} from '../models'

import { Observable } from 'rxjs/Observable'
import { Observer } from 'rxjs/Observer'
import 'rxjs/add/operator/map'

interface ServerError {
  status: number
  statusText: string
  _body: string
}
interface ValidationError {
  status: number
  statusText: string
}

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.css']
})
export class PlaygroundComponent implements OnInit {

  checks = [

  ]

  constructor(
    private backend: BackendService,
    private ui: UIService,

    private http: Http,
  ) { }

  ngOnInit() {
    this.improperCreate()
    this.properCreate()
  }

  newAuthor: Author
  createdAuthor: Author
  updatedAuthor: Author
  deletedAuthor: Author


  sampleImage = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='30' height='30'><circle cx='15' cy='15' r='10' /></svg>"


  freshAuthorData() {
    return {
      id: 'new',
      url: 'http://localhost:8080/author/new',
      name: '',
      nameText: '',
      about: '',
      aboutText: '',
      imageUrl: this.sampleImage,
      deleted: false,
    }
  }

  /**
   * Try to create and author, with a poor request
   * expecting 400: missing required parameter
   */
  improperCreate() {
    let improperAuthorData = this.freshAuthorData()
    let improperAuthor = new Author(improperAuthorData)
    this.putResource(improperAuthor).subscribe(
      // should not happen
      (authorData: AuthorData) => {
        alert('should not happen')
      },
      (error: ValidationError | ServerError) => {
        if (error.status === 400) {
          this.checks.push('improper create: CHECK!')
        } else if (error.status === 999) {
          this.checks.push('improper create: Check! (got expected validation error)')
        }
      }
    )
  }

  properCreate() {
    let epoch = new Date().getTime()
    let newUserName = `A test user from ${epoch}`

    let newAuthorData = this.freshAuthorData()
    newAuthorData.nameText = newUserName
    newAuthorData.aboutText = 'I am being abused pretty heavily, but I am strong.'
    let newAuthor = new Author(newAuthorData)

    this.putResource(newAuthor).subscribe(
      // expected
      (authorData: AuthorData) => {
        console.warn('proper create returned author data', authorData)
        this.createdAuthor = new Author(authorData)
        // HERE is a second check, that validates the newly instantiated author from backend data is also valid.
        if (!this.createdAuthor.isValid()) {
          alert('could not create author from backend data!')
        }
        this.checks.push('Proper Create Author: Check!')
        // next check, not cool here... good for now
        this.duplicateCreate()
      },
      // should not happend
      (error: ValidationError | ServerError) => {
        if (error.status === 999) {
          this.checks.push('Proper Create Fail: Validation Error')
        } else {
          this.checks.push('Proper Create Author: FAIL! (unexpected Server Error)')
          console.log('error creating author', error)
        }

      },
      // needed?
      () => {
        console.log('put resource is done now.')
      }
    )
  }
  /**
   * Try to create an author with a name that alredy exits.
   * Expects the server to return 409 - already exists
   */
  duplicateCreate() {
    let duplicateAuthorData = this.freshAuthorData()
    //duplicateAuthorData.name = this.createdAuthor.name
    let duplicateAuthor = new Author(duplicateAuthorData)
    console.log('create dup author (fresh)', duplicateAuthor, duplicateAuthor.data())
    duplicateAuthor.nameText = this.createdAuthor.nameText
    console.log('changed dup name to', this.createdAuthor.nameText, duplicateAuthor, duplicateAuthor.data())

    this.putResource(duplicateAuthor).subscribe(
      (authorData: AuthorData) => {
        this.checks.push('Duplicate Create Author: Success handler did not expect to be called')
      },
      (error: ServerError | ValidationError) => {
        // not expected
        if (error.status === 999) {
          this.checks.push('Duplicate Create Author: Fail! (did not expect validation error)')
        }
        // expected
        else if (error.status === 409) {
          this.checks.push('Duplicate Create Author: Check')
          // next test!
          this.properUpdate()

          // something went wrong
        } else {
          console.warn('unexpected error', error)
          this.checks.push('Duplicate Create Author: Fail (unexpected status code)')
        }
      }
    )
  }

  properUpdate() {
    this.createdAuthor.nameText = 'Now I am named Lady Diana!'
    this.postResource(this.createdAuthor).subscribe(
      (authorData: AuthorData) => {
        let updatedAuthor = new Author(authorData)
        // check if still validates
        if (!updatedAuthor.isValid()) {
          this.checks.push('updated author, but newly created author from backend data does not validate')
        } else {
          this.createdAuthor = updatedAuthor
          if (this.createdAuthor.nameText === 'Now I am named Lady Diana!') {
            this.checks.push('Proper Update: Check! (hello Diana)')
            this.properGet()
          }
        }
      }
    )
  }

  properGet() {
    let url = this.createdAuthor.url
    this.getResourceByUrl(url).subscribe(
      (authorData: AuthorData) => {
        let gottenAuthor = new Author(authorData)
        if (gottenAuthor.nameText === 'Now I am named Lady Diana!') {
          this.checks.push('Proper Get: Checks! (you still dressed as di)')
          this.properDelete()
        }
      },
      (error: ValidationError | ServerError) => {
        this.checks.push('Proper GET Fail')
      }
    )
  }

  properDelete() {
    this.deleteResource(this.createdAuthor).subscribe(
      (authorData: AuthorData) => {
      if (authorData.deleted) {
        this.checks.push('Proper DELETE: Check!')
      }
      },
      (error: ValidationError | ServerError) => {
        
      }
    )
  }

  /**
   * CRUD! :))))
   */
  putResource(resource: IResource): Observable<AuthorData | PublicationData> {
    if (!resource.isValid()) {
      // return validation error, via subscription
      return Observable.create(input => { input.error({ status: 999 }) })
    } else {
      // go ahead and PUT
      return this.http.put(resource.url, resource.data(), this.defaultOptions()).map(res => res.json())
    }
  }
  postResource(resource: IResource): Observable<AuthorData | PublicationData> {
    if (resource.isValid()) {
      // go ahead and POST
      return this.http.post(resource.url, resource.data(), this.defaultOptions()).map(res => res.json())
    } else {
      // return validation error, via subscription
      return Observable.create(input => { input.error({ status: 999 }) })
    }
  }
  deleteResource(resource: IResource): Observable<AuthorData | PublicationData> {
    return this.http.delete(resource.url, this.defaultOptions()).map(res => res.json())
  }

  getResourceByIDs(authorID: string, publicationID?: string, articleID?: string) {
    let url = '/author/' + authorID
    url += publicationID ? `/publication/${publicationID}` : ''
    url += articleID ? `/article/${articleID}` : ''
    return this.http.get(url, this.defaultOptions()).map(res => res.json())
  }

  getResourceByUrl(url: string): Observable<AuthorData | PublicationData> {
    return this.http.get(url, this.defaultOptions()).map(res => res.json())
  }

  /** GET an array of resources */
  getResourcesByUrl(url: string): Observable<IBackendData[]> {
    return this.http.get(url, this.defaultOptions()).map(res => res.json())
  }

  defaultOptions(): RequestOptions {
    let headers = new Headers({ 'Content-Type': 'application/json' })
    return new RequestOptions({ headers: headers, withCredentials: true })
  }





}
