import { Injectable } from '@angular/core'
import { Http, Headers, RequestOptions } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'


@Injectable()
export class BackendService {

  BACKEND_URL = 'http://localhost:8080/'
  author

  constructor(
    private http: Http
  ) {
    //this.test()
  }

  test() {
    this.http.get(this.BACKEND_URL + 'author/hoff').map(response => response.json()).subscribe(author => {
      console.log(author)
      this.author = author
    })
  }

  createAuthor(name: string) {
    let id = name.toLowerCase().replace(/ /g, '-')
    let url = this.BACKEND_URL + 'author/' + id
    let data = { name: name }
    let headers = new Headers({ 'Content-Type': 'application/json' })
    let options = new RequestOptions({ headers: headers, withCredentials: true })
    this.http.put(url, data, options).map(res => res.json()).subscribe(author => {
      console.log('created author', author)
    })
  }

}
