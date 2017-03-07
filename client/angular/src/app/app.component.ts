import { Component } from '@angular/core'

// Services
import { BackendService } from './backend.service'
import { UIService } from './ui.service'

import { environment } from '../environments/environment'

// RX
import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription'
import 'rxjs/Rx'

// Models (old remove)
import { 
  Author,
  AuthorData,
} from './models'

// Declarations
declare function stopTimer(timestamp: number): void


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public: boolean

  constructor(
    private backend: BackendService,
    private ui: UIService,
  ) {
    let now = new Date().getTime()
    stopTimer(now)

    this.public = environment.public
    console.log('app environment', environment)

    // observe keyboard
    Observable.fromEvent(window, 'keydown').subscribe((event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.keyCode === 27) {
        // cmd + escape
        this.public = !this.public
        event.preventDefault()
      } 
    })
  }
}
