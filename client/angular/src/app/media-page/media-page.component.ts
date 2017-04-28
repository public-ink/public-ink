import { Component, OnInit } from '@angular/core'

// ink
import { BackendService } from '../backend.service'

@Component({
  selector: 'app-media-page',
  templateUrl: './media-page.component.html',
  styleUrls: ['./media-page.component.css']
})
export class MediaPageComponent implements OnInit {

  constructor(
    public backend: BackendService,
  ) { }

  ngOnInit() {
  }

}
