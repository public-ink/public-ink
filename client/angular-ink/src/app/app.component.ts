// ng
import { Component } from '@angular/core'

// ink
import { UIService } from './ui.service'
import { BackendService } from './backend.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    public backend: BackendService,
    public ui: UIService,
  ) { }

  styles = {
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
