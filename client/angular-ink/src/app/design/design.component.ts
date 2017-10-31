import { Component, OnInit } from '@angular/core'
import { trigger, state, transition, animate, style } from '@angular/animations'

@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.css'],
  animations: [
    trigger('testAnimation', [
      state('yes', style({background: 'blue', width: '500px'})),
      // state('no', style({background: 'black', width: '100px'})),

      // appear: start with -100% left, animate to normal
      transition(':enter', [
        style({transform: 'translateX(-100%)'}),
        animate(1000)
      ]),

      // leave: animate from where we are to 100% right
      transition(':leave', [
        animate(1000, style({transform: 'translateX(100%)', background: 'lime'}))
      ]),

      // transition(':enter', animate('300ms ease-in')),
      // transition(':leave', animate('300ms ease-in')),
    ])
  ]
})
export class DesignComponent implements OnInit {

  testbarShown = 'yes'

  toggle() {
    this.testbarShown = this.testbarShown === 'yes' ? 'no' : 'yes'
  }

  constructor() { }

  ngOnInit() {
  }

}
