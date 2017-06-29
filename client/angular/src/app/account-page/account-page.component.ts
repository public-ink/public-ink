import { Component, OnInit } from '@angular/core'
import { BackendService } from '../backend.service'

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css']
})
export class AccountPageComponent implements OnInit {

  sortable = 'publication'

  dragOperation: boolean = false;

    containers: Array<Container> = [
        new Container(1, 'Container 1', [new Widget('1'), new Widget('2')]),
        new Container(2, 'Container 2', [new Widget('3'), new Widget('4')]),
        new Container(3, 'Container 3', [new Widget('5'), new Widget('6')])
    ];

  constructor(
    public backend: BackendService,
  ) { }

  ngOnInit() {
    
  }

}


class Container {
  constructor(public id: number, public name: string, public widgets: Array<Widget>) {}
}

class Widget {
  constructor(public name: string) {}
}