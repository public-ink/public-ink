// ng
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core'
import { DomSanitizer } from '@angular/platform-browser'

// rx
import { Observable } from 'rxjs/Observable'

// ink
import { UIService } from '../ui.service'
import { BackendService } from '../backend.service'

// interfaces
import {Author, Publication} from '../backend.service'

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent implements OnInit {

  @Input('author') author: Author
  @Input('publication') publication: Publication

  @ViewChild('name') name: ElementRef
  @ViewChild('about') about: ElementRef

  constructor(
    // ng
    public sanitizer: DomSanitizer,
    // ink
    public ui: UIService,
    public backend: BackendService,
  ) { }

  ngOnInit() {

    Observable.merge(
      Observable.fromEvent(this.name.nativeElement, 'keyup'),
      Observable.fromEvent(this.about.nativeElement, 'keyup'),
    ).debounceTime(1000).subscribe(() => {
      this.save()
    })
  }

  onDragOver($event) {
    $event.preventDefault()
    $event.stopPropagation()
  }

  onDrop() {
    console.log('publication drop')
    this.publication.imageURL = this.ui.beingDragged.url
    this.save()
  }

  safeBG(url: string) {
    const str = `url(${url}&w=${this.ui.deviceWidth})`
    return this.sanitizer.bypassSecurityTrustStyle(str)
  }

  save() {
    this.backend.savePublication(this.author.id, this.publication).subscribe(res => {
      console.log('publication saved publication!')
    })
  }

}
