import { Component, OnInit, AfterViewInit, OnChanges, Input, ViewChild, ElementRef, SimpleChanges } from '@angular/core'

import { Author } from '../backend.service'
import { AnimationService } from '../animation.service'
import { UIService } from '../ui.service'

/**
 * A component where we try out our own, imperative
 * animation. and it works! :) but requires keeping all the strings
 * together
 */

@Component({
  selector: 'app-author-accordion',
  templateUrl: './author-accordion.component.html',
  styleUrls: ['./author-accordion.component.css']
})
export class AuthorAccordionComponent implements OnInit, OnChanges, AfterViewInit {

  @Input('author') author: Author
  @Input('state') state: string


  @ViewChild('about') aboutEl: ElementRef
  @ViewChild('title') titleEl: ElementRef
  @ViewChild('container') containerEl: ElementRef

  currentState: 'expanded' | 'compact' | 'hidden'

  // animatable heights
  aboutHeight
  titleHeight
  containerHeight
  // animatable opacity
  aboutOpacity = 1


  style = {
    badge: () => {
      return {
        display: 'none',
        padding: '15px',
        border: '2px dotted #eee',
        'border-radius.%': 100,
      }
    },
    name: () => {
      return {
        'font-size.px': this.ui.responsiveValue(30, 40),
        'font-weight': 'bold',
        'outline': 'none',
        'border': 0,
        'text-align': 'left',
        'margin-bottom.px': 50,
      }
    },
    about: () => {
      return {
        'font-size.px': this.ui.responsiveValue(18, 20),
        'font-weight': 'normal',
        'outline': 'none',
        'border': 0,
        'text-align': 'left',
        'width.%': 100,
        'font-family': 'Zilla Slab, serif'
      }
    },
  }

  setAccordionState(state: 'expanded' | 'compact' | 'hidden') {
    const fromState = this.author.accordionState
    const toState = state

    this.transition(fromState, toState)
    // set only when done
    this.author.accordionState = state
  }

  constructor(
    public animation: AnimationService,
    public ui: UIService,
  ) { }

  ngOnInit() {
    this.currentState = this.author.accordionState
    console.log('init', this.author)
  }
  ngAfterViewInit() {
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log('inputs changed!!', changes.state)
    if (changes.state) {
      this.transition(changes.state.previousValue, changes.state.currentValue)
    }
  }

  /**
   * lets transition from expanded to collapsed. That means moving the px height
   * from current scroll height of about to zero. let's have a go at that!
   */
  transition(from, to) {
    console.log('trans', from, to)
    // the height of each element when in full swing
    const aboutScrollHeight = this.aboutEl.nativeElement.scrollHeight
    const titleScrollHeight = this.titleEl.nativeElement.scrollHeight
    const containerScrollHeight = this.containerEl.nativeElement.scrollHeight

    // expanded => compact
    if (from === 'expanded' && to === 'compact') {
      this.animation.animateEasing('easeInOutCubic', 1000).subscribe((decimal: number) => {
        this.aboutHeight = (1 - decimal) * aboutScrollHeight
        this.aboutOpacity = (1 - decimal) * 1
      })
    }
    // compact => expanded
    if (from === 'compact' && to === 'expanded') {
      this.animation.animateEasing('easeInOutCubic', 1000).subscribe((decimal: number) => {
        this.aboutHeight = (decimal) * aboutScrollHeight
        this.aboutOpacity = (decimal) * 1
      })
    }
    // compact => hidden (also hide title)
    if (from === 'compact' && to === 'hidden') {
      this.animation.animateEasing('easeInOutCubic', 1000).subscribe((decimal: number) => {
        this.titleHeight = (1 - decimal) * titleScrollHeight
      })
    }
    // hidden => compact (bring back title)
    if (from === 'hidden' && to === 'compact') {
      this.animation.animateEasing('easeInOutCubic', 1000).subscribe((decimal: number) => {
        this.titleHeight = (decimal) * titleScrollHeight
      })
    }
  }

}
