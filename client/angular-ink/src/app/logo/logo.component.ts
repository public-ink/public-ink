import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.css']
})
export class LogoComponent implements OnInit {

  @Input('size') size = 50

  thick: number
  width: number
  height: number
  bg = 'black'
  negative = 'white'

  constructor() { }

  ngOnInit() {
    this.thick = this.size / 2
    this.width = this.size * 2.7
    this.height = this.size * 1.6

    this.bg = '#' + Math.random().toString(16).slice(2, 8)
  }

  randomColor() {
    this.bg = '#' + Math.random().toString(16).slice(2, 8)
  }

}
