import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-shadow',
  templateUrl: './shadow.component.html',
  styleUrls: ['./shadow.component.css']
})
export class ShadowComponent implements OnInit {

  @Input('bottom') bottom: number
  @Input('top') top: number

  constructor() { }

  ngOnInit() {
  }

}
