import { Component, OnInit } from '@angular/core'
import { UIService } from '../ui.service'
import { DomSanitizer} from '@angular/platform-browser'

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  dalei = {
    name: 'Dalei Lama',
    about: 'A badass kind of monck. Though I never went to prison like some of my bad ass homies, I still roll pretty damn hard.',
    imageURL: this.sanitizer.bypassSecurityTrustUrl('/assets/images/dalei.jpg'),
  }
  marty = {
    name: 'Marty Mc Hoff',
    about: 'The dude who builds the thing.',
    imageURL: this.sanitizer.bypassSecurityTrustUrl('/assets/images/hoff.jpg'),
  }

  constructor(
    public ui: UIService,
    public sanitizer: DomSanitizer,
  ) { }

  ngOnInit() { 
  }

}
