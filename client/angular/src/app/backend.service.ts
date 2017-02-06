import { Injectable } from '@angular/core'
import { Http, Headers, RequestOptions, Response } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'

import {
  PublicationData,
  IBackendData, IResource, Author, AuthorData, Publication, Resource
} from './models'

@Injectable()
export class BackendService {

  constructor(
    private http: Http,
  ) { }

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
    let url = '/author/' + authorID
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
