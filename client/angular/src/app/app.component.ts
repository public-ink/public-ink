import { Component } from '@angular/core'

// Services
import { BackendService } from './backend.service'
import { UIService } from './ui.service'

import { environment } from '../environments/environment'

// RX
import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription'
import 'rxjs/Rx'



// Declarations
declare function stopTimer(timestamp: number): void


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  public: boolean
  environment

  constructor(
    public backend: BackendService,
    public ui: UIService,
  ) {
    let now = new Date().getTime()
    stopTimer(now)

    this.public = environment.public
    this.environment = environment
    console.log('app environment', environment)

    // observe keyboard
    Observable.fromEvent(window, 'keydown').subscribe((event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.keyCode === 27) {
        // cmd + escape
        this.public = !this.public
        event.preventDefault()
      } 
    })

    // detect longpress or click to get past private screen
    this.detect()
  }

  // detect longpress
  detect() {

    const upObservable = Observable.merge(
        Observable.fromEvent(document, 'mouseup'),
        Observable.fromEvent(document, 'touchend')
    )
    const downObservable = Observable.merge(
        Observable.fromEvent(document, 'mousedown'),
        Observable.fromEvent(document, 'touchstart')
    )
    downObservable.delay(3141).takeUntil(upObservable).repeat().subscribe(() => {
      this.public = true
    })
  }  

  deleteImage(userImage: any) {
    this.ui.show('loading', 'deleting image')
    this.backend.deleteImage(userImage).subscribe(result => {
      this.ui.show('success', 'the image has been deleted')
    })
  }
  
}
