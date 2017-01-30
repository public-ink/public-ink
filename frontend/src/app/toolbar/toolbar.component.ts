import { Component, OnInit } from '@angular/core'
import { StyleService } from '../style.service'
import { UIService } from '../ui.service'
import { BackendService } from '../backend.service'

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(
    private backend: BackendService,
    private style: StyleService,
    private ui: UIService,
    
  ) { }

  ngOnInit() {
  }

}
