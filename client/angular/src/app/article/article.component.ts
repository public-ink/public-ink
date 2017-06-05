import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core'

// ink
// import { iArticle } from '../models'
import { UIService } from '../ui.service'
import { BackendService } from '../backend.service'

interface iArticle {
  id: string
  title: string
  bodyOps: string
  publishedAt: number
  // parent
  publication: any //iPublication
  new?: boolean
}

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
  ops: any

  space = {
    metaThenBody: 50,
  }
  colors = {
    highlight: 'rgb(255, 251, 242)'
  }

  constructor(
    public ui: UIService,
    public backend: BackendService,
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


    this.ui.mediaClickObservable.subscribe(image => {
      //this.insertImage(image.url + '&w=700')
    })
  }

  /**
   * this fires when either the article is loaded, a user account loaded
   * now we know if we are the owner
   */
  ngOnChanges() {
    if (!this.quill) {
      this.makeQuill()
    }
    this.setQuillContent()
  }

  // make need to wait for authors to be loaded.
  makeQuill() {

    let modules

    // full on toolbar (for non preview)
    if (!this.preview) {
      console.log('full article (not preview)')
      modules = {
        toolbar: {
          container: document.getElementById('toolbar'),
          //handlers: {'image': this.titleImageHandler},
        },
      }
    } else {
      console.log('preview article', this.hidden.nativeElement)
      modules = {
        toolbar: {
          container: this.hidden.nativeElement,
        },
      }
    }

    this.quill = new Quill(this.editor.nativeElement, {
      modules: modules,
      theme: 'snow',
      placeholder: 'here is where you lay your words down...',
    })

    this.quill.on('text-change', (delta, oldDelta, source) => {
      /* 
      keep the article bodyOps property in sync, for saving.
      */
      this.article.bodyOps = JSON.stringify(this.quill.getContents())
      // todo: catch all focus events (even when nothing was typed)
      this.lastRange = this.quill.getSelection()
    })
  }

  setQuillContent() {
    let transformedOps

    this.ops = JSON.parse(this.article.bodyOps)
    let quillData = JSON.parse(this.article.bodyOps)
    let quillOps = quillData.ops
    console.log('original', quillOps)

    /** replace the image backend url in case it is different, because we running on ^a differnt IP or localhost */
    transformedOps = quillOps.map(o => {
      if (o.insert && o.insert.image) {
        let url = o.insert.image
        let host = url.split('/', 3).join('/')
        let newUrl = url.replace(host, this.backendHost)
        return { insert: { image: newUrl } }
      } else {
        return o
      }
    })

    // remove the '---' if the viewer is not the author

    // reduce ops to preview part
    if (this.preview) {
      let previewOps = []
      for (let op of transformedOps) {
        if (typeof op.insert === 'string' && op.insert.indexOf('---') > -1) {
          break
        } else  {
          previewOps.push(op)
        }
      }
      transformedOps = previewOps
    }

    // if not editable: remove ---
    if (!this.editable) {
      console.log('making --- white / invisible - because not editable')
      let cleanedOps = []
      for (let op of transformedOps) {
        if (typeof op.insert === 'string' && op.insert.indexOf('---') > -1) {
          // do not add this ops
          let replacement = {insert: '---', attributes: {color: '#fff'}}
          cleanedOps.push(replacement)
        } else  {
          cleanedOps.push(op)
        }
      }
      transformedOps = cleanedOps
    } else {
      console.log('keeping this as they are, editable with ---')
    }

    console.log('setting content', transformedOps)
    this.quill.setContents({ "ops": transformedOps })

    if (!this.editable) {
      this.quill.disable()
    } else {
      this.quill.enable()
    }
  }

  insertImage(url: string) {
    this.quill.insertEmbed(this.lastRange.index, 'image', url, 'user')
  }

  getPosition(string, subString, index) {
    return string.split(subString, index).join(subString).length;
  }


}
