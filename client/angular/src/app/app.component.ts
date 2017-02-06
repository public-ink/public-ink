import { Component } from '@angular/core'

// Services
import { BackendService } from './backend.service'

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
  ) {
    let now = new Date().getTime()
    stopTimer(now)
  }

  title = 'public.ink'
}
