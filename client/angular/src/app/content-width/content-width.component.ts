import { Component, OnInit, Input } from '@angular/core'

// INK
import { UIService } from '../ui.service'

@Component({
  selector: 'app-content-width',
  templateUrl: './content-width.component.html',
  styleUrls: ['./content-width.component.css']
})
export class ContentWidthComponent implements OnInit {

  @Input('bg') bg: string = 'transparent'

  constructor(
    public ui: UIService,
  ) { }

  ngOnInit() {
  }

}
