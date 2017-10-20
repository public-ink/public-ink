import { Component, OnInit, Input } from '@angular/core'
import { query, trigger, state, style, transition, animate } from '@angular/animations'


import { Author } from '../backend.service'

const vhTest = '30vh'

@Component({
  selector: 'app-anitest',
  templateUrl: './anitest.component.html',
  styleUrls: ['./anitest.component.css'],
  animations: [
    trigger('authorState', [
      state('expanded', style({ 'height': vhTest, opacity: 1, background: 'green' })),
      state('compact', style({ 'height': '*', opacity: 0.5, background: 'yellow', })),
      transition('expanded => compact', animate('500ms ease-in')),
      transition('compact => expanded', animate('500ms ease-in')),
      transition('expanded => test', query('.inner', animate('1s', style({ opacity: 0.3 }))))
    ])
  ],
})
export class AnitestComponent implements OnInit {

  @Input('author') author: Author

  constructor() { }

  ngOnInit() {
  }

}
