// ng
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core'

// rx
import { Observable } from 'rxjs/Observable'

// ink
import { BackendService } from '../backend.service'
import { UIService } from '../ui.service'


@Component({
  selector: 'app-author',
  template: `
  <app-content-width>
  <flex-col-center style="padding: 100px;">
      <img
      style="width: 150px; height: 150px; border-radiums: 100%;"
      [src]="author.imageURL" (dragover)="onDragOver($event)" (drop)="onDrop($event)"/>

      <input #name type="text" [(ngModel)]="author.name">
      <textarea #about>{{ author.about }}</textarea>
      <div>a lot of articles in {{ author.publications.length }} publications </div>
      <br><br>
      <span (click)="author.state = author.state === 'collapsed' ? 'expanded' : 'collapsed'">expand / collapse author</span>
    </flex-col-center>
  </app-content-width>
  `,
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {

  @Input('author') author

  @ViewChild('name') name: ElementRef
  @ViewChild('about') about: ElementRef

  constructor(
    public backend: BackendService,
    public ui: UIService,
  ) { }

  ngOnInit() {
    if (!this.author) {
      this.author = {
        name: '',
        about: '',
        publications: []
      }
    }

    Observable.merge(
      Observable.fromEvent(this.name.nativeElement, 'keyup'),
      Observable.fromEvent(this.about.nativeElement, 'keyup'),
    ).debounceTime(1000).subscribe(() => {
      this.save()
    })

  }

  /**
   * creates the author
   *
   *
   */
  create() {
    
  }

  /**
   * Updates the author
   */
  update() {

  }

  /**
   * Deletes the author
   */
  delete() {

  }

  save() {
    console.log('save!')
  }


  /** dropping images in the authors picture */
  onDragOver($event) {
    $event.preventDefault()
    $event.stopPropagation()
  }

  onDrop($event) {
    this.author.imageURL = this.ui.beingDragged.url
    $event.preventDefault()
    $event.stopPropagation()
  }


}
