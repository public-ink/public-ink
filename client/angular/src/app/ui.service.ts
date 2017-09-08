import { Injectable } from '@angular/core'
import { DomSanitizer } from '@angular/platform-browser'
import { Router, NavigationEnd } from '@angular/router'

// RX
import { Observable, Subscribable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import 'rxjs/Rx'

// INK
import { BackendService } from './backend.service'



@Injectable()
export class UIService {

  // style
  // this is actually max content width
  contentWidth: number = 700
  actualContentWidth: number

  stateName: string
  overlay: boolean
  message: string
  loading: boolean
  success: boolean
  error: boolean

  toConfirm: boolean
  confirmStream: any

  // dimensions (initial)
  initialWidth: number
  initialHeight: number
  // dimensions (dynamic)
  deviceWidth: number
  deviceHeight: number

  // bottom bar
  bottomBarVisible = false

  // CONSTANTS
  mainWidth: number = 900

  // loading / backend busy
  backendBusy = false
  backendBusyStream = new BehaviorSubject(false)

  colors = {
    black: '#000',
    white: '#fff',

    lightblue: 'lightblue',
    lightgreen: 'lightgreen',
    lightred: '#c58a68',
    lightyellow: 'lightyellow',
    lightgray: 'lightgray',

    debug: false,
  }


  mediaBar: boolean = false
  mediaClickStream: any
  mediaClickObservable: Subscribable<any>

  clacked = 0
  clacks: HTMLAudioElement[] = []

  recordSize() {
    this.deviceWidth = window.innerWidth
    this.deviceHeight = window.innerHeight

    // actual content width!
    if (this.deviceWidth > 900) {
      this.actualContentWidth = 700 // 900 - twice 100 (max padding)
    } else {
      // the responsive padding is set in content-width.component.html (not ideal, move it to here)
      this.actualContentWidth = Math.round(this.deviceWidth - (this.responsiveValue(20, 100) * 2))
    }
  }

  /*returns the pixel value for a given vh input */
  vh(percent: number) {
    return Math.floor(this.deviceHeight * (percent / 100))
  }
  /** returns the pixel value of a given vw */
  vw(percent: number) {
    return Math.floor(this.deviceWidth * (percent / 100))
  }
  /** returns the initial viewport height in px */
  initialVH(percent: number) {
    return Math.floor(this.initialHeight * (percent / 100))
  }
  /** returns the initial viewport width in px */  
  initialVW(percent: number) {
    return Math.floor(this.initialWidth * (percent / 100))
  }

  constructor(
    private sanitizer: DomSanitizer,
    private router: Router,
    private backend: BackendService,
  ) {
    // device dimensions
    this.initialWidth = window.innerWidth
    this.initialHeight = window.innerHeight

    this.recordSize()
    Observable.fromEvent(window, 'resize').subscribe(() => {
      this.recordSize()
    })

    // clack test
    let audioCount = 10
    let i = 0
    while (i < audioCount) {
      let audio = new Audio('http://www.sounddogs.com/previews/104/mp3/561076_SOUNDDOGS__co.mp3')
      audio = new Audio('https://www.soundjay.com/communication/typewriter-key-1.mp3')
      this.clacks.push(audio)
      i += 1
    }

    // keyboard shortcuts
    Observable.fromEvent(window, 'keydown').subscribe((event: KeyboardEvent) => {

      // console.log(event.keyCode)
      // clack test!
      if (!event.altKey && event.keyCode != 8 && event.keyCode != 91 && event.keyCode != 16) {
        let audioIndex = this.clacked % 10
        let audio = this.clacks[audioIndex]
        // audio.play()
        this.clacked += 1
      }
      

      

      // toggle media bar
      if ((event.metaKey || event.ctrlKey) && event.keyCode === 77) { /*ctrl m */
        if (this.backend.userAccount) {
          this.mediaBar = !this.mediaBar
        }
        // prevents minimizing!
        event.preventDefault() 
      } else if (event.keyCode === 27) { 
        // escape
        if (this.backend.userAccount) {
          // re-use for editor
          this.bottomBarVisible = !this.bottomBarVisible
        }
      }
    })

    /**
     * media click observables
     */
    this.mediaClickObservable = new Observable(stream => {
      this.mediaClickStream = stream
    }).share()
    this.mediaClickObservable.subscribe(image => {
      console.log('media bar image clicked', image)
    })

    /**
     * router events
     */
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0)
      }
    })
  }


  /**
   * Shows a given message for 1 second.
   * @param message: string The wording of the message
   * @param duration: number The duration of the message (defaults to 1 second)
   */
  flashMessage(message: string, duration: number = 1000) {
    this.overlay = true
    this.message = message
    setTimeout(() => { this.message = ''; this.overlay = false }, 1000)
  }

  /**
   * Updates local state variables for the UI to pick up
   */
  show(stateName: string, message?: string, duration?: number) {
    this.resetState()

    this.stateName = stateName
    let state = this.states[stateName]

    this.overlay = state.overlay
    // passed in message, or generic state message
    this.message = message ? message : state.message
    // the state's state
    this.loading = state.loading
    this.success = state.success
    this.error = state.error

    if (duration) {
      setTimeout(() => { this.overlay = false }, duration)
    }
  }

  /**
   * Open a confirm dialog with a given questions
   * @param question 
   */
  confirm(question: string): Observable<any> {
    this.resetState()
    this.toConfirm = true
    this.message = question
    this.overlay = true

    return new Observable(stream => {
      this.confirmStream = stream
    })
  }

  /**
   * Hides the overlay
   */
  hide(): void {
    this.overlay = false
    this.loading = false
    this.resetState()
  }


  /**
   * Set all state variables to false
   * 
   * Rethink this whole state businessness
   */
  resetState() {
    this.loading = this.success = this.error = this.toConfirm = false
  }

  states = {
    loading: {
      message: 'loading',
      loading: true,
      overlay: true
    },
    silent: {
      loading: true,
      overlay: false,
    },
    success: {
      message: 'saved',
      success: true,
      overlay: true,
    },
    error: {
      message: 'something bad just happened',
      error: true,
      overlay: true,
    }
  }

  space = {
    publication: {
      titleThenAbout: {min: 10, max: 20},
    }
  }
  sizes = {
    publication: {
      about: {min: 14, max: 16}
    }
  }



  /**
   * dynamically add elements into head
   * ui.loadTag('link', )
   */
  public loadLink(url) {
    let node = document.createElement('link');
    node.href = url;
    node.rel = 'stylesheet';
    document.getElementsByTagName('head')[0].appendChild(node);
  }

  /**
   * Returns a value adjusted to the viewport width,
   * inside a given range
   */
  responsiveValue(min: number, max: number) {
    let requestedWidth = this.mainWidth
    let availableWidth = this.deviceWidth
    let minimumWidth = 400
    let delta = requestedWidth - minimumWidth
    let into = availableWidth - minimumWidth
    let percent = into / delta
    let boundPercent = Math.min(Math.max(percent, 0), 1)
    let totalBonus = max - min
    let actualBonus = totalBonus * boundPercent
    let actual = min + actualBonus
    return actual
  }

  styles = {
    button: (color = 'white') => {

      if (color === 'white') {
        return {
          display: 'inline-block',
          background: 'white',
          color: '#222',
          padding: '10px 20px',
          border: '1px solid black',
          'font-size.px': this.responsiveValue(16, 17),
        }
      } else {
        return {
          display: 'inline-block',
          background: '#444',
          color: 'white',
          padding: '10px 20px',
          'font-size.px': this.responsiveValue(16, 17),
        }
      }

    },
    input: () => {
      return {
        'font-size.px': this.responsiveValue(18, 20),
        'border': '1px dotted #222',
        'padding.px': 10,
        'width.%': 100,
      }
    },
    textarea: () => {
      return {
        'padding.px': 10,
        'border': '1px dotted #222',
        'font-size.px': this.responsiveValue(18, 20),
      }
    },
    standardText: () => {
      return {
        'font-size.px': this.responsiveValue(18, 20),
      }
    },
    smallerText: () => {
      return {
        'font-size.px': this.responsiveValue(15, 17),
      }
    },
    articleHeadline: () => {
      return {
        'font-size.px': this.responsiveValue(30, 45),
        'margin-top.px': this.responsiveValue(60, 70),
        'margin-bottom.px': 5, 
      }
      
    }
  }


}
