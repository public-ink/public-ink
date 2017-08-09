import { Component, OnInit } from '@angular/core'
import { DomSanitizer } from '@angular/platform-browser'

// ink
import { BackendService } from '../backend.service'
import { UIService } from '../ui.service'

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css']
})
export class AccountPageComponent implements OnInit {

  sortable = 'publication'

  

  constructor(
    public backend: BackendService,
    public ui: UIService,
    public sanitizer: DomSanitizer,
  ) { }

  ngOnInit() {
    
  }
  
  publicationBG(publication) {
    let str = `url(${publication.imageURL}&w=${this.ui.actualContentWidth})`
    return this.sanitizer.bypassSecurityTrustStyle(str)
  }

  saveAuthorOrder(author) {
    this.ui.show('loading', 'saving order')
    this.backend.saveAuthorOrder(author).subscribe(data => {
      this.ui.show('success', 'order saved', 1000)
    })
  }

}
