import { Injectable } from '@angular/core'

// RX
import { Observable } from 'rxjs/Observable'
import 'rxjs/Rx'

@Injectable()
export class UIService {

  contentWidth = 700
  actualContentWidth: number
  mainWidth = 900 // max width (content plus padding)
  minContentPadding = 20
  maxContentPadding = 100

  // dimensions (initial)
  initialWidth: number
  initialHeight: number
  // dimensions (dynamic)
  deviceWidth: number
  deviceHeight: number

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

  constructor() {
    this.recordSize()
    Observable.fromEvent(window, 'resize').subscribe(() => {
      this.recordSize()
    })
  }

}
