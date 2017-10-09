import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  data = {
    authors: [
      {
        name: 'Hoff',
        about: 'thinker & tinkerer',
        publications: [
          {
            name: 'living on universal basic income',
            img: 'none yet',
            articles: [
              {
                title: 'the idea',
                prefold: 'you know what this is all about when u see it',
                postfold: 'more is here after the break'
              },
              {
                title: 'the experiemnt',
                prefold: 'you know what this is all about when u see it',
                postfold: 'more is here after the break'
              }
            ]
          },
          {
            name: 'on design',
            img: 'none yet',
            articles: [
              {
                title: 'dropbox',
                prefold: 'you know what this is all about when u see it',
                postfold: 'more is here after the break'
              },
              {
                title: 'design at public ink',
                prefold: 'you know what this is all about when u see it',
                postfold: 'more is here after the break'
              }
            ]
          }
        ]
      },
      {
        name: 'Epikted',
        about: 'slave then philosopher',
        publications: [
          {
            name: 'Handbüchlein der Moral',
            img: 'none yet',
            articles: [
              {
                title: 'gegenkräfte',
                prefold: 'you know what this is all about when u see it',
                postfold: 'more is here after the break'
              },
              {
                title: 'why not to have sex',
                prefold: 'you know what this is all about when u see it',
                postfold: 'more is here after the break'
              }
            ]
          },
          {
            name: 'discourses',
            img: 'none yet',
            articles: [
              {
                title: 'dropbox',
                prefold: 'you know what this is all about when u see it',
                postfold: 'more is here after the break'
              },
              {
                title: 'design at public ink',
                prefold: 'you know what this is all about when u see it',
                postfold: 'more is here after the break'
              }
            ]
          }
        ]
      }
    ]
  }

  styles = {
    logo: () => {
      return {
        'font-size.px': 30,
      }
    },
    input: (bg = 'white') => {
      return {
        'font-size.px': 30,
        'background-color': bg,
        'border-width': '0 0 2px 0',
        'outline': 'none',
        'width.px': 400
      }
    },
    button: (bg = 'white') => {
      return {
        'font-size.px': 30,
        'background-color': bg,
        'border-width': '0 0 0 0',
        'border-left': '0px solid',
        'border-bottom': '1px solid black',
        'padding-left': '50px',
        'padding-right': '50px',
      }
    },
    buttonPadding: 10
  }
}
