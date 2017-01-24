import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute, Params } from '@angular/router'
import 'rxjs/add/operator/switchMap'
import { Observable } from 'rxjs/Observable'

import { BackendService } from '../backend.service'

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {

  author: any
  authorID: string

  constructor(
    private backend: BackendService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.authorID = params['authorID']
      return this.backend.getAuthorByID(this.authorID).subscribe((author) => {
        this.author = author
      })
    })
  }

}
