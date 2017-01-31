import { Component, OnInit, Input } from '@angular/core'
import { Publication } from '../interfaces'

import { UIService } from '../ui.service'
import { StyleService } from '../style.service'

@Component({
  selector: 'app-publication-banner',
  templateUrl: './publication-banner.component.html',
  styleUrls: ['./publication-banner.component.css']
})
export class PublicationBannerComponent implements OnInit {

  @Input() publication: Publication
  @Input() heightVH: number = 30


  constructor(
    private ui: UIService,
    private styleService: StyleService,
  ) { }

  ngOnInit() {

  }

  style = {
    bannerHeightPX: this.ui.vh(this.heightVH),
    container: (): any => {
      return {
        'height.vh': this.heightVH
      }
    },
    image: (): any => {
      if (!this.publication) {
        return {}
      }
      return {
        backgroundImage: `url("${this.publication.imageUrl}=s${this.ui.vw(100)}-n")`,
        backgroundPosition: 'center',
        opacity: 0.5,
        'width.%': 100,
        'height.%': 100,
        position: 'absolute',
        top: 0,
        left: 0
      }
    },
    content: () => {
      return {
        'width.%': 100,
        'height.%': 100,
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 3,
      }
    }
  }





}
