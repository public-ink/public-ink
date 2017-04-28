import { Component, OnInit, Input } from '@angular/core'

// INK
import { UIService } from '../ui.service'

@Component({
  selector: 'app-extra-width',
  templateUrl: './extra-width.component.html',
  styleUrls: ['./extra-width.component.css']
})
export class ExtraWidthComponent implements OnInit {

  @Input('bg') bg: string = 'transparent'

  constructor(
    public ui: UIService,
  ) { }

  ngOnInit() {
    console.log(this.bg)
  }

}
