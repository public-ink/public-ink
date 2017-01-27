import { Component, OnInit } from '@angular/core'

import { UIService } from '../ui.service'

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.css']
})
export class PlaygroundComponent implements OnInit {

  constructor(
    private ui: UIService,
  ) { }

  ngOnInit() {
  }

}
