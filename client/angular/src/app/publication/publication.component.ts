import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core'
import { DomSanitizer } from '@angular/platform-browser'

// ink
import { UIService } from '../ui.service'
import { BackendService } from '../backend.service'


@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent implements OnInit {


  // the publication that is passed into us
  @Input() publication
  @Input() editable: boolean = false

  // emit the fact that the save button has been clicked - do your thing
  // called straight from save button
  @Output() saveClicked: EventEmitter<any> = new EventEmitter()

  constructor(
    public ui: UIService,
    public sanitizer: DomSanitizer,
    public backend: BackendService,
  ) { }

  ngOnInit() {
    this.ui.mediaClickObservable.subscribe(image => {
      
      this.publication.imageURL = image.url // size?
    })
  }

  
  safeBG() {
    let str = `url(${this.publication.imageURL}&w=${this.ui.deviceWidth})`
    return this.sanitizer.bypassSecurityTrustStyle(str)
  }

  style = {
    name: () => {
      return {
        'font-size.px': this.ui.responsiveValue(40,50),
        'font-weight': 'bold',
        'color': 'white',
        'text-align': 'center',
        // 'text-decoration': 'none',
        'margin': '10px 0px',
        'outline': 0,
        'display': 'block',
      }
    },
    about: () => {
      return {
        'font-size.px': this.ui.responsiveValue(18,24),
        'font-weight': 300,
        'color': 'white',
        'text-align': 'center',
        'margin': '10px 0px',
      }
    }
  }

}
