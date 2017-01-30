import { Component, OnInit } from '@angular/core'
import { BackendService } from '../backend.service'

@Component({
  selector: 'app-file-drop',
  template: `
  <div 
    (dragover)="onDragOver($event)"
    (drop)="onDrop($event)"
    style="border: 2px dotted gray; padding: 10px; background-color: white; color:black">
    
    drop files here!
  </div>
  `
})
export class FileDropComponent {

  onDragOver($event) {
    $event.preventDefault()
    $event.stopPropagation()
  }

  onDrop($event) {
    $event.preventDefault()
    $event.stopPropagation()

    const files = $event.dataTransfer.files
    console.log('dropped!', $event)

    for (let file of files) {
      this.backend.uploadFile(file).subscribe(() => {
        console.log('single file upload completed')
      })
    }
  }

  constructor(
    private backend: BackendService,
  ) { }

  
}
