import { Component, OnInit } from '@angular/core'
import { BackendService } from '../backend.service'
import { StyleService } from '../style.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  publications: any = []

  heroStyle() {
    return {
      backgroundImage: `url("${this.bgImg}")`
    }
  }

  bgImg = 'https://images.unsplash.com/photo-1480321182142-e77f14b9aa64?dpr=2&auto=format&fit=crop&w=767&h=511&q=80&cs=tinysrgb&crop='

  constructor(
    private backend: BackendService,
    private style: StyleService,
    ) {
    this.backend.getPublications().subscribe(
      (publications) => { // todo: use interface
      this.publications = publications
    }, 
    (error) => {
      console.log('caught get publications network error')
    }
    
    )
   }

  ngOnInit() {
  }

}
