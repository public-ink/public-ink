import { Component, OnInit } from '@angular/core'
import {trigger, state, transition, animate, style} from '@angular/animations'

import { UIService } from '../ui.service'

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
  // not in use
  animations: [
        trigger('fadeAnimation', [
          state('true' , style({ opacity: 1, transform: 'scale(1.0)' })),
          state('false', style({ opacity: 0, transform: 'scale(0.0)'  })),
          transition('1 => 0', animate('300ms')),
          transition('0 => 1', animate('900ms'))
    ])
  ],
})
export class EditorComponent implements OnInit {

  constructor(
    public ui: UIService,
  ) { }

  ngOnInit() {
  }

}
