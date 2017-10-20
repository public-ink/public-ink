import { Component, Input, HostBinding } from '@angular/core';
import { style, animate, animation, animateChild, useAnimation, group, sequence, transition, state, trigger, query, stagger } from '@angular/animations';

@Component({
  selector: 'profile-stats',
  // styleUrls: ['src/profile-stats.css'],
  animations: [
    trigger('statsAnimation', [
      transition('* => *', group([
        query('.stats-icon', style({ opacity: 0, transform: 'scale(0.8) translateY(10px)' })),
        query('.stats-text', style({ opacity: 0 })),
        query('.stats-icon', stagger('100ms', [
          animate('200ms 250ms ease-out', style('*'))
        ])),
        query('.stats-text', stagger('100ms', [
          animate('200ms 250ms ease-out', style('*'))
        ])),
      ]))
    ])
  ],
  template: `
    <ul class="stats">
      <li class="stats-item">
        <span class="stats-icon icon-eye"></span>
        <span class="stats-text">{{ user.views }}</span>
      </li>
      <li class="stats-item">
        <span class="stats-icon icon-location"></span>
        <span class="stats-text">{{ user.location }}</span>
      </li>
      <li class="stats-item">
        <span class="stats-icon icon-heart"></span>
        <span class="stats-text">{{ user.hearts }}</span>
      </li>
    </ul>
  `,
})
export class ProfileStatsComponent {
  @Input() user: any;

  @HostBinding('@statsAnimation')
  public animateProfile = true;

  constructor() { }
}
