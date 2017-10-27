// ng
import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute, Params } from '@angular/router'

// ink
import { BackendService, Author, Publication, SavePublicationResponse } from '../backend.service'
import { UIService } from '../ui.service'

@Component({
  selector: 'app-publication-page',
  templateUrl: './publication-page.component.html',
})
export class PublicationPageComponent implements OnInit {

  publication: Publication
  author: Author
  authorID: string

  constructor(
    // ng
    private router: Router,
    private activatedRoute: ActivatedRoute,
    // ink
    public backend: BackendService,
    public ui: UIService,
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.authorID = params['authorID']
      const publicationID = params['publicationID']

      if (publicationID === 'create-publication') {
        // create a new publicaiton object
        this.publication = {
          id: 'create-publication',
          name: '',
          about: '',
          imageURL: '',
          new: true,
          position: 300, // review
        }
      } else if (this.publication && this.publication.id === publicationID) {
        // not reloading because we have this publication (after create)
      } else {
        // load that publication!
        this.backend.loadPublication(this.authorID, publicationID).subscribe((reply: any) => {
          this.publication = reply.data.publication
          this.author = this.publication.author
        })
      }
    })
  }

  create() {
    this.backend.savePublication(this.authorID, this.publication).subscribe((res: SavePublicationResponse) => {
      if (res.data.savePublication.info.success) {
        this.publication = res.data.savePublication.publication
        // change route without re-loading
        // this.router.navigate(['/', this.authorID, this.publication.id])
      }
    })
  }

  save() {
    // save as create without navigation
    this.backend.savePublication(this.author.id, this.publication).subscribe(res => {
      console.log('publication saved publication!')
    })
  }

  delete() {
    // todo: confirm
    alert('deleting!!')
    this.backend.deletePublication(this.author.id, this.publication.id).subscribe(res => {
      console.log('delete publication?', res)
      // hide, mark deleted or whatever.
      if (res.data.deletePublication.success) {
        // remove from account - with animation would be nice
        // this.deleted = true
        console.warn('todo: remove publication from account.')
        this.router.navigate(['/', this.authorID])
      }
    })
  }

}
