import { Component, OnInit } from '@angular/core'
import { BackendService } from '../backend.service'

@Component({
  selector: 'app-media-bar',
  templateUrl: './media-bar.component.html',
  styleUrls: ['./media-bar.component.css']
})
export class MediaBarComponent implements OnInit {

  constructor(
    private backend: BackendService,
  ) { 
  }

  ngOnInit() {
  }

  onMediaClick(media) {
    console.log('media bar will publish to', this.backend)
    this.backend.mediaStreamIn.next(media)
  }



}
