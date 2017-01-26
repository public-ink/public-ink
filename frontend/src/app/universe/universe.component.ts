import { Component, OnInit } from '@angular/core'

import { StyleService } from '../style.service'
import { BackendService } from '../backend.service'

@Component({
  selector: 'app-universe',
  templateUrl: './universe.component.html',
  styleUrls: ['./universe.component.css']
})
export class UniverseComponent implements OnInit {

  constructor(
    private style: StyleService,
    private backend: BackendService,
  ) { }

  ngOnInit() {
  }

}
