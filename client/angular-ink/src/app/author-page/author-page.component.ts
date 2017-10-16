// ng
import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute, Params } from '@angular/router'

// ink
import { BackendService, Author } from '../backend.service'

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
    private backend: BackendService,
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      const authorID = params['authorID']
      if (authorID === 'create-author') {
        // create a new author object
        this.author = {
          id: 'create-author',
          name: '',
          about: '',
          imageURL: '',
        }
      } else if (this.author && this.author.id === authorID) {
        // not reloading because we have this author (after create)
      } else {
        // load that author!
        this.backend.loadAuthor(authorID).subscribe((reply: any) => {
          this.author = reply.data.author
        })
      }
    });
  }

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
