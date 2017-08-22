import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core'

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

  @Output() saveClicked: EventEmitter<any> = new EventEmitter()

  @ViewChild('titleArea') titleArea: ElementRef;
  @ViewChild('editor') editor: ElementRef
  @ViewChild('hidden') hidden: ElementRef

  // whether or not there is a below-the-fold
  hasBreak = false

  quill: any
  lastRange: any
  ops: any

  space = {
    metaThenBody: 50,
  }
  colors = {
    highlight: 'hsl(0, 0%, 100%)'
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
          container: this.hidden.nativeElement,          
          // container: document.getElementById('toolbar'),
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
      placeholder: 'Your story goes here...',
    })

    let win:any = window
    win.q = this.quill

    this.quill.on('text-change', (delta, oldDelta, source) => {
      /* 
      keep the article bodyOps property in sync, for saving.
      */
      if (this.editable) {
        // keep local article's bodyOps in sync for later saving
        this.article.bodyOps = JSON.stringify(this.quill.getContents())
        // todo: catch all focus events (even when nothing was typed)
        this.lastRange = this.quill.getSelection()
      }
    })
  }

  setQuillContent() {
    let transformedOps

    this.ops = JSON.parse(this.article.bodyOps)
    let quillData = JSON.parse(this.article.bodyOps)
    let quillOps = quillData.ops
    // in case of new article
    if (!quillOps) { return }
    console.log('original', quillOps)

    /** replace the image backend url in case it is different, because we running on a differnt IP or localhost */
    transformedOps = quillOps.map(o => {
      if (o.insert && o.insert.image) {
        let url = o.insert.image
        let host = url.split('/', 3).join('/')
        let newUrl = url.replace(host, this.backendHost) + '&jo=sup'

        let responsiveURL = this.updateQueryStringParameter(newUrl, 'w', this.ui.actualContentWidth)

        return { insert: { image: responsiveURL } }
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
          this.hasBreak = true
          break
        } else {
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
          let replacement = { insert: '---', attributes: { color: '#fff' } }
          cleanedOps.push(replacement)
        } else {
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

  /**
   * Toolbar action
   */

  toggleInline(format: string) {
    if (this.quill.getFormat()[format]) {
      this.quill.format(format, false)
    } else {
      this.quill.format(format, true)
    }
  }
  h3() {
    this.quill.format('header', 2)
  }
  link() {
    var url = prompt("gimme url")
    this.quill.format('link', url)
  }


  /**
   * Update a query string paramter in a given URL
   * 
   * @param uri the url to manipulate
   * @param key the key in question
   * @param value the new value for the above key
   */

  updateQueryStringParameter(uri, key, value) {
    var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    var separator = uri.indexOf('?') !== -1 ? "&" : "?";
    if (uri.match(re)) {
      return uri.replace(re, '$1' + key + "=" + value + '$2');
    }
    else {
      return uri + separator + key + "=" + value;
    }
  }

}
