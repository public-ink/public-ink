import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core'

// rx
import { Observable } from 'rxjs/Observable'

// ink
// import { iArticle } from '../models'
import { UIService } from '../ui.service'
import { BackendService, SaveArticleResponse } from '../backend.service'

import * as Quill from 'quill'


// environment
import { environment } from '../../environments/environment'



@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  backendHost: string = environment.backendHost

  @Input() article: any
  @Input() editable: boolean = false
  @Input() preview: boolean = false

  @ViewChild('titleArea') titleArea: ElementRef;
  @ViewChild('editor') editor: ElementRef
  @ViewChild('hidden') hidden: ElementRef

  // whether or not there is a below-the-fold
  hasBreak = false

  quill: any
  lastRange: any
  ops: any

  savedArticleJSON: string

  space = {
    metaThenBody: 50,
  }
  colors = {
    highlight: 'hsl(0, 0%, 100%)'
  }

  constructor(
    public ui: UIService,
    public backend: BackendService,
  ) {

    
    // unfocus after 10 secs
    Observable.fromEvent(window, 'keydown').debounceTime(10000).subscribe(event => {
      // this.quill.blur()
    })

  }

  titleHasFocus() {
    if (!this.titleArea) {
      return false
    } else {
      return this.titleArea.nativeElement === document.activeElement
    }
  }

  ngOnInit() {

    this.autoSaveTimer()

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

  /** auto-save articles! */
  autoSaveTimer() {
    Observable.fromEvent(this.editor.nativeElement, 'keydown').debounceTime(3000).subscribe(event => {
      console.log('autosave')
      if (this.canAutoSave()) {
        this.saveArticle(true)
      }
    })

  }

  /**
   * Determines if there are changes that can be auto saved.
   */
  canAutoSave() {
    return this.article && this.isOwner() && this.savedArticleJSON != JSON.stringify(this.article) && this.article.id != 'create-article'
  }
  isOwner() {
    if (!this.article) {return false}
    return this.backend.isOwner(this.article.publication.author.id)
  }

  /**
   * Creates a new article, or updates an exisiting one
   */
  saveArticle(silent = false): void {
    console.log('wanna save', this.article)
    if (silent) {
      this.ui.show('silent', 'saving article...')
    } else {
      this.ui.show('loading', 'saving article...')
    }
    this.backend.saveArticle(
      this.article.publication.author.id,
      this.article.publication.id,
      this.article.id, this.article).subscribe((reply: SaveArticleResponse) => {

        if (reply.data.saveArticle.info.success) {
          // update saved version for autosave
          this.savedArticleJSON = JSON.stringify(this.article)
          if (!silent) {
            this.ui.show('success', 'done!', 1000)
          } else {
            this.ui.loading = false
            this.ui.overlay = false
          }
          /* not sure why this check is required here but not on publication page */
          if (this.article.id === 'create-article') {
            // this is rediculous.
            // no more need to navigate - what to do instead?
          }
        } else {
          this.ui.show('error', reply.data.saveArticle.info.message)
        }
      }, error => {
        this.ui.show('error', 'backend error!')
      })
  }

  // make need to wait for authors to be loaded.
  makeQuill() {

    const modules = {
      toolbar: {
        container: this.hidden.nativeElement,
      },
    }

    this.quill = new Quill(this.editor.nativeElement, {
      modules: modules,
      theme: 'snow',
      placeholder: 'Your story goes here...',
    })

    // for debugging quill
    // let win: any = window
    // win.q = this.quill

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

    // if not editable: make --- white
    if (!this.editable) {
      let cleanedOps = []
      for (let op of transformedOps) {
        if (typeof op.insert === 'string' && op.insert.indexOf('---') > -1) {
          let replacement = { insert: '---', attributes: { color: '#fff' } }
          cleanedOps.push(replacement)
        } else {
          cleanedOps.push(op)
        }
      }
      transformedOps = cleanedOps
    } else {
      // console.log('keeping this as they are, editable with ---')
    }

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
