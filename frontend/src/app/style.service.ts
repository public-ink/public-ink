import { Injectable } from '@angular/core';

@Injectable()
export class StyleService {

  constructor() { }

  theme = {
    colors: {
      'save': 'darkred',
      'publish': 'green',
      'trans': 'rgba(0,0,0,0)',
      'white': 'white',
      'yellow': '#e7d87a',
      'green': '#b9bf5b',
      'blue': '#408796',
      'darkblue': '#274260',
      'black': '#310000',

    },
    contentWidth: 700,
    prime: 'Raleway',
    article: {
      h1: {
        'fontSize.px': 40,
        'fontWeight': 700,
        'marginTop.px': 40,
      },
      body: {
        backgroundColor: 'lime'
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
        'margin': '0px auto',
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
          'marginTop.px': 40,
          'fontFamily': this.theme.prime,
          'fontWeight': 'bold',
          'width.%': 100,
          'outline': 0,
          'border': 0,
        }
        return style
      },
      copy: () => {
        return {
          'fontFamily': 'Raleway',
          //backgroundColor: 'lime',
          'marginTop.px': 40,
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
          justifyContent: 'center',
          textDecoration: 'none',
          'width.px': 50,
        }
      },
      navPlus: () => {
        return {
          backgroundColor: '#000',
          color: '#ccc',
          borderTop: '1px dashed gray',
          'height.px': 41,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textDecoration: 'none',
          'width.px': 50,
          'fontSize.px': 11,
        }
      },

      saveButton: () => {
        let button = this.s.topBar.button('blue')
        let save = {
          backgroundColor: 'navy',
          color: 'white',
        }
        let saveButton = Object.assign(save, button)
        return saveButton
      },
      button: (color: string) => {
        let bg = this.theme.colors[color]
        return {
          'backgroundColor': bg,
          //'color': 'white',
          'padding': '0px 10px',
        }
      }
    }
  }
}
