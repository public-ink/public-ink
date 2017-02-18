import { Component, OnInit } from '@angular/core'

import { BackendService } from '../backend.service'

@Component({
  selector: 'app-me-page',
  templateUrl: './me-page.component.html',
  styleUrls: ['./me-page.component.css']
})
export class MePageComponent implements OnInit {

  newAuthorName = ""

  constructor(
    private backend: BackendService
  ) { }

  ngOnInit() {
  }

  createAuthor() {
    console.log('create author', this.newAuthorName)
    this.backend.createAuthor(this.newAuthorName)
  }

}
