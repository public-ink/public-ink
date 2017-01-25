import { Component, OnInit } from '@angular/core'

import { BackendService } from '../backend.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  publications: any = []

  constructor(private backend: BackendService) {
    this.backend.getPublications().subscribe((publications) => { // todo: use interface
      this.publications = publications
    })
   }

  ngOnInit() {
  }

}
