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
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      const authorID = params['authorID']
      if (authorID === 'create-author') {
        // guard against unauthenticated
        if (!this.backend.account) {
          console.warn('cannot navigate to create-author: not authenticated')
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
      } else if (this.author && this.author.id === authorID) {
        // not reloading because we have this author (after create)
      } else {
        // load that author! (can skip the JSON stuff?) yep.
        this.backend.loadAuthor(authorID).subscribe((reply: any) => {
          this.author = reply.data.author
        })
      }
    });
  }

  /**
   * creates a new author, and navigates, again to this component
   * in that case, our router subscription won't do anything (not create a new object, nor load from backend again)
   */
  createAuthor() {
    this.backend.saveAuthor(this.author).subscribe(result => {
      this.author = result.data.saveAuthor.author
      this.router.navigate(['/', this.author.id])
    })
  }

  /**
   * same as create, just without the navigation
   */
  updateAuthor() {
    this.backend.saveAuthor(this.author).subscribe(result => {
      this.author = result.data.saveAuthor.author
    })
  }

  deleteAuthor() {
    console.log('delete author', this.author)
    this.backend.deleteAuthor(this.author.id).subscribe(result => {
      console.log('author page delete author', result)
      // remove from account!
      if (result.data.deleteAuthor.success) {
        console.log('deleted! neet to navigate somewhere:)')
        this.backend.account.authors  = this.backend.account.authors.filter(author => author.id !== this.author.id)
        this.router.navigate(['/'])
      }
    })
  }

}
