import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core'
import { DomSanitizer } from '@angular/platform-browser'

// ink
import { Publication } from '../models'
import { UIService } from '../ui.service'


@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent implements OnInit {


  // the publication that is passed into us
  @Input() publication: Publication
  @Input() editable: boolean = false

  // emit the fact that the save button has been clicked - do your thing
  // called straight from save button
  @Output() saveClicked: EventEmitter<any> = new EventEmitter()

  constructor(
    private ui: UIService,
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit() {
    this.ui.mediaClickObservable.subscribe(image => {
      console.log('sup')
      this.publication.imageUrl = image.url // size?
    })
  }

  jo() {
    return 'sup'
  }
  safeBG() {
    let str = `url(${this.publication.imageUrl})`
    return this.sanitizer.bypassSecurityTrustStyle(str)
  }

  style = {
    name: () => {
      return {
        'font-size.px': this.ui.responsiveValue(40,60),
        'font-weight': 'bold',
        'color': 'white',
        'text-align': 'center',
        'text-decoration': 'none',
        'margin': '10px 0px',
      }
    },
    about: () => {
      return {
        'font-size.px': this.ui.responsiveValue(20,30),
        'font-weight': 'normal',
        'color': 'white',
        'text-align': 'center',
        'margin': '10px 0px',
      }
    }
  }

}
