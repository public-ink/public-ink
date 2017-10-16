// ng
import { Component, ChangeDetectionStrategy } from '@angular/core'

// ink
import { UIService } from './ui.service'
import { BackendService } from './backend.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {

  constructor(
    public backend: BackendService,
    public ui: UIService,
  ) { }

  styles = {
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
}
