import { Component, OnInit, Input } from '@angular/core'

// ink
import { Publication } from '../models'

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent implements OnInit {

  @Input() publication: Publication

  constructor() { }

  ngOnInit() {

    console.log('pub got pub?', this.publication)
  }

}
