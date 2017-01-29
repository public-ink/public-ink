import { Component, OnInit, Input } from '@angular/core'

@Component({
  selector: 'app-toolbar-button',
  templateUrl: './toolbar-button.component.html',
  template: `
    <flex-col-center>
      <i class="fa fa-{{ icon }} toolbar-icon" aria-hidden="true"></i>
      <span class="toolbar-label">{{ text }}</span>
    </flex-col-center>
  `,
  styleUrls: ['./toolbar-button.component.css']
})
export class ToolbarButtonComponent implements OnInit {

  @Input() icon: string
  @Input() text: string

  constructor() { }

  ngOnInit() {
  }

}
