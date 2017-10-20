import { style, animate, animation, animateChild, useAnimation, group, sequence, transition, state, trigger, query, stagger } from '@angular/animations';

export const fadeAnimation = animation([
  animate('{{ duration }}', style({ opacity: '{{ to }}' }))
], { params: { duration: '1s', to: 1 }});