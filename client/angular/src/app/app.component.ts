import { Component } from '@angular/core'

// Services
import { BackendService } from './backend.service'
import { UIService } from './ui.service'

// Models
import { 
  Author,
  AuthorData,
} from './models'

// Declarations
declare function stopTimer(timestamp: number): void


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private backend: BackendService,
    private ui: UIService,
  ) {
    let now = new Date().getTime()
    stopTimer(now)
  }

  title = 'public.ink'
}
