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
}

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent implements OnInit {

  // the publication that is passed into us
  @Input() publication: Publication

  // emit the fact that the save button has been clicked - do your thing
  // called straight from save button
  @Output() saveClicked: EventEmitter<any> = new EventEmitter()

  constructor(
    private ui: UIService,
  ) { }

  ngOnInit() {

    console.log('pub got pub?', this.publication)
  }

}
