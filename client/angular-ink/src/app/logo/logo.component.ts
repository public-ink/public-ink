import { Component, OnInit, Input } from '@angular/core'

import { UIService } from '../ui.service'

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.css']
})
export class LogoComponent implements OnInit {

  @Input('size') size = 50
  @Input('color') color = 'black'
  @Input('background') background = 'transparent'
  @Input('pad') pad = 30

  thick: number
  width: number
  height: number
  totalHeight: number

  constructor(
    public ui: UIService,
  ) { }

  ngOnInit() {
    this.thick = this.size / 2
    this.width = this.size * 2.7
    this.height = this.size * 1.6

    this.totalHeight = this.height + this.pad + this.pad

    // this.color = '#' + Math.random().toString(16).slice(2, 8)
    // this.color = '#444'
  }

  randomColor() {
    this.color = '#' + Math.random().toString(16).slice(2, 8)
    this.ui.overlay('loading', 'you asked for it')
  }

}
