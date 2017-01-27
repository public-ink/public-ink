import { Injectable } from '@angular/core'
import { Router, NavigationEnd } from '@angular/router'
import { Observable } from 'rxjs/Observable'
//import { ReplaySubject } from 'rxjs';
import 'rxjs/Rx'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'



interface IEvent {
  key: any
}
interface IDevice {
  name: string,
  style: any,
}

@Injectable()
export class UIService {

  // dragged image (or media, set by editor)
  draggedImage: any

  // initial window 
  iWindowWidth: number = window.innerWidth
  iWindowHeight: number = window.innerHeight
  // current window
  windowWidth: number = this.iWindowWidth
  windowHeight: number = this.iWindowWidth

  deviceWidth: number
  deviceHeight: number

  initialWidth: number
  initialHeight: number

  // log state
  logShown: boolean = false
  editor = 'inactive'
  editorState = {
    media: false
  }

  // better states!
  writing: boolean = false
  styling: boolean = false


  devices = {
    browser: {
      name: 'Screen',
      style: {
        'width': '100%',
        'height': '100vh',
        'border-width': '0px',
        'border-style': 'solid',
        'border-color': 'black',
        'overflow': 'scroll',
      }
    },
    pad: {
      name: 'Pad', // wide
      style: {
        'width': '700px',
        'height': '500px',
        'border-width': '20px 40px',
        'border-style': 'solid',
        'border-color': 'black',
        'overflow': 'scroll',
        'border-radius': '10px',
      }
    },
    phone: {
      name: 'Phone',
      style: {
        'width': '400px',
        'height': '600px',
        'border-width': '40px 15px',
        'border-style': 'solid',
        'border-color': 'black',
        'overflow': 'scroll',
        'border-radius': '10px',
      }
    }
  }
  device: IDevice = this.devices.browser
  editorWidth: number = 400

  /**
   * sets the device and updates dimensions
   */
  setDevice(device) {
    this.device = device
    this.recordSize()
  }

  constructor(
    private router: Router,
  ) {
    this.initialWidth = window.innerWidth
    this.initialHeight = window.innerHeight

    this.recordSize()
    Observable.fromEvent(window, 'resize').subscribe(() => {
      this.recordSize()
    })


    /**
     * Keyboard Interactions:
     * - switch device: cmd + 1|2|3
     */
    Observable.fromEvent(window, 'keydown').subscribe((event: KeyboardEvent) => {
      let device
      if ((event.metaKey || event.ctrlKey) && event.code === 'Digit1') { /*ctrl or cmd + 1 */
        device = this.devices.browser
        this.setDevice(device)
        event.preventDefault()
      }
      else if ((event.metaKey || event.ctrlKey) && event.code === 'Digit2') {
        device = this.devices.pad
        this.setDevice(device)
        event.preventDefault()
      } else if ((event.metaKey || event.ctrlKey) && event.code === 'Digit3') {
        device = this.devices.phone
        this.setDevice(device)
        event.preventDefault()
      }

    })

    /**
     * on route change: scroll to top
     */
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log('navigation end!')
        document.getElementById('app').scrollTop = 0
      }
    })

  } // end of construtor


  /**
   * records the current dimensions
   */
  recordSize(): void {

    console.log('REC SIZE!!')

    // set viewport dimensions
    this.deviceWidth = window.innerWidth

    this.windowWidth = window.innerWidth
    this.windowHeight = window.innerHeight


    // set actual content width (we need to know the width of the device!)
    // if !browser: get from style
    // if browser: window for now
    if (this.device === this.devices.browser) {

      this.deviceWidth = this.windowWidth
      this.deviceHeight = this.windowHeight

    } else {
      this.deviceWidth = +this.device.style.width.replace('px', '')
      this.deviceHeight = +this.device.style.height.replace('px', '')
    }
    console.log('ui update, device width:', this.deviceWidth, 'device height:', this.deviceHeight)
  }

  vh(percent: number) {
    return Math.floor(this.deviceHeight * (percent / 100))
  }
  vw(percent: number) {
    return Math.floor(this.deviceWidth * (percent / 100))
  }

  strip(string: string) {
    return + string.replace('px', '')
  }

  heroImageStyle(url: string, width: number, height: number, gray?: number) {
    let style = {
      'background-image':
      `url(${url}&w=${width}`, //&h=${height}&fit=fill)
      'background-position': 'center center',
      'background-size': 'cover',
      'filter': `grayscale(${gray}%)`
    }
    return style
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

}
