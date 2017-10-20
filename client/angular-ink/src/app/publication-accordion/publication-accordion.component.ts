import { Component, OnInit } from '@angular/core'

import { group, query, trigger, state, style, transition, animate } from '@angular/animations'


@Component({
  selector: 'app-publication-accordion',
  templateUrl: './publication-accordion.component.html',
  styleUrls: ['./publication-accordion.component.css'],
  animations: [
    trigger('heroState', [
      state('inactive', style({
        backgroundColor: '#eee',
        transform: 'scale(1)'
      })),
      state('active',   style({
        backgroundColor: '#cfd8dc',
        transform: 'scale(1.1)'
      })),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out'))
    ])
  ]
})
export class PublicationAccordionComponent implements OnInit {

  accordionState = 'expanded'
  state = 'active'

  toggleState() {
    this.state = this.state === 'active' ? 'inactive' : 'active';
  }

  constructor() { }

  ngOnInit() {
  }

}
