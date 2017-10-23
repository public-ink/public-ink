// ng
import { Component, OnInit, Input } from '@angular/core'
import { trigger, state, style, transition, animate } from '@angular/animations'


@Component({
  selector: 'app-arrow',
  template: `
  <div [@rotateAnimation]="accordionState" [ngStyle]="arrowStyle()"></div>
  `,
  styleUrls: ['./arrow.component.css'],
  styles: [`
    :host {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  `],
  animations: [
    trigger('rotateAnimation', [
      state('expanded', style({
        transform: 'rotate(225deg)'
      })),
      state('compact', style({
        transform: 'rotate(135deg)'
      })),
      transition('expanded <=> compact', animate('200ms ease-in')),
    ]),
  ],
})
export class ArrowComponent implements OnInit {

  @Input('accordionState') accordionState = 'compact'
  // @Input('size') size = 50
  @Input('color') color = '#111'

  arrowStyle = () => {
    return {
      'border-top': '2px solid ' + this.color,
      'border-left': '2px solid ' + this.color,
      'width.px': 18,
      'height.px': 18,
      'transform': 'rotate(135deg)',
    }
  }

  constructor() { }

  ngOnInit() {
  }

}
