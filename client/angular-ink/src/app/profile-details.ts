import { Component, Input, HostBinding } from '@angular/core';
import { style, animate, animation, animateChild, useAnimation, group, sequence, transition, state, trigger, query, stagger } from '@angular/animations';
import { fadeAnimation } from './animations';

@Component({
  selector: 'profile-details',
  // styleUrls: ['src/profile-details.css'],
  animations: [
    trigger('profileAnimation', [
      transition(':enter', group([
        query('.wrapper', style({ opacity: 0, transform: 'rotateX(-90deg) translateY(150px) translateZ(50px)' })),
        query('.profile-image-border, .profile-image', style({ transform: 'scale(0)' })),
        query('.username, .username-title', style({ opacity: 0, transform: 'translateX(50px)' })),
        query('main', style({ transform: 'translateY(100%)' })),
        // yea
        query('.wrapper', group([
          useAnimation(fadeAnimation, {
            params: {
              duration: '150ms',
              to: 1
            }
          }),
          animate('300ms cubic-bezier(0.68, 0, 0.68, 0.19)', style({ transform: 'matrix(1, 0, 0, 1, 0, 0)' }))  
        ])),
        // sup
        query('.profile-image-border', [
          animate('200ms 250ms ease-out', style('*'))
        ]),
        // so cool
        query('.profile-image', [
          animate('200ms 300ms ease-out', style('*'))
        ]),
        // more!
        query('.username, .username-title', stagger('100ms', [
          animate('200ms 250ms ease-out', style('*'))
        ])),
        // fuck yea
        query('main', [
          animate('200ms 250ms ease-out', style('*'))
        ]),
        // such cool
        query('profile-stats', animateChild())
      ]))
    ])
  ],
  template: `
    <div class="wrapper">
      <header>
        <div class="profile-image-wrapper">
          <div class="profile-image-border"></div>
          <img class="profile-image" src="https://api.adorable.io/avatars/90/me@you.com.png" />
        </div>
        <div class="profile-header-content">
          <span class="username">{{ user.name }}</span>
            <span class="username-title">{{ user.title }}</span>
        </div>
      </header>
      <main>
        <profile-stats [user]="user"></profile-stats>
      </main>
    </div>
  `,
})
export class ProfileDetailsComponent {
  @Input() user: any;
  
  @HostBinding('@profileAnimation')
  public animateProfile = true;
  
  constructor() {}
}