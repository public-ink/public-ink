// ng
import { Component, ChangeDetectionStrategy } from '@angular/core'
import { trigger, state, style, transition, animate } from '@angular/animations'


// ink
import { UIService } from './ui.service'
import { BackendService } from './backend.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('topBarAnimation', [
      state('expanded', style({'height': '*', opacity: 1})),
      state('compact', style({'height': '0px', opacity: 0})),
      transition('compact <=> expanded', animate('100ms ease-in-out'))
    ]),
    // overlay
    trigger('overlayAnimation', [
      // state('yes', style({'height': '*', opacity: 1, 'background': 'red'})),
      // state('no', style({'height': '*', opacity: 1, 'background': 'green'})),

      // enter: start with 0 opacity, bit smaller
      transition(':enter', [
        style({opacity: 0.5, background: 'white', transform: 'scale(1)'}),
        animate('300ms ease-in-out')
      ]),

      // leave: animate from where we are to 0 opacity
      transition(':leave', [
        animate('300ms ease-in-out'),
        style({opacity: 0.5, 'background': 'white', transform: 'scale(1.5)'})
      ]),
    ]),

    // Debug bar (enter, gone)
    // enter buggy!
    trigger('debugBarAnimation', [
      // enter: start with 0 width
      state(':enter', style({'margin-left.px': '-300px'})),

      transition(':enter', [
        animate('300ms ease-in-out'),
        style({'margin-left': '0px'}),
      ]),
      // leave: got to 0 width
      transition(':leave', [
        animate('300ms ease-in-out'),
        style({'margin-left': '-300px'})
      ]),
    ]),

    // todo: use actual height of media bar.
    trigger('mediaBar', [
      state('no', style({'bottom': '-300px', 'opacity': 0})),
      state('yes', style({'bottom': '0px', 'opacity': 1})),
      transition('no <=> yes', animate('300ms ease-in-out'))
    ]),
  ]
})
export class AppComponent {

  constructor(
    public backend: BackendService,
    public ui: UIService,
  ) { }

  styles = {
    mediaBar: () => {
      return {
        'box-shadow': 'rgba(0, 0, 0, 0.12) 0px -2px 2px',
        'padding': '20px'
      }
    },
    topBar: () => {
      return {
        'background-color': 'rgba(255, 255, 255, 0.98)',
        'width.%': 100,
         'position': 'fixed',
         top: 0,
         left: 0,
         'box-shadow': '0px 2px 4px rgba(0,0,0,.12)',
      }
    },
    debugBar: () => {
      return {
        'background-color': 'rgba(255, 255, 255, 0.98)',
        'overflow-y': 'scroll',
        'width.px': 300,
        'padding.px': 20,
         'position': 'fixed',
         'height.%': 100,
         top: 0,
         left: 0,
         'box-shadow': '4px 2px 4px rgba(0,0,0,.12)',
      }
    },
    logo: () => {
      return {
        'font-size.px': 30,
      }
    },
    input: (bg = 'white') => {
      return {
        'font-size.px': 30,
        'background-color': bg,
        'border-width': '0 0 2px 0',
        'outline': 'none',
        'width.px': 400,
      }
    },
    button: (bg = 'white') => {
      return {
        'font-size.px': 30,
        'background-color': bg,
        'border-width': '0 0 0 0',
        'border-left': '0px solid',
        'border-bottom': '1px solid black',
        'padding-left': '50px',
        'padding-right': '50px',
      }
    },
    buttonPadding: 10
  }

  toggleAccount() {
    this.backend.account.accordionState = this.backend.account.accordionState === 'compact' ? 'expanded' : 'compact'
  }
}
