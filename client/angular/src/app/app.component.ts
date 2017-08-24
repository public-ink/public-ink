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
    this.catchGlobalErrors()
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

  /**
   * attempt at catching js errors, not working
   */
  catchGlobalErrors() {

    window.addEventListener("error", function (e) {
      alert("Error occured: " );
      return false;
    })

    window.onerror = function (msg, url, line, col, error) {
      // Note that col & error are new to the HTML 5 spec and may not be 
      // supported in every browser.  It worked for me in Chrome.
      var extra = !col ? '' : '\ncolumn: ' + col
      extra += !error ? '' : '\nerror: ' + error

      // You can view the information in an alert to see things working like this:
      alert("Error: " + msg + "\nurl: " + url + "\nline: " + line + extra)

      // TODO: Report this error via ajax so you can keep track
      //       of what pages have JS issues

      var suppressErrorAlert = false
      // If you return true, then error alerts (like in older versions of 
      // Internet Explorer) will be suppressed.
      return suppressErrorAlert
    };
  }

}
