import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser'

// rx
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/take'

// ink
import { BackendService } from '../backend.service'
import { UIService } from '../ui.service'

interface iUploadObject {
  filename: string
  status: string
  percent: number
  preview: any
}

@Component({
  selector: 'app-file-drop',
  templateUrl: './file-drop.component.html',
})
export class FileDropComponent {

  @ViewChild('fileinput') fileinput: ElementRef

  testSRC: any
  uploads: any[] = []

  /** pass on the click to the native input type file */
  clickFileinput() {
    // todo: prevent default?
    this.fileinput.nativeElement.click()
  }
  /** on classic file(s) selection */
  fileinputChange($event) {

    let files: any[]
    if ($event.dataTransfer) {
      files = $event.dataTransfer.files
    } else {
      files = $event.target.files
    }
    this.ui.message = `uploading ${files.length} images`
    new Observable(stream => {
      for (let file of files) {

        let uploadObject: iUploadObject = {
          filename: file.name,
          status: 'created',
          percent: 0,
          preview: ''
        }
        this.uploads.push(uploadObject)

        // attach a preview callback
        var reader = new FileReader()
        reader.onload = (event: any) => {
          uploadObject.preview = this.sanitizer.bypassSecurityTrustStyle('url(' + event.target.result + ')')
          console.log('preview ready')
        }
        reader.readAsDataURL(file)

        // upload the file, and listen to news
        this.backend.uploadFile(file).delay(1000).subscribe(
          (progress) => {
            console.log('fd progress', progress)
            uploadObject.percent = progress
          }, (error) => {
            console.log('error in upload progress', error)
            uploadObject.status = 'error'
          }, () => {
            console.log('fd complete')
            uploadObject.status = 'uploaded'
            stream.next('uploaded something!')
          })
      }
    }).take(files.length).subscribe(result => {
      console.log('something is done :)')
    }, (error) => {
      console.log('something went wront')
    }, () => {
      console.log('all the things are done!')
      this.ui.flashMessage('all uploads done!')
    })
  }



  onDragOver($event) {
    $event.preventDefault()
    $event.stopPropagation()
  }

  onDrop($event) {
    console.log('dropped')
    $event.preventDefault()
    $event.stopPropagation()
    this.fileinputChange($event)
  }

  constructor(
    private backend: BackendService,
    private ui: UIService,
    private sanitizer: DomSanitizer,
  ) { }


}
