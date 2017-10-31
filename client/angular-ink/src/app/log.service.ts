import { Injectable } from '@angular/core'

@Injectable()
export class LogService {

  inlineStyle = 'font-family: monospace; font-weight: bold; -webkit-background-clip: text; color: transparent; background-image: linear-gradient(135deg, #f0944e 0%, #f0505c 100%);'

  constructor() {
    this.info('TestComponent', 'legged it:)', {'jo': 'sup'})
  }

  log(...messages) {
    const msgs = [...messages]
    console.log(msgs)
  }

  error(source, ...messages) {
    console.error(source, ...messages)
  }

  info(source: any, ...messages) {
    console.log('%c hallo ' + source, this.inlineStyle)

    // console.log(message, 'from ' + source)
    console.log('ink info: %cpublic.ink is in da house!', this.inlineStyle)
    console.log('ink lifecycle: %cLogService %cconstructed.', 'color: blue;', 'color: green;');
  }

}
