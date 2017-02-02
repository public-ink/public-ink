import { Component, OnInit, Input } from '@angular/core'
import { Publication } from '../interfaces'

import { UIService } from '../ui.service'
import { StyleService } from '../style.service'
import { BackendService } from '../backend.service'


@Component({
  selector: 'app-publication-banner',
  templateUrl: './publication-banner.component.html',
  styleUrls: ['./publication-banner.component.css']
})
export class PublicationBannerComponent implements OnInit {

  @Input() publication: Publication
  @Input() heightVH: number = 30
  @Input() editable: boolean = false
  
  @Input() showAuthor: boolean = true
  // how many articles should be previewed
  @Input() articleCount: number = 0


  constructor(
    private ui: UIService,
    private style: StyleService,
    private backend: BackendService,
  ) { }

  ngOnInit() {

  }

  /**
   * Styles specific to publication banner, and it's articles below?
   */
  stil = {
    name: () => {
      return {
        color: 'white',
        'fontSize.px': 33,
        fontWeight: 'bold',
        background: 'transparent',
        border: 0,
        width: '100%',
        display: 'inline-block',
        textDecoration: 'none',
        textAlign: 'center',
      }
    },
    about: () => {
      return {
        color: 'white',
        'fontSize.px': 20,
        fontWeight: 400,
        background: 'transparent',
        border: 0,
        width: '100%',
        textDecoration: 'none',
        textAlign: 'center',
      }
    },
    bannerHeightPX: this.ui.vh(this.heightVH),
    container: (): any => {
      return {
        'height.vh': this.heightVH,
        'box-shadow': '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
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
