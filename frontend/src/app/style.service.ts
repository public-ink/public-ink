import { Injectable } from '@angular/core';

@Injectable()
export class StyleService {

  constructor() { }

  theme = {
    contentWidth: 700,
    prime: 'Raleway',
    article: {
      h1: {
        'fontSize.px': 40,
        'fontWeight': 700,
      },
      paper: {
        'backgroundColor': '#fff'
      }
    }
  }



  s = {
    container: () => {
      let style = {
        'maxWidth.px': this.theme.contentWidth,
        'width.%': 100,
        backgroundColor: this.theme.article.paper.backgroundColor,
      }
      return style
    },
    teaser: {
      copy: () => {
        return {
          'fontSize.px': 22,
          'fontFamily': this.theme.prime,
        }
      }
    },
    article: {
      h1: () => {
        let style = {
          'fontSize.px': this.theme.article.h1['fontSize.px'],
          'fontFamily': this.theme.prime,
          'fontWeight': 'bold',
        }
        return style
      },
      copy: () => {
        return {
          'fontFamily': 'Raleway'
        }
      }
    },
    topBar: {
      editor: () => {
        return {
          'height.px': 50,
          display: 'flex',
          alignItems: 'center',
        }
      },
      home: () => {
        return {
          backgroundColor: '#000',
          color: '#fff',
          'height.px': 50,
          display: 'flex',
          alignItems: 'center',
          textDecoration: 'none',
        }
      }
    }
  }
}
