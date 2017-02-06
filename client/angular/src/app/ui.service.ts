import { Injectable } from '@angular/core'

import { ServerError, ValidationError } from './models'

@Injectable()
export class UIService {

  constructor() { }

  handleError(error: ServerError | ValidationError) {
    console.log(error)
    alert('error: ' + error.status)
  }

}
