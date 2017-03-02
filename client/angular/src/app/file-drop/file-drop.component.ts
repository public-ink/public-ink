import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import { BackendService } from '../backend.service'

@Component({
  selector: 'app-file-drop',
  template: `
  <div 
    (dragover)="onDragOver($event)"
    (drop)="onDrop($event)"
    (click)="clickFileinput()"
    style="width: 100%; height: 100%; border: 2px dotted gray; padding: 10px; background-color: white; color:black">
    
    drop files or click

   
    <input style="width:0; height:0;" (change)="fileinputChange($event)" type="file" multiple="multiple" name="fileinput"  id="fileinput" #fileinput />
  </div>
  <div>
  <div *ngFor="let upload of uploads">
    {{ upload.filename }}
    {{ upload.status }}
    {{ upload.percent }}
    <img [src]="upload.preview" style="width: 200px;"/>
  </div>

  </div>
  `
})
export class FileDropComponent {

  @ViewChild('fileinput') fileinput: ElementRef

  testSRC: any
  uploads: any[] = []

  /** pass on the click to the native input type file */
  clickFileinput() {
    console.log(this.fileinput.nativeElement)
    this.fileinput.nativeElement.click()
  }
  /** on classic file(s) selection */
  fileinputChange($event) {
    console.log($event)
    const files = $event.target.files
    console.log(files)
     for (let file of files) {

      // create an upload object
      let uploadObject = {
        filename: file.name,
        status: 'created',
        percent: 0,
        preview: false,
      }

      this.uploads.push(uploadObject)

      // attach a preview callback
      var reader = new FileReader()
      reader.onload =  (event:any) => {
          uploadObject.preview = event.target.result
      }
      reader.readAsDataURL(file)

      // upload the file, and listen to news (we're mssing progress)
      this.backend.uploadFile(file).subscribe(
        (progress) => {
          console.log('fd progress', progress)
          uploadObject.percent = progress
      }, (error) =>{
        console.log('error in upload progress', error)
         uploadObject.status = 'error'
      }, ()=> {
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
    reader.onload =  (event:any) => {
        this.testSRC = event.target.result
    }
    reader.readAsDataURL(files[0]);

    for (let file of files) {
      this.backend.uploadFile(file).subscribe((res) => {
        console.log('single file upload completed', res)
      })
    }
  }

  constructor(
    private backend: BackendService,
  ) { }

  
}
