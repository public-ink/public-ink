// ng
import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute, Params } from '@angular/router'

// ink
import { BackendService, Author } from '../backend.service'
import { UIService } from '../ui.service'

@Component({
  selector: 'app-author-page',
  templateUrl: './author-page.component.html',
})
export class AuthorPageComponent implements OnInit {

  author: Author

  constructor(
    // ng
    private router: Router,
    private activatedRoute: ActivatedRoute,
    // ink
    public backend: BackendService,
    public ui: UIService,
  ) {
    console.log('AUTHOR PAGE CONSTRUCTED!')
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      const authorID = params['authorID']
      if (authorID === 'create-author') {
        // guard against unauthenticated
        if (!this.backend.account) {
          console.warn('cannot navigate to create-author: not authenticated')
          // this needs to be more friendly. or just disabled explaining why.
          this.router.navigate(['/'])
        }
        // create a new author object
        this.author = {
          id: 'create-author',
          name: '',
          about: '',
          imageURL: '',
          new: true,
        }
        // hide top authors (not ideals here?)
        if (this.backend.account) { this.backend.account.accordionState = 'compact' }
      } else if (this.author && this.author.id === authorID) {
        // not reloading because we have this author (after create)
      } else {
        // load that author! (can skip the JSON stuff?) yep.
        if (this.backend.account) { this.backend.account.accordionState = 'compact'}

        this.backend.loadAuthor(authorID).subscribe((reply: any) => {
          window.scrollTo(0, 0)
          this.author = reply.data.author
        })
      }
    });
  }



}
