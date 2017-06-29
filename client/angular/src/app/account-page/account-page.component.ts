import { Component, OnInit } from '@angular/core'
import { BackendService } from '../backend.service'

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css']
})
export class AccountPageComponent implements OnInit {

  sortable = 'publication'

  

  constructor(
    public backend: BackendService,
  ) { }

  ngOnInit() {
    
  }

  saveAuthorOrder(author) {
    this.backend.saveAuthorOrder(author).subscribe(data => {
      console.log(data)
    })
  }

}
