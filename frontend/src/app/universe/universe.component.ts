import { Component, OnInit } from '@angular/core'

import { StyleService } from '../style.service'
import { BackendService } from '../backend.service'
import { UIService } from '../ui.service'

@Component({
  selector: 'app-universe',
  templateUrl: './universe.component.html',
  styleUrls: ['./universe.component.css']
})
export class UniverseComponent implements OnInit {

  constructor(
    private style: StyleService,
    private backend: BackendService,
    private ui: UIService,
  ) { }

  ngOnInit() {
  }

}
