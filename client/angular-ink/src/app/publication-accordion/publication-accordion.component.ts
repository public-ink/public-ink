import { Component, OnInit } from '@angular/core'

import { group, query, trigger, state, style, transition, animate } from '@angular/animations'

const styles = {
  backgroundExtended: {
    'height': '60vh',
  },
  backgroundCompact: {
    'height': '*',
  },
  hideExtended: {
    'transform': 'scale(1)',
    opacity: 1
  },
  hideCompact: {
    'transform': 'scaleY(0)',
    'opacity': 0
  }
}

const timings = {
  background: '300ms ease-in'
}

@Component({
  selector: 'app-publication-accordion',
  templateUrl: './publication-accordion.component.html',
  styleUrls: ['./publication-accordion.component.css'],
  animations: [
    trigger('backgroundAnimation', [
      state('expanded', style(styles.backgroundExtended)),
      state('compact', style(styles.backgroundCompact)),
      transition('expanded <=> compact', animate(timings.background))
    ]),
    trigger('hideAnimation', [
      state('expanded', style(styles.hideExtended)),
      state('compact', style(styles.hideCompact)),
      transition('expanded <=> compact', animate(timings.background))
    ])
  ],
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
