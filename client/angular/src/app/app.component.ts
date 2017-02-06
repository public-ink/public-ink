import { Component } from '@angular/core'

// Services
import { BackendService } from './backend.service'

// Models
import { 
  Author,
  AuthorData,
} from './models'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private author

  constructor(
    private backend: BackendService,
  ) {
    this.backend.getResourceByUrl('http://localhost:8080/author/bukovski').subscribe((authorData: AuthorData) => {
      this.author = new Author(authorData)
    })
  }

  title = 'public.ink'
}
