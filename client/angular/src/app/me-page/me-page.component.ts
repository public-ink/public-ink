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
    public backend: BackendService
  ) { }  

  ngOnInit() {
  }


}
