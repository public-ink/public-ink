import { Component, OnInit } from '@angular/core'
import { BackendService } from '../backend.service'

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css']
})
export class AccountPageComponent implements OnInit {

  constructor(
    public backend: BackendService,
  ) { }

  ngOnInit() {
    // force reload of data
    this.backend.jwtLogin().subscribe()
  }

}
