// angular
import { Component, OnInit } from '@angular/core'
import { DomSanitizer } from '@angular/platform-browser'

import { Http } from '@angular/http'
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations'

// ink
import { UIService } from '../ui.service'
import { BackendService } from '../backend.service'

@Component({
  selector: 'app-paper-tree',
  templateUrl: './paper-tree.component.html',
  styleUrls: ['./paper-tree.component.css'],
  animations: [
    trigger('authorState', [
      state('collapsed', style({
        height: 0,
      })),
      state('expanded',   style({
        height: '*',
      })),
      transition('collapsed => expanded', animate('400ms ease-in')),
      transition('expanded => collapsed', animate('400ms ease-out'))
    ]),
    trigger('publicationState', [
      state('collapsed', style({
        height: 0,
      })),
      state('expanded',   style({
        height: '*',
      })),
      transition('collapsed => expanded', animate('400ms ease-in')),
      transition('expanded => collapsed', animate('400ms ease-out'))
    ]),
  ]
})
export class PaperTreeComponent implements OnInit {

  constructor(
    // ink
    public ui: UIService,
    public backend: BackendService,
  ) { }


  ngOnInit() {
  }

}
