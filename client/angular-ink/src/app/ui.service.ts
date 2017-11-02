// angular
import { Injectable } from '@angular/core'
import { DomSanitizer } from '@angular/platform-browser'

// rx
import 'rxjs/Rx'
import { Observable } from 'rxjs/Observable'
import { Subject    } from 'rxjs/Subject'

// ink (reconsider indicator)
export enum Indicator {
  loading,
  success,
  error,
}

declare function jwt_decode(jwt: string)

import { BackendService } from './backend.service'

@Injectable()
export class UIService {

  contentWidth = 600
  actualContentWidth: number
  mainWidth = 800 // max width (content plus padding)
  minContentPadding = 20
  maxContentPadding = 100

  // dimensions (initial)
  initialWidth: number
  initialHeight: number
  // dimensions (dynamic)
  deviceWidth: number
  deviceHeight: number

  topspinnerShown = false

  overlayShown = 'no'
  overlayInidcator
  overlayMessage: string

  // debug
  debugBarShown = 'no'

  confirmShown = true
  confirmStream = new Subject()

  mediaBar = false
  // because animations are string based currently
  mediaBarVisible = 'no'

  beingDragged

  // confirm
  confirmQuestion: string




  // styles
  styles = {
    standardText: () => {
      return {
        'font-size.px': this.responsiveValue(14, 20)
      }
    },
    button: (multiplier = 1) => {
      const minFontSize = 20 * multiplier
      const maxFontSize = 20 * multiplier
      const minPaddingV = 15 * multiplier
      const maxPaddingV = 20 * multiplier
      const minPaddingH = 40 * multiplier
      const maxPaddingH = 40 * multiplier

      return {
        'font-size.px': this.responsiveValue(minFontSize, maxFontSize),
        'padding-top.px': this.responsiveValue(minPaddingV, maxPaddingV),
        'padding-bottom.px': this.responsiveValue(minPaddingV, maxPaddingV),
        'padding-left.px': this.responsiveValue(minPaddingH, maxPaddingH),
        'padding-right.px': this.responsiveValue(minPaddingH, maxPaddingH),
        'background': '#333',
        'color': 'white',
        'border': '1px solid black',
      }
    },
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

  recordSize() {
    this.deviceWidth = window.innerWidth
    this.deviceHeight = window.innerHeight

    // actual content width!
    if (this.deviceWidth > 900) {
      this.actualContentWidth = 700 // 900 - twice 100 (max padding)
    } else {
      // the responsive padding is set in content-width.component.html (not ideal, move it to here)
      this.actualContentWidth = Math.round(this.deviceWidth - (this.responsiveValue(this.minContentPadding, this.maxContentPadding) * 2))
    }
  }

  /**
   * Returns a value adjusted to the viewport width,
   * inside a given range
   */
  responsiveValue(min: number, max: number) {
    const requestedWidth = this.mainWidth // 900
    const availableWidth = this.deviceWidth
    const minimumWidth = 400
    const delta = requestedWidth - minimumWidth
    const into = availableWidth - minimumWidth
    const percent = into / delta
    const boundPercent = Math.min(Math.max(percent, 0), 1)
    const totalBonus = max - min
    const actualBonus = totalBonus * boundPercent
    const actual = min + actualBonus
    return actual
  }

  constructor(
    private backend: BackendService,
    private sanitizer: DomSanitizer,
  ) {
    this.recordSize()
    Observable.fromEvent(window, 'resize').subscribe(() => {
      this.recordSize()
    })
    // this.confirmStream

    // keyboard shortcuts
    Observable.fromEvent(window, 'keydown').subscribe((event: KeyboardEvent) => {
      // console.log(event.keyCode)
      // CMS + M  => toggle media bar
      if ((event.metaKey || event.ctrlKey) && event.keyCode === 77) {
        if (this.backend.account) {
          this.mediaBar = !this.mediaBar
          this.mediaBarVisible = this.mediaBarVisible === 'no' ? 'yes' : 'no'
        }
        // prevents minimizing!
        event.preventDefault()

      // ESCAPE => toggle top bar
      } else if (event.keyCode === 27) {
        if (!this.backend.account) {return}
        this.backend.account.accordionState = this.backend.account.accordionState === 'compact' ? 'expanded' : 'compact'
      } else if ((event.metaKey || event.ctrlKey) && event.keyCode === 68) {
        this.debugBarShown = this.debugBarShown === 'yes' ? 'no' : 'yes'
        event.preventDefault()
      }
    })
  }


  /**
   * show fullscreen (todo)
   */
  overlay(indicator: 'success' | 'error' | 'loading' | 'confirm', message?: string, ms?: number) {
    this.overlayInidcator = indicator
    this.overlayMessage = message
    this.overlayShown = 'yes'

    console.log('set overlayshow to yes', this.overlayShown)

    // time
    if (ms) {
      setTimeout(() => {
        this.overlayShown = 'no'
        console.log('timout kill')
      }, ms)
    }
  }

  safeHTML(html: string) {
    return this.sanitizer.bypassSecurityTrustHtml(html)
  }

  decodeJWT(jwt: string) {
    if (!jwt_decode) {return}
    try {
      const result = jwt_decode(jwt)
      // console.log(result.authors)
      return result
    } catch (error) {
      console.log('error decoding jwt', jwt, error)
    } finally {
      // pass
    }
  }

}
