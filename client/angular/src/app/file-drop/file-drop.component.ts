import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import { BackendService } from '../backend.service'
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser'

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
    //console.log(this.fileinput.nativeElement)
    this.fileinput.nativeElement.click()
  }
  /** on classic file(s) selection */
  fileinputChange($event) {
    //console.log($event)
    const files = $event.target.files
    //console.log(files)
    for (let file of files) {

      // create an upload object
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
        //uploadObject.preview = event.target.result

        //uploadObject.preview = this.sanitizer.bypassSecurityTrustUrl('url(' + event.target.result + ')'),
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
        })
    }
  }



  onDragOver($event) {
    $event.preventDefault()
    $event.stopPropagation()
  }

  onDrop($event) {
    $event.preventDefault()
    $event.stopPropagation()

    const files = $event.dataTransfer.files
    console.log('dropped!', $event)

    var reader = new FileReader()
    reader.onload = (event: any) => {
      this.testSRC = event.target.result
    }
    reader.readAsDataURL(files[0])

    for (let file of files) {
      this.backend.uploadFile(file).subscribe((res) => {
        console.log('single file upload completed', res)
      })
    }
  }

  constructor(
    private backend: BackendService,
    private sanitizer: DomSanitizer,
  ) { }


}
