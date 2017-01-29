import { Component, OnInit } from '@angular/core'
import { StyleService } from '../style.service'
import { UIService } from '../ui.service'

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(
    private style: StyleService,
    private ui: UIService,
  ) { }

  ngOnInit() {
  }

}
