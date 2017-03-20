import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core'

// ink
import { Publication } from '../models'
import { UIService } from '../ui.service'

interface iAuthor {
  id: string
  name?: string
}

export interface iPublication {
  new?: boolean
  id: string
  name?: string
  author?: iAuthor 
  articles: any[]
  imageURL: string
}

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent implements OnInit {

  safeBG: any

  // the publication that is passed into us
  @Input() publication: Publication
  @Input() editable: boolean = false

  // emit the fact that the save button has been clicked - do your thing
  // called straight from save button
  @Output() saveClicked: EventEmitter<any> = new EventEmitter()

  constructor(
    private ui: UIService,
  ) { }

  ngOnInit() {
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
