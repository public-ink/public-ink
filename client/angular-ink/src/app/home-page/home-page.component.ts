import { Component, OnInit } from '@angular/core'

// ink
import { BackendService } from '../backend.service'

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
})
export class HomePageComponent implements OnInit {

  authorState = 'expanded'

  constructor(
    public backend: BackendService,
  ) { }

  ngOnInit() {
  }

  compactAuthors() {
    this.authorState = 'compact'
  }

}
