import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core'

// ink
import { iArticle } from '../models'
import { UIService } from '../ui.service'

// environment
import { environment } from '../../environments/environment'



@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  backendHost: string = environment.backendHost

  @Input() article: iArticle
  @Input() editable: boolean = false
  @Input() preview: boolean = false

  @ViewChild('titleArea') titleArea: ElementRef;
  @ViewChild('editor') editor: ElementRef
  @ViewChild('hidden') hidden: ElementRef

  quill: any
  lastRange: any

  space = {
    metaThenBody: 50,
  }
  colors = {
    highlight: 'rgb(255, 251, 242)'
  }

  constructor(
    private ui: UIService,
  ) { }

  titleHasFocus() {
    if (!this.titleArea) {
      return false
    } else {
      return this.titleArea.nativeElement === document.activeElement
    }
  }

  ngOnInit() {
    /* check your input */
    if (!this.article.publication || !this.article.publication.author) {
      alert('inputs fucked')
    }

    this.makeQuill()
    this.ui.mediaClickObservable.subscribe(image => {
      //this.insertImage(image.url + '&w=700')
    })
  }

  makeQuill() {

    let modules
    if (this.editable) {
      console.log('editbale article!')
      modules = {
        toolbar: {
          container: document.getElementById('toolbar'),
          //handlers: {'image': this.titleImageHandler},
        },
      }
    } else {
      console.log('making quill with hidden toolbar', this.hidden.nativeElement)
      modules = {
        toolbar: {
          container: this.hidden.nativeElement,
          //handlers: {'image': this.titleImageHandler},
        },
      }
    }

    this.quill = new Quill(this.editor.nativeElement, {
      modules: modules,
      theme: 'snow',
      placeholder: 'here is where you lay your words down...',
    })

    let ops
    let transformedOps
    try {
      ops = JSON.parse(this.article.bodyOps)
      let quillData = JSON.parse(this.article.bodyOps)
      let quillOps = quillData.ops
      console.log('original', quillOps)

      /** replace the image backend url in case it is different, because we running on a differnt IP or localhost */
      transformedOps = quillOps.map(o => {  
        //console.log(o)
        if (o.insert && o.insert.image) {
          console.log(o.insert.image)
          let url = o.insert.image
          let host = url.split('/', 3).join('/')
          let newUrl = url.replace(host, this.backendHost)
          //return {insert: {image: o.insert.image.replace('http://localhost:8080', 'http://192.168.0.103:8080')}}
          return {insert: {image: newUrl}}
        } else {
          return o
        }
      })
      console.log('transformed', transformedOps)
      if (this.preview) {
        let OpsObs = ops.ops.slice(0, 5)
        ops.ops = OpsObs
      }
    } catch (e) {
      console.log('error parsing json, this is the offender:', this.article.bodyOps)
      ops = { "ops": [{ "insert": "error parsing json\n" }] }
    }
    console.log('setting contents!', transformedOps)
    this.quill.setContents({ "ops": transformedOps })
    if (!this.editable) {
      this.quill.disable()
    }

    this.quill.on('text-change', (delta, oldDelta, source) => {
      /* 
      keep the article bodyOps property in sync, for saving.
      */
      this.article.bodyOps = JSON.stringify(this.quill.getContents())
      this.lastRange = this.quill.getSelection()
    })
  }

  insertImage(url: string) {
    this.quill.insertEmbed(this.lastRange.index, 'image', url, 'user')
  }

  getPosition(string, subString, index) {
    return string.split(subString, index).join(subString).length;
  }


}
