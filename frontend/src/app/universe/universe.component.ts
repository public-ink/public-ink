import { Component, OnInit } from '@angular/core'

import { StyleService } from '../style.service'
import { BackendService } from '../backend.service'
import { UIService } from '../ui.service'

import { Observable } from 'rxjs/Observable'
import 'rxjs/Rx'

@Component({
  selector: 'app-universe',
  templateUrl: './universe.component.html',
  styleUrls: ['./universe.component.css']
})
export class UniverseComponent implements OnInit {

  constructor(
    private style: StyleService,
    private backend: BackendService,
    private ui: UIService,
  ) { 
    Observable.fromEvent(window, 'keydown').subscribe((event: KeyboardEvent) => {

      console.log(event.keyCode)
      // save article
      if ((event.metaKey || event.ctrlKey) && event.keyCode === 83) { /*ctrl s */
        this.backend.saveCurrentResource()
        event.preventDefault()
      } else if ((event.metaKey || event.ctrlKey) && event.keyCode === 187) { /*ctrl + */
        this.ui.toolbarState.main = this.ui.toolbarState.main === 'create' ? 'root' : 'create'
        event.preventDefault()
      }
      // CMS E (toggle edit toolbar)
      else if ((event.metaKey || event.ctrlKey) && event.keyCode === 69) { /*ctrl E */
        this.ui.toolbarState.main = this.ui.toolbarState.main === 'edit' ? 'root' : 'edit'
        event.preventDefault()
      }
      // escape!
      else if ( event.keyCode === 27) { /* Escape */
        this.ui.toolbarState.main = 'root'
        event.preventDefault()
      }
      // cmd + m (media bar)
      else if ( (event.metaKey || event.ctrlKey) && event.keyCode === 77) { /* Escape */
        this.ui.mediaBar = !this.ui.mediaBar
        event.preventDefault()
      }
    })
  }

  ngOnInit() {
  }

}
