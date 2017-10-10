// ng
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core'

// rx
import { Observable } from 'rxjs/Observable'

// ink
import { BackendService } from '../backend.service'

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  @Input('author') author
  @Input('publication') publication
  @Input('article') article

  @ViewChild('title') title: ElementRef

  constructor(
    private backend: BackendService,
  ) {}

  ngOnInit() {
    Observable.fromEvent(this.title.nativeElement, 'keyup').debounceTime(1000).subscribe(event => {
      console.log('title up after 1 sec')
      this.save()
    })
  }

  save() {
    this.backend.saveArticle(this.author.id, this.publication.id, this.article).subscribe(res => {
      console.log('article component saved like a bro', res)
    })
  }

}
