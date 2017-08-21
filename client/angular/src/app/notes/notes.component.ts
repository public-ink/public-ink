import { Component, OnInit, ElementRef } from '@angular/core'

import { MIDIService } from '../midi.service'

class Note {

}

class Key {
  color: string
  background: string  

  constructor(
    public number: number,
    public name: string,
  ) {
    if (name.length === 1) {
      this.color = 'white'
      this.background = '#aaa'
    } else {
      this.color = 'black'
      this.background = '#666'
    }
  }
}

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  constructor(
    public midi: MIDIService,
    public el: ElementRef
  ) { 
    this.setup()
  }

  ngOnInit() {
    console.log(this.el.nativeElement.offsetLeft)
  }

  output() {
    console.log(JSON.stringify(this.nextdata))
  }

  notes = ['A', 'Bb', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#']

  nextChar(c) {
    return String.fromCharCode(c.charCodeAt(0) + 1)
  }

  incrementFinger(note) {
    if (!note.finger) {
      note.finger = 1
    } else {
      note.finger = (note.finger += 1) % 5
    }
  }

  /** midi notes keyboard setup */
  keys: Key[] = []

  /**
   * creates midi keys from low A to high something
   */
  setup() {
    let i = 21 // low A
    while(i < 100) {
      let name = this.notes[(i -21) % 12]
      let key = new Key(i, name)
      this.keys.push(key)
      i++
    }
    this.keys.reverse()

  }

  setRightHand(note) {
    note.hand = 1
  }


  nextdata = { "header": { "PPQ": 256, "timeSignature": [2, 4], "bpm": 60, "name": "" }, "startTime": 0, "duration": 146, "tracks": [{ "startTime": 0, "duration": 0, "length": 0, "notes": [], "controlChanges": {}, "id": 0 }, { "startTime": 0, "duration": 146, "length": 1624, "notes": [{ "name": "C4", "midi": 60, "time": 0, "velocity": 0.41732283464566927, "duration": 1, "hand": 1, "finger": 4 }, { "name": "G#3", "midi": 56, "time": 0, "velocity": 0.41732283464566927, "duration": 0.25, "hand": 1, "finger": 2 }, { "name": "G#2", "midi": 44, "time": 0, "velocity": 0.4251968503937008, "duration": 1 }, { "name": "D#3", "midi": 51, "time": 0.25, "velocity": 0.44881889763779526, "duration": 0.25, "hand": 1, "finger": 1 }, { "name": "G#3", "midi": 56, "time": 0.5, "velocity": 0.4881889763779528, "duration": 0.25, "hand": 1, "finger": 2 }, { "name": "D#3", "midi": 51, "time": 0.75, "velocity": 0.4330708661417323, "duration": 0.25, "hand": 1, "finger": 1 }, { "name": "A#3", "midi": 58, "time": 1, "velocity": 0.44881889763779526, "duration": 1, "hand": 1, "finger": 3 }, { "name": "G3", "midi": 55, "time": 1, "velocity": 0.47244094488188976, "duration": 0.25, "hand": 1, "finger": 2 }, { "name": "C#3", "midi": 49, "time": 1, "velocity": 0.48031496062992124, "duration": 1 }, { "name": "D#3", "midi": 51, "time": 1.25, "velocity": 0.47244094488188976, "duration": 0.25, "hand": 1, "finger": 1 }, { "name": "G3", "midi": 55, "time": 1.5, "velocity": 0.5118110236220472, "duration": 0.25, "hand": 1, "finger": 2 }, { "name": "D#3", "midi": 51, "time": 1.75, "velocity": 0.4645669291338583, "duration": 0.25, "hand": 1, "finger": 1 }, { "name": "D#4", "midi": 63, "time": 2, "velocity": 0.5590551181102362, "duration": 1.5, "hand": 1, "finger": 5 }, { "name": "G#3", "midi": 56, "time": 2, "velocity": 0.5039370078740157, "duration": 0.25, "hand": 1, "finger": 2 }, { "name": "C3", "midi": 48, "time": 2, "velocity": 0.48031496062992124, "duration": 1 }, { "name": "D#3", "midi": 51, "time": 2.25, "velocity": 0.4566929133858268, "duration": 0.25, "hand": 1, "finger": 1 }, { "name": "G#3", "midi": 56, "time": 2.5, "velocity": 0.5275590551181102, "duration": 0.25, "hand": 1, "finger": 2 }, { "name": "D#3", "midi": 51, "time": 2.75, "velocity": 0.48031496062992124, "duration": 0.25, "hand": 1, "finger": 1 }, { "name": "A#3", "midi": 58, "time": 3, "velocity": 0.49606299212598426, "duration": 0.25, "hand": 1, "finger": 2 }, { "name": "G2", "midi": 43, "time": 3, "velocity": 0.4566929133858268, "duration": 0.90234375 }, { "name": "D#3", "midi": 51, "time": 3.25, "velocity": 0.4409448818897638, "duration": 0.25, "hand": 1, "finger": 1 }, { "name": "C#4", "midi": 61, "time": 3.5, "velocity": 0.4645669291338583, "duration": 0.40234375, "hand": 1, "finger": 4 }, { "name": "A#3", "midi": 58, "time": 3.5, "velocity": 0.5196850393700787, "duration": 0.19921875, "hand": 1, "finger": 2 }, { "name": "D#3", "midi": 51, "time": 3.75, "velocity": 0.4251968503937008, "duration": 0.25, "hand": 1, "finger": 1 }, { "name": "C4", "midi": 60, "time": 4, "velocity": 0.47244094488188976, "duration": 0.5, "hand": 1, "finger": 3 }, { "name": "G#3", "midi": 56, "time": 4, "velocity": 0.5118110236220472, "duration": 0.25, "hand": 1, "finger": 2 }, { "name": "G#2", "midi": 44, "time": 4, "velocity": 0.5039370078740157, "duration": 0.5 }, { "name": "D#3", "midi": 51, "time": 4.25, "velocity": 0.4409448818897638, "duration": 0.25, "hand": 1, "finger": 1 }, { "name": "D#4", "midi": 63, "time": 4.5, "velocity": 0.5275590551181102, "duration": 0.5, "hand": 1, "finger": 4 }, { "name": "A#3", "midi": 58, "time": 4.5, "velocity": 0.5511811023622047, "duration": 0.25, "hand": 1, "finger": 2 }, { "name": "G2", "midi": 43, "time": 4.5, "velocity": 0.4645669291338583, "duration": 0.5 }, { "name": "D#3", "midi": 51, "time": 4.75, "velocity": 0.4251968503937008, "duration": 0.25, "hand": 1, "finger": 1 }, { "name": "G#4", "midi": 68, "time": 5, "velocity": 0.5590551181102362, "duration": 0.5, "hand": 1, "finger": 5 }, { "name": "C4", "midi": 60, "time": 5, "velocity": 0.5984251968503937, "duration": 0.25, "hand": 1, "finger": 2 }, { "name": "F2", "midi": 41, "time": 5, "velocity": 0.4645669291338583, "duration": 0.5 }, { "name": "G#3", "midi": 56, "time": 5.25, "velocity": 0.48031496062992124, "duration": 0.25, "hand": 1, "finger": 1 }, { "name": "A#4", "midi": 70, "time": 5.5, "velocity": 0.5275590551181102, "duration": 0.40234375, "hand": 1, "finger": 5 }, { "name": "D4", "midi": 62, "time": 5.5, "velocity": 0.5354330708661418, "duration": 0.19921875, "hand": 1, "finger": 2 }, { "name": "F3", "midi": 53, "time": 5.5, "velocity": 0.5669291338582677, "duration": 0.40234375 }, { "name": "G#3", "midi": 56, "time": 5.75, "velocity": 0.44881889763779526, "duration": 0.25, "hand": 1, "finger": 1 }, { "name": "D#4", "midi": 63, "time": 6, "velocity": 0.4015748031496063, "duration": 1.5, "hand": 1, "finger": 5 }, { "name": "G3", "midi": 55, "time": 6, "velocity": 0.47244094488188976, "duration": 0.25, "hand": 1, "finger": 2 }, { "name": "D#3", "midi": 51, "time": 6, "velocity": 0.4881889763779528, "duration": 1 }, { "name": "A#3", "midi": 58, "time": 6.25, "velocity": 0.5039370078740157, "duration": 0.25, "hand": 1, "finger": 3 }, { "name": "G3", "midi": 55, "time": 6.5, "velocity": 0.4566929133858268, "duration": 0.25, "hand": 1, "finger": 1 }, { "name": "A#3", "midi": 58, "time": 6.75, "velocity": 0.5039370078740157, "duration": 0.25, "hand": 1, "finger": 2 }, { "name": "G3", "midi": 55, "time": 7, "velocity": 0.4645669291338583, "duration": 0.25, "hand": 1, "finger": 1 }, { "name": "D#2", "midi": 39, "time": 7, "velocity": 0.4015748031496063, "duration": 1 }, { "name": "A#3", "midi": 58, "time": 7.25, "velocity": 0.5354330708661418, "duration": 0.25, "hand": 1, "finger": 2 }, { "name": "E4", "midi": 64, "time": 7.5, "velocity": 0.47244094488188976, "duration": 0.5 }, { "name": "G3", "midi": 55, "time": 7.5, "velocity": 0.4645669291338583, "duration": 0.25, "hand": 1, "finger": 1 }, { "name": "A#3", "midi": 58, "time": 7.75, "velocity": 0.48031496062992124, "duration": 0.25, "hand": 1, "finger": 2 }, { "name": "F4", "midi": 65, "time": 8, "velocity": 0.5118110236220472, "duration": 0.90234375, "hand": 1, "finger": 5 }, { "name": "G3", "midi": 55, "time": 8, "velocity": 0.44881889763779526, "duration": 0.19921875, "hand": 1, "finger": 1 }, { "name": "C#2", "midi": 37, "time": 8, "velocity": 0.4645669291338583, "duration": 1 }, { "name": "A#3", "midi": 58, "time": 8.25, "velocity": 0.48031496062992124, "duration": 0.25, "hand": 1, "finger": 2 }, { "name": "G3", "midi": 55, "time": 8.5, "velocity": 0.4566929133858268, "duration": 0.25, "hand": 1, "finger": 1 }, { "name": "A#3", "midi": 58, "time": 8.75, "velocity": 0.5039370078740157, "duration": 0.25, "hand": 1, "finger": 2 }, { "name": "A#3", "midi": 58, "time": 9, "velocity": 0.4566929133858268, "duration": 0.75, "hand": 1, "finger": 3 }, { "name": "G3", "midi": 55, "time": 9, "velocity": 0.47244094488188976, "duration": 0.25, "hand": 1, "finger": 2 }, { "name": "C#3", "midi": 49, "time": 9, "velocity": 0.5354330708661418, "duration": 0.90234375 }, { "name": "D#3", "midi": 51, "time": 9.25, "velocity": 0.4566929133858268, "duration": 0.25, "hand": 1, "finger": 1 }, { "name": "G3", "midi": 55, "time": 9.5, "velocity": 0.5196850393700787, "duration": 0.25, "hand": 1, "finger": 2 }, { "name": "C4", "midi": 60, "time": 9.75, "velocity": 0.5196850393700787, "duration": 0.125, "hand": 1, "finger": 3 }, { "name": "D#3", "midi": 51, "time": 9.75, "velocity": 0.4566929133858268, "duration": 0.19921875, "hand": 1, "finger": 1 }, { "name": "C#4", "midi": 61, "time": 9.875, "velocity": 0.5118110236220472, "duration": 0.09765625, "hand": 1, "finger": 4 }, { "name": "D#4", "midi": 63, "time": 10, "velocity": 0.5354330708661418, "duration": 1, "hand": 1, "finger": 5 }, { "name": "G#3", "midi": 56, "time": 10, "velocity": 0.48031496062992124, "duration": 0.25, "hand": 1, "finger": 2 }, { "name": "C3", "midi": 48, "time": 10, "velocity": 0.4645669291338583, "duration": 1 }, { "name": "D#3", "midi": 51, "time": 10.25, "velocity": 0.44881889763779526, "duration": 0.25, "hand": 1, "finger": 1 }, { "name": "G#3", "midi": 56, "time": 10.5, "velocity": 0.5118110236220472, "duration": 0.25, "hand": 1, "finger": 2 }, { "name": "D#3", "midi": 51, "time": 10.75, "velocity": 0.44881889763779526, "duration": 0.25, "hand": 1, "finger": 1 }, { "name": "A3", "midi": 57, "time": 11, "velocity": 0.4330708661417323, "duration": 1, "hand": 1, "finger": 4 }, { "name": "D#3", "midi": 51, "time": 11, "velocity": 0.47244094488188976, "duration": 0.25, "hand": 1, "finger": 2 }, { "name": "F2", "midi": 41, "time": 11, "velocity": 0.4330708661417323, "duration": 1 }, { "name": "C3", "midi": 48, "time": 11.25, "velocity": 0.44881889763779526, "duration": 0.25, "hand": 1, "finger": 1 }, { "name": "D#3", "midi": 51, "time": 11.5, "velocity": 0.4881889763779528, "duration": 0.25, "hand": 1, "finger": 2 }, { "name": "C3", "midi": 48, "time": 11.75, "velocity": 0.4251968503937008, "duration": 0.25, "hand": 1, "finger": 1 }, { "name": "C#4", "midi": 61, "time": 12, "velocity": 0.5275590551181102, "duration": 0.90234375, "hand": 1, "finger": 5 }, { "name": "F3", "midi": 53, "time": 12, "velocity": 0.5354330708661418, "duration": 0.19921875, "hand": 1, "finger": 2 }, { "name": "A#1", "midi": 34, "time": 12, "velocity": 0.41732283464566927, "duration": 1 }, { "name": "C#3", "midi": 49, "time": 12.25, "velocity": 0.4566929133858268, "duration": 0.25, "hand": 1, "finger": 1 }, { "name": "F3", "midi": 53, "time": 12.5, "velocity": 0.47244094488188976, "duration": 0.25, "hand": 1 }, { "name": "C#3", "midi": 49, "time": 12.75, "velocity": 0.44881889763779526, "duration": 0.25, "hand": 1, "finger": 1 }, { "name": "C4", "midi": 60, "time": 13, "velocity": 0.4409448818897638, "duration": 0.12109375, "hand": 1, "finger": 5 }, { "name": "C#3", "midi": 49, "time": 13, "velocity": 0.47244094488188976, "duration": 0.25, "hand": 1, "finger": 1 }, { "name": "D#2", "midi": 39, "time": 13, "velocity": 0.44881889763779526, "duration": 0.90234375 }, { "name": "A#3", "midi": 58, "time": 13.25, "velocity": 0.4566929133858268, "duration": 0.12109375, "hand": 1, "finger": 4 }, { "name": "C#3", "midi": 49, "time": 13.25, "velocity": 0.4645669291338583, "duration": 0.25, "hand": 1, "finger": 1 }, { "name": "G#3", "midi": 56, "time": 13.5, "velocity": 0.4566929133858268, "duration": 0.12109375, "hand": 1, "finger": 5 }, { "name": "C#3", "midi": 49, "time": 13.5, "velocity": 0.48031496062992124, "duration": 0.25, "hand": 1, "finger": 1 }, { "name": "G3", "midi": 55, "time": 13.75, "velocity": 0.4645669291338583, "duration": 0.09375, "hand": 1, "finger": 2 }, { "name": "C#3", "midi": 49, "time": 13.75, "velocity": 0.4566929133858268, "duration": 0.19921875, "hand": 1, "finger": 1 }, { "name": "G3", "midi": 55, "time": 14, "velocity": 0.48031496062992124, "duration": 0.90234375, "hand": 1, "finger": 3 }, { "name": "A#3", "midi": 58, "time": 14, "velocity": 0.48031496062992124, "duration": 0.90234375, "hand": 1, "finger": 5 }, { "name": "C#3", "midi": 49, "time": 14, "velocity": 0.4881889763779528, "duration": 0.25, "hand": 1, "finger": 1 }, { "name": "G#1", "midi": 32, "time": 14, "velocity": 0.4645669291338583, "duration": 0.5 }, { "name": "D#3", "midi": 51, "time": 14.25, "velocity": 0.4881889763779528, "duration": 0.25, "hand": 1, "finger": 2 }, { "name": "C#3", "midi": 49, "time": 14.5, "velocity": 0.4409448818897638, "duration": 0.25, "hand": 1, "finger": 1 }, { "name": "G#2", "midi": 44, "time": 14.5, "velocity": 0.5118110236220472, "duration": 0.5 }, { "name": "D#3", "midi": 51, "time": 14.75, "velocity": 0.49606299212598426, "duration": 0.19921875, "hand": 1, "finger": 2 }, { "name": "G#1", "midi": 32, "time": 15, "velocity": 0.4330708661417323, "duration": 0.5 }, { "name": "C3", "midi": 48, "time": 15, "velocity": 0.4566929133858268, "duration": 0.078125, "hand": 1 }, { "name": "G#3", "midi": 56, "time": 15, "velocity": 0.4566929133858268, "duration": 0.078125, "hand": 1 }, { "name": "D#3", "midi": 51, "time": 15.1640625, "velocity": 0.4566929133858268, "duration": 0.08203125, "hand": 1 }, { "name": "G#3", "midi": 56, "time": 15.33203125, "velocity": 0.5196850393700787, "duration": 0.08203125, "hand": 1 }, { "name": "C4", "midi": 60, "time": 15.5, "velocity": 0.5275590551181102, "duration": 0.078125, "hand": 1 }, { "name": "D#4", "midi": 63, "time": 15.6640625, "velocity": 0.5118110236220472, "duration": 0.08203125, "hand": 1 }, { "name": "G#4", "midi": 68, "time": 15.83203125, "velocity": 0.5511811023622047, "duration": 0.08203125, "hand": 1 }, { "name": "C5", "midi": 72, "time": 16, "velocity": 0.6062992125984252, "duration": 1, "hand": 1 }, { "name": "C4", "midi": 60, "time": 16, "velocity": 0.6141732283464567, "duration": 0.25, "hand": 1 }, { "name": "G#3", "midi": 56, "time": 16, "velocity": 0.4251968503937008, "duration": 0.25 }, { "name": "G#2", "midi": 44, "time": 16, "velocity": 0.3937007874015748, "duration": 1 }, { "name": "D#4", "midi": 63, "time": 16.25, "velocity": 0.5433070866141733, "duration": 0.25, "hand": 1 }, { "name": "D#3", "midi": 51, "time": 16.25, "velocity": 0.4094488188976378, "duration": 0.25 }, { "name": "C4", "midi": 60, "time": 16.5, "velocity": 0.44881889763779526, "duration": 0.25, "hand": 1 }, { "name": "G#3", "midi": 56, "time": 16.5, "velocity": 0.4881889763779528, "duration": 0.25 }, { "name": "D#4", "midi": 63, "time": 16.75, "velocity": 0.5354330708661418, "duration": 0.25, "hand": 1 }, { "name": "D#3", "midi": 51, "time": 16.75, "velocity": 0.44881889763779526, "duration": 0.25 }, { "name": "A#4", "midi": 70, "time": 17, "velocity": 0.47244094488188976, "duration": 1, "hand": 1 }, { "name": "A#3", "midi": 58, "time": 17, "velocity": 0.4251968503937008, "duration": 0.25, "hand": 1 }, { "name": "G3", "midi": 55, "time": 17, "velocity": 0.5118110236220472, "duration": 0.25 }, { "name": "C#3", "midi": 49, "time": 17, "velocity": 0.47244094488188976, "duration": 1 }, { "name": "D#4", "midi": 63, "time": 17.25, "velocity": 0.5118110236220472, "duration": 0.25, "hand": 1 }, { "name": "D#3", "midi": 51, "time": 17.25, "velocity": 0.4645669291338583, "duration": 0.25 }, { "name": "A#3", "midi": 58, "time": 17.5, "velocity": 0.47244094488188976, "duration": 0.25, "hand": 1 }, { "name": "G3", "midi": 55, "time": 17.5, "velocity": 0.49606299212598426, "duration": 0.25 }, { "name": "D#4", "midi": 63, "time": 17.75, "velocity": 0.5354330708661418, "duration": 0.25, "hand": 1 }, { "name": "D#3", "midi": 51, "time": 17.75, "velocity": 0.4251968503937008, "duration": 0.25 }, { "name": "D#5", "midi": 75, "time": 18, "velocity": 0.5354330708661418, "duration": 1.5, "hand": 1 }, { "name": "D#4", "midi": 63, "time": 18, "velocity": 0.5118110236220472, "duration": 0.25, "hand": 1 }, { "name": "G#3", "midi": 56, "time": 18, "velocity": 0.5196850393700787, "duration": 0.25 }, { "name": "C3", "midi": 48, "time": 18, "velocity": 0.4251968503937008, "duration": 1 }, { "name": "G#4", "midi": 68, "time": 18.25, "velocity": 0.5511811023622047, "duration": 0.25, "hand": 1 }, { "name": "D#3", "midi": 51, "time": 18.25, "velocity": 0.4409448818897638, "duration": 0.25 }, { "name": "D#4", "midi": 63, "time": 18.5, "velocity": 0.4409448818897638, "duration": 0.25, "hand": 1 }, { "name": "G#3", "midi": 56, "time": 18.5, "velocity": 0.4881889763779528, "duration": 0.25 }, { "name": "G#4", "midi": 68, "time": 18.75, "velocity": 0.5275590551181102, "duration": 0.25, "hand": 1 }, { "name": "D#3", "midi": 51, "time": 18.75, "velocity": 0.4566929133858268, "duration": 0.25 }, { "name": "D#4", "midi": 63, "time": 19, "velocity": 0.4251968503937008, "duration": 0.25, "hand": 1 }, { "name": "G3", "midi": 55, "time": 19, "velocity": 0.5039370078740157, "duration": 0.19921875 }, { "name": "G2", "midi": 43, "time": 19, "velocity": 0.4409448818897638, "duration": 0.90234375 }, { "name": "A#4", "midi": 70, "time": 19.25, "velocity": 0.5748031496062992, "duration": 0.25, "hand": 1 }, { "name": "D#3", "midi": 51, "time": 19.25, "velocity": 0.5039370078740157, "duration": 0.25 }, { "name": "C#5", "midi": 73, "time": 19.5, "velocity": 0.41732283464566927, "duration": 0.40234375, "hand": 1 }, { "name": "D#4", "midi": 63, "time": 19.5, "velocity": 0.41732283464566927, "duration": 0.19921875, "hand": 1 }, { "name": "G3", "midi": 55, "time": 19.5, "velocity": 0.4881889763779528, "duration": 0.25 }, { "name": "A#4", "midi": 70, "time": 19.75, "velocity": 0.5511811023622047, "duration": 0.25, "hand": 1 }, { "name": "D#3", "midi": 51, "time": 19.75, "velocity": 0.4330708661417323, "duration": 0.25 }, { "name": "C5", "midi": 72, "time": 20, "velocity": 0.4566929133858268, "duration": 0.5, "hand": 1 }, { "name": "D#4", "midi": 63, "time": 20, "velocity": 0.3858267716535433, "duration": 0.25, "hand": 1 }, { "name": "G#3", "midi": 56, "time": 20, "velocity": 0.4645669291338583, "duration": 0.25 }, { "name": "G#2", "midi": 44, "time": 20, "velocity": 0.4566929133858268, "duration": 0.5 }, { "name": "G#4", "midi": 68, "time": 20.25, "velocity": 0.4881889763779528, "duration": 0.25, "hand": 1 }, { "name": "D#3", "midi": 51, "time": 20.25, "velocity": 0.44881889763779526, "duration": 0.25 }, { "name": "D#5", "midi": 75, "time": 20.5, "velocity": 0.5354330708661418, "duration": 0.5, "hand": 1 }, { "name": "D#4", "midi": 63, "time": 20.5, "velocity": 0.4409448818897638, "duration": 0.25, "hand": 1 }, { "name": "G3", "midi": 55, "time": 20.5, "velocity": 0.49606299212598426, "duration": 0.25 }, { "name": "G2", "midi": 43, "time": 20.5, "velocity": 0.4645669291338583, "duration": 0.5 }, { "name": "A#4", "midi": 70, "time": 20.75, "velocity": 0.5511811023622047, "duration": 0.25, "hand": 1 }, { "name": "D#3", "midi": 51, "time": 20.75, "velocity": 0.4409448818897638, "duration": 0.25 }, { "name": "G#5", "midi": 80, "time": 21, "velocity": 0.5433070866141733, "duration": 0.5, "hand": 1 }, { "name": "G#4", "midi": 68, "time": 21, "velocity": 0.4409448818897638, "duration": 0.25, "hand": 1 }, { "name": "F3", "midi": 53, "time": 21, "velocity": 0.5118110236220472, "duration": 0.25 }, { "name": "F2", "midi": 41, "time": 21, "velocity": 0.4881889763779528, "duration": 0.5 }, { "name": "C5", "midi": 72, "time": 21.25, "velocity": 0.5354330708661418, "duration": 0.25, "hand": 1 }, { "name": "G#2", "midi": 44, "time": 21.25, "velocity": 0.41732283464566927, "duration": 0.25 }, { "name": "A#5", "midi": 82, "time": 21.5, "velocity": 0.5433070866141733, "duration": 0.40234375, "hand": 1 }, { "name": "G#4", "midi": 68, "time": 21.5, "velocity": 0.4409448818897638, "duration": 0.19921875, "hand": 1 }, { "name": "F3", "midi": 53, "time": 21.5, "velocity": 0.5669291338582677, "duration": 0.19921875 }, { "name": "F2", "midi": 41, "time": 21.5, "velocity": 0.4566929133858268, "duration": 0.40234375 }, { "name": "D5", "midi": 74, "time": 21.75, "velocity": 0.5748031496062992, "duration": 0.25, "hand": 1 }, { "name": "G#2", "midi": 44, "time": 21.75, "velocity": 0.44881889763779526, "duration": 0.25 }, { "name": "D#5", "midi": 75, "time": 22, "velocity": 0.3858267716535433, "duration": 1.5, "hand": 1 }, { "name": "G4", "midi": 67, "time": 22, "velocity": 0.4330708661417323, "duration": 0.25, "hand": 1 }, { "name": "D#2", "midi": 39, "time": 22, "velocity": 0.4409448818897638, "duration": 0.25 }, { "name": "A#4", "midi": 70, "time": 22.25, "velocity": 0.5511811023622047, "duration": 0.25, "hand": 1 }, { "name": "G2", "midi": 43, "time": 22.25, "velocity": 0.5039370078740157, "duration": 0.25 }, { "name": "G4", "midi": 67, "time": 22.5, "velocity": 0.44881889763779526, "duration": 0.25, "hand": 1 }, { "name": "A#2", "midi": 46, "time": 22.5, "velocity": 0.47244094488188976, "duration": 0.25 }, { "name": "A#4", "midi": 70, "time": 22.75, "velocity": 0.5118110236220472, "duration": 0.25, "hand": 1 }, { "name": "D#3", "midi": 51, "time": 22.75, "velocity": 0.4881889763779528, "duration": 0.25 }, { "name": "G4", "midi": 67, "time": 23, "velocity": 0.44881889763779526, "duration": 0.25, "hand": 1 }, { "name": "G3", "midi": 55, "time": 23, "velocity": 0.49606299212598426, "duration": 0.25 }, { "name": "A#4", "midi": 70, "time": 23.25, "velocity": 0.47244094488188976, "duration": 0.25, "hand": 1 }, { "name": "A#3", "midi": 58, "time": 23.25, "velocity": 0.5039370078740157, "duration": 0.25 }, { "name": "E5", "midi": 76, "time": 23.5, "velocity": 0.49606299212598426, "duration": 0.5, "hand": 1 }, { "name": "G4", "midi": 67, "time": 23.5, "velocity": 0.4409448818897638, "duration": 0.25, "hand": 1 }, { "name": "G3", "midi": 55, "time": 23.5, "velocity": 0.47244094488188976, "duration": 0.25 }, { "name": "A#4", "midi": 70, "time": 23.75, "velocity": 0.5039370078740157, "duration": 0.25, "hand": 1 }, { "name": "A#3", "midi": 58, "time": 23.75, "velocity": 0.47244094488188976, "duration": 0.19921875 }, { "name": "F5", "midi": 77, "time": 24, "velocity": 0.48031496062992124, "duration": 0.90234375, "hand": 1 }, { "name": "G4", "midi": 67, "time": 24, "velocity": 0.4330708661417323, "duration": 0.19921875, "hand": 1 }, { "name": "C#2", "midi": 37, "time": 24, "velocity": 0.47244094488188976, "duration": 0.25 }, { "name": "A#4", "midi": 70, "time": 24.25, "velocity": 0.5275590551181102, "duration": 0.25, "hand": 1 }, { "name": "G2", "midi": 43, "time": 24.25, "velocity": 0.5196850393700787, "duration": 0.25 }, { "name": "G4", "midi": 67, "time": 24.5, "velocity": 0.4409448818897638, "duration": 0.25, "hand": 1 }, { "name": "A#2", "midi": 46, "time": 24.5, "velocity": 0.4881889763779528, "duration": 0.25 }, { "name": "A#4", "midi": 70, "time": 24.75, "velocity": 0.5354330708661418, "duration": 0.25, "hand": 1 }, { "name": "C#3", "midi": 49, "time": 24.75, "velocity": 0.5275590551181102, "duration": 0.25 }, { "name": "A#4", "midi": 70, "time": 25, "velocity": 0.3779527559055118, "duration": 0.75, "hand": 1 }, { "name": "G4", "midi": 67, "time": 25, "velocity": 0.4409448818897638, "duration": 0.25, "hand": 1 }, { "name": "G3", "midi": 55, "time": 25, "velocity": 0.5118110236220472, "duration": 0.25 }, { "name": "D#4", "midi": 63, "time": 25.25, "velocity": 0.4330708661417323, "duration": 0.25, "hand": 1 }, { "name": "A#3", "midi": 58, "time": 25.25, "velocity": 0.49606299212598426, "duration": 0.25 }, { "name": "G4", "midi": 67, "time": 25.5, "velocity": 0.5118110236220472, "duration": 0.25, "hand": 1 }, { "name": "G3", "midi": 55, "time": 25.5, "velocity": 0.4566929133858268, "duration": 0.25 }, { "name": "C5", "midi": 72, "time": 25.75, "velocity": 0.49606299212598426, "duration": 0.125, "hand": 1 }, { "name": "D#4", "midi": 63, "time": 25.75, "velocity": 0.41732283464566927, "duration": 0.25, "hand": 1 }, { "name": "C#3", "midi": 49, "time": 25.75, "velocity": 0.4251968503937008, "duration": 0.19921875 }, { "name": "C#5", "midi": 73, "time": 25.875, "velocity": 0.48031496062992124, "duration": 0.125, "hand": 1 }, { "name": "D#5", "midi": 75, "time": 26, "velocity": 0.5354330708661418, "duration": 1, "hand": 1 }, { "name": "G#4", "midi": 68, "time": 26, "velocity": 0.5905511811023622, "duration": 0.25, "hand": 1 }, { "name": "C3", "midi": 48, "time": 26, "velocity": 0.4330708661417323, "duration": 0.25 }, { "name": "C3", "midi": 48, "time": 26, "velocity": 0.4566929133858268, "duration": 0.75 }, { "name": "D#4", "midi": 63, "time": 26.25, "velocity": 0.4094488188976378, "duration": 0.25, "hand": 1 }, { "name": "D#3", "midi": 51, "time": 26.25, "velocity": 0.4881889763779528, "duration": 0.25 }, { "name": "G#4", "midi": 68, "time": 26.5, "velocity": 0.5511811023622047, "duration": 0.25, "hand": 1 }, { "name": "C3", "midi": 48, "time": 26.5, "velocity": 0.4645669291338583, "duration": 0.5 }, { "name": "D#4", "midi": 63, "time": 26.75, "velocity": 0.4094488188976378, "duration": 0.25, "hand": 1 }, { "name": "D#3", "midi": 51, "time": 26.75, "velocity": 0.49606299212598426, "duration": 0.25 }, { "name": "A4", "midi": 69, "time": 27, "velocity": 0.4094488188976378, "duration": 1, "hand": 1 }, { "name": "D#4", "midi": 63, "time": 27, "velocity": 0.4409448818897638, "duration": 0.25, "hand": 1 }, { "name": "C3", "midi": 48, "time": 27, "velocity": 0.47244094488188976, "duration": 0.25 }, { "name": "F2", "midi": 41, "time": 27, "velocity": 0.4094488188976378, "duration": 1 }, { "name": "C4", "midi": 60, "time": 27.25, "velocity": 0.44881889763779526, "duration": 0.25, "hand": 1 }, { "name": "F3", "midi": 53, "time": 27.25, "velocity": 0.5039370078740157, "duration": 0.25 }, { "name": "D#4", "midi": 63, "time": 27.5, "velocity": 0.48031496062992124, "duration": 0.25, "hand": 1 }, { "name": "C3", "midi": 48, "time": 27.5, "velocity": 0.47244094488188976, "duration": 0.25 }, { "name": "C4", "midi": 60, "time": 27.75, "velocity": 0.4409448818897638, "duration": 0.25, "hand": 1 }, { "name": "F3", "midi": 53, "time": 27.75, "velocity": 0.5039370078740157, "duration": 0.25 }, { "name": "C#5", "midi": 73, "time": 28, "velocity": 0.5354330708661418, "duration": 1, "hand": 1 }, { "name": "F4", "midi": 65, "time": 28, "velocity": 0.5196850393700787, "duration": 0.25, "hand": 1 }, { "name": "C#3", "midi": 49, "time": 28, "velocity": 0.4409448818897638, "duration": 0.25 }, { "name": "A#2", "midi": 46, "time": 28, "velocity": 0.47244094488188976, "duration": 1 }, { "name": "C#4", "midi": 61, "time": 28.25, "velocity": 0.48031496062992124, "duration": 0.25, "hand": 1 }, { "name": "F3", "midi": 53, "time": 28.25, "velocity": 0.48031496062992124, "duration": 0.25 }, { "name": "F4", "midi": 65, "time": 28.5, "velocity": 0.5196850393700787, "duration": 0.25, "hand": 1 }, { "name": "C#3", "midi": 49, "time": 28.5, "velocity": 0.47244094488188976, "duration": 0.25 }, { "name": "C#4", "midi": 61, "time": 28.75, "velocity": 0.4094488188976378, "duration": 0.25, "hand": 1 }, { "name": "F3", "midi": 53, "time": 28.75, "velocity": 0.49606299212598426, "duration": 0.25 }, { "name": "C5", "midi": 72, "time": 29, "velocity": 0.4645669291338583, "duration": 0.12109375, "hand": 1 }, { "name": "C#4", "midi": 61, "time": 29, "velocity": 0.49606299212598426, "duration": 0.25, "hand": 1 }, { "name": "A#2", "midi": 46, "time": 29, "velocity": 0.4251968503937008, "duration": 0.19921875 }, { "name": "D#2", "midi": 39, "time": 29, "velocity": 0.4094488188976378, "duration": 0.90234375 }, { "name": "A#4", "midi": 70, "time": 29.25, "velocity": 0.4094488188976378, "duration": 0.12109375, "hand": 1 }, { "name": "C#4", "midi": 61, "time": 29.25, "velocity": 0.47244094488188976, "duration": 0.25, "hand": 1 }, { "name": "D#3", "midi": 51, "time": 29.25, "velocity": 0.4881889763779528, "duration": 0.25 }, { "name": "G#4", "midi": 68, "time": 29.5, "velocity": 0.4645669291338583, "duration": 0.12109375, "hand": 1 }, { "name": "C#4", "midi": 61, "time": 29.5, "velocity": 0.4881889763779528, "duration": 0.25, "hand": 1 }, { "name": "A#2", "midi": 46, "time": 29.5, "velocity": 0.44881889763779526, "duration": 0.25 }, { "name": "G4", "midi": 67, "time": 29.75, "velocity": 0.41732283464566927, "duration": 0.12109375, "hand": 1 }, { "name": "C#4", "midi": 61, "time": 29.75, "velocity": 0.4881889763779528, "duration": 0.25, "hand": 1 }, { "name": "D#3", "midi": 51, "time": 29.75, "velocity": 0.48031496062992124, "duration": 0.25 }, { "name": "A#4", "midi": 70, "time": 30, "velocity": 0.48031496062992124, "duration": 1, "hand": 1 }, { "name": "C#4", "midi": 61, "time": 30, "velocity": 0.48031496062992124, "duration": 0.25, "hand": 1 }, { "name": "G#2", "midi": 44, "time": 30, "velocity": 0.49606299212598426, "duration": 1.5 }, { "name": "D#4", "midi": 63, "time": 30.25, "velocity": 0.48031496062992124, "duration": 0.25, "hand": 1 }, { "name": "D#3", "midi": 51, "time": 30.25, "velocity": 0.4094488188976378, "duration": 0.25 }, { "name": "C#4", "midi": 61, "time": 30.5, "velocity": 0.4566929133858268, "duration": 0.25, "hand": 1 }, { "name": "G3", "midi": 55, "time": 30.5, "velocity": 0.4881889763779528, "duration": 0.25 }, { "name": "D#4", "midi": 63, "time": 30.75, "velocity": 0.5196850393700787, "duration": 0.25, "hand": 1 }, { "name": "D#3", "midi": 51, "time": 30.75, "velocity": 0.4566929133858268, "duration": 0.25 }, { "name": "G#4", "midi": 68, "time": 31, "velocity": 0.4330708661417323, "duration": 0.40234375, "hand": 1 }, { "name": "C4", "midi": 60, "time": 31, "velocity": 0.4409448818897638, "duration": 0.40234375, "hand": 1 }, { "name": "G#3", "midi": 56, "time": 31, "velocity": 0.49606299212598426, "duration": 0.5, "hand": 1 }, { "name": "C4", "midi": 60, "time": 31.875, "velocity": 0.4251968503937008, "duration": 0.125 }, { "name": "C5", "midi": 72, "time": 32, "velocity": 0.6141732283464567, "duration": 1.25 }, { "name": "C4", "midi": 60, "time": 32.25, "velocity": 0.4409448818897638, "duration": 0.25 }, { "name": "C4", "midi": 60, "time": 32.5, "velocity": 0.4330708661417323, "duration": 0.25 }, { "name": "C4", "midi": 60, "time": 32.75, "velocity": 0.47244094488188976, "duration": 0.25 }, { "name": "C4", "midi": 60, "time": 33, "velocity": 0.44881889763779526, "duration": 0.25 }, { "name": "G#5", "midi": 80, "time": 33.25, "velocity": 0.5905511811023622, "duration": 0.25 }, { "name": "C4", "midi": 60, "time": 33.25, "velocity": 0.47244094488188976, "duration": 0.25 }, { "name": "G5", "midi": 79, "time": 33.5, "velocity": 0.4330708661417323, "duration": 0.25 }, { "name": "C4", "midi": 60, "time": 33.5, "velocity": 0.47244094488188976, "duration": 0.25 }, { "name": "F5", "midi": 77, "time": 33.75, "velocity": 0.44881889763779526, "duration": 0.19921875 }, { "name": "C4", "midi": 60, "time": 33.75, "velocity": 0.44881889763779526, "duration": 0.25 }, { "name": "C6", "midi": 84, "time": 34, "velocity": 0.5511811023622047, "duration": 1.25 }, { "name": "E3", "midi": 52, "time": 34, "velocity": 0.48031496062992124, "duration": 0.25 }, { "name": "G3", "midi": 55, "time": 34, "velocity": 0.48031496062992124, "duration": 0.25 }, { "name": "C4", "midi": 60, "time": 34, "velocity": 0.48031496062992124, "duration": 0.25 }, { "name": "E3", "midi": 52, "time": 34.25, "velocity": 0.49606299212598426, "duration": 0.25 }, { "name": "G3", "midi": 55, "time": 34.25, "velocity": 0.49606299212598426, "duration": 0.25 }, { "name": "C4", "midi": 60, "time": 34.25, "velocity": 0.49606299212598426, "duration": 0.25 }, { "name": "E3", "midi": 52, "time": 34.5, "velocity": 0.48031496062992124, "duration": 0.25 }, { "name": "G3", "midi": 55, "time": 34.5, "velocity": 0.48031496062992124, "duration": 0.25 }, { "name": "C4", "midi": 60, "time": 34.5, "velocity": 0.48031496062992124, "duration": 0.25 }, { "name": "E3", "midi": 52, "time": 34.75, "velocity": 0.47244094488188976, "duration": 0.25 }, { "name": "G3", "midi": 55, "time": 34.75, "velocity": 0.47244094488188976, "duration": 0.25 }, { "name": "C4", "midi": 60, "time": 34.75, "velocity": 0.47244094488188976, "duration": 0.25 }, { "name": "F3", "midi": 53, "time": 35, "velocity": 0.44881889763779526, "duration": 0.25 }, { "name": "G#3", "midi": 56, "time": 35, "velocity": 0.44881889763779526, "duration": 0.25 }, { "name": "C4", "midi": 60, "time": 35, "velocity": 0.44881889763779526, "duration": 0.25 }, { "name": "G#5", "midi": 80, "time": 35.25, "velocity": 0.4015748031496063, "duration": 0.25 }, { "name": "F3", "midi": 53, "time": 35.25, "velocity": 0.4251968503937008, "duration": 0.25 }, { "name": "G#3", "midi": 56, "time": 35.25, "velocity": 0.4251968503937008, "duration": 0.25 }, { "name": "G5", "midi": 79, "time": 35.5, "velocity": 0.4094488188976378, "duration": 0.25 }, { "name": "F3", "midi": 53, "time": 35.5, "velocity": 0.47244094488188976, "duration": 0.25 }, { "name": "G#3", "midi": 56, "time": 35.5, "velocity": 0.47244094488188976, "duration": 0.25 }, { "name": "F5", "midi": 77, "time": 35.75, "velocity": 0.4645669291338583, "duration": 0.19921875 }, { "name": "F3", "midi": 53, "time": 35.75, "velocity": 0.48031496062992124, "duration": 0.25 }, { "name": "G#3", "midi": 56, "time": 35.75, "velocity": 0.48031496062992124, "duration": 0.25 }, { "name": "C5", "midi": 72, "time": 36, "velocity": 0.44881889763779526, "duration": 1.25 }, { "name": "G3", "midi": 55, "time": 36, "velocity": 0.5669291338582677, "duration": 0.25 }, { "name": "A#3", "midi": 58, "time": 36, "velocity": 0.5669291338582677, "duration": 0.25 }, { "name": "E4", "midi": 64, "time": 36, "velocity": 0.5669291338582677, "duration": 0.25 }, { "name": "G3", "midi": 55, "time": 36.25, "velocity": 0.4566929133858268, "duration": 0.25 }, { "name": "A#3", "midi": 58, "time": 36.25, "velocity": 0.4566929133858268, "duration": 0.25 }, { "name": "E4", "midi": 64, "time": 36.25, "velocity": 0.4566929133858268, "duration": 0.25 }, { "name": "G3", "midi": 55, "time": 36.5, "velocity": 0.47244094488188976, "duration": 0.25 }, { "name": "A#3", "midi": 58, "time": 36.5, "velocity": 0.47244094488188976, "duration": 0.25 }, { "name": "E4", "midi": 64, "time": 36.5, "velocity": 0.47244094488188976, "duration": 0.25 }, { "name": "G3", "midi": 55, "time": 36.75, "velocity": 0.47244094488188976, "duration": 0.25 }, { "name": "A#3", "midi": 58, "time": 36.75, "velocity": 0.47244094488188976, "duration": 0.25 }, { "name": "E4", "midi": 64, "time": 36.75, "velocity": 0.47244094488188976, "duration": 0.25 }, { "name": "G#3", "midi": 56, "time": 37, "velocity": 0.5039370078740157, "duration": 0.25 }, { "name": "C4", "midi": 60, "time": 37, "velocity": 0.5039370078740157, "duration": 0.25 }, { "name": "F4", "midi": 65, "time": 37, "velocity": 0.5039370078740157, "duration": 0.25 }, { "name": "G#5", "midi": 80, "time": 37.25, "velocity": 0.5275590551181102, "duration": 0.25 }, { "name": "G#3", "midi": 56, "time": 37.25, "velocity": 0.48031496062992124, "duration": 0.25 }, { "name": "C4", "midi": 60, "time": 37.25, "velocity": 0.48031496062992124, "duration": 0.25 }, { "name": "F4", "midi": 65, "time": 37.25, "velocity": 0.48031496062992124, "duration": 0.25 }, { "name": "G5", "midi": 79, "time": 37.5, "velocity": 0.48031496062992124, "duration": 0.25 }, { "name": "G#3", "midi": 56, "time": 37.5, "velocity": 0.44881889763779526, "duration": 0.25 }, { "name": "C4", "midi": 60, "time": 37.5, "velocity": 0.44881889763779526, "duration": 0.25 }, { "name": "F4", "midi": 65, "time": 37.5, "velocity": 0.44881889763779526, "duration": 0.25 }, { "name": "F5", "midi": 77, "time": 37.75, "velocity": 0.4409448818897638, "duration": 0.19921875 }, { "name": "G#3", "midi": 56, "time": 37.75, "velocity": 0.49606299212598426, "duration": 0.25 }, { "name": "C4", "midi": 60, "time": 37.75, "velocity": 0.49606299212598426, "duration": 0.25 }, { "name": "F4", "midi": 65, "time": 37.75, "velocity": 0.49606299212598426, "duration": 0.25 }, { "name": "D#5", "midi": 75, "time": 38, "velocity": 0.4251968503937008, "duration": 0.5 }, { "name": "A#3", "midi": 58, "time": 38, "velocity": 0.4881889763779528, "duration": 0.25 }, { "name": "F4", "midi": 65, "time": 38, "velocity": 0.4881889763779528, "duration": 0.25 }, { "name": "G#4", "midi": 68, "time": 38, "velocity": 0.4881889763779528, "duration": 0.25 }, { "name": "A#3", "midi": 58, "time": 38.25, "velocity": 0.49606299212598426, "duration": 0.25 }, { "name": "F4", "midi": 65, "time": 38.25, "velocity": 0.49606299212598426, "duration": 0.25 }, { "name": "G#4", "midi": 68, "time": 38.25, "velocity": 0.49606299212598426, "duration": 0.25 }, { "name": "D5", "midi": 74, "time": 38.5, "velocity": 0.4566929133858268, "duration": 1 }, { "name": "A#3", "midi": 58, "time": 38.5, "velocity": 0.4409448818897638, "duration": 0.25 }, { "name": "F4", "midi": 65, "time": 38.5, "velocity": 0.4409448818897638, "duration": 0.25 }, { "name": "G#4", "midi": 68, "time": 38.5, "velocity": 0.4409448818897638, "duration": 0.25 }, { "name": "A#3", "midi": 58, "time": 38.75, "velocity": 0.4566929133858268, "duration": 0.25 }, { "name": "F4", "midi": 65, "time": 38.75, "velocity": 0.4566929133858268, "duration": 0.25 }, { "name": "G#4", "midi": 68, "time": 38.75, "velocity": 0.4566929133858268, "duration": 0.25 }, { "name": "B3", "midi": 59, "time": 39, "velocity": 0.4645669291338583, "duration": 0.25 }, { "name": "F4", "midi": 65, "time": 39, "velocity": 0.4645669291338583, "duration": 0.25 }, { "name": "G#4", "midi": 68, "time": 39, "velocity": 0.4645669291338583, "duration": 0.25 }, { "name": "B3", "midi": 59, "time": 39.25, "velocity": 0.47244094488188976, "duration": 0.25 }, { "name": "F4", "midi": 65, "time": 39.25, "velocity": 0.47244094488188976, "duration": 0.25 }, { "name": "G#4", "midi": 68, "time": 39.25, "velocity": 0.47244094488188976, "duration": 0.25 }, { "name": "F5", "midi": 77, "time": 39.5, "velocity": 0.5275590551181102, "duration": 0.375 }, { "name": "B3", "midi": 59, "time": 39.5, "velocity": 0.47244094488188976, "duration": 0.25 }, { "name": "D4", "midi": 62, "time": 39.5, "velocity": 0.47244094488188976, "duration": 0.25 }, { "name": "G#4", "midi": 68, "time": 39.5, "velocity": 0.47244094488188976, "duration": 0.25 }, { "name": "B3", "midi": 59, "time": 39.75, "velocity": 0.4566929133858268, "duration": 0.25 }, { "name": "D4", "midi": 62, "time": 39.75, "velocity": 0.4566929133858268, "duration": 0.25 }, { "name": "G#4", "midi": 68, "time": 39.75, "velocity": 0.4566929133858268, "duration": 0.25 }, { "name": "D#5", "midi": 75, "time": 39.875, "velocity": 0.4566929133858268, "duration": 0.09765625 }, { "name": "D#5", "midi": 75, "time": 40, "velocity": 0.48031496062992124, "duration": 1 }, { "name": "C4", "midi": 60, "time": 40, "velocity": 0.4645669291338583, "duration": 0.25 }, { "name": "D#4", "midi": 63, "time": 40, "velocity": 0.4645669291338583, "duration": 0.25 }, { "name": "G4", "midi": 67, "time": 40, "velocity": 0.4645669291338583, "duration": 0.25 }, { "name": "C4", "midi": 60, "time": 40.25, "velocity": 0.4566929133858268, "duration": 0.25 }, { "name": "D#4", "midi": 63, "time": 40.25, "velocity": 0.4566929133858268, "duration": 0.25 }, { "name": "G4", "midi": 67, "time": 40.25, "velocity": 0.4566929133858268, "duration": 0.25 }, { "name": "C4", "midi": 60, "time": 40.5, "velocity": 0.4566929133858268, "duration": 0.25 }, { "name": "D#4", "midi": 63, "time": 40.5, "velocity": 0.4566929133858268, "duration": 0.25 }, { "name": "G4", "midi": 67, "time": 40.5, "velocity": 0.4566929133858268, "duration": 0.25 }, { "name": "C4", "midi": 60, "time": 40.75, "velocity": 0.48031496062992124, "duration": 0.25 }, { "name": "D#4", "midi": 63, "time": 40.75, "velocity": 0.48031496062992124, "duration": 0.25 }, { "name": "G4", "midi": 67, "time": 40.75, "velocity": 0.48031496062992124, "duration": 0.25 }, { "name": "F4", "midi": 65, "time": 41, "velocity": 0.3228346456692913, "duration": 0.75 }, { "name": "G#3", "midi": 56, "time": 41, "velocity": 0.4251968503937008, "duration": 0.25 }, { "name": "D#4", "midi": 63, "time": 41, "velocity": 0.4251968503937008, "duration": 0.25 }, { "name": "G#3", "midi": 56, "time": 41.25, "velocity": 0.4409448818897638, "duration": 0.25 }, { "name": "D#4", "midi": 63, "time": 41.25, "velocity": 0.4409448818897638, "duration": 0.25 }, { "name": "G#3", "midi": 56, "time": 41.5, "velocity": 0.48031496062992124, "duration": 0.25 }, { "name": "D#4", "midi": 63, "time": 41.5, "velocity": 0.48031496062992124, "duration": 0.25 }, { "name": "G#4", "midi": 68, "time": 41.75, "velocity": 0.5118110236220472, "duration": 0.1171875 }, { "name": "G#3", "midi": 56, "time": 41.75, "velocity": 0.4566929133858268, "duration": 0.25 }, { "name": "D#4", "midi": 63, "time": 41.75, "velocity": 0.4566929133858268, "duration": 0.25 }, { "name": "B4", "midi": 71, "time": 41.8671875, "velocity": 0.4881889763779528, "duration": 0.04296875 }, { "name": "C5", "midi": 72, "time": 41.91015625, "velocity": 0.5196850393700787, "duration": 0.046875 }, { "name": "D5", "midi": 74, "time": 41.95703125, "velocity": 0.5039370078740157, "duration": 0.04296875 }, { "name": "C5", "midi": 72, "time": 42, "velocity": 0.44881889763779526, "duration": 0.09765625 }, { "name": "A#4", "midi": 70, "time": 42.125, "velocity": 0.4251968503937008, "duration": 0.09765625 }, { "name": "G5", "midi": 79, "time": 42.25, "velocity": 0.5669291338582677, "duration": 0.5 }, { "name": "A#3", "midi": 58, "time": 42.25, "velocity": 0.41732283464566927, "duration": 0.25 }, { "name": "D#4", "midi": 63, "time": 42.25, "velocity": 0.41732283464566927, "duration": 0.25 }, { "name": "G4", "midi": 67, "time": 42.25, "velocity": 0.41732283464566927, "duration": 0.25 }, { "name": "A#3", "midi": 58, "time": 42.5, "velocity": 0.4566929133858268, "duration": 0.25 }, { "name": "D#4", "midi": 63, "time": 42.5, "velocity": 0.4566929133858268, "duration": 0.25 }, { "name": "G4", "midi": 67, "time": 42.5, "velocity": 0.4566929133858268, "duration": 0.25 }, { "name": "F5", "midi": 77, "time": 42.75, "velocity": 0.4330708661417323, "duration": 0.125 }, { "name": "A#3", "midi": 58, "time": 42.75, "velocity": 0.5039370078740157, "duration": 0.25 }, { "name": "D#4", "midi": 63, "time": 42.75, "velocity": 0.5039370078740157, "duration": 0.25 }, { "name": "G4", "midi": 67, "time": 42.75, "velocity": 0.5039370078740157, "duration": 0.25 }, { "name": "D#5", "midi": 75, "time": 42.875, "velocity": 0.44881889763779526, "duration": 0.125 }, { "name": "D5", "midi": 74, "time": 43, "velocity": 0.41732283464566927, "duration": 0.125 }, { "name": "C5", "midi": 72, "time": 43.125, "velocity": 0.4251968503937008, "duration": 0.125 }, { "name": "A#4", "midi": 70, "time": 43.25, "velocity": 0.4566929133858268, "duration": 0.125 }, { "name": "A#2", "midi": 46, "time": 43.25, "velocity": 0.4094488188976378, "duration": 0.25 }, { "name": "D3", "midi": 50, "time": 43.25, "velocity": 0.4094488188976378, "duration": 0.25 }, { "name": "G#3", "midi": 56, "time": 43.25, "velocity": 0.4094488188976378, "duration": 0.25 }, { "name": "A4", "midi": 69, "time": 43.375, "velocity": 0.47244094488188976, "duration": 0.125 }, { "name": "C5", "midi": 72, "time": 43.5, "velocity": 0.5118110236220472, "duration": 0.125 }, { "name": "A#2", "midi": 46, "time": 43.5, "velocity": 0.4409448818897638, "duration": 0.25 }, { "name": "D3", "midi": 50, "time": 43.5, "velocity": 0.4409448818897638, "duration": 0.25 }, { "name": "G#3", "midi": 56, "time": 43.5, "velocity": 0.4409448818897638, "duration": 0.25 }, { "name": "A#4", "midi": 70, "time": 43.625, "velocity": 0.48031496062992124, "duration": 0.125 }, { "name": "G#4", "midi": 68, "time": 43.75, "velocity": 0.41732283464566927, "duration": 0.125 }, { "name": "A#2", "midi": 46, "time": 43.75, "velocity": 0.5196850393700787, "duration": 0.25 }, { "name": "D3", "midi": 50, "time": 43.75, "velocity": 0.5196850393700787, "duration": 0.25 }, { "name": "G#3", "midi": 56, "time": 43.75, "velocity": 0.5196850393700787, "duration": 0.25 }, { "name": "F4", "midi": 65, "time": 43.875, "velocity": 0.4251968503937008, "duration": 0.09765625 }, { "name": "G3", "midi": 55, "time": 44, "velocity": 0.4409448818897638, "duration": 0.5 }, { "name": "D#3", "midi": 51, "time": 44, "velocity": 0.48031496062992124, "duration": 0.5 }, { "name": "G3", "midi": 55, "time": 44, "velocity": 0.48031496062992124, "duration": 0.5 }, { "name": "A#3", "midi": 58, "time": 44.75, "velocity": 0.44881889763779526, "duration": 0.25 }, { "name": "G3", "midi": 55, "time": 45, "velocity": 0.4566929133858268, "duration": 0.25 }, { "name": "A#3", "midi": 58, "time": 45.25, "velocity": 0.4881889763779528, "duration": 0.25 }, { "name": "G3", "midi": 55, "time": 45.5, "velocity": 0.48031496062992124, "duration": 0.25 }, { "name": "D#3", "midi": 51, "time": 45.75, "velocity": 0.44881889763779526, "duration": 0.19921875 }, { "name": "F3", "midi": 53, "time": 46, "velocity": 0.47244094488188976, "duration": 0.40234375 }, { "name": "G#3", "midi": 56, "time": 46, "velocity": 0.47244094488188976, "duration": 0.40234375 }, { "name": "D#3", "midi": 51, "time": 46, "velocity": 0.4015748031496063, "duration": 0.25 }, { "name": "A#1", "midi": 34, "time": 46, "velocity": 0.4645669291338583, "duration": 2 }, { "name": "D3", "midi": 50, "time": 46.25, "velocity": 0.49606299212598426, "duration": 0.19921875 }, { "name": "F3", "midi": 53, "time": 46.5, "velocity": 0.4645669291338583, "duration": 0.40234375 }, { "name": "G#3", "midi": 56, "time": 46.5, "velocity": 0.4645669291338583, "duration": 0.40234375 }, { "name": "D3", "midi": 50, "time": 46.5, "velocity": 0.44881889763779526, "duration": 0.25 }, { "name": "C3", "midi": 48, "time": 46.75, "velocity": 0.4645669291338583, "duration": 0.19921875 }, { "name": "F3", "midi": 53, "time": 47, "velocity": 0.4409448818897638, "duration": 0.40234375 }, { "name": "G#3", "midi": 56, "time": 47, "velocity": 0.4409448818897638, "duration": 0.40234375 }, { "name": "C3", "midi": 48, "time": 47, "velocity": 0.47244094488188976, "duration": 0.25 }, { "name": "B2", "midi": 47, "time": 47.25, "velocity": 0.47244094488188976, "duration": 0.19921875 }, { "name": "F3", "midi": 53, "time": 47.5, "velocity": 0.4409448818897638, "duration": 0.40234375 }, { "name": "G#3", "midi": 56, "time": 47.5, "velocity": 0.4409448818897638, "duration": 0.40234375 }, { "name": "B2", "midi": 47, "time": 47.5, "velocity": 0.48031496062992124, "duration": 0.25 }, { "name": "A#2", "midi": 46, "time": 47.75, "velocity": 0.4645669291338583, "duration": 0.19921875 }, { "name": "A#2", "midi": 46, "time": 48, "velocity": 0.4645669291338583, "duration": 0.5 }, { "name": "D#3", "midi": 51, "time": 48, "velocity": 0.4645669291338583, "duration": 0.5 }, { "name": "G3", "midi": 55, "time": 48, "velocity": 0.4645669291338583, "duration": 0.5 }, { "name": "D#2", "midi": 39, "time": 48, "velocity": 0.5039370078740157, "duration": 0.5 }, { "name": "A#2", "midi": 46, "time": 48.75, "velocity": 0.41732283464566927, "duration": 0.25 }, { "name": "G2", "midi": 43, "time": 49, "velocity": 0.4409448818897638, "duration": 0.25 }, { "name": "A#2", "midi": 46, "time": 49.25, "velocity": 0.5039370078740157, "duration": 0.25 }, { "name": "A#3", "midi": 58, "time": 49.5, "velocity": 0.4330708661417323, "duration": 0.375 }, { "name": "G2", "midi": 43, "time": 49.5, "velocity": 0.4645669291338583, "duration": 0.25 }, { "name": "D#2", "midi": 39, "time": 49.75, "velocity": 0.4330708661417323, "duration": 0.19921875 }, { "name": "D#4", "midi": 63, "time": 49.875, "velocity": 0.5433070866141733, "duration": 0.09765625 }, { "name": "D#4", "midi": 63, "time": 50, "velocity": 0.48031496062992124, "duration": 0.25 }, { "name": "F3", "midi": 53, "time": 50, "velocity": 0.5118110236220472, "duration": 0.90234375 }, { "name": "G#3", "midi": 56, "time": 50, "velocity": 0.5118110236220472, "duration": 0.90234375 }, { "name": "A#1", "midi": 34, "time": 50, "velocity": 0.4409448818897638, "duration": 1 }, { "name": "D4", "midi": 62, "time": 50.25, "velocity": 0.49606299212598426, "duration": 0.19921875 }, { "name": "D4", "midi": 62, "time": 50.5, "velocity": 0.4566929133858268, "duration": 0.25 }, { "name": "C4", "midi": 60, "time": 50.75, "velocity": 0.5275590551181102, "duration": 0.19921875 }, { "name": "C4", "midi": 60, "time": 51, "velocity": 0.49606299212598426, "duration": 0.25 }, { "name": "F3", "midi": 53, "time": 51, "velocity": 0.47244094488188976, "duration": 0.90234375 }, { "name": "G#3", "midi": 56, "time": 51, "velocity": 0.47244094488188976, "duration": 0.90234375 }, { "name": "A#2", "midi": 46, "time": 51, "velocity": 0.5590551181102362, "duration": 1 }, { "name": "B3", "midi": 59, "time": 51.25, "velocity": 0.44881889763779526, "duration": 0.19921875 }, { "name": "B3", "midi": 59, "time": 51.5, "velocity": 0.4881889763779528, "duration": 0.25 }, { "name": "A#3", "midi": 58, "time": 51.75, "velocity": 0.5118110236220472, "duration": 0.19921875 }, { "name": "G3", "midi": 55, "time": 52, "velocity": 0.5039370078740157, "duration": 3.90234375 }, { "name": "A#3", "midi": 58, "time": 52, "velocity": 0.5039370078740157, "duration": 6 }, { "name": "F3", "midi": 53, "time": 52, "velocity": 0.4330708661417323, "duration": 0.25 }, { "name": "D#2", "midi": 39, "time": 52, "velocity": 0.44881889763779526, "duration": 4 }, { "name": "E3", "midi": 52, "time": 52.25, "velocity": 0.4566929133858268, "duration": 0.19921875 }, { "name": "E3", "midi": 52, "time": 52.5, "velocity": 0.5196850393700787, "duration": 0.25 }, { "name": "D#3", "midi": 51, "time": 52.75, "velocity": 0.5590551181102362, "duration": 0.19921875 }, { "name": "D#3", "midi": 51, "time": 53, "velocity": 0.6299212598425197, "duration": 0.25 }, { "name": "D3", "midi": 50, "time": 53.25, "velocity": 0.6456692913385826, "duration": 0.19921875 }, { "name": "D3", "midi": 50, "time": 53.5, "velocity": 0.7086614173228346, "duration": 0.25 }, { "name": "D#3", "midi": 51, "time": 53.75, "velocity": 0.7795275590551181, "duration": 0.19921875 }, { "name": "D#3", "midi": 51, "time": 54, "velocity": 0.7637795275590551, "duration": 0.25 }, { "name": "E3", "midi": 52, "time": 54.25, "velocity": 0.7401574803149606, "duration": 0.19921875 }, { "name": "E3", "midi": 52, "time": 54.5, "velocity": 0.7086614173228346, "duration": 0.25 }, { "name": "D#3", "midi": 51, "time": 54.75, "velocity": 0.5984251968503937, "duration": 0.19921875 }, { "name": "D#3", "midi": 51, "time": 55, "velocity": 0.3937007874015748, "duration": 0.25 }, { "name": "D3", "midi": 50, "time": 55.25, "velocity": 0.3700787401574803, "duration": 0.19921875 }, { "name": "D3", "midi": 50, "time": 55.5, "velocity": 0.3779527559055118, "duration": 0.25 }, { "name": "C#3", "midi": 49, "time": 55.75, "velocity": 0.33858267716535434, "duration": 0.19921875 }, { "name": "C4", "midi": 60, "time": 56, "velocity": 0.49606299212598426, "duration": 1 }, { "name": "C3", "midi": 48, "time": 56, "velocity": 0.5039370078740157, "duration": 0.25 }, { "name": "G#3", "midi": 56, "time": 56, "velocity": 0.5039370078740157, "duration": 0.25 }, { "name": "G#1", "midi": 32, "time": 56, "velocity": 0.5196850393700787, "duration": 1 }, { "name": "G#2", "midi": 44, "time": 56, "velocity": 0.5196850393700787, "duration": 1 }, { "name": "D#3", "midi": 51, "time": 56.25, "velocity": 0.4409448818897638, "duration": 0.25 }, { "name": "G#3", "midi": 56, "time": 56.5, "velocity": 0.5118110236220472, "duration": 0.25 }, { "name": "D#3", "midi": 51, "time": 56.75, "velocity": 0.48031496062992124, "duration": 0.25 }, { "name": "G3", "midi": 55, "time": 57, "velocity": 0.48031496062992124, "duration": 0.25 }, { "name": "C#3", "midi": 49, "time": 57, "velocity": 0.5511811023622047, "duration": 1 }, { "name": "D#3", "midi": 51, "time": 57.25, "velocity": 0.48031496062992124, "duration": 0.25 }, { "name": "G3", "midi": 55, "time": 57.5, "velocity": 0.47244094488188976, "duration": 0.25 }, { "name": "D#3", "midi": 51, "time": 57.75, "velocity": 0.4566929133858268, "duration": 0.25 }, { "name": "D#4", "midi": 63, "time": 58, "velocity": 0.5826771653543307, "duration": 1.5 }, { "name": "G#3", "midi": 56, "time": 58, "velocity": 0.5275590551181102, "duration": 0.25 }, { "name": "C3", "midi": 48, "time": 58, "velocity": 0.48031496062992124, "duration": 1 }, { "name": "D#3", "midi": 51, "time": 58.25, "velocity": 0.44881889763779526, "duration": 0.25 }, { "name": "G#3", "midi": 56, "time": 58.5, "velocity": 0.5196850393700787, "duration": 0.25 }, { "name": "D#3", "midi": 51, "time": 58.75, "velocity": 0.3937007874015748, "duration": 0.25 }, { "name": "A#3", "midi": 58, "time": 59, "velocity": 0.5118110236220472, "duration": 0.25 }, { "name": "G2", "midi": 43, "time": 59, "velocity": 0.4409448818897638, "duration": 0.90234375 }, { "name": "D#3", "midi": 51, "time": 59.25, "velocity": 0.47244094488188976, "duration": 0.25 }, { "name": "C#4", "midi": 61, "time": 59.5, "velocity": 0.48031496062992124, "duration": 0.40234375 }, { "name": "A#3", "midi": 58, "time": 59.5, "velocity": 0.5039370078740157, "duration": 0.19921875 }, { "name": "D#3", "midi": 51, "time": 59.75, "velocity": 0.41732283464566927, "duration": 0.25 }, { "name": "C4", "midi": 60, "time": 60, "velocity": 0.48031496062992124, "duration": 0.5 }, { "name": "G#3", "midi": 56, "time": 60, "velocity": 0.49606299212598426, "duration": 0.25 }, { "name": "G#2", "midi": 44, "time": 60, "velocity": 0.5196850393700787, "duration": 0.5 }, { "name": "D#3", "midi": 51, "time": 60.25, "velocity": 0.44881889763779526, "duration": 0.25 }, { "name": "D#4", "midi": 63, "time": 60.5, "velocity": 0.5118110236220472, "duration": 0.5 }, { "name": "A#3", "midi": 58, "time": 60.5, "velocity": 0.5669291338582677, "duration": 0.25 }, { "name": "G2", "midi": 43, "time": 60.5, "velocity": 0.41732283464566927, "duration": 0.5 }, { "name": "D#3", "midi": 51, "time": 60.75, "velocity": 0.41732283464566927, "duration": 0.25 }, { "name": "G#4", "midi": 68, "time": 61, "velocity": 0.5118110236220472, "duration": 0.5 }, { "name": "C4", "midi": 60, "time": 61, "velocity": 0.6062992125984252, "duration": 0.25 }, { "name": "F2", "midi": 41, "time": 61, "velocity": 0.4881889763779528, "duration": 0.5 }, { "name": "G#3", "midi": 56, "time": 61.25, "velocity": 0.4251968503937008, "duration": 0.25 }, { "name": "A#4", "midi": 70, "time": 61.5, "velocity": 0.5275590551181102, "duration": 0.3203125 }, { "name": "D4", "midi": 62, "time": 61.5, "velocity": 0.5511811023622047, "duration": 0.19921875 }, { "name": "F3", "midi": 53, "time": 61.5, "velocity": 0.5511811023622047, "duration": 0.40234375 }, { "name": "G#3", "midi": 56, "time": 61.75, "velocity": 0.44881889763779526, "duration": 0.19921875 }, { "name": "D#4", "midi": 63, "time": 62, "velocity": 0.4015748031496063, "duration": 1.5 }, { "name": "G3", "midi": 55, "time": 62, "velocity": 0.4409448818897638, "duration": 0.25 }, { "name": "D#3", "midi": 51, "time": 62, "velocity": 0.4330708661417323, "duration": 1 }, { "name": "A#3", "midi": 58, "time": 62.25, "velocity": 0.4566929133858268, "duration": 0.25 }, { "name": "G3", "midi": 55, "time": 62.5, "velocity": 0.47244094488188976, "duration": 0.25 }, { "name": "A#3", "midi": 58, "time": 62.75, "velocity": 0.49606299212598426, "duration": 0.25 }, { "name": "G3", "midi": 55, "time": 63, "velocity": 0.4566929133858268, "duration": 0.25 }, { "name": "D#2", "midi": 39, "time": 63, "velocity": 0.4409448818897638, "duration": 1 }, { "name": "A#3", "midi": 58, "time": 63.25, "velocity": 0.4881889763779528, "duration": 0.25 }, { "name": "E4", "midi": 64, "time": 63.5, "velocity": 0.4566929133858268, "duration": 0.5 }, { "name": "G3", "midi": 55, "time": 63.5, "velocity": 0.4409448818897638, "duration": 0.25 }, { "name": "A#3", "midi": 58, "time": 63.75, "velocity": 0.5275590551181102, "duration": 0.25 }, { "name": "F4", "midi": 65, "time": 64, "velocity": 0.48031496062992124, "duration": 0.90234375 }, { "name": "G3", "midi": 55, "time": 64, "velocity": 0.4566929133858268, "duration": 0.19921875 }, { "name": "C#2", "midi": 37, "time": 64, "velocity": 0.47244094488188976, "duration": 1 }, { "name": "A#3", "midi": 58, "time": 64.25, "velocity": 0.4409448818897638, "duration": 0.25 }, { "name": "G3", "midi": 55, "time": 64.5, "velocity": 0.44881889763779526, "duration": 0.25 }, { "name": "A#3", "midi": 58, "time": 64.75, "velocity": 0.49606299212598426, "duration": 0.25 }, { "name": "A#3", "midi": 58, "time": 65, "velocity": 0.4645669291338583, "duration": 0.75 }, { "name": "G3", "midi": 55, "time": 65, "velocity": 0.4645669291338583, "duration": 0.25 }, { "name": "C#3", "midi": 49, "time": 65, "velocity": 0.5354330708661418, "duration": 0.90234375 }, { "name": "D#3", "midi": 51, "time": 65.25, "velocity": 0.44881889763779526, "duration": 0.25 }, { "name": "G3", "midi": 55, "time": 65.5, "velocity": 0.5196850393700787, "duration": 0.25 }, { "name": "C4", "midi": 60, "time": 65.75, "velocity": 0.47244094488188976, "duration": 0.125 }, { "name": "D#3", "midi": 51, "time": 65.75, "velocity": 0.4566929133858268, "duration": 0.19921875 }, { "name": "C#4", "midi": 61, "time": 65.875, "velocity": 0.4645669291338583, "duration": 0.09765625 }, { "name": "D#4", "midi": 63, "time": 66, "velocity": 0.5354330708661418, "duration": 1 }, { "name": "G#3", "midi": 56, "time": 66, "velocity": 0.5196850393700787, "duration": 0.25 }, { "name": "C3", "midi": 48, "time": 66, "velocity": 0.48031496062992124, "duration": 1 }, { "name": "D#3", "midi": 51, "time": 66.25, "velocity": 0.4251968503937008, "duration": 0.25 }, { "name": "G#3", "midi": 56, "time": 66.5, "velocity": 0.48031496062992124, "duration": 0.25 }, { "name": "D#3", "midi": 51, "time": 66.75, "velocity": 0.4094488188976378, "duration": 0.25 }, { "name": "A3", "midi": 57, "time": 67, "velocity": 0.4251968503937008, "duration": 1 }, { "name": "D#3", "midi": 51, "time": 67, "velocity": 0.5039370078740157, "duration": 0.25 }, { "name": "F2", "midi": 41, "time": 67, "velocity": 0.4409448818897638, "duration": 1 }, { "name": "C3", "midi": 48, "time": 67.25, "velocity": 0.4251968503937008, "duration": 0.25 }, { "name": "D#3", "midi": 51, "time": 67.5, "velocity": 0.47244094488188976, "duration": 0.25 }, { "name": "C3", "midi": 48, "time": 67.75, "velocity": 0.41732283464566927, "duration": 0.25 }, { "name": "C#4", "midi": 61, "time": 68, "velocity": 0.5118110236220472, "duration": 0.90234375 }, { "name": "F3", "midi": 53, "time": 68, "velocity": 0.5354330708661418, "duration": 0.19921875 }, { "name": "A#1", "midi": 34, "time": 68, "velocity": 0.4330708661417323, "duration": 1 }, { "name": "C#3", "midi": 49, "time": 68.25, "velocity": 0.4566929133858268, "duration": 0.25 }, { "name": "F3", "midi": 53, "time": 68.5, "velocity": 0.49606299212598426, "duration": 0.25 }, { "name": "C#3", "midi": 49, "time": 68.75, "velocity": 0.44881889763779526, "duration": 0.25 }, { "name": "C4", "midi": 60, "time": 69, "velocity": 0.4409448818897638, "duration": 0.12109375 }, { "name": "C#3", "midi": 49, "time": 69, "velocity": 0.48031496062992124, "duration": 0.25 }, { "name": "D#2", "midi": 39, "time": 69, "velocity": 0.4881889763779528, "duration": 0.90234375 }, { "name": "A#3", "midi": 58, "time": 69.25, "velocity": 0.4409448818897638, "duration": 0.12109375 }, { "name": "C#3", "midi": 49, "time": 69.25, "velocity": 0.48031496062992124, "duration": 0.25 }, { "name": "G#3", "midi": 56, "time": 69.5, "velocity": 0.4251968503937008, "duration": 0.12109375 }, { "name": "C#3", "midi": 49, "time": 69.5, "velocity": 0.47244094488188976, "duration": 0.25 }, { "name": "G3", "midi": 55, "time": 69.75, "velocity": 0.44881889763779526, "duration": 0.09375 }, { "name": "C#3", "midi": 49, "time": 69.75, "velocity": 0.47244094488188976, "duration": 0.19921875 }, { "name": "G3", "midi": 55, "time": 70, "velocity": 0.48031496062992124, "duration": 1 }, { "name": "A#3", "midi": 58, "time": 70, "velocity": 0.48031496062992124, "duration": 1 }, { "name": "C#3", "midi": 49, "time": 70, "velocity": 0.47244094488188976, "duration": 0.25 }, { "name": "G#1", "midi": 32, "time": 70, "velocity": 0.4645669291338583, "duration": 0.5 }, { "name": "D#3", "midi": 51, "time": 70.25, "velocity": 0.5118110236220472, "duration": 0.25 }, { "name": "C#3", "midi": 49, "time": 70.5, "velocity": 0.48031496062992124, "duration": 0.25 }, { "name": "G#2", "midi": 44, "time": 70.5, "velocity": 0.5039370078740157, "duration": 0.5 }, { "name": "D#3", "midi": 51, "time": 70.75, "velocity": 0.5275590551181102, "duration": 0.25 }, { "name": "G#3", "midi": 56, "time": 71, "velocity": 0.4645669291338583, "duration": 0.3203125 }, { "name": "C3", "midi": 48, "time": 71, "velocity": 0.4566929133858268, "duration": 0.3203125 }, { "name": "G#1", "midi": 32, "time": 71, "velocity": 0.4251968503937008, "duration": 0.5 }, { "name": "D#4", "midi": 63, "time": 71.5, "velocity": 0.5669291338582677, "duration": 0.5 }, { "name": "G#4", "midi": 68, "time": 72, "velocity": 0.5748031496062992, "duration": 0.5 }, { "name": "B3", "midi": 59, "time": 72, "velocity": 0.47244094488188976, "duration": 0.1640625 }, { "name": "D#4", "midi": 63, "time": 72, "velocity": 0.47244094488188976, "duration": 0.1640625 }, { "name": "G#2", "midi": 44, "time": 72, "velocity": 0.4330708661417323, "duration": 1 }, { "name": "G#3", "midi": 56, "time": 72, "velocity": 0.4330708661417323, "duration": 1 }, { "name": "B3", "midi": 59, "time": 72.1640625, "velocity": 0.3858267716535433, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 72.1640625, "velocity": 0.3858267716535433, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 72.33203125, "velocity": 0.3858267716535433, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 72.33203125, "velocity": 0.3858267716535433, "duration": 0.16796875 }, { "name": "B4", "midi": 71, "time": 72.5, "velocity": 0.5275590551181102, "duration": 0.5 }, { "name": "B3", "midi": 59, "time": 72.5, "velocity": 0.41732283464566927, "duration": 0.1640625 }, { "name": "D#4", "midi": 63, "time": 72.5, "velocity": 0.41732283464566927, "duration": 0.1640625 }, { "name": "B3", "midi": 59, "time": 72.6640625, "velocity": 0.3700787401574803, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 72.6640625, "velocity": 0.3700787401574803, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 72.83203125, "velocity": 0.4251968503937008, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 72.83203125, "velocity": 0.4251968503937008, "duration": 0.16796875 }, { "name": "A#4", "midi": 70, "time": 73, "velocity": 0.47244094488188976, "duration": 0.5 }, { "name": "B3", "midi": 59, "time": 73, "velocity": 0.41732283464566927, "duration": 0.1640625 }, { "name": "D#4", "midi": 63, "time": 73, "velocity": 0.41732283464566927, "duration": 0.1640625 }, { "name": "B3", "midi": 59, "time": 73.1640625, "velocity": 0.4015748031496063, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 73.1640625, "velocity": 0.4015748031496063, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 73.33203125, "velocity": 0.4094488188976378, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 73.33203125, "velocity": 0.4094488188976378, "duration": 0.16796875 }, { "name": "G#4", "midi": 68, "time": 73.5, "velocity": 0.48031496062992124, "duration": 0.40234375 }, { "name": "B3", "midi": 59, "time": 73.5, "velocity": 0.3779527559055118, "duration": 0.12890625 }, { "name": "D#4", "midi": 63, "time": 73.5, "velocity": 0.3779527559055118, "duration": 0.12890625 }, { "name": "B3", "midi": 59, "time": 73.6640625, "velocity": 0.4015748031496063, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 73.6640625, "velocity": 0.4015748031496063, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 73.83203125, "velocity": 0.3937007874015748, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 73.83203125, "velocity": 0.3937007874015748, "duration": 0.16796875 }, { "name": "G4", "midi": 67, "time": 74, "velocity": 0.4409448818897638, "duration": 0.5 }, { "name": "C#4", "midi": 61, "time": 74, "velocity": 0.3700787401574803, "duration": 0.1640625 }, { "name": "D#4", "midi": 63, "time": 74, "velocity": 0.3700787401574803, "duration": 0.1640625 }, { "name": "A#3", "midi": 58, "time": 74, "velocity": 0.4251968503937008, "duration": 0.6640625 }, { "name": "C#4", "midi": 61, "time": 74.1640625, "velocity": 0.3779527559055118, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 74.1640625, "velocity": 0.3779527559055118, "duration": 0.16796875 }, { "name": "C#4", "midi": 61, "time": 74.33203125, "velocity": 0.4094488188976378, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 74.33203125, "velocity": 0.4094488188976378, "duration": 0.16796875 }, { "name": "C#5", "midi": 73, "time": 74.5, "velocity": 0.5826771653543307, "duration": 0.40234375 }, { "name": "C#4", "midi": 61, "time": 74.5, "velocity": 0.36220472440944884, "duration": 0.12890625 }, { "name": "D#4", "midi": 63, "time": 74.5, "velocity": 0.36220472440944884, "duration": 0.12890625 }, { "name": "C#4", "midi": 61, "time": 74.6640625, "velocity": 0.3858267716535433, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 74.6640625, "velocity": 0.3858267716535433, "duration": 0.16796875 }, { "name": "A#3", "midi": 58, "time": 74.6640625, "velocity": 0.5039370078740157, "duration": 0.16796875 }, { "name": "C#4", "midi": 61, "time": 74.83203125, "velocity": 0.3700787401574803, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 74.83203125, "velocity": 0.3700787401574803, "duration": 0.16796875 }, { "name": "A3", "midi": 57, "time": 74.83203125, "velocity": 0.4330708661417323, "duration": 0.1328125 }, { "name": "C#4", "midi": 61, "time": 75, "velocity": 0.36220472440944884, "duration": 0.1640625 }, { "name": "D#4", "midi": 63, "time": 75, "velocity": 0.36220472440944884, "duration": 0.1640625 }, { "name": "A#3", "midi": 58, "time": 75, "velocity": 0.4645669291338583, "duration": 0.078125 }, { "name": "C#4", "midi": 61, "time": 75.1640625, "velocity": 0.4094488188976378, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 75.1640625, "velocity": 0.4094488188976378, "duration": 0.16796875 }, { "name": "A#3", "midi": 58, "time": 75.1640625, "velocity": 0.4881889763779528, "duration": 0.08203125 }, { "name": "C#4", "midi": 61, "time": 75.33203125, "velocity": 0.3700787401574803, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 75.33203125, "velocity": 0.3700787401574803, "duration": 0.16796875 }, { "name": "G#3", "midi": 56, "time": 75.33203125, "velocity": 0.4645669291338583, "duration": 0.08203125 }, { "name": "C#4", "midi": 61, "time": 75.5, "velocity": 0.41732283464566927, "duration": 0.1640625 }, { "name": "D#4", "midi": 63, "time": 75.5, "velocity": 0.41732283464566927, "duration": 0.1640625 }, { "name": "G3", "midi": 55, "time": 75.5, "velocity": 0.44881889763779526, "duration": 0.078125 }, { "name": "C#4", "midi": 61, "time": 75.6640625, "velocity": 0.41732283464566927, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 75.6640625, "velocity": 0.41732283464566927, "duration": 0.16796875 }, { "name": "F3", "midi": 53, "time": 75.6640625, "velocity": 0.4409448818897638, "duration": 0.08203125 }, { "name": "C#4", "midi": 61, "time": 75.83203125, "velocity": 0.41732283464566927, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 75.83203125, "velocity": 0.41732283464566927, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 75.83203125, "velocity": 0.4566929133858268, "duration": 0.08203125 }, { "name": "G#4", "midi": 68, "time": 76, "velocity": 0.4251968503937008, "duration": 0.5 }, { "name": "B3", "midi": 59, "time": 76, "velocity": 0.3858267716535433, "duration": 0.1640625 }, { "name": "D#4", "midi": 63, "time": 76, "velocity": 0.3858267716535433, "duration": 0.1640625 }, { "name": "G#3", "midi": 56, "time": 76, "velocity": 0.5354330708661418, "duration": 0.5 }, { "name": "B3", "midi": 59, "time": 76.1640625, "velocity": 0.3937007874015748, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 76.1640625, "velocity": 0.3937007874015748, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 76.33203125, "velocity": 0.3937007874015748, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 76.33203125, "velocity": 0.3937007874015748, "duration": 0.16796875 }, { "name": "B4", "midi": 71, "time": 76.5, "velocity": 0.49606299212598426, "duration": 0.5 }, { "name": "B3", "midi": 59, "time": 76.5, "velocity": 0.4251968503937008, "duration": 0.1640625 }, { "name": "D#4", "midi": 63, "time": 76.5, "velocity": 0.4251968503937008, "duration": 0.1640625 }, { "name": "B3", "midi": 59, "time": 76.6640625, "velocity": 0.3858267716535433, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 76.6640625, "velocity": 0.3858267716535433, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 76.83203125, "velocity": 0.4094488188976378, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 76.83203125, "velocity": 0.4094488188976378, "duration": 0.16796875 }, { "name": "A#4", "midi": 70, "time": 77, "velocity": 0.4251968503937008, "duration": 0.5 }, { "name": "B3", "midi": 59, "time": 77, "velocity": 0.3779527559055118, "duration": 0.1640625 }, { "name": "D#4", "midi": 63, "time": 77, "velocity": 0.3779527559055118, "duration": 0.1640625 }, { "name": "B3", "midi": 59, "time": 77.1640625, "velocity": 0.4094488188976378, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 77.1640625, "velocity": 0.4094488188976378, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 77.33203125, "velocity": 0.41732283464566927, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 77.33203125, "velocity": 0.41732283464566927, "duration": 0.16796875 }, { "name": "G#4", "midi": 68, "time": 77.5, "velocity": 0.41732283464566927, "duration": 0.40234375 }, { "name": "B3", "midi": 59, "time": 77.5, "velocity": 0.41732283464566927, "duration": 0.12890625 }, { "name": "D#4", "midi": 63, "time": 77.5, "velocity": 0.41732283464566927, "duration": 0.12890625 }, { "name": "B3", "midi": 59, "time": 77.6640625, "velocity": 0.4015748031496063, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 77.6640625, "velocity": 0.4015748031496063, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 77.83203125, "velocity": 0.3464566929133858, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 77.83203125, "velocity": 0.3464566929133858, "duration": 0.16796875 }, { "name": "G#4", "midi": 68, "time": 78, "velocity": 0.4566929133858268, "duration": 0.5 }, { "name": "A#3", "midi": 58, "time": 78, "velocity": 0.4094488188976378, "duration": 0.1640625 }, { "name": "D#4", "midi": 63, "time": 78, "velocity": 0.4094488188976378, "duration": 0.1640625 }, { "name": "D#3", "midi": 51, "time": 78, "velocity": 0.4330708661417323, "duration": 0.6640625 }, { "name": "A#3", "midi": 58, "time": 78.1640625, "velocity": 0.4015748031496063, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 78.1640625, "velocity": 0.4015748031496063, "duration": 0.16796875 }, { "name": "A#3", "midi": 58, "time": 78.33203125, "velocity": 0.3779527559055118, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 78.33203125, "velocity": 0.3779527559055118, "duration": 0.16796875 }, { "name": "G4", "midi": 67, "time": 78.5, "velocity": 0.4566929133858268, "duration": 0.40234375 }, { "name": "A#3", "midi": 58, "time": 78.5, "velocity": 0.3700787401574803, "duration": 0.12890625 }, { "name": "D#4", "midi": 63, "time": 78.5, "velocity": 0.3700787401574803, "duration": 0.12890625 }, { "name": "A#3", "midi": 58, "time": 78.6640625, "velocity": 0.3937007874015748, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 78.6640625, "velocity": 0.3937007874015748, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 78.6640625, "velocity": 0.4409448818897638, "duration": 0.16796875 }, { "name": "A#3", "midi": 58, "time": 78.83203125, "velocity": 0.3779527559055118, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 78.83203125, "velocity": 0.3779527559055118, "duration": 0.16796875 }, { "name": "D3", "midi": 50, "time": 78.83203125, "velocity": 0.4409448818897638, "duration": 0.1328125 }, { "name": "G3", "midi": 55, "time": 79, "velocity": 0.41732283464566927, "duration": 0.1640625 }, { "name": "A#3", "midi": 58, "time": 79, "velocity": 0.41732283464566927, "duration": 0.1640625 }, { "name": "D#4", "midi": 63, "time": 79, "velocity": 0.41732283464566927, "duration": 0.1640625 }, { "name": "D#3", "midi": 51, "time": 79, "velocity": 0.49606299212598426, "duration": 0.078125 }, { "name": "G3", "midi": 55, "time": 79.1640625, "velocity": 0.3779527559055118, "duration": 0.16796875 }, { "name": "A#3", "midi": 58, "time": 79.1640625, "velocity": 0.3779527559055118, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 79.1640625, "velocity": 0.3779527559055118, "duration": 0.16796875 }, { "name": "E3", "midi": 52, "time": 79.1640625, "velocity": 0.4881889763779528, "duration": 0.08203125 }, { "name": "G3", "midi": 55, "time": 79.33203125, "velocity": 0.3700787401574803, "duration": 0.16796875 }, { "name": "A#3", "midi": 58, "time": 79.33203125, "velocity": 0.3700787401574803, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 79.33203125, "velocity": 0.3700787401574803, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 79.33203125, "velocity": 0.4881889763779528, "duration": 0.08203125 }, { "name": "G3", "midi": 55, "time": 79.5, "velocity": 0.3858267716535433, "duration": 0.1640625 }, { "name": "A#3", "midi": 58, "time": 79.5, "velocity": 0.3858267716535433, "duration": 0.1640625 }, { "name": "D#4", "midi": 63, "time": 79.5, "velocity": 0.3858267716535433, "duration": 0.1640625 }, { "name": "C#3", "midi": 49, "time": 79.5, "velocity": 0.49606299212598426, "duration": 0.078125 }, { "name": "G3", "midi": 55, "time": 79.6640625, "velocity": 0.3700787401574803, "duration": 0.16796875 }, { "name": "A#3", "midi": 58, "time": 79.6640625, "velocity": 0.3700787401574803, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 79.6640625, "velocity": 0.3700787401574803, "duration": 0.16796875 }, { "name": "B2", "midi": 47, "time": 79.6640625, "velocity": 0.47244094488188976, "duration": 0.08203125 }, { "name": "G3", "midi": 55, "time": 79.83203125, "velocity": 0.4094488188976378, "duration": 0.16796875 }, { "name": "A#3", "midi": 58, "time": 79.83203125, "velocity": 0.4094488188976378, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 79.83203125, "velocity": 0.4094488188976378, "duration": 0.16796875 }, { "name": "A#2", "midi": 46, "time": 79.83203125, "velocity": 0.48031496062992124, "duration": 0.08203125 }, { "name": "G#4", "midi": 68, "time": 80, "velocity": 0.44881889763779526, "duration": 0.5 }, { "name": "B3", "midi": 59, "time": 80, "velocity": 0.3700787401574803, "duration": 0.1640625 }, { "name": "D#4", "midi": 63, "time": 80, "velocity": 0.3700787401574803, "duration": 0.1640625 }, { "name": "G#2", "midi": 44, "time": 80, "velocity": 0.4566929133858268, "duration": 0.5 }, { "name": "B3", "midi": 59, "time": 80.1640625, "velocity": 0.41732283464566927, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 80.1640625, "velocity": 0.41732283464566927, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 80.33203125, "velocity": 0.36220472440944884, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 80.33203125, "velocity": 0.36220472440944884, "duration": 0.16796875 }, { "name": "B4", "midi": 71, "time": 80.5, "velocity": 0.5039370078740157, "duration": 0.5 }, { "name": "B3", "midi": 59, "time": 80.5, "velocity": 0.3937007874015748, "duration": 0.1640625 }, { "name": "D#4", "midi": 63, "time": 80.5, "velocity": 0.3937007874015748, "duration": 0.1640625 }, { "name": "B3", "midi": 59, "time": 80.6640625, "velocity": 0.41732283464566927, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 80.6640625, "velocity": 0.41732283464566927, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 80.83203125, "velocity": 0.4094488188976378, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 80.83203125, "velocity": 0.4094488188976378, "duration": 0.16796875 }, { "name": "A#4", "midi": 70, "time": 81, "velocity": 0.4566929133858268, "duration": 0.5 }, { "name": "B3", "midi": 59, "time": 81, "velocity": 0.4015748031496063, "duration": 0.1640625 }, { "name": "D#4", "midi": 63, "time": 81, "velocity": 0.4015748031496063, "duration": 0.1640625 }, { "name": "B3", "midi": 59, "time": 81.1640625, "velocity": 0.4094488188976378, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 81.1640625, "velocity": 0.4094488188976378, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 81.33203125, "velocity": 0.4015748031496063, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 81.33203125, "velocity": 0.4015748031496063, "duration": 0.16796875 }, { "name": "G#4", "midi": 68, "time": 81.5, "velocity": 0.4409448818897638, "duration": 0.40234375 }, { "name": "B3", "midi": 59, "time": 81.5, "velocity": 0.3937007874015748, "duration": 0.12890625 }, { "name": "D#4", "midi": 63, "time": 81.5, "velocity": 0.3937007874015748, "duration": 0.12890625 }, { "name": "B3", "midi": 59, "time": 81.6640625, "velocity": 0.4094488188976378, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 81.6640625, "velocity": 0.4094488188976378, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 81.83203125, "velocity": 0.4094488188976378, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 81.83203125, "velocity": 0.4094488188976378, "duration": 0.16796875 }, { "name": "F#4", "midi": 66, "time": 82, "velocity": 0.7401574803149606, "duration": 0.5 }, { "name": "F#5", "midi": 78, "time": 82, "velocity": 0.7401574803149606, "duration": 0.6640625 }, { "name": "A2", "midi": 45, "time": 82, "velocity": 0.5590551181102362, "duration": 0.1640625 }, { "name": "B2", "midi": 47, "time": 82, "velocity": 0.5590551181102362, "duration": 0.1640625 }, { "name": "D#3", "midi": 51, "time": 82, "velocity": 0.5590551181102362, "duration": 0.1640625 }, { "name": "F#3", "midi": 54, "time": 82, "velocity": 0.5590551181102362, "duration": 0.1640625 }, { "name": "A2", "midi": 45, "time": 82.1640625, "velocity": 0.4409448818897638, "duration": 0.16796875 }, { "name": "B2", "midi": 47, "time": 82.1640625, "velocity": 0.4409448818897638, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 82.1640625, "velocity": 0.4409448818897638, "duration": 0.16796875 }, { "name": "F#3", "midi": 54, "time": 82.1640625, "velocity": 0.4409448818897638, "duration": 0.16796875 }, { "name": "A2", "midi": 45, "time": 82.33203125, "velocity": 0.47244094488188976, "duration": 0.16796875 }, { "name": "B2", "midi": 47, "time": 82.33203125, "velocity": 0.47244094488188976, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 82.33203125, "velocity": 0.47244094488188976, "duration": 0.16796875 }, { "name": "F#3", "midi": 54, "time": 82.33203125, "velocity": 0.47244094488188976, "duration": 0.16796875 }, { "name": "A2", "midi": 45, "time": 82.5, "velocity": 0.44881889763779526, "duration": 0.1640625 }, { "name": "B2", "midi": 47, "time": 82.5, "velocity": 0.44881889763779526, "duration": 0.1640625 }, { "name": "D#3", "midi": 51, "time": 82.5, "velocity": 0.44881889763779526, "duration": 0.1640625 }, { "name": "F#3", "midi": 54, "time": 82.5, "velocity": 0.44881889763779526, "duration": 0.1640625 }, { "name": "D#5", "midi": 75, "time": 82.6640625, "velocity": 0.41732283464566927, "duration": 0.08203125 }, { "name": "A2", "midi": 45, "time": 82.6640625, "velocity": 0.48031496062992124, "duration": 0.16796875 }, { "name": "B2", "midi": 47, "time": 82.6640625, "velocity": 0.48031496062992124, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 82.6640625, "velocity": 0.48031496062992124, "duration": 0.16796875 }, { "name": "F#3", "midi": 54, "time": 82.6640625, "velocity": 0.48031496062992124, "duration": 0.16796875 }, { "name": "B4", "midi": 71, "time": 82.83203125, "velocity": 0.41732283464566927, "duration": 0.08203125 }, { "name": "A2", "midi": 45, "time": 82.83203125, "velocity": 0.47244094488188976, "duration": 0.16796875 }, { "name": "B2", "midi": 47, "time": 82.83203125, "velocity": 0.47244094488188976, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 82.83203125, "velocity": 0.47244094488188976, "duration": 0.16796875 }, { "name": "F#3", "midi": 54, "time": 82.83203125, "velocity": 0.47244094488188976, "duration": 0.16796875 }, { "name": "B4", "midi": 71, "time": 83, "velocity": 0.7480314960629921, "duration": 0.5 }, { "name": "B5", "midi": 83, "time": 83, "velocity": 0.7480314960629921, "duration": 0.6640625 }, { "name": "G#2", "midi": 44, "time": 83, "velocity": 0.6535433070866141, "duration": 0.1640625 }, { "name": "B2", "midi": 47, "time": 83, "velocity": 0.6535433070866141, "duration": 0.1640625 }, { "name": "E3", "midi": 52, "time": 83, "velocity": 0.6535433070866141, "duration": 0.1640625 }, { "name": "G#3", "midi": 56, "time": 83, "velocity": 0.6535433070866141, "duration": 0.1640625 }, { "name": "G#2", "midi": 44, "time": 83.1640625, "velocity": 0.49606299212598426, "duration": 0.16796875 }, { "name": "B2", "midi": 47, "time": 83.1640625, "velocity": 0.49606299212598426, "duration": 0.16796875 }, { "name": "E3", "midi": 52, "time": 83.1640625, "velocity": 0.49606299212598426, "duration": 0.16796875 }, { "name": "G#3", "midi": 56, "time": 83.1640625, "velocity": 0.49606299212598426, "duration": 0.16796875 }, { "name": "G#2", "midi": 44, "time": 83.33203125, "velocity": 0.44881889763779526, "duration": 0.16796875 }, { "name": "B2", "midi": 47, "time": 83.33203125, "velocity": 0.44881889763779526, "duration": 0.16796875 }, { "name": "E3", "midi": 52, "time": 83.33203125, "velocity": 0.44881889763779526, "duration": 0.16796875 }, { "name": "G#3", "midi": 56, "time": 83.33203125, "velocity": 0.44881889763779526, "duration": 0.16796875 }, { "name": "G#2", "midi": 44, "time": 83.5, "velocity": 0.4566929133858268, "duration": 0.1640625 }, { "name": "B2", "midi": 47, "time": 83.5, "velocity": 0.4566929133858268, "duration": 0.1640625 }, { "name": "E3", "midi": 52, "time": 83.5, "velocity": 0.4566929133858268, "duration": 0.1640625 }, { "name": "G#3", "midi": 56, "time": 83.5, "velocity": 0.4566929133858268, "duration": 0.1640625 }, { "name": "G#5", "midi": 80, "time": 83.6640625, "velocity": 0.4566929133858268, "duration": 0.08203125 }, { "name": "G#2", "midi": 44, "time": 83.6640625, "velocity": 0.4645669291338583, "duration": 0.16796875 }, { "name": "B2", "midi": 47, "time": 83.6640625, "velocity": 0.4645669291338583, "duration": 0.16796875 }, { "name": "E3", "midi": 52, "time": 83.6640625, "velocity": 0.4645669291338583, "duration": 0.16796875 }, { "name": "G#3", "midi": 56, "time": 83.6640625, "velocity": 0.4645669291338583, "duration": 0.16796875 }, { "name": "E5", "midi": 76, "time": 83.83203125, "velocity": 0.4251968503937008, "duration": 0.08203125 }, { "name": "G#2", "midi": 44, "time": 83.83203125, "velocity": 0.48031496062992124, "duration": 0.16796875 }, { "name": "B2", "midi": 47, "time": 83.83203125, "velocity": 0.48031496062992124, "duration": 0.16796875 }, { "name": "E3", "midi": 52, "time": 83.83203125, "velocity": 0.48031496062992124, "duration": 0.16796875 }, { "name": "G#3", "midi": 56, "time": 83.83203125, "velocity": 0.48031496062992124, "duration": 0.16796875 }, { "name": "E5", "midi": 76, "time": 84, "velocity": 0.7559055118110236, "duration": 0.5 }, { "name": "E6", "midi": 88, "time": 84, "velocity": 0.7559055118110236, "duration": 0.6640625 }, { "name": "C#3", "midi": 49, "time": 84, "velocity": 0.6299212598425197, "duration": 0.1640625 }, { "name": "E3", "midi": 52, "time": 84, "velocity": 0.6299212598425197, "duration": 0.1640625 }, { "name": "F#3", "midi": 54, "time": 84, "velocity": 0.6299212598425197, "duration": 0.1640625 }, { "name": "A#3", "midi": 58, "time": 84, "velocity": 0.6299212598425197, "duration": 0.1640625 }, { "name": "C#3", "midi": 49, "time": 84.1640625, "velocity": 0.4330708661417323, "duration": 0.16796875 }, { "name": "E3", "midi": 52, "time": 84.1640625, "velocity": 0.4330708661417323, "duration": 0.16796875 }, { "name": "F#3", "midi": 54, "time": 84.1640625, "velocity": 0.4330708661417323, "duration": 0.16796875 }, { "name": "A#3", "midi": 58, "time": 84.1640625, "velocity": 0.4330708661417323, "duration": 0.16796875 }, { "name": "C#3", "midi": 49, "time": 84.33203125, "velocity": 0.4409448818897638, "duration": 0.16796875 }, { "name": "E3", "midi": 52, "time": 84.33203125, "velocity": 0.4409448818897638, "duration": 0.16796875 }, { "name": "F#3", "midi": 54, "time": 84.33203125, "velocity": 0.4409448818897638, "duration": 0.16796875 }, { "name": "A#3", "midi": 58, "time": 84.33203125, "velocity": 0.4409448818897638, "duration": 0.16796875 }, { "name": "C#3", "midi": 49, "time": 84.5, "velocity": 0.4645669291338583, "duration": 0.1640625 }, { "name": "E3", "midi": 52, "time": 84.5, "velocity": 0.4645669291338583, "duration": 0.1640625 }, { "name": "F#3", "midi": 54, "time": 84.5, "velocity": 0.4645669291338583, "duration": 0.1640625 }, { "name": "A#3", "midi": 58, "time": 84.5, "velocity": 0.4645669291338583, "duration": 0.1640625 }, { "name": "C#6", "midi": 85, "time": 84.6640625, "velocity": 0.47244094488188976, "duration": 0.08203125 }, { "name": "C#3", "midi": 49, "time": 84.6640625, "velocity": 0.5196850393700787, "duration": 0.16796875 }, { "name": "E3", "midi": 52, "time": 84.6640625, "velocity": 0.5196850393700787, "duration": 0.16796875 }, { "name": "F#3", "midi": 54, "time": 84.6640625, "velocity": 0.5196850393700787, "duration": 0.16796875 }, { "name": "A#3", "midi": 58, "time": 84.6640625, "velocity": 0.5196850393700787, "duration": 0.16796875 }, { "name": "A#5", "midi": 82, "time": 84.83203125, "velocity": 0.4251968503937008, "duration": 0.08203125 }, { "name": "C#3", "midi": 49, "time": 84.83203125, "velocity": 0.4409448818897638, "duration": 0.16796875 }, { "name": "E3", "midi": 52, "time": 84.83203125, "velocity": 0.4409448818897638, "duration": 0.16796875 }, { "name": "F#3", "midi": 54, "time": 84.83203125, "velocity": 0.4409448818897638, "duration": 0.16796875 }, { "name": "A#3", "midi": 58, "time": 84.83203125, "velocity": 0.4409448818897638, "duration": 0.16796875 }, { "name": "B4", "midi": 71, "time": 85, "velocity": 0.49606299212598426, "duration": 0.24609375 }, { "name": "B5", "midi": 83, "time": 85, "velocity": 0.49606299212598426, "duration": 0.24609375 }, { "name": "B2", "midi": 47, "time": 85, "velocity": 0.5118110236220472, "duration": 0.1640625 }, { "name": "E3", "midi": 52, "time": 85, "velocity": 0.5118110236220472, "duration": 0.1640625 }, { "name": "G#3", "midi": 56, "time": 85, "velocity": 0.5118110236220472, "duration": 0.1640625 }, { "name": "B3", "midi": 59, "time": 85, "velocity": 0.5118110236220472, "duration": 0.1640625 }, { "name": "B2", "midi": 47, "time": 85.1640625, "velocity": 0.47244094488188976, "duration": 0.16796875 }, { "name": "E3", "midi": 52, "time": 85.1640625, "velocity": 0.47244094488188976, "duration": 0.16796875 }, { "name": "G#3", "midi": 56, "time": 85.1640625, "velocity": 0.47244094488188976, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 85.1640625, "velocity": 0.47244094488188976, "duration": 0.16796875 }, { "name": "B2", "midi": 47, "time": 85.33203125, "velocity": 0.44881889763779526, "duration": 0.16796875 }, { "name": "E3", "midi": 52, "time": 85.33203125, "velocity": 0.44881889763779526, "duration": 0.16796875 }, { "name": "G#3", "midi": 56, "time": 85.33203125, "velocity": 0.44881889763779526, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 85.33203125, "velocity": 0.44881889763779526, "duration": 0.16796875 }, { "name": "F#3", "midi": 54, "time": 85.5, "velocity": 0.3543307086614173, "duration": 0.24609375 }, { "name": "A3", "midi": 57, "time": 85.5, "velocity": 0.3543307086614173, "duration": 0.24609375 }, { "name": "B3", "midi": 59, "time": 85.5, "velocity": 0.3543307086614173, "duration": 0.24609375 }, { "name": "D#4", "midi": 63, "time": 85.5, "velocity": 0.3543307086614173, "duration": 0.24609375 }, { "name": "B1", "midi": 35, "time": 85.5, "velocity": 0.4409448818897638, "duration": 0.1640625 }, { "name": "B2", "midi": 47, "time": 85.5, "velocity": 0.4409448818897638, "duration": 0.1640625 }, { "name": "B1", "midi": 35, "time": 85.6640625, "velocity": 0.4645669291338583, "duration": 0.16796875 }, { "name": "B2", "midi": 47, "time": 85.6640625, "velocity": 0.4645669291338583, "duration": 0.16796875 }, { "name": "B1", "midi": 35, "time": 85.83203125, "velocity": 0.48031496062992124, "duration": 0.16796875 }, { "name": "B2", "midi": 47, "time": 85.83203125, "velocity": 0.48031496062992124, "duration": 0.16796875 }, { "name": "G#3", "midi": 56, "time": 86, "velocity": 0.6220472440944882, "duration": 0.1640625 }, { "name": "B3", "midi": 59, "time": 86, "velocity": 0.6220472440944882, "duration": 0.1640625 }, { "name": "E4", "midi": 64, "time": 86, "velocity": 0.6220472440944882, "duration": 0.1640625 }, { "name": "E2", "midi": 40, "time": 86, "velocity": 0.6141732283464567, "duration": 0.5 }, { "name": "E3", "midi": 52, "time": 86, "velocity": 0.6141732283464567, "duration": 0.5 }, { "name": "G#3", "midi": 56, "time": 86.1640625, "velocity": 0.4330708661417323, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 86.1640625, "velocity": 0.4330708661417323, "duration": 0.16796875 }, { "name": "G#3", "midi": 56, "time": 86.33203125, "velocity": 0.47244094488188976, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 86.33203125, "velocity": 0.47244094488188976, "duration": 0.16796875 }, { "name": "G#3", "midi": 56, "time": 86.5, "velocity": 0.4881889763779528, "duration": 0.1640625 }, { "name": "B3", "midi": 59, "time": 86.5, "velocity": 0.4881889763779528, "duration": 0.1640625 }, { "name": "G#3", "midi": 56, "time": 86.6640625, "velocity": 0.4881889763779528, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 86.6640625, "velocity": 0.4881889763779528, "duration": 0.16796875 }, { "name": "G#3", "midi": 56, "time": 86.83203125, "velocity": 0.4566929133858268, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 86.83203125, "velocity": 0.4566929133858268, "duration": 0.16796875 }, { "name": "G#3", "midi": 56, "time": 87, "velocity": 0.4409448818897638, "duration": 0.1640625 }, { "name": "B3", "midi": 59, "time": 87, "velocity": 0.4409448818897638, "duration": 0.1640625 }, { "name": "G#3", "midi": 56, "time": 87.1640625, "velocity": 0.48031496062992124, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 87.1640625, "velocity": 0.48031496062992124, "duration": 0.16796875 }, { "name": "G#3", "midi": 56, "time": 87.33203125, "velocity": 0.4645669291338583, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 87.33203125, "velocity": 0.4645669291338583, "duration": 0.16796875 }, { "name": "G#3", "midi": 56, "time": 87.5, "velocity": 0.47244094488188976, "duration": 0.1640625 }, { "name": "B3", "midi": 59, "time": 87.5, "velocity": 0.47244094488188976, "duration": 0.1640625 }, { "name": "G#3", "midi": 56, "time": 87.6640625, "velocity": 0.48031496062992124, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 87.6640625, "velocity": 0.48031496062992124, "duration": 0.16796875 }, { "name": "G#3", "midi": 56, "time": 87.83203125, "velocity": 0.4881889763779528, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 87.83203125, "velocity": 0.4881889763779528, "duration": 0.16796875 }, { "name": "E4", "midi": 64, "time": 88, "velocity": 0.5196850393700787, "duration": 0.5 }, { "name": "G#3", "midi": 56, "time": 88, "velocity": 0.3543307086614173, "duration": 0.1640625 }, { "name": "B3", "midi": 59, "time": 88, "velocity": 0.3543307086614173, "duration": 0.1640625 }, { "name": "E2", "midi": 40, "time": 88, "velocity": 0.4881889763779528, "duration": 1 }, { "name": "E3", "midi": 52, "time": 88, "velocity": 0.4881889763779528, "duration": 1 }, { "name": "G#3", "midi": 56, "time": 88.1640625, "velocity": 0.3937007874015748, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 88.1640625, "velocity": 0.3937007874015748, "duration": 0.16796875 }, { "name": "G#3", "midi": 56, "time": 88.33203125, "velocity": 0.3937007874015748, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 88.33203125, "velocity": 0.3937007874015748, "duration": 0.16796875 }, { "name": "G#4", "midi": 68, "time": 88.5, "velocity": 0.5826771653543307, "duration": 0.5 }, { "name": "G#3", "midi": 56, "time": 88.5, "velocity": 0.41732283464566927, "duration": 0.1640625 }, { "name": "B3", "midi": 59, "time": 88.5, "velocity": 0.41732283464566927, "duration": 0.1640625 }, { "name": "G#3", "midi": 56, "time": 88.6640625, "velocity": 0.3937007874015748, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 88.6640625, "velocity": 0.3937007874015748, "duration": 0.16796875 }, { "name": "G#3", "midi": 56, "time": 88.83203125, "velocity": 0.36220472440944884, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 88.83203125, "velocity": 0.36220472440944884, "duration": 0.16796875 }, { "name": "F#4", "midi": 66, "time": 89, "velocity": 0.4409448818897638, "duration": 0.5 }, { "name": "G#3", "midi": 56, "time": 89, "velocity": 0.3779527559055118, "duration": 0.1640625 }, { "name": "B3", "midi": 59, "time": 89, "velocity": 0.3779527559055118, "duration": 0.1640625 }, { "name": "G#3", "midi": 56, "time": 89.1640625, "velocity": 0.3858267716535433, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 89.1640625, "velocity": 0.3858267716535433, "duration": 0.16796875 }, { "name": "G#3", "midi": 56, "time": 89.33203125, "velocity": 0.3937007874015748, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 89.33203125, "velocity": 0.3937007874015748, "duration": 0.16796875 }, { "name": "E4", "midi": 64, "time": 89.5, "velocity": 0.4330708661417323, "duration": 0.40234375 }, { "name": "G#3", "midi": 56, "time": 89.5, "velocity": 0.3937007874015748, "duration": 0.12890625 }, { "name": "B3", "midi": 59, "time": 89.5, "velocity": 0.3937007874015748, "duration": 0.12890625 }, { "name": "G#3", "midi": 56, "time": 89.6640625, "velocity": 0.4251968503937008, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 89.6640625, "velocity": 0.4251968503937008, "duration": 0.16796875 }, { "name": "G#3", "midi": 56, "time": 89.83203125, "velocity": 0.3937007874015748, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 89.83203125, "velocity": 0.3937007874015748, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 90, "velocity": 0.47244094488188976, "duration": 0.5 }, { "name": "A3", "midi": 57, "time": 90, "velocity": 0.3779527559055118, "duration": 0.1640625 }, { "name": "B3", "midi": 59, "time": 90, "velocity": 0.3779527559055118, "duration": 0.1640625 }, { "name": "F#3", "midi": 54, "time": 90, "velocity": 0.4409448818897638, "duration": 0.6640625 }, { "name": "A3", "midi": 57, "time": 90.1640625, "velocity": 0.4409448818897638, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 90.1640625, "velocity": 0.4409448818897638, "duration": 0.16796875 }, { "name": "A3", "midi": 57, "time": 90.33203125, "velocity": 0.3858267716535433, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 90.33203125, "velocity": 0.3858267716535433, "duration": 0.16796875 }, { "name": "A4", "midi": 69, "time": 90.5, "velocity": 0.5039370078740157, "duration": 0.40234375 }, { "name": "A3", "midi": 57, "time": 90.5, "velocity": 0.3858267716535433, "duration": 0.12890625 }, { "name": "B3", "midi": 59, "time": 90.5, "velocity": 0.3858267716535433, "duration": 0.12890625 }, { "name": "A3", "midi": 57, "time": 90.6640625, "velocity": 0.3858267716535433, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 90.6640625, "velocity": 0.3858267716535433, "duration": 0.16796875 }, { "name": "F#3", "midi": 54, "time": 90.6640625, "velocity": 0.4881889763779528, "duration": 0.16796875 }, { "name": "A3", "midi": 57, "time": 90.83203125, "velocity": 0.4015748031496063, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 90.83203125, "velocity": 0.4015748031496063, "duration": 0.16796875 }, { "name": "F3", "midi": 53, "time": 90.83203125, "velocity": 0.48031496062992124, "duration": 0.1328125 }, { "name": "A3", "midi": 57, "time": 91, "velocity": 0.3858267716535433, "duration": 0.1640625 }, { "name": "B3", "midi": 59, "time": 91, "velocity": 0.3858267716535433, "duration": 0.1640625 }, { "name": "F#3", "midi": 54, "time": 91, "velocity": 0.5039370078740157, "duration": 0.078125 }, { "name": "A3", "midi": 57, "time": 91.1640625, "velocity": 0.4251968503937008, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 91.1640625, "velocity": 0.4251968503937008, "duration": 0.16796875 }, { "name": "F#3", "midi": 54, "time": 91.1640625, "velocity": 0.47244094488188976, "duration": 0.08203125 }, { "name": "A3", "midi": 57, "time": 91.33203125, "velocity": 0.41732283464566927, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 91.33203125, "velocity": 0.41732283464566927, "duration": 0.16796875 }, { "name": "E3", "midi": 52, "time": 91.33203125, "velocity": 0.41732283464566927, "duration": 0.0625 }, { "name": "A3", "midi": 57, "time": 91.5, "velocity": 0.4015748031496063, "duration": 0.1640625 }, { "name": "B3", "midi": 59, "time": 91.5, "velocity": 0.4015748031496063, "duration": 0.1640625 }, { "name": "D#3", "midi": 51, "time": 91.5, "velocity": 0.47244094488188976, "duration": 0.078125 }, { "name": "A3", "midi": 57, "time": 91.6640625, "velocity": 0.3858267716535433, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 91.6640625, "velocity": 0.3858267716535433, "duration": 0.16796875 }, { "name": "C#3", "midi": 49, "time": 91.6640625, "velocity": 0.4251968503937008, "duration": 0.08203125 }, { "name": "A3", "midi": 57, "time": 91.83203125, "velocity": 0.4094488188976378, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 91.83203125, "velocity": 0.4094488188976378, "duration": 0.16796875 }, { "name": "B2", "midi": 47, "time": 91.83203125, "velocity": 0.4566929133858268, "duration": 0.0625 }, { "name": "E4", "midi": 64, "time": 92, "velocity": 0.4330708661417323, "duration": 0.5 }, { "name": "G#3", "midi": 56, "time": 92, "velocity": 0.3937007874015748, "duration": 0.1640625 }, { "name": "B3", "midi": 59, "time": 92, "velocity": 0.3937007874015748, "duration": 0.1640625 }, { "name": "E3", "midi": 52, "time": 92, "velocity": 0.5039370078740157, "duration": 0.5 }, { "name": "G#3", "midi": 56, "time": 92.1640625, "velocity": 0.3858267716535433, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 92.1640625, "velocity": 0.3858267716535433, "duration": 0.16796875 }, { "name": "G#3", "midi": 56, "time": 92.33203125, "velocity": 0.3937007874015748, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 92.33203125, "velocity": 0.3937007874015748, "duration": 0.16796875 }, { "name": "G#4", "midi": 68, "time": 92.5, "velocity": 0.5354330708661418, "duration": 0.5 }, { "name": "G#3", "midi": 56, "time": 92.5, "velocity": 0.4015748031496063, "duration": 0.1640625 }, { "name": "B3", "midi": 59, "time": 92.5, "velocity": 0.4015748031496063, "duration": 0.1640625 }, { "name": "G#3", "midi": 56, "time": 92.6640625, "velocity": 0.4094488188976378, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 92.6640625, "velocity": 0.4094488188976378, "duration": 0.16796875 }, { "name": "G#3", "midi": 56, "time": 92.83203125, "velocity": 0.36220472440944884, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 92.83203125, "velocity": 0.36220472440944884, "duration": 0.16796875 }, { "name": "F#4", "midi": 66, "time": 93, "velocity": 0.4251968503937008, "duration": 0.5 }, { "name": "G#3", "midi": 56, "time": 93, "velocity": 0.3700787401574803, "duration": 0.1640625 }, { "name": "B3", "midi": 59, "time": 93, "velocity": 0.3700787401574803, "duration": 0.1640625 }, { "name": "G#3", "midi": 56, "time": 93.1640625, "velocity": 0.4094488188976378, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 93.1640625, "velocity": 0.4094488188976378, "duration": 0.16796875 }, { "name": "G#3", "midi": 56, "time": 93.33203125, "velocity": 0.3700787401574803, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 93.33203125, "velocity": 0.3700787401574803, "duration": 0.16796875 }, { "name": "E4", "midi": 64, "time": 93.5, "velocity": 0.48031496062992124, "duration": 0.40234375 }, { "name": "G#3", "midi": 56, "time": 93.5, "velocity": 0.3937007874015748, "duration": 0.12890625 }, { "name": "B3", "midi": 59, "time": 93.5, "velocity": 0.3937007874015748, "duration": 0.12890625 }, { "name": "G#3", "midi": 56, "time": 93.6640625, "velocity": 0.4409448818897638, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 93.6640625, "velocity": 0.4409448818897638, "duration": 0.16796875 }, { "name": "G#3", "midi": 56, "time": 93.83203125, "velocity": 0.4015748031496063, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 93.83203125, "velocity": 0.4015748031496063, "duration": 0.16796875 }, { "name": "D4", "midi": 62, "time": 94, "velocity": 0.4566929133858268, "duration": 1.5 }, { "name": "D3", "midi": 50, "time": 94, "velocity": 0.3700787401574803, "duration": 0.1640625 }, { "name": "G#3", "midi": 56, "time": 94, "velocity": 0.3700787401574803, "duration": 0.1640625 }, { "name": "B3", "midi": 59, "time": 94, "velocity": 0.3700787401574803, "duration": 0.1640625 }, { "name": "D3", "midi": 50, "time": 94.1640625, "velocity": 0.4015748031496063, "duration": 0.16796875 }, { "name": "G#3", "midi": 56, "time": 94.1640625, "velocity": 0.4015748031496063, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 94.1640625, "velocity": 0.4015748031496063, "duration": 0.16796875 }, { "name": "F1", "midi": 29, "time": 94.1640625, "velocity": 0.41732283464566927, "duration": 0.08203125 }, { "name": "D3", "midi": 50, "time": 94.33203125, "velocity": 0.3858267716535433, "duration": 0.16796875 }, { "name": "G#3", "midi": 56, "time": 94.33203125, "velocity": 0.3858267716535433, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 94.33203125, "velocity": 0.3858267716535433, "duration": 0.16796875 }, { "name": "G#1", "midi": 32, "time": 94.33203125, "velocity": 0.5039370078740157, "duration": 0.08203125 }, { "name": "D3", "midi": 50, "time": 94.5, "velocity": 0.3858267716535433, "duration": 0.1640625 }, { "name": "G#3", "midi": 56, "time": 94.5, "velocity": 0.3858267716535433, "duration": 0.1640625 }, { "name": "B3", "midi": 59, "time": 94.5, "velocity": 0.3858267716535433, "duration": 0.1640625 }, { "name": "B1", "midi": 35, "time": 94.5, "velocity": 0.47244094488188976, "duration": 0.078125 }, { "name": "D3", "midi": 50, "time": 94.6640625, "velocity": 0.4015748031496063, "duration": 0.16796875 }, { "name": "G#3", "midi": 56, "time": 94.6640625, "velocity": 0.4015748031496063, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 94.6640625, "velocity": 0.4015748031496063, "duration": 0.16796875 }, { "name": "D2", "midi": 38, "time": 94.6640625, "velocity": 0.5039370078740157, "duration": 0.08203125 }, { "name": "D3", "midi": 50, "time": 94.83203125, "velocity": 0.3858267716535433, "duration": 0.16796875 }, { "name": "G#3", "midi": 56, "time": 94.83203125, "velocity": 0.3858267716535433, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 94.83203125, "velocity": 0.3858267716535433, "duration": 0.16796875 }, { "name": "F2", "midi": 41, "time": 94.83203125, "velocity": 0.49606299212598426, "duration": 0.08203125 }, { "name": "D3", "midi": 50, "time": 95, "velocity": 0.3858267716535433, "duration": 0.1640625 }, { "name": "G#3", "midi": 56, "time": 95, "velocity": 0.3858267716535433, "duration": 0.1640625 }, { "name": "B3", "midi": 59, "time": 95, "velocity": 0.3858267716535433, "duration": 0.1640625 }, { "name": "G#2", "midi": 44, "time": 95, "velocity": 0.5118110236220472, "duration": 0.24609375 }, { "name": "D3", "midi": 50, "time": 95.1640625, "velocity": 0.3858267716535433, "duration": 0.16796875 }, { "name": "G#3", "midi": 56, "time": 95.1640625, "velocity": 0.3858267716535433, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 95.1640625, "velocity": 0.3858267716535433, "duration": 0.16796875 }, { "name": "D3", "midi": 50, "time": 95.33203125, "velocity": 0.3779527559055118, "duration": 0.16796875 }, { "name": "G#3", "midi": 56, "time": 95.33203125, "velocity": 0.3779527559055118, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 95.33203125, "velocity": 0.3779527559055118, "duration": 0.16796875 }, { "name": "D4", "midi": 62, "time": 95.5, "velocity": 0.48031496062992124, "duration": 0.40234375 }, { "name": "D3", "midi": 50, "time": 95.5, "velocity": 0.4330708661417323, "duration": 0.12890625 }, { "name": "G#3", "midi": 56, "time": 95.5, "velocity": 0.4330708661417323, "duration": 0.12890625 }, { "name": "B3", "midi": 59, "time": 95.5, "velocity": 0.4330708661417323, "duration": 0.12890625 }, { "name": "D3", "midi": 50, "time": 95.6640625, "velocity": 0.3937007874015748, "duration": 0.16796875 }, { "name": "G#3", "midi": 56, "time": 95.6640625, "velocity": 0.3937007874015748, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 95.6640625, "velocity": 0.3937007874015748, "duration": 0.16796875 }, { "name": "D3", "midi": 50, "time": 95.83203125, "velocity": 0.3779527559055118, "duration": 0.16796875 }, { "name": "G#3", "midi": 56, "time": 95.83203125, "velocity": 0.3779527559055118, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 95.83203125, "velocity": 0.3779527559055118, "duration": 0.16796875 }, { "name": "D4", "midi": 62, "time": 96, "velocity": 0.4566929133858268, "duration": 1.5 }, { "name": "D3", "midi": 50, "time": 96, "velocity": 0.4015748031496063, "duration": 0.1640625 }, { "name": "G#3", "midi": 56, "time": 96, "velocity": 0.4015748031496063, "duration": 0.1640625 }, { "name": "B3", "midi": 59, "time": 96, "velocity": 0.4015748031496063, "duration": 0.1640625 }, { "name": "D3", "midi": 50, "time": 96.1640625, "velocity": 0.4251968503937008, "duration": 0.16796875 }, { "name": "G#3", "midi": 56, "time": 96.1640625, "velocity": 0.4251968503937008, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 96.1640625, "velocity": 0.4251968503937008, "duration": 0.16796875 }, { "name": "F1", "midi": 29, "time": 96.1640625, "velocity": 0.4094488188976378, "duration": 0.08203125 }, { "name": "D3", "midi": 50, "time": 96.33203125, "velocity": 0.4251968503937008, "duration": 0.16796875 }, { "name": "G#3", "midi": 56, "time": 96.33203125, "velocity": 0.4251968503937008, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 96.33203125, "velocity": 0.4251968503937008, "duration": 0.16796875 }, { "name": "G#1", "midi": 32, "time": 96.33203125, "velocity": 0.5118110236220472, "duration": 0.08203125 }, { "name": "D3", "midi": 50, "time": 96.5, "velocity": 0.4015748031496063, "duration": 0.1640625 }, { "name": "G#3", "midi": 56, "time": 96.5, "velocity": 0.4015748031496063, "duration": 0.1640625 }, { "name": "B3", "midi": 59, "time": 96.5, "velocity": 0.4015748031496063, "duration": 0.1640625 }, { "name": "B1", "midi": 35, "time": 96.5, "velocity": 0.49606299212598426, "duration": 0.078125 }, { "name": "D3", "midi": 50, "time": 96.6640625, "velocity": 0.41732283464566927, "duration": 0.16796875 }, { "name": "G#3", "midi": 56, "time": 96.6640625, "velocity": 0.41732283464566927, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 96.6640625, "velocity": 0.41732283464566927, "duration": 0.16796875 }, { "name": "D2", "midi": 38, "time": 96.6640625, "velocity": 0.48031496062992124, "duration": 0.08203125 }, { "name": "D3", "midi": 50, "time": 96.83203125, "velocity": 0.3937007874015748, "duration": 0.16796875 }, { "name": "G#3", "midi": 56, "time": 96.83203125, "velocity": 0.3937007874015748, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 96.83203125, "velocity": 0.3937007874015748, "duration": 0.16796875 }, { "name": "F2", "midi": 41, "time": 96.83203125, "velocity": 0.4409448818897638, "duration": 0.08203125 }, { "name": "D3", "midi": 50, "time": 97, "velocity": 0.4015748031496063, "duration": 0.1640625 }, { "name": "G#3", "midi": 56, "time": 97, "velocity": 0.4015748031496063, "duration": 0.1640625 }, { "name": "B3", "midi": 59, "time": 97, "velocity": 0.4015748031496063, "duration": 0.1640625 }, { "name": "G#2", "midi": 44, "time": 97, "velocity": 0.49606299212598426, "duration": 0.24609375 }, { "name": "D3", "midi": 50, "time": 97.1640625, "velocity": 0.3858267716535433, "duration": 0.16796875 }, { "name": "G#3", "midi": 56, "time": 97.1640625, "velocity": 0.3858267716535433, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 97.1640625, "velocity": 0.3858267716535433, "duration": 0.16796875 }, { "name": "D3", "midi": 50, "time": 97.33203125, "velocity": 0.4330708661417323, "duration": 0.16796875 }, { "name": "G#3", "midi": 56, "time": 97.33203125, "velocity": 0.4330708661417323, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 97.33203125, "velocity": 0.4330708661417323, "duration": 0.16796875 }, { "name": "D4", "midi": 62, "time": 97.5, "velocity": 0.47244094488188976, "duration": 0.40234375 }, { "name": "D3", "midi": 50, "time": 97.5, "velocity": 0.3464566929133858, "duration": 0.12890625 }, { "name": "G#3", "midi": 56, "time": 97.5, "velocity": 0.3464566929133858, "duration": 0.12890625 }, { "name": "B3", "midi": 59, "time": 97.5, "velocity": 0.3464566929133858, "duration": 0.12890625 }, { "name": "D3", "midi": 50, "time": 97.6640625, "velocity": 0.41732283464566927, "duration": 0.16796875 }, { "name": "G#3", "midi": 56, "time": 97.6640625, "velocity": 0.41732283464566927, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 97.6640625, "velocity": 0.41732283464566927, "duration": 0.16796875 }, { "name": "D3", "midi": 50, "time": 97.83203125, "velocity": 0.4094488188976378, "duration": 0.16796875 }, { "name": "G#3", "midi": 56, "time": 97.83203125, "velocity": 0.4094488188976378, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 97.83203125, "velocity": 0.4094488188976378, "duration": 0.16796875 }, { "name": "C#4", "midi": 61, "time": 98, "velocity": 0.44881889763779526, "duration": 1.5 }, { "name": "C#3", "midi": 49, "time": 98, "velocity": 0.3779527559055118, "duration": 0.1640625 }, { "name": "G#3", "midi": 56, "time": 98, "velocity": 0.3779527559055118, "duration": 0.1640625 }, { "name": "A#3", "midi": 58, "time": 98, "velocity": 0.3779527559055118, "duration": 0.1640625 }, { "name": "C#3", "midi": 49, "time": 98.1640625, "velocity": 0.4015748031496063, "duration": 0.16796875 }, { "name": "G#3", "midi": 56, "time": 98.1640625, "velocity": 0.4015748031496063, "duration": 0.16796875 }, { "name": "A#3", "midi": 58, "time": 98.1640625, "velocity": 0.4015748031496063, "duration": 0.16796875 }, { "name": "E2", "midi": 40, "time": 98.1640625, "velocity": 0.44881889763779526, "duration": 0.08203125 }, { "name": "C#3", "midi": 49, "time": 98.33203125, "velocity": 0.4094488188976378, "duration": 0.16796875 }, { "name": "G#3", "midi": 56, "time": 98.33203125, "velocity": 0.4094488188976378, "duration": 0.16796875 }, { "name": "A#3", "midi": 58, "time": 98.33203125, "velocity": 0.4094488188976378, "duration": 0.16796875 }, { "name": "G#2", "midi": 44, "time": 98.33203125, "velocity": 0.49606299212598426, "duration": 0.08203125 }, { "name": "C#3", "midi": 49, "time": 98.5, "velocity": 0.4094488188976378, "duration": 0.1640625 }, { "name": "G#3", "midi": 56, "time": 98.5, "velocity": 0.4094488188976378, "duration": 0.1640625 }, { "name": "A#3", "midi": 58, "time": 98.5, "velocity": 0.4094488188976378, "duration": 0.1640625 }, { "name": "A#2", "midi": 46, "time": 98.5, "velocity": 0.5039370078740157, "duration": 0.24609375 }, { "name": "C#3", "midi": 49, "time": 98.6640625, "velocity": 0.41732283464566927, "duration": 0.16796875 }, { "name": "G#3", "midi": 56, "time": 98.6640625, "velocity": 0.41732283464566927, "duration": 0.16796875 }, { "name": "A#3", "midi": 58, "time": 98.6640625, "velocity": 0.41732283464566927, "duration": 0.16796875 }, { "name": "C#3", "midi": 49, "time": 98.83203125, "velocity": 0.4015748031496063, "duration": 0.16796875 }, { "name": "G#3", "midi": 56, "time": 98.83203125, "velocity": 0.4015748031496063, "duration": 0.16796875 }, { "name": "A#3", "midi": 58, "time": 98.83203125, "velocity": 0.4015748031496063, "duration": 0.16796875 }, { "name": "C#3", "midi": 49, "time": 99, "velocity": 0.3937007874015748, "duration": 0.1640625 }, { "name": "G3", "midi": 55, "time": 99, "velocity": 0.3937007874015748, "duration": 0.1640625 }, { "name": "A#3", "midi": 58, "time": 99, "velocity": 0.3937007874015748, "duration": 0.1640625 }, { "name": "C#3", "midi": 49, "time": 99.1640625, "velocity": 0.4015748031496063, "duration": 0.16796875 }, { "name": "G3", "midi": 55, "time": 99.1640625, "velocity": 0.4015748031496063, "duration": 0.16796875 }, { "name": "A#3", "midi": 58, "time": 99.1640625, "velocity": 0.4015748031496063, "duration": 0.16796875 }, { "name": "D#2", "midi": 39, "time": 99.1640625, "velocity": 0.4251968503937008, "duration": 0.08203125 }, { "name": "C#3", "midi": 49, "time": 99.33203125, "velocity": 0.3937007874015748, "duration": 0.16796875 }, { "name": "G3", "midi": 55, "time": 99.33203125, "velocity": 0.3937007874015748, "duration": 0.16796875 }, { "name": "A#3", "midi": 58, "time": 99.33203125, "velocity": 0.3937007874015748, "duration": 0.16796875 }, { "name": "G2", "midi": 43, "time": 99.33203125, "velocity": 0.5039370078740157, "duration": 0.08203125 }, { "name": "C#4", "midi": 61, "time": 99.5, "velocity": 0.44881889763779526, "duration": 0.40234375 }, { "name": "C#3", "midi": 49, "time": 99.5, "velocity": 0.3700787401574803, "duration": 0.12890625 }, { "name": "D#3", "midi": 51, "time": 99.5, "velocity": 0.3700787401574803, "duration": 0.12890625 }, { "name": "G3", "midi": 55, "time": 99.5, "velocity": 0.3700787401574803, "duration": 0.12890625 }, { "name": "A#3", "midi": 58, "time": 99.5, "velocity": 0.3700787401574803, "duration": 0.12890625 }, { "name": "A#2", "midi": 46, "time": 99.5, "velocity": 0.5275590551181102, "duration": 0.24609375 }, { "name": "C#3", "midi": 49, "time": 99.6640625, "velocity": 0.4015748031496063, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 99.6640625, "velocity": 0.4015748031496063, "duration": 0.16796875 }, { "name": "G3", "midi": 55, "time": 99.6640625, "velocity": 0.4015748031496063, "duration": 0.16796875 }, { "name": "A#3", "midi": 58, "time": 99.6640625, "velocity": 0.4015748031496063, "duration": 0.16796875 }, { "name": "C#3", "midi": 49, "time": 99.83203125, "velocity": 0.36220472440944884, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 99.83203125, "velocity": 0.36220472440944884, "duration": 0.16796875 }, { "name": "G3", "midi": 55, "time": 99.83203125, "velocity": 0.36220472440944884, "duration": 0.16796875 }, { "name": "A#3", "midi": 58, "time": 99.83203125, "velocity": 0.36220472440944884, "duration": 0.16796875 }, { "name": "C4", "midi": 60, "time": 100, "velocity": 0.44881889763779526, "duration": 1 }, { "name": "C3", "midi": 48, "time": 100, "velocity": 0.3937007874015748, "duration": 0.1640625 }, { "name": "G#1", "midi": 32, "time": 100, "velocity": 0.44881889763779526, "duration": 1 }, { "name": "G#2", "midi": 44, "time": 100, "velocity": 0.44881889763779526, "duration": 1 }, { "name": "D#3", "midi": 51, "time": 100.1640625, "velocity": 0.4881889763779528, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 100.33203125, "velocity": 0.4645669291338583, "duration": 0.16796875 }, { "name": "G#3", "midi": 56, "time": 100.5, "velocity": 0.5433070866141733, "duration": 0.1640625 }, { "name": "D#3", "midi": 51, "time": 100.6640625, "velocity": 0.4566929133858268, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 100.83203125, "velocity": 0.4566929133858268, "duration": 0.16796875 }, { "name": "A#3", "midi": 58, "time": 101, "velocity": 0.47244094488188976, "duration": 1 }, { "name": "G3", "midi": 55, "time": 101, "velocity": 0.5118110236220472, "duration": 0.1640625 }, { "name": "C#3", "midi": 49, "time": 101, "velocity": 0.5039370078740157, "duration": 1 }, { "name": "D#3", "midi": 51, "time": 101.1640625, "velocity": 0.4645669291338583, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 101.33203125, "velocity": 0.49606299212598426, "duration": 0.16796875 }, { "name": "G3", "midi": 55, "time": 101.5, "velocity": 0.47244094488188976, "duration": 0.1640625 }, { "name": "D#3", "midi": 51, "time": 101.6640625, "velocity": 0.4330708661417323, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 101.83203125, "velocity": 0.4645669291338583, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 102, "velocity": 0.5118110236220472, "duration": 1.5 }, { "name": "G#3", "midi": 56, "time": 102, "velocity": 0.47244094488188976, "duration": 0.1640625 }, { "name": "C3", "midi": 48, "time": 102, "velocity": 0.4566929133858268, "duration": 1 }, { "name": "D#3", "midi": 51, "time": 102.1640625, "velocity": 0.41732283464566927, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 102.33203125, "velocity": 0.48031496062992124, "duration": 0.16796875 }, { "name": "G#3", "midi": 56, "time": 102.5, "velocity": 0.5039370078740157, "duration": 0.1640625 }, { "name": "D#3", "midi": 51, "time": 102.6640625, "velocity": 0.4330708661417323, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 102.83203125, "velocity": 0.48031496062992124, "duration": 0.16796875 }, { "name": "A#3", "midi": 58, "time": 103, "velocity": 0.5511811023622047, "duration": 0.1640625 }, { "name": "G2", "midi": 43, "time": 103, "velocity": 0.4094488188976378, "duration": 0.90234375 }, { "name": "D#3", "midi": 51, "time": 103.1640625, "velocity": 0.4566929133858268, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 103.33203125, "velocity": 0.47244094488188976, "duration": 0.16796875 }, { "name": "C#4", "midi": 61, "time": 103.5, "velocity": 0.4645669291338583, "duration": 0.40234375 }, { "name": "A#3", "midi": 58, "time": 103.5, "velocity": 0.5039370078740157, "duration": 0.12890625 }, { "name": "D#3", "midi": 51, "time": 103.6640625, "velocity": 0.4566929133858268, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 103.83203125, "velocity": 0.4645669291338583, "duration": 0.16796875 }, { "name": "C4", "midi": 60, "time": 104, "velocity": 0.41732283464566927, "duration": 0.5 }, { "name": "G#3", "midi": 56, "time": 104, "velocity": 0.5039370078740157, "duration": 0.1640625 }, { "name": "G#2", "midi": 44, "time": 104, "velocity": 0.5196850393700787, "duration": 0.5 }, { "name": "D#3", "midi": 51, "time": 104.1640625, "velocity": 0.44881889763779526, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 104.33203125, "velocity": 0.48031496062992124, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 104.5, "velocity": 0.5039370078740157, "duration": 0.5 }, { "name": "A#3", "midi": 58, "time": 104.5, "velocity": 0.5196850393700787, "duration": 0.1640625 }, { "name": "G2", "midi": 43, "time": 104.5, "velocity": 0.4409448818897638, "duration": 0.5 }, { "name": "D#3", "midi": 51, "time": 104.6640625, "velocity": 0.4645669291338583, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 104.83203125, "velocity": 0.4881889763779528, "duration": 0.16796875 }, { "name": "G#4", "midi": 68, "time": 105, "velocity": 0.5354330708661418, "duration": 0.5 }, { "name": "C4", "midi": 60, "time": 105, "velocity": 0.5826771653543307, "duration": 0.1640625 }, { "name": "F2", "midi": 41, "time": 105, "velocity": 0.48031496062992124, "duration": 0.5 }, { "name": "G#3", "midi": 56, "time": 105.1640625, "velocity": 0.4566929133858268, "duration": 0.16796875 }, { "name": "G#3", "midi": 56, "time": 105.33203125, "velocity": 0.4566929133858268, "duration": 0.16796875 }, { "name": "A#4", "midi": 70, "time": 105.5, "velocity": 0.5196850393700787, "duration": 0.3203125 }, { "name": "D4", "midi": 62, "time": 105.5, "velocity": 0.5275590551181102, "duration": 0.1015625 }, { "name": "F3", "midi": 53, "time": 105.5, "velocity": 0.5275590551181102, "duration": 0.40234375 }, { "name": "G#3", "midi": 56, "time": 105.6640625, "velocity": 0.44881889763779526, "duration": 0.16796875 }, { "name": "G#3", "midi": 56, "time": 105.83203125, "velocity": 0.48031496062992124, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 106, "velocity": 0.41732283464566927, "duration": 1.5 }, { "name": "G3", "midi": 55, "time": 106, "velocity": 0.48031496062992124, "duration": 0.1640625 }, { "name": "D#3", "midi": 51, "time": 106, "velocity": 0.4881889763779528, "duration": 1 }, { "name": "A#3", "midi": 58, "time": 106.1640625, "velocity": 0.4881889763779528, "duration": 0.16796875 }, { "name": "A#3", "midi": 58, "time": 106.33203125, "velocity": 0.4881889763779528, "duration": 0.16796875 }, { "name": "G3", "midi": 55, "time": 106.5, "velocity": 0.44881889763779526, "duration": 0.1640625 }, { "name": "A#3", "midi": 58, "time": 106.6640625, "velocity": 0.49606299212598426, "duration": 0.16796875 }, { "name": "A#3", "midi": 58, "time": 106.83203125, "velocity": 0.48031496062992124, "duration": 0.16796875 }, { "name": "G3", "midi": 55, "time": 107, "velocity": 0.4881889763779528, "duration": 0.1640625 }, { "name": "D#2", "midi": 39, "time": 107, "velocity": 0.4015748031496063, "duration": 1 }, { "name": "A#3", "midi": 58, "time": 107.1640625, "velocity": 0.4881889763779528, "duration": 0.16796875 }, { "name": "A#3", "midi": 58, "time": 107.33203125, "velocity": 0.47244094488188976, "duration": 0.16796875 }, { "name": "E4", "midi": 64, "time": 107.5, "velocity": 0.49606299212598426, "duration": 0.5 }, { "name": "G3", "midi": 55, "time": 107.5, "velocity": 0.4645669291338583, "duration": 0.1640625 }, { "name": "A#3", "midi": 58, "time": 107.6640625, "velocity": 0.47244094488188976, "duration": 0.16796875 }, { "name": "A#3", "midi": 58, "time": 107.83203125, "velocity": 0.48031496062992124, "duration": 0.16796875 }, { "name": "F4", "midi": 65, "time": 108, "velocity": 0.49606299212598426, "duration": 0.90234375 }, { "name": "G3", "midi": 55, "time": 108, "velocity": 0.4409448818897638, "duration": 0.12890625 }, { "name": "C#2", "midi": 37, "time": 108, "velocity": 0.4409448818897638, "duration": 1 }, { "name": "A#3", "midi": 58, "time": 108.1640625, "velocity": 0.49606299212598426, "duration": 0.16796875 }, { "name": "A#3", "midi": 58, "time": 108.33203125, "velocity": 0.47244094488188976, "duration": 0.16796875 }, { "name": "G3", "midi": 55, "time": 108.5, "velocity": 0.4251968503937008, "duration": 0.1640625 }, { "name": "A#3", "midi": 58, "time": 108.6640625, "velocity": 0.5118110236220472, "duration": 0.16796875 }, { "name": "A#3", "midi": 58, "time": 108.83203125, "velocity": 0.4881889763779528, "duration": 0.16796875 }, { "name": "A#3", "midi": 58, "time": 109, "velocity": 0.4330708661417323, "duration": 0.75 }, { "name": "G3", "midi": 55, "time": 109, "velocity": 0.4566929133858268, "duration": 0.1640625 }, { "name": "C#3", "midi": 49, "time": 109, "velocity": 0.5118110236220472, "duration": 0.90234375 }, { "name": "D#3", "midi": 51, "time": 109.1640625, "velocity": 0.44881889763779526, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 109.33203125, "velocity": 0.44881889763779526, "duration": 0.16796875 }, { "name": "G3", "midi": 55, "time": 109.5, "velocity": 0.49606299212598426, "duration": 0.1640625 }, { "name": "D#3", "midi": 51, "time": 109.6640625, "velocity": 0.4251968503937008, "duration": 0.16796875 }, { "name": "C4", "midi": 60, "time": 109.75, "velocity": 0.5118110236220472, "duration": 0.125 }, { "name": "D#3", "midi": 51, "time": 109.83203125, "velocity": 0.44881889763779526, "duration": 0.1328125 }, { "name": "C#4", "midi": 61, "time": 109.875, "velocity": 0.49606299212598426, "duration": 0.09765625 }, { "name": "D#4", "midi": 63, "time": 110, "velocity": 0.48031496062992124, "duration": 1 }, { "name": "G#3", "midi": 56, "time": 110, "velocity": 0.5196850393700787, "duration": 0.1640625 }, { "name": "C3", "midi": 48, "time": 110, "velocity": 0.5039370078740157, "duration": 1 }, { "name": "D#3", "midi": 51, "time": 110.1640625, "velocity": 0.47244094488188976, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 110.33203125, "velocity": 0.48031496062992124, "duration": 0.16796875 }, { "name": "G#3", "midi": 56, "time": 110.5, "velocity": 0.5039370078740157, "duration": 0.1640625 }, { "name": "D#3", "midi": 51, "time": 110.6640625, "velocity": 0.4330708661417323, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 110.83203125, "velocity": 0.47244094488188976, "duration": 0.16796875 }, { "name": "A3", "midi": 57, "time": 111, "velocity": 0.4330708661417323, "duration": 1 }, { "name": "D#3", "midi": 51, "time": 111, "velocity": 0.4409448818897638, "duration": 0.1640625 }, { "name": "F2", "midi": 41, "time": 111, "velocity": 0.3937007874015748, "duration": 1 }, { "name": "C3", "midi": 48, "time": 111.1640625, "velocity": 0.49606299212598426, "duration": 0.16796875 }, { "name": "C3", "midi": 48, "time": 111.33203125, "velocity": 0.4566929133858268, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 111.5, "velocity": 0.4645669291338583, "duration": 0.1640625 }, { "name": "C3", "midi": 48, "time": 111.6640625, "velocity": 0.4645669291338583, "duration": 0.16796875 }, { "name": "C3", "midi": 48, "time": 111.83203125, "velocity": 0.4881889763779528, "duration": 0.16796875 }, { "name": "C#4", "midi": 61, "time": 112, "velocity": 0.5118110236220472, "duration": 0.90234375 }, { "name": "F3", "midi": 53, "time": 112, "velocity": 0.4881889763779528, "duration": 0.12890625 }, { "name": "A#1", "midi": 34, "time": 112, "velocity": 0.4094488188976378, "duration": 1 }, { "name": "C#3", "midi": 49, "time": 112.1640625, "velocity": 0.4409448818897638, "duration": 0.16796875 }, { "name": "C#3", "midi": 49, "time": 112.33203125, "velocity": 0.5039370078740157, "duration": 0.16796875 }, { "name": "F3", "midi": 53, "time": 112.5, "velocity": 0.5275590551181102, "duration": 0.1640625 }, { "name": "C#3", "midi": 49, "time": 112.6640625, "velocity": 0.4881889763779528, "duration": 0.16796875 }, { "name": "C#3", "midi": 49, "time": 112.83203125, "velocity": 0.5039370078740157, "duration": 0.16796875 }, { "name": "C#4", "midi": 61, "time": 113, "velocity": 0.5196850393700787, "duration": 0.1640625 }, { "name": "G3", "midi": 55, "time": 113, "velocity": 0.5039370078740157, "duration": 0.1640625 }, { "name": "D#2", "midi": 39, "time": 113, "velocity": 0.5039370078740157, "duration": 0.90234375 }, { "name": "C4", "midi": 60, "time": 113.1640625, "velocity": 0.44881889763779526, "duration": 0.1328125 }, { "name": "C#3", "midi": 49, "time": 113.1640625, "velocity": 0.44881889763779526, "duration": 0.1328125 }, { "name": "A#3", "midi": 58, "time": 113.33203125, "velocity": 0.44881889763779526, "duration": 0.16796875 }, { "name": "C#3", "midi": 49, "time": 113.33203125, "velocity": 0.4645669291338583, "duration": 0.16796875 }, { "name": "A#3", "midi": 58, "time": 113.5, "velocity": 0.47244094488188976, "duration": 0.12890625 }, { "name": "C#3", "midi": 49, "time": 113.5, "velocity": 0.4645669291338583, "duration": 0.12890625 }, { "name": "G#3", "midi": 56, "time": 113.6640625, "velocity": 0.4409448818897638, "duration": 0.1328125 }, { "name": "C#3", "midi": 49, "time": 113.6640625, "velocity": 0.48031496062992124, "duration": 0.1328125 }, { "name": "G3", "midi": 55, "time": 113.83203125, "velocity": 0.4645669291338583, "duration": 0.16796875 }, { "name": "C#3", "midi": 49, "time": 113.83203125, "velocity": 0.48031496062992124, "duration": 0.16796875 }, { "name": "G3", "midi": 55, "time": 114, "velocity": 0.4645669291338583, "duration": 0.90234375 }, { "name": "A#3", "midi": 58, "time": 114, "velocity": 0.4645669291338583, "duration": 0.90234375 }, { "name": "C#3", "midi": 49, "time": 114, "velocity": 0.47244094488188976, "duration": 0.1640625 }, { "name": "G#1", "midi": 32, "time": 114, "velocity": 0.4566929133858268, "duration": 0.5 }, { "name": "D#3", "midi": 51, "time": 114.1640625, "velocity": 0.4881889763779528, "duration": 0.1328125 }, { "name": "D#3", "midi": 51, "time": 114.33203125, "velocity": 0.47244094488188976, "duration": 0.16796875 }, { "name": "C#3", "midi": 49, "time": 114.5, "velocity": 0.5118110236220472, "duration": 0.1640625 }, { "name": "G#2", "midi": 44, "time": 114.5, "velocity": 0.5118110236220472, "duration": 0.5 }, { "name": "D#3", "midi": 51, "time": 114.6640625, "velocity": 0.5275590551181102, "duration": 0.1328125 }, { "name": "D#3", "midi": 51, "time": 114.83203125, "velocity": 0.49606299212598426, "duration": 0.16796875 }, { "name": "G#3", "midi": 56, "time": 115, "velocity": 0.4881889763779528, "duration": 0.40234375 }, { "name": "C3", "midi": 48, "time": 115, "velocity": 0.48031496062992124, "duration": 0.12890625 }, { "name": "G#1", "midi": 32, "time": 115, "velocity": 0.4251968503937008, "duration": 0.5 }, { "name": "D#3", "midi": 51, "time": 115.1640625, "velocity": 0.5196850393700787, "duration": 0.08203125 }, { "name": "G#3", "midi": 56, "time": 115.33203125, "velocity": 0.4881889763779528, "duration": 0.08203125 }, { "name": "C4", "midi": 60, "time": 115.5, "velocity": 0.5039370078740157, "duration": 0.078125 }, { "name": "D#4", "midi": 63, "time": 115.6640625, "velocity": 0.48031496062992124, "duration": 0.08203125 }, { "name": "G#4", "midi": 68, "time": 115.83203125, "velocity": 0.5433070866141733, "duration": 0.08203125 }, { "name": "C4", "midi": 60, "time": 116, "velocity": 0.5118110236220472, "duration": 0.1640625 }, { "name": "G#3", "midi": 56, "time": 116, "velocity": 0.4330708661417323, "duration": 0.1640625 }, { "name": "C5", "midi": 72, "time": 116, "velocity": 0.41732283464566927, "duration": 1 }, { "name": "G#2", "midi": 44, "time": 116, "velocity": 0.4409448818897638, "duration": 1 }, { "name": "D#4", "midi": 63, "time": 116.1640625, "velocity": 0.5354330708661418, "duration": 0.1328125 }, { "name": "D#3", "midi": 51, "time": 116.1640625, "velocity": 0.4251968503937008, "duration": 0.1328125 }, { "name": "D#4", "midi": 63, "time": 116.33203125, "velocity": 0.49606299212598426, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 116.33203125, "velocity": 0.4881889763779528, "duration": 0.16796875 }, { "name": "C4", "midi": 60, "time": 116.5, "velocity": 0.41732283464566927, "duration": 0.1640625 }, { "name": "G#3", "midi": 56, "time": 116.5, "velocity": 0.49606299212598426, "duration": 0.1640625 }, { "name": "D#4", "midi": 63, "time": 116.6640625, "velocity": 0.5118110236220472, "duration": 0.1328125 }, { "name": "D#3", "midi": 51, "time": 116.6640625, "velocity": 0.4566929133858268, "duration": 0.1328125 }, { "name": "D#4", "midi": 63, "time": 116.83203125, "velocity": 0.5196850393700787, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 116.83203125, "velocity": 0.4645669291338583, "duration": 0.16796875 }, { "name": "A#3", "midi": 58, "time": 117, "velocity": 0.44881889763779526, "duration": 0.1640625 }, { "name": "G3", "midi": 55, "time": 117, "velocity": 0.5039370078740157, "duration": 0.1640625 }, { "name": "A#4", "midi": 70, "time": 117, "velocity": 0.4409448818897638, "duration": 0.70703125 }, { "name": "C#3", "midi": 49, "time": 117, "velocity": 0.5196850393700787, "duration": 0.70703125 }, { "name": "D#4", "midi": 63, "time": 117.1640625, "velocity": 0.5433070866141733, "duration": 0.1328125 }, { "name": "D#3", "midi": 51, "time": 117.1640625, "velocity": 0.44881889763779526, "duration": 0.1328125 }, { "name": "D#4", "midi": 63, "time": 117.33203125, "velocity": 0.5275590551181102, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 117.33203125, "velocity": 0.4645669291338583, "duration": 0.16796875 }, { "name": "A#3", "midi": 58, "time": 117.5, "velocity": 0.48031496062992124, "duration": 0.1640625 }, { "name": "G3", "midi": 55, "time": 117.5, "velocity": 0.5275590551181102, "duration": 0.1640625 }, { "name": "D#4", "midi": 63, "time": 117.6640625, "velocity": 0.5669291338582677, "duration": 0.1328125 }, { "name": "D#3", "midi": 51, "time": 117.6640625, "velocity": 0.4566929133858268, "duration": 0.1328125 }, { "name": "D#4", "midi": 63, "time": 117.83203125, "velocity": 0.5433070866141733, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 117.83203125, "velocity": 0.44881889763779526, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 118, "velocity": 0.4566929133858268, "duration": 0.1640625 }, { "name": "G#3", "midi": 56, "time": 118, "velocity": 0.5039370078740157, "duration": 0.1640625 }, { "name": "D#5", "midi": 75, "time": 118, "velocity": 0.5196850393700787, "duration": 1.40234375 }, { "name": "C3", "midi": 48, "time": 118, "velocity": 0.4566929133858268, "duration": 0.90234375 }, { "name": "G#4", "midi": 68, "time": 118.1640625, "velocity": 0.5669291338582677, "duration": 0.1328125 }, { "name": "D#3", "midi": 51, "time": 118.1640625, "velocity": 0.4409448818897638, "duration": 0.1328125 }, { "name": "G#4", "midi": 68, "time": 118.33203125, "velocity": 0.5039370078740157, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 118.33203125, "velocity": 0.4881889763779528, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 118.5, "velocity": 0.4330708661417323, "duration": 0.1640625 }, { "name": "G#3", "midi": 56, "time": 118.5, "velocity": 0.5118110236220472, "duration": 0.1640625 }, { "name": "G#4", "midi": 68, "time": 118.6640625, "velocity": 0.5196850393700787, "duration": 0.1328125 }, { "name": "D#3", "midi": 51, "time": 118.6640625, "velocity": 0.4015748031496063, "duration": 0.1328125 }, { "name": "G#4", "midi": 68, "time": 118.83203125, "velocity": 0.48031496062992124, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 118.83203125, "velocity": 0.49606299212598426, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 119, "velocity": 0.4251968503937008, "duration": 0.1640625 }, { "name": "G3", "midi": 55, "time": 119, "velocity": 0.5118110236220472, "duration": 0.1640625 }, { "name": "G2", "midi": 43, "time": 119, "velocity": 0.44881889763779526, "duration": 0.90234375 }, { "name": "A#4", "midi": 70, "time": 119.1640625, "velocity": 0.5433070866141733, "duration": 0.1328125 }, { "name": "D#3", "midi": 51, "time": 119.1640625, "velocity": 0.4330708661417323, "duration": 0.1328125 }, { "name": "A#4", "midi": 70, "time": 119.33203125, "velocity": 0.4645669291338583, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 119.33203125, "velocity": 0.5118110236220472, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 119.5, "velocity": 0.3779527559055118, "duration": 0.12890625 }, { "name": "G3", "midi": 55, "time": 119.5, "velocity": 0.5275590551181102, "duration": 0.12890625 }, { "name": "C#5", "midi": 73, "time": 119.5, "velocity": 0.41732283464566927, "duration": 0.40234375 }, { "name": "A#4", "midi": 70, "time": 119.6640625, "velocity": 0.5354330708661418, "duration": 0.1328125 }, { "name": "D#3", "midi": 51, "time": 119.6640625, "velocity": 0.47244094488188976, "duration": 0.1328125 }, { "name": "A#4", "midi": 70, "time": 119.83203125, "velocity": 0.5275590551181102, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 119.83203125, "velocity": 0.4566929133858268, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 120, "velocity": 0.3779527559055118, "duration": 0.1640625 }, { "name": "G#3", "midi": 56, "time": 120, "velocity": 0.4881889763779528, "duration": 0.1640625 }, { "name": "C5", "midi": 72, "time": 120, "velocity": 0.4409448818897638, "duration": 0.5 }, { "name": "G#2", "midi": 44, "time": 120, "velocity": 0.4645669291338583, "duration": 0.5 }, { "name": "G#4", "midi": 68, "time": 120.1640625, "velocity": 0.5433070866141733, "duration": 0.1328125 }, { "name": "D#3", "midi": 51, "time": 120.1640625, "velocity": 0.4409448818897638, "duration": 0.1328125 }, { "name": "G#4", "midi": 68, "time": 120.33203125, "velocity": 0.4881889763779528, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 120.33203125, "velocity": 0.44881889763779526, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 120.5, "velocity": 0.3858267716535433, "duration": 0.1640625 }, { "name": "G3", "midi": 55, "time": 120.5, "velocity": 0.5118110236220472, "duration": 0.1640625 }, { "name": "D#5", "midi": 75, "time": 120.5, "velocity": 0.5196850393700787, "duration": 0.40234375 }, { "name": "G2", "midi": 43, "time": 120.5, "velocity": 0.44881889763779526, "duration": 0.40234375 }, { "name": "A#4", "midi": 70, "time": 120.6640625, "velocity": 0.5669291338582677, "duration": 0.1328125 }, { "name": "D#3", "midi": 51, "time": 120.6640625, "velocity": 0.4409448818897638, "duration": 0.1328125 }, { "name": "A#4", "midi": 70, "time": 120.83203125, "velocity": 0.47244094488188976, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 120.83203125, "velocity": 0.4645669291338583, "duration": 0.16796875 }, { "name": "G#4", "midi": 68, "time": 121, "velocity": 0.44881889763779526, "duration": 0.1640625 }, { "name": "F3", "midi": 53, "time": 121, "velocity": 0.5118110236220472, "duration": 0.1640625 }, { "name": "G#5", "midi": 80, "time": 121, "velocity": 0.5511811023622047, "duration": 0.40234375 }, { "name": "F2", "midi": 41, "time": 121, "velocity": 0.4566929133858268, "duration": 0.40234375 }, { "name": "C5", "midi": 72, "time": 121.1640625, "velocity": 0.5275590551181102, "duration": 0.1328125 }, { "name": "G#2", "midi": 44, "time": 121.1640625, "velocity": 0.4330708661417323, "duration": 0.1328125 }, { "name": "C5", "midi": 72, "time": 121.33203125, "velocity": 0.49606299212598426, "duration": 0.16796875 }, { "name": "G#2", "midi": 44, "time": 121.33203125, "velocity": 0.4566929133858268, "duration": 0.16796875 }, { "name": "G#4", "midi": 68, "time": 121.5, "velocity": 0.4330708661417323, "duration": 0.12890625 }, { "name": "F3", "midi": 53, "time": 121.5, "velocity": 0.5275590551181102, "duration": 0.12890625 }, { "name": "A#5", "midi": 82, "time": 121.5, "velocity": 0.49606299212598426, "duration": 0.25390625 }, { "name": "F2", "midi": 41, "time": 121.5, "velocity": 0.48031496062992124, "duration": 0.25390625 }, { "name": "D5", "midi": 74, "time": 121.6640625, "velocity": 0.5511811023622047, "duration": 0.1328125 }, { "name": "G#2", "midi": 44, "time": 121.6640625, "velocity": 0.4251968503937008, "duration": 0.1328125 }, { "name": "D5", "midi": 74, "time": 121.83203125, "velocity": 0.48031496062992124, "duration": 0.16796875 }, { "name": "G#2", "midi": 44, "time": 121.83203125, "velocity": 0.4330708661417323, "duration": 0.16796875 }, { "name": "D#5", "midi": 75, "time": 122, "velocity": 0.47244094488188976, "duration": 1.40234375 }, { "name": "G4", "midi": 67, "time": 122, "velocity": 0.6535433070866141, "duration": 0.1640625 }, { "name": "D#2", "midi": 39, "time": 122, "velocity": 0.41732283464566927, "duration": 0.078125 }, { "name": "A#4", "midi": 70, "time": 122.1640625, "velocity": 0.5354330708661418, "duration": 0.1328125 }, { "name": "G2", "midi": 43, "time": 122.1640625, "velocity": 0.5196850393700787, "duration": 0.08203125 }, { "name": "A#4", "midi": 70, "time": 122.33203125, "velocity": 0.5118110236220472, "duration": 0.16796875 }, { "name": "A#2", "midi": 46, "time": 122.33203125, "velocity": 0.44881889763779526, "duration": 0.08203125 }, { "name": "G4", "midi": 67, "time": 122.5, "velocity": 0.4251968503937008, "duration": 0.1640625 }, { "name": "D#3", "midi": 51, "time": 122.5, "velocity": 0.5039370078740157, "duration": 0.078125 }, { "name": "A#4", "midi": 70, "time": 122.6640625, "velocity": 0.5118110236220472, "duration": 0.1328125 }, { "name": "G3", "midi": 55, "time": 122.6640625, "velocity": 0.4881889763779528, "duration": 0.08203125 }, { "name": "A#4", "midi": 70, "time": 122.83203125, "velocity": 0.48031496062992124, "duration": 0.16796875 }, { "name": "A#3", "midi": 58, "time": 122.83203125, "velocity": 0.5354330708661418, "duration": 0.08203125 }, { "name": "G4", "midi": 67, "time": 123, "velocity": 0.44881889763779526, "duration": 0.1640625 }, { "name": "D#4", "midi": 63, "time": 123, "velocity": 0.5590551181102362, "duration": 1 }, { "name": "A#4", "midi": 70, "time": 123.1640625, "velocity": 0.5196850393700787, "duration": 0.1328125 }, { "name": "A#4", "midi": 70, "time": 123.33203125, "velocity": 0.48031496062992124, "duration": 0.16796875 }, { "name": "E5", "midi": 76, "time": 123.5, "velocity": 0.48031496062992124, "duration": 0.40234375 }, { "name": "G4", "midi": 67, "time": 123.5, "velocity": 0.3937007874015748, "duration": 0.1640625 }, { "name": "A#4", "midi": 70, "time": 123.6640625, "velocity": 0.5275590551181102, "duration": 0.1328125 }, { "name": "A#4", "midi": 70, "time": 123.83203125, "velocity": 0.47244094488188976, "duration": 0.16796875 }, { "name": "F5", "midi": 77, "time": 124, "velocity": 0.48031496062992124, "duration": 0.90234375 }, { "name": "G4", "midi": 67, "time": 124, "velocity": 0.41732283464566927, "duration": 0.1640625 }, { "name": "C#2", "midi": 37, "time": 124, "velocity": 0.3937007874015748, "duration": 0.078125 }, { "name": "A#4", "midi": 70, "time": 124.1640625, "velocity": 0.5433070866141733, "duration": 0.1328125 }, { "name": "G2", "midi": 43, "time": 124.1640625, "velocity": 0.5196850393700787, "duration": 0.08203125 }, { "name": "A#4", "midi": 70, "time": 124.33203125, "velocity": 0.4566929133858268, "duration": 0.16796875 }, { "name": "A#2", "midi": 46, "time": 124.33203125, "velocity": 0.5118110236220472, "duration": 0.08203125 }, { "name": "G4", "midi": 67, "time": 124.5, "velocity": 0.41732283464566927, "duration": 0.1640625 }, { "name": "C#3", "midi": 49, "time": 124.5, "velocity": 0.4881889763779528, "duration": 0.078125 }, { "name": "A#4", "midi": 70, "time": 124.6640625, "velocity": 0.5275590551181102, "duration": 0.1328125 }, { "name": "G3", "midi": 55, "time": 124.6640625, "velocity": 0.5275590551181102, "duration": 0.08203125 }, { "name": "A#4", "midi": 70, "time": 124.83203125, "velocity": 0.49606299212598426, "duration": 0.16796875 }, { "name": "A#3", "midi": 58, "time": 124.83203125, "velocity": 0.49606299212598426, "duration": 0.08203125 }, { "name": "A#4", "midi": 70, "time": 125, "velocity": 0.3700787401574803, "duration": 0.65234375 }, { "name": "G4", "midi": 67, "time": 125, "velocity": 0.4566929133858268, "duration": 0.1640625 }, { "name": "C#4", "midi": 61, "time": 125, "velocity": 0.5196850393700787, "duration": 1 }, { "name": "D#4", "midi": 63, "time": 125.1640625, "velocity": 0.4094488188976378, "duration": 0.1328125 }, { "name": "D#4", "midi": 63, "time": 125.33203125, "velocity": 0.4409448818897638, "duration": 0.16796875 }, { "name": "G4", "midi": 67, "time": 125.5, "velocity": 0.5039370078740157, "duration": 0.1640625 }, { "name": "D#4", "midi": 63, "time": 125.6640625, "velocity": 0.4251968503937008, "duration": 0.1328125 }, { "name": "C5", "midi": 72, "time": 125.75, "velocity": 0.47244094488188976, "duration": 0.125 }, { "name": "D#4", "midi": 63, "time": 125.83203125, "velocity": 0.48031496062992124, "duration": 0.1328125 }, { "name": "C#5", "midi": 73, "time": 125.875, "velocity": 0.4881889763779528, "duration": 0.09765625 }, { "name": "D#5", "midi": 75, "time": 126, "velocity": 0.5118110236220472, "duration": 0.90234375 }, { "name": "G#4", "midi": 68, "time": 126, "velocity": 0.5433070866141733, "duration": 0.1640625 }, { "name": "C4", "midi": 60, "time": 126, "velocity": 0.49606299212598426, "duration": 1 }, { "name": "D#4", "midi": 63, "time": 126.1640625, "velocity": 0.4330708661417323, "duration": 0.1328125 }, { "name": "D#4", "midi": 63, "time": 126.33203125, "velocity": 0.47244094488188976, "duration": 0.16796875 }, { "name": "G#4", "midi": 68, "time": 126.5, "velocity": 0.5905511811023622, "duration": 0.1640625 }, { "name": "D#4", "midi": 63, "time": 126.6640625, "velocity": 0.4015748031496063, "duration": 0.1328125 }, { "name": "D#4", "midi": 63, "time": 126.83203125, "velocity": 0.44881889763779526, "duration": 0.16796875 }, { "name": "A4", "midi": 69, "time": 127, "velocity": 0.4094488188976378, "duration": 0.90234375 }, { "name": "D#4", "midi": 63, "time": 127, "velocity": 0.49606299212598426, "duration": 0.1640625 }, { "name": "F3", "midi": 53, "time": 127, "velocity": 0.41732283464566927, "duration": 1 }, { "name": "C4", "midi": 60, "time": 127.1640625, "velocity": 0.4015748031496063, "duration": 0.1328125 }, { "name": "C4", "midi": 60, "time": 127.33203125, "velocity": 0.47244094488188976, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 127.5, "velocity": 0.5039370078740157, "duration": 0.1640625 }, { "name": "C4", "midi": 60, "time": 127.6640625, "velocity": 0.4645669291338583, "duration": 0.1328125 }, { "name": "C4", "midi": 60, "time": 127.83203125, "velocity": 0.4566929133858268, "duration": 0.16796875 }, { "name": "C#5", "midi": 73, "time": 128, "velocity": 0.5354330708661418, "duration": 0.8046875 }, { "name": "F4", "midi": 65, "time": 128, "velocity": 0.5196850393700787, "duration": 0.12890625 }, { "name": "A#2", "midi": 46, "time": 128, "velocity": 0.44881889763779526, "duration": 0.90234375 }, { "name": "C#4", "midi": 61, "time": 128.1640625, "velocity": 0.4015748031496063, "duration": 0.1328125 }, { "name": "C#4", "midi": 61, "time": 128.33203125, "velocity": 0.4645669291338583, "duration": 0.16796875 }, { "name": "F4", "midi": 65, "time": 128.5, "velocity": 0.5511811023622047, "duration": 0.1640625 }, { "name": "C#4", "midi": 61, "time": 128.6640625, "velocity": 0.41732283464566927, "duration": 0.1328125 }, { "name": "C#4", "midi": 61, "time": 128.83203125, "velocity": 0.48031496062992124, "duration": 0.16796875 }, { "name": "C#5", "midi": 73, "time": 129, "velocity": 0.5039370078740157, "duration": 0.1640625 }, { "name": "G4", "midi": 67, "time": 129, "velocity": 0.5275590551181102, "duration": 0.1640625 }, { "name": "A#2", "midi": 46, "time": 129, "velocity": 0.47244094488188976, "duration": 0.1640625 }, { "name": "D#2", "midi": 39, "time": 129, "velocity": 0.4881889763779528, "duration": 0.5 }, { "name": "C5", "midi": 72, "time": 129.1640625, "velocity": 0.47244094488188976, "duration": 0.10546875 }, { "name": "C#4", "midi": 61, "time": 129.1640625, "velocity": 0.4015748031496063, "duration": 0.10546875 }, { "name": "D#3", "midi": 51, "time": 129.1640625, "velocity": 0.5039370078740157, "duration": 0.16796875 }, { "name": "A#4", "midi": 70, "time": 129.33203125, "velocity": 0.4409448818897638, "duration": 0.16796875 }, { "name": "C#4", "midi": 61, "time": 129.33203125, "velocity": 0.4645669291338583, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 129.33203125, "velocity": 0.5039370078740157, "duration": 0.16796875 }, { "name": "A#4", "midi": 70, "time": 129.5, "velocity": 0.47244094488188976, "duration": 0.1640625 }, { "name": "C#4", "midi": 61, "time": 129.5, "velocity": 0.48031496062992124, "duration": 0.1640625 }, { "name": "D#2", "midi": 39, "time": 129.5, "velocity": 0.4251968503937008, "duration": 0.1640625 }, { "name": "D#2", "midi": 39, "time": 129.5, "velocity": 0.48031496062992124, "duration": 0.5 }, { "name": "G#4", "midi": 68, "time": 129.6640625, "velocity": 0.4409448818897638, "duration": 0.10546875 }, { "name": "C#4", "midi": 61, "time": 129.6640625, "velocity": 0.4645669291338583, "duration": 0.10546875 }, { "name": "D#3", "midi": 51, "time": 129.6640625, "velocity": 0.5590551181102362, "duration": 0.16796875 }, { "name": "G4", "midi": 67, "time": 129.83203125, "velocity": 0.44881889763779526, "duration": 0.16796875 }, { "name": "C#4", "midi": 61, "time": 129.83203125, "velocity": 0.48031496062992124, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 129.83203125, "velocity": 0.48031496062992124, "duration": 0.16796875 }, { "name": "G#4", "midi": 68, "time": 130, "velocity": 0.47244094488188976, "duration": 0.40234375 }, { "name": "C4", "midi": 60, "time": 130, "velocity": 0.4330708661417323, "duration": 0.40234375 }, { "name": "G#2", "midi": 44, "time": 130, "velocity": 0.4566929133858268, "duration": 0.1640625 }, { "name": "D#3", "midi": 51, "time": 130.1640625, "velocity": 0.4251968503937008, "duration": 0.08203125 }, { "name": "D#3", "midi": 51, "time": 130.33203125, "velocity": 0.3937007874015748, "duration": 0.0625 }, { "name": "D#3", "midi": 51, "time": 130.5, "velocity": 0.3779527559055118, "duration": 0.078125 }, { "name": "D#3", "midi": 51, "time": 130.6640625, "velocity": 0.4094488188976378, "duration": 0.0625 }, { "name": "D#3", "midi": 51, "time": 130.83203125, "velocity": 0.4251968503937008, "duration": 0.08203125 }, { "name": "D#3", "midi": 51, "time": 131, "velocity": 0.4251968503937008, "duration": 0.1640625 }, { "name": "D#3", "midi": 51, "time": 131.1640625, "velocity": 0.4094488188976378, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 131.33203125, "velocity": 0.4015748031496063, "duration": 0.16796875 }, { "name": "D#5", "midi": 75, "time": 131.5, "velocity": 0.33070866141732286, "duration": 0.375 }, { "name": "D#3", "midi": 51, "time": 131.5, "velocity": 0.41732283464566927, "duration": 0.1640625 }, { "name": "D#3", "midi": 51, "time": 131.6640625, "velocity": 0.36220472440944884, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 131.83203125, "velocity": 0.4094488188976378, "duration": 0.16796875 }, { "name": "E5", "midi": 76, "time": 131.875, "velocity": 0.4409448818897638, "duration": 0.125 }, { "name": "F5", "midi": 77, "time": 132, "velocity": 0.4094488188976378, "duration": 0.6640625 }, { "name": "D#2", "midi": 39, "time": 132, "velocity": 0.3700787401574803, "duration": 0.1640625 }, { "name": "C#3", "midi": 49, "time": 132, "velocity": 0.3700787401574803, "duration": 0.1640625 }, { "name": "D#3", "midi": 51, "time": 132, "velocity": 0.3700787401574803, "duration": 0.1640625 }, { "name": "D#2", "midi": 39, "time": 132.1640625, "velocity": 0.47244094488188976, "duration": 0.16796875 }, { "name": "C#3", "midi": 49, "time": 132.1640625, "velocity": 0.47244094488188976, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 132.1640625, "velocity": 0.47244094488188976, "duration": 0.16796875 }, { "name": "D#2", "midi": 39, "time": 132.33203125, "velocity": 0.5275590551181102, "duration": 0.16796875 }, { "name": "C#3", "midi": 49, "time": 132.33203125, "velocity": 0.5275590551181102, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 132.33203125, "velocity": 0.5275590551181102, "duration": 0.16796875 }, { "name": "D#2", "midi": 39, "time": 132.5, "velocity": 0.6062992125984252, "duration": 0.1640625 }, { "name": "C#3", "midi": 49, "time": 132.5, "velocity": 0.6062992125984252, "duration": 0.1640625 }, { "name": "D#3", "midi": 51, "time": 132.5, "velocity": 0.6062992125984252, "duration": 0.1640625 }, { "name": "D#5", "midi": 75, "time": 132.6640625, "velocity": 0.6692913385826772, "duration": 0.1328125 }, { "name": "D#2", "midi": 39, "time": 132.6640625, "velocity": 0.6850393700787402, "duration": 0.16796875 }, { "name": "C#3", "midi": 49, "time": 132.6640625, "velocity": 0.6850393700787402, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 132.6640625, "velocity": 0.6850393700787402, "duration": 0.16796875 }, { "name": "C#5", "midi": 73, "time": 132.83203125, "velocity": 0.7165354330708661, "duration": 0.08203125 }, { "name": "D#2", "midi": 39, "time": 132.83203125, "velocity": 0.7559055118110236, "duration": 0.16796875 }, { "name": "C#3", "midi": 49, "time": 132.83203125, "velocity": 0.7559055118110236, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 132.83203125, "velocity": 0.7559055118110236, "duration": 0.16796875 }, { "name": "C5", "midi": 72, "time": 133, "velocity": 0.6929133858267716, "duration": 0.078125 }, { "name": "D#2", "midi": 39, "time": 133, "velocity": 0.7480314960629921, "duration": 0.1640625 }, { "name": "C#3", "midi": 49, "time": 133, "velocity": 0.7480314960629921, "duration": 0.1640625 }, { "name": "D#3", "midi": 51, "time": 133, "velocity": 0.7480314960629921, "duration": 0.1640625 }, { "name": "A#4", "midi": 70, "time": 133.1640625, "velocity": 0.7086614173228346, "duration": 0.08203125 }, { "name": "D#2", "midi": 39, "time": 133.1640625, "velocity": 0.7401574803149606, "duration": 0.16796875 }, { "name": "C#3", "midi": 49, "time": 133.1640625, "velocity": 0.7401574803149606, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 133.1640625, "velocity": 0.7401574803149606, "duration": 0.16796875 }, { "name": "G#4", "midi": 68, "time": 133.33203125, "velocity": 0.5826771653543307, "duration": 0.0625 }, { "name": "D#2", "midi": 39, "time": 133.33203125, "velocity": 0.6141732283464567, "duration": 0.16796875 }, { "name": "C#3", "midi": 49, "time": 133.33203125, "velocity": 0.6141732283464567, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 133.33203125, "velocity": 0.6141732283464567, "duration": 0.16796875 }, { "name": "G4", "midi": 67, "time": 133.5, "velocity": 0.5196850393700787, "duration": 0.1640625 }, { "name": "D#2", "midi": 39, "time": 133.5, "velocity": 0.5275590551181102, "duration": 0.1640625 }, { "name": "C#3", "midi": 49, "time": 133.5, "velocity": 0.5275590551181102, "duration": 0.1640625 }, { "name": "D#3", "midi": 51, "time": 133.5, "velocity": 0.5275590551181102, "duration": 0.1640625 }, { "name": "C#5", "midi": 73, "time": 133.6640625, "velocity": 0.48031496062992124, "duration": 0.16796875 }, { "name": "D#2", "midi": 39, "time": 133.6640625, "velocity": 0.4645669291338583, "duration": 0.16796875 }, { "name": "C#3", "midi": 49, "time": 133.6640625, "velocity": 0.4645669291338583, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 133.6640625, "velocity": 0.4645669291338583, "duration": 0.16796875 }, { "name": "G4", "midi": 67, "time": 133.83203125, "velocity": 0.3464566929133858, "duration": 0.1328125 }, { "name": "D#2", "midi": 39, "time": 133.83203125, "velocity": 0.36220472440944884, "duration": 0.16796875 }, { "name": "C#3", "midi": 49, "time": 133.83203125, "velocity": 0.36220472440944884, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 133.83203125, "velocity": 0.36220472440944884, "duration": 0.16796875 }, { "name": "G#4", "midi": 68, "time": 134, "velocity": 0.3937007874015748, "duration": 0.375 }, { "name": "G#2", "midi": 44, "time": 134, "velocity": 0.3700787401574803, "duration": 0.1640625 }, { "name": "C3", "midi": 48, "time": 134, "velocity": 0.3700787401574803, "duration": 0.1640625 }, { "name": "D#3", "midi": 51, "time": 134, "velocity": 0.3700787401574803, "duration": 0.1640625 }, { "name": "D#3", "midi": 51, "time": 134.1640625, "velocity": 0.3779527559055118, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 134.33203125, "velocity": 0.3700787401574803, "duration": 0.16796875 }, { "name": "C5", "midi": 72, "time": 134.375, "velocity": 0.4094488188976378, "duration": 0.125 }, { "name": "D#4", "midi": 63, "time": 134.5, "velocity": 0.28346456692913385, "duration": 0.40234375 }, { "name": "D#3", "midi": 51, "time": 134.5, "velocity": 0.3779527559055118, "duration": 0.1640625 }, { "name": "D#3", "midi": 51, "time": 134.6640625, "velocity": 0.4015748031496063, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 134.83203125, "velocity": 0.4094488188976378, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 135, "velocity": 0.4251968503937008, "duration": 0.1640625 }, { "name": "D#3", "midi": 51, "time": 135.1640625, "velocity": 0.3700787401574803, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 135.33203125, "velocity": 0.3858267716535433, "duration": 0.16796875 }, { "name": "D#5", "midi": 75, "time": 135.5, "velocity": 0.3228346456692913, "duration": 0.375 }, { "name": "D#6", "midi": 87, "time": 135.5, "velocity": 0.3228346456692913, "duration": 0.375 }, { "name": "D#3", "midi": 51, "time": 135.5, "velocity": 0.4409448818897638, "duration": 0.1640625 }, { "name": "D#3", "midi": 51, "time": 135.6640625, "velocity": 0.36220472440944884, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 135.83203125, "velocity": 0.3464566929133858, "duration": 0.16796875 }, { "name": "E5", "midi": 76, "time": 135.875, "velocity": 0.41732283464566927, "duration": 0.09765625 }, { "name": "E6", "midi": 88, "time": 135.875, "velocity": 0.41732283464566927, "duration": 0.09765625 }, { "name": "F5", "midi": 77, "time": 136, "velocity": 0.3858267716535433, "duration": 0.6640625 }, { "name": "F6", "midi": 89, "time": 136, "velocity": 0.3858267716535433, "duration": 0.6640625 }, { "name": "D#2", "midi": 39, "time": 136, "velocity": 0.3700787401574803, "duration": 0.1640625 }, { "name": "C#3", "midi": 49, "time": 136, "velocity": 0.3700787401574803, "duration": 0.1640625 }, { "name": "D#3", "midi": 51, "time": 136, "velocity": 0.3700787401574803, "duration": 0.1640625 }, { "name": "D#2", "midi": 39, "time": 136.1640625, "velocity": 0.4645669291338583, "duration": 0.16796875 }, { "name": "C#3", "midi": 49, "time": 136.1640625, "velocity": 0.4645669291338583, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 136.1640625, "velocity": 0.4645669291338583, "duration": 0.16796875 }, { "name": "D#2", "midi": 39, "time": 136.33203125, "velocity": 0.5354330708661418, "duration": 0.16796875 }, { "name": "C#3", "midi": 49, "time": 136.33203125, "velocity": 0.5354330708661418, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 136.33203125, "velocity": 0.5354330708661418, "duration": 0.16796875 }, { "name": "D#2", "midi": 39, "time": 136.5, "velocity": 0.6062992125984252, "duration": 0.1640625 }, { "name": "C#3", "midi": 49, "time": 136.5, "velocity": 0.6062992125984252, "duration": 0.1640625 }, { "name": "D#3", "midi": 51, "time": 136.5, "velocity": 0.6062992125984252, "duration": 0.1640625 }, { "name": "D#5", "midi": 75, "time": 136.6640625, "velocity": 0.6692913385826772, "duration": 0.1328125 }, { "name": "D#6", "midi": 87, "time": 136.6640625, "velocity": 0.6692913385826772, "duration": 0.1328125 }, { "name": "D#2", "midi": 39, "time": 136.6640625, "velocity": 0.6771653543307087, "duration": 0.16796875 }, { "name": "C#3", "midi": 49, "time": 136.6640625, "velocity": 0.6771653543307087, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 136.6640625, "velocity": 0.6771653543307087, "duration": 0.16796875 }, { "name": "C#5", "midi": 73, "time": 136.83203125, "velocity": 0.7007874015748031, "duration": 0.08203125 }, { "name": "C#6", "midi": 85, "time": 136.83203125, "velocity": 0.7007874015748031, "duration": 0.08203125 }, { "name": "D#2", "midi": 39, "time": 136.83203125, "velocity": 0.7716535433070866, "duration": 0.16796875 }, { "name": "C#3", "midi": 49, "time": 136.83203125, "velocity": 0.7716535433070866, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 136.83203125, "velocity": 0.7716535433070866, "duration": 0.16796875 }, { "name": "C5", "midi": 72, "time": 137, "velocity": 0.7401574803149606, "duration": 0.078125 }, { "name": "C6", "midi": 84, "time": 137, "velocity": 0.7401574803149606, "duration": 0.078125 }, { "name": "D#2", "midi": 39, "time": 137, "velocity": 0.7952755905511811, "duration": 0.1640625 }, { "name": "C#3", "midi": 49, "time": 137, "velocity": 0.7952755905511811, "duration": 0.1640625 }, { "name": "D#3", "midi": 51, "time": 137, "velocity": 0.7952755905511811, "duration": 0.1640625 }, { "name": "A#4", "midi": 70, "time": 137.1640625, "velocity": 0.6456692913385826, "duration": 0.08203125 }, { "name": "A#5", "midi": 82, "time": 137.1640625, "velocity": 0.6456692913385826, "duration": 0.08203125 }, { "name": "D#2", "midi": 39, "time": 137.1640625, "velocity": 0.7165354330708661, "duration": 0.16796875 }, { "name": "C#3", "midi": 49, "time": 137.1640625, "velocity": 0.7165354330708661, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 137.1640625, "velocity": 0.7165354330708661, "duration": 0.16796875 }, { "name": "G#4", "midi": 68, "time": 137.33203125, "velocity": 0.5905511811023622, "duration": 0.0625 }, { "name": "G#5", "midi": 80, "time": 137.33203125, "velocity": 0.5905511811023622, "duration": 0.0625 }, { "name": "D#2", "midi": 39, "time": 137.33203125, "velocity": 0.6299212598425197, "duration": 0.16796875 }, { "name": "C#3", "midi": 49, "time": 137.33203125, "velocity": 0.6299212598425197, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 137.33203125, "velocity": 0.6299212598425197, "duration": 0.16796875 }, { "name": "G4", "midi": 67, "time": 137.5, "velocity": 0.5196850393700787, "duration": 0.1640625 }, { "name": "G5", "midi": 79, "time": 137.5, "velocity": 0.5196850393700787, "duration": 0.1640625 }, { "name": "D#2", "midi": 39, "time": 137.5, "velocity": 0.5590551181102362, "duration": 0.1640625 }, { "name": "C#3", "midi": 49, "time": 137.5, "velocity": 0.5590551181102362, "duration": 0.1640625 }, { "name": "D#3", "midi": 51, "time": 137.5, "velocity": 0.5590551181102362, "duration": 0.1640625 }, { "name": "C#5", "midi": 73, "time": 137.6640625, "velocity": 0.48031496062992124, "duration": 0.16796875 }, { "name": "C#6", "midi": 85, "time": 137.6640625, "velocity": 0.48031496062992124, "duration": 0.16796875 }, { "name": "D#2", "midi": 39, "time": 137.6640625, "velocity": 0.4645669291338583, "duration": 0.16796875 }, { "name": "C#3", "midi": 49, "time": 137.6640625, "velocity": 0.4645669291338583, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 137.6640625, "velocity": 0.4645669291338583, "duration": 0.16796875 }, { "name": "G4", "midi": 67, "time": 137.83203125, "velocity": 0.31496062992125984, "duration": 0.1328125 }, { "name": "G5", "midi": 79, "time": 137.83203125, "velocity": 0.31496062992125984, "duration": 0.1328125 }, { "name": "D#2", "midi": 39, "time": 137.83203125, "velocity": 0.33070866141732286, "duration": 0.16796875 }, { "name": "C#3", "midi": 49, "time": 137.83203125, "velocity": 0.33070866141732286, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 137.83203125, "velocity": 0.33070866141732286, "duration": 0.16796875 }, { "name": "G#4", "midi": 68, "time": 138, "velocity": 0.3700787401574803, "duration": 0.5 }, { "name": "G#5", "midi": 80, "time": 138, "velocity": 0.3700787401574803, "duration": 0.5 }, { "name": "G#2", "midi": 44, "time": 138, "velocity": 0.3858267716535433, "duration": 0.5 }, { "name": "C3", "midi": 48, "time": 138, "velocity": 0.3858267716535433, "duration": 0.5 }, { "name": "D#3", "midi": 51, "time": 138, "velocity": 0.3858267716535433, "duration": 0.5 }, { "name": "D#5", "midi": 75, "time": 138.9609375, "velocity": 0.4645669291338583, "duration": 0.0390625 }, { "name": "C#5", "midi": 73, "time": 139, "velocity": 0.4881889763779528, "duration": 0.1640625 }, { "name": "D#4", "midi": 63, "time": 139, "velocity": 0.49606299212598426, "duration": 1 }, { "name": "G4", "midi": 67, "time": 139, "velocity": 0.49606299212598426, "duration": 1 }, { "name": "C5", "midi": 72, "time": 139.1640625, "velocity": 0.3543307086614173, "duration": 0.16796875 }, { "name": "C#5", "midi": 73, "time": 139.33203125, "velocity": 0.3937007874015748, "duration": 0.1328125 }, { "name": "F5", "midi": 77, "time": 139.5, "velocity": 0.41732283464566927, "duration": 0.1640625 }, { "name": "D#5", "midi": 75, "time": 139.6640625, "velocity": 0.3464566929133858, "duration": 0.1328125 }, { "name": "C#5", "midi": 73, "time": 139.83203125, "velocity": 0.33070866141732286, "duration": 0.08203125 }, { "name": "C5", "midi": 72, "time": 140, "velocity": 0.33070866141732286, "duration": 0.5 }, { "name": "G#3", "midi": 56, "time": 140, "velocity": 0.4015748031496063, "duration": 0.5 }, { "name": "G#4", "midi": 68, "time": 140, "velocity": 0.4015748031496063, "duration": 0.5 }, { "name": "C5", "midi": 72, "time": 140.9609375, "velocity": 0.4409448818897638, "duration": 0.0390625 }, { "name": "A#4", "midi": 70, "time": 141, "velocity": 0.48031496062992124, "duration": 0.1640625 }, { "name": "G4", "midi": 67, "time": 141, "velocity": 0.4881889763779528, "duration": 1 }, { "name": "D#3", "midi": 51, "time": 141, "velocity": 0.44881889763779526, "duration": 1 }, { "name": "C#4", "midi": 61, "time": 141, "velocity": 0.44881889763779526, "duration": 1 }, { "name": "A4", "midi": 69, "time": 141.1640625, "velocity": 0.3700787401574803, "duration": 0.16796875 }, { "name": "A#4", "midi": 70, "time": 141.33203125, "velocity": 0.4015748031496063, "duration": 0.16796875 }, { "name": "C#5", "midi": 73, "time": 141.5, "velocity": 0.3937007874015748, "duration": 0.1640625 }, { "name": "C5", "midi": 72, "time": 141.6640625, "velocity": 0.3700787401574803, "duration": 0.1328125 }, { "name": "A#4", "midi": 70, "time": 141.83203125, "velocity": 0.33070866141732286, "duration": 0.08203125 }, { "name": "G#4", "midi": 68, "time": 142, "velocity": 0.3543307086614173, "duration": 0.40234375 }, { "name": "G#3", "midi": 56, "time": 142, "velocity": 0.33070866141732286, "duration": 0.40234375 }, { "name": "C4", "midi": 60, "time": 142, "velocity": 0.33070866141732286, "duration": 0.40234375 }, { "name": "C4", "midi": 60, "time": 142.95703125, "velocity": 0.48031496062992124, "duration": 0.04296875 }, { "name": "A#3", "midi": 58, "time": 143, "velocity": 0.5039370078740157, "duration": 0.1640625 }, { "name": "G3", "midi": 55, "time": 143, "velocity": 0.47244094488188976, "duration": 0.90234375 }, { "name": "D#2", "midi": 39, "time": 143, "velocity": 0.49606299212598426, "duration": 1 }, { "name": "C#3", "midi": 49, "time": 143, "velocity": 0.49606299212598426, "duration": 1 }, { "name": "A3", "midi": 57, "time": 143.1640625, "velocity": 0.3700787401574803, "duration": 0.16796875 }, { "name": "A#3", "midi": 58, "time": 143.33203125, "velocity": 0.36220472440944884, "duration": 0.1328125 }, { "name": "C#4", "midi": 61, "time": 143.5, "velocity": 0.4015748031496063, "duration": 0.1640625 }, { "name": "C4", "midi": 60, "time": 143.6640625, "velocity": 0.3937007874015748, "duration": 0.1328125 }, { "name": "A#3", "midi": 58, "time": 143.83203125, "velocity": 0.3464566929133858, "duration": 0.08203125 }, { "name": "G#3", "midi": 56, "time": 144, "velocity": 0.41732283464566927, "duration": 0.25 }, { "name": "G#2", "midi": 44, "time": 144, "velocity": 0.3937007874015748, "duration": 0.19921875 }, { "name": "C3", "midi": 48, "time": 144, "velocity": 0.3937007874015748, "duration": 0.19921875 }, { "name": "C3", "midi": 48, "time": 144.5, "velocity": 0.3779527559055118, "duration": 0.25 }, { "name": "D#3", "midi": 51, "time": 144.5, "velocity": 0.3779527559055118, "duration": 0.25 }, { "name": "G#3", "midi": 56, "time": 144.5, "velocity": 0.3779527559055118, "duration": 0.25 }, { "name": "G#1", "midi": 32, "time": 144.5, "velocity": 0.36220472440944884, "duration": 0.25 }, { "name": "C3", "midi": 48, "time": 145, "velocity": 0.33070866141732286, "duration": 1 }, { "name": "G#3", "midi": 56, "time": 145, "velocity": 0.33070866141732286, "duration": 1 }, { "name": "G#1", "midi": 32, "time": 145, "velocity": 0.3464566929133858, "duration": 1 }, { "name": "G#2", "midi": 44, "time": 145, "velocity": 0.3464566929133858, "duration": 1 }], "controlChanges": { "7": [{ "number": 7, "time": 0, "value": 0.7874015748031497 }, { "number": 7, "time": 0, "value": 0.7874015748031497 }], "10": [{ "number": 10, "time": 0, "value": 0.4015748031496063 }, { "number": 10, "time": 0, "value": 0.4015748031496063 }], "64": [{ "number": 64, "time": 0, "value": 0 }, { "number": 64, "time": 0, "value": 0 }], "91": [{ "number": 91, "time": 0, "value": 0.3779527559055118 }, { "number": 91, "time": 0, "value": 0.3779527559055118 }], "121": [{ "number": 121, "time": 0, "value": 0 }, { "number": 121, "time": 0, "value": 0 }] }, "id": 1, "name": "Piano", "instrumentNumber": 0, "instrument": "acoustic grand piano", "instrumentFamily": "piano", "channelNumber": 0, "isPercussion": false }] }

  newdata = {
    "header": { "PPQ": 256, "timeSignature": [2, 4], "bpm": 60, "name": "" }, "startTime": 0, "duration": 146,
    "tracks": [{ "startTime": 0, "duration": 0, "length": 0, "notes": [], "controlChanges": {}, "id": 0 }, { "startTime": 0, "duration": 146, "length": 1624, "notes": [{ "name": "C4", "midi": 60, "time": 0, "velocity": 0.41732283464566927, "duration": 1, "hand": 1 }, { "name": "G#3", "midi": 56, "time": 0, "velocity": 0.41732283464566927, "duration": 0.25, "hand": 1 }, { "name": "G#2", "midi": 44, "time": 0, "velocity": 0.4251968503937008, "duration": 1 }, { "name": "D#3", "midi": 51, "time": 0.25, "velocity": 0.44881889763779526, "duration": 0.25 }, { "name": "G#3", "midi": 56, "time": 0.5, "velocity": 0.4881889763779528, "duration": 0.25, "hand": 1 }, { "name": "D#3", "midi": 51, "time": 0.75, "velocity": 0.4330708661417323, "duration": 0.25 }, { "name": "A#3", "midi": 58, "time": 1, "velocity": 0.44881889763779526, "duration": 1, "hand": 1 }, { "name": "G3", "midi": 55, "time": 1, "velocity": 0.47244094488188976, "duration": 0.25, "hand": 1 }, { "name": "C#3", "midi": 49, "time": 1, "velocity": 0.48031496062992124, "duration": 1 }, { "name": "D#3", "midi": 51, "time": 1.25, "velocity": 0.47244094488188976, "duration": 0.25 }, { "name": "G3", "midi": 55, "time": 1.5, "velocity": 0.5118110236220472, "duration": 0.25, "hand": 1 }, { "name": "D#3", "midi": 51, "time": 1.75, "velocity": 0.4645669291338583, "duration": 0.25 }, { "name": "D#4", "midi": 63, "time": 2, "velocity": 0.5590551181102362, "duration": 1.5, "hand": 1 }, { "name": "G#3", "midi": 56, "time": 2, "velocity": 0.5039370078740157, "duration": 0.25, "hand": 1 }, { "name": "C3", "midi": 48, "time": 2, "velocity": 0.48031496062992124, "duration": 1 }, { "name": "D#3", "midi": 51, "time": 2.25, "velocity": 0.4566929133858268, "duration": 0.25 }, { "name": "G#3", "midi": 56, "time": 2.5, "velocity": 0.5275590551181102, "duration": 0.25, "hand": 1 }, { "name": "D#3", "midi": 51, "time": 2.75, "velocity": 0.48031496062992124, "duration": 0.25 }, { "name": "A#3", "midi": 58, "time": 3, "velocity": 0.49606299212598426, "duration": 0.25, "hand": 1 }, { "name": "G2", "midi": 43, "time": 3, "velocity": 0.4566929133858268, "duration": 0.90234375 }, { "name": "D#3", "midi": 51, "time": 3.25, "velocity": 0.4409448818897638, "duration": 0.25 }, { "name": "C#4", "midi": 61, "time": 3.5, "velocity": 0.4645669291338583, "duration": 0.40234375, "hand": 1 }, { "name": "A#3", "midi": 58, "time": 3.5, "velocity": 0.5196850393700787, "duration": 0.19921875, "hand": 1 }, { "name": "D#3", "midi": 51, "time": 3.75, "velocity": 0.4251968503937008, "duration": 0.25 }, { "name": "C4", "midi": 60, "time": 4, "velocity": 0.47244094488188976, "duration": 0.5, "hand": 1 }, { "name": "G#3", "midi": 56, "time": 4, "velocity": 0.5118110236220472, "duration": 0.25, "hand": 1 }, { "name": "G#2", "midi": 44, "time": 4, "velocity": 0.5039370078740157, "duration": 0.5 }, { "name": "D#3", "midi": 51, "time": 4.25, "velocity": 0.4409448818897638, "duration": 0.25 }, { "name": "D#4", "midi": 63, "time": 4.5, "velocity": 0.5275590551181102, "duration": 0.5, "hand": 1 }, { "name": "A#3", "midi": 58, "time": 4.5, "velocity": 0.5511811023622047, "duration": 0.25, "hand": 1 }, { "name": "G2", "midi": 43, "time": 4.5, "velocity": 0.4645669291338583, "duration": 0.5 }, { "name": "D#3", "midi": 51, "time": 4.75, "velocity": 0.4251968503937008, "duration": 0.25 }, { "name": "G#4", "midi": 68, "time": 5, "velocity": 0.5590551181102362, "duration": 0.5 }, { "name": "C4", "midi": 60, "time": 5, "velocity": 0.5984251968503937, "duration": 0.25 }, { "name": "F2", "midi": 41, "time": 5, "velocity": 0.4645669291338583, "duration": 0.5 }, { "name": "G#3", "midi": 56, "time": 5.25, "velocity": 0.48031496062992124, "duration": 0.25 }, { "name": "A#4", "midi": 70, "time": 5.5, "velocity": 0.5275590551181102, "duration": 0.40234375 }, { "name": "D4", "midi": 62, "time": 5.5, "velocity": 0.5354330708661418, "duration": 0.19921875 }, { "name": "F3", "midi": 53, "time": 5.5, "velocity": 0.5669291338582677, "duration": 0.40234375 }, { "name": "G#3", "midi": 56, "time": 5.75, "velocity": 0.44881889763779526, "duration": 0.25 }, { "name": "D#4", "midi": 63, "time": 6, "velocity": 0.4015748031496063, "duration": 1.5 }, { "name": "G3", "midi": 55, "time": 6, "velocity": 0.47244094488188976, "duration": 0.25 }, { "name": "D#3", "midi": 51, "time": 6, "velocity": 0.4881889763779528, "duration": 1 }, { "name": "A#3", "midi": 58, "time": 6.25, "velocity": 0.5039370078740157, "duration": 0.25 }, { "name": "G3", "midi": 55, "time": 6.5, "velocity": 0.4566929133858268, "duration": 0.25 }, { "name": "A#3", "midi": 58, "time": 6.75, "velocity": 0.5039370078740157, "duration": 0.25 }, { "name": "G3", "midi": 55, "time": 7, "velocity": 0.4645669291338583, "duration": 0.25 }, { "name": "D#2", "midi": 39, "time": 7, "velocity": 0.4015748031496063, "duration": 1 }, { "name": "A#3", "midi": 58, "time": 7.25, "velocity": 0.5354330708661418, "duration": 0.25 }, { "name": "E4", "midi": 64, "time": 7.5, "velocity": 0.47244094488188976, "duration": 0.5 }, { "name": "G3", "midi": 55, "time": 7.5, "velocity": 0.4645669291338583, "duration": 0.25 }, { "name": "A#3", "midi": 58, "time": 7.75, "velocity": 0.48031496062992124, "duration": 0.25 }, { "name": "F4", "midi": 65, "time": 8, "velocity": 0.5118110236220472, "duration": 0.90234375 }, { "name": "G3", "midi": 55, "time": 8, "velocity": 0.44881889763779526, "duration": 0.19921875 }, { "name": "C#2", "midi": 37, "time": 8, "velocity": 0.4645669291338583, "duration": 1 }, { "name": "A#3", "midi": 58, "time": 8.25, "velocity": 0.48031496062992124, "duration": 0.25 }, { "name": "G3", "midi": 55, "time": 8.5, "velocity": 0.4566929133858268, "duration": 0.25 }, { "name": "A#3", "midi": 58, "time": 8.75, "velocity": 0.5039370078740157, "duration": 0.25 }, { "name": "A#3", "midi": 58, "time": 9, "velocity": 0.4566929133858268, "duration": 0.75 }, { "name": "G3", "midi": 55, "time": 9, "velocity": 0.47244094488188976, "duration": 0.25 }, { "name": "C#3", "midi": 49, "time": 9, "velocity": 0.5354330708661418, "duration": 0.90234375 }, { "name": "D#3", "midi": 51, "time": 9.25, "velocity": 0.4566929133858268, "duration": 0.25 }, { "name": "G3", "midi": 55, "time": 9.5, "velocity": 0.5196850393700787, "duration": 0.25 }, { "name": "C4", "midi": 60, "time": 9.75, "velocity": 0.5196850393700787, "duration": 0.125 }, { "name": "D#3", "midi": 51, "time": 9.75, "velocity": 0.4566929133858268, "duration": 0.19921875 }, { "name": "C#4", "midi": 61, "time": 9.875, "velocity": 0.5118110236220472, "duration": 0.09765625 }, { "name": "D#4", "midi": 63, "time": 10, "velocity": 0.5354330708661418, "duration": 1 }, { "name": "G#3", "midi": 56, "time": 10, "velocity": 0.48031496062992124, "duration": 0.25 }, { "name": "C3", "midi": 48, "time": 10, "velocity": 0.4645669291338583, "duration": 1 }, { "name": "D#3", "midi": 51, "time": 10.25, "velocity": 0.44881889763779526, "duration": 0.25 }, { "name": "G#3", "midi": 56, "time": 10.5, "velocity": 0.5118110236220472, "duration": 0.25 }, { "name": "D#3", "midi": 51, "time": 10.75, "velocity": 0.44881889763779526, "duration": 0.25 }, { "name": "A3", "midi": 57, "time": 11, "velocity": 0.4330708661417323, "duration": 1 }, { "name": "D#3", "midi": 51, "time": 11, "velocity": 0.47244094488188976, "duration": 0.25 }, { "name": "F2", "midi": 41, "time": 11, "velocity": 0.4330708661417323, "duration": 1 }, { "name": "C3", "midi": 48, "time": 11.25, "velocity": 0.44881889763779526, "duration": 0.25 }, { "name": "D#3", "midi": 51, "time": 11.5, "velocity": 0.4881889763779528, "duration": 0.25 }, { "name": "C3", "midi": 48, "time": 11.75, "velocity": 0.4251968503937008, "duration": 0.25 }, { "name": "C#4", "midi": 61, "time": 12, "velocity": 0.5275590551181102, "duration": 0.90234375 }, { "name": "F3", "midi": 53, "time": 12, "velocity": 0.5354330708661418, "duration": 0.19921875 }, { "name": "A#1", "midi": 34, "time": 12, "velocity": 0.41732283464566927, "duration": 1 }, { "name": "C#3", "midi": 49, "time": 12.25, "velocity": 0.4566929133858268, "duration": 0.25 }, { "name": "F3", "midi": 53, "time": 12.5, "velocity": 0.47244094488188976, "duration": 0.25 }, { "name": "C#3", "midi": 49, "time": 12.75, "velocity": 0.44881889763779526, "duration": 0.25 }, { "name": "C4", "midi": 60, "time": 13, "velocity": 0.4409448818897638, "duration": 0.12109375 }, { "name": "C#3", "midi": 49, "time": 13, "velocity": 0.47244094488188976, "duration": 0.25 }, { "name": "D#2", "midi": 39, "time": 13, "velocity": 0.44881889763779526, "duration": 0.90234375 }, { "name": "A#3", "midi": 58, "time": 13.25, "velocity": 0.4566929133858268, "duration": 0.12109375 }, { "name": "C#3", "midi": 49, "time": 13.25, "velocity": 0.4645669291338583, "duration": 0.25 }, { "name": "G#3", "midi": 56, "time": 13.5, "velocity": 0.4566929133858268, "duration": 0.12109375 }, { "name": "C#3", "midi": 49, "time": 13.5, "velocity": 0.48031496062992124, "duration": 0.25 }, { "name": "G3", "midi": 55, "time": 13.75, "velocity": 0.4645669291338583, "duration": 0.09375 }, { "name": "C#3", "midi": 49, "time": 13.75, "velocity": 0.4566929133858268, "duration": 0.19921875 }, { "name": "G3", "midi": 55, "time": 14, "velocity": 0.48031496062992124, "duration": 0.90234375 }, { "name": "A#3", "midi": 58, "time": 14, "velocity": 0.48031496062992124, "duration": 0.90234375 }, { "name": "C#3", "midi": 49, "time": 14, "velocity": 0.4881889763779528, "duration": 0.25 }, { "name": "G#1", "midi": 32, "time": 14, "velocity": 0.4645669291338583, "duration": 0.5 }, { "name": "D#3", "midi": 51, "time": 14.25, "velocity": 0.4881889763779528, "duration": 0.25 }, { "name": "C#3", "midi": 49, "time": 14.5, "velocity": 0.4409448818897638, "duration": 0.25 }, { "name": "G#2", "midi": 44, "time": 14.5, "velocity": 0.5118110236220472, "duration": 0.5 }, { "name": "D#3", "midi": 51, "time": 14.75, "velocity": 0.49606299212598426, "duration": 0.19921875 }, { "name": "G#1", "midi": 32, "time": 15, "velocity": 0.4330708661417323, "duration": 0.5 }, { "name": "C3", "midi": 48, "time": 15, "velocity": 0.4566929133858268, "duration": 0.078125 }, { "name": "G#3", "midi": 56, "time": 15, "velocity": 0.4566929133858268, "duration": 0.078125 }, { "name": "D#3", "midi": 51, "time": 15.1640625, "velocity": 0.4566929133858268, "duration": 0.08203125 }, { "name": "G#3", "midi": 56, "time": 15.33203125, "velocity": 0.5196850393700787, "duration": 0.08203125 }, { "name": "C4", "midi": 60, "time": 15.5, "velocity": 0.5275590551181102, "duration": 0.078125 }, { "name": "D#4", "midi": 63, "time": 15.6640625, "velocity": 0.5118110236220472, "duration": 0.08203125 }, { "name": "G#4", "midi": 68, "time": 15.83203125, "velocity": 0.5511811023622047, "duration": 0.08203125 }, { "name": "C5", "midi": 72, "time": 16, "velocity": 0.6062992125984252, "duration": 1 }, { "name": "C4", "midi": 60, "time": 16, "velocity": 0.6141732283464567, "duration": 0.25 }, { "name": "G#3", "midi": 56, "time": 16, "velocity": 0.4251968503937008, "duration": 0.25 }, { "name": "G#2", "midi": 44, "time": 16, "velocity": 0.3937007874015748, "duration": 1 }, { "name": "D#4", "midi": 63, "time": 16.25, "velocity": 0.5433070866141733, "duration": 0.25 }, { "name": "D#3", "midi": 51, "time": 16.25, "velocity": 0.4094488188976378, "duration": 0.25 }, { "name": "C4", "midi": 60, "time": 16.5, "velocity": 0.44881889763779526, "duration": 0.25 }, { "name": "G#3", "midi": 56, "time": 16.5, "velocity": 0.4881889763779528, "duration": 0.25 }, { "name": "D#4", "midi": 63, "time": 16.75, "velocity": 0.5354330708661418, "duration": 0.25 }, { "name": "D#3", "midi": 51, "time": 16.75, "velocity": 0.44881889763779526, "duration": 0.25 }, { "name": "A#4", "midi": 70, "time": 17, "velocity": 0.47244094488188976, "duration": 1 }, { "name": "A#3", "midi": 58, "time": 17, "velocity": 0.4251968503937008, "duration": 0.25 }, { "name": "G3", "midi": 55, "time": 17, "velocity": 0.5118110236220472, "duration": 0.25 }, { "name": "C#3", "midi": 49, "time": 17, "velocity": 0.47244094488188976, "duration": 1 }, { "name": "D#4", "midi": 63, "time": 17.25, "velocity": 0.5118110236220472, "duration": 0.25 }, { "name": "D#3", "midi": 51, "time": 17.25, "velocity": 0.4645669291338583, "duration": 0.25 }, { "name": "A#3", "midi": 58, "time": 17.5, "velocity": 0.47244094488188976, "duration": 0.25 }, { "name": "G3", "midi": 55, "time": 17.5, "velocity": 0.49606299212598426, "duration": 0.25 }, { "name": "D#4", "midi": 63, "time": 17.75, "velocity": 0.5354330708661418, "duration": 0.25 }, { "name": "D#3", "midi": 51, "time": 17.75, "velocity": 0.4251968503937008, "duration": 0.25 }, { "name": "D#5", "midi": 75, "time": 18, "velocity": 0.5354330708661418, "duration": 1.5 }, { "name": "D#4", "midi": 63, "time": 18, "velocity": 0.5118110236220472, "duration": 0.25 }, { "name": "G#3", "midi": 56, "time": 18, "velocity": 0.5196850393700787, "duration": 0.25 }, { "name": "C3", "midi": 48, "time": 18, "velocity": 0.4251968503937008, "duration": 1 }, { "name": "G#4", "midi": 68, "time": 18.25, "velocity": 0.5511811023622047, "duration": 0.25 }, { "name": "D#3", "midi": 51, "time": 18.25, "velocity": 0.4409448818897638, "duration": 0.25 }, { "name": "D#4", "midi": 63, "time": 18.5, "velocity": 0.4409448818897638, "duration": 0.25 }, { "name": "G#3", "midi": 56, "time": 18.5, "velocity": 0.4881889763779528, "duration": 0.25 }, { "name": "G#4", "midi": 68, "time": 18.75, "velocity": 0.5275590551181102, "duration": 0.25 }, { "name": "D#3", "midi": 51, "time": 18.75, "velocity": 0.4566929133858268, "duration": 0.25 }, { "name": "D#4", "midi": 63, "time": 19, "velocity": 0.4251968503937008, "duration": 0.25 }, { "name": "G3", "midi": 55, "time": 19, "velocity": 0.5039370078740157, "duration": 0.19921875 }, { "name": "G2", "midi": 43, "time": 19, "velocity": 0.4409448818897638, "duration": 0.90234375 }, { "name": "A#4", "midi": 70, "time": 19.25, "velocity": 0.5748031496062992, "duration": 0.25 }, { "name": "D#3", "midi": 51, "time": 19.25, "velocity": 0.5039370078740157, "duration": 0.25 }, { "name": "C#5", "midi": 73, "time": 19.5, "velocity": 0.41732283464566927, "duration": 0.40234375 }, { "name": "D#4", "midi": 63, "time": 19.5, "velocity": 0.41732283464566927, "duration": 0.19921875 }, { "name": "G3", "midi": 55, "time": 19.5, "velocity": 0.4881889763779528, "duration": 0.25 }, { "name": "A#4", "midi": 70, "time": 19.75, "velocity": 0.5511811023622047, "duration": 0.25 }, { "name": "D#3", "midi": 51, "time": 19.75, "velocity": 0.4330708661417323, "duration": 0.25 }, { "name": "C5", "midi": 72, "time": 20, "velocity": 0.4566929133858268, "duration": 0.5 }, { "name": "D#4", "midi": 63, "time": 20, "velocity": 0.3858267716535433, "duration": 0.25 }, { "name": "G#3", "midi": 56, "time": 20, "velocity": 0.4645669291338583, "duration": 0.25 }, { "name": "G#2", "midi": 44, "time": 20, "velocity": 0.4566929133858268, "duration": 0.5 }, { "name": "G#4", "midi": 68, "time": 20.25, "velocity": 0.4881889763779528, "duration": 0.25 }, { "name": "D#3", "midi": 51, "time": 20.25, "velocity": 0.44881889763779526, "duration": 0.25 }, { "name": "D#5", "midi": 75, "time": 20.5, "velocity": 0.5354330708661418, "duration": 0.5 }, { "name": "D#4", "midi": 63, "time": 20.5, "velocity": 0.4409448818897638, "duration": 0.25 }, { "name": "G3", "midi": 55, "time": 20.5, "velocity": 0.49606299212598426, "duration": 0.25 }, { "name": "G2", "midi": 43, "time": 20.5, "velocity": 0.4645669291338583, "duration": 0.5 }, { "name": "A#4", "midi": 70, "time": 20.75, "velocity": 0.5511811023622047, "duration": 0.25 }, { "name": "D#3", "midi": 51, "time": 20.75, "velocity": 0.4409448818897638, "duration": 0.25 }, { "name": "G#5", "midi": 80, "time": 21, "velocity": 0.5433070866141733, "duration": 0.5 }, { "name": "G#4", "midi": 68, "time": 21, "velocity": 0.4409448818897638, "duration": 0.25 }, { "name": "F3", "midi": 53, "time": 21, "velocity": 0.5118110236220472, "duration": 0.25 }, { "name": "F2", "midi": 41, "time": 21, "velocity": 0.4881889763779528, "duration": 0.5 }, { "name": "C5", "midi": 72, "time": 21.25, "velocity": 0.5354330708661418, "duration": 0.25 }, { "name": "G#2", "midi": 44, "time": 21.25, "velocity": 0.41732283464566927, "duration": 0.25 }, { "name": "A#5", "midi": 82, "time": 21.5, "velocity": 0.5433070866141733, "duration": 0.40234375 }, { "name": "G#4", "midi": 68, "time": 21.5, "velocity": 0.4409448818897638, "duration": 0.19921875 }, { "name": "F3", "midi": 53, "time": 21.5, "velocity": 0.5669291338582677, "duration": 0.19921875 }, { "name": "F2", "midi": 41, "time": 21.5, "velocity": 0.4566929133858268, "duration": 0.40234375 }, { "name": "D5", "midi": 74, "time": 21.75, "velocity": 0.5748031496062992, "duration": 0.25 }, { "name": "G#2", "midi": 44, "time": 21.75, "velocity": 0.44881889763779526, "duration": 0.25 }, { "name": "D#5", "midi": 75, "time": 22, "velocity": 0.3858267716535433, "duration": 1.5 }, { "name": "G4", "midi": 67, "time": 22, "velocity": 0.4330708661417323, "duration": 0.25 }, { "name": "D#2", "midi": 39, "time": 22, "velocity": 0.4409448818897638, "duration": 0.25 }, { "name": "A#4", "midi": 70, "time": 22.25, "velocity": 0.5511811023622047, "duration": 0.25 }, { "name": "G2", "midi": 43, "time": 22.25, "velocity": 0.5039370078740157, "duration": 0.25 }, { "name": "G4", "midi": 67, "time": 22.5, "velocity": 0.44881889763779526, "duration": 0.25 }, { "name": "A#2", "midi": 46, "time": 22.5, "velocity": 0.47244094488188976, "duration": 0.25 }, { "name": "A#4", "midi": 70, "time": 22.75, "velocity": 0.5118110236220472, "duration": 0.25 }, { "name": "D#3", "midi": 51, "time": 22.75, "velocity": 0.4881889763779528, "duration": 0.25 }, { "name": "G4", "midi": 67, "time": 23, "velocity": 0.44881889763779526, "duration": 0.25 }, { "name": "G3", "midi": 55, "time": 23, "velocity": 0.49606299212598426, "duration": 0.25 }, { "name": "A#4", "midi": 70, "time": 23.25, "velocity": 0.47244094488188976, "duration": 0.25 }, { "name": "A#3", "midi": 58, "time": 23.25, "velocity": 0.5039370078740157, "duration": 0.25 }, { "name": "E5", "midi": 76, "time": 23.5, "velocity": 0.49606299212598426, "duration": 0.5 }, { "name": "G4", "midi": 67, "time": 23.5, "velocity": 0.4409448818897638, "duration": 0.25 }, { "name": "G3", "midi": 55, "time": 23.5, "velocity": 0.47244094488188976, "duration": 0.25 }, { "name": "A#4", "midi": 70, "time": 23.75, "velocity": 0.5039370078740157, "duration": 0.25 }, { "name": "A#3", "midi": 58, "time": 23.75, "velocity": 0.47244094488188976, "duration": 0.19921875 }, { "name": "F5", "midi": 77, "time": 24, "velocity": 0.48031496062992124, "duration": 0.90234375 }, { "name": "G4", "midi": 67, "time": 24, "velocity": 0.4330708661417323, "duration": 0.19921875 }, { "name": "C#2", "midi": 37, "time": 24, "velocity": 0.47244094488188976, "duration": 0.25 }, { "name": "A#4", "midi": 70, "time": 24.25, "velocity": 0.5275590551181102, "duration": 0.25 }, { "name": "G2", "midi": 43, "time": 24.25, "velocity": 0.5196850393700787, "duration": 0.25 }, { "name": "G4", "midi": 67, "time": 24.5, "velocity": 0.4409448818897638, "duration": 0.25 }, { "name": "A#2", "midi": 46, "time": 24.5, "velocity": 0.4881889763779528, "duration": 0.25 }, { "name": "A#4", "midi": 70, "time": 24.75, "velocity": 0.5354330708661418, "duration": 0.25 }, { "name": "C#3", "midi": 49, "time": 24.75, "velocity": 0.5275590551181102, "duration": 0.25 }, { "name": "A#4", "midi": 70, "time": 25, "velocity": 0.3779527559055118, "duration": 0.75 }, { "name": "G4", "midi": 67, "time": 25, "velocity": 0.4409448818897638, "duration": 0.25 }, { "name": "G3", "midi": 55, "time": 25, "velocity": 0.5118110236220472, "duration": 0.25 }, { "name": "D#4", "midi": 63, "time": 25.25, "velocity": 0.4330708661417323, "duration": 0.25 }, { "name": "A#3", "midi": 58, "time": 25.25, "velocity": 0.49606299212598426, "duration": 0.25 }, { "name": "G4", "midi": 67, "time": 25.5, "velocity": 0.5118110236220472, "duration": 0.25 }, { "name": "G3", "midi": 55, "time": 25.5, "velocity": 0.4566929133858268, "duration": 0.25 }, { "name": "C5", "midi": 72, "time": 25.75, "velocity": 0.49606299212598426, "duration": 0.125 }, { "name": "D#4", "midi": 63, "time": 25.75, "velocity": 0.41732283464566927, "duration": 0.25 }, { "name": "C#3", "midi": 49, "time": 25.75, "velocity": 0.4251968503937008, "duration": 0.19921875 }, { "name": "C#5", "midi": 73, "time": 25.875, "velocity": 0.48031496062992124, "duration": 0.125 }, { "name": "D#5", "midi": 75, "time": 26, "velocity": 0.5354330708661418, "duration": 1 }, { "name": "G#4", "midi": 68, "time": 26, "velocity": 0.5905511811023622, "duration": 0.25 }, { "name": "C3", "midi": 48, "time": 26, "velocity": 0.4330708661417323, "duration": 0.25 }, { "name": "C3", "midi": 48, "time": 26, "velocity": 0.4566929133858268, "duration": 0.75 }, { "name": "D#4", "midi": 63, "time": 26.25, "velocity": 0.4094488188976378, "duration": 0.25 }, { "name": "D#3", "midi": 51, "time": 26.25, "velocity": 0.4881889763779528, "duration": 0.25 }, { "name": "G#4", "midi": 68, "time": 26.5, "velocity": 0.5511811023622047, "duration": 0.25 }, { "name": "C3", "midi": 48, "time": 26.5, "velocity": 0.4645669291338583, "duration": 0.5 }, { "name": "D#4", "midi": 63, "time": 26.75, "velocity": 0.4094488188976378, "duration": 0.25 }, { "name": "D#3", "midi": 51, "time": 26.75, "velocity": 0.49606299212598426, "duration": 0.25 }, { "name": "A4", "midi": 69, "time": 27, "velocity": 0.4094488188976378, "duration": 1 }, { "name": "D#4", "midi": 63, "time": 27, "velocity": 0.4409448818897638, "duration": 0.25 }, { "name": "C3", "midi": 48, "time": 27, "velocity": 0.47244094488188976, "duration": 0.25 }, { "name": "F2", "midi": 41, "time": 27, "velocity": 0.4094488188976378, "duration": 1 }, { "name": "C4", "midi": 60, "time": 27.25, "velocity": 0.44881889763779526, "duration": 0.25 }, { "name": "F3", "midi": 53, "time": 27.25, "velocity": 0.5039370078740157, "duration": 0.25 }, { "name": "D#4", "midi": 63, "time": 27.5, "velocity": 0.48031496062992124, "duration": 0.25 }, { "name": "C3", "midi": 48, "time": 27.5, "velocity": 0.47244094488188976, "duration": 0.25 }, { "name": "C4", "midi": 60, "time": 27.75, "velocity": 0.4409448818897638, "duration": 0.25 }, { "name": "F3", "midi": 53, "time": 27.75, "velocity": 0.5039370078740157, "duration": 0.25 }, { "name": "C#5", "midi": 73, "time": 28, "velocity": 0.5354330708661418, "duration": 1 }, { "name": "F4", "midi": 65, "time": 28, "velocity": 0.5196850393700787, "duration": 0.25 }, { "name": "C#3", "midi": 49, "time": 28, "velocity": 0.4409448818897638, "duration": 0.25 }, { "name": "A#2", "midi": 46, "time": 28, "velocity": 0.47244094488188976, "duration": 1 }, { "name": "C#4", "midi": 61, "time": 28.25, "velocity": 0.48031496062992124, "duration": 0.25 }, { "name": "F3", "midi": 53, "time": 28.25, "velocity": 0.48031496062992124, "duration": 0.25 }, { "name": "F4", "midi": 65, "time": 28.5, "velocity": 0.5196850393700787, "duration": 0.25 }, { "name": "C#3", "midi": 49, "time": 28.5, "velocity": 0.47244094488188976, "duration": 0.25 }, { "name": "C#4", "midi": 61, "time": 28.75, "velocity": 0.4094488188976378, "duration": 0.25 }, { "name": "F3", "midi": 53, "time": 28.75, "velocity": 0.49606299212598426, "duration": 0.25 }, { "name": "C5", "midi": 72, "time": 29, "velocity": 0.4645669291338583, "duration": 0.12109375 }, { "name": "C#4", "midi": 61, "time": 29, "velocity": 0.49606299212598426, "duration": 0.25 }, { "name": "A#2", "midi": 46, "time": 29, "velocity": 0.4251968503937008, "duration": 0.19921875 }, { "name": "D#2", "midi": 39, "time": 29, "velocity": 0.4094488188976378, "duration": 0.90234375 }, { "name": "A#4", "midi": 70, "time": 29.25, "velocity": 0.4094488188976378, "duration": 0.12109375 }, { "name": "C#4", "midi": 61, "time": 29.25, "velocity": 0.47244094488188976, "duration": 0.25 }, { "name": "D#3", "midi": 51, "time": 29.25, "velocity": 0.4881889763779528, "duration": 0.25 }, { "name": "G#4", "midi": 68, "time": 29.5, "velocity": 0.4645669291338583, "duration": 0.12109375 }, { "name": "C#4", "midi": 61, "time": 29.5, "velocity": 0.4881889763779528, "duration": 0.25 }, { "name": "A#2", "midi": 46, "time": 29.5, "velocity": 0.44881889763779526, "duration": 0.25 }, { "name": "G4", "midi": 67, "time": 29.75, "velocity": 0.41732283464566927, "duration": 0.12109375 }, { "name": "C#4", "midi": 61, "time": 29.75, "velocity": 0.4881889763779528, "duration": 0.25 }, { "name": "D#3", "midi": 51, "time": 29.75, "velocity": 0.48031496062992124, "duration": 0.25 }, { "name": "A#4", "midi": 70, "time": 30, "velocity": 0.48031496062992124, "duration": 1 }, { "name": "C#4", "midi": 61, "time": 30, "velocity": 0.48031496062992124, "duration": 0.25 }, { "name": "G#2", "midi": 44, "time": 30, "velocity": 0.49606299212598426, "duration": 1.5 }, { "name": "D#4", "midi": 63, "time": 30.25, "velocity": 0.48031496062992124, "duration": 0.25 }, { "name": "D#3", "midi": 51, "time": 30.25, "velocity": 0.4094488188976378, "duration": 0.25 }, { "name": "C#4", "midi": 61, "time": 30.5, "velocity": 0.4566929133858268, "duration": 0.25 }, { "name": "G3", "midi": 55, "time": 30.5, "velocity": 0.4881889763779528, "duration": 0.25 }, { "name": "D#4", "midi": 63, "time": 30.75, "velocity": 0.5196850393700787, "duration": 0.25 }, { "name": "D#3", "midi": 51, "time": 30.75, "velocity": 0.4566929133858268, "duration": 0.25 }, { "name": "G#4", "midi": 68, "time": 31, "velocity": 0.4330708661417323, "duration": 0.40234375 }, { "name": "C4", "midi": 60, "time": 31, "velocity": 0.4409448818897638, "duration": 0.40234375 }, { "name": "G#3", "midi": 56, "time": 31, "velocity": 0.49606299212598426, "duration": 0.5 }, { "name": "C4", "midi": 60, "time": 31.875, "velocity": 0.4251968503937008, "duration": 0.125 }, { "name": "C5", "midi": 72, "time": 32, "velocity": 0.6141732283464567, "duration": 1.25 }, { "name": "C4", "midi": 60, "time": 32.25, "velocity": 0.4409448818897638, "duration": 0.25 }, { "name": "C4", "midi": 60, "time": 32.5, "velocity": 0.4330708661417323, "duration": 0.25 }, { "name": "C4", "midi": 60, "time": 32.75, "velocity": 0.47244094488188976, "duration": 0.25 }, { "name": "C4", "midi": 60, "time": 33, "velocity": 0.44881889763779526, "duration": 0.25 }, { "name": "G#5", "midi": 80, "time": 33.25, "velocity": 0.5905511811023622, "duration": 0.25 }, { "name": "C4", "midi": 60, "time": 33.25, "velocity": 0.47244094488188976, "duration": 0.25 }, { "name": "G5", "midi": 79, "time": 33.5, "velocity": 0.4330708661417323, "duration": 0.25 }, { "name": "C4", "midi": 60, "time": 33.5, "velocity": 0.47244094488188976, "duration": 0.25 }, { "name": "F5", "midi": 77, "time": 33.75, "velocity": 0.44881889763779526, "duration": 0.19921875 }, { "name": "C4", "midi": 60, "time": 33.75, "velocity": 0.44881889763779526, "duration": 0.25 }, { "name": "C6", "midi": 84, "time": 34, "velocity": 0.5511811023622047, "duration": 1.25 }, { "name": "E3", "midi": 52, "time": 34, "velocity": 0.48031496062992124, "duration": 0.25 }, { "name": "G3", "midi": 55, "time": 34, "velocity": 0.48031496062992124, "duration": 0.25 }, { "name": "C4", "midi": 60, "time": 34, "velocity": 0.48031496062992124, "duration": 0.25 }, { "name": "E3", "midi": 52, "time": 34.25, "velocity": 0.49606299212598426, "duration": 0.25 }, { "name": "G3", "midi": 55, "time": 34.25, "velocity": 0.49606299212598426, "duration": 0.25 }, { "name": "C4", "midi": 60, "time": 34.25, "velocity": 0.49606299212598426, "duration": 0.25 }, { "name": "E3", "midi": 52, "time": 34.5, "velocity": 0.48031496062992124, "duration": 0.25 }, { "name": "G3", "midi": 55, "time": 34.5, "velocity": 0.48031496062992124, "duration": 0.25 }, { "name": "C4", "midi": 60, "time": 34.5, "velocity": 0.48031496062992124, "duration": 0.25 }, { "name": "E3", "midi": 52, "time": 34.75, "velocity": 0.47244094488188976, "duration": 0.25 }, { "name": "G3", "midi": 55, "time": 34.75, "velocity": 0.47244094488188976, "duration": 0.25 }, { "name": "C4", "midi": 60, "time": 34.75, "velocity": 0.47244094488188976, "duration": 0.25 }, { "name": "F3", "midi": 53, "time": 35, "velocity": 0.44881889763779526, "duration": 0.25 }, { "name": "G#3", "midi": 56, "time": 35, "velocity": 0.44881889763779526, "duration": 0.25 }, { "name": "C4", "midi": 60, "time": 35, "velocity": 0.44881889763779526, "duration": 0.25 }, { "name": "G#5", "midi": 80, "time": 35.25, "velocity": 0.4015748031496063, "duration": 0.25 }, { "name": "F3", "midi": 53, "time": 35.25, "velocity": 0.4251968503937008, "duration": 0.25 }, { "name": "G#3", "midi": 56, "time": 35.25, "velocity": 0.4251968503937008, "duration": 0.25 }, { "name": "G5", "midi": 79, "time": 35.5, "velocity": 0.4094488188976378, "duration": 0.25 }, { "name": "F3", "midi": 53, "time": 35.5, "velocity": 0.47244094488188976, "duration": 0.25 }, { "name": "G#3", "midi": 56, "time": 35.5, "velocity": 0.47244094488188976, "duration": 0.25 }, { "name": "F5", "midi": 77, "time": 35.75, "velocity": 0.4645669291338583, "duration": 0.19921875 }, { "name": "F3", "midi": 53, "time": 35.75, "velocity": 0.48031496062992124, "duration": 0.25 }, { "name": "G#3", "midi": 56, "time": 35.75, "velocity": 0.48031496062992124, "duration": 0.25 }, { "name": "C5", "midi": 72, "time": 36, "velocity": 0.44881889763779526, "duration": 1.25 }, { "name": "G3", "midi": 55, "time": 36, "velocity": 0.5669291338582677, "duration": 0.25 }, { "name": "A#3", "midi": 58, "time": 36, "velocity": 0.5669291338582677, "duration": 0.25 }, { "name": "E4", "midi": 64, "time": 36, "velocity": 0.5669291338582677, "duration": 0.25 }, { "name": "G3", "midi": 55, "time": 36.25, "velocity": 0.4566929133858268, "duration": 0.25 }, { "name": "A#3", "midi": 58, "time": 36.25, "velocity": 0.4566929133858268, "duration": 0.25 }, { "name": "E4", "midi": 64, "time": 36.25, "velocity": 0.4566929133858268, "duration": 0.25 }, { "name": "G3", "midi": 55, "time": 36.5, "velocity": 0.47244094488188976, "duration": 0.25 }, { "name": "A#3", "midi": 58, "time": 36.5, "velocity": 0.47244094488188976, "duration": 0.25 }, { "name": "E4", "midi": 64, "time": 36.5, "velocity": 0.47244094488188976, "duration": 0.25 }, { "name": "G3", "midi": 55, "time": 36.75, "velocity": 0.47244094488188976, "duration": 0.25 }, { "name": "A#3", "midi": 58, "time": 36.75, "velocity": 0.47244094488188976, "duration": 0.25 }, { "name": "E4", "midi": 64, "time": 36.75, "velocity": 0.47244094488188976, "duration": 0.25 }, { "name": "G#3", "midi": 56, "time": 37, "velocity": 0.5039370078740157, "duration": 0.25 }, { "name": "C4", "midi": 60, "time": 37, "velocity": 0.5039370078740157, "duration": 0.25 }, { "name": "F4", "midi": 65, "time": 37, "velocity": 0.5039370078740157, "duration": 0.25 }, { "name": "G#5", "midi": 80, "time": 37.25, "velocity": 0.5275590551181102, "duration": 0.25 }, { "name": "G#3", "midi": 56, "time": 37.25, "velocity": 0.48031496062992124, "duration": 0.25 }, { "name": "C4", "midi": 60, "time": 37.25, "velocity": 0.48031496062992124, "duration": 0.25 }, { "name": "F4", "midi": 65, "time": 37.25, "velocity": 0.48031496062992124, "duration": 0.25 }, { "name": "G5", "midi": 79, "time": 37.5, "velocity": 0.48031496062992124, "duration": 0.25 }, { "name": "G#3", "midi": 56, "time": 37.5, "velocity": 0.44881889763779526, "duration": 0.25 }, { "name": "C4", "midi": 60, "time": 37.5, "velocity": 0.44881889763779526, "duration": 0.25 }, { "name": "F4", "midi": 65, "time": 37.5, "velocity": 0.44881889763779526, "duration": 0.25 }, { "name": "F5", "midi": 77, "time": 37.75, "velocity": 0.4409448818897638, "duration": 0.19921875 }, { "name": "G#3", "midi": 56, "time": 37.75, "velocity": 0.49606299212598426, "duration": 0.25 }, { "name": "C4", "midi": 60, "time": 37.75, "velocity": 0.49606299212598426, "duration": 0.25 }, { "name": "F4", "midi": 65, "time": 37.75, "velocity": 0.49606299212598426, "duration": 0.25 }, { "name": "D#5", "midi": 75, "time": 38, "velocity": 0.4251968503937008, "duration": 0.5 }, { "name": "A#3", "midi": 58, "time": 38, "velocity": 0.4881889763779528, "duration": 0.25 }, { "name": "F4", "midi": 65, "time": 38, "velocity": 0.4881889763779528, "duration": 0.25 }, { "name": "G#4", "midi": 68, "time": 38, "velocity": 0.4881889763779528, "duration": 0.25 }, { "name": "A#3", "midi": 58, "time": 38.25, "velocity": 0.49606299212598426, "duration": 0.25 }, { "name": "F4", "midi": 65, "time": 38.25, "velocity": 0.49606299212598426, "duration": 0.25 }, { "name": "G#4", "midi": 68, "time": 38.25, "velocity": 0.49606299212598426, "duration": 0.25 }, { "name": "D5", "midi": 74, "time": 38.5, "velocity": 0.4566929133858268, "duration": 1 }, { "name": "A#3", "midi": 58, "time": 38.5, "velocity": 0.4409448818897638, "duration": 0.25 }, { "name": "F4", "midi": 65, "time": 38.5, "velocity": 0.4409448818897638, "duration": 0.25 }, { "name": "G#4", "midi": 68, "time": 38.5, "velocity": 0.4409448818897638, "duration": 0.25 }, { "name": "A#3", "midi": 58, "time": 38.75, "velocity": 0.4566929133858268, "duration": 0.25 }, { "name": "F4", "midi": 65, "time": 38.75, "velocity": 0.4566929133858268, "duration": 0.25 }, { "name": "G#4", "midi": 68, "time": 38.75, "velocity": 0.4566929133858268, "duration": 0.25 }, { "name": "B3", "midi": 59, "time": 39, "velocity": 0.4645669291338583, "duration": 0.25 }, { "name": "F4", "midi": 65, "time": 39, "velocity": 0.4645669291338583, "duration": 0.25 }, { "name": "G#4", "midi": 68, "time": 39, "velocity": 0.4645669291338583, "duration": 0.25 }, { "name": "B3", "midi": 59, "time": 39.25, "velocity": 0.47244094488188976, "duration": 0.25 }, { "name": "F4", "midi": 65, "time": 39.25, "velocity": 0.47244094488188976, "duration": 0.25 }, { "name": "G#4", "midi": 68, "time": 39.25, "velocity": 0.47244094488188976, "duration": 0.25 }, { "name": "F5", "midi": 77, "time": 39.5, "velocity": 0.5275590551181102, "duration": 0.375 }, { "name": "B3", "midi": 59, "time": 39.5, "velocity": 0.47244094488188976, "duration": 0.25 }, { "name": "D4", "midi": 62, "time": 39.5, "velocity": 0.47244094488188976, "duration": 0.25 }, { "name": "G#4", "midi": 68, "time": 39.5, "velocity": 0.47244094488188976, "duration": 0.25 }, { "name": "B3", "midi": 59, "time": 39.75, "velocity": 0.4566929133858268, "duration": 0.25 }, { "name": "D4", "midi": 62, "time": 39.75, "velocity": 0.4566929133858268, "duration": 0.25 }, { "name": "G#4", "midi": 68, "time": 39.75, "velocity": 0.4566929133858268, "duration": 0.25 }, { "name": "D#5", "midi": 75, "time": 39.875, "velocity": 0.4566929133858268, "duration": 0.09765625 }, { "name": "D#5", "midi": 75, "time": 40, "velocity": 0.48031496062992124, "duration": 1 }, { "name": "C4", "midi": 60, "time": 40, "velocity": 0.4645669291338583, "duration": 0.25 }, { "name": "D#4", "midi": 63, "time": 40, "velocity": 0.4645669291338583, "duration": 0.25 }, { "name": "G4", "midi": 67, "time": 40, "velocity": 0.4645669291338583, "duration": 0.25 }, { "name": "C4", "midi": 60, "time": 40.25, "velocity": 0.4566929133858268, "duration": 0.25 }, { "name": "D#4", "midi": 63, "time": 40.25, "velocity": 0.4566929133858268, "duration": 0.25 }, { "name": "G4", "midi": 67, "time": 40.25, "velocity": 0.4566929133858268, "duration": 0.25 }, { "name": "C4", "midi": 60, "time": 40.5, "velocity": 0.4566929133858268, "duration": 0.25 }, { "name": "D#4", "midi": 63, "time": 40.5, "velocity": 0.4566929133858268, "duration": 0.25 }, { "name": "G4", "midi": 67, "time": 40.5, "velocity": 0.4566929133858268, "duration": 0.25 }, { "name": "C4", "midi": 60, "time": 40.75, "velocity": 0.48031496062992124, "duration": 0.25 }, { "name": "D#4", "midi": 63, "time": 40.75, "velocity": 0.48031496062992124, "duration": 0.25 }, { "name": "G4", "midi": 67, "time": 40.75, "velocity": 0.48031496062992124, "duration": 0.25 }, { "name": "F4", "midi": 65, "time": 41, "velocity": 0.3228346456692913, "duration": 0.75 }, { "name": "G#3", "midi": 56, "time": 41, "velocity": 0.4251968503937008, "duration": 0.25 }, { "name": "D#4", "midi": 63, "time": 41, "velocity": 0.4251968503937008, "duration": 0.25 }, { "name": "G#3", "midi": 56, "time": 41.25, "velocity": 0.4409448818897638, "duration": 0.25 }, { "name": "D#4", "midi": 63, "time": 41.25, "velocity": 0.4409448818897638, "duration": 0.25 }, { "name": "G#3", "midi": 56, "time": 41.5, "velocity": 0.48031496062992124, "duration": 0.25 }, { "name": "D#4", "midi": 63, "time": 41.5, "velocity": 0.48031496062992124, "duration": 0.25 }, { "name": "G#4", "midi": 68, "time": 41.75, "velocity": 0.5118110236220472, "duration": 0.1171875 }, { "name": "G#3", "midi": 56, "time": 41.75, "velocity": 0.4566929133858268, "duration": 0.25 }, { "name": "D#4", "midi": 63, "time": 41.75, "velocity": 0.4566929133858268, "duration": 0.25 }, { "name": "B4", "midi": 71, "time": 41.8671875, "velocity": 0.4881889763779528, "duration": 0.04296875 }, { "name": "C5", "midi": 72, "time": 41.91015625, "velocity": 0.5196850393700787, "duration": 0.046875 }, { "name": "D5", "midi": 74, "time": 41.95703125, "velocity": 0.5039370078740157, "duration": 0.04296875 }, { "name": "C5", "midi": 72, "time": 42, "velocity": 0.44881889763779526, "duration": 0.09765625 }, { "name": "A#4", "midi": 70, "time": 42.125, "velocity": 0.4251968503937008, "duration": 0.09765625 }, { "name": "G5", "midi": 79, "time": 42.25, "velocity": 0.5669291338582677, "duration": 0.5 }, { "name": "A#3", "midi": 58, "time": 42.25, "velocity": 0.41732283464566927, "duration": 0.25 }, { "name": "D#4", "midi": 63, "time": 42.25, "velocity": 0.41732283464566927, "duration": 0.25 }, { "name": "G4", "midi": 67, "time": 42.25, "velocity": 0.41732283464566927, "duration": 0.25 }, { "name": "A#3", "midi": 58, "time": 42.5, "velocity": 0.4566929133858268, "duration": 0.25 }, { "name": "D#4", "midi": 63, "time": 42.5, "velocity": 0.4566929133858268, "duration": 0.25 }, { "name": "G4", "midi": 67, "time": 42.5, "velocity": 0.4566929133858268, "duration": 0.25 }, { "name": "F5", "midi": 77, "time": 42.75, "velocity": 0.4330708661417323, "duration": 0.125 }, { "name": "A#3", "midi": 58, "time": 42.75, "velocity": 0.5039370078740157, "duration": 0.25 }, { "name": "D#4", "midi": 63, "time": 42.75, "velocity": 0.5039370078740157, "duration": 0.25 }, { "name": "G4", "midi": 67, "time": 42.75, "velocity": 0.5039370078740157, "duration": 0.25 }, { "name": "D#5", "midi": 75, "time": 42.875, "velocity": 0.44881889763779526, "duration": 0.125 }, { "name": "D5", "midi": 74, "time": 43, "velocity": 0.41732283464566927, "duration": 0.125 }, { "name": "C5", "midi": 72, "time": 43.125, "velocity": 0.4251968503937008, "duration": 0.125 }, { "name": "A#4", "midi": 70, "time": 43.25, "velocity": 0.4566929133858268, "duration": 0.125 }, { "name": "A#2", "midi": 46, "time": 43.25, "velocity": 0.4094488188976378, "duration": 0.25 }, { "name": "D3", "midi": 50, "time": 43.25, "velocity": 0.4094488188976378, "duration": 0.25 }, { "name": "G#3", "midi": 56, "time": 43.25, "velocity": 0.4094488188976378, "duration": 0.25 }, { "name": "A4", "midi": 69, "time": 43.375, "velocity": 0.47244094488188976, "duration": 0.125 }, { "name": "C5", "midi": 72, "time": 43.5, "velocity": 0.5118110236220472, "duration": 0.125 }, { "name": "A#2", "midi": 46, "time": 43.5, "velocity": 0.4409448818897638, "duration": 0.25 }, { "name": "D3", "midi": 50, "time": 43.5, "velocity": 0.4409448818897638, "duration": 0.25 }, { "name": "G#3", "midi": 56, "time": 43.5, "velocity": 0.4409448818897638, "duration": 0.25 }, { "name": "A#4", "midi": 70, "time": 43.625, "velocity": 0.48031496062992124, "duration": 0.125 }, { "name": "G#4", "midi": 68, "time": 43.75, "velocity": 0.41732283464566927, "duration": 0.125 }, { "name": "A#2", "midi": 46, "time": 43.75, "velocity": 0.5196850393700787, "duration": 0.25 }, { "name": "D3", "midi": 50, "time": 43.75, "velocity": 0.5196850393700787, "duration": 0.25 }, { "name": "G#3", "midi": 56, "time": 43.75, "velocity": 0.5196850393700787, "duration": 0.25 }, { "name": "F4", "midi": 65, "time": 43.875, "velocity": 0.4251968503937008, "duration": 0.09765625 }, { "name": "G3", "midi": 55, "time": 44, "velocity": 0.4409448818897638, "duration": 0.5 }, { "name": "D#3", "midi": 51, "time": 44, "velocity": 0.48031496062992124, "duration": 0.5 }, { "name": "G3", "midi": 55, "time": 44, "velocity": 0.48031496062992124, "duration": 0.5 }, { "name": "A#3", "midi": 58, "time": 44.75, "velocity": 0.44881889763779526, "duration": 0.25 }, { "name": "G3", "midi": 55, "time": 45, "velocity": 0.4566929133858268, "duration": 0.25 }, { "name": "A#3", "midi": 58, "time": 45.25, "velocity": 0.4881889763779528, "duration": 0.25 }, { "name": "G3", "midi": 55, "time": 45.5, "velocity": 0.48031496062992124, "duration": 0.25 }, { "name": "D#3", "midi": 51, "time": 45.75, "velocity": 0.44881889763779526, "duration": 0.19921875 }, { "name": "F3", "midi": 53, "time": 46, "velocity": 0.47244094488188976, "duration": 0.40234375 }, { "name": "G#3", "midi": 56, "time": 46, "velocity": 0.47244094488188976, "duration": 0.40234375 }, { "name": "D#3", "midi": 51, "time": 46, "velocity": 0.4015748031496063, "duration": 0.25 }, { "name": "A#1", "midi": 34, "time": 46, "velocity": 0.4645669291338583, "duration": 2 }, { "name": "D3", "midi": 50, "time": 46.25, "velocity": 0.49606299212598426, "duration": 0.19921875 }, { "name": "F3", "midi": 53, "time": 46.5, "velocity": 0.4645669291338583, "duration": 0.40234375 }, { "name": "G#3", "midi": 56, "time": 46.5, "velocity": 0.4645669291338583, "duration": 0.40234375 }, { "name": "D3", "midi": 50, "time": 46.5, "velocity": 0.44881889763779526, "duration": 0.25 }, { "name": "C3", "midi": 48, "time": 46.75, "velocity": 0.4645669291338583, "duration": 0.19921875 }, { "name": "F3", "midi": 53, "time": 47, "velocity": 0.4409448818897638, "duration": 0.40234375 }, { "name": "G#3", "midi": 56, "time": 47, "velocity": 0.4409448818897638, "duration": 0.40234375 }, { "name": "C3", "midi": 48, "time": 47, "velocity": 0.47244094488188976, "duration": 0.25 }, { "name": "B2", "midi": 47, "time": 47.25, "velocity": 0.47244094488188976, "duration": 0.19921875 }, { "name": "F3", "midi": 53, "time": 47.5, "velocity": 0.4409448818897638, "duration": 0.40234375 }, { "name": "G#3", "midi": 56, "time": 47.5, "velocity": 0.4409448818897638, "duration": 0.40234375 }, { "name": "B2", "midi": 47, "time": 47.5, "velocity": 0.48031496062992124, "duration": 0.25 }, { "name": "A#2", "midi": 46, "time": 47.75, "velocity": 0.4645669291338583, "duration": 0.19921875 }, { "name": "A#2", "midi": 46, "time": 48, "velocity": 0.4645669291338583, "duration": 0.5 }, { "name": "D#3", "midi": 51, "time": 48, "velocity": 0.4645669291338583, "duration": 0.5 }, { "name": "G3", "midi": 55, "time": 48, "velocity": 0.4645669291338583, "duration": 0.5 }, { "name": "D#2", "midi": 39, "time": 48, "velocity": 0.5039370078740157, "duration": 0.5 }, { "name": "A#2", "midi": 46, "time": 48.75, "velocity": 0.41732283464566927, "duration": 0.25 }, { "name": "G2", "midi": 43, "time": 49, "velocity": 0.4409448818897638, "duration": 0.25 }, { "name": "A#2", "midi": 46, "time": 49.25, "velocity": 0.5039370078740157, "duration": 0.25 }, { "name": "A#3", "midi": 58, "time": 49.5, "velocity": 0.4330708661417323, "duration": 0.375 }, { "name": "G2", "midi": 43, "time": 49.5, "velocity": 0.4645669291338583, "duration": 0.25 }, { "name": "D#2", "midi": 39, "time": 49.75, "velocity": 0.4330708661417323, "duration": 0.19921875 }, { "name": "D#4", "midi": 63, "time": 49.875, "velocity": 0.5433070866141733, "duration": 0.09765625 }, { "name": "D#4", "midi": 63, "time": 50, "velocity": 0.48031496062992124, "duration": 0.25 }, { "name": "F3", "midi": 53, "time": 50, "velocity": 0.5118110236220472, "duration": 0.90234375 }, { "name": "G#3", "midi": 56, "time": 50, "velocity": 0.5118110236220472, "duration": 0.90234375 }, { "name": "A#1", "midi": 34, "time": 50, "velocity": 0.4409448818897638, "duration": 1 }, { "name": "D4", "midi": 62, "time": 50.25, "velocity": 0.49606299212598426, "duration": 0.19921875 }, { "name": "D4", "midi": 62, "time": 50.5, "velocity": 0.4566929133858268, "duration": 0.25 }, { "name": "C4", "midi": 60, "time": 50.75, "velocity": 0.5275590551181102, "duration": 0.19921875 }, { "name": "C4", "midi": 60, "time": 51, "velocity": 0.49606299212598426, "duration": 0.25 }, { "name": "F3", "midi": 53, "time": 51, "velocity": 0.47244094488188976, "duration": 0.90234375 }, { "name": "G#3", "midi": 56, "time": 51, "velocity": 0.47244094488188976, "duration": 0.90234375 }, { "name": "A#2", "midi": 46, "time": 51, "velocity": 0.5590551181102362, "duration": 1 }, { "name": "B3", "midi": 59, "time": 51.25, "velocity": 0.44881889763779526, "duration": 0.19921875 }, { "name": "B3", "midi": 59, "time": 51.5, "velocity": 0.4881889763779528, "duration": 0.25 }, { "name": "A#3", "midi": 58, "time": 51.75, "velocity": 0.5118110236220472, "duration": 0.19921875 }, { "name": "G3", "midi": 55, "time": 52, "velocity": 0.5039370078740157, "duration": 3.90234375 }, { "name": "A#3", "midi": 58, "time": 52, "velocity": 0.5039370078740157, "duration": 6 }, { "name": "F3", "midi": 53, "time": 52, "velocity": 0.4330708661417323, "duration": 0.25 }, { "name": "D#2", "midi": 39, "time": 52, "velocity": 0.44881889763779526, "duration": 4 }, { "name": "E3", "midi": 52, "time": 52.25, "velocity": 0.4566929133858268, "duration": 0.19921875 }, { "name": "E3", "midi": 52, "time": 52.5, "velocity": 0.5196850393700787, "duration": 0.25 }, { "name": "D#3", "midi": 51, "time": 52.75, "velocity": 0.5590551181102362, "duration": 0.19921875 }, { "name": "D#3", "midi": 51, "time": 53, "velocity": 0.6299212598425197, "duration": 0.25 }, { "name": "D3", "midi": 50, "time": 53.25, "velocity": 0.6456692913385826, "duration": 0.19921875 }, { "name": "D3", "midi": 50, "time": 53.5, "velocity": 0.7086614173228346, "duration": 0.25 }, { "name": "D#3", "midi": 51, "time": 53.75, "velocity": 0.7795275590551181, "duration": 0.19921875 }, { "name": "D#3", "midi": 51, "time": 54, "velocity": 0.7637795275590551, "duration": 0.25 }, { "name": "E3", "midi": 52, "time": 54.25, "velocity": 0.7401574803149606, "duration": 0.19921875 }, { "name": "E3", "midi": 52, "time": 54.5, "velocity": 0.7086614173228346, "duration": 0.25 }, { "name": "D#3", "midi": 51, "time": 54.75, "velocity": 0.5984251968503937, "duration": 0.19921875 }, { "name": "D#3", "midi": 51, "time": 55, "velocity": 0.3937007874015748, "duration": 0.25 }, { "name": "D3", "midi": 50, "time": 55.25, "velocity": 0.3700787401574803, "duration": 0.19921875 }, { "name": "D3", "midi": 50, "time": 55.5, "velocity": 0.3779527559055118, "duration": 0.25 }, { "name": "C#3", "midi": 49, "time": 55.75, "velocity": 0.33858267716535434, "duration": 0.19921875 }, { "name": "C4", "midi": 60, "time": 56, "velocity": 0.49606299212598426, "duration": 1 }, { "name": "C3", "midi": 48, "time": 56, "velocity": 0.5039370078740157, "duration": 0.25 }, { "name": "G#3", "midi": 56, "time": 56, "velocity": 0.5039370078740157, "duration": 0.25 }, { "name": "G#1", "midi": 32, "time": 56, "velocity": 0.5196850393700787, "duration": 1 }, { "name": "G#2", "midi": 44, "time": 56, "velocity": 0.5196850393700787, "duration": 1 }, { "name": "D#3", "midi": 51, "time": 56.25, "velocity": 0.4409448818897638, "duration": 0.25 }, { "name": "G#3", "midi": 56, "time": 56.5, "velocity": 0.5118110236220472, "duration": 0.25 }, { "name": "D#3", "midi": 51, "time": 56.75, "velocity": 0.48031496062992124, "duration": 0.25 }, { "name": "G3", "midi": 55, "time": 57, "velocity": 0.48031496062992124, "duration": 0.25 }, { "name": "C#3", "midi": 49, "time": 57, "velocity": 0.5511811023622047, "duration": 1 }, { "name": "D#3", "midi": 51, "time": 57.25, "velocity": 0.48031496062992124, "duration": 0.25 }, { "name": "G3", "midi": 55, "time": 57.5, "velocity": 0.47244094488188976, "duration": 0.25 }, { "name": "D#3", "midi": 51, "time": 57.75, "velocity": 0.4566929133858268, "duration": 0.25 }, { "name": "D#4", "midi": 63, "time": 58, "velocity": 0.5826771653543307, "duration": 1.5 }, { "name": "G#3", "midi": 56, "time": 58, "velocity": 0.5275590551181102, "duration": 0.25 }, { "name": "C3", "midi": 48, "time": 58, "velocity": 0.48031496062992124, "duration": 1 }, { "name": "D#3", "midi": 51, "time": 58.25, "velocity": 0.44881889763779526, "duration": 0.25 }, { "name": "G#3", "midi": 56, "time": 58.5, "velocity": 0.5196850393700787, "duration": 0.25 }, { "name": "D#3", "midi": 51, "time": 58.75, "velocity": 0.3937007874015748, "duration": 0.25 }, { "name": "A#3", "midi": 58, "time": 59, "velocity": 0.5118110236220472, "duration": 0.25 }, { "name": "G2", "midi": 43, "time": 59, "velocity": 0.4409448818897638, "duration": 0.90234375 }, { "name": "D#3", "midi": 51, "time": 59.25, "velocity": 0.47244094488188976, "duration": 0.25 }, { "name": "C#4", "midi": 61, "time": 59.5, "velocity": 0.48031496062992124, "duration": 0.40234375 }, { "name": "A#3", "midi": 58, "time": 59.5, "velocity": 0.5039370078740157, "duration": 0.19921875 }, { "name": "D#3", "midi": 51, "time": 59.75, "velocity": 0.41732283464566927, "duration": 0.25 }, { "name": "C4", "midi": 60, "time": 60, "velocity": 0.48031496062992124, "duration": 0.5 }, { "name": "G#3", "midi": 56, "time": 60, "velocity": 0.49606299212598426, "duration": 0.25 }, { "name": "G#2", "midi": 44, "time": 60, "velocity": 0.5196850393700787, "duration": 0.5 }, { "name": "D#3", "midi": 51, "time": 60.25, "velocity": 0.44881889763779526, "duration": 0.25 }, { "name": "D#4", "midi": 63, "time": 60.5, "velocity": 0.5118110236220472, "duration": 0.5 }, { "name": "A#3", "midi": 58, "time": 60.5, "velocity": 0.5669291338582677, "duration": 0.25 }, { "name": "G2", "midi": 43, "time": 60.5, "velocity": 0.41732283464566927, "duration": 0.5 }, { "name": "D#3", "midi": 51, "time": 60.75, "velocity": 0.41732283464566927, "duration": 0.25 }, { "name": "G#4", "midi": 68, "time": 61, "velocity": 0.5118110236220472, "duration": 0.5 }, { "name": "C4", "midi": 60, "time": 61, "velocity": 0.6062992125984252, "duration": 0.25 }, { "name": "F2", "midi": 41, "time": 61, "velocity": 0.4881889763779528, "duration": 0.5 }, { "name": "G#3", "midi": 56, "time": 61.25, "velocity": 0.4251968503937008, "duration": 0.25 }, { "name": "A#4", "midi": 70, "time": 61.5, "velocity": 0.5275590551181102, "duration": 0.3203125 }, { "name": "D4", "midi": 62, "time": 61.5, "velocity": 0.5511811023622047, "duration": 0.19921875 }, { "name": "F3", "midi": 53, "time": 61.5, "velocity": 0.5511811023622047, "duration": 0.40234375 }, { "name": "G#3", "midi": 56, "time": 61.75, "velocity": 0.44881889763779526, "duration": 0.19921875 }, { "name": "D#4", "midi": 63, "time": 62, "velocity": 0.4015748031496063, "duration": 1.5 }, { "name": "G3", "midi": 55, "time": 62, "velocity": 0.4409448818897638, "duration": 0.25 }, { "name": "D#3", "midi": 51, "time": 62, "velocity": 0.4330708661417323, "duration": 1 }, { "name": "A#3", "midi": 58, "time": 62.25, "velocity": 0.4566929133858268, "duration": 0.25 }, { "name": "G3", "midi": 55, "time": 62.5, "velocity": 0.47244094488188976, "duration": 0.25 }, { "name": "A#3", "midi": 58, "time": 62.75, "velocity": 0.49606299212598426, "duration": 0.25 }, { "name": "G3", "midi": 55, "time": 63, "velocity": 0.4566929133858268, "duration": 0.25 }, { "name": "D#2", "midi": 39, "time": 63, "velocity": 0.4409448818897638, "duration": 1 }, { "name": "A#3", "midi": 58, "time": 63.25, "velocity": 0.4881889763779528, "duration": 0.25 }, { "name": "E4", "midi": 64, "time": 63.5, "velocity": 0.4566929133858268, "duration": 0.5 }, { "name": "G3", "midi": 55, "time": 63.5, "velocity": 0.4409448818897638, "duration": 0.25 }, { "name": "A#3", "midi": 58, "time": 63.75, "velocity": 0.5275590551181102, "duration": 0.25 }, { "name": "F4", "midi": 65, "time": 64, "velocity": 0.48031496062992124, "duration": 0.90234375 }, { "name": "G3", "midi": 55, "time": 64, "velocity": 0.4566929133858268, "duration": 0.19921875 }, { "name": "C#2", "midi": 37, "time": 64, "velocity": 0.47244094488188976, "duration": 1 }, { "name": "A#3", "midi": 58, "time": 64.25, "velocity": 0.4409448818897638, "duration": 0.25 }, { "name": "G3", "midi": 55, "time": 64.5, "velocity": 0.44881889763779526, "duration": 0.25 }, { "name": "A#3", "midi": 58, "time": 64.75, "velocity": 0.49606299212598426, "duration": 0.25 }, { "name": "A#3", "midi": 58, "time": 65, "velocity": 0.4645669291338583, "duration": 0.75 }, { "name": "G3", "midi": 55, "time": 65, "velocity": 0.4645669291338583, "duration": 0.25 }, { "name": "C#3", "midi": 49, "time": 65, "velocity": 0.5354330708661418, "duration": 0.90234375 }, { "name": "D#3", "midi": 51, "time": 65.25, "velocity": 0.44881889763779526, "duration": 0.25 }, { "name": "G3", "midi": 55, "time": 65.5, "velocity": 0.5196850393700787, "duration": 0.25 }, { "name": "C4", "midi": 60, "time": 65.75, "velocity": 0.47244094488188976, "duration": 0.125 }, { "name": "D#3", "midi": 51, "time": 65.75, "velocity": 0.4566929133858268, "duration": 0.19921875 }, { "name": "C#4", "midi": 61, "time": 65.875, "velocity": 0.4645669291338583, "duration": 0.09765625 }, { "name": "D#4", "midi": 63, "time": 66, "velocity": 0.5354330708661418, "duration": 1 }, { "name": "G#3", "midi": 56, "time": 66, "velocity": 0.5196850393700787, "duration": 0.25 }, { "name": "C3", "midi": 48, "time": 66, "velocity": 0.48031496062992124, "duration": 1 }, { "name": "D#3", "midi": 51, "time": 66.25, "velocity": 0.4251968503937008, "duration": 0.25 }, { "name": "G#3", "midi": 56, "time": 66.5, "velocity": 0.48031496062992124, "duration": 0.25 }, { "name": "D#3", "midi": 51, "time": 66.75, "velocity": 0.4094488188976378, "duration": 0.25 }, { "name": "A3", "midi": 57, "time": 67, "velocity": 0.4251968503937008, "duration": 1 }, { "name": "D#3", "midi": 51, "time": 67, "velocity": 0.5039370078740157, "duration": 0.25 }, { "name": "F2", "midi": 41, "time": 67, "velocity": 0.4409448818897638, "duration": 1 }, { "name": "C3", "midi": 48, "time": 67.25, "velocity": 0.4251968503937008, "duration": 0.25 }, { "name": "D#3", "midi": 51, "time": 67.5, "velocity": 0.47244094488188976, "duration": 0.25 }, { "name": "C3", "midi": 48, "time": 67.75, "velocity": 0.41732283464566927, "duration": 0.25 }, { "name": "C#4", "midi": 61, "time": 68, "velocity": 0.5118110236220472, "duration": 0.90234375 }, { "name": "F3", "midi": 53, "time": 68, "velocity": 0.5354330708661418, "duration": 0.19921875 }, { "name": "A#1", "midi": 34, "time": 68, "velocity": 0.4330708661417323, "duration": 1 }, { "name": "C#3", "midi": 49, "time": 68.25, "velocity": 0.4566929133858268, "duration": 0.25 }, { "name": "F3", "midi": 53, "time": 68.5, "velocity": 0.49606299212598426, "duration": 0.25 }, { "name": "C#3", "midi": 49, "time": 68.75, "velocity": 0.44881889763779526, "duration": 0.25 }, { "name": "C4", "midi": 60, "time": 69, "velocity": 0.4409448818897638, "duration": 0.12109375 }, { "name": "C#3", "midi": 49, "time": 69, "velocity": 0.48031496062992124, "duration": 0.25 }, { "name": "D#2", "midi": 39, "time": 69, "velocity": 0.4881889763779528, "duration": 0.90234375 }, { "name": "A#3", "midi": 58, "time": 69.25, "velocity": 0.4409448818897638, "duration": 0.12109375 }, { "name": "C#3", "midi": 49, "time": 69.25, "velocity": 0.48031496062992124, "duration": 0.25 }, { "name": "G#3", "midi": 56, "time": 69.5, "velocity": 0.4251968503937008, "duration": 0.12109375 }, { "name": "C#3", "midi": 49, "time": 69.5, "velocity": 0.47244094488188976, "duration": 0.25 }, { "name": "G3", "midi": 55, "time": 69.75, "velocity": 0.44881889763779526, "duration": 0.09375 }, { "name": "C#3", "midi": 49, "time": 69.75, "velocity": 0.47244094488188976, "duration": 0.19921875 }, { "name": "G3", "midi": 55, "time": 70, "velocity": 0.48031496062992124, "duration": 1 }, { "name": "A#3", "midi": 58, "time": 70, "velocity": 0.48031496062992124, "duration": 1 }, { "name": "C#3", "midi": 49, "time": 70, "velocity": 0.47244094488188976, "duration": 0.25 }, { "name": "G#1", "midi": 32, "time": 70, "velocity": 0.4645669291338583, "duration": 0.5 }, { "name": "D#3", "midi": 51, "time": 70.25, "velocity": 0.5118110236220472, "duration": 0.25 }, { "name": "C#3", "midi": 49, "time": 70.5, "velocity": 0.48031496062992124, "duration": 0.25 }, { "name": "G#2", "midi": 44, "time": 70.5, "velocity": 0.5039370078740157, "duration": 0.5 }, { "name": "D#3", "midi": 51, "time": 70.75, "velocity": 0.5275590551181102, "duration": 0.25 }, { "name": "G#3", "midi": 56, "time": 71, "velocity": 0.4645669291338583, "duration": 0.3203125 }, { "name": "C3", "midi": 48, "time": 71, "velocity": 0.4566929133858268, "duration": 0.3203125 }, { "name": "G#1", "midi": 32, "time": 71, "velocity": 0.4251968503937008, "duration": 0.5 }, { "name": "D#4", "midi": 63, "time": 71.5, "velocity": 0.5669291338582677, "duration": 0.5 }, { "name": "G#4", "midi": 68, "time": 72, "velocity": 0.5748031496062992, "duration": 0.5 }, { "name": "B3", "midi": 59, "time": 72, "velocity": 0.47244094488188976, "duration": 0.1640625 }, { "name": "D#4", "midi": 63, "time": 72, "velocity": 0.47244094488188976, "duration": 0.1640625 }, { "name": "G#2", "midi": 44, "time": 72, "velocity": 0.4330708661417323, "duration": 1 }, { "name": "G#3", "midi": 56, "time": 72, "velocity": 0.4330708661417323, "duration": 1 }, { "name": "B3", "midi": 59, "time": 72.1640625, "velocity": 0.3858267716535433, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 72.1640625, "velocity": 0.3858267716535433, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 72.33203125, "velocity": 0.3858267716535433, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 72.33203125, "velocity": 0.3858267716535433, "duration": 0.16796875 }, { "name": "B4", "midi": 71, "time": 72.5, "velocity": 0.5275590551181102, "duration": 0.5 }, { "name": "B3", "midi": 59, "time": 72.5, "velocity": 0.41732283464566927, "duration": 0.1640625 }, { "name": "D#4", "midi": 63, "time": 72.5, "velocity": 0.41732283464566927, "duration": 0.1640625 }, { "name": "B3", "midi": 59, "time": 72.6640625, "velocity": 0.3700787401574803, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 72.6640625, "velocity": 0.3700787401574803, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 72.83203125, "velocity": 0.4251968503937008, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 72.83203125, "velocity": 0.4251968503937008, "duration": 0.16796875 }, { "name": "A#4", "midi": 70, "time": 73, "velocity": 0.47244094488188976, "duration": 0.5 }, { "name": "B3", "midi": 59, "time": 73, "velocity": 0.41732283464566927, "duration": 0.1640625 }, { "name": "D#4", "midi": 63, "time": 73, "velocity": 0.41732283464566927, "duration": 0.1640625 }, { "name": "B3", "midi": 59, "time": 73.1640625, "velocity": 0.4015748031496063, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 73.1640625, "velocity": 0.4015748031496063, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 73.33203125, "velocity": 0.4094488188976378, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 73.33203125, "velocity": 0.4094488188976378, "duration": 0.16796875 }, { "name": "G#4", "midi": 68, "time": 73.5, "velocity": 0.48031496062992124, "duration": 0.40234375 }, { "name": "B3", "midi": 59, "time": 73.5, "velocity": 0.3779527559055118, "duration": 0.12890625 }, { "name": "D#4", "midi": 63, "time": 73.5, "velocity": 0.3779527559055118, "duration": 0.12890625 }, { "name": "B3", "midi": 59, "time": 73.6640625, "velocity": 0.4015748031496063, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 73.6640625, "velocity": 0.4015748031496063, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 73.83203125, "velocity": 0.3937007874015748, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 73.83203125, "velocity": 0.3937007874015748, "duration": 0.16796875 }, { "name": "G4", "midi": 67, "time": 74, "velocity": 0.4409448818897638, "duration": 0.5 }, { "name": "C#4", "midi": 61, "time": 74, "velocity": 0.3700787401574803, "duration": 0.1640625 }, { "name": "D#4", "midi": 63, "time": 74, "velocity": 0.3700787401574803, "duration": 0.1640625 }, { "name": "A#3", "midi": 58, "time": 74, "velocity": 0.4251968503937008, "duration": 0.6640625 }, { "name": "C#4", "midi": 61, "time": 74.1640625, "velocity": 0.3779527559055118, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 74.1640625, "velocity": 0.3779527559055118, "duration": 0.16796875 }, { "name": "C#4", "midi": 61, "time": 74.33203125, "velocity": 0.4094488188976378, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 74.33203125, "velocity": 0.4094488188976378, "duration": 0.16796875 }, { "name": "C#5", "midi": 73, "time": 74.5, "velocity": 0.5826771653543307, "duration": 0.40234375 }, { "name": "C#4", "midi": 61, "time": 74.5, "velocity": 0.36220472440944884, "duration": 0.12890625 }, { "name": "D#4", "midi": 63, "time": 74.5, "velocity": 0.36220472440944884, "duration": 0.12890625 }, { "name": "C#4", "midi": 61, "time": 74.6640625, "velocity": 0.3858267716535433, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 74.6640625, "velocity": 0.3858267716535433, "duration": 0.16796875 }, { "name": "A#3", "midi": 58, "time": 74.6640625, "velocity": 0.5039370078740157, "duration": 0.16796875 }, { "name": "C#4", "midi": 61, "time": 74.83203125, "velocity": 0.3700787401574803, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 74.83203125, "velocity": 0.3700787401574803, "duration": 0.16796875 }, { "name": "A3", "midi": 57, "time": 74.83203125, "velocity": 0.4330708661417323, "duration": 0.1328125 }, { "name": "C#4", "midi": 61, "time": 75, "velocity": 0.36220472440944884, "duration": 0.1640625 }, { "name": "D#4", "midi": 63, "time": 75, "velocity": 0.36220472440944884, "duration": 0.1640625 }, { "name": "A#3", "midi": 58, "time": 75, "velocity": 0.4645669291338583, "duration": 0.078125 }, { "name": "C#4", "midi": 61, "time": 75.1640625, "velocity": 0.4094488188976378, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 75.1640625, "velocity": 0.4094488188976378, "duration": 0.16796875 }, { "name": "A#3", "midi": 58, "time": 75.1640625, "velocity": 0.4881889763779528, "duration": 0.08203125 }, { "name": "C#4", "midi": 61, "time": 75.33203125, "velocity": 0.3700787401574803, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 75.33203125, "velocity": 0.3700787401574803, "duration": 0.16796875 }, { "name": "G#3", "midi": 56, "time": 75.33203125, "velocity": 0.4645669291338583, "duration": 0.08203125 }, { "name": "C#4", "midi": 61, "time": 75.5, "velocity": 0.41732283464566927, "duration": 0.1640625 }, { "name": "D#4", "midi": 63, "time": 75.5, "velocity": 0.41732283464566927, "duration": 0.1640625 }, { "name": "G3", "midi": 55, "time": 75.5, "velocity": 0.44881889763779526, "duration": 0.078125 }, { "name": "C#4", "midi": 61, "time": 75.6640625, "velocity": 0.41732283464566927, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 75.6640625, "velocity": 0.41732283464566927, "duration": 0.16796875 }, { "name": "F3", "midi": 53, "time": 75.6640625, "velocity": 0.4409448818897638, "duration": 0.08203125 }, { "name": "C#4", "midi": 61, "time": 75.83203125, "velocity": 0.41732283464566927, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 75.83203125, "velocity": 0.41732283464566927, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 75.83203125, "velocity": 0.4566929133858268, "duration": 0.08203125 }, { "name": "G#4", "midi": 68, "time": 76, "velocity": 0.4251968503937008, "duration": 0.5 }, { "name": "B3", "midi": 59, "time": 76, "velocity": 0.3858267716535433, "duration": 0.1640625 }, { "name": "D#4", "midi": 63, "time": 76, "velocity": 0.3858267716535433, "duration": 0.1640625 }, { "name": "G#3", "midi": 56, "time": 76, "velocity": 0.5354330708661418, "duration": 0.5 }, { "name": "B3", "midi": 59, "time": 76.1640625, "velocity": 0.3937007874015748, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 76.1640625, "velocity": 0.3937007874015748, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 76.33203125, "velocity": 0.3937007874015748, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 76.33203125, "velocity": 0.3937007874015748, "duration": 0.16796875 }, { "name": "B4", "midi": 71, "time": 76.5, "velocity": 0.49606299212598426, "duration": 0.5 }, { "name": "B3", "midi": 59, "time": 76.5, "velocity": 0.4251968503937008, "duration": 0.1640625 }, { "name": "D#4", "midi": 63, "time": 76.5, "velocity": 0.4251968503937008, "duration": 0.1640625 }, { "name": "B3", "midi": 59, "time": 76.6640625, "velocity": 0.3858267716535433, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 76.6640625, "velocity": 0.3858267716535433, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 76.83203125, "velocity": 0.4094488188976378, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 76.83203125, "velocity": 0.4094488188976378, "duration": 0.16796875 }, { "name": "A#4", "midi": 70, "time": 77, "velocity": 0.4251968503937008, "duration": 0.5 }, { "name": "B3", "midi": 59, "time": 77, "velocity": 0.3779527559055118, "duration": 0.1640625 }, { "name": "D#4", "midi": 63, "time": 77, "velocity": 0.3779527559055118, "duration": 0.1640625 }, { "name": "B3", "midi": 59, "time": 77.1640625, "velocity": 0.4094488188976378, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 77.1640625, "velocity": 0.4094488188976378, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 77.33203125, "velocity": 0.41732283464566927, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 77.33203125, "velocity": 0.41732283464566927, "duration": 0.16796875 }, { "name": "G#4", "midi": 68, "time": 77.5, "velocity": 0.41732283464566927, "duration": 0.40234375 }, { "name": "B3", "midi": 59, "time": 77.5, "velocity": 0.41732283464566927, "duration": 0.12890625 }, { "name": "D#4", "midi": 63, "time": 77.5, "velocity": 0.41732283464566927, "duration": 0.12890625 }, { "name": "B3", "midi": 59, "time": 77.6640625, "velocity": 0.4015748031496063, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 77.6640625, "velocity": 0.4015748031496063, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 77.83203125, "velocity": 0.3464566929133858, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 77.83203125, "velocity": 0.3464566929133858, "duration": 0.16796875 }, { "name": "G#4", "midi": 68, "time": 78, "velocity": 0.4566929133858268, "duration": 0.5 }, { "name": "A#3", "midi": 58, "time": 78, "velocity": 0.4094488188976378, "duration": 0.1640625 }, { "name": "D#4", "midi": 63, "time": 78, "velocity": 0.4094488188976378, "duration": 0.1640625 }, { "name": "D#3", "midi": 51, "time": 78, "velocity": 0.4330708661417323, "duration": 0.6640625 }, { "name": "A#3", "midi": 58, "time": 78.1640625, "velocity": 0.4015748031496063, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 78.1640625, "velocity": 0.4015748031496063, "duration": 0.16796875 }, { "name": "A#3", "midi": 58, "time": 78.33203125, "velocity": 0.3779527559055118, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 78.33203125, "velocity": 0.3779527559055118, "duration": 0.16796875 }, { "name": "G4", "midi": 67, "time": 78.5, "velocity": 0.4566929133858268, "duration": 0.40234375 }, { "name": "A#3", "midi": 58, "time": 78.5, "velocity": 0.3700787401574803, "duration": 0.12890625 }, { "name": "D#4", "midi": 63, "time": 78.5, "velocity": 0.3700787401574803, "duration": 0.12890625 }, { "name": "A#3", "midi": 58, "time": 78.6640625, "velocity": 0.3937007874015748, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 78.6640625, "velocity": 0.3937007874015748, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 78.6640625, "velocity": 0.4409448818897638, "duration": 0.16796875 }, { "name": "A#3", "midi": 58, "time": 78.83203125, "velocity": 0.3779527559055118, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 78.83203125, "velocity": 0.3779527559055118, "duration": 0.16796875 }, { "name": "D3", "midi": 50, "time": 78.83203125, "velocity": 0.4409448818897638, "duration": 0.1328125 }, { "name": "G3", "midi": 55, "time": 79, "velocity": 0.41732283464566927, "duration": 0.1640625 }, { "name": "A#3", "midi": 58, "time": 79, "velocity": 0.41732283464566927, "duration": 0.1640625 }, { "name": "D#4", "midi": 63, "time": 79, "velocity": 0.41732283464566927, "duration": 0.1640625 }, { "name": "D#3", "midi": 51, "time": 79, "velocity": 0.49606299212598426, "duration": 0.078125 }, { "name": "G3", "midi": 55, "time": 79.1640625, "velocity": 0.3779527559055118, "duration": 0.16796875 }, { "name": "A#3", "midi": 58, "time": 79.1640625, "velocity": 0.3779527559055118, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 79.1640625, "velocity": 0.3779527559055118, "duration": 0.16796875 }, { "name": "E3", "midi": 52, "time": 79.1640625, "velocity": 0.4881889763779528, "duration": 0.08203125 }, { "name": "G3", "midi": 55, "time": 79.33203125, "velocity": 0.3700787401574803, "duration": 0.16796875 }, { "name": "A#3", "midi": 58, "time": 79.33203125, "velocity": 0.3700787401574803, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 79.33203125, "velocity": 0.3700787401574803, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 79.33203125, "velocity": 0.4881889763779528, "duration": 0.08203125 }, { "name": "G3", "midi": 55, "time": 79.5, "velocity": 0.3858267716535433, "duration": 0.1640625 }, { "name": "A#3", "midi": 58, "time": 79.5, "velocity": 0.3858267716535433, "duration": 0.1640625 }, { "name": "D#4", "midi": 63, "time": 79.5, "velocity": 0.3858267716535433, "duration": 0.1640625 }, { "name": "C#3", "midi": 49, "time": 79.5, "velocity": 0.49606299212598426, "duration": 0.078125 }, { "name": "G3", "midi": 55, "time": 79.6640625, "velocity": 0.3700787401574803, "duration": 0.16796875 }, { "name": "A#3", "midi": 58, "time": 79.6640625, "velocity": 0.3700787401574803, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 79.6640625, "velocity": 0.3700787401574803, "duration": 0.16796875 }, { "name": "B2", "midi": 47, "time": 79.6640625, "velocity": 0.47244094488188976, "duration": 0.08203125 }, { "name": "G3", "midi": 55, "time": 79.83203125, "velocity": 0.4094488188976378, "duration": 0.16796875 }, { "name": "A#3", "midi": 58, "time": 79.83203125, "velocity": 0.4094488188976378, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 79.83203125, "velocity": 0.4094488188976378, "duration": 0.16796875 }, { "name": "A#2", "midi": 46, "time": 79.83203125, "velocity": 0.48031496062992124, "duration": 0.08203125 }, { "name": "G#4", "midi": 68, "time": 80, "velocity": 0.44881889763779526, "duration": 0.5 }, { "name": "B3", "midi": 59, "time": 80, "velocity": 0.3700787401574803, "duration": 0.1640625 }, { "name": "D#4", "midi": 63, "time": 80, "velocity": 0.3700787401574803, "duration": 0.1640625 }, { "name": "G#2", "midi": 44, "time": 80, "velocity": 0.4566929133858268, "duration": 0.5 }, { "name": "B3", "midi": 59, "time": 80.1640625, "velocity": 0.41732283464566927, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 80.1640625, "velocity": 0.41732283464566927, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 80.33203125, "velocity": 0.36220472440944884, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 80.33203125, "velocity": 0.36220472440944884, "duration": 0.16796875 }, { "name": "B4", "midi": 71, "time": 80.5, "velocity": 0.5039370078740157, "duration": 0.5 }, { "name": "B3", "midi": 59, "time": 80.5, "velocity": 0.3937007874015748, "duration": 0.1640625 }, { "name": "D#4", "midi": 63, "time": 80.5, "velocity": 0.3937007874015748, "duration": 0.1640625 }, { "name": "B3", "midi": 59, "time": 80.6640625, "velocity": 0.41732283464566927, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 80.6640625, "velocity": 0.41732283464566927, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 80.83203125, "velocity": 0.4094488188976378, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 80.83203125, "velocity": 0.4094488188976378, "duration": 0.16796875 }, { "name": "A#4", "midi": 70, "time": 81, "velocity": 0.4566929133858268, "duration": 0.5 }, { "name": "B3", "midi": 59, "time": 81, "velocity": 0.4015748031496063, "duration": 0.1640625 }, { "name": "D#4", "midi": 63, "time": 81, "velocity": 0.4015748031496063, "duration": 0.1640625 }, { "name": "B3", "midi": 59, "time": 81.1640625, "velocity": 0.4094488188976378, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 81.1640625, "velocity": 0.4094488188976378, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 81.33203125, "velocity": 0.4015748031496063, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 81.33203125, "velocity": 0.4015748031496063, "duration": 0.16796875 }, { "name": "G#4", "midi": 68, "time": 81.5, "velocity": 0.4409448818897638, "duration": 0.40234375 }, { "name": "B3", "midi": 59, "time": 81.5, "velocity": 0.3937007874015748, "duration": 0.12890625 }, { "name": "D#4", "midi": 63, "time": 81.5, "velocity": 0.3937007874015748, "duration": 0.12890625 }, { "name": "B3", "midi": 59, "time": 81.6640625, "velocity": 0.4094488188976378, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 81.6640625, "velocity": 0.4094488188976378, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 81.83203125, "velocity": 0.4094488188976378, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 81.83203125, "velocity": 0.4094488188976378, "duration": 0.16796875 }, { "name": "F#4", "midi": 66, "time": 82, "velocity": 0.7401574803149606, "duration": 0.5 }, { "name": "F#5", "midi": 78, "time": 82, "velocity": 0.7401574803149606, "duration": 0.6640625 }, { "name": "A2", "midi": 45, "time": 82, "velocity": 0.5590551181102362, "duration": 0.1640625 }, { "name": "B2", "midi": 47, "time": 82, "velocity": 0.5590551181102362, "duration": 0.1640625 }, { "name": "D#3", "midi": 51, "time": 82, "velocity": 0.5590551181102362, "duration": 0.1640625 }, { "name": "F#3", "midi": 54, "time": 82, "velocity": 0.5590551181102362, "duration": 0.1640625 }, { "name": "A2", "midi": 45, "time": 82.1640625, "velocity": 0.4409448818897638, "duration": 0.16796875 }, { "name": "B2", "midi": 47, "time": 82.1640625, "velocity": 0.4409448818897638, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 82.1640625, "velocity": 0.4409448818897638, "duration": 0.16796875 }, { "name": "F#3", "midi": 54, "time": 82.1640625, "velocity": 0.4409448818897638, "duration": 0.16796875 }, { "name": "A2", "midi": 45, "time": 82.33203125, "velocity": 0.47244094488188976, "duration": 0.16796875 }, { "name": "B2", "midi": 47, "time": 82.33203125, "velocity": 0.47244094488188976, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 82.33203125, "velocity": 0.47244094488188976, "duration": 0.16796875 }, { "name": "F#3", "midi": 54, "time": 82.33203125, "velocity": 0.47244094488188976, "duration": 0.16796875 }, { "name": "A2", "midi": 45, "time": 82.5, "velocity": 0.44881889763779526, "duration": 0.1640625 }, { "name": "B2", "midi": 47, "time": 82.5, "velocity": 0.44881889763779526, "duration": 0.1640625 }, { "name": "D#3", "midi": 51, "time": 82.5, "velocity": 0.44881889763779526, "duration": 0.1640625 }, { "name": "F#3", "midi": 54, "time": 82.5, "velocity": 0.44881889763779526, "duration": 0.1640625 }, { "name": "D#5", "midi": 75, "time": 82.6640625, "velocity": 0.41732283464566927, "duration": 0.08203125 }, { "name": "A2", "midi": 45, "time": 82.6640625, "velocity": 0.48031496062992124, "duration": 0.16796875 }, { "name": "B2", "midi": 47, "time": 82.6640625, "velocity": 0.48031496062992124, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 82.6640625, "velocity": 0.48031496062992124, "duration": 0.16796875 }, { "name": "F#3", "midi": 54, "time": 82.6640625, "velocity": 0.48031496062992124, "duration": 0.16796875 }, { "name": "B4", "midi": 71, "time": 82.83203125, "velocity": 0.41732283464566927, "duration": 0.08203125 }, { "name": "A2", "midi": 45, "time": 82.83203125, "velocity": 0.47244094488188976, "duration": 0.16796875 }, { "name": "B2", "midi": 47, "time": 82.83203125, "velocity": 0.47244094488188976, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 82.83203125, "velocity": 0.47244094488188976, "duration": 0.16796875 }, { "name": "F#3", "midi": 54, "time": 82.83203125, "velocity": 0.47244094488188976, "duration": 0.16796875 }, { "name": "B4", "midi": 71, "time": 83, "velocity": 0.7480314960629921, "duration": 0.5 }, { "name": "B5", "midi": 83, "time": 83, "velocity": 0.7480314960629921, "duration": 0.6640625 }, { "name": "G#2", "midi": 44, "time": 83, "velocity": 0.6535433070866141, "duration": 0.1640625 }, { "name": "B2", "midi": 47, "time": 83, "velocity": 0.6535433070866141, "duration": 0.1640625 }, { "name": "E3", "midi": 52, "time": 83, "velocity": 0.6535433070866141, "duration": 0.1640625 }, { "name": "G#3", "midi": 56, "time": 83, "velocity": 0.6535433070866141, "duration": 0.1640625 }, { "name": "G#2", "midi": 44, "time": 83.1640625, "velocity": 0.49606299212598426, "duration": 0.16796875 }, { "name": "B2", "midi": 47, "time": 83.1640625, "velocity": 0.49606299212598426, "duration": 0.16796875 }, { "name": "E3", "midi": 52, "time": 83.1640625, "velocity": 0.49606299212598426, "duration": 0.16796875 }, { "name": "G#3", "midi": 56, "time": 83.1640625, "velocity": 0.49606299212598426, "duration": 0.16796875 }, { "name": "G#2", "midi": 44, "time": 83.33203125, "velocity": 0.44881889763779526, "duration": 0.16796875 }, { "name": "B2", "midi": 47, "time": 83.33203125, "velocity": 0.44881889763779526, "duration": 0.16796875 }, { "name": "E3", "midi": 52, "time": 83.33203125, "velocity": 0.44881889763779526, "duration": 0.16796875 }, { "name": "G#3", "midi": 56, "time": 83.33203125, "velocity": 0.44881889763779526, "duration": 0.16796875 }, { "name": "G#2", "midi": 44, "time": 83.5, "velocity": 0.4566929133858268, "duration": 0.1640625 }, { "name": "B2", "midi": 47, "time": 83.5, "velocity": 0.4566929133858268, "duration": 0.1640625 }, { "name": "E3", "midi": 52, "time": 83.5, "velocity": 0.4566929133858268, "duration": 0.1640625 }, { "name": "G#3", "midi": 56, "time": 83.5, "velocity": 0.4566929133858268, "duration": 0.1640625 }, { "name": "G#5", "midi": 80, "time": 83.6640625, "velocity": 0.4566929133858268, "duration": 0.08203125 }, { "name": "G#2", "midi": 44, "time": 83.6640625, "velocity": 0.4645669291338583, "duration": 0.16796875 }, { "name": "B2", "midi": 47, "time": 83.6640625, "velocity": 0.4645669291338583, "duration": 0.16796875 }, { "name": "E3", "midi": 52, "time": 83.6640625, "velocity": 0.4645669291338583, "duration": 0.16796875 }, { "name": "G#3", "midi": 56, "time": 83.6640625, "velocity": 0.4645669291338583, "duration": 0.16796875 }, { "name": "E5", "midi": 76, "time": 83.83203125, "velocity": 0.4251968503937008, "duration": 0.08203125 }, { "name": "G#2", "midi": 44, "time": 83.83203125, "velocity": 0.48031496062992124, "duration": 0.16796875 }, { "name": "B2", "midi": 47, "time": 83.83203125, "velocity": 0.48031496062992124, "duration": 0.16796875 }, { "name": "E3", "midi": 52, "time": 83.83203125, "velocity": 0.48031496062992124, "duration": 0.16796875 }, { "name": "G#3", "midi": 56, "time": 83.83203125, "velocity": 0.48031496062992124, "duration": 0.16796875 }, { "name": "E5", "midi": 76, "time": 84, "velocity": 0.7559055118110236, "duration": 0.5 }, { "name": "E6", "midi": 88, "time": 84, "velocity": 0.7559055118110236, "duration": 0.6640625 }, { "name": "C#3", "midi": 49, "time": 84, "velocity": 0.6299212598425197, "duration": 0.1640625 }, { "name": "E3", "midi": 52, "time": 84, "velocity": 0.6299212598425197, "duration": 0.1640625 }, { "name": "F#3", "midi": 54, "time": 84, "velocity": 0.6299212598425197, "duration": 0.1640625 }, { "name": "A#3", "midi": 58, "time": 84, "velocity": 0.6299212598425197, "duration": 0.1640625 }, { "name": "C#3", "midi": 49, "time": 84.1640625, "velocity": 0.4330708661417323, "duration": 0.16796875 }, { "name": "E3", "midi": 52, "time": 84.1640625, "velocity": 0.4330708661417323, "duration": 0.16796875 }, { "name": "F#3", "midi": 54, "time": 84.1640625, "velocity": 0.4330708661417323, "duration": 0.16796875 }, { "name": "A#3", "midi": 58, "time": 84.1640625, "velocity": 0.4330708661417323, "duration": 0.16796875 }, { "name": "C#3", "midi": 49, "time": 84.33203125, "velocity": 0.4409448818897638, "duration": 0.16796875 }, { "name": "E3", "midi": 52, "time": 84.33203125, "velocity": 0.4409448818897638, "duration": 0.16796875 }, { "name": "F#3", "midi": 54, "time": 84.33203125, "velocity": 0.4409448818897638, "duration": 0.16796875 }, { "name": "A#3", "midi": 58, "time": 84.33203125, "velocity": 0.4409448818897638, "duration": 0.16796875 }, { "name": "C#3", "midi": 49, "time": 84.5, "velocity": 0.4645669291338583, "duration": 0.1640625 }, { "name": "E3", "midi": 52, "time": 84.5, "velocity": 0.4645669291338583, "duration": 0.1640625 }, { "name": "F#3", "midi": 54, "time": 84.5, "velocity": 0.4645669291338583, "duration": 0.1640625 }, { "name": "A#3", "midi": 58, "time": 84.5, "velocity": 0.4645669291338583, "duration": 0.1640625 }, { "name": "C#6", "midi": 85, "time": 84.6640625, "velocity": 0.47244094488188976, "duration": 0.08203125 }, { "name": "C#3", "midi": 49, "time": 84.6640625, "velocity": 0.5196850393700787, "duration": 0.16796875 }, { "name": "E3", "midi": 52, "time": 84.6640625, "velocity": 0.5196850393700787, "duration": 0.16796875 }, { "name": "F#3", "midi": 54, "time": 84.6640625, "velocity": 0.5196850393700787, "duration": 0.16796875 }, { "name": "A#3", "midi": 58, "time": 84.6640625, "velocity": 0.5196850393700787, "duration": 0.16796875 }, { "name": "A#5", "midi": 82, "time": 84.83203125, "velocity": 0.4251968503937008, "duration": 0.08203125 }, { "name": "C#3", "midi": 49, "time": 84.83203125, "velocity": 0.4409448818897638, "duration": 0.16796875 }, { "name": "E3", "midi": 52, "time": 84.83203125, "velocity": 0.4409448818897638, "duration": 0.16796875 }, { "name": "F#3", "midi": 54, "time": 84.83203125, "velocity": 0.4409448818897638, "duration": 0.16796875 }, { "name": "A#3", "midi": 58, "time": 84.83203125, "velocity": 0.4409448818897638, "duration": 0.16796875 }, { "name": "B4", "midi": 71, "time": 85, "velocity": 0.49606299212598426, "duration": 0.24609375 }, { "name": "B5", "midi": 83, "time": 85, "velocity": 0.49606299212598426, "duration": 0.24609375 }, { "name": "B2", "midi": 47, "time": 85, "velocity": 0.5118110236220472, "duration": 0.1640625 }, { "name": "E3", "midi": 52, "time": 85, "velocity": 0.5118110236220472, "duration": 0.1640625 }, { "name": "G#3", "midi": 56, "time": 85, "velocity": 0.5118110236220472, "duration": 0.1640625 }, { "name": "B3", "midi": 59, "time": 85, "velocity": 0.5118110236220472, "duration": 0.1640625 }, { "name": "B2", "midi": 47, "time": 85.1640625, "velocity": 0.47244094488188976, "duration": 0.16796875 }, { "name": "E3", "midi": 52, "time": 85.1640625, "velocity": 0.47244094488188976, "duration": 0.16796875 }, { "name": "G#3", "midi": 56, "time": 85.1640625, "velocity": 0.47244094488188976, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 85.1640625, "velocity": 0.47244094488188976, "duration": 0.16796875 }, { "name": "B2", "midi": 47, "time": 85.33203125, "velocity": 0.44881889763779526, "duration": 0.16796875 }, { "name": "E3", "midi": 52, "time": 85.33203125, "velocity": 0.44881889763779526, "duration": 0.16796875 }, { "name": "G#3", "midi": 56, "time": 85.33203125, "velocity": 0.44881889763779526, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 85.33203125, "velocity": 0.44881889763779526, "duration": 0.16796875 }, { "name": "F#3", "midi": 54, "time": 85.5, "velocity": 0.3543307086614173, "duration": 0.24609375 }, { "name": "A3", "midi": 57, "time": 85.5, "velocity": 0.3543307086614173, "duration": 0.24609375 }, { "name": "B3", "midi": 59, "time": 85.5, "velocity": 0.3543307086614173, "duration": 0.24609375 }, { "name": "D#4", "midi": 63, "time": 85.5, "velocity": 0.3543307086614173, "duration": 0.24609375 }, { "name": "B1", "midi": 35, "time": 85.5, "velocity": 0.4409448818897638, "duration": 0.1640625 }, { "name": "B2", "midi": 47, "time": 85.5, "velocity": 0.4409448818897638, "duration": 0.1640625 }, { "name": "B1", "midi": 35, "time": 85.6640625, "velocity": 0.4645669291338583, "duration": 0.16796875 }, { "name": "B2", "midi": 47, "time": 85.6640625, "velocity": 0.4645669291338583, "duration": 0.16796875 }, { "name": "B1", "midi": 35, "time": 85.83203125, "velocity": 0.48031496062992124, "duration": 0.16796875 }, { "name": "B2", "midi": 47, "time": 85.83203125, "velocity": 0.48031496062992124, "duration": 0.16796875 }, { "name": "G#3", "midi": 56, "time": 86, "velocity": 0.6220472440944882, "duration": 0.1640625 }, { "name": "B3", "midi": 59, "time": 86, "velocity": 0.6220472440944882, "duration": 0.1640625 }, { "name": "E4", "midi": 64, "time": 86, "velocity": 0.6220472440944882, "duration": 0.1640625 }, { "name": "E2", "midi": 40, "time": 86, "velocity": 0.6141732283464567, "duration": 0.5 }, { "name": "E3", "midi": 52, "time": 86, "velocity": 0.6141732283464567, "duration": 0.5 }, { "name": "G#3", "midi": 56, "time": 86.1640625, "velocity": 0.4330708661417323, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 86.1640625, "velocity": 0.4330708661417323, "duration": 0.16796875 }, { "name": "G#3", "midi": 56, "time": 86.33203125, "velocity": 0.47244094488188976, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 86.33203125, "velocity": 0.47244094488188976, "duration": 0.16796875 }, { "name": "G#3", "midi": 56, "time": 86.5, "velocity": 0.4881889763779528, "duration": 0.1640625 }, { "name": "B3", "midi": 59, "time": 86.5, "velocity": 0.4881889763779528, "duration": 0.1640625 }, { "name": "G#3", "midi": 56, "time": 86.6640625, "velocity": 0.4881889763779528, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 86.6640625, "velocity": 0.4881889763779528, "duration": 0.16796875 }, { "name": "G#3", "midi": 56, "time": 86.83203125, "velocity": 0.4566929133858268, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 86.83203125, "velocity": 0.4566929133858268, "duration": 0.16796875 }, { "name": "G#3", "midi": 56, "time": 87, "velocity": 0.4409448818897638, "duration": 0.1640625 }, { "name": "B3", "midi": 59, "time": 87, "velocity": 0.4409448818897638, "duration": 0.1640625 }, { "name": "G#3", "midi": 56, "time": 87.1640625, "velocity": 0.48031496062992124, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 87.1640625, "velocity": 0.48031496062992124, "duration": 0.16796875 }, { "name": "G#3", "midi": 56, "time": 87.33203125, "velocity": 0.4645669291338583, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 87.33203125, "velocity": 0.4645669291338583, "duration": 0.16796875 }, { "name": "G#3", "midi": 56, "time": 87.5, "velocity": 0.47244094488188976, "duration": 0.1640625 }, { "name": "B3", "midi": 59, "time": 87.5, "velocity": 0.47244094488188976, "duration": 0.1640625 }, { "name": "G#3", "midi": 56, "time": 87.6640625, "velocity": 0.48031496062992124, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 87.6640625, "velocity": 0.48031496062992124, "duration": 0.16796875 }, { "name": "G#3", "midi": 56, "time": 87.83203125, "velocity": 0.4881889763779528, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 87.83203125, "velocity": 0.4881889763779528, "duration": 0.16796875 }, { "name": "E4", "midi": 64, "time": 88, "velocity": 0.5196850393700787, "duration": 0.5 }, { "name": "G#3", "midi": 56, "time": 88, "velocity": 0.3543307086614173, "duration": 0.1640625 }, { "name": "B3", "midi": 59, "time": 88, "velocity": 0.3543307086614173, "duration": 0.1640625 }, { "name": "E2", "midi": 40, "time": 88, "velocity": 0.4881889763779528, "duration": 1 }, { "name": "E3", "midi": 52, "time": 88, "velocity": 0.4881889763779528, "duration": 1 }, { "name": "G#3", "midi": 56, "time": 88.1640625, "velocity": 0.3937007874015748, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 88.1640625, "velocity": 0.3937007874015748, "duration": 0.16796875 }, { "name": "G#3", "midi": 56, "time": 88.33203125, "velocity": 0.3937007874015748, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 88.33203125, "velocity": 0.3937007874015748, "duration": 0.16796875 }, { "name": "G#4", "midi": 68, "time": 88.5, "velocity": 0.5826771653543307, "duration": 0.5 }, { "name": "G#3", "midi": 56, "time": 88.5, "velocity": 0.41732283464566927, "duration": 0.1640625 }, { "name": "B3", "midi": 59, "time": 88.5, "velocity": 0.41732283464566927, "duration": 0.1640625 }, { "name": "G#3", "midi": 56, "time": 88.6640625, "velocity": 0.3937007874015748, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 88.6640625, "velocity": 0.3937007874015748, "duration": 0.16796875 }, { "name": "G#3", "midi": 56, "time": 88.83203125, "velocity": 0.36220472440944884, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 88.83203125, "velocity": 0.36220472440944884, "duration": 0.16796875 }, { "name": "F#4", "midi": 66, "time": 89, "velocity": 0.4409448818897638, "duration": 0.5 }, { "name": "G#3", "midi": 56, "time": 89, "velocity": 0.3779527559055118, "duration": 0.1640625 }, { "name": "B3", "midi": 59, "time": 89, "velocity": 0.3779527559055118, "duration": 0.1640625 }, { "name": "G#3", "midi": 56, "time": 89.1640625, "velocity": 0.3858267716535433, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 89.1640625, "velocity": 0.3858267716535433, "duration": 0.16796875 }, { "name": "G#3", "midi": 56, "time": 89.33203125, "velocity": 0.3937007874015748, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 89.33203125, "velocity": 0.3937007874015748, "duration": 0.16796875 }, { "name": "E4", "midi": 64, "time": 89.5, "velocity": 0.4330708661417323, "duration": 0.40234375 }, { "name": "G#3", "midi": 56, "time": 89.5, "velocity": 0.3937007874015748, "duration": 0.12890625 }, { "name": "B3", "midi": 59, "time": 89.5, "velocity": 0.3937007874015748, "duration": 0.12890625 }, { "name": "G#3", "midi": 56, "time": 89.6640625, "velocity": 0.4251968503937008, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 89.6640625, "velocity": 0.4251968503937008, "duration": 0.16796875 }, { "name": "G#3", "midi": 56, "time": 89.83203125, "velocity": 0.3937007874015748, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 89.83203125, "velocity": 0.3937007874015748, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 90, "velocity": 0.47244094488188976, "duration": 0.5 }, { "name": "A3", "midi": 57, "time": 90, "velocity": 0.3779527559055118, "duration": 0.1640625 }, { "name": "B3", "midi": 59, "time": 90, "velocity": 0.3779527559055118, "duration": 0.1640625 }, { "name": "F#3", "midi": 54, "time": 90, "velocity": 0.4409448818897638, "duration": 0.6640625 }, { "name": "A3", "midi": 57, "time": 90.1640625, "velocity": 0.4409448818897638, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 90.1640625, "velocity": 0.4409448818897638, "duration": 0.16796875 }, { "name": "A3", "midi": 57, "time": 90.33203125, "velocity": 0.3858267716535433, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 90.33203125, "velocity": 0.3858267716535433, "duration": 0.16796875 }, { "name": "A4", "midi": 69, "time": 90.5, "velocity": 0.5039370078740157, "duration": 0.40234375 }, { "name": "A3", "midi": 57, "time": 90.5, "velocity": 0.3858267716535433, "duration": 0.12890625 }, { "name": "B3", "midi": 59, "time": 90.5, "velocity": 0.3858267716535433, "duration": 0.12890625 }, { "name": "A3", "midi": 57, "time": 90.6640625, "velocity": 0.3858267716535433, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 90.6640625, "velocity": 0.3858267716535433, "duration": 0.16796875 }, { "name": "F#3", "midi": 54, "time": 90.6640625, "velocity": 0.4881889763779528, "duration": 0.16796875 }, { "name": "A3", "midi": 57, "time": 90.83203125, "velocity": 0.4015748031496063, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 90.83203125, "velocity": 0.4015748031496063, "duration": 0.16796875 }, { "name": "F3", "midi": 53, "time": 90.83203125, "velocity": 0.48031496062992124, "duration": 0.1328125 }, { "name": "A3", "midi": 57, "time": 91, "velocity": 0.3858267716535433, "duration": 0.1640625 }, { "name": "B3", "midi": 59, "time": 91, "velocity": 0.3858267716535433, "duration": 0.1640625 }, { "name": "F#3", "midi": 54, "time": 91, "velocity": 0.5039370078740157, "duration": 0.078125 }, { "name": "A3", "midi": 57, "time": 91.1640625, "velocity": 0.4251968503937008, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 91.1640625, "velocity": 0.4251968503937008, "duration": 0.16796875 }, { "name": "F#3", "midi": 54, "time": 91.1640625, "velocity": 0.47244094488188976, "duration": 0.08203125 }, { "name": "A3", "midi": 57, "time": 91.33203125, "velocity": 0.41732283464566927, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 91.33203125, "velocity": 0.41732283464566927, "duration": 0.16796875 }, { "name": "E3", "midi": 52, "time": 91.33203125, "velocity": 0.41732283464566927, "duration": 0.0625 }, { "name": "A3", "midi": 57, "time": 91.5, "velocity": 0.4015748031496063, "duration": 0.1640625 }, { "name": "B3", "midi": 59, "time": 91.5, "velocity": 0.4015748031496063, "duration": 0.1640625 }, { "name": "D#3", "midi": 51, "time": 91.5, "velocity": 0.47244094488188976, "duration": 0.078125 }, { "name": "A3", "midi": 57, "time": 91.6640625, "velocity": 0.3858267716535433, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 91.6640625, "velocity": 0.3858267716535433, "duration": 0.16796875 }, { "name": "C#3", "midi": 49, "time": 91.6640625, "velocity": 0.4251968503937008, "duration": 0.08203125 }, { "name": "A3", "midi": 57, "time": 91.83203125, "velocity": 0.4094488188976378, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 91.83203125, "velocity": 0.4094488188976378, "duration": 0.16796875 }, { "name": "B2", "midi": 47, "time": 91.83203125, "velocity": 0.4566929133858268, "duration": 0.0625 }, { "name": "E4", "midi": 64, "time": 92, "velocity": 0.4330708661417323, "duration": 0.5 }, { "name": "G#3", "midi": 56, "time": 92, "velocity": 0.3937007874015748, "duration": 0.1640625 }, { "name": "B3", "midi": 59, "time": 92, "velocity": 0.3937007874015748, "duration": 0.1640625 }, { "name": "E3", "midi": 52, "time": 92, "velocity": 0.5039370078740157, "duration": 0.5 }, { "name": "G#3", "midi": 56, "time": 92.1640625, "velocity": 0.3858267716535433, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 92.1640625, "velocity": 0.3858267716535433, "duration": 0.16796875 }, { "name": "G#3", "midi": 56, "time": 92.33203125, "velocity": 0.3937007874015748, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 92.33203125, "velocity": 0.3937007874015748, "duration": 0.16796875 }, { "name": "G#4", "midi": 68, "time": 92.5, "velocity": 0.5354330708661418, "duration": 0.5 }, { "name": "G#3", "midi": 56, "time": 92.5, "velocity": 0.4015748031496063, "duration": 0.1640625 }, { "name": "B3", "midi": 59, "time": 92.5, "velocity": 0.4015748031496063, "duration": 0.1640625 }, { "name": "G#3", "midi": 56, "time": 92.6640625, "velocity": 0.4094488188976378, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 92.6640625, "velocity": 0.4094488188976378, "duration": 0.16796875 }, { "name": "G#3", "midi": 56, "time": 92.83203125, "velocity": 0.36220472440944884, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 92.83203125, "velocity": 0.36220472440944884, "duration": 0.16796875 }, { "name": "F#4", "midi": 66, "time": 93, "velocity": 0.4251968503937008, "duration": 0.5 }, { "name": "G#3", "midi": 56, "time": 93, "velocity": 0.3700787401574803, "duration": 0.1640625 }, { "name": "B3", "midi": 59, "time": 93, "velocity": 0.3700787401574803, "duration": 0.1640625 }, { "name": "G#3", "midi": 56, "time": 93.1640625, "velocity": 0.4094488188976378, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 93.1640625, "velocity": 0.4094488188976378, "duration": 0.16796875 }, { "name": "G#3", "midi": 56, "time": 93.33203125, "velocity": 0.3700787401574803, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 93.33203125, "velocity": 0.3700787401574803, "duration": 0.16796875 }, { "name": "E4", "midi": 64, "time": 93.5, "velocity": 0.48031496062992124, "duration": 0.40234375 }, { "name": "G#3", "midi": 56, "time": 93.5, "velocity": 0.3937007874015748, "duration": 0.12890625 }, { "name": "B3", "midi": 59, "time": 93.5, "velocity": 0.3937007874015748, "duration": 0.12890625 }, { "name": "G#3", "midi": 56, "time": 93.6640625, "velocity": 0.4409448818897638, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 93.6640625, "velocity": 0.4409448818897638, "duration": 0.16796875 }, { "name": "G#3", "midi": 56, "time": 93.83203125, "velocity": 0.4015748031496063, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 93.83203125, "velocity": 0.4015748031496063, "duration": 0.16796875 }, { "name": "D4", "midi": 62, "time": 94, "velocity": 0.4566929133858268, "duration": 1.5 }, { "name": "D3", "midi": 50, "time": 94, "velocity": 0.3700787401574803, "duration": 0.1640625 }, { "name": "G#3", "midi": 56, "time": 94, "velocity": 0.3700787401574803, "duration": 0.1640625 }, { "name": "B3", "midi": 59, "time": 94, "velocity": 0.3700787401574803, "duration": 0.1640625 }, { "name": "D3", "midi": 50, "time": 94.1640625, "velocity": 0.4015748031496063, "duration": 0.16796875 }, { "name": "G#3", "midi": 56, "time": 94.1640625, "velocity": 0.4015748031496063, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 94.1640625, "velocity": 0.4015748031496063, "duration": 0.16796875 }, { "name": "F1", "midi": 29, "time": 94.1640625, "velocity": 0.41732283464566927, "duration": 0.08203125 }, { "name": "D3", "midi": 50, "time": 94.33203125, "velocity": 0.3858267716535433, "duration": 0.16796875 }, { "name": "G#3", "midi": 56, "time": 94.33203125, "velocity": 0.3858267716535433, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 94.33203125, "velocity": 0.3858267716535433, "duration": 0.16796875 }, { "name": "G#1", "midi": 32, "time": 94.33203125, "velocity": 0.5039370078740157, "duration": 0.08203125 }, { "name": "D3", "midi": 50, "time": 94.5, "velocity": 0.3858267716535433, "duration": 0.1640625 }, { "name": "G#3", "midi": 56, "time": 94.5, "velocity": 0.3858267716535433, "duration": 0.1640625 }, { "name": "B3", "midi": 59, "time": 94.5, "velocity": 0.3858267716535433, "duration": 0.1640625 }, { "name": "B1", "midi": 35, "time": 94.5, "velocity": 0.47244094488188976, "duration": 0.078125 }, { "name": "D3", "midi": 50, "time": 94.6640625, "velocity": 0.4015748031496063, "duration": 0.16796875 }, { "name": "G#3", "midi": 56, "time": 94.6640625, "velocity": 0.4015748031496063, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 94.6640625, "velocity": 0.4015748031496063, "duration": 0.16796875 }, { "name": "D2", "midi": 38, "time": 94.6640625, "velocity": 0.5039370078740157, "duration": 0.08203125 }, { "name": "D3", "midi": 50, "time": 94.83203125, "velocity": 0.3858267716535433, "duration": 0.16796875 }, { "name": "G#3", "midi": 56, "time": 94.83203125, "velocity": 0.3858267716535433, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 94.83203125, "velocity": 0.3858267716535433, "duration": 0.16796875 }, { "name": "F2", "midi": 41, "time": 94.83203125, "velocity": 0.49606299212598426, "duration": 0.08203125 }, { "name": "D3", "midi": 50, "time": 95, "velocity": 0.3858267716535433, "duration": 0.1640625 }, { "name": "G#3", "midi": 56, "time": 95, "velocity": 0.3858267716535433, "duration": 0.1640625 }, { "name": "B3", "midi": 59, "time": 95, "velocity": 0.3858267716535433, "duration": 0.1640625 }, { "name": "G#2", "midi": 44, "time": 95, "velocity": 0.5118110236220472, "duration": 0.24609375 }, { "name": "D3", "midi": 50, "time": 95.1640625, "velocity": 0.3858267716535433, "duration": 0.16796875 }, { "name": "G#3", "midi": 56, "time": 95.1640625, "velocity": 0.3858267716535433, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 95.1640625, "velocity": 0.3858267716535433, "duration": 0.16796875 }, { "name": "D3", "midi": 50, "time": 95.33203125, "velocity": 0.3779527559055118, "duration": 0.16796875 }, { "name": "G#3", "midi": 56, "time": 95.33203125, "velocity": 0.3779527559055118, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 95.33203125, "velocity": 0.3779527559055118, "duration": 0.16796875 }, { "name": "D4", "midi": 62, "time": 95.5, "velocity": 0.48031496062992124, "duration": 0.40234375 }, { "name": "D3", "midi": 50, "time": 95.5, "velocity": 0.4330708661417323, "duration": 0.12890625 }, { "name": "G#3", "midi": 56, "time": 95.5, "velocity": 0.4330708661417323, "duration": 0.12890625 }, { "name": "B3", "midi": 59, "time": 95.5, "velocity": 0.4330708661417323, "duration": 0.12890625 }, { "name": "D3", "midi": 50, "time": 95.6640625, "velocity": 0.3937007874015748, "duration": 0.16796875 }, { "name": "G#3", "midi": 56, "time": 95.6640625, "velocity": 0.3937007874015748, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 95.6640625, "velocity": 0.3937007874015748, "duration": 0.16796875 }, { "name": "D3", "midi": 50, "time": 95.83203125, "velocity": 0.3779527559055118, "duration": 0.16796875 }, { "name": "G#3", "midi": 56, "time": 95.83203125, "velocity": 0.3779527559055118, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 95.83203125, "velocity": 0.3779527559055118, "duration": 0.16796875 }, { "name": "D4", "midi": 62, "time": 96, "velocity": 0.4566929133858268, "duration": 1.5 }, { "name": "D3", "midi": 50, "time": 96, "velocity": 0.4015748031496063, "duration": 0.1640625 }, { "name": "G#3", "midi": 56, "time": 96, "velocity": 0.4015748031496063, "duration": 0.1640625 }, { "name": "B3", "midi": 59, "time": 96, "velocity": 0.4015748031496063, "duration": 0.1640625 }, { "name": "D3", "midi": 50, "time": 96.1640625, "velocity": 0.4251968503937008, "duration": 0.16796875 }, { "name": "G#3", "midi": 56, "time": 96.1640625, "velocity": 0.4251968503937008, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 96.1640625, "velocity": 0.4251968503937008, "duration": 0.16796875 }, { "name": "F1", "midi": 29, "time": 96.1640625, "velocity": 0.4094488188976378, "duration": 0.08203125 }, { "name": "D3", "midi": 50, "time": 96.33203125, "velocity": 0.4251968503937008, "duration": 0.16796875 }, { "name": "G#3", "midi": 56, "time": 96.33203125, "velocity": 0.4251968503937008, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 96.33203125, "velocity": 0.4251968503937008, "duration": 0.16796875 }, { "name": "G#1", "midi": 32, "time": 96.33203125, "velocity": 0.5118110236220472, "duration": 0.08203125 }, { "name": "D3", "midi": 50, "time": 96.5, "velocity": 0.4015748031496063, "duration": 0.1640625 }, { "name": "G#3", "midi": 56, "time": 96.5, "velocity": 0.4015748031496063, "duration": 0.1640625 }, { "name": "B3", "midi": 59, "time": 96.5, "velocity": 0.4015748031496063, "duration": 0.1640625 }, { "name": "B1", "midi": 35, "time": 96.5, "velocity": 0.49606299212598426, "duration": 0.078125 }, { "name": "D3", "midi": 50, "time": 96.6640625, "velocity": 0.41732283464566927, "duration": 0.16796875 }, { "name": "G#3", "midi": 56, "time": 96.6640625, "velocity": 0.41732283464566927, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 96.6640625, "velocity": 0.41732283464566927, "duration": 0.16796875 }, { "name": "D2", "midi": 38, "time": 96.6640625, "velocity": 0.48031496062992124, "duration": 0.08203125 }, { "name": "D3", "midi": 50, "time": 96.83203125, "velocity": 0.3937007874015748, "duration": 0.16796875 }, { "name": "G#3", "midi": 56, "time": 96.83203125, "velocity": 0.3937007874015748, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 96.83203125, "velocity": 0.3937007874015748, "duration": 0.16796875 }, { "name": "F2", "midi": 41, "time": 96.83203125, "velocity": 0.4409448818897638, "duration": 0.08203125 }, { "name": "D3", "midi": 50, "time": 97, "velocity": 0.4015748031496063, "duration": 0.1640625 }, { "name": "G#3", "midi": 56, "time": 97, "velocity": 0.4015748031496063, "duration": 0.1640625 }, { "name": "B3", "midi": 59, "time": 97, "velocity": 0.4015748031496063, "duration": 0.1640625 }, { "name": "G#2", "midi": 44, "time": 97, "velocity": 0.49606299212598426, "duration": 0.24609375 }, { "name": "D3", "midi": 50, "time": 97.1640625, "velocity": 0.3858267716535433, "duration": 0.16796875 }, { "name": "G#3", "midi": 56, "time": 97.1640625, "velocity": 0.3858267716535433, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 97.1640625, "velocity": 0.3858267716535433, "duration": 0.16796875 }, { "name": "D3", "midi": 50, "time": 97.33203125, "velocity": 0.4330708661417323, "duration": 0.16796875 }, { "name": "G#3", "midi": 56, "time": 97.33203125, "velocity": 0.4330708661417323, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 97.33203125, "velocity": 0.4330708661417323, "duration": 0.16796875 }, { "name": "D4", "midi": 62, "time": 97.5, "velocity": 0.47244094488188976, "duration": 0.40234375 }, { "name": "D3", "midi": 50, "time": 97.5, "velocity": 0.3464566929133858, "duration": 0.12890625 }, { "name": "G#3", "midi": 56, "time": 97.5, "velocity": 0.3464566929133858, "duration": 0.12890625 }, { "name": "B3", "midi": 59, "time": 97.5, "velocity": 0.3464566929133858, "duration": 0.12890625 }, { "name": "D3", "midi": 50, "time": 97.6640625, "velocity": 0.41732283464566927, "duration": 0.16796875 }, { "name": "G#3", "midi": 56, "time": 97.6640625, "velocity": 0.41732283464566927, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 97.6640625, "velocity": 0.41732283464566927, "duration": 0.16796875 }, { "name": "D3", "midi": 50, "time": 97.83203125, "velocity": 0.4094488188976378, "duration": 0.16796875 }, { "name": "G#3", "midi": 56, "time": 97.83203125, "velocity": 0.4094488188976378, "duration": 0.16796875 }, { "name": "B3", "midi": 59, "time": 97.83203125, "velocity": 0.4094488188976378, "duration": 0.16796875 }, { "name": "C#4", "midi": 61, "time": 98, "velocity": 0.44881889763779526, "duration": 1.5 }, { "name": "C#3", "midi": 49, "time": 98, "velocity": 0.3779527559055118, "duration": 0.1640625 }, { "name": "G#3", "midi": 56, "time": 98, "velocity": 0.3779527559055118, "duration": 0.1640625 }, { "name": "A#3", "midi": 58, "time": 98, "velocity": 0.3779527559055118, "duration": 0.1640625 }, { "name": "C#3", "midi": 49, "time": 98.1640625, "velocity": 0.4015748031496063, "duration": 0.16796875 }, { "name": "G#3", "midi": 56, "time": 98.1640625, "velocity": 0.4015748031496063, "duration": 0.16796875 }, { "name": "A#3", "midi": 58, "time": 98.1640625, "velocity": 0.4015748031496063, "duration": 0.16796875 }, { "name": "E2", "midi": 40, "time": 98.1640625, "velocity": 0.44881889763779526, "duration": 0.08203125 }, { "name": "C#3", "midi": 49, "time": 98.33203125, "velocity": 0.4094488188976378, "duration": 0.16796875 }, { "name": "G#3", "midi": 56, "time": 98.33203125, "velocity": 0.4094488188976378, "duration": 0.16796875 }, { "name": "A#3", "midi": 58, "time": 98.33203125, "velocity": 0.4094488188976378, "duration": 0.16796875 }, { "name": "G#2", "midi": 44, "time": 98.33203125, "velocity": 0.49606299212598426, "duration": 0.08203125 }, { "name": "C#3", "midi": 49, "time": 98.5, "velocity": 0.4094488188976378, "duration": 0.1640625 }, { "name": "G#3", "midi": 56, "time": 98.5, "velocity": 0.4094488188976378, "duration": 0.1640625 }, { "name": "A#3", "midi": 58, "time": 98.5, "velocity": 0.4094488188976378, "duration": 0.1640625 }, { "name": "A#2", "midi": 46, "time": 98.5, "velocity": 0.5039370078740157, "duration": 0.24609375 }, { "name": "C#3", "midi": 49, "time": 98.6640625, "velocity": 0.41732283464566927, "duration": 0.16796875 }, { "name": "G#3", "midi": 56, "time": 98.6640625, "velocity": 0.41732283464566927, "duration": 0.16796875 }, { "name": "A#3", "midi": 58, "time": 98.6640625, "velocity": 0.41732283464566927, "duration": 0.16796875 }, { "name": "C#3", "midi": 49, "time": 98.83203125, "velocity": 0.4015748031496063, "duration": 0.16796875 }, { "name": "G#3", "midi": 56, "time": 98.83203125, "velocity": 0.4015748031496063, "duration": 0.16796875 }, { "name": "A#3", "midi": 58, "time": 98.83203125, "velocity": 0.4015748031496063, "duration": 0.16796875 }, { "name": "C#3", "midi": 49, "time": 99, "velocity": 0.3937007874015748, "duration": 0.1640625 }, { "name": "G3", "midi": 55, "time": 99, "velocity": 0.3937007874015748, "duration": 0.1640625 }, { "name": "A#3", "midi": 58, "time": 99, "velocity": 0.3937007874015748, "duration": 0.1640625 }, { "name": "C#3", "midi": 49, "time": 99.1640625, "velocity": 0.4015748031496063, "duration": 0.16796875 }, { "name": "G3", "midi": 55, "time": 99.1640625, "velocity": 0.4015748031496063, "duration": 0.16796875 }, { "name": "A#3", "midi": 58, "time": 99.1640625, "velocity": 0.4015748031496063, "duration": 0.16796875 }, { "name": "D#2", "midi": 39, "time": 99.1640625, "velocity": 0.4251968503937008, "duration": 0.08203125 }, { "name": "C#3", "midi": 49, "time": 99.33203125, "velocity": 0.3937007874015748, "duration": 0.16796875 }, { "name": "G3", "midi": 55, "time": 99.33203125, "velocity": 0.3937007874015748, "duration": 0.16796875 }, { "name": "A#3", "midi": 58, "time": 99.33203125, "velocity": 0.3937007874015748, "duration": 0.16796875 }, { "name": "G2", "midi": 43, "time": 99.33203125, "velocity": 0.5039370078740157, "duration": 0.08203125 }, { "name": "C#4", "midi": 61, "time": 99.5, "velocity": 0.44881889763779526, "duration": 0.40234375 }, { "name": "C#3", "midi": 49, "time": 99.5, "velocity": 0.3700787401574803, "duration": 0.12890625 }, { "name": "D#3", "midi": 51, "time": 99.5, "velocity": 0.3700787401574803, "duration": 0.12890625 }, { "name": "G3", "midi": 55, "time": 99.5, "velocity": 0.3700787401574803, "duration": 0.12890625 }, { "name": "A#3", "midi": 58, "time": 99.5, "velocity": 0.3700787401574803, "duration": 0.12890625 }, { "name": "A#2", "midi": 46, "time": 99.5, "velocity": 0.5275590551181102, "duration": 0.24609375 }, { "name": "C#3", "midi": 49, "time": 99.6640625, "velocity": 0.4015748031496063, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 99.6640625, "velocity": 0.4015748031496063, "duration": 0.16796875 }, { "name": "G3", "midi": 55, "time": 99.6640625, "velocity": 0.4015748031496063, "duration": 0.16796875 }, { "name": "A#3", "midi": 58, "time": 99.6640625, "velocity": 0.4015748031496063, "duration": 0.16796875 }, { "name": "C#3", "midi": 49, "time": 99.83203125, "velocity": 0.36220472440944884, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 99.83203125, "velocity": 0.36220472440944884, "duration": 0.16796875 }, { "name": "G3", "midi": 55, "time": 99.83203125, "velocity": 0.36220472440944884, "duration": 0.16796875 }, { "name": "A#3", "midi": 58, "time": 99.83203125, "velocity": 0.36220472440944884, "duration": 0.16796875 }, { "name": "C4", "midi": 60, "time": 100, "velocity": 0.44881889763779526, "duration": 1 }, { "name": "C3", "midi": 48, "time": 100, "velocity": 0.3937007874015748, "duration": 0.1640625 }, { "name": "G#1", "midi": 32, "time": 100, "velocity": 0.44881889763779526, "duration": 1 }, { "name": "G#2", "midi": 44, "time": 100, "velocity": 0.44881889763779526, "duration": 1 }, { "name": "D#3", "midi": 51, "time": 100.1640625, "velocity": 0.4881889763779528, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 100.33203125, "velocity": 0.4645669291338583, "duration": 0.16796875 }, { "name": "G#3", "midi": 56, "time": 100.5, "velocity": 0.5433070866141733, "duration": 0.1640625 }, { "name": "D#3", "midi": 51, "time": 100.6640625, "velocity": 0.4566929133858268, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 100.83203125, "velocity": 0.4566929133858268, "duration": 0.16796875 }, { "name": "A#3", "midi": 58, "time": 101, "velocity": 0.47244094488188976, "duration": 1 }, { "name": "G3", "midi": 55, "time": 101, "velocity": 0.5118110236220472, "duration": 0.1640625 }, { "name": "C#3", "midi": 49, "time": 101, "velocity": 0.5039370078740157, "duration": 1 }, { "name": "D#3", "midi": 51, "time": 101.1640625, "velocity": 0.4645669291338583, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 101.33203125, "velocity": 0.49606299212598426, "duration": 0.16796875 }, { "name": "G3", "midi": 55, "time": 101.5, "velocity": 0.47244094488188976, "duration": 0.1640625 }, { "name": "D#3", "midi": 51, "time": 101.6640625, "velocity": 0.4330708661417323, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 101.83203125, "velocity": 0.4645669291338583, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 102, "velocity": 0.5118110236220472, "duration": 1.5 }, { "name": "G#3", "midi": 56, "time": 102, "velocity": 0.47244094488188976, "duration": 0.1640625 }, { "name": "C3", "midi": 48, "time": 102, "velocity": 0.4566929133858268, "duration": 1 }, { "name": "D#3", "midi": 51, "time": 102.1640625, "velocity": 0.41732283464566927, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 102.33203125, "velocity": 0.48031496062992124, "duration": 0.16796875 }, { "name": "G#3", "midi": 56, "time": 102.5, "velocity": 0.5039370078740157, "duration": 0.1640625 }, { "name": "D#3", "midi": 51, "time": 102.6640625, "velocity": 0.4330708661417323, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 102.83203125, "velocity": 0.48031496062992124, "duration": 0.16796875 }, { "name": "A#3", "midi": 58, "time": 103, "velocity": 0.5511811023622047, "duration": 0.1640625 }, { "name": "G2", "midi": 43, "time": 103, "velocity": 0.4094488188976378, "duration": 0.90234375 }, { "name": "D#3", "midi": 51, "time": 103.1640625, "velocity": 0.4566929133858268, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 103.33203125, "velocity": 0.47244094488188976, "duration": 0.16796875 }, { "name": "C#4", "midi": 61, "time": 103.5, "velocity": 0.4645669291338583, "duration": 0.40234375 }, { "name": "A#3", "midi": 58, "time": 103.5, "velocity": 0.5039370078740157, "duration": 0.12890625 }, { "name": "D#3", "midi": 51, "time": 103.6640625, "velocity": 0.4566929133858268, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 103.83203125, "velocity": 0.4645669291338583, "duration": 0.16796875 }, { "name": "C4", "midi": 60, "time": 104, "velocity": 0.41732283464566927, "duration": 0.5 }, { "name": "G#3", "midi": 56, "time": 104, "velocity": 0.5039370078740157, "duration": 0.1640625 }, { "name": "G#2", "midi": 44, "time": 104, "velocity": 0.5196850393700787, "duration": 0.5 }, { "name": "D#3", "midi": 51, "time": 104.1640625, "velocity": 0.44881889763779526, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 104.33203125, "velocity": 0.48031496062992124, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 104.5, "velocity": 0.5039370078740157, "duration": 0.5 }, { "name": "A#3", "midi": 58, "time": 104.5, "velocity": 0.5196850393700787, "duration": 0.1640625 }, { "name": "G2", "midi": 43, "time": 104.5, "velocity": 0.4409448818897638, "duration": 0.5 }, { "name": "D#3", "midi": 51, "time": 104.6640625, "velocity": 0.4645669291338583, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 104.83203125, "velocity": 0.4881889763779528, "duration": 0.16796875 }, { "name": "G#4", "midi": 68, "time": 105, "velocity": 0.5354330708661418, "duration": 0.5 }, { "name": "C4", "midi": 60, "time": 105, "velocity": 0.5826771653543307, "duration": 0.1640625 }, { "name": "F2", "midi": 41, "time": 105, "velocity": 0.48031496062992124, "duration": 0.5 }, { "name": "G#3", "midi": 56, "time": 105.1640625, "velocity": 0.4566929133858268, "duration": 0.16796875 }, { "name": "G#3", "midi": 56, "time": 105.33203125, "velocity": 0.4566929133858268, "duration": 0.16796875 }, { "name": "A#4", "midi": 70, "time": 105.5, "velocity": 0.5196850393700787, "duration": 0.3203125 }, { "name": "D4", "midi": 62, "time": 105.5, "velocity": 0.5275590551181102, "duration": 0.1015625 }, { "name": "F3", "midi": 53, "time": 105.5, "velocity": 0.5275590551181102, "duration": 0.40234375 }, { "name": "G#3", "midi": 56, "time": 105.6640625, "velocity": 0.44881889763779526, "duration": 0.16796875 }, { "name": "G#3", "midi": 56, "time": 105.83203125, "velocity": 0.48031496062992124, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 106, "velocity": 0.41732283464566927, "duration": 1.5 }, { "name": "G3", "midi": 55, "time": 106, "velocity": 0.48031496062992124, "duration": 0.1640625 }, { "name": "D#3", "midi": 51, "time": 106, "velocity": 0.4881889763779528, "duration": 1 }, { "name": "A#3", "midi": 58, "time": 106.1640625, "velocity": 0.4881889763779528, "duration": 0.16796875 }, { "name": "A#3", "midi": 58, "time": 106.33203125, "velocity": 0.4881889763779528, "duration": 0.16796875 }, { "name": "G3", "midi": 55, "time": 106.5, "velocity": 0.44881889763779526, "duration": 0.1640625 }, { "name": "A#3", "midi": 58, "time": 106.6640625, "velocity": 0.49606299212598426, "duration": 0.16796875 }, { "name": "A#3", "midi": 58, "time": 106.83203125, "velocity": 0.48031496062992124, "duration": 0.16796875 }, { "name": "G3", "midi": 55, "time": 107, "velocity": 0.4881889763779528, "duration": 0.1640625 }, { "name": "D#2", "midi": 39, "time": 107, "velocity": 0.4015748031496063, "duration": 1 }, { "name": "A#3", "midi": 58, "time": 107.1640625, "velocity": 0.4881889763779528, "duration": 0.16796875 }, { "name": "A#3", "midi": 58, "time": 107.33203125, "velocity": 0.47244094488188976, "duration": 0.16796875 }, { "name": "E4", "midi": 64, "time": 107.5, "velocity": 0.49606299212598426, "duration": 0.5 }, { "name": "G3", "midi": 55, "time": 107.5, "velocity": 0.4645669291338583, "duration": 0.1640625 }, { "name": "A#3", "midi": 58, "time": 107.6640625, "velocity": 0.47244094488188976, "duration": 0.16796875 }, { "name": "A#3", "midi": 58, "time": 107.83203125, "velocity": 0.48031496062992124, "duration": 0.16796875 }, { "name": "F4", "midi": 65, "time": 108, "velocity": 0.49606299212598426, "duration": 0.90234375 }, { "name": "G3", "midi": 55, "time": 108, "velocity": 0.4409448818897638, "duration": 0.12890625 }, { "name": "C#2", "midi": 37, "time": 108, "velocity": 0.4409448818897638, "duration": 1 }, { "name": "A#3", "midi": 58, "time": 108.1640625, "velocity": 0.49606299212598426, "duration": 0.16796875 }, { "name": "A#3", "midi": 58, "time": 108.33203125, "velocity": 0.47244094488188976, "duration": 0.16796875 }, { "name": "G3", "midi": 55, "time": 108.5, "velocity": 0.4251968503937008, "duration": 0.1640625 }, { "name": "A#3", "midi": 58, "time": 108.6640625, "velocity": 0.5118110236220472, "duration": 0.16796875 }, { "name": "A#3", "midi": 58, "time": 108.83203125, "velocity": 0.4881889763779528, "duration": 0.16796875 }, { "name": "A#3", "midi": 58, "time": 109, "velocity": 0.4330708661417323, "duration": 0.75 }, { "name": "G3", "midi": 55, "time": 109, "velocity": 0.4566929133858268, "duration": 0.1640625 }, { "name": "C#3", "midi": 49, "time": 109, "velocity": 0.5118110236220472, "duration": 0.90234375 }, { "name": "D#3", "midi": 51, "time": 109.1640625, "velocity": 0.44881889763779526, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 109.33203125, "velocity": 0.44881889763779526, "duration": 0.16796875 }, { "name": "G3", "midi": 55, "time": 109.5, "velocity": 0.49606299212598426, "duration": 0.1640625 }, { "name": "D#3", "midi": 51, "time": 109.6640625, "velocity": 0.4251968503937008, "duration": 0.16796875 }, { "name": "C4", "midi": 60, "time": 109.75, "velocity": 0.5118110236220472, "duration": 0.125 }, { "name": "D#3", "midi": 51, "time": 109.83203125, "velocity": 0.44881889763779526, "duration": 0.1328125 }, { "name": "C#4", "midi": 61, "time": 109.875, "velocity": 0.49606299212598426, "duration": 0.09765625 }, { "name": "D#4", "midi": 63, "time": 110, "velocity": 0.48031496062992124, "duration": 1 }, { "name": "G#3", "midi": 56, "time": 110, "velocity": 0.5196850393700787, "duration": 0.1640625 }, { "name": "C3", "midi": 48, "time": 110, "velocity": 0.5039370078740157, "duration": 1 }, { "name": "D#3", "midi": 51, "time": 110.1640625, "velocity": 0.47244094488188976, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 110.33203125, "velocity": 0.48031496062992124, "duration": 0.16796875 }, { "name": "G#3", "midi": 56, "time": 110.5, "velocity": 0.5039370078740157, "duration": 0.1640625 }, { "name": "D#3", "midi": 51, "time": 110.6640625, "velocity": 0.4330708661417323, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 110.83203125, "velocity": 0.47244094488188976, "duration": 0.16796875 }, { "name": "A3", "midi": 57, "time": 111, "velocity": 0.4330708661417323, "duration": 1 }, { "name": "D#3", "midi": 51, "time": 111, "velocity": 0.4409448818897638, "duration": 0.1640625 }, { "name": "F2", "midi": 41, "time": 111, "velocity": 0.3937007874015748, "duration": 1 }, { "name": "C3", "midi": 48, "time": 111.1640625, "velocity": 0.49606299212598426, "duration": 0.16796875 }, { "name": "C3", "midi": 48, "time": 111.33203125, "velocity": 0.4566929133858268, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 111.5, "velocity": 0.4645669291338583, "duration": 0.1640625 }, { "name": "C3", "midi": 48, "time": 111.6640625, "velocity": 0.4645669291338583, "duration": 0.16796875 }, { "name": "C3", "midi": 48, "time": 111.83203125, "velocity": 0.4881889763779528, "duration": 0.16796875 }, { "name": "C#4", "midi": 61, "time": 112, "velocity": 0.5118110236220472, "duration": 0.90234375 }, { "name": "F3", "midi": 53, "time": 112, "velocity": 0.4881889763779528, "duration": 0.12890625 }, { "name": "A#1", "midi": 34, "time": 112, "velocity": 0.4094488188976378, "duration": 1 }, { "name": "C#3", "midi": 49, "time": 112.1640625, "velocity": 0.4409448818897638, "duration": 0.16796875 }, { "name": "C#3", "midi": 49, "time": 112.33203125, "velocity": 0.5039370078740157, "duration": 0.16796875 }, { "name": "F3", "midi": 53, "time": 112.5, "velocity": 0.5275590551181102, "duration": 0.1640625 }, { "name": "C#3", "midi": 49, "time": 112.6640625, "velocity": 0.4881889763779528, "duration": 0.16796875 }, { "name": "C#3", "midi": 49, "time": 112.83203125, "velocity": 0.5039370078740157, "duration": 0.16796875 }, { "name": "C#4", "midi": 61, "time": 113, "velocity": 0.5196850393700787, "duration": 0.1640625 }, { "name": "G3", "midi": 55, "time": 113, "velocity": 0.5039370078740157, "duration": 0.1640625 }, { "name": "D#2", "midi": 39, "time": 113, "velocity": 0.5039370078740157, "duration": 0.90234375 }, { "name": "C4", "midi": 60, "time": 113.1640625, "velocity": 0.44881889763779526, "duration": 0.1328125 }, { "name": "C#3", "midi": 49, "time": 113.1640625, "velocity": 0.44881889763779526, "duration": 0.1328125 }, { "name": "A#3", "midi": 58, "time": 113.33203125, "velocity": 0.44881889763779526, "duration": 0.16796875 }, { "name": "C#3", "midi": 49, "time": 113.33203125, "velocity": 0.4645669291338583, "duration": 0.16796875 }, { "name": "A#3", "midi": 58, "time": 113.5, "velocity": 0.47244094488188976, "duration": 0.12890625 }, { "name": "C#3", "midi": 49, "time": 113.5, "velocity": 0.4645669291338583, "duration": 0.12890625 }, { "name": "G#3", "midi": 56, "time": 113.6640625, "velocity": 0.4409448818897638, "duration": 0.1328125 }, { "name": "C#3", "midi": 49, "time": 113.6640625, "velocity": 0.48031496062992124, "duration": 0.1328125 }, { "name": "G3", "midi": 55, "time": 113.83203125, "velocity": 0.4645669291338583, "duration": 0.16796875 }, { "name": "C#3", "midi": 49, "time": 113.83203125, "velocity": 0.48031496062992124, "duration": 0.16796875 }, { "name": "G3", "midi": 55, "time": 114, "velocity": 0.4645669291338583, "duration": 0.90234375 }, { "name": "A#3", "midi": 58, "time": 114, "velocity": 0.4645669291338583, "duration": 0.90234375 }, { "name": "C#3", "midi": 49, "time": 114, "velocity": 0.47244094488188976, "duration": 0.1640625 }, { "name": "G#1", "midi": 32, "time": 114, "velocity": 0.4566929133858268, "duration": 0.5 }, { "name": "D#3", "midi": 51, "time": 114.1640625, "velocity": 0.4881889763779528, "duration": 0.1328125 }, { "name": "D#3", "midi": 51, "time": 114.33203125, "velocity": 0.47244094488188976, "duration": 0.16796875 }, { "name": "C#3", "midi": 49, "time": 114.5, "velocity": 0.5118110236220472, "duration": 0.1640625 }, { "name": "G#2", "midi": 44, "time": 114.5, "velocity": 0.5118110236220472, "duration": 0.5 }, { "name": "D#3", "midi": 51, "time": 114.6640625, "velocity": 0.5275590551181102, "duration": 0.1328125 }, { "name": "D#3", "midi": 51, "time": 114.83203125, "velocity": 0.49606299212598426, "duration": 0.16796875 }, { "name": "G#3", "midi": 56, "time": 115, "velocity": 0.4881889763779528, "duration": 0.40234375 }, { "name": "C3", "midi": 48, "time": 115, "velocity": 0.48031496062992124, "duration": 0.12890625 }, { "name": "G#1", "midi": 32, "time": 115, "velocity": 0.4251968503937008, "duration": 0.5 }, { "name": "D#3", "midi": 51, "time": 115.1640625, "velocity": 0.5196850393700787, "duration": 0.08203125 }, { "name": "G#3", "midi": 56, "time": 115.33203125, "velocity": 0.4881889763779528, "duration": 0.08203125 }, { "name": "C4", "midi": 60, "time": 115.5, "velocity": 0.5039370078740157, "duration": 0.078125 }, { "name": "D#4", "midi": 63, "time": 115.6640625, "velocity": 0.48031496062992124, "duration": 0.08203125 }, { "name": "G#4", "midi": 68, "time": 115.83203125, "velocity": 0.5433070866141733, "duration": 0.08203125 }, { "name": "C4", "midi": 60, "time": 116, "velocity": 0.5118110236220472, "duration": 0.1640625 }, { "name": "G#3", "midi": 56, "time": 116, "velocity": 0.4330708661417323, "duration": 0.1640625 }, { "name": "C5", "midi": 72, "time": 116, "velocity": 0.41732283464566927, "duration": 1 }, { "name": "G#2", "midi": 44, "time": 116, "velocity": 0.4409448818897638, "duration": 1 }, { "name": "D#4", "midi": 63, "time": 116.1640625, "velocity": 0.5354330708661418, "duration": 0.1328125 }, { "name": "D#3", "midi": 51, "time": 116.1640625, "velocity": 0.4251968503937008, "duration": 0.1328125 }, { "name": "D#4", "midi": 63, "time": 116.33203125, "velocity": 0.49606299212598426, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 116.33203125, "velocity": 0.4881889763779528, "duration": 0.16796875 }, { "name": "C4", "midi": 60, "time": 116.5, "velocity": 0.41732283464566927, "duration": 0.1640625 }, { "name": "G#3", "midi": 56, "time": 116.5, "velocity": 0.49606299212598426, "duration": 0.1640625 }, { "name": "D#4", "midi": 63, "time": 116.6640625, "velocity": 0.5118110236220472, "duration": 0.1328125 }, { "name": "D#3", "midi": 51, "time": 116.6640625, "velocity": 0.4566929133858268, "duration": 0.1328125 }, { "name": "D#4", "midi": 63, "time": 116.83203125, "velocity": 0.5196850393700787, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 116.83203125, "velocity": 0.4645669291338583, "duration": 0.16796875 }, { "name": "A#3", "midi": 58, "time": 117, "velocity": 0.44881889763779526, "duration": 0.1640625 }, { "name": "G3", "midi": 55, "time": 117, "velocity": 0.5039370078740157, "duration": 0.1640625 }, { "name": "A#4", "midi": 70, "time": 117, "velocity": 0.4409448818897638, "duration": 0.70703125 }, { "name": "C#3", "midi": 49, "time": 117, "velocity": 0.5196850393700787, "duration": 0.70703125 }, { "name": "D#4", "midi": 63, "time": 117.1640625, "velocity": 0.5433070866141733, "duration": 0.1328125 }, { "name": "D#3", "midi": 51, "time": 117.1640625, "velocity": 0.44881889763779526, "duration": 0.1328125 }, { "name": "D#4", "midi": 63, "time": 117.33203125, "velocity": 0.5275590551181102, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 117.33203125, "velocity": 0.4645669291338583, "duration": 0.16796875 }, { "name": "A#3", "midi": 58, "time": 117.5, "velocity": 0.48031496062992124, "duration": 0.1640625 }, { "name": "G3", "midi": 55, "time": 117.5, "velocity": 0.5275590551181102, "duration": 0.1640625 }, { "name": "D#4", "midi": 63, "time": 117.6640625, "velocity": 0.5669291338582677, "duration": 0.1328125 }, { "name": "D#3", "midi": 51, "time": 117.6640625, "velocity": 0.4566929133858268, "duration": 0.1328125 }, { "name": "D#4", "midi": 63, "time": 117.83203125, "velocity": 0.5433070866141733, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 117.83203125, "velocity": 0.44881889763779526, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 118, "velocity": 0.4566929133858268, "duration": 0.1640625 }, { "name": "G#3", "midi": 56, "time": 118, "velocity": 0.5039370078740157, "duration": 0.1640625 }, { "name": "D#5", "midi": 75, "time": 118, "velocity": 0.5196850393700787, "duration": 1.40234375 }, { "name": "C3", "midi": 48, "time": 118, "velocity": 0.4566929133858268, "duration": 0.90234375 }, { "name": "G#4", "midi": 68, "time": 118.1640625, "velocity": 0.5669291338582677, "duration": 0.1328125 }, { "name": "D#3", "midi": 51, "time": 118.1640625, "velocity": 0.4409448818897638, "duration": 0.1328125 }, { "name": "G#4", "midi": 68, "time": 118.33203125, "velocity": 0.5039370078740157, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 118.33203125, "velocity": 0.4881889763779528, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 118.5, "velocity": 0.4330708661417323, "duration": 0.1640625 }, { "name": "G#3", "midi": 56, "time": 118.5, "velocity": 0.5118110236220472, "duration": 0.1640625 }, { "name": "G#4", "midi": 68, "time": 118.6640625, "velocity": 0.5196850393700787, "duration": 0.1328125 }, { "name": "D#3", "midi": 51, "time": 118.6640625, "velocity": 0.4015748031496063, "duration": 0.1328125 }, { "name": "G#4", "midi": 68, "time": 118.83203125, "velocity": 0.48031496062992124, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 118.83203125, "velocity": 0.49606299212598426, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 119, "velocity": 0.4251968503937008, "duration": 0.1640625 }, { "name": "G3", "midi": 55, "time": 119, "velocity": 0.5118110236220472, "duration": 0.1640625 }, { "name": "G2", "midi": 43, "time": 119, "velocity": 0.44881889763779526, "duration": 0.90234375 }, { "name": "A#4", "midi": 70, "time": 119.1640625, "velocity": 0.5433070866141733, "duration": 0.1328125 }, { "name": "D#3", "midi": 51, "time": 119.1640625, "velocity": 0.4330708661417323, "duration": 0.1328125 }, { "name": "A#4", "midi": 70, "time": 119.33203125, "velocity": 0.4645669291338583, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 119.33203125, "velocity": 0.5118110236220472, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 119.5, "velocity": 0.3779527559055118, "duration": 0.12890625 }, { "name": "G3", "midi": 55, "time": 119.5, "velocity": 0.5275590551181102, "duration": 0.12890625 }, { "name": "C#5", "midi": 73, "time": 119.5, "velocity": 0.41732283464566927, "duration": 0.40234375 }, { "name": "A#4", "midi": 70, "time": 119.6640625, "velocity": 0.5354330708661418, "duration": 0.1328125 }, { "name": "D#3", "midi": 51, "time": 119.6640625, "velocity": 0.47244094488188976, "duration": 0.1328125 }, { "name": "A#4", "midi": 70, "time": 119.83203125, "velocity": 0.5275590551181102, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 119.83203125, "velocity": 0.4566929133858268, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 120, "velocity": 0.3779527559055118, "duration": 0.1640625 }, { "name": "G#3", "midi": 56, "time": 120, "velocity": 0.4881889763779528, "duration": 0.1640625 }, { "name": "C5", "midi": 72, "time": 120, "velocity": 0.4409448818897638, "duration": 0.5 }, { "name": "G#2", "midi": 44, "time": 120, "velocity": 0.4645669291338583, "duration": 0.5 }, { "name": "G#4", "midi": 68, "time": 120.1640625, "velocity": 0.5433070866141733, "duration": 0.1328125 }, { "name": "D#3", "midi": 51, "time": 120.1640625, "velocity": 0.4409448818897638, "duration": 0.1328125 }, { "name": "G#4", "midi": 68, "time": 120.33203125, "velocity": 0.4881889763779528, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 120.33203125, "velocity": 0.44881889763779526, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 120.5, "velocity": 0.3858267716535433, "duration": 0.1640625 }, { "name": "G3", "midi": 55, "time": 120.5, "velocity": 0.5118110236220472, "duration": 0.1640625 }, { "name": "D#5", "midi": 75, "time": 120.5, "velocity": 0.5196850393700787, "duration": 0.40234375 }, { "name": "G2", "midi": 43, "time": 120.5, "velocity": 0.44881889763779526, "duration": 0.40234375 }, { "name": "A#4", "midi": 70, "time": 120.6640625, "velocity": 0.5669291338582677, "duration": 0.1328125 }, { "name": "D#3", "midi": 51, "time": 120.6640625, "velocity": 0.4409448818897638, "duration": 0.1328125 }, { "name": "A#4", "midi": 70, "time": 120.83203125, "velocity": 0.47244094488188976, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 120.83203125, "velocity": 0.4645669291338583, "duration": 0.16796875 }, { "name": "G#4", "midi": 68, "time": 121, "velocity": 0.44881889763779526, "duration": 0.1640625 }, { "name": "F3", "midi": 53, "time": 121, "velocity": 0.5118110236220472, "duration": 0.1640625 }, { "name": "G#5", "midi": 80, "time": 121, "velocity": 0.5511811023622047, "duration": 0.40234375 }, { "name": "F2", "midi": 41, "time": 121, "velocity": 0.4566929133858268, "duration": 0.40234375 }, { "name": "C5", "midi": 72, "time": 121.1640625, "velocity": 0.5275590551181102, "duration": 0.1328125 }, { "name": "G#2", "midi": 44, "time": 121.1640625, "velocity": 0.4330708661417323, "duration": 0.1328125 }, { "name": "C5", "midi": 72, "time": 121.33203125, "velocity": 0.49606299212598426, "duration": 0.16796875 }, { "name": "G#2", "midi": 44, "time": 121.33203125, "velocity": 0.4566929133858268, "duration": 0.16796875 }, { "name": "G#4", "midi": 68, "time": 121.5, "velocity": 0.4330708661417323, "duration": 0.12890625 }, { "name": "F3", "midi": 53, "time": 121.5, "velocity": 0.5275590551181102, "duration": 0.12890625 }, { "name": "A#5", "midi": 82, "time": 121.5, "velocity": 0.49606299212598426, "duration": 0.25390625 }, { "name": "F2", "midi": 41, "time": 121.5, "velocity": 0.48031496062992124, "duration": 0.25390625 }, { "name": "D5", "midi": 74, "time": 121.6640625, "velocity": 0.5511811023622047, "duration": 0.1328125 }, { "name": "G#2", "midi": 44, "time": 121.6640625, "velocity": 0.4251968503937008, "duration": 0.1328125 }, { "name": "D5", "midi": 74, "time": 121.83203125, "velocity": 0.48031496062992124, "duration": 0.16796875 }, { "name": "G#2", "midi": 44, "time": 121.83203125, "velocity": 0.4330708661417323, "duration": 0.16796875 }, { "name": "D#5", "midi": 75, "time": 122, "velocity": 0.47244094488188976, "duration": 1.40234375 }, { "name": "G4", "midi": 67, "time": 122, "velocity": 0.6535433070866141, "duration": 0.1640625 }, { "name": "D#2", "midi": 39, "time": 122, "velocity": 0.41732283464566927, "duration": 0.078125 }, { "name": "A#4", "midi": 70, "time": 122.1640625, "velocity": 0.5354330708661418, "duration": 0.1328125 }, { "name": "G2", "midi": 43, "time": 122.1640625, "velocity": 0.5196850393700787, "duration": 0.08203125 }, { "name": "A#4", "midi": 70, "time": 122.33203125, "velocity": 0.5118110236220472, "duration": 0.16796875 }, { "name": "A#2", "midi": 46, "time": 122.33203125, "velocity": 0.44881889763779526, "duration": 0.08203125 }, { "name": "G4", "midi": 67, "time": 122.5, "velocity": 0.4251968503937008, "duration": 0.1640625 }, { "name": "D#3", "midi": 51, "time": 122.5, "velocity": 0.5039370078740157, "duration": 0.078125 }, { "name": "A#4", "midi": 70, "time": 122.6640625, "velocity": 0.5118110236220472, "duration": 0.1328125 }, { "name": "G3", "midi": 55, "time": 122.6640625, "velocity": 0.4881889763779528, "duration": 0.08203125 }, { "name": "A#4", "midi": 70, "time": 122.83203125, "velocity": 0.48031496062992124, "duration": 0.16796875 }, { "name": "A#3", "midi": 58, "time": 122.83203125, "velocity": 0.5354330708661418, "duration": 0.08203125 }, { "name": "G4", "midi": 67, "time": 123, "velocity": 0.44881889763779526, "duration": 0.1640625 }, { "name": "D#4", "midi": 63, "time": 123, "velocity": 0.5590551181102362, "duration": 1 }, { "name": "A#4", "midi": 70, "time": 123.1640625, "velocity": 0.5196850393700787, "duration": 0.1328125 }, { "name": "A#4", "midi": 70, "time": 123.33203125, "velocity": 0.48031496062992124, "duration": 0.16796875 }, { "name": "E5", "midi": 76, "time": 123.5, "velocity": 0.48031496062992124, "duration": 0.40234375 }, { "name": "G4", "midi": 67, "time": 123.5, "velocity": 0.3937007874015748, "duration": 0.1640625 }, { "name": "A#4", "midi": 70, "time": 123.6640625, "velocity": 0.5275590551181102, "duration": 0.1328125 }, { "name": "A#4", "midi": 70, "time": 123.83203125, "velocity": 0.47244094488188976, "duration": 0.16796875 }, { "name": "F5", "midi": 77, "time": 124, "velocity": 0.48031496062992124, "duration": 0.90234375 }, { "name": "G4", "midi": 67, "time": 124, "velocity": 0.41732283464566927, "duration": 0.1640625 }, { "name": "C#2", "midi": 37, "time": 124, "velocity": 0.3937007874015748, "duration": 0.078125 }, { "name": "A#4", "midi": 70, "time": 124.1640625, "velocity": 0.5433070866141733, "duration": 0.1328125 }, { "name": "G2", "midi": 43, "time": 124.1640625, "velocity": 0.5196850393700787, "duration": 0.08203125 }, { "name": "A#4", "midi": 70, "time": 124.33203125, "velocity": 0.4566929133858268, "duration": 0.16796875 }, { "name": "A#2", "midi": 46, "time": 124.33203125, "velocity": 0.5118110236220472, "duration": 0.08203125 }, { "name": "G4", "midi": 67, "time": 124.5, "velocity": 0.41732283464566927, "duration": 0.1640625 }, { "name": "C#3", "midi": 49, "time": 124.5, "velocity": 0.4881889763779528, "duration": 0.078125 }, { "name": "A#4", "midi": 70, "time": 124.6640625, "velocity": 0.5275590551181102, "duration": 0.1328125 }, { "name": "G3", "midi": 55, "time": 124.6640625, "velocity": 0.5275590551181102, "duration": 0.08203125 }, { "name": "A#4", "midi": 70, "time": 124.83203125, "velocity": 0.49606299212598426, "duration": 0.16796875 }, { "name": "A#3", "midi": 58, "time": 124.83203125, "velocity": 0.49606299212598426, "duration": 0.08203125 }, { "name": "A#4", "midi": 70, "time": 125, "velocity": 0.3700787401574803, "duration": 0.65234375 }, { "name": "G4", "midi": 67, "time": 125, "velocity": 0.4566929133858268, "duration": 0.1640625 }, { "name": "C#4", "midi": 61, "time": 125, "velocity": 0.5196850393700787, "duration": 1 }, { "name": "D#4", "midi": 63, "time": 125.1640625, "velocity": 0.4094488188976378, "duration": 0.1328125 }, { "name": "D#4", "midi": 63, "time": 125.33203125, "velocity": 0.4409448818897638, "duration": 0.16796875 }, { "name": "G4", "midi": 67, "time": 125.5, "velocity": 0.5039370078740157, "duration": 0.1640625 }, { "name": "D#4", "midi": 63, "time": 125.6640625, "velocity": 0.4251968503937008, "duration": 0.1328125 }, { "name": "C5", "midi": 72, "time": 125.75, "velocity": 0.47244094488188976, "duration": 0.125 }, { "name": "D#4", "midi": 63, "time": 125.83203125, "velocity": 0.48031496062992124, "duration": 0.1328125 }, { "name": "C#5", "midi": 73, "time": 125.875, "velocity": 0.4881889763779528, "duration": 0.09765625 }, { "name": "D#5", "midi": 75, "time": 126, "velocity": 0.5118110236220472, "duration": 0.90234375 }, { "name": "G#4", "midi": 68, "time": 126, "velocity": 0.5433070866141733, "duration": 0.1640625 }, { "name": "C4", "midi": 60, "time": 126, "velocity": 0.49606299212598426, "duration": 1 }, { "name": "D#4", "midi": 63, "time": 126.1640625, "velocity": 0.4330708661417323, "duration": 0.1328125 }, { "name": "D#4", "midi": 63, "time": 126.33203125, "velocity": 0.47244094488188976, "duration": 0.16796875 }, { "name": "G#4", "midi": 68, "time": 126.5, "velocity": 0.5905511811023622, "duration": 0.1640625 }, { "name": "D#4", "midi": 63, "time": 126.6640625, "velocity": 0.4015748031496063, "duration": 0.1328125 }, { "name": "D#4", "midi": 63, "time": 126.83203125, "velocity": 0.44881889763779526, "duration": 0.16796875 }, { "name": "A4", "midi": 69, "time": 127, "velocity": 0.4094488188976378, "duration": 0.90234375 }, { "name": "D#4", "midi": 63, "time": 127, "velocity": 0.49606299212598426, "duration": 0.1640625 }, { "name": "F3", "midi": 53, "time": 127, "velocity": 0.41732283464566927, "duration": 1 }, { "name": "C4", "midi": 60, "time": 127.1640625, "velocity": 0.4015748031496063, "duration": 0.1328125 }, { "name": "C4", "midi": 60, "time": 127.33203125, "velocity": 0.47244094488188976, "duration": 0.16796875 }, { "name": "D#4", "midi": 63, "time": 127.5, "velocity": 0.5039370078740157, "duration": 0.1640625 }, { "name": "C4", "midi": 60, "time": 127.6640625, "velocity": 0.4645669291338583, "duration": 0.1328125 }, { "name": "C4", "midi": 60, "time": 127.83203125, "velocity": 0.4566929133858268, "duration": 0.16796875 }, { "name": "C#5", "midi": 73, "time": 128, "velocity": 0.5354330708661418, "duration": 0.8046875 }, { "name": "F4", "midi": 65, "time": 128, "velocity": 0.5196850393700787, "duration": 0.12890625 }, { "name": "A#2", "midi": 46, "time": 128, "velocity": 0.44881889763779526, "duration": 0.90234375 }, { "name": "C#4", "midi": 61, "time": 128.1640625, "velocity": 0.4015748031496063, "duration": 0.1328125 }, { "name": "C#4", "midi": 61, "time": 128.33203125, "velocity": 0.4645669291338583, "duration": 0.16796875 }, { "name": "F4", "midi": 65, "time": 128.5, "velocity": 0.5511811023622047, "duration": 0.1640625 }, { "name": "C#4", "midi": 61, "time": 128.6640625, "velocity": 0.41732283464566927, "duration": 0.1328125 }, { "name": "C#4", "midi": 61, "time": 128.83203125, "velocity": 0.48031496062992124, "duration": 0.16796875 }, { "name": "C#5", "midi": 73, "time": 129, "velocity": 0.5039370078740157, "duration": 0.1640625 }, { "name": "G4", "midi": 67, "time": 129, "velocity": 0.5275590551181102, "duration": 0.1640625 }, { "name": "A#2", "midi": 46, "time": 129, "velocity": 0.47244094488188976, "duration": 0.1640625 }, { "name": "D#2", "midi": 39, "time": 129, "velocity": 0.4881889763779528, "duration": 0.5 }, { "name": "C5", "midi": 72, "time": 129.1640625, "velocity": 0.47244094488188976, "duration": 0.10546875 }, { "name": "C#4", "midi": 61, "time": 129.1640625, "velocity": 0.4015748031496063, "duration": 0.10546875 }, { "name": "D#3", "midi": 51, "time": 129.1640625, "velocity": 0.5039370078740157, "duration": 0.16796875 }, { "name": "A#4", "midi": 70, "time": 129.33203125, "velocity": 0.4409448818897638, "duration": 0.16796875 }, { "name": "C#4", "midi": 61, "time": 129.33203125, "velocity": 0.4645669291338583, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 129.33203125, "velocity": 0.5039370078740157, "duration": 0.16796875 }, { "name": "A#4", "midi": 70, "time": 129.5, "velocity": 0.47244094488188976, "duration": 0.1640625 }, { "name": "C#4", "midi": 61, "time": 129.5, "velocity": 0.48031496062992124, "duration": 0.1640625 }, { "name": "D#2", "midi": 39, "time": 129.5, "velocity": 0.4251968503937008, "duration": 0.1640625 }, { "name": "D#2", "midi": 39, "time": 129.5, "velocity": 0.48031496062992124, "duration": 0.5 }, { "name": "G#4", "midi": 68, "time": 129.6640625, "velocity": 0.4409448818897638, "duration": 0.10546875 }, { "name": "C#4", "midi": 61, "time": 129.6640625, "velocity": 0.4645669291338583, "duration": 0.10546875 }, { "name": "D#3", "midi": 51, "time": 129.6640625, "velocity": 0.5590551181102362, "duration": 0.16796875 }, { "name": "G4", "midi": 67, "time": 129.83203125, "velocity": 0.44881889763779526, "duration": 0.16796875 }, { "name": "C#4", "midi": 61, "time": 129.83203125, "velocity": 0.48031496062992124, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 129.83203125, "velocity": 0.48031496062992124, "duration": 0.16796875 }, { "name": "G#4", "midi": 68, "time": 130, "velocity": 0.47244094488188976, "duration": 0.40234375 }, { "name": "C4", "midi": 60, "time": 130, "velocity": 0.4330708661417323, "duration": 0.40234375 }, { "name": "G#2", "midi": 44, "time": 130, "velocity": 0.4566929133858268, "duration": 0.1640625 }, { "name": "D#3", "midi": 51, "time": 130.1640625, "velocity": 0.4251968503937008, "duration": 0.08203125 }, { "name": "D#3", "midi": 51, "time": 130.33203125, "velocity": 0.3937007874015748, "duration": 0.0625 }, { "name": "D#3", "midi": 51, "time": 130.5, "velocity": 0.3779527559055118, "duration": 0.078125 }, { "name": "D#3", "midi": 51, "time": 130.6640625, "velocity": 0.4094488188976378, "duration": 0.0625 }, { "name": "D#3", "midi": 51, "time": 130.83203125, "velocity": 0.4251968503937008, "duration": 0.08203125 }, { "name": "D#3", "midi": 51, "time": 131, "velocity": 0.4251968503937008, "duration": 0.1640625 }, { "name": "D#3", "midi": 51, "time": 131.1640625, "velocity": 0.4094488188976378, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 131.33203125, "velocity": 0.4015748031496063, "duration": 0.16796875 }, { "name": "D#5", "midi": 75, "time": 131.5, "velocity": 0.33070866141732286, "duration": 0.375 }, { "name": "D#3", "midi": 51, "time": 131.5, "velocity": 0.41732283464566927, "duration": 0.1640625 }, { "name": "D#3", "midi": 51, "time": 131.6640625, "velocity": 0.36220472440944884, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 131.83203125, "velocity": 0.4094488188976378, "duration": 0.16796875 }, { "name": "E5", "midi": 76, "time": 131.875, "velocity": 0.4409448818897638, "duration": 0.125 }, { "name": "F5", "midi": 77, "time": 132, "velocity": 0.4094488188976378, "duration": 0.6640625 }, { "name": "D#2", "midi": 39, "time": 132, "velocity": 0.3700787401574803, "duration": 0.1640625 }, { "name": "C#3", "midi": 49, "time": 132, "velocity": 0.3700787401574803, "duration": 0.1640625 }, { "name": "D#3", "midi": 51, "time": 132, "velocity": 0.3700787401574803, "duration": 0.1640625 }, { "name": "D#2", "midi": 39, "time": 132.1640625, "velocity": 0.47244094488188976, "duration": 0.16796875 }, { "name": "C#3", "midi": 49, "time": 132.1640625, "velocity": 0.47244094488188976, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 132.1640625, "velocity": 0.47244094488188976, "duration": 0.16796875 }, { "name": "D#2", "midi": 39, "time": 132.33203125, "velocity": 0.5275590551181102, "duration": 0.16796875 }, { "name": "C#3", "midi": 49, "time": 132.33203125, "velocity": 0.5275590551181102, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 132.33203125, "velocity": 0.5275590551181102, "duration": 0.16796875 }, { "name": "D#2", "midi": 39, "time": 132.5, "velocity": 0.6062992125984252, "duration": 0.1640625 }, { "name": "C#3", "midi": 49, "time": 132.5, "velocity": 0.6062992125984252, "duration": 0.1640625 }, { "name": "D#3", "midi": 51, "time": 132.5, "velocity": 0.6062992125984252, "duration": 0.1640625 }, { "name": "D#5", "midi": 75, "time": 132.6640625, "velocity": 0.6692913385826772, "duration": 0.1328125 }, { "name": "D#2", "midi": 39, "time": 132.6640625, "velocity": 0.6850393700787402, "duration": 0.16796875 }, { "name": "C#3", "midi": 49, "time": 132.6640625, "velocity": 0.6850393700787402, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 132.6640625, "velocity": 0.6850393700787402, "duration": 0.16796875 }, { "name": "C#5", "midi": 73, "time": 132.83203125, "velocity": 0.7165354330708661, "duration": 0.08203125 }, { "name": "D#2", "midi": 39, "time": 132.83203125, "velocity": 0.7559055118110236, "duration": 0.16796875 }, { "name": "C#3", "midi": 49, "time": 132.83203125, "velocity": 0.7559055118110236, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 132.83203125, "velocity": 0.7559055118110236, "duration": 0.16796875 }, { "name": "C5", "midi": 72, "time": 133, "velocity": 0.6929133858267716, "duration": 0.078125 }, { "name": "D#2", "midi": 39, "time": 133, "velocity": 0.7480314960629921, "duration": 0.1640625 }, { "name": "C#3", "midi": 49, "time": 133, "velocity": 0.7480314960629921, "duration": 0.1640625 }, { "name": "D#3", "midi": 51, "time": 133, "velocity": 0.7480314960629921, "duration": 0.1640625 }, { "name": "A#4", "midi": 70, "time": 133.1640625, "velocity": 0.7086614173228346, "duration": 0.08203125 }, { "name": "D#2", "midi": 39, "time": 133.1640625, "velocity": 0.7401574803149606, "duration": 0.16796875 }, { "name": "C#3", "midi": 49, "time": 133.1640625, "velocity": 0.7401574803149606, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 133.1640625, "velocity": 0.7401574803149606, "duration": 0.16796875 }, { "name": "G#4", "midi": 68, "time": 133.33203125, "velocity": 0.5826771653543307, "duration": 0.0625 }, { "name": "D#2", "midi": 39, "time": 133.33203125, "velocity": 0.6141732283464567, "duration": 0.16796875 }, { "name": "C#3", "midi": 49, "time": 133.33203125, "velocity": 0.6141732283464567, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 133.33203125, "velocity": 0.6141732283464567, "duration": 0.16796875 }, { "name": "G4", "midi": 67, "time": 133.5, "velocity": 0.5196850393700787, "duration": 0.1640625 }, { "name": "D#2", "midi": 39, "time": 133.5, "velocity": 0.5275590551181102, "duration": 0.1640625 }, { "name": "C#3", "midi": 49, "time": 133.5, "velocity": 0.5275590551181102, "duration": 0.1640625 }, { "name": "D#3", "midi": 51, "time": 133.5, "velocity": 0.5275590551181102, "duration": 0.1640625 }, { "name": "C#5", "midi": 73, "time": 133.6640625, "velocity": 0.48031496062992124, "duration": 0.16796875 }, { "name": "D#2", "midi": 39, "time": 133.6640625, "velocity": 0.4645669291338583, "duration": 0.16796875 }, { "name": "C#3", "midi": 49, "time": 133.6640625, "velocity": 0.4645669291338583, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 133.6640625, "velocity": 0.4645669291338583, "duration": 0.16796875 }, { "name": "G4", "midi": 67, "time": 133.83203125, "velocity": 0.3464566929133858, "duration": 0.1328125 }, { "name": "D#2", "midi": 39, "time": 133.83203125, "velocity": 0.36220472440944884, "duration": 0.16796875 }, { "name": "C#3", "midi": 49, "time": 133.83203125, "velocity": 0.36220472440944884, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 133.83203125, "velocity": 0.36220472440944884, "duration": 0.16796875 }, { "name": "G#4", "midi": 68, "time": 134, "velocity": 0.3937007874015748, "duration": 0.375 }, { "name": "G#2", "midi": 44, "time": 134, "velocity": 0.3700787401574803, "duration": 0.1640625 }, { "name": "C3", "midi": 48, "time": 134, "velocity": 0.3700787401574803, "duration": 0.1640625 }, { "name": "D#3", "midi": 51, "time": 134, "velocity": 0.3700787401574803, "duration": 0.1640625 }, { "name": "D#3", "midi": 51, "time": 134.1640625, "velocity": 0.3779527559055118, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 134.33203125, "velocity": 0.3700787401574803, "duration": 0.16796875 }, { "name": "C5", "midi": 72, "time": 134.375, "velocity": 0.4094488188976378, "duration": 0.125 }, { "name": "D#4", "midi": 63, "time": 134.5, "velocity": 0.28346456692913385, "duration": 0.40234375 }, { "name": "D#3", "midi": 51, "time": 134.5, "velocity": 0.3779527559055118, "duration": 0.1640625 }, { "name": "D#3", "midi": 51, "time": 134.6640625, "velocity": 0.4015748031496063, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 134.83203125, "velocity": 0.4094488188976378, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 135, "velocity": 0.4251968503937008, "duration": 0.1640625 }, { "name": "D#3", "midi": 51, "time": 135.1640625, "velocity": 0.3700787401574803, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 135.33203125, "velocity": 0.3858267716535433, "duration": 0.16796875 }, { "name": "D#5", "midi": 75, "time": 135.5, "velocity": 0.3228346456692913, "duration": 0.375 }, { "name": "D#6", "midi": 87, "time": 135.5, "velocity": 0.3228346456692913, "duration": 0.375 }, { "name": "D#3", "midi": 51, "time": 135.5, "velocity": 0.4409448818897638, "duration": 0.1640625 }, { "name": "D#3", "midi": 51, "time": 135.6640625, "velocity": 0.36220472440944884, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 135.83203125, "velocity": 0.3464566929133858, "duration": 0.16796875 }, { "name": "E5", "midi": 76, "time": 135.875, "velocity": 0.41732283464566927, "duration": 0.09765625 }, { "name": "E6", "midi": 88, "time": 135.875, "velocity": 0.41732283464566927, "duration": 0.09765625 }, { "name": "F5", "midi": 77, "time": 136, "velocity": 0.3858267716535433, "duration": 0.6640625 }, { "name": "F6", "midi": 89, "time": 136, "velocity": 0.3858267716535433, "duration": 0.6640625 }, { "name": "D#2", "midi": 39, "time": 136, "velocity": 0.3700787401574803, "duration": 0.1640625 }, { "name": "C#3", "midi": 49, "time": 136, "velocity": 0.3700787401574803, "duration": 0.1640625 }, { "name": "D#3", "midi": 51, "time": 136, "velocity": 0.3700787401574803, "duration": 0.1640625 }, { "name": "D#2", "midi": 39, "time": 136.1640625, "velocity": 0.4645669291338583, "duration": 0.16796875 }, { "name": "C#3", "midi": 49, "time": 136.1640625, "velocity": 0.4645669291338583, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 136.1640625, "velocity": 0.4645669291338583, "duration": 0.16796875 }, { "name": "D#2", "midi": 39, "time": 136.33203125, "velocity": 0.5354330708661418, "duration": 0.16796875 }, { "name": "C#3", "midi": 49, "time": 136.33203125, "velocity": 0.5354330708661418, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 136.33203125, "velocity": 0.5354330708661418, "duration": 0.16796875 }, { "name": "D#2", "midi": 39, "time": 136.5, "velocity": 0.6062992125984252, "duration": 0.1640625 }, { "name": "C#3", "midi": 49, "time": 136.5, "velocity": 0.6062992125984252, "duration": 0.1640625 }, { "name": "D#3", "midi": 51, "time": 136.5, "velocity": 0.6062992125984252, "duration": 0.1640625 }, { "name": "D#5", "midi": 75, "time": 136.6640625, "velocity": 0.6692913385826772, "duration": 0.1328125 }, { "name": "D#6", "midi": 87, "time": 136.6640625, "velocity": 0.6692913385826772, "duration": 0.1328125 }, { "name": "D#2", "midi": 39, "time": 136.6640625, "velocity": 0.6771653543307087, "duration": 0.16796875 }, { "name": "C#3", "midi": 49, "time": 136.6640625, "velocity": 0.6771653543307087, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 136.6640625, "velocity": 0.6771653543307087, "duration": 0.16796875 }, { "name": "C#5", "midi": 73, "time": 136.83203125, "velocity": 0.7007874015748031, "duration": 0.08203125 }, { "name": "C#6", "midi": 85, "time": 136.83203125, "velocity": 0.7007874015748031, "duration": 0.08203125 }, { "name": "D#2", "midi": 39, "time": 136.83203125, "velocity": 0.7716535433070866, "duration": 0.16796875 }, { "name": "C#3", "midi": 49, "time": 136.83203125, "velocity": 0.7716535433070866, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 136.83203125, "velocity": 0.7716535433070866, "duration": 0.16796875 }, { "name": "C5", "midi": 72, "time": 137, "velocity": 0.7401574803149606, "duration": 0.078125 }, { "name": "C6", "midi": 84, "time": 137, "velocity": 0.7401574803149606, "duration": 0.078125 }, { "name": "D#2", "midi": 39, "time": 137, "velocity": 0.7952755905511811, "duration": 0.1640625 }, { "name": "C#3", "midi": 49, "time": 137, "velocity": 0.7952755905511811, "duration": 0.1640625 }, { "name": "D#3", "midi": 51, "time": 137, "velocity": 0.7952755905511811, "duration": 0.1640625 }, { "name": "A#4", "midi": 70, "time": 137.1640625, "velocity": 0.6456692913385826, "duration": 0.08203125 }, { "name": "A#5", "midi": 82, "time": 137.1640625, "velocity": 0.6456692913385826, "duration": 0.08203125 }, { "name": "D#2", "midi": 39, "time": 137.1640625, "velocity": 0.7165354330708661, "duration": 0.16796875 }, { "name": "C#3", "midi": 49, "time": 137.1640625, "velocity": 0.7165354330708661, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 137.1640625, "velocity": 0.7165354330708661, "duration": 0.16796875 }, { "name": "G#4", "midi": 68, "time": 137.33203125, "velocity": 0.5905511811023622, "duration": 0.0625 }, { "name": "G#5", "midi": 80, "time": 137.33203125, "velocity": 0.5905511811023622, "duration": 0.0625 }, { "name": "D#2", "midi": 39, "time": 137.33203125, "velocity": 0.6299212598425197, "duration": 0.16796875 }, { "name": "C#3", "midi": 49, "time": 137.33203125, "velocity": 0.6299212598425197, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 137.33203125, "velocity": 0.6299212598425197, "duration": 0.16796875 }, { "name": "G4", "midi": 67, "time": 137.5, "velocity": 0.5196850393700787, "duration": 0.1640625 }, { "name": "G5", "midi": 79, "time": 137.5, "velocity": 0.5196850393700787, "duration": 0.1640625 }, { "name": "D#2", "midi": 39, "time": 137.5, "velocity": 0.5590551181102362, "duration": 0.1640625 }, { "name": "C#3", "midi": 49, "time": 137.5, "velocity": 0.5590551181102362, "duration": 0.1640625 }, { "name": "D#3", "midi": 51, "time": 137.5, "velocity": 0.5590551181102362, "duration": 0.1640625 }, { "name": "C#5", "midi": 73, "time": 137.6640625, "velocity": 0.48031496062992124, "duration": 0.16796875 }, { "name": "C#6", "midi": 85, "time": 137.6640625, "velocity": 0.48031496062992124, "duration": 0.16796875 }, { "name": "D#2", "midi": 39, "time": 137.6640625, "velocity": 0.4645669291338583, "duration": 0.16796875 }, { "name": "C#3", "midi": 49, "time": 137.6640625, "velocity": 0.4645669291338583, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 137.6640625, "velocity": 0.4645669291338583, "duration": 0.16796875 }, { "name": "G4", "midi": 67, "time": 137.83203125, "velocity": 0.31496062992125984, "duration": 0.1328125 }, { "name": "G5", "midi": 79, "time": 137.83203125, "velocity": 0.31496062992125984, "duration": 0.1328125 }, { "name": "D#2", "midi": 39, "time": 137.83203125, "velocity": 0.33070866141732286, "duration": 0.16796875 }, { "name": "C#3", "midi": 49, "time": 137.83203125, "velocity": 0.33070866141732286, "duration": 0.16796875 }, { "name": "D#3", "midi": 51, "time": 137.83203125, "velocity": 0.33070866141732286, "duration": 0.16796875 }, { "name": "G#4", "midi": 68, "time": 138, "velocity": 0.3700787401574803, "duration": 0.5 }, { "name": "G#5", "midi": 80, "time": 138, "velocity": 0.3700787401574803, "duration": 0.5 }, { "name": "G#2", "midi": 44, "time": 138, "velocity": 0.3858267716535433, "duration": 0.5 }, { "name": "C3", "midi": 48, "time": 138, "velocity": 0.3858267716535433, "duration": 0.5 }, { "name": "D#3", "midi": 51, "time": 138, "velocity": 0.3858267716535433, "duration": 0.5 }, { "name": "D#5", "midi": 75, "time": 138.9609375, "velocity": 0.4645669291338583, "duration": 0.0390625 }, { "name": "C#5", "midi": 73, "time": 139, "velocity": 0.4881889763779528, "duration": 0.1640625 }, { "name": "D#4", "midi": 63, "time": 139, "velocity": 0.49606299212598426, "duration": 1 }, { "name": "G4", "midi": 67, "time": 139, "velocity": 0.49606299212598426, "duration": 1 }, { "name": "C5", "midi": 72, "time": 139.1640625, "velocity": 0.3543307086614173, "duration": 0.16796875 }, { "name": "C#5", "midi": 73, "time": 139.33203125, "velocity": 0.3937007874015748, "duration": 0.1328125 }, { "name": "F5", "midi": 77, "time": 139.5, "velocity": 0.41732283464566927, "duration": 0.1640625 }, { "name": "D#5", "midi": 75, "time": 139.6640625, "velocity": 0.3464566929133858, "duration": 0.1328125 }, { "name": "C#5", "midi": 73, "time": 139.83203125, "velocity": 0.33070866141732286, "duration": 0.08203125 }, { "name": "C5", "midi": 72, "time": 140, "velocity": 0.33070866141732286, "duration": 0.5 }, { "name": "G#3", "midi": 56, "time": 140, "velocity": 0.4015748031496063, "duration": 0.5 }, { "name": "G#4", "midi": 68, "time": 140, "velocity": 0.4015748031496063, "duration": 0.5 }, { "name": "C5", "midi": 72, "time": 140.9609375, "velocity": 0.4409448818897638, "duration": 0.0390625 }, { "name": "A#4", "midi": 70, "time": 141, "velocity": 0.48031496062992124, "duration": 0.1640625 }, { "name": "G4", "midi": 67, "time": 141, "velocity": 0.4881889763779528, "duration": 1 }, { "name": "D#3", "midi": 51, "time": 141, "velocity": 0.44881889763779526, "duration": 1 }, { "name": "C#4", "midi": 61, "time": 141, "velocity": 0.44881889763779526, "duration": 1 }, { "name": "A4", "midi": 69, "time": 141.1640625, "velocity": 0.3700787401574803, "duration": 0.16796875 }, { "name": "A#4", "midi": 70, "time": 141.33203125, "velocity": 0.4015748031496063, "duration": 0.16796875 }, { "name": "C#5", "midi": 73, "time": 141.5, "velocity": 0.3937007874015748, "duration": 0.1640625 }, { "name": "C5", "midi": 72, "time": 141.6640625, "velocity": 0.3700787401574803, "duration": 0.1328125 }, { "name": "A#4", "midi": 70, "time": 141.83203125, "velocity": 0.33070866141732286, "duration": 0.08203125 }, { "name": "G#4", "midi": 68, "time": 142, "velocity": 0.3543307086614173, "duration": 0.40234375 }, { "name": "G#3", "midi": 56, "time": 142, "velocity": 0.33070866141732286, "duration": 0.40234375 }, { "name": "C4", "midi": 60, "time": 142, "velocity": 0.33070866141732286, "duration": 0.40234375 }, { "name": "C4", "midi": 60, "time": 142.95703125, "velocity": 0.48031496062992124, "duration": 0.04296875 }, { "name": "A#3", "midi": 58, "time": 143, "velocity": 0.5039370078740157, "duration": 0.1640625 }, { "name": "G3", "midi": 55, "time": 143, "velocity": 0.47244094488188976, "duration": 0.90234375 }, { "name": "D#2", "midi": 39, "time": 143, "velocity": 0.49606299212598426, "duration": 1 }, { "name": "C#3", "midi": 49, "time": 143, "velocity": 0.49606299212598426, "duration": 1 }, { "name": "A3", "midi": 57, "time": 143.1640625, "velocity": 0.3700787401574803, "duration": 0.16796875 }, { "name": "A#3", "midi": 58, "time": 143.33203125, "velocity": 0.36220472440944884, "duration": 0.1328125 }, { "name": "C#4", "midi": 61, "time": 143.5, "velocity": 0.4015748031496063, "duration": 0.1640625 }, { "name": "C4", "midi": 60, "time": 143.6640625, "velocity": 0.3937007874015748, "duration": 0.1328125 }, { "name": "A#3", "midi": 58, "time": 143.83203125, "velocity": 0.3464566929133858, "duration": 0.08203125 }, { "name": "G#3", "midi": 56, "time": 144, "velocity": 0.41732283464566927, "duration": 0.25 }, { "name": "G#2", "midi": 44, "time": 144, "velocity": 0.3937007874015748, "duration": 0.19921875 }, { "name": "C3", "midi": 48, "time": 144, "velocity": 0.3937007874015748, "duration": 0.19921875 }, { "name": "C3", "midi": 48, "time": 144.5, "velocity": 0.3779527559055118, "duration": 0.25 }, { "name": "D#3", "midi": 51, "time": 144.5, "velocity": 0.3779527559055118, "duration": 0.25 }, { "name": "G#3", "midi": 56, "time": 144.5, "velocity": 0.3779527559055118, "duration": 0.25 }, { "name": "G#1", "midi": 32, "time": 144.5, "velocity": 0.36220472440944884, "duration": 0.25 }, { "name": "C3", "midi": 48, "time": 145, "velocity": 0.33070866141732286, "duration": 1 }, { "name": "G#3", "midi": 56, "time": 145, "velocity": 0.33070866141732286, "duration": 1 }, { "name": "G#1", "midi": 32, "time": 145, "velocity": 0.3464566929133858, "duration": 1 }, { "name": "G#2", "midi": 44, "time": 145, "velocity": 0.3464566929133858, "duration": 1 }], "controlChanges": { "7": [{ "number": 7, "time": 0, "value": 0.7874015748031497 }, { "number": 7, "time": 0, "value": 0.7874015748031497 }], "10": [{ "number": 10, "time": 0, "value": 0.4015748031496063 }, { "number": 10, "time": 0, "value": 0.4015748031496063 }], "64": [{ "number": 64, "time": 0, "value": 0 }, { "number": 64, "time": 0, "value": 0 }], "91": [{ "number": 91, "time": 0, "value": 0.3779527559055118 }, { "number": 91, "time": 0, "value": 0.3779527559055118 }], "121": [{ "number": 121, "time": 0, "value": 0 }, { "number": 121, "time": 0, "value": 0 }] }, "id": 1, "name": "Piano", "instrumentNumber": 0, "instrument": "acoustic grand piano", "instrumentFamily": "piano", "channelNumber": 0, "isPercussion": false }]
  }

  data = {
    "header": {
      "PPQ": 256,
      "timeSignature": [
        2,
        4
      ],
      "bpm": 60,
      "name": ""
    },
    "startTime": 0,
    "duration": 146,
    "tracks": [
      {
        "startTime": 0,
        "duration": 0,
        "length": 0,
        "notes": [],
        "controlChanges": {},
        "id": 0
      },
      {
        "startTime": 0,
        "duration": 146,
        "length": 1624,
        "notes": [
          {
            "name": "C4",
            "midi": 60,
            "time": 0,
            "velocity": 0.41732283464566927,
            "duration": 1
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 0,
            "velocity": 0.41732283464566927,
            "duration": 0.25
          },
          {
            "name": "G#2",
            "midi": 44,
            "time": 0,
            "velocity": 0.4251968503937008,
            "duration": 1
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 0.25,
            "velocity": 0.44881889763779526,
            "duration": 0.25
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 0.5,
            "velocity": 0.4881889763779528,
            "duration": 0.25
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 0.75,
            "velocity": 0.4330708661417323,
            "duration": 0.25
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 1,
            "velocity": 0.44881889763779526,
            "duration": 1
          },
          {
            "name": "G3",
            "midi": 55,
            "time": 1,
            "velocity": 0.47244094488188976,
            "duration": 0.25
          },
          {
            "name": "C#3",
            "midi": 49,
            "time": 1,
            "velocity": 0.48031496062992124,
            "duration": 1
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 1.25,
            "velocity": 0.47244094488188976,
            "duration": 0.25
          },
          {
            "name": "G3",
            "midi": 55,
            "time": 1.5,
            "velocity": 0.5118110236220472,
            "duration": 0.25
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 1.75,
            "velocity": 0.4645669291338583,
            "duration": 0.25
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 2,
            "velocity": 0.5590551181102362,
            "duration": 1.5
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 2,
            "velocity": 0.5039370078740157,
            "duration": 0.25
          },
          {
            "name": "C3",
            "midi": 48,
            "time": 2,
            "velocity": 0.48031496062992124,
            "duration": 1
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 2.25,
            "velocity": 0.4566929133858268,
            "duration": 0.25
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 2.5,
            "velocity": 0.5275590551181102,
            "duration": 0.25
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 2.75,
            "velocity": 0.48031496062992124,
            "duration": 0.25
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 3,
            "velocity": 0.49606299212598426,
            "duration": 0.25
          },
          {
            "name": "G2",
            "midi": 43,
            "time": 3,
            "velocity": 0.4566929133858268,
            "duration": 0.90234375
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 3.25,
            "velocity": 0.4409448818897638,
            "duration": 0.25
          },
          {
            "name": "C#4",
            "midi": 61,
            "time": 3.5,
            "velocity": 0.4645669291338583,
            "duration": 0.40234375
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 3.5,
            "velocity": 0.5196850393700787,
            "duration": 0.19921875
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 3.75,
            "velocity": 0.4251968503937008,
            "duration": 0.25
          },
          {
            "name": "C4",
            "midi": 60,
            "time": 4,
            "velocity": 0.47244094488188976,
            "duration": 0.5
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 4,
            "velocity": 0.5118110236220472,
            "duration": 0.25
          },
          {
            "name": "G#2",
            "midi": 44,
            "time": 4,
            "velocity": 0.5039370078740157,
            "duration": 0.5
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 4.25,
            "velocity": 0.4409448818897638,
            "duration": 0.25
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 4.5,
            "velocity": 0.5275590551181102,
            "duration": 0.5
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 4.5,
            "velocity": 0.5511811023622047,
            "duration": 0.25
          },
          {
            "name": "G2",
            "midi": 43,
            "time": 4.5,
            "velocity": 0.4645669291338583,
            "duration": 0.5
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 4.75,
            "velocity": 0.4251968503937008,
            "duration": 0.25
          },
          {
            "name": "G#4",
            "midi": 68,
            "time": 5,
            "velocity": 0.5590551181102362,
            "duration": 0.5
          },
          {
            "name": "C4",
            "midi": 60,
            "time": 5,
            "velocity": 0.5984251968503937,
            "duration": 0.25
          },
          {
            "name": "F2",
            "midi": 41,
            "time": 5,
            "velocity": 0.4645669291338583,
            "duration": 0.5
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 5.25,
            "velocity": 0.48031496062992124,
            "duration": 0.25
          },
          {
            "name": "A#4",
            "midi": 70,
            "time": 5.5,
            "velocity": 0.5275590551181102,
            "duration": 0.40234375
          },
          {
            "name": "D4",
            "midi": 62,
            "time": 5.5,
            "velocity": 0.5354330708661418,
            "duration": 0.19921875
          },
          {
            "name": "F3",
            "midi": 53,
            "time": 5.5,
            "velocity": 0.5669291338582677,
            "duration": 0.40234375
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 5.75,
            "velocity": 0.44881889763779526,
            "duration": 0.25
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 6,
            "velocity": 0.4015748031496063,
            "duration": 1.5
          },
          {
            "name": "G3",
            "midi": 55,
            "time": 6,
            "velocity": 0.47244094488188976,
            "duration": 0.25
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 6,
            "velocity": 0.4881889763779528,
            "duration": 1
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 6.25,
            "velocity": 0.5039370078740157,
            "duration": 0.25
          },
          {
            "name": "G3",
            "midi": 55,
            "time": 6.5,
            "velocity": 0.4566929133858268,
            "duration": 0.25
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 6.75,
            "velocity": 0.5039370078740157,
            "duration": 0.25
          },
          {
            "name": "G3",
            "midi": 55,
            "time": 7,
            "velocity": 0.4645669291338583,
            "duration": 0.25
          },
          {
            "name": "D#2",
            "midi": 39,
            "time": 7,
            "velocity": 0.4015748031496063,
            "duration": 1
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 7.25,
            "velocity": 0.5354330708661418,
            "duration": 0.25
          },
          {
            "name": "E4",
            "midi": 64,
            "time": 7.5,
            "velocity": 0.47244094488188976,
            "duration": 0.5
          },
          {
            "name": "G3",
            "midi": 55,
            "time": 7.5,
            "velocity": 0.4645669291338583,
            "duration": 0.25
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 7.75,
            "velocity": 0.48031496062992124,
            "duration": 0.25
          },
          {
            "name": "F4",
            "midi": 65,
            "time": 8,
            "velocity": 0.5118110236220472,
            "duration": 0.90234375
          },
          {
            "name": "G3",
            "midi": 55,
            "time": 8,
            "velocity": 0.44881889763779526,
            "duration": 0.19921875
          },
          {
            "name": "C#2",
            "midi": 37,
            "time": 8,
            "velocity": 0.4645669291338583,
            "duration": 1
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 8.25,
            "velocity": 0.48031496062992124,
            "duration": 0.25
          },
          {
            "name": "G3",
            "midi": 55,
            "time": 8.5,
            "velocity": 0.4566929133858268,
            "duration": 0.25
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 8.75,
            "velocity": 0.5039370078740157,
            "duration": 0.25
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 9,
            "velocity": 0.4566929133858268,
            "duration": 0.75
          },
          {
            "name": "G3",
            "midi": 55,
            "time": 9,
            "velocity": 0.47244094488188976,
            "duration": 0.25
          },
          {
            "name": "C#3",
            "midi": 49,
            "time": 9,
            "velocity": 0.5354330708661418,
            "duration": 0.90234375
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 9.25,
            "velocity": 0.4566929133858268,
            "duration": 0.25
          },
          {
            "name": "G3",
            "midi": 55,
            "time": 9.5,
            "velocity": 0.5196850393700787,
            "duration": 0.25
          },
          {
            "name": "C4",
            "midi": 60,
            "time": 9.75,
            "velocity": 0.5196850393700787,
            "duration": 0.125
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 9.75,
            "velocity": 0.4566929133858268,
            "duration": 0.19921875
          },
          {
            "name": "C#4",
            "midi": 61,
            "time": 9.875,
            "velocity": 0.5118110236220472,
            "duration": 0.09765625
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 10,
            "velocity": 0.5354330708661418,
            "duration": 1
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 10,
            "velocity": 0.48031496062992124,
            "duration": 0.25
          },
          {
            "name": "C3",
            "midi": 48,
            "time": 10,
            "velocity": 0.4645669291338583,
            "duration": 1
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 10.25,
            "velocity": 0.44881889763779526,
            "duration": 0.25
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 10.5,
            "velocity": 0.5118110236220472,
            "duration": 0.25
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 10.75,
            "velocity": 0.44881889763779526,
            "duration": 0.25
          },
          {
            "name": "A3",
            "midi": 57,
            "time": 11,
            "velocity": 0.4330708661417323,
            "duration": 1
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 11,
            "velocity": 0.47244094488188976,
            "duration": 0.25
          },
          {
            "name": "F2",
            "midi": 41,
            "time": 11,
            "velocity": 0.4330708661417323,
            "duration": 1
          },
          {
            "name": "C3",
            "midi": 48,
            "time": 11.25,
            "velocity": 0.44881889763779526,
            "duration": 0.25
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 11.5,
            "velocity": 0.4881889763779528,
            "duration": 0.25
          },
          {
            "name": "C3",
            "midi": 48,
            "time": 11.75,
            "velocity": 0.4251968503937008,
            "duration": 0.25
          },
          {
            "name": "C#4",
            "midi": 61,
            "time": 12,
            "velocity": 0.5275590551181102,
            "duration": 0.90234375
          },
          {
            "name": "F3",
            "midi": 53,
            "time": 12,
            "velocity": 0.5354330708661418,
            "duration": 0.19921875
          },
          {
            "name": "A#1",
            "midi": 34,
            "time": 12,
            "velocity": 0.41732283464566927,
            "duration": 1
          },
          {
            "name": "C#3",
            "midi": 49,
            "time": 12.25,
            "velocity": 0.4566929133858268,
            "duration": 0.25
          },
          {
            "name": "F3",
            "midi": 53,
            "time": 12.5,
            "velocity": 0.47244094488188976,
            "duration": 0.25
          },
          {
            "name": "C#3",
            "midi": 49,
            "time": 12.75,
            "velocity": 0.44881889763779526,
            "duration": 0.25
          },
          {
            "name": "C4",
            "midi": 60,
            "time": 13,
            "velocity": 0.4409448818897638,
            "duration": 0.12109375
          },
          {
            "name": "C#3",
            "midi": 49,
            "time": 13,
            "velocity": 0.47244094488188976,
            "duration": 0.25
          },
          {
            "name": "D#2",
            "midi": 39,
            "time": 13,
            "velocity": 0.44881889763779526,
            "duration": 0.90234375
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 13.25,
            "velocity": 0.4566929133858268,
            "duration": 0.12109375
          },
          {
            "name": "C#3",
            "midi": 49,
            "time": 13.25,
            "velocity": 0.4645669291338583,
            "duration": 0.25
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 13.5,
            "velocity": 0.4566929133858268,
            "duration": 0.12109375
          },
          {
            "name": "C#3",
            "midi": 49,
            "time": 13.5,
            "velocity": 0.48031496062992124,
            "duration": 0.25
          },
          {
            "name": "G3",
            "midi": 55,
            "time": 13.75,
            "velocity": 0.4645669291338583,
            "duration": 0.09375
          },
          {
            "name": "C#3",
            "midi": 49,
            "time": 13.75,
            "velocity": 0.4566929133858268,
            "duration": 0.19921875
          },
          {
            "name": "G3",
            "midi": 55,
            "time": 14,
            "velocity": 0.48031496062992124,
            "duration": 0.90234375
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 14,
            "velocity": 0.48031496062992124,
            "duration": 0.90234375
          },
          {
            "name": "C#3",
            "midi": 49,
            "time": 14,
            "velocity": 0.4881889763779528,
            "duration": 0.25
          },
          {
            "name": "G#1",
            "midi": 32,
            "time": 14,
            "velocity": 0.4645669291338583,
            "duration": 0.5
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 14.25,
            "velocity": 0.4881889763779528,
            "duration": 0.25
          },
          {
            "name": "C#3",
            "midi": 49,
            "time": 14.5,
            "velocity": 0.4409448818897638,
            "duration": 0.25
          },
          {
            "name": "G#2",
            "midi": 44,
            "time": 14.5,
            "velocity": 0.5118110236220472,
            "duration": 0.5
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 14.75,
            "velocity": 0.49606299212598426,
            "duration": 0.19921875
          },
          {
            "name": "G#1",
            "midi": 32,
            "time": 15,
            "velocity": 0.4330708661417323,
            "duration": 0.5
          },
          {
            "name": "C3",
            "midi": 48,
            "time": 15,
            "velocity": 0.4566929133858268,
            "duration": 0.078125
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 15,
            "velocity": 0.4566929133858268,
            "duration": 0.078125
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 15.1640625,
            "velocity": 0.4566929133858268,
            "duration": 0.08203125
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 15.33203125,
            "velocity": 0.5196850393700787,
            "duration": 0.08203125
          },
          {
            "name": "C4",
            "midi": 60,
            "time": 15.5,
            "velocity": 0.5275590551181102,
            "duration": 0.078125
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 15.6640625,
            "velocity": 0.5118110236220472,
            "duration": 0.08203125
          },
          {
            "name": "G#4",
            "midi": 68,
            "time": 15.83203125,
            "velocity": 0.5511811023622047,
            "duration": 0.08203125
          },
          {
            "name": "C5",
            "midi": 72,
            "time": 16,
            "velocity": 0.6062992125984252,
            "duration": 1
          },
          {
            "name": "C4",
            "midi": 60,
            "time": 16,
            "velocity": 0.6141732283464567,
            "duration": 0.25
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 16,
            "velocity": 0.4251968503937008,
            "duration": 0.25
          },
          {
            "name": "G#2",
            "midi": 44,
            "time": 16,
            "velocity": 0.3937007874015748,
            "duration": 1
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 16.25,
            "velocity": 0.5433070866141733,
            "duration": 0.25
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 16.25,
            "velocity": 0.4094488188976378,
            "duration": 0.25
          },
          {
            "name": "C4",
            "midi": 60,
            "time": 16.5,
            "velocity": 0.44881889763779526,
            "duration": 0.25
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 16.5,
            "velocity": 0.4881889763779528,
            "duration": 0.25
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 16.75,
            "velocity": 0.5354330708661418,
            "duration": 0.25
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 16.75,
            "velocity": 0.44881889763779526,
            "duration": 0.25
          },
          {
            "name": "A#4",
            "midi": 70,
            "time": 17,
            "velocity": 0.47244094488188976,
            "duration": 1
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 17,
            "velocity": 0.4251968503937008,
            "duration": 0.25
          },
          {
            "name": "G3",
            "midi": 55,
            "time": 17,
            "velocity": 0.5118110236220472,
            "duration": 0.25
          },
          {
            "name": "C#3",
            "midi": 49,
            "time": 17,
            "velocity": 0.47244094488188976,
            "duration": 1
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 17.25,
            "velocity": 0.5118110236220472,
            "duration": 0.25
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 17.25,
            "velocity": 0.4645669291338583,
            "duration": 0.25
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 17.5,
            "velocity": 0.47244094488188976,
            "duration": 0.25
          },
          {
            "name": "G3",
            "midi": 55,
            "time": 17.5,
            "velocity": 0.49606299212598426,
            "duration": 0.25
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 17.75,
            "velocity": 0.5354330708661418,
            "duration": 0.25
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 17.75,
            "velocity": 0.4251968503937008,
            "duration": 0.25
          },
          {
            "name": "D#5",
            "midi": 75,
            "time": 18,
            "velocity": 0.5354330708661418,
            "duration": 1.5
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 18,
            "velocity": 0.5118110236220472,
            "duration": 0.25
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 18,
            "velocity": 0.5196850393700787,
            "duration": 0.25
          },
          {
            "name": "C3",
            "midi": 48,
            "time": 18,
            "velocity": 0.4251968503937008,
            "duration": 1
          },
          {
            "name": "G#4",
            "midi": 68,
            "time": 18.25,
            "velocity": 0.5511811023622047,
            "duration": 0.25
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 18.25,
            "velocity": 0.4409448818897638,
            "duration": 0.25
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 18.5,
            "velocity": 0.4409448818897638,
            "duration": 0.25
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 18.5,
            "velocity": 0.4881889763779528,
            "duration": 0.25
          },
          {
            "name": "G#4",
            "midi": 68,
            "time": 18.75,
            "velocity": 0.5275590551181102,
            "duration": 0.25
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 18.75,
            "velocity": 0.4566929133858268,
            "duration": 0.25
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 19,
            "velocity": 0.4251968503937008,
            "duration": 0.25
          },
          {
            "name": "G3",
            "midi": 55,
            "time": 19,
            "velocity": 0.5039370078740157,
            "duration": 0.19921875
          },
          {
            "name": "G2",
            "midi": 43,
            "time": 19,
            "velocity": 0.4409448818897638,
            "duration": 0.90234375
          },
          {
            "name": "A#4",
            "midi": 70,
            "time": 19.25,
            "velocity": 0.5748031496062992,
            "duration": 0.25
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 19.25,
            "velocity": 0.5039370078740157,
            "duration": 0.25
          },
          {
            "name": "C#5",
            "midi": 73,
            "time": 19.5,
            "velocity": 0.41732283464566927,
            "duration": 0.40234375
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 19.5,
            "velocity": 0.41732283464566927,
            "duration": 0.19921875
          },
          {
            "name": "G3",
            "midi": 55,
            "time": 19.5,
            "velocity": 0.4881889763779528,
            "duration": 0.25
          },
          {
            "name": "A#4",
            "midi": 70,
            "time": 19.75,
            "velocity": 0.5511811023622047,
            "duration": 0.25
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 19.75,
            "velocity": 0.4330708661417323,
            "duration": 0.25
          },
          {
            "name": "C5",
            "midi": 72,
            "time": 20,
            "velocity": 0.4566929133858268,
            "duration": 0.5
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 20,
            "velocity": 0.3858267716535433,
            "duration": 0.25
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 20,
            "velocity": 0.4645669291338583,
            "duration": 0.25
          },
          {
            "name": "G#2",
            "midi": 44,
            "time": 20,
            "velocity": 0.4566929133858268,
            "duration": 0.5
          },
          {
            "name": "G#4",
            "midi": 68,
            "time": 20.25,
            "velocity": 0.4881889763779528,
            "duration": 0.25
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 20.25,
            "velocity": 0.44881889763779526,
            "duration": 0.25
          },
          {
            "name": "D#5",
            "midi": 75,
            "time": 20.5,
            "velocity": 0.5354330708661418,
            "duration": 0.5
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 20.5,
            "velocity": 0.4409448818897638,
            "duration": 0.25
          },
          {
            "name": "G3",
            "midi": 55,
            "time": 20.5,
            "velocity": 0.49606299212598426,
            "duration": 0.25
          },
          {
            "name": "G2",
            "midi": 43,
            "time": 20.5,
            "velocity": 0.4645669291338583,
            "duration": 0.5
          },
          {
            "name": "A#4",
            "midi": 70,
            "time": 20.75,
            "velocity": 0.5511811023622047,
            "duration": 0.25
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 20.75,
            "velocity": 0.4409448818897638,
            "duration": 0.25
          },
          {
            "name": "G#5",
            "midi": 80,
            "time": 21,
            "velocity": 0.5433070866141733,
            "duration": 0.5
          },
          {
            "name": "G#4",
            "midi": 68,
            "time": 21,
            "velocity": 0.4409448818897638,
            "duration": 0.25
          },
          {
            "name": "F3",
            "midi": 53,
            "time": 21,
            "velocity": 0.5118110236220472,
            "duration": 0.25
          },
          {
            "name": "F2",
            "midi": 41,
            "time": 21,
            "velocity": 0.4881889763779528,
            "duration": 0.5
          },
          {
            "name": "C5",
            "midi": 72,
            "time": 21.25,
            "velocity": 0.5354330708661418,
            "duration": 0.25
          },
          {
            "name": "G#2",
            "midi": 44,
            "time": 21.25,
            "velocity": 0.41732283464566927,
            "duration": 0.25
          },
          {
            "name": "A#5",
            "midi": 82,
            "time": 21.5,
            "velocity": 0.5433070866141733,
            "duration": 0.40234375
          },
          {
            "name": "G#4",
            "midi": 68,
            "time": 21.5,
            "velocity": 0.4409448818897638,
            "duration": 0.19921875
          },
          {
            "name": "F3",
            "midi": 53,
            "time": 21.5,
            "velocity": 0.5669291338582677,
            "duration": 0.19921875
          },
          {
            "name": "F2",
            "midi": 41,
            "time": 21.5,
            "velocity": 0.4566929133858268,
            "duration": 0.40234375
          },
          {
            "name": "D5",
            "midi": 74,
            "time": 21.75,
            "velocity": 0.5748031496062992,
            "duration": 0.25
          },
          {
            "name": "G#2",
            "midi": 44,
            "time": 21.75,
            "velocity": 0.44881889763779526,
            "duration": 0.25
          },
          {
            "name": "D#5",
            "midi": 75,
            "time": 22,
            "velocity": 0.3858267716535433,
            "duration": 1.5
          },
          {
            "name": "G4",
            "midi": 67,
            "time": 22,
            "velocity": 0.4330708661417323,
            "duration": 0.25
          },
          {
            "name": "D#2",
            "midi": 39,
            "time": 22,
            "velocity": 0.4409448818897638,
            "duration": 0.25
          },
          {
            "name": "A#4",
            "midi": 70,
            "time": 22.25,
            "velocity": 0.5511811023622047,
            "duration": 0.25
          },
          {
            "name": "G2",
            "midi": 43,
            "time": 22.25,
            "velocity": 0.5039370078740157,
            "duration": 0.25
          },
          {
            "name": "G4",
            "midi": 67,
            "time": 22.5,
            "velocity": 0.44881889763779526,
            "duration": 0.25
          },
          {
            "name": "A#2",
            "midi": 46,
            "time": 22.5,
            "velocity": 0.47244094488188976,
            "duration": 0.25
          },
          {
            "name": "A#4",
            "midi": 70,
            "time": 22.75,
            "velocity": 0.5118110236220472,
            "duration": 0.25
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 22.75,
            "velocity": 0.4881889763779528,
            "duration": 0.25
          },
          {
            "name": "G4",
            "midi": 67,
            "time": 23,
            "velocity": 0.44881889763779526,
            "duration": 0.25
          },
          {
            "name": "G3",
            "midi": 55,
            "time": 23,
            "velocity": 0.49606299212598426,
            "duration": 0.25
          },
          {
            "name": "A#4",
            "midi": 70,
            "time": 23.25,
            "velocity": 0.47244094488188976,
            "duration": 0.25
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 23.25,
            "velocity": 0.5039370078740157,
            "duration": 0.25
          },
          {
            "name": "E5",
            "midi": 76,
            "time": 23.5,
            "velocity": 0.49606299212598426,
            "duration": 0.5
          },
          {
            "name": "G4",
            "midi": 67,
            "time": 23.5,
            "velocity": 0.4409448818897638,
            "duration": 0.25
          },
          {
            "name": "G3",
            "midi": 55,
            "time": 23.5,
            "velocity": 0.47244094488188976,
            "duration": 0.25
          },
          {
            "name": "A#4",
            "midi": 70,
            "time": 23.75,
            "velocity": 0.5039370078740157,
            "duration": 0.25
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 23.75,
            "velocity": 0.47244094488188976,
            "duration": 0.19921875
          },
          {
            "name": "F5",
            "midi": 77,
            "time": 24,
            "velocity": 0.48031496062992124,
            "duration": 0.90234375
          },
          {
            "name": "G4",
            "midi": 67,
            "time": 24,
            "velocity": 0.4330708661417323,
            "duration": 0.19921875
          },
          {
            "name": "C#2",
            "midi": 37,
            "time": 24,
            "velocity": 0.47244094488188976,
            "duration": 0.25
          },
          {
            "name": "A#4",
            "midi": 70,
            "time": 24.25,
            "velocity": 0.5275590551181102,
            "duration": 0.25
          },
          {
            "name": "G2",
            "midi": 43,
            "time": 24.25,
            "velocity": 0.5196850393700787,
            "duration": 0.25
          },
          {
            "name": "G4",
            "midi": 67,
            "time": 24.5,
            "velocity": 0.4409448818897638,
            "duration": 0.25
          },
          {
            "name": "A#2",
            "midi": 46,
            "time": 24.5,
            "velocity": 0.4881889763779528,
            "duration": 0.25
          },
          {
            "name": "A#4",
            "midi": 70,
            "time": 24.75,
            "velocity": 0.5354330708661418,
            "duration": 0.25
          },
          {
            "name": "C#3",
            "midi": 49,
            "time": 24.75,
            "velocity": 0.5275590551181102,
            "duration": 0.25
          },
          {
            "name": "A#4",
            "midi": 70,
            "time": 25,
            "velocity": 0.3779527559055118,
            "duration": 0.75
          },
          {
            "name": "G4",
            "midi": 67,
            "time": 25,
            "velocity": 0.4409448818897638,
            "duration": 0.25
          },
          {
            "name": "G3",
            "midi": 55,
            "time": 25,
            "velocity": 0.5118110236220472,
            "duration": 0.25
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 25.25,
            "velocity": 0.4330708661417323,
            "duration": 0.25
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 25.25,
            "velocity": 0.49606299212598426,
            "duration": 0.25
          },
          {
            "name": "G4",
            "midi": 67,
            "time": 25.5,
            "velocity": 0.5118110236220472,
            "duration": 0.25
          },
          {
            "name": "G3",
            "midi": 55,
            "time": 25.5,
            "velocity": 0.4566929133858268,
            "duration": 0.25
          },
          {
            "name": "C5",
            "midi": 72,
            "time": 25.75,
            "velocity": 0.49606299212598426,
            "duration": 0.125
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 25.75,
            "velocity": 0.41732283464566927,
            "duration": 0.25
          },
          {
            "name": "C#3",
            "midi": 49,
            "time": 25.75,
            "velocity": 0.4251968503937008,
            "duration": 0.19921875
          },
          {
            "name": "C#5",
            "midi": 73,
            "time": 25.875,
            "velocity": 0.48031496062992124,
            "duration": 0.125
          },
          {
            "name": "D#5",
            "midi": 75,
            "time": 26,
            "velocity": 0.5354330708661418,
            "duration": 1
          },
          {
            "name": "G#4",
            "midi": 68,
            "time": 26,
            "velocity": 0.5905511811023622,
            "duration": 0.25
          },
          {
            "name": "C3",
            "midi": 48,
            "time": 26,
            "velocity": 0.4330708661417323,
            "duration": 0.25
          },
          {
            "name": "C3",
            "midi": 48,
            "time": 26,
            "velocity": 0.4566929133858268,
            "duration": 0.75
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 26.25,
            "velocity": 0.4094488188976378,
            "duration": 0.25
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 26.25,
            "velocity": 0.4881889763779528,
            "duration": 0.25
          },
          {
            "name": "G#4",
            "midi": 68,
            "time": 26.5,
            "velocity": 0.5511811023622047,
            "duration": 0.25
          },
          {
            "name": "C3",
            "midi": 48,
            "time": 26.5,
            "velocity": 0.4645669291338583,
            "duration": 0.5
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 26.75,
            "velocity": 0.4094488188976378,
            "duration": 0.25
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 26.75,
            "velocity": 0.49606299212598426,
            "duration": 0.25
          },
          {
            "name": "A4",
            "midi": 69,
            "time": 27,
            "velocity": 0.4094488188976378,
            "duration": 1
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 27,
            "velocity": 0.4409448818897638,
            "duration": 0.25
          },
          {
            "name": "C3",
            "midi": 48,
            "time": 27,
            "velocity": 0.47244094488188976,
            "duration": 0.25
          },
          {
            "name": "F2",
            "midi": 41,
            "time": 27,
            "velocity": 0.4094488188976378,
            "duration": 1
          },
          {
            "name": "C4",
            "midi": 60,
            "time": 27.25,
            "velocity": 0.44881889763779526,
            "duration": 0.25
          },
          {
            "name": "F3",
            "midi": 53,
            "time": 27.25,
            "velocity": 0.5039370078740157,
            "duration": 0.25
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 27.5,
            "velocity": 0.48031496062992124,
            "duration": 0.25
          },
          {
            "name": "C3",
            "midi": 48,
            "time": 27.5,
            "velocity": 0.47244094488188976,
            "duration": 0.25
          },
          {
            "name": "C4",
            "midi": 60,
            "time": 27.75,
            "velocity": 0.4409448818897638,
            "duration": 0.25
          },
          {
            "name": "F3",
            "midi": 53,
            "time": 27.75,
            "velocity": 0.5039370078740157,
            "duration": 0.25
          },
          {
            "name": "C#5",
            "midi": 73,
            "time": 28,
            "velocity": 0.5354330708661418,
            "duration": 1
          },
          {
            "name": "F4",
            "midi": 65,
            "time": 28,
            "velocity": 0.5196850393700787,
            "duration": 0.25
          },
          {
            "name": "C#3",
            "midi": 49,
            "time": 28,
            "velocity": 0.4409448818897638,
            "duration": 0.25
          },
          {
            "name": "A#2",
            "midi": 46,
            "time": 28,
            "velocity": 0.47244094488188976,
            "duration": 1
          },
          {
            "name": "C#4",
            "midi": 61,
            "time": 28.25,
            "velocity": 0.48031496062992124,
            "duration": 0.25
          },
          {
            "name": "F3",
            "midi": 53,
            "time": 28.25,
            "velocity": 0.48031496062992124,
            "duration": 0.25
          },
          {
            "name": "F4",
            "midi": 65,
            "time": 28.5,
            "velocity": 0.5196850393700787,
            "duration": 0.25
          },
          {
            "name": "C#3",
            "midi": 49,
            "time": 28.5,
            "velocity": 0.47244094488188976,
            "duration": 0.25
          },
          {
            "name": "C#4",
            "midi": 61,
            "time": 28.75,
            "velocity": 0.4094488188976378,
            "duration": 0.25
          },
          {
            "name": "F3",
            "midi": 53,
            "time": 28.75,
            "velocity": 0.49606299212598426,
            "duration": 0.25
          },
          {
            "name": "C5",
            "midi": 72,
            "time": 29,
            "velocity": 0.4645669291338583,
            "duration": 0.12109375
          },
          {
            "name": "C#4",
            "midi": 61,
            "time": 29,
            "velocity": 0.49606299212598426,
            "duration": 0.25
          },
          {
            "name": "A#2",
            "midi": 46,
            "time": 29,
            "velocity": 0.4251968503937008,
            "duration": 0.19921875
          },
          {
            "name": "D#2",
            "midi": 39,
            "time": 29,
            "velocity": 0.4094488188976378,
            "duration": 0.90234375
          },
          {
            "name": "A#4",
            "midi": 70,
            "time": 29.25,
            "velocity": 0.4094488188976378,
            "duration": 0.12109375
          },
          {
            "name": "C#4",
            "midi": 61,
            "time": 29.25,
            "velocity": 0.47244094488188976,
            "duration": 0.25
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 29.25,
            "velocity": 0.4881889763779528,
            "duration": 0.25
          },
          {
            "name": "G#4",
            "midi": 68,
            "time": 29.5,
            "velocity": 0.4645669291338583,
            "duration": 0.12109375
          },
          {
            "name": "C#4",
            "midi": 61,
            "time": 29.5,
            "velocity": 0.4881889763779528,
            "duration": 0.25
          },
          {
            "name": "A#2",
            "midi": 46,
            "time": 29.5,
            "velocity": 0.44881889763779526,
            "duration": 0.25
          },
          {
            "name": "G4",
            "midi": 67,
            "time": 29.75,
            "velocity": 0.41732283464566927,
            "duration": 0.12109375
          },
          {
            "name": "C#4",
            "midi": 61,
            "time": 29.75,
            "velocity": 0.4881889763779528,
            "duration": 0.25
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 29.75,
            "velocity": 0.48031496062992124,
            "duration": 0.25
          },
          {
            "name": "A#4",
            "midi": 70,
            "time": 30,
            "velocity": 0.48031496062992124,
            "duration": 1
          },
          {
            "name": "C#4",
            "midi": 61,
            "time": 30,
            "velocity": 0.48031496062992124,
            "duration": 0.25
          },
          {
            "name": "G#2",
            "midi": 44,
            "time": 30,
            "velocity": 0.49606299212598426,
            "duration": 1.5
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 30.25,
            "velocity": 0.48031496062992124,
            "duration": 0.25
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 30.25,
            "velocity": 0.4094488188976378,
            "duration": 0.25
          },
          {
            "name": "C#4",
            "midi": 61,
            "time": 30.5,
            "velocity": 0.4566929133858268,
            "duration": 0.25
          },
          {
            "name": "G3",
            "midi": 55,
            "time": 30.5,
            "velocity": 0.4881889763779528,
            "duration": 0.25
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 30.75,
            "velocity": 0.5196850393700787,
            "duration": 0.25
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 30.75,
            "velocity": 0.4566929133858268,
            "duration": 0.25
          },
          {
            "name": "G#4",
            "midi": 68,
            "time": 31,
            "velocity": 0.4330708661417323,
            "duration": 0.40234375
          },
          {
            "name": "C4",
            "midi": 60,
            "time": 31,
            "velocity": 0.4409448818897638,
            "duration": 0.40234375
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 31,
            "velocity": 0.49606299212598426,
            "duration": 0.5
          },
          {
            "name": "C4",
            "midi": 60,
            "time": 31.875,
            "velocity": 0.4251968503937008,
            "duration": 0.125
          },
          {
            "name": "C5",
            "midi": 72,
            "time": 32,
            "velocity": 0.6141732283464567,
            "duration": 1.25
          },
          {
            "name": "C4",
            "midi": 60,
            "time": 32.25,
            "velocity": 0.4409448818897638,
            "duration": 0.25
          },
          {
            "name": "C4",
            "midi": 60,
            "time": 32.5,
            "velocity": 0.4330708661417323,
            "duration": 0.25
          },
          {
            "name": "C4",
            "midi": 60,
            "time": 32.75,
            "velocity": 0.47244094488188976,
            "duration": 0.25
          },
          {
            "name": "C4",
            "midi": 60,
            "time": 33,
            "velocity": 0.44881889763779526,
            "duration": 0.25
          },
          {
            "name": "G#5",
            "midi": 80,
            "time": 33.25,
            "velocity": 0.5905511811023622,
            "duration": 0.25
          },
          {
            "name": "C4",
            "midi": 60,
            "time": 33.25,
            "velocity": 0.47244094488188976,
            "duration": 0.25
          },
          {
            "name": "G5",
            "midi": 79,
            "time": 33.5,
            "velocity": 0.4330708661417323,
            "duration": 0.25
          },
          {
            "name": "C4",
            "midi": 60,
            "time": 33.5,
            "velocity": 0.47244094488188976,
            "duration": 0.25
          },
          {
            "name": "F5",
            "midi": 77,
            "time": 33.75,
            "velocity": 0.44881889763779526,
            "duration": 0.19921875
          },
          {
            "name": "C4",
            "midi": 60,
            "time": 33.75,
            "velocity": 0.44881889763779526,
            "duration": 0.25
          },
          {
            "name": "C6",
            "midi": 84,
            "time": 34,
            "velocity": 0.5511811023622047,
            "duration": 1.25
          },
          {
            "name": "E3",
            "midi": 52,
            "time": 34,
            "velocity": 0.48031496062992124,
            "duration": 0.25
          },
          {
            "name": "G3",
            "midi": 55,
            "time": 34,
            "velocity": 0.48031496062992124,
            "duration": 0.25
          },
          {
            "name": "C4",
            "midi": 60,
            "time": 34,
            "velocity": 0.48031496062992124,
            "duration": 0.25
          },
          {
            "name": "E3",
            "midi": 52,
            "time": 34.25,
            "velocity": 0.49606299212598426,
            "duration": 0.25
          },
          {
            "name": "G3",
            "midi": 55,
            "time": 34.25,
            "velocity": 0.49606299212598426,
            "duration": 0.25
          },
          {
            "name": "C4",
            "midi": 60,
            "time": 34.25,
            "velocity": 0.49606299212598426,
            "duration": 0.25
          },
          {
            "name": "E3",
            "midi": 52,
            "time": 34.5,
            "velocity": 0.48031496062992124,
            "duration": 0.25
          },
          {
            "name": "G3",
            "midi": 55,
            "time": 34.5,
            "velocity": 0.48031496062992124,
            "duration": 0.25
          },
          {
            "name": "C4",
            "midi": 60,
            "time": 34.5,
            "velocity": 0.48031496062992124,
            "duration": 0.25
          },
          {
            "name": "E3",
            "midi": 52,
            "time": 34.75,
            "velocity": 0.47244094488188976,
            "duration": 0.25
          },
          {
            "name": "G3",
            "midi": 55,
            "time": 34.75,
            "velocity": 0.47244094488188976,
            "duration": 0.25
          },
          {
            "name": "C4",
            "midi": 60,
            "time": 34.75,
            "velocity": 0.47244094488188976,
            "duration": 0.25
          },
          {
            "name": "F3",
            "midi": 53,
            "time": 35,
            "velocity": 0.44881889763779526,
            "duration": 0.25
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 35,
            "velocity": 0.44881889763779526,
            "duration": 0.25
          },
          {
            "name": "C4",
            "midi": 60,
            "time": 35,
            "velocity": 0.44881889763779526,
            "duration": 0.25
          },
          {
            "name": "G#5",
            "midi": 80,
            "time": 35.25,
            "velocity": 0.4015748031496063,
            "duration": 0.25
          },
          {
            "name": "F3",
            "midi": 53,
            "time": 35.25,
            "velocity": 0.4251968503937008,
            "duration": 0.25
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 35.25,
            "velocity": 0.4251968503937008,
            "duration": 0.25
          },
          {
            "name": "G5",
            "midi": 79,
            "time": 35.5,
            "velocity": 0.4094488188976378,
            "duration": 0.25
          },
          {
            "name": "F3",
            "midi": 53,
            "time": 35.5,
            "velocity": 0.47244094488188976,
            "duration": 0.25
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 35.5,
            "velocity": 0.47244094488188976,
            "duration": 0.25
          },
          {
            "name": "F5",
            "midi": 77,
            "time": 35.75,
            "velocity": 0.4645669291338583,
            "duration": 0.19921875
          },
          {
            "name": "F3",
            "midi": 53,
            "time": 35.75,
            "velocity": 0.48031496062992124,
            "duration": 0.25
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 35.75,
            "velocity": 0.48031496062992124,
            "duration": 0.25
          },
          {
            "name": "C5",
            "midi": 72,
            "time": 36,
            "velocity": 0.44881889763779526,
            "duration": 1.25
          },
          {
            "name": "G3",
            "midi": 55,
            "time": 36,
            "velocity": 0.5669291338582677,
            "duration": 0.25
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 36,
            "velocity": 0.5669291338582677,
            "duration": 0.25
          },
          {
            "name": "E4",
            "midi": 64,
            "time": 36,
            "velocity": 0.5669291338582677,
            "duration": 0.25
          },
          {
            "name": "G3",
            "midi": 55,
            "time": 36.25,
            "velocity": 0.4566929133858268,
            "duration": 0.25
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 36.25,
            "velocity": 0.4566929133858268,
            "duration": 0.25
          },
          {
            "name": "E4",
            "midi": 64,
            "time": 36.25,
            "velocity": 0.4566929133858268,
            "duration": 0.25
          },
          {
            "name": "G3",
            "midi": 55,
            "time": 36.5,
            "velocity": 0.47244094488188976,
            "duration": 0.25
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 36.5,
            "velocity": 0.47244094488188976,
            "duration": 0.25
          },
          {
            "name": "E4",
            "midi": 64,
            "time": 36.5,
            "velocity": 0.47244094488188976,
            "duration": 0.25
          },
          {
            "name": "G3",
            "midi": 55,
            "time": 36.75,
            "velocity": 0.47244094488188976,
            "duration": 0.25
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 36.75,
            "velocity": 0.47244094488188976,
            "duration": 0.25
          },
          {
            "name": "E4",
            "midi": 64,
            "time": 36.75,
            "velocity": 0.47244094488188976,
            "duration": 0.25
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 37,
            "velocity": 0.5039370078740157,
            "duration": 0.25
          },
          {
            "name": "C4",
            "midi": 60,
            "time": 37,
            "velocity": 0.5039370078740157,
            "duration": 0.25
          },
          {
            "name": "F4",
            "midi": 65,
            "time": 37,
            "velocity": 0.5039370078740157,
            "duration": 0.25
          },
          {
            "name": "G#5",
            "midi": 80,
            "time": 37.25,
            "velocity": 0.5275590551181102,
            "duration": 0.25
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 37.25,
            "velocity": 0.48031496062992124,
            "duration": 0.25
          },
          {
            "name": "C4",
            "midi": 60,
            "time": 37.25,
            "velocity": 0.48031496062992124,
            "duration": 0.25
          },
          {
            "name": "F4",
            "midi": 65,
            "time": 37.25,
            "velocity": 0.48031496062992124,
            "duration": 0.25
          },
          {
            "name": "G5",
            "midi": 79,
            "time": 37.5,
            "velocity": 0.48031496062992124,
            "duration": 0.25
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 37.5,
            "velocity": 0.44881889763779526,
            "duration": 0.25
          },
          {
            "name": "C4",
            "midi": 60,
            "time": 37.5,
            "velocity": 0.44881889763779526,
            "duration": 0.25
          },
          {
            "name": "F4",
            "midi": 65,
            "time": 37.5,
            "velocity": 0.44881889763779526,
            "duration": 0.25
          },
          {
            "name": "F5",
            "midi": 77,
            "time": 37.75,
            "velocity": 0.4409448818897638,
            "duration": 0.19921875
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 37.75,
            "velocity": 0.49606299212598426,
            "duration": 0.25
          },
          {
            "name": "C4",
            "midi": 60,
            "time": 37.75,
            "velocity": 0.49606299212598426,
            "duration": 0.25
          },
          {
            "name": "F4",
            "midi": 65,
            "time": 37.75,
            "velocity": 0.49606299212598426,
            "duration": 0.25
          },
          {
            "name": "D#5",
            "midi": 75,
            "time": 38,
            "velocity": 0.4251968503937008,
            "duration": 0.5
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 38,
            "velocity": 0.4881889763779528,
            "duration": 0.25
          },
          {
            "name": "F4",
            "midi": 65,
            "time": 38,
            "velocity": 0.4881889763779528,
            "duration": 0.25
          },
          {
            "name": "G#4",
            "midi": 68,
            "time": 38,
            "velocity": 0.4881889763779528,
            "duration": 0.25
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 38.25,
            "velocity": 0.49606299212598426,
            "duration": 0.25
          },
          {
            "name": "F4",
            "midi": 65,
            "time": 38.25,
            "velocity": 0.49606299212598426,
            "duration": 0.25
          },
          {
            "name": "G#4",
            "midi": 68,
            "time": 38.25,
            "velocity": 0.49606299212598426,
            "duration": 0.25
          },
          {
            "name": "D5",
            "midi": 74,
            "time": 38.5,
            "velocity": 0.4566929133858268,
            "duration": 1
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 38.5,
            "velocity": 0.4409448818897638,
            "duration": 0.25
          },
          {
            "name": "F4",
            "midi": 65,
            "time": 38.5,
            "velocity": 0.4409448818897638,
            "duration": 0.25
          },
          {
            "name": "G#4",
            "midi": 68,
            "time": 38.5,
            "velocity": 0.4409448818897638,
            "duration": 0.25
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 38.75,
            "velocity": 0.4566929133858268,
            "duration": 0.25
          },
          {
            "name": "F4",
            "midi": 65,
            "time": 38.75,
            "velocity": 0.4566929133858268,
            "duration": 0.25
          },
          {
            "name": "G#4",
            "midi": 68,
            "time": 38.75,
            "velocity": 0.4566929133858268,
            "duration": 0.25
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 39,
            "velocity": 0.4645669291338583,
            "duration": 0.25
          },
          {
            "name": "F4",
            "midi": 65,
            "time": 39,
            "velocity": 0.4645669291338583,
            "duration": 0.25
          },
          {
            "name": "G#4",
            "midi": 68,
            "time": 39,
            "velocity": 0.4645669291338583,
            "duration": 0.25
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 39.25,
            "velocity": 0.47244094488188976,
            "duration": 0.25
          },
          {
            "name": "F4",
            "midi": 65,
            "time": 39.25,
            "velocity": 0.47244094488188976,
            "duration": 0.25
          },
          {
            "name": "G#4",
            "midi": 68,
            "time": 39.25,
            "velocity": 0.47244094488188976,
            "duration": 0.25
          },
          {
            "name": "F5",
            "midi": 77,
            "time": 39.5,
            "velocity": 0.5275590551181102,
            "duration": 0.375
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 39.5,
            "velocity": 0.47244094488188976,
            "duration": 0.25
          },
          {
            "name": "D4",
            "midi": 62,
            "time": 39.5,
            "velocity": 0.47244094488188976,
            "duration": 0.25
          },
          {
            "name": "G#4",
            "midi": 68,
            "time": 39.5,
            "velocity": 0.47244094488188976,
            "duration": 0.25
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 39.75,
            "velocity": 0.4566929133858268,
            "duration": 0.25
          },
          {
            "name": "D4",
            "midi": 62,
            "time": 39.75,
            "velocity": 0.4566929133858268,
            "duration": 0.25
          },
          {
            "name": "G#4",
            "midi": 68,
            "time": 39.75,
            "velocity": 0.4566929133858268,
            "duration": 0.25
          },
          {
            "name": "D#5",
            "midi": 75,
            "time": 39.875,
            "velocity": 0.4566929133858268,
            "duration": 0.09765625
          },
          {
            "name": "D#5",
            "midi": 75,
            "time": 40,
            "velocity": 0.48031496062992124,
            "duration": 1
          },
          {
            "name": "C4",
            "midi": 60,
            "time": 40,
            "velocity": 0.4645669291338583,
            "duration": 0.25
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 40,
            "velocity": 0.4645669291338583,
            "duration": 0.25
          },
          {
            "name": "G4",
            "midi": 67,
            "time": 40,
            "velocity": 0.4645669291338583,
            "duration": 0.25
          },
          {
            "name": "C4",
            "midi": 60,
            "time": 40.25,
            "velocity": 0.4566929133858268,
            "duration": 0.25
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 40.25,
            "velocity": 0.4566929133858268,
            "duration": 0.25
          },
          {
            "name": "G4",
            "midi": 67,
            "time": 40.25,
            "velocity": 0.4566929133858268,
            "duration": 0.25
          },
          {
            "name": "C4",
            "midi": 60,
            "time": 40.5,
            "velocity": 0.4566929133858268,
            "duration": 0.25
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 40.5,
            "velocity": 0.4566929133858268,
            "duration": 0.25
          },
          {
            "name": "G4",
            "midi": 67,
            "time": 40.5,
            "velocity": 0.4566929133858268,
            "duration": 0.25
          },
          {
            "name": "C4",
            "midi": 60,
            "time": 40.75,
            "velocity": 0.48031496062992124,
            "duration": 0.25
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 40.75,
            "velocity": 0.48031496062992124,
            "duration": 0.25
          },
          {
            "name": "G4",
            "midi": 67,
            "time": 40.75,
            "velocity": 0.48031496062992124,
            "duration": 0.25
          },
          {
            "name": "F4",
            "midi": 65,
            "time": 41,
            "velocity": 0.3228346456692913,
            "duration": 0.75
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 41,
            "velocity": 0.4251968503937008,
            "duration": 0.25
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 41,
            "velocity": 0.4251968503937008,
            "duration": 0.25
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 41.25,
            "velocity": 0.4409448818897638,
            "duration": 0.25
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 41.25,
            "velocity": 0.4409448818897638,
            "duration": 0.25
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 41.5,
            "velocity": 0.48031496062992124,
            "duration": 0.25
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 41.5,
            "velocity": 0.48031496062992124,
            "duration": 0.25
          },
          {
            "name": "G#4",
            "midi": 68,
            "time": 41.75,
            "velocity": 0.5118110236220472,
            "duration": 0.1171875
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 41.75,
            "velocity": 0.4566929133858268,
            "duration": 0.25
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 41.75,
            "velocity": 0.4566929133858268,
            "duration": 0.25
          },
          {
            "name": "B4",
            "midi": 71,
            "time": 41.8671875,
            "velocity": 0.4881889763779528,
            "duration": 0.04296875
          },
          {
            "name": "C5",
            "midi": 72,
            "time": 41.91015625,
            "velocity": 0.5196850393700787,
            "duration": 0.046875
          },
          {
            "name": "D5",
            "midi": 74,
            "time": 41.95703125,
            "velocity": 0.5039370078740157,
            "duration": 0.04296875
          },
          {
            "name": "C5",
            "midi": 72,
            "time": 42,
            "velocity": 0.44881889763779526,
            "duration": 0.09765625
          },
          {
            "name": "A#4",
            "midi": 70,
            "time": 42.125,
            "velocity": 0.4251968503937008,
            "duration": 0.09765625
          },
          {
            "name": "G5",
            "midi": 79,
            "time": 42.25,
            "velocity": 0.5669291338582677,
            "duration": 0.5
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 42.25,
            "velocity": 0.41732283464566927,
            "duration": 0.25
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 42.25,
            "velocity": 0.41732283464566927,
            "duration": 0.25
          },
          {
            "name": "G4",
            "midi": 67,
            "time": 42.25,
            "velocity": 0.41732283464566927,
            "duration": 0.25
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 42.5,
            "velocity": 0.4566929133858268,
            "duration": 0.25
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 42.5,
            "velocity": 0.4566929133858268,
            "duration": 0.25
          },
          {
            "name": "G4",
            "midi": 67,
            "time": 42.5,
            "velocity": 0.4566929133858268,
            "duration": 0.25
          },
          {
            "name": "F5",
            "midi": 77,
            "time": 42.75,
            "velocity": 0.4330708661417323,
            "duration": 0.125
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 42.75,
            "velocity": 0.5039370078740157,
            "duration": 0.25
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 42.75,
            "velocity": 0.5039370078740157,
            "duration": 0.25
          },
          {
            "name": "G4",
            "midi": 67,
            "time": 42.75,
            "velocity": 0.5039370078740157,
            "duration": 0.25
          },
          {
            "name": "D#5",
            "midi": 75,
            "time": 42.875,
            "velocity": 0.44881889763779526,
            "duration": 0.125
          },
          {
            "name": "D5",
            "midi": 74,
            "time": 43,
            "velocity": 0.41732283464566927,
            "duration": 0.125
          },
          {
            "name": "C5",
            "midi": 72,
            "time": 43.125,
            "velocity": 0.4251968503937008,
            "duration": 0.125
          },
          {
            "name": "A#4",
            "midi": 70,
            "time": 43.25,
            "velocity": 0.4566929133858268,
            "duration": 0.125
          },
          {
            "name": "A#2",
            "midi": 46,
            "time": 43.25,
            "velocity": 0.4094488188976378,
            "duration": 0.25
          },
          {
            "name": "D3",
            "midi": 50,
            "time": 43.25,
            "velocity": 0.4094488188976378,
            "duration": 0.25
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 43.25,
            "velocity": 0.4094488188976378,
            "duration": 0.25
          },
          {
            "name": "A4",
            "midi": 69,
            "time": 43.375,
            "velocity": 0.47244094488188976,
            "duration": 0.125
          },
          {
            "name": "C5",
            "midi": 72,
            "time": 43.5,
            "velocity": 0.5118110236220472,
            "duration": 0.125
          },
          {
            "name": "A#2",
            "midi": 46,
            "time": 43.5,
            "velocity": 0.4409448818897638,
            "duration": 0.25
          },
          {
            "name": "D3",
            "midi": 50,
            "time": 43.5,
            "velocity": 0.4409448818897638,
            "duration": 0.25
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 43.5,
            "velocity": 0.4409448818897638,
            "duration": 0.25
          },
          {
            "name": "A#4",
            "midi": 70,
            "time": 43.625,
            "velocity": 0.48031496062992124,
            "duration": 0.125
          },
          {
            "name": "G#4",
            "midi": 68,
            "time": 43.75,
            "velocity": 0.41732283464566927,
            "duration": 0.125
          },
          {
            "name": "A#2",
            "midi": 46,
            "time": 43.75,
            "velocity": 0.5196850393700787,
            "duration": 0.25
          },
          {
            "name": "D3",
            "midi": 50,
            "time": 43.75,
            "velocity": 0.5196850393700787,
            "duration": 0.25
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 43.75,
            "velocity": 0.5196850393700787,
            "duration": 0.25
          },
          {
            "name": "F4",
            "midi": 65,
            "time": 43.875,
            "velocity": 0.4251968503937008,
            "duration": 0.09765625
          },
          {
            "name": "G3",
            "midi": 55,
            "time": 44,
            "velocity": 0.4409448818897638,
            "duration": 0.5
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 44,
            "velocity": 0.48031496062992124,
            "duration": 0.5
          },
          {
            "name": "G3",
            "midi": 55,
            "time": 44,
            "velocity": 0.48031496062992124,
            "duration": 0.5
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 44.75,
            "velocity": 0.44881889763779526,
            "duration": 0.25
          },
          {
            "name": "G3",
            "midi": 55,
            "time": 45,
            "velocity": 0.4566929133858268,
            "duration": 0.25
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 45.25,
            "velocity": 0.4881889763779528,
            "duration": 0.25
          },
          {
            "name": "G3",
            "midi": 55,
            "time": 45.5,
            "velocity": 0.48031496062992124,
            "duration": 0.25
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 45.75,
            "velocity": 0.44881889763779526,
            "duration": 0.19921875
          },
          {
            "name": "F3",
            "midi": 53,
            "time": 46,
            "velocity": 0.47244094488188976,
            "duration": 0.40234375
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 46,
            "velocity": 0.47244094488188976,
            "duration": 0.40234375
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 46,
            "velocity": 0.4015748031496063,
            "duration": 0.25
          },
          {
            "name": "A#1",
            "midi": 34,
            "time": 46,
            "velocity": 0.4645669291338583,
            "duration": 2
          },
          {
            "name": "D3",
            "midi": 50,
            "time": 46.25,
            "velocity": 0.49606299212598426,
            "duration": 0.19921875
          },
          {
            "name": "F3",
            "midi": 53,
            "time": 46.5,
            "velocity": 0.4645669291338583,
            "duration": 0.40234375
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 46.5,
            "velocity": 0.4645669291338583,
            "duration": 0.40234375
          },
          {
            "name": "D3",
            "midi": 50,
            "time": 46.5,
            "velocity": 0.44881889763779526,
            "duration": 0.25
          },
          {
            "name": "C3",
            "midi": 48,
            "time": 46.75,
            "velocity": 0.4645669291338583,
            "duration": 0.19921875
          },
          {
            "name": "F3",
            "midi": 53,
            "time": 47,
            "velocity": 0.4409448818897638,
            "duration": 0.40234375
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 47,
            "velocity": 0.4409448818897638,
            "duration": 0.40234375
          },
          {
            "name": "C3",
            "midi": 48,
            "time": 47,
            "velocity": 0.47244094488188976,
            "duration": 0.25
          },
          {
            "name": "B2",
            "midi": 47,
            "time": 47.25,
            "velocity": 0.47244094488188976,
            "duration": 0.19921875
          },
          {
            "name": "F3",
            "midi": 53,
            "time": 47.5,
            "velocity": 0.4409448818897638,
            "duration": 0.40234375
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 47.5,
            "velocity": 0.4409448818897638,
            "duration": 0.40234375
          },
          {
            "name": "B2",
            "midi": 47,
            "time": 47.5,
            "velocity": 0.48031496062992124,
            "duration": 0.25
          },
          {
            "name": "A#2",
            "midi": 46,
            "time": 47.75,
            "velocity": 0.4645669291338583,
            "duration": 0.19921875
          },
          {
            "name": "A#2",
            "midi": 46,
            "time": 48,
            "velocity": 0.4645669291338583,
            "duration": 0.5
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 48,
            "velocity": 0.4645669291338583,
            "duration": 0.5
          },
          {
            "name": "G3",
            "midi": 55,
            "time": 48,
            "velocity": 0.4645669291338583,
            "duration": 0.5
          },
          {
            "name": "D#2",
            "midi": 39,
            "time": 48,
            "velocity": 0.5039370078740157,
            "duration": 0.5
          },
          {
            "name": "A#2",
            "midi": 46,
            "time": 48.75,
            "velocity": 0.41732283464566927,
            "duration": 0.25
          },
          {
            "name": "G2",
            "midi": 43,
            "time": 49,
            "velocity": 0.4409448818897638,
            "duration": 0.25
          },
          {
            "name": "A#2",
            "midi": 46,
            "time": 49.25,
            "velocity": 0.5039370078740157,
            "duration": 0.25
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 49.5,
            "velocity": 0.4330708661417323,
            "duration": 0.375
          },
          {
            "name": "G2",
            "midi": 43,
            "time": 49.5,
            "velocity": 0.4645669291338583,
            "duration": 0.25
          },
          {
            "name": "D#2",
            "midi": 39,
            "time": 49.75,
            "velocity": 0.4330708661417323,
            "duration": 0.19921875
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 49.875,
            "velocity": 0.5433070866141733,
            "duration": 0.09765625
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 50,
            "velocity": 0.48031496062992124,
            "duration": 0.25
          },
          {
            "name": "F3",
            "midi": 53,
            "time": 50,
            "velocity": 0.5118110236220472,
            "duration": 0.90234375
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 50,
            "velocity": 0.5118110236220472,
            "duration": 0.90234375
          },
          {
            "name": "A#1",
            "midi": 34,
            "time": 50,
            "velocity": 0.4409448818897638,
            "duration": 1
          },
          {
            "name": "D4",
            "midi": 62,
            "time": 50.25,
            "velocity": 0.49606299212598426,
            "duration": 0.19921875
          },
          {
            "name": "D4",
            "midi": 62,
            "time": 50.5,
            "velocity": 0.4566929133858268,
            "duration": 0.25
          },
          {
            "name": "C4",
            "midi": 60,
            "time": 50.75,
            "velocity": 0.5275590551181102,
            "duration": 0.19921875
          },
          {
            "name": "C4",
            "midi": 60,
            "time": 51,
            "velocity": 0.49606299212598426,
            "duration": 0.25
          },
          {
            "name": "F3",
            "midi": 53,
            "time": 51,
            "velocity": 0.47244094488188976,
            "duration": 0.90234375
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 51,
            "velocity": 0.47244094488188976,
            "duration": 0.90234375
          },
          {
            "name": "A#2",
            "midi": 46,
            "time": 51,
            "velocity": 0.5590551181102362,
            "duration": 1
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 51.25,
            "velocity": 0.44881889763779526,
            "duration": 0.19921875
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 51.5,
            "velocity": 0.4881889763779528,
            "duration": 0.25
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 51.75,
            "velocity": 0.5118110236220472,
            "duration": 0.19921875
          },
          {
            "name": "G3",
            "midi": 55,
            "time": 52,
            "velocity": 0.5039370078740157,
            "duration": 3.90234375
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 52,
            "velocity": 0.5039370078740157,
            "duration": 6
          },
          {
            "name": "F3",
            "midi": 53,
            "time": 52,
            "velocity": 0.4330708661417323,
            "duration": 0.25
          },
          {
            "name": "D#2",
            "midi": 39,
            "time": 52,
            "velocity": 0.44881889763779526,
            "duration": 4
          },
          {
            "name": "E3",
            "midi": 52,
            "time": 52.25,
            "velocity": 0.4566929133858268,
            "duration": 0.19921875
          },
          {
            "name": "E3",
            "midi": 52,
            "time": 52.5,
            "velocity": 0.5196850393700787,
            "duration": 0.25
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 52.75,
            "velocity": 0.5590551181102362,
            "duration": 0.19921875
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 53,
            "velocity": 0.6299212598425197,
            "duration": 0.25
          },
          {
            "name": "D3",
            "midi": 50,
            "time": 53.25,
            "velocity": 0.6456692913385826,
            "duration": 0.19921875
          },
          {
            "name": "D3",
            "midi": 50,
            "time": 53.5,
            "velocity": 0.7086614173228346,
            "duration": 0.25
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 53.75,
            "velocity": 0.7795275590551181,
            "duration": 0.19921875
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 54,
            "velocity": 0.7637795275590551,
            "duration": 0.25
          },
          {
            "name": "E3",
            "midi": 52,
            "time": 54.25,
            "velocity": 0.7401574803149606,
            "duration": 0.19921875
          },
          {
            "name": "E3",
            "midi": 52,
            "time": 54.5,
            "velocity": 0.7086614173228346,
            "duration": 0.25
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 54.75,
            "velocity": 0.5984251968503937,
            "duration": 0.19921875
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 55,
            "velocity": 0.3937007874015748,
            "duration": 0.25
          },
          {
            "name": "D3",
            "midi": 50,
            "time": 55.25,
            "velocity": 0.3700787401574803,
            "duration": 0.19921875
          },
          {
            "name": "D3",
            "midi": 50,
            "time": 55.5,
            "velocity": 0.3779527559055118,
            "duration": 0.25
          },
          {
            "name": "C#3",
            "midi": 49,
            "time": 55.75,
            "velocity": 0.33858267716535434,
            "duration": 0.19921875
          },
          {
            "name": "C4",
            "midi": 60,
            "time": 56,
            "velocity": 0.49606299212598426,
            "duration": 1
          },
          {
            "name": "C3",
            "midi": 48,
            "time": 56,
            "velocity": 0.5039370078740157,
            "duration": 0.25
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 56,
            "velocity": 0.5039370078740157,
            "duration": 0.25
          },
          {
            "name": "G#1",
            "midi": 32,
            "time": 56,
            "velocity": 0.5196850393700787,
            "duration": 1
          },
          {
            "name": "G#2",
            "midi": 44,
            "time": 56,
            "velocity": 0.5196850393700787,
            "duration": 1
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 56.25,
            "velocity": 0.4409448818897638,
            "duration": 0.25
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 56.5,
            "velocity": 0.5118110236220472,
            "duration": 0.25
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 56.75,
            "velocity": 0.48031496062992124,
            "duration": 0.25
          },
          {
            "name": "G3",
            "midi": 55,
            "time": 57,
            "velocity": 0.48031496062992124,
            "duration": 0.25
          },
          {
            "name": "C#3",
            "midi": 49,
            "time": 57,
            "velocity": 0.5511811023622047,
            "duration": 1
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 57.25,
            "velocity": 0.48031496062992124,
            "duration": 0.25
          },
          {
            "name": "G3",
            "midi": 55,
            "time": 57.5,
            "velocity": 0.47244094488188976,
            "duration": 0.25
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 57.75,
            "velocity": 0.4566929133858268,
            "duration": 0.25
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 58,
            "velocity": 0.5826771653543307,
            "duration": 1.5
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 58,
            "velocity": 0.5275590551181102,
            "duration": 0.25
          },
          {
            "name": "C3",
            "midi": 48,
            "time": 58,
            "velocity": 0.48031496062992124,
            "duration": 1
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 58.25,
            "velocity": 0.44881889763779526,
            "duration": 0.25
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 58.5,
            "velocity": 0.5196850393700787,
            "duration": 0.25
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 58.75,
            "velocity": 0.3937007874015748,
            "duration": 0.25
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 59,
            "velocity": 0.5118110236220472,
            "duration": 0.25
          },
          {
            "name": "G2",
            "midi": 43,
            "time": 59,
            "velocity": 0.4409448818897638,
            "duration": 0.90234375
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 59.25,
            "velocity": 0.47244094488188976,
            "duration": 0.25
          },
          {
            "name": "C#4",
            "midi": 61,
            "time": 59.5,
            "velocity": 0.48031496062992124,
            "duration": 0.40234375
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 59.5,
            "velocity": 0.5039370078740157,
            "duration": 0.19921875
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 59.75,
            "velocity": 0.41732283464566927,
            "duration": 0.25
          },
          {
            "name": "C4",
            "midi": 60,
            "time": 60,
            "velocity": 0.48031496062992124,
            "duration": 0.5
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 60,
            "velocity": 0.49606299212598426,
            "duration": 0.25
          },
          {
            "name": "G#2",
            "midi": 44,
            "time": 60,
            "velocity": 0.5196850393700787,
            "duration": 0.5
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 60.25,
            "velocity": 0.44881889763779526,
            "duration": 0.25
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 60.5,
            "velocity": 0.5118110236220472,
            "duration": 0.5
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 60.5,
            "velocity": 0.5669291338582677,
            "duration": 0.25
          },
          {
            "name": "G2",
            "midi": 43,
            "time": 60.5,
            "velocity": 0.41732283464566927,
            "duration": 0.5
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 60.75,
            "velocity": 0.41732283464566927,
            "duration": 0.25
          },
          {
            "name": "G#4",
            "midi": 68,
            "time": 61,
            "velocity": 0.5118110236220472,
            "duration": 0.5
          },
          {
            "name": "C4",
            "midi": 60,
            "time": 61,
            "velocity": 0.6062992125984252,
            "duration": 0.25
          },
          {
            "name": "F2",
            "midi": 41,
            "time": 61,
            "velocity": 0.4881889763779528,
            "duration": 0.5
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 61.25,
            "velocity": 0.4251968503937008,
            "duration": 0.25
          },
          {
            "name": "A#4",
            "midi": 70,
            "time": 61.5,
            "velocity": 0.5275590551181102,
            "duration": 0.3203125
          },
          {
            "name": "D4",
            "midi": 62,
            "time": 61.5,
            "velocity": 0.5511811023622047,
            "duration": 0.19921875
          },
          {
            "name": "F3",
            "midi": 53,
            "time": 61.5,
            "velocity": 0.5511811023622047,
            "duration": 0.40234375
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 61.75,
            "velocity": 0.44881889763779526,
            "duration": 0.19921875
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 62,
            "velocity": 0.4015748031496063,
            "duration": 1.5
          },
          {
            "name": "G3",
            "midi": 55,
            "time": 62,
            "velocity": 0.4409448818897638,
            "duration": 0.25
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 62,
            "velocity": 0.4330708661417323,
            "duration": 1
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 62.25,
            "velocity": 0.4566929133858268,
            "duration": 0.25
          },
          {
            "name": "G3",
            "midi": 55,
            "time": 62.5,
            "velocity": 0.47244094488188976,
            "duration": 0.25
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 62.75,
            "velocity": 0.49606299212598426,
            "duration": 0.25
          },
          {
            "name": "G3",
            "midi": 55,
            "time": 63,
            "velocity": 0.4566929133858268,
            "duration": 0.25
          },
          {
            "name": "D#2",
            "midi": 39,
            "time": 63,
            "velocity": 0.4409448818897638,
            "duration": 1
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 63.25,
            "velocity": 0.4881889763779528,
            "duration": 0.25
          },
          {
            "name": "E4",
            "midi": 64,
            "time": 63.5,
            "velocity": 0.4566929133858268,
            "duration": 0.5
          },
          {
            "name": "G3",
            "midi": 55,
            "time": 63.5,
            "velocity": 0.4409448818897638,
            "duration": 0.25
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 63.75,
            "velocity": 0.5275590551181102,
            "duration": 0.25
          },
          {
            "name": "F4",
            "midi": 65,
            "time": 64,
            "velocity": 0.48031496062992124,
            "duration": 0.90234375
          },
          {
            "name": "G3",
            "midi": 55,
            "time": 64,
            "velocity": 0.4566929133858268,
            "duration": 0.19921875
          },
          {
            "name": "C#2",
            "midi": 37,
            "time": 64,
            "velocity": 0.47244094488188976,
            "duration": 1
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 64.25,
            "velocity": 0.4409448818897638,
            "duration": 0.25
          },
          {
            "name": "G3",
            "midi": 55,
            "time": 64.5,
            "velocity": 0.44881889763779526,
            "duration": 0.25
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 64.75,
            "velocity": 0.49606299212598426,
            "duration": 0.25
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 65,
            "velocity": 0.4645669291338583,
            "duration": 0.75
          },
          {
            "name": "G3",
            "midi": 55,
            "time": 65,
            "velocity": 0.4645669291338583,
            "duration": 0.25
          },
          {
            "name": "C#3",
            "midi": 49,
            "time": 65,
            "velocity": 0.5354330708661418,
            "duration": 0.90234375
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 65.25,
            "velocity": 0.44881889763779526,
            "duration": 0.25
          },
          {
            "name": "G3",
            "midi": 55,
            "time": 65.5,
            "velocity": 0.5196850393700787,
            "duration": 0.25
          },
          {
            "name": "C4",
            "midi": 60,
            "time": 65.75,
            "velocity": 0.47244094488188976,
            "duration": 0.125
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 65.75,
            "velocity": 0.4566929133858268,
            "duration": 0.19921875
          },
          {
            "name": "C#4",
            "midi": 61,
            "time": 65.875,
            "velocity": 0.4645669291338583,
            "duration": 0.09765625
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 66,
            "velocity": 0.5354330708661418,
            "duration": 1
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 66,
            "velocity": 0.5196850393700787,
            "duration": 0.25
          },
          {
            "name": "C3",
            "midi": 48,
            "time": 66,
            "velocity": 0.48031496062992124,
            "duration": 1
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 66.25,
            "velocity": 0.4251968503937008,
            "duration": 0.25
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 66.5,
            "velocity": 0.48031496062992124,
            "duration": 0.25
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 66.75,
            "velocity": 0.4094488188976378,
            "duration": 0.25
          },
          {
            "name": "A3",
            "midi": 57,
            "time": 67,
            "velocity": 0.4251968503937008,
            "duration": 1
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 67,
            "velocity": 0.5039370078740157,
            "duration": 0.25
          },
          {
            "name": "F2",
            "midi": 41,
            "time": 67,
            "velocity": 0.4409448818897638,
            "duration": 1
          },
          {
            "name": "C3",
            "midi": 48,
            "time": 67.25,
            "velocity": 0.4251968503937008,
            "duration": 0.25
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 67.5,
            "velocity": 0.47244094488188976,
            "duration": 0.25
          },
          {
            "name": "C3",
            "midi": 48,
            "time": 67.75,
            "velocity": 0.41732283464566927,
            "duration": 0.25
          },
          {
            "name": "C#4",
            "midi": 61,
            "time": 68,
            "velocity": 0.5118110236220472,
            "duration": 0.90234375
          },
          {
            "name": "F3",
            "midi": 53,
            "time": 68,
            "velocity": 0.5354330708661418,
            "duration": 0.19921875
          },
          {
            "name": "A#1",
            "midi": 34,
            "time": 68,
            "velocity": 0.4330708661417323,
            "duration": 1
          },
          {
            "name": "C#3",
            "midi": 49,
            "time": 68.25,
            "velocity": 0.4566929133858268,
            "duration": 0.25
          },
          {
            "name": "F3",
            "midi": 53,
            "time": 68.5,
            "velocity": 0.49606299212598426,
            "duration": 0.25
          },
          {
            "name": "C#3",
            "midi": 49,
            "time": 68.75,
            "velocity": 0.44881889763779526,
            "duration": 0.25
          },
          {
            "name": "C4",
            "midi": 60,
            "time": 69,
            "velocity": 0.4409448818897638,
            "duration": 0.12109375
          },
          {
            "name": "C#3",
            "midi": 49,
            "time": 69,
            "velocity": 0.48031496062992124,
            "duration": 0.25
          },
          {
            "name": "D#2",
            "midi": 39,
            "time": 69,
            "velocity": 0.4881889763779528,
            "duration": 0.90234375
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 69.25,
            "velocity": 0.4409448818897638,
            "duration": 0.12109375
          },
          {
            "name": "C#3",
            "midi": 49,
            "time": 69.25,
            "velocity": 0.48031496062992124,
            "duration": 0.25
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 69.5,
            "velocity": 0.4251968503937008,
            "duration": 0.12109375
          },
          {
            "name": "C#3",
            "midi": 49,
            "time": 69.5,
            "velocity": 0.47244094488188976,
            "duration": 0.25
          },
          {
            "name": "G3",
            "midi": 55,
            "time": 69.75,
            "velocity": 0.44881889763779526,
            "duration": 0.09375
          },
          {
            "name": "C#3",
            "midi": 49,
            "time": 69.75,
            "velocity": 0.47244094488188976,
            "duration": 0.19921875
          },
          {
            "name": "G3",
            "midi": 55,
            "time": 70,
            "velocity": 0.48031496062992124,
            "duration": 1
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 70,
            "velocity": 0.48031496062992124,
            "duration": 1
          },
          {
            "name": "C#3",
            "midi": 49,
            "time": 70,
            "velocity": 0.47244094488188976,
            "duration": 0.25
          },
          {
            "name": "G#1",
            "midi": 32,
            "time": 70,
            "velocity": 0.4645669291338583,
            "duration": 0.5
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 70.25,
            "velocity": 0.5118110236220472,
            "duration": 0.25
          },
          {
            "name": "C#3",
            "midi": 49,
            "time": 70.5,
            "velocity": 0.48031496062992124,
            "duration": 0.25
          },
          {
            "name": "G#2",
            "midi": 44,
            "time": 70.5,
            "velocity": 0.5039370078740157,
            "duration": 0.5
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 70.75,
            "velocity": 0.5275590551181102,
            "duration": 0.25
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 71,
            "velocity": 0.4645669291338583,
            "duration": 0.3203125
          },
          {
            "name": "C3",
            "midi": 48,
            "time": 71,
            "velocity": 0.4566929133858268,
            "duration": 0.3203125
          },
          {
            "name": "G#1",
            "midi": 32,
            "time": 71,
            "velocity": 0.4251968503937008,
            "duration": 0.5
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 71.5,
            "velocity": 0.5669291338582677,
            "duration": 0.5
          },
          {
            "name": "G#4",
            "midi": 68,
            "time": 72,
            "velocity": 0.5748031496062992,
            "duration": 0.5
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 72,
            "velocity": 0.47244094488188976,
            "duration": 0.1640625
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 72,
            "velocity": 0.47244094488188976,
            "duration": 0.1640625
          },
          {
            "name": "G#2",
            "midi": 44,
            "time": 72,
            "velocity": 0.4330708661417323,
            "duration": 1
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 72,
            "velocity": 0.4330708661417323,
            "duration": 1
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 72.1640625,
            "velocity": 0.3858267716535433,
            "duration": 0.16796875
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 72.1640625,
            "velocity": 0.3858267716535433,
            "duration": 0.16796875
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 72.33203125,
            "velocity": 0.3858267716535433,
            "duration": 0.16796875
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 72.33203125,
            "velocity": 0.3858267716535433,
            "duration": 0.16796875
          },
          {
            "name": "B4",
            "midi": 71,
            "time": 72.5,
            "velocity": 0.5275590551181102,
            "duration": 0.5
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 72.5,
            "velocity": 0.41732283464566927,
            "duration": 0.1640625
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 72.5,
            "velocity": 0.41732283464566927,
            "duration": 0.1640625
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 72.6640625,
            "velocity": 0.3700787401574803,
            "duration": 0.16796875
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 72.6640625,
            "velocity": 0.3700787401574803,
            "duration": 0.16796875
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 72.83203125,
            "velocity": 0.4251968503937008,
            "duration": 0.16796875
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 72.83203125,
            "velocity": 0.4251968503937008,
            "duration": 0.16796875
          },
          {
            "name": "A#4",
            "midi": 70,
            "time": 73,
            "velocity": 0.47244094488188976,
            "duration": 0.5
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 73,
            "velocity": 0.41732283464566927,
            "duration": 0.1640625
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 73,
            "velocity": 0.41732283464566927,
            "duration": 0.1640625
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 73.1640625,
            "velocity": 0.4015748031496063,
            "duration": 0.16796875
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 73.1640625,
            "velocity": 0.4015748031496063,
            "duration": 0.16796875
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 73.33203125,
            "velocity": 0.4094488188976378,
            "duration": 0.16796875
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 73.33203125,
            "velocity": 0.4094488188976378,
            "duration": 0.16796875
          },
          {
            "name": "G#4",
            "midi": 68,
            "time": 73.5,
            "velocity": 0.48031496062992124,
            "duration": 0.40234375
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 73.5,
            "velocity": 0.3779527559055118,
            "duration": 0.12890625
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 73.5,
            "velocity": 0.3779527559055118,
            "duration": 0.12890625
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 73.6640625,
            "velocity": 0.4015748031496063,
            "duration": 0.16796875
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 73.6640625,
            "velocity": 0.4015748031496063,
            "duration": 0.16796875
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 73.83203125,
            "velocity": 0.3937007874015748,
            "duration": 0.16796875
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 73.83203125,
            "velocity": 0.3937007874015748,
            "duration": 0.16796875
          },
          {
            "name": "G4",
            "midi": 67,
            "time": 74,
            "velocity": 0.4409448818897638,
            "duration": 0.5
          },
          {
            "name": "C#4",
            "midi": 61,
            "time": 74,
            "velocity": 0.3700787401574803,
            "duration": 0.1640625
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 74,
            "velocity": 0.3700787401574803,
            "duration": 0.1640625
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 74,
            "velocity": 0.4251968503937008,
            "duration": 0.6640625
          },
          {
            "name": "C#4",
            "midi": 61,
            "time": 74.1640625,
            "velocity": 0.3779527559055118,
            "duration": 0.16796875
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 74.1640625,
            "velocity": 0.3779527559055118,
            "duration": 0.16796875
          },
          {
            "name": "C#4",
            "midi": 61,
            "time": 74.33203125,
            "velocity": 0.4094488188976378,
            "duration": 0.16796875
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 74.33203125,
            "velocity": 0.4094488188976378,
            "duration": 0.16796875
          },
          {
            "name": "C#5",
            "midi": 73,
            "time": 74.5,
            "velocity": 0.5826771653543307,
            "duration": 0.40234375
          },
          {
            "name": "C#4",
            "midi": 61,
            "time": 74.5,
            "velocity": 0.36220472440944884,
            "duration": 0.12890625
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 74.5,
            "velocity": 0.36220472440944884,
            "duration": 0.12890625
          },
          {
            "name": "C#4",
            "midi": 61,
            "time": 74.6640625,
            "velocity": 0.3858267716535433,
            "duration": 0.16796875
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 74.6640625,
            "velocity": 0.3858267716535433,
            "duration": 0.16796875
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 74.6640625,
            "velocity": 0.5039370078740157,
            "duration": 0.16796875
          },
          {
            "name": "C#4",
            "midi": 61,
            "time": 74.83203125,
            "velocity": 0.3700787401574803,
            "duration": 0.16796875
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 74.83203125,
            "velocity": 0.3700787401574803,
            "duration": 0.16796875
          },
          {
            "name": "A3",
            "midi": 57,
            "time": 74.83203125,
            "velocity": 0.4330708661417323,
            "duration": 0.1328125
          },
          {
            "name": "C#4",
            "midi": 61,
            "time": 75,
            "velocity": 0.36220472440944884,
            "duration": 0.1640625
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 75,
            "velocity": 0.36220472440944884,
            "duration": 0.1640625
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 75,
            "velocity": 0.4645669291338583,
            "duration": 0.078125
          },
          {
            "name": "C#4",
            "midi": 61,
            "time": 75.1640625,
            "velocity": 0.4094488188976378,
            "duration": 0.16796875
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 75.1640625,
            "velocity": 0.4094488188976378,
            "duration": 0.16796875
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 75.1640625,
            "velocity": 0.4881889763779528,
            "duration": 0.08203125
          },
          {
            "name": "C#4",
            "midi": 61,
            "time": 75.33203125,
            "velocity": 0.3700787401574803,
            "duration": 0.16796875
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 75.33203125,
            "velocity": 0.3700787401574803,
            "duration": 0.16796875
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 75.33203125,
            "velocity": 0.4645669291338583,
            "duration": 0.08203125
          },
          {
            "name": "C#4",
            "midi": 61,
            "time": 75.5,
            "velocity": 0.41732283464566927,
            "duration": 0.1640625
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 75.5,
            "velocity": 0.41732283464566927,
            "duration": 0.1640625
          },
          {
            "name": "G3",
            "midi": 55,
            "time": 75.5,
            "velocity": 0.44881889763779526,
            "duration": 0.078125
          },
          {
            "name": "C#4",
            "midi": 61,
            "time": 75.6640625,
            "velocity": 0.41732283464566927,
            "duration": 0.16796875
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 75.6640625,
            "velocity": 0.41732283464566927,
            "duration": 0.16796875
          },
          {
            "name": "F3",
            "midi": 53,
            "time": 75.6640625,
            "velocity": 0.4409448818897638,
            "duration": 0.08203125
          },
          {
            "name": "C#4",
            "midi": 61,
            "time": 75.83203125,
            "velocity": 0.41732283464566927,
            "duration": 0.16796875
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 75.83203125,
            "velocity": 0.41732283464566927,
            "duration": 0.16796875
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 75.83203125,
            "velocity": 0.4566929133858268,
            "duration": 0.08203125
          },
          {
            "name": "G#4",
            "midi": 68,
            "time": 76,
            "velocity": 0.4251968503937008,
            "duration": 0.5
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 76,
            "velocity": 0.3858267716535433,
            "duration": 0.1640625
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 76,
            "velocity": 0.3858267716535433,
            "duration": 0.1640625
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 76,
            "velocity": 0.5354330708661418,
            "duration": 0.5
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 76.1640625,
            "velocity": 0.3937007874015748,
            "duration": 0.16796875
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 76.1640625,
            "velocity": 0.3937007874015748,
            "duration": 0.16796875
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 76.33203125,
            "velocity": 0.3937007874015748,
            "duration": 0.16796875
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 76.33203125,
            "velocity": 0.3937007874015748,
            "duration": 0.16796875
          },
          {
            "name": "B4",
            "midi": 71,
            "time": 76.5,
            "velocity": 0.49606299212598426,
            "duration": 0.5
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 76.5,
            "velocity": 0.4251968503937008,
            "duration": 0.1640625
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 76.5,
            "velocity": 0.4251968503937008,
            "duration": 0.1640625
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 76.6640625,
            "velocity": 0.3858267716535433,
            "duration": 0.16796875
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 76.6640625,
            "velocity": 0.3858267716535433,
            "duration": 0.16796875
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 76.83203125,
            "velocity": 0.4094488188976378,
            "duration": 0.16796875
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 76.83203125,
            "velocity": 0.4094488188976378,
            "duration": 0.16796875
          },
          {
            "name": "A#4",
            "midi": 70,
            "time": 77,
            "velocity": 0.4251968503937008,
            "duration": 0.5
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 77,
            "velocity": 0.3779527559055118,
            "duration": 0.1640625
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 77,
            "velocity": 0.3779527559055118,
            "duration": 0.1640625
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 77.1640625,
            "velocity": 0.4094488188976378,
            "duration": 0.16796875
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 77.1640625,
            "velocity": 0.4094488188976378,
            "duration": 0.16796875
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 77.33203125,
            "velocity": 0.41732283464566927,
            "duration": 0.16796875
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 77.33203125,
            "velocity": 0.41732283464566927,
            "duration": 0.16796875
          },
          {
            "name": "G#4",
            "midi": 68,
            "time": 77.5,
            "velocity": 0.41732283464566927,
            "duration": 0.40234375
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 77.5,
            "velocity": 0.41732283464566927,
            "duration": 0.12890625
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 77.5,
            "velocity": 0.41732283464566927,
            "duration": 0.12890625
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 77.6640625,
            "velocity": 0.4015748031496063,
            "duration": 0.16796875
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 77.6640625,
            "velocity": 0.4015748031496063,
            "duration": 0.16796875
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 77.83203125,
            "velocity": 0.3464566929133858,
            "duration": 0.16796875
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 77.83203125,
            "velocity": 0.3464566929133858,
            "duration": 0.16796875
          },
          {
            "name": "G#4",
            "midi": 68,
            "time": 78,
            "velocity": 0.4566929133858268,
            "duration": 0.5
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 78,
            "velocity": 0.4094488188976378,
            "duration": 0.1640625
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 78,
            "velocity": 0.4094488188976378,
            "duration": 0.1640625
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 78,
            "velocity": 0.4330708661417323,
            "duration": 0.6640625
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 78.1640625,
            "velocity": 0.4015748031496063,
            "duration": 0.16796875
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 78.1640625,
            "velocity": 0.4015748031496063,
            "duration": 0.16796875
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 78.33203125,
            "velocity": 0.3779527559055118,
            "duration": 0.16796875
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 78.33203125,
            "velocity": 0.3779527559055118,
            "duration": 0.16796875
          },
          {
            "name": "G4",
            "midi": 67,
            "time": 78.5,
            "velocity": 0.4566929133858268,
            "duration": 0.40234375
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 78.5,
            "velocity": 0.3700787401574803,
            "duration": 0.12890625
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 78.5,
            "velocity": 0.3700787401574803,
            "duration": 0.12890625
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 78.6640625,
            "velocity": 0.3937007874015748,
            "duration": 0.16796875
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 78.6640625,
            "velocity": 0.3937007874015748,
            "duration": 0.16796875
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 78.6640625,
            "velocity": 0.4409448818897638,
            "duration": 0.16796875
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 78.83203125,
            "velocity": 0.3779527559055118,
            "duration": 0.16796875
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 78.83203125,
            "velocity": 0.3779527559055118,
            "duration": 0.16796875
          },
          {
            "name": "D3",
            "midi": 50,
            "time": 78.83203125,
            "velocity": 0.4409448818897638,
            "duration": 0.1328125
          },
          {
            "name": "G3",
            "midi": 55,
            "time": 79,
            "velocity": 0.41732283464566927,
            "duration": 0.1640625
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 79,
            "velocity": 0.41732283464566927,
            "duration": 0.1640625
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 79,
            "velocity": 0.41732283464566927,
            "duration": 0.1640625
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 79,
            "velocity": 0.49606299212598426,
            "duration": 0.078125
          },
          {
            "name": "G3",
            "midi": 55,
            "time": 79.1640625,
            "velocity": 0.3779527559055118,
            "duration": 0.16796875
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 79.1640625,
            "velocity": 0.3779527559055118,
            "duration": 0.16796875
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 79.1640625,
            "velocity": 0.3779527559055118,
            "duration": 0.16796875
          },
          {
            "name": "E3",
            "midi": 52,
            "time": 79.1640625,
            "velocity": 0.4881889763779528,
            "duration": 0.08203125
          },
          {
            "name": "G3",
            "midi": 55,
            "time": 79.33203125,
            "velocity": 0.3700787401574803,
            "duration": 0.16796875
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 79.33203125,
            "velocity": 0.3700787401574803,
            "duration": 0.16796875
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 79.33203125,
            "velocity": 0.3700787401574803,
            "duration": 0.16796875
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 79.33203125,
            "velocity": 0.4881889763779528,
            "duration": 0.08203125
          },
          {
            "name": "G3",
            "midi": 55,
            "time": 79.5,
            "velocity": 0.3858267716535433,
            "duration": 0.1640625
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 79.5,
            "velocity": 0.3858267716535433,
            "duration": 0.1640625
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 79.5,
            "velocity": 0.3858267716535433,
            "duration": 0.1640625
          },
          {
            "name": "C#3",
            "midi": 49,
            "time": 79.5,
            "velocity": 0.49606299212598426,
            "duration": 0.078125
          },
          {
            "name": "G3",
            "midi": 55,
            "time": 79.6640625,
            "velocity": 0.3700787401574803,
            "duration": 0.16796875
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 79.6640625,
            "velocity": 0.3700787401574803,
            "duration": 0.16796875
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 79.6640625,
            "velocity": 0.3700787401574803,
            "duration": 0.16796875
          },
          {
            "name": "B2",
            "midi": 47,
            "time": 79.6640625,
            "velocity": 0.47244094488188976,
            "duration": 0.08203125
          },
          {
            "name": "G3",
            "midi": 55,
            "time": 79.83203125,
            "velocity": 0.4094488188976378,
            "duration": 0.16796875
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 79.83203125,
            "velocity": 0.4094488188976378,
            "duration": 0.16796875
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 79.83203125,
            "velocity": 0.4094488188976378,
            "duration": 0.16796875
          },
          {
            "name": "A#2",
            "midi": 46,
            "time": 79.83203125,
            "velocity": 0.48031496062992124,
            "duration": 0.08203125
          },
          {
            "name": "G#4",
            "midi": 68,
            "time": 80,
            "velocity": 0.44881889763779526,
            "duration": 0.5
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 80,
            "velocity": 0.3700787401574803,
            "duration": 0.1640625
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 80,
            "velocity": 0.3700787401574803,
            "duration": 0.1640625
          },
          {
            "name": "G#2",
            "midi": 44,
            "time": 80,
            "velocity": 0.4566929133858268,
            "duration": 0.5
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 80.1640625,
            "velocity": 0.41732283464566927,
            "duration": 0.16796875
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 80.1640625,
            "velocity": 0.41732283464566927,
            "duration": 0.16796875
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 80.33203125,
            "velocity": 0.36220472440944884,
            "duration": 0.16796875
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 80.33203125,
            "velocity": 0.36220472440944884,
            "duration": 0.16796875
          },
          {
            "name": "B4",
            "midi": 71,
            "time": 80.5,
            "velocity": 0.5039370078740157,
            "duration": 0.5
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 80.5,
            "velocity": 0.3937007874015748,
            "duration": 0.1640625
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 80.5,
            "velocity": 0.3937007874015748,
            "duration": 0.1640625
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 80.6640625,
            "velocity": 0.41732283464566927,
            "duration": 0.16796875
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 80.6640625,
            "velocity": 0.41732283464566927,
            "duration": 0.16796875
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 80.83203125,
            "velocity": 0.4094488188976378,
            "duration": 0.16796875
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 80.83203125,
            "velocity": 0.4094488188976378,
            "duration": 0.16796875
          },
          {
            "name": "A#4",
            "midi": 70,
            "time": 81,
            "velocity": 0.4566929133858268,
            "duration": 0.5
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 81,
            "velocity": 0.4015748031496063,
            "duration": 0.1640625
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 81,
            "velocity": 0.4015748031496063,
            "duration": 0.1640625
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 81.1640625,
            "velocity": 0.4094488188976378,
            "duration": 0.16796875
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 81.1640625,
            "velocity": 0.4094488188976378,
            "duration": 0.16796875
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 81.33203125,
            "velocity": 0.4015748031496063,
            "duration": 0.16796875
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 81.33203125,
            "velocity": 0.4015748031496063,
            "duration": 0.16796875
          },
          {
            "name": "G#4",
            "midi": 68,
            "time": 81.5,
            "velocity": 0.4409448818897638,
            "duration": 0.40234375
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 81.5,
            "velocity": 0.3937007874015748,
            "duration": 0.12890625
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 81.5,
            "velocity": 0.3937007874015748,
            "duration": 0.12890625
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 81.6640625,
            "velocity": 0.4094488188976378,
            "duration": 0.16796875
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 81.6640625,
            "velocity": 0.4094488188976378,
            "duration": 0.16796875
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 81.83203125,
            "velocity": 0.4094488188976378,
            "duration": 0.16796875
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 81.83203125,
            "velocity": 0.4094488188976378,
            "duration": 0.16796875
          },
          {
            "name": "F#4",
            "midi": 66,
            "time": 82,
            "velocity": 0.7401574803149606,
            "duration": 0.5
          },
          {
            "name": "F#5",
            "midi": 78,
            "time": 82,
            "velocity": 0.7401574803149606,
            "duration": 0.6640625
          },
          {
            "name": "A2",
            "midi": 45,
            "time": 82,
            "velocity": 0.5590551181102362,
            "duration": 0.1640625
          },
          {
            "name": "B2",
            "midi": 47,
            "time": 82,
            "velocity": 0.5590551181102362,
            "duration": 0.1640625
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 82,
            "velocity": 0.5590551181102362,
            "duration": 0.1640625
          },
          {
            "name": "F#3",
            "midi": 54,
            "time": 82,
            "velocity": 0.5590551181102362,
            "duration": 0.1640625
          },
          {
            "name": "A2",
            "midi": 45,
            "time": 82.1640625,
            "velocity": 0.4409448818897638,
            "duration": 0.16796875
          },
          {
            "name": "B2",
            "midi": 47,
            "time": 82.1640625,
            "velocity": 0.4409448818897638,
            "duration": 0.16796875
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 82.1640625,
            "velocity": 0.4409448818897638,
            "duration": 0.16796875
          },
          {
            "name": "F#3",
            "midi": 54,
            "time": 82.1640625,
            "velocity": 0.4409448818897638,
            "duration": 0.16796875
          },
          {
            "name": "A2",
            "midi": 45,
            "time": 82.33203125,
            "velocity": 0.47244094488188976,
            "duration": 0.16796875
          },
          {
            "name": "B2",
            "midi": 47,
            "time": 82.33203125,
            "velocity": 0.47244094488188976,
            "duration": 0.16796875
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 82.33203125,
            "velocity": 0.47244094488188976,
            "duration": 0.16796875
          },
          {
            "name": "F#3",
            "midi": 54,
            "time": 82.33203125,
            "velocity": 0.47244094488188976,
            "duration": 0.16796875
          },
          {
            "name": "A2",
            "midi": 45,
            "time": 82.5,
            "velocity": 0.44881889763779526,
            "duration": 0.1640625
          },
          {
            "name": "B2",
            "midi": 47,
            "time": 82.5,
            "velocity": 0.44881889763779526,
            "duration": 0.1640625
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 82.5,
            "velocity": 0.44881889763779526,
            "duration": 0.1640625
          },
          {
            "name": "F#3",
            "midi": 54,
            "time": 82.5,
            "velocity": 0.44881889763779526,
            "duration": 0.1640625
          },
          {
            "name": "D#5",
            "midi": 75,
            "time": 82.6640625,
            "velocity": 0.41732283464566927,
            "duration": 0.08203125
          },
          {
            "name": "A2",
            "midi": 45,
            "time": 82.6640625,
            "velocity": 0.48031496062992124,
            "duration": 0.16796875
          },
          {
            "name": "B2",
            "midi": 47,
            "time": 82.6640625,
            "velocity": 0.48031496062992124,
            "duration": 0.16796875
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 82.6640625,
            "velocity": 0.48031496062992124,
            "duration": 0.16796875
          },
          {
            "name": "F#3",
            "midi": 54,
            "time": 82.6640625,
            "velocity": 0.48031496062992124,
            "duration": 0.16796875
          },
          {
            "name": "B4",
            "midi": 71,
            "time": 82.83203125,
            "velocity": 0.41732283464566927,
            "duration": 0.08203125
          },
          {
            "name": "A2",
            "midi": 45,
            "time": 82.83203125,
            "velocity": 0.47244094488188976,
            "duration": 0.16796875
          },
          {
            "name": "B2",
            "midi": 47,
            "time": 82.83203125,
            "velocity": 0.47244094488188976,
            "duration": 0.16796875
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 82.83203125,
            "velocity": 0.47244094488188976,
            "duration": 0.16796875
          },
          {
            "name": "F#3",
            "midi": 54,
            "time": 82.83203125,
            "velocity": 0.47244094488188976,
            "duration": 0.16796875
          },
          {
            "name": "B4",
            "midi": 71,
            "time": 83,
            "velocity": 0.7480314960629921,
            "duration": 0.5
          },
          {
            "name": "B5",
            "midi": 83,
            "time": 83,
            "velocity": 0.7480314960629921,
            "duration": 0.6640625
          },
          {
            "name": "G#2",
            "midi": 44,
            "time": 83,
            "velocity": 0.6535433070866141,
            "duration": 0.1640625
          },
          {
            "name": "B2",
            "midi": 47,
            "time": 83,
            "velocity": 0.6535433070866141,
            "duration": 0.1640625
          },
          {
            "name": "E3",
            "midi": 52,
            "time": 83,
            "velocity": 0.6535433070866141,
            "duration": 0.1640625
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 83,
            "velocity": 0.6535433070866141,
            "duration": 0.1640625
          },
          {
            "name": "G#2",
            "midi": 44,
            "time": 83.1640625,
            "velocity": 0.49606299212598426,
            "duration": 0.16796875
          },
          {
            "name": "B2",
            "midi": 47,
            "time": 83.1640625,
            "velocity": 0.49606299212598426,
            "duration": 0.16796875
          },
          {
            "name": "E3",
            "midi": 52,
            "time": 83.1640625,
            "velocity": 0.49606299212598426,
            "duration": 0.16796875
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 83.1640625,
            "velocity": 0.49606299212598426,
            "duration": 0.16796875
          },
          {
            "name": "G#2",
            "midi": 44,
            "time": 83.33203125,
            "velocity": 0.44881889763779526,
            "duration": 0.16796875
          },
          {
            "name": "B2",
            "midi": 47,
            "time": 83.33203125,
            "velocity": 0.44881889763779526,
            "duration": 0.16796875
          },
          {
            "name": "E3",
            "midi": 52,
            "time": 83.33203125,
            "velocity": 0.44881889763779526,
            "duration": 0.16796875
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 83.33203125,
            "velocity": 0.44881889763779526,
            "duration": 0.16796875
          },
          {
            "name": "G#2",
            "midi": 44,
            "time": 83.5,
            "velocity": 0.4566929133858268,
            "duration": 0.1640625
          },
          {
            "name": "B2",
            "midi": 47,
            "time": 83.5,
            "velocity": 0.4566929133858268,
            "duration": 0.1640625
          },
          {
            "name": "E3",
            "midi": 52,
            "time": 83.5,
            "velocity": 0.4566929133858268,
            "duration": 0.1640625
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 83.5,
            "velocity": 0.4566929133858268,
            "duration": 0.1640625
          },
          {
            "name": "G#5",
            "midi": 80,
            "time": 83.6640625,
            "velocity": 0.4566929133858268,
            "duration": 0.08203125
          },
          {
            "name": "G#2",
            "midi": 44,
            "time": 83.6640625,
            "velocity": 0.4645669291338583,
            "duration": 0.16796875
          },
          {
            "name": "B2",
            "midi": 47,
            "time": 83.6640625,
            "velocity": 0.4645669291338583,
            "duration": 0.16796875
          },
          {
            "name": "E3",
            "midi": 52,
            "time": 83.6640625,
            "velocity": 0.4645669291338583,
            "duration": 0.16796875
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 83.6640625,
            "velocity": 0.4645669291338583,
            "duration": 0.16796875
          },
          {
            "name": "E5",
            "midi": 76,
            "time": 83.83203125,
            "velocity": 0.4251968503937008,
            "duration": 0.08203125
          },
          {
            "name": "G#2",
            "midi": 44,
            "time": 83.83203125,
            "velocity": 0.48031496062992124,
            "duration": 0.16796875
          },
          {
            "name": "B2",
            "midi": 47,
            "time": 83.83203125,
            "velocity": 0.48031496062992124,
            "duration": 0.16796875
          },
          {
            "name": "E3",
            "midi": 52,
            "time": 83.83203125,
            "velocity": 0.48031496062992124,
            "duration": 0.16796875
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 83.83203125,
            "velocity": 0.48031496062992124,
            "duration": 0.16796875
          },
          {
            "name": "E5",
            "midi": 76,
            "time": 84,
            "velocity": 0.7559055118110236,
            "duration": 0.5
          },
          {
            "name": "E6",
            "midi": 88,
            "time": 84,
            "velocity": 0.7559055118110236,
            "duration": 0.6640625
          },
          {
            "name": "C#3",
            "midi": 49,
            "time": 84,
            "velocity": 0.6299212598425197,
            "duration": 0.1640625
          },
          {
            "name": "E3",
            "midi": 52,
            "time": 84,
            "velocity": 0.6299212598425197,
            "duration": 0.1640625
          },
          {
            "name": "F#3",
            "midi": 54,
            "time": 84,
            "velocity": 0.6299212598425197,
            "duration": 0.1640625
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 84,
            "velocity": 0.6299212598425197,
            "duration": 0.1640625
          },
          {
            "name": "C#3",
            "midi": 49,
            "time": 84.1640625,
            "velocity": 0.4330708661417323,
            "duration": 0.16796875
          },
          {
            "name": "E3",
            "midi": 52,
            "time": 84.1640625,
            "velocity": 0.4330708661417323,
            "duration": 0.16796875
          },
          {
            "name": "F#3",
            "midi": 54,
            "time": 84.1640625,
            "velocity": 0.4330708661417323,
            "duration": 0.16796875
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 84.1640625,
            "velocity": 0.4330708661417323,
            "duration": 0.16796875
          },
          {
            "name": "C#3",
            "midi": 49,
            "time": 84.33203125,
            "velocity": 0.4409448818897638,
            "duration": 0.16796875
          },
          {
            "name": "E3",
            "midi": 52,
            "time": 84.33203125,
            "velocity": 0.4409448818897638,
            "duration": 0.16796875
          },
          {
            "name": "F#3",
            "midi": 54,
            "time": 84.33203125,
            "velocity": 0.4409448818897638,
            "duration": 0.16796875
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 84.33203125,
            "velocity": 0.4409448818897638,
            "duration": 0.16796875
          },
          {
            "name": "C#3",
            "midi": 49,
            "time": 84.5,
            "velocity": 0.4645669291338583,
            "duration": 0.1640625
          },
          {
            "name": "E3",
            "midi": 52,
            "time": 84.5,
            "velocity": 0.4645669291338583,
            "duration": 0.1640625
          },
          {
            "name": "F#3",
            "midi": 54,
            "time": 84.5,
            "velocity": 0.4645669291338583,
            "duration": 0.1640625
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 84.5,
            "velocity": 0.4645669291338583,
            "duration": 0.1640625
          },
          {
            "name": "C#6",
            "midi": 85,
            "time": 84.6640625,
            "velocity": 0.47244094488188976,
            "duration": 0.08203125
          },
          {
            "name": "C#3",
            "midi": 49,
            "time": 84.6640625,
            "velocity": 0.5196850393700787,
            "duration": 0.16796875
          },
          {
            "name": "E3",
            "midi": 52,
            "time": 84.6640625,
            "velocity": 0.5196850393700787,
            "duration": 0.16796875
          },
          {
            "name": "F#3",
            "midi": 54,
            "time": 84.6640625,
            "velocity": 0.5196850393700787,
            "duration": 0.16796875
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 84.6640625,
            "velocity": 0.5196850393700787,
            "duration": 0.16796875
          },
          {
            "name": "A#5",
            "midi": 82,
            "time": 84.83203125,
            "velocity": 0.4251968503937008,
            "duration": 0.08203125
          },
          {
            "name": "C#3",
            "midi": 49,
            "time": 84.83203125,
            "velocity": 0.4409448818897638,
            "duration": 0.16796875
          },
          {
            "name": "E3",
            "midi": 52,
            "time": 84.83203125,
            "velocity": 0.4409448818897638,
            "duration": 0.16796875
          },
          {
            "name": "F#3",
            "midi": 54,
            "time": 84.83203125,
            "velocity": 0.4409448818897638,
            "duration": 0.16796875
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 84.83203125,
            "velocity": 0.4409448818897638,
            "duration": 0.16796875
          },
          {
            "name": "B4",
            "midi": 71,
            "time": 85,
            "velocity": 0.49606299212598426,
            "duration": 0.24609375
          },
          {
            "name": "B5",
            "midi": 83,
            "time": 85,
            "velocity": 0.49606299212598426,
            "duration": 0.24609375
          },
          {
            "name": "B2",
            "midi": 47,
            "time": 85,
            "velocity": 0.5118110236220472,
            "duration": 0.1640625
          },
          {
            "name": "E3",
            "midi": 52,
            "time": 85,
            "velocity": 0.5118110236220472,
            "duration": 0.1640625
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 85,
            "velocity": 0.5118110236220472,
            "duration": 0.1640625
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 85,
            "velocity": 0.5118110236220472,
            "duration": 0.1640625
          },
          {
            "name": "B2",
            "midi": 47,
            "time": 85.1640625,
            "velocity": 0.47244094488188976,
            "duration": 0.16796875
          },
          {
            "name": "E3",
            "midi": 52,
            "time": 85.1640625,
            "velocity": 0.47244094488188976,
            "duration": 0.16796875
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 85.1640625,
            "velocity": 0.47244094488188976,
            "duration": 0.16796875
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 85.1640625,
            "velocity": 0.47244094488188976,
            "duration": 0.16796875
          },
          {
            "name": "B2",
            "midi": 47,
            "time": 85.33203125,
            "velocity": 0.44881889763779526,
            "duration": 0.16796875
          },
          {
            "name": "E3",
            "midi": 52,
            "time": 85.33203125,
            "velocity": 0.44881889763779526,
            "duration": 0.16796875
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 85.33203125,
            "velocity": 0.44881889763779526,
            "duration": 0.16796875
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 85.33203125,
            "velocity": 0.44881889763779526,
            "duration": 0.16796875
          },
          {
            "name": "F#3",
            "midi": 54,
            "time": 85.5,
            "velocity": 0.3543307086614173,
            "duration": 0.24609375
          },
          {
            "name": "A3",
            "midi": 57,
            "time": 85.5,
            "velocity": 0.3543307086614173,
            "duration": 0.24609375
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 85.5,
            "velocity": 0.3543307086614173,
            "duration": 0.24609375
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 85.5,
            "velocity": 0.3543307086614173,
            "duration": 0.24609375
          },
          {
            "name": "B1",
            "midi": 35,
            "time": 85.5,
            "velocity": 0.4409448818897638,
            "duration": 0.1640625
          },
          {
            "name": "B2",
            "midi": 47,
            "time": 85.5,
            "velocity": 0.4409448818897638,
            "duration": 0.1640625
          },
          {
            "name": "B1",
            "midi": 35,
            "time": 85.6640625,
            "velocity": 0.4645669291338583,
            "duration": 0.16796875
          },
          {
            "name": "B2",
            "midi": 47,
            "time": 85.6640625,
            "velocity": 0.4645669291338583,
            "duration": 0.16796875
          },
          {
            "name": "B1",
            "midi": 35,
            "time": 85.83203125,
            "velocity": 0.48031496062992124,
            "duration": 0.16796875
          },
          {
            "name": "B2",
            "midi": 47,
            "time": 85.83203125,
            "velocity": 0.48031496062992124,
            "duration": 0.16796875
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 86,
            "velocity": 0.6220472440944882,
            "duration": 0.1640625
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 86,
            "velocity": 0.6220472440944882,
            "duration": 0.1640625
          },
          {
            "name": "E4",
            "midi": 64,
            "time": 86,
            "velocity": 0.6220472440944882,
            "duration": 0.1640625
          },
          {
            "name": "E2",
            "midi": 40,
            "time": 86,
            "velocity": 0.6141732283464567,
            "duration": 0.5
          },
          {
            "name": "E3",
            "midi": 52,
            "time": 86,
            "velocity": 0.6141732283464567,
            "duration": 0.5
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 86.1640625,
            "velocity": 0.4330708661417323,
            "duration": 0.16796875
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 86.1640625,
            "velocity": 0.4330708661417323,
            "duration": 0.16796875
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 86.33203125,
            "velocity": 0.47244094488188976,
            "duration": 0.16796875
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 86.33203125,
            "velocity": 0.47244094488188976,
            "duration": 0.16796875
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 86.5,
            "velocity": 0.4881889763779528,
            "duration": 0.1640625
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 86.5,
            "velocity": 0.4881889763779528,
            "duration": 0.1640625
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 86.6640625,
            "velocity": 0.4881889763779528,
            "duration": 0.16796875
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 86.6640625,
            "velocity": 0.4881889763779528,
            "duration": 0.16796875
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 86.83203125,
            "velocity": 0.4566929133858268,
            "duration": 0.16796875
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 86.83203125,
            "velocity": 0.4566929133858268,
            "duration": 0.16796875
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 87,
            "velocity": 0.4409448818897638,
            "duration": 0.1640625
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 87,
            "velocity": 0.4409448818897638,
            "duration": 0.1640625
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 87.1640625,
            "velocity": 0.48031496062992124,
            "duration": 0.16796875
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 87.1640625,
            "velocity": 0.48031496062992124,
            "duration": 0.16796875
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 87.33203125,
            "velocity": 0.4645669291338583,
            "duration": 0.16796875
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 87.33203125,
            "velocity": 0.4645669291338583,
            "duration": 0.16796875
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 87.5,
            "velocity": 0.47244094488188976,
            "duration": 0.1640625
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 87.5,
            "velocity": 0.47244094488188976,
            "duration": 0.1640625
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 87.6640625,
            "velocity": 0.48031496062992124,
            "duration": 0.16796875
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 87.6640625,
            "velocity": 0.48031496062992124,
            "duration": 0.16796875
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 87.83203125,
            "velocity": 0.4881889763779528,
            "duration": 0.16796875
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 87.83203125,
            "velocity": 0.4881889763779528,
            "duration": 0.16796875
          },
          {
            "name": "E4",
            "midi": 64,
            "time": 88,
            "velocity": 0.5196850393700787,
            "duration": 0.5
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 88,
            "velocity": 0.3543307086614173,
            "duration": 0.1640625
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 88,
            "velocity": 0.3543307086614173,
            "duration": 0.1640625
          },
          {
            "name": "E2",
            "midi": 40,
            "time": 88,
            "velocity": 0.4881889763779528,
            "duration": 1
          },
          {
            "name": "E3",
            "midi": 52,
            "time": 88,
            "velocity": 0.4881889763779528,
            "duration": 1
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 88.1640625,
            "velocity": 0.3937007874015748,
            "duration": 0.16796875
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 88.1640625,
            "velocity": 0.3937007874015748,
            "duration": 0.16796875
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 88.33203125,
            "velocity": 0.3937007874015748,
            "duration": 0.16796875
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 88.33203125,
            "velocity": 0.3937007874015748,
            "duration": 0.16796875
          },
          {
            "name": "G#4",
            "midi": 68,
            "time": 88.5,
            "velocity": 0.5826771653543307,
            "duration": 0.5
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 88.5,
            "velocity": 0.41732283464566927,
            "duration": 0.1640625
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 88.5,
            "velocity": 0.41732283464566927,
            "duration": 0.1640625
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 88.6640625,
            "velocity": 0.3937007874015748,
            "duration": 0.16796875
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 88.6640625,
            "velocity": 0.3937007874015748,
            "duration": 0.16796875
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 88.83203125,
            "velocity": 0.36220472440944884,
            "duration": 0.16796875
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 88.83203125,
            "velocity": 0.36220472440944884,
            "duration": 0.16796875
          },
          {
            "name": "F#4",
            "midi": 66,
            "time": 89,
            "velocity": 0.4409448818897638,
            "duration": 0.5
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 89,
            "velocity": 0.3779527559055118,
            "duration": 0.1640625
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 89,
            "velocity": 0.3779527559055118,
            "duration": 0.1640625
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 89.1640625,
            "velocity": 0.3858267716535433,
            "duration": 0.16796875
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 89.1640625,
            "velocity": 0.3858267716535433,
            "duration": 0.16796875
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 89.33203125,
            "velocity": 0.3937007874015748,
            "duration": 0.16796875
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 89.33203125,
            "velocity": 0.3937007874015748,
            "duration": 0.16796875
          },
          {
            "name": "E4",
            "midi": 64,
            "time": 89.5,
            "velocity": 0.4330708661417323,
            "duration": 0.40234375
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 89.5,
            "velocity": 0.3937007874015748,
            "duration": 0.12890625
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 89.5,
            "velocity": 0.3937007874015748,
            "duration": 0.12890625
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 89.6640625,
            "velocity": 0.4251968503937008,
            "duration": 0.16796875
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 89.6640625,
            "velocity": 0.4251968503937008,
            "duration": 0.16796875
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 89.83203125,
            "velocity": 0.3937007874015748,
            "duration": 0.16796875
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 89.83203125,
            "velocity": 0.3937007874015748,
            "duration": 0.16796875
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 90,
            "velocity": 0.47244094488188976,
            "duration": 0.5
          },
          {
            "name": "A3",
            "midi": 57,
            "time": 90,
            "velocity": 0.3779527559055118,
            "duration": 0.1640625
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 90,
            "velocity": 0.3779527559055118,
            "duration": 0.1640625
          },
          {
            "name": "F#3",
            "midi": 54,
            "time": 90,
            "velocity": 0.4409448818897638,
            "duration": 0.6640625
          },
          {
            "name": "A3",
            "midi": 57,
            "time": 90.1640625,
            "velocity": 0.4409448818897638,
            "duration": 0.16796875
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 90.1640625,
            "velocity": 0.4409448818897638,
            "duration": 0.16796875
          },
          {
            "name": "A3",
            "midi": 57,
            "time": 90.33203125,
            "velocity": 0.3858267716535433,
            "duration": 0.16796875
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 90.33203125,
            "velocity": 0.3858267716535433,
            "duration": 0.16796875
          },
          {
            "name": "A4",
            "midi": 69,
            "time": 90.5,
            "velocity": 0.5039370078740157,
            "duration": 0.40234375
          },
          {
            "name": "A3",
            "midi": 57,
            "time": 90.5,
            "velocity": 0.3858267716535433,
            "duration": 0.12890625
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 90.5,
            "velocity": 0.3858267716535433,
            "duration": 0.12890625
          },
          {
            "name": "A3",
            "midi": 57,
            "time": 90.6640625,
            "velocity": 0.3858267716535433,
            "duration": 0.16796875
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 90.6640625,
            "velocity": 0.3858267716535433,
            "duration": 0.16796875
          },
          {
            "name": "F#3",
            "midi": 54,
            "time": 90.6640625,
            "velocity": 0.4881889763779528,
            "duration": 0.16796875
          },
          {
            "name": "A3",
            "midi": 57,
            "time": 90.83203125,
            "velocity": 0.4015748031496063,
            "duration": 0.16796875
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 90.83203125,
            "velocity": 0.4015748031496063,
            "duration": 0.16796875
          },
          {
            "name": "F3",
            "midi": 53,
            "time": 90.83203125,
            "velocity": 0.48031496062992124,
            "duration": 0.1328125
          },
          {
            "name": "A3",
            "midi": 57,
            "time": 91,
            "velocity": 0.3858267716535433,
            "duration": 0.1640625
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 91,
            "velocity": 0.3858267716535433,
            "duration": 0.1640625
          },
          {
            "name": "F#3",
            "midi": 54,
            "time": 91,
            "velocity": 0.5039370078740157,
            "duration": 0.078125
          },
          {
            "name": "A3",
            "midi": 57,
            "time": 91.1640625,
            "velocity": 0.4251968503937008,
            "duration": 0.16796875
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 91.1640625,
            "velocity": 0.4251968503937008,
            "duration": 0.16796875
          },
          {
            "name": "F#3",
            "midi": 54,
            "time": 91.1640625,
            "velocity": 0.47244094488188976,
            "duration": 0.08203125
          },
          {
            "name": "A3",
            "midi": 57,
            "time": 91.33203125,
            "velocity": 0.41732283464566927,
            "duration": 0.16796875
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 91.33203125,
            "velocity": 0.41732283464566927,
            "duration": 0.16796875
          },
          {
            "name": "E3",
            "midi": 52,
            "time": 91.33203125,
            "velocity": 0.41732283464566927,
            "duration": 0.0625
          },
          {
            "name": "A3",
            "midi": 57,
            "time": 91.5,
            "velocity": 0.4015748031496063,
            "duration": 0.1640625
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 91.5,
            "velocity": 0.4015748031496063,
            "duration": 0.1640625
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 91.5,
            "velocity": 0.47244094488188976,
            "duration": 0.078125
          },
          {
            "name": "A3",
            "midi": 57,
            "time": 91.6640625,
            "velocity": 0.3858267716535433,
            "duration": 0.16796875
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 91.6640625,
            "velocity": 0.3858267716535433,
            "duration": 0.16796875
          },
          {
            "name": "C#3",
            "midi": 49,
            "time": 91.6640625,
            "velocity": 0.4251968503937008,
            "duration": 0.08203125
          },
          {
            "name": "A3",
            "midi": 57,
            "time": 91.83203125,
            "velocity": 0.4094488188976378,
            "duration": 0.16796875
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 91.83203125,
            "velocity": 0.4094488188976378,
            "duration": 0.16796875
          },
          {
            "name": "B2",
            "midi": 47,
            "time": 91.83203125,
            "velocity": 0.4566929133858268,
            "duration": 0.0625
          },
          {
            "name": "E4",
            "midi": 64,
            "time": 92,
            "velocity": 0.4330708661417323,
            "duration": 0.5
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 92,
            "velocity": 0.3937007874015748,
            "duration": 0.1640625
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 92,
            "velocity": 0.3937007874015748,
            "duration": 0.1640625
          },
          {
            "name": "E3",
            "midi": 52,
            "time": 92,
            "velocity": 0.5039370078740157,
            "duration": 0.5
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 92.1640625,
            "velocity": 0.3858267716535433,
            "duration": 0.16796875
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 92.1640625,
            "velocity": 0.3858267716535433,
            "duration": 0.16796875
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 92.33203125,
            "velocity": 0.3937007874015748,
            "duration": 0.16796875
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 92.33203125,
            "velocity": 0.3937007874015748,
            "duration": 0.16796875
          },
          {
            "name": "G#4",
            "midi": 68,
            "time": 92.5,
            "velocity": 0.5354330708661418,
            "duration": 0.5
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 92.5,
            "velocity": 0.4015748031496063,
            "duration": 0.1640625
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 92.5,
            "velocity": 0.4015748031496063,
            "duration": 0.1640625
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 92.6640625,
            "velocity": 0.4094488188976378,
            "duration": 0.16796875
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 92.6640625,
            "velocity": 0.4094488188976378,
            "duration": 0.16796875
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 92.83203125,
            "velocity": 0.36220472440944884,
            "duration": 0.16796875
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 92.83203125,
            "velocity": 0.36220472440944884,
            "duration": 0.16796875
          },
          {
            "name": "F#4",
            "midi": 66,
            "time": 93,
            "velocity": 0.4251968503937008,
            "duration": 0.5
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 93,
            "velocity": 0.3700787401574803,
            "duration": 0.1640625
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 93,
            "velocity": 0.3700787401574803,
            "duration": 0.1640625
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 93.1640625,
            "velocity": 0.4094488188976378,
            "duration": 0.16796875
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 93.1640625,
            "velocity": 0.4094488188976378,
            "duration": 0.16796875
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 93.33203125,
            "velocity": 0.3700787401574803,
            "duration": 0.16796875
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 93.33203125,
            "velocity": 0.3700787401574803,
            "duration": 0.16796875
          },
          {
            "name": "E4",
            "midi": 64,
            "time": 93.5,
            "velocity": 0.48031496062992124,
            "duration": 0.40234375
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 93.5,
            "velocity": 0.3937007874015748,
            "duration": 0.12890625
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 93.5,
            "velocity": 0.3937007874015748,
            "duration": 0.12890625
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 93.6640625,
            "velocity": 0.4409448818897638,
            "duration": 0.16796875
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 93.6640625,
            "velocity": 0.4409448818897638,
            "duration": 0.16796875
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 93.83203125,
            "velocity": 0.4015748031496063,
            "duration": 0.16796875
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 93.83203125,
            "velocity": 0.4015748031496063,
            "duration": 0.16796875
          },
          {
            "name": "D4",
            "midi": 62,
            "time": 94,
            "velocity": 0.4566929133858268,
            "duration": 1.5
          },
          {
            "name": "D3",
            "midi": 50,
            "time": 94,
            "velocity": 0.3700787401574803,
            "duration": 0.1640625
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 94,
            "velocity": 0.3700787401574803,
            "duration": 0.1640625
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 94,
            "velocity": 0.3700787401574803,
            "duration": 0.1640625
          },
          {
            "name": "D3",
            "midi": 50,
            "time": 94.1640625,
            "velocity": 0.4015748031496063,
            "duration": 0.16796875
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 94.1640625,
            "velocity": 0.4015748031496063,
            "duration": 0.16796875
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 94.1640625,
            "velocity": 0.4015748031496063,
            "duration": 0.16796875
          },
          {
            "name": "F1",
            "midi": 29,
            "time": 94.1640625,
            "velocity": 0.41732283464566927,
            "duration": 0.08203125
          },
          {
            "name": "D3",
            "midi": 50,
            "time": 94.33203125,
            "velocity": 0.3858267716535433,
            "duration": 0.16796875
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 94.33203125,
            "velocity": 0.3858267716535433,
            "duration": 0.16796875
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 94.33203125,
            "velocity": 0.3858267716535433,
            "duration": 0.16796875
          },
          {
            "name": "G#1",
            "midi": 32,
            "time": 94.33203125,
            "velocity": 0.5039370078740157,
            "duration": 0.08203125
          },
          {
            "name": "D3",
            "midi": 50,
            "time": 94.5,
            "velocity": 0.3858267716535433,
            "duration": 0.1640625
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 94.5,
            "velocity": 0.3858267716535433,
            "duration": 0.1640625
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 94.5,
            "velocity": 0.3858267716535433,
            "duration": 0.1640625
          },
          {
            "name": "B1",
            "midi": 35,
            "time": 94.5,
            "velocity": 0.47244094488188976,
            "duration": 0.078125
          },
          {
            "name": "D3",
            "midi": 50,
            "time": 94.6640625,
            "velocity": 0.4015748031496063,
            "duration": 0.16796875
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 94.6640625,
            "velocity": 0.4015748031496063,
            "duration": 0.16796875
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 94.6640625,
            "velocity": 0.4015748031496063,
            "duration": 0.16796875
          },
          {
            "name": "D2",
            "midi": 38,
            "time": 94.6640625,
            "velocity": 0.5039370078740157,
            "duration": 0.08203125
          },
          {
            "name": "D3",
            "midi": 50,
            "time": 94.83203125,
            "velocity": 0.3858267716535433,
            "duration": 0.16796875
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 94.83203125,
            "velocity": 0.3858267716535433,
            "duration": 0.16796875
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 94.83203125,
            "velocity": 0.3858267716535433,
            "duration": 0.16796875
          },
          {
            "name": "F2",
            "midi": 41,
            "time": 94.83203125,
            "velocity": 0.49606299212598426,
            "duration": 0.08203125
          },
          {
            "name": "D3",
            "midi": 50,
            "time": 95,
            "velocity": 0.3858267716535433,
            "duration": 0.1640625
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 95,
            "velocity": 0.3858267716535433,
            "duration": 0.1640625
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 95,
            "velocity": 0.3858267716535433,
            "duration": 0.1640625
          },
          {
            "name": "G#2",
            "midi": 44,
            "time": 95,
            "velocity": 0.5118110236220472,
            "duration": 0.24609375
          },
          {
            "name": "D3",
            "midi": 50,
            "time": 95.1640625,
            "velocity": 0.3858267716535433,
            "duration": 0.16796875
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 95.1640625,
            "velocity": 0.3858267716535433,
            "duration": 0.16796875
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 95.1640625,
            "velocity": 0.3858267716535433,
            "duration": 0.16796875
          },
          {
            "name": "D3",
            "midi": 50,
            "time": 95.33203125,
            "velocity": 0.3779527559055118,
            "duration": 0.16796875
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 95.33203125,
            "velocity": 0.3779527559055118,
            "duration": 0.16796875
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 95.33203125,
            "velocity": 0.3779527559055118,
            "duration": 0.16796875
          },
          {
            "name": "D4",
            "midi": 62,
            "time": 95.5,
            "velocity": 0.48031496062992124,
            "duration": 0.40234375
          },
          {
            "name": "D3",
            "midi": 50,
            "time": 95.5,
            "velocity": 0.4330708661417323,
            "duration": 0.12890625
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 95.5,
            "velocity": 0.4330708661417323,
            "duration": 0.12890625
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 95.5,
            "velocity": 0.4330708661417323,
            "duration": 0.12890625
          },
          {
            "name": "D3",
            "midi": 50,
            "time": 95.6640625,
            "velocity": 0.3937007874015748,
            "duration": 0.16796875
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 95.6640625,
            "velocity": 0.3937007874015748,
            "duration": 0.16796875
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 95.6640625,
            "velocity": 0.3937007874015748,
            "duration": 0.16796875
          },
          {
            "name": "D3",
            "midi": 50,
            "time": 95.83203125,
            "velocity": 0.3779527559055118,
            "duration": 0.16796875
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 95.83203125,
            "velocity": 0.3779527559055118,
            "duration": 0.16796875
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 95.83203125,
            "velocity": 0.3779527559055118,
            "duration": 0.16796875
          },
          {
            "name": "D4",
            "midi": 62,
            "time": 96,
            "velocity": 0.4566929133858268,
            "duration": 1.5
          },
          {
            "name": "D3",
            "midi": 50,
            "time": 96,
            "velocity": 0.4015748031496063,
            "duration": 0.1640625
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 96,
            "velocity": 0.4015748031496063,
            "duration": 0.1640625
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 96,
            "velocity": 0.4015748031496063,
            "duration": 0.1640625
          },
          {
            "name": "D3",
            "midi": 50,
            "time": 96.1640625,
            "velocity": 0.4251968503937008,
            "duration": 0.16796875
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 96.1640625,
            "velocity": 0.4251968503937008,
            "duration": 0.16796875
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 96.1640625,
            "velocity": 0.4251968503937008,
            "duration": 0.16796875
          },
          {
            "name": "F1",
            "midi": 29,
            "time": 96.1640625,
            "velocity": 0.4094488188976378,
            "duration": 0.08203125
          },
          {
            "name": "D3",
            "midi": 50,
            "time": 96.33203125,
            "velocity": 0.4251968503937008,
            "duration": 0.16796875
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 96.33203125,
            "velocity": 0.4251968503937008,
            "duration": 0.16796875
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 96.33203125,
            "velocity": 0.4251968503937008,
            "duration": 0.16796875
          },
          {
            "name": "G#1",
            "midi": 32,
            "time": 96.33203125,
            "velocity": 0.5118110236220472,
            "duration": 0.08203125
          },
          {
            "name": "D3",
            "midi": 50,
            "time": 96.5,
            "velocity": 0.4015748031496063,
            "duration": 0.1640625
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 96.5,
            "velocity": 0.4015748031496063,
            "duration": 0.1640625
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 96.5,
            "velocity": 0.4015748031496063,
            "duration": 0.1640625
          },
          {
            "name": "B1",
            "midi": 35,
            "time": 96.5,
            "velocity": 0.49606299212598426,
            "duration": 0.078125
          },
          {
            "name": "D3",
            "midi": 50,
            "time": 96.6640625,
            "velocity": 0.41732283464566927,
            "duration": 0.16796875
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 96.6640625,
            "velocity": 0.41732283464566927,
            "duration": 0.16796875
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 96.6640625,
            "velocity": 0.41732283464566927,
            "duration": 0.16796875
          },
          {
            "name": "D2",
            "midi": 38,
            "time": 96.6640625,
            "velocity": 0.48031496062992124,
            "duration": 0.08203125
          },
          {
            "name": "D3",
            "midi": 50,
            "time": 96.83203125,
            "velocity": 0.3937007874015748,
            "duration": 0.16796875
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 96.83203125,
            "velocity": 0.3937007874015748,
            "duration": 0.16796875
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 96.83203125,
            "velocity": 0.3937007874015748,
            "duration": 0.16796875
          },
          {
            "name": "F2",
            "midi": 41,
            "time": 96.83203125,
            "velocity": 0.4409448818897638,
            "duration": 0.08203125
          },
          {
            "name": "D3",
            "midi": 50,
            "time": 97,
            "velocity": 0.4015748031496063,
            "duration": 0.1640625
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 97,
            "velocity": 0.4015748031496063,
            "duration": 0.1640625
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 97,
            "velocity": 0.4015748031496063,
            "duration": 0.1640625
          },
          {
            "name": "G#2",
            "midi": 44,
            "time": 97,
            "velocity": 0.49606299212598426,
            "duration": 0.24609375
          },
          {
            "name": "D3",
            "midi": 50,
            "time": 97.1640625,
            "velocity": 0.3858267716535433,
            "duration": 0.16796875
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 97.1640625,
            "velocity": 0.3858267716535433,
            "duration": 0.16796875
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 97.1640625,
            "velocity": 0.3858267716535433,
            "duration": 0.16796875
          },
          {
            "name": "D3",
            "midi": 50,
            "time": 97.33203125,
            "velocity": 0.4330708661417323,
            "duration": 0.16796875
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 97.33203125,
            "velocity": 0.4330708661417323,
            "duration": 0.16796875
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 97.33203125,
            "velocity": 0.4330708661417323,
            "duration": 0.16796875
          },
          {
            "name": "D4",
            "midi": 62,
            "time": 97.5,
            "velocity": 0.47244094488188976,
            "duration": 0.40234375
          },
          {
            "name": "D3",
            "midi": 50,
            "time": 97.5,
            "velocity": 0.3464566929133858,
            "duration": 0.12890625
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 97.5,
            "velocity": 0.3464566929133858,
            "duration": 0.12890625
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 97.5,
            "velocity": 0.3464566929133858,
            "duration": 0.12890625
          },
          {
            "name": "D3",
            "midi": 50,
            "time": 97.6640625,
            "velocity": 0.41732283464566927,
            "duration": 0.16796875
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 97.6640625,
            "velocity": 0.41732283464566927,
            "duration": 0.16796875
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 97.6640625,
            "velocity": 0.41732283464566927,
            "duration": 0.16796875
          },
          {
            "name": "D3",
            "midi": 50,
            "time": 97.83203125,
            "velocity": 0.4094488188976378,
            "duration": 0.16796875
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 97.83203125,
            "velocity": 0.4094488188976378,
            "duration": 0.16796875
          },
          {
            "name": "B3",
            "midi": 59,
            "time": 97.83203125,
            "velocity": 0.4094488188976378,
            "duration": 0.16796875
          },
          {
            "name": "C#4",
            "midi": 61,
            "time": 98,
            "velocity": 0.44881889763779526,
            "duration": 1.5
          },
          {
            "name": "C#3",
            "midi": 49,
            "time": 98,
            "velocity": 0.3779527559055118,
            "duration": 0.1640625
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 98,
            "velocity": 0.3779527559055118,
            "duration": 0.1640625
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 98,
            "velocity": 0.3779527559055118,
            "duration": 0.1640625
          },
          {
            "name": "C#3",
            "midi": 49,
            "time": 98.1640625,
            "velocity": 0.4015748031496063,
            "duration": 0.16796875
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 98.1640625,
            "velocity": 0.4015748031496063,
            "duration": 0.16796875
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 98.1640625,
            "velocity": 0.4015748031496063,
            "duration": 0.16796875
          },
          {
            "name": "E2",
            "midi": 40,
            "time": 98.1640625,
            "velocity": 0.44881889763779526,
            "duration": 0.08203125
          },
          {
            "name": "C#3",
            "midi": 49,
            "time": 98.33203125,
            "velocity": 0.4094488188976378,
            "duration": 0.16796875
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 98.33203125,
            "velocity": 0.4094488188976378,
            "duration": 0.16796875
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 98.33203125,
            "velocity": 0.4094488188976378,
            "duration": 0.16796875
          },
          {
            "name": "G#2",
            "midi": 44,
            "time": 98.33203125,
            "velocity": 0.49606299212598426,
            "duration": 0.08203125
          },
          {
            "name": "C#3",
            "midi": 49,
            "time": 98.5,
            "velocity": 0.4094488188976378,
            "duration": 0.1640625
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 98.5,
            "velocity": 0.4094488188976378,
            "duration": 0.1640625
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 98.5,
            "velocity": 0.4094488188976378,
            "duration": 0.1640625
          },
          {
            "name": "A#2",
            "midi": 46,
            "time": 98.5,
            "velocity": 0.5039370078740157,
            "duration": 0.24609375
          },
          {
            "name": "C#3",
            "midi": 49,
            "time": 98.6640625,
            "velocity": 0.41732283464566927,
            "duration": 0.16796875
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 98.6640625,
            "velocity": 0.41732283464566927,
            "duration": 0.16796875
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 98.6640625,
            "velocity": 0.41732283464566927,
            "duration": 0.16796875
          },
          {
            "name": "C#3",
            "midi": 49,
            "time": 98.83203125,
            "velocity": 0.4015748031496063,
            "duration": 0.16796875
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 98.83203125,
            "velocity": 0.4015748031496063,
            "duration": 0.16796875
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 98.83203125,
            "velocity": 0.4015748031496063,
            "duration": 0.16796875
          },
          {
            "name": "C#3",
            "midi": 49,
            "time": 99,
            "velocity": 0.3937007874015748,
            "duration": 0.1640625
          },
          {
            "name": "G3",
            "midi": 55,
            "time": 99,
            "velocity": 0.3937007874015748,
            "duration": 0.1640625
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 99,
            "velocity": 0.3937007874015748,
            "duration": 0.1640625
          },
          {
            "name": "C#3",
            "midi": 49,
            "time": 99.1640625,
            "velocity": 0.4015748031496063,
            "duration": 0.16796875
          },
          {
            "name": "G3",
            "midi": 55,
            "time": 99.1640625,
            "velocity": 0.4015748031496063,
            "duration": 0.16796875
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 99.1640625,
            "velocity": 0.4015748031496063,
            "duration": 0.16796875
          },
          {
            "name": "D#2",
            "midi": 39,
            "time": 99.1640625,
            "velocity": 0.4251968503937008,
            "duration": 0.08203125
          },
          {
            "name": "C#3",
            "midi": 49,
            "time": 99.33203125,
            "velocity": 0.3937007874015748,
            "duration": 0.16796875
          },
          {
            "name": "G3",
            "midi": 55,
            "time": 99.33203125,
            "velocity": 0.3937007874015748,
            "duration": 0.16796875
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 99.33203125,
            "velocity": 0.3937007874015748,
            "duration": 0.16796875
          },
          {
            "name": "G2",
            "midi": 43,
            "time": 99.33203125,
            "velocity": 0.5039370078740157,
            "duration": 0.08203125
          },
          {
            "name": "C#4",
            "midi": 61,
            "time": 99.5,
            "velocity": 0.44881889763779526,
            "duration": 0.40234375
          },
          {
            "name": "C#3",
            "midi": 49,
            "time": 99.5,
            "velocity": 0.3700787401574803,
            "duration": 0.12890625
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 99.5,
            "velocity": 0.3700787401574803,
            "duration": 0.12890625
          },
          {
            "name": "G3",
            "midi": 55,
            "time": 99.5,
            "velocity": 0.3700787401574803,
            "duration": 0.12890625
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 99.5,
            "velocity": 0.3700787401574803,
            "duration": 0.12890625
          },
          {
            "name": "A#2",
            "midi": 46,
            "time": 99.5,
            "velocity": 0.5275590551181102,
            "duration": 0.24609375
          },
          {
            "name": "C#3",
            "midi": 49,
            "time": 99.6640625,
            "velocity": 0.4015748031496063,
            "duration": 0.16796875
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 99.6640625,
            "velocity": 0.4015748031496063,
            "duration": 0.16796875
          },
          {
            "name": "G3",
            "midi": 55,
            "time": 99.6640625,
            "velocity": 0.4015748031496063,
            "duration": 0.16796875
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 99.6640625,
            "velocity": 0.4015748031496063,
            "duration": 0.16796875
          },
          {
            "name": "C#3",
            "midi": 49,
            "time": 99.83203125,
            "velocity": 0.36220472440944884,
            "duration": 0.16796875
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 99.83203125,
            "velocity": 0.36220472440944884,
            "duration": 0.16796875
          },
          {
            "name": "G3",
            "midi": 55,
            "time": 99.83203125,
            "velocity": 0.36220472440944884,
            "duration": 0.16796875
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 99.83203125,
            "velocity": 0.36220472440944884,
            "duration": 0.16796875
          },
          {
            "name": "C4",
            "midi": 60,
            "time": 100,
            "velocity": 0.44881889763779526,
            "duration": 1
          },
          {
            "name": "C3",
            "midi": 48,
            "time": 100,
            "velocity": 0.3937007874015748,
            "duration": 0.1640625
          },
          {
            "name": "G#1",
            "midi": 32,
            "time": 100,
            "velocity": 0.44881889763779526,
            "duration": 1
          },
          {
            "name": "G#2",
            "midi": 44,
            "time": 100,
            "velocity": 0.44881889763779526,
            "duration": 1
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 100.1640625,
            "velocity": 0.4881889763779528,
            "duration": 0.16796875
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 100.33203125,
            "velocity": 0.4645669291338583,
            "duration": 0.16796875
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 100.5,
            "velocity": 0.5433070866141733,
            "duration": 0.1640625
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 100.6640625,
            "velocity": 0.4566929133858268,
            "duration": 0.16796875
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 100.83203125,
            "velocity": 0.4566929133858268,
            "duration": 0.16796875
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 101,
            "velocity": 0.47244094488188976,
            "duration": 1
          },
          {
            "name": "G3",
            "midi": 55,
            "time": 101,
            "velocity": 0.5118110236220472,
            "duration": 0.1640625
          },
          {
            "name": "C#3",
            "midi": 49,
            "time": 101,
            "velocity": 0.5039370078740157,
            "duration": 1
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 101.1640625,
            "velocity": 0.4645669291338583,
            "duration": 0.16796875
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 101.33203125,
            "velocity": 0.49606299212598426,
            "duration": 0.16796875
          },
          {
            "name": "G3",
            "midi": 55,
            "time": 101.5,
            "velocity": 0.47244094488188976,
            "duration": 0.1640625
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 101.6640625,
            "velocity": 0.4330708661417323,
            "duration": 0.16796875
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 101.83203125,
            "velocity": 0.4645669291338583,
            "duration": 0.16796875
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 102,
            "velocity": 0.5118110236220472,
            "duration": 1.5
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 102,
            "velocity": 0.47244094488188976,
            "duration": 0.1640625
          },
          {
            "name": "C3",
            "midi": 48,
            "time": 102,
            "velocity": 0.4566929133858268,
            "duration": 1
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 102.1640625,
            "velocity": 0.41732283464566927,
            "duration": 0.16796875
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 102.33203125,
            "velocity": 0.48031496062992124,
            "duration": 0.16796875
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 102.5,
            "velocity": 0.5039370078740157,
            "duration": 0.1640625
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 102.6640625,
            "velocity": 0.4330708661417323,
            "duration": 0.16796875
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 102.83203125,
            "velocity": 0.48031496062992124,
            "duration": 0.16796875
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 103,
            "velocity": 0.5511811023622047,
            "duration": 0.1640625
          },
          {
            "name": "G2",
            "midi": 43,
            "time": 103,
            "velocity": 0.4094488188976378,
            "duration": 0.90234375
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 103.1640625,
            "velocity": 0.4566929133858268,
            "duration": 0.16796875
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 103.33203125,
            "velocity": 0.47244094488188976,
            "duration": 0.16796875
          },
          {
            "name": "C#4",
            "midi": 61,
            "time": 103.5,
            "velocity": 0.4645669291338583,
            "duration": 0.40234375
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 103.5,
            "velocity": 0.5039370078740157,
            "duration": 0.12890625
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 103.6640625,
            "velocity": 0.4566929133858268,
            "duration": 0.16796875
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 103.83203125,
            "velocity": 0.4645669291338583,
            "duration": 0.16796875
          },
          {
            "name": "C4",
            "midi": 60,
            "time": 104,
            "velocity": 0.41732283464566927,
            "duration": 0.5
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 104,
            "velocity": 0.5039370078740157,
            "duration": 0.1640625
          },
          {
            "name": "G#2",
            "midi": 44,
            "time": 104,
            "velocity": 0.5196850393700787,
            "duration": 0.5
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 104.1640625,
            "velocity": 0.44881889763779526,
            "duration": 0.16796875
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 104.33203125,
            "velocity": 0.48031496062992124,
            "duration": 0.16796875
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 104.5,
            "velocity": 0.5039370078740157,
            "duration": 0.5
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 104.5,
            "velocity": 0.5196850393700787,
            "duration": 0.1640625
          },
          {
            "name": "G2",
            "midi": 43,
            "time": 104.5,
            "velocity": 0.4409448818897638,
            "duration": 0.5
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 104.6640625,
            "velocity": 0.4645669291338583,
            "duration": 0.16796875
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 104.83203125,
            "velocity": 0.4881889763779528,
            "duration": 0.16796875
          },
          {
            "name": "G#4",
            "midi": 68,
            "time": 105,
            "velocity": 0.5354330708661418,
            "duration": 0.5
          },
          {
            "name": "C4",
            "midi": 60,
            "time": 105,
            "velocity": 0.5826771653543307,
            "duration": 0.1640625
          },
          {
            "name": "F2",
            "midi": 41,
            "time": 105,
            "velocity": 0.48031496062992124,
            "duration": 0.5
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 105.1640625,
            "velocity": 0.4566929133858268,
            "duration": 0.16796875
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 105.33203125,
            "velocity": 0.4566929133858268,
            "duration": 0.16796875
          },
          {
            "name": "A#4",
            "midi": 70,
            "time": 105.5,
            "velocity": 0.5196850393700787,
            "duration": 0.3203125
          },
          {
            "name": "D4",
            "midi": 62,
            "time": 105.5,
            "velocity": 0.5275590551181102,
            "duration": 0.1015625
          },
          {
            "name": "F3",
            "midi": 53,
            "time": 105.5,
            "velocity": 0.5275590551181102,
            "duration": 0.40234375
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 105.6640625,
            "velocity": 0.44881889763779526,
            "duration": 0.16796875
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 105.83203125,
            "velocity": 0.48031496062992124,
            "duration": 0.16796875
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 106,
            "velocity": 0.41732283464566927,
            "duration": 1.5
          },
          {
            "name": "G3",
            "midi": 55,
            "time": 106,
            "velocity": 0.48031496062992124,
            "duration": 0.1640625
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 106,
            "velocity": 0.4881889763779528,
            "duration": 1
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 106.1640625,
            "velocity": 0.4881889763779528,
            "duration": 0.16796875
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 106.33203125,
            "velocity": 0.4881889763779528,
            "duration": 0.16796875
          },
          {
            "name": "G3",
            "midi": 55,
            "time": 106.5,
            "velocity": 0.44881889763779526,
            "duration": 0.1640625
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 106.6640625,
            "velocity": 0.49606299212598426,
            "duration": 0.16796875
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 106.83203125,
            "velocity": 0.48031496062992124,
            "duration": 0.16796875
          },
          {
            "name": "G3",
            "midi": 55,
            "time": 107,
            "velocity": 0.4881889763779528,
            "duration": 0.1640625
          },
          {
            "name": "D#2",
            "midi": 39,
            "time": 107,
            "velocity": 0.4015748031496063,
            "duration": 1
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 107.1640625,
            "velocity": 0.4881889763779528,
            "duration": 0.16796875
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 107.33203125,
            "velocity": 0.47244094488188976,
            "duration": 0.16796875
          },
          {
            "name": "E4",
            "midi": 64,
            "time": 107.5,
            "velocity": 0.49606299212598426,
            "duration": 0.5
          },
          {
            "name": "G3",
            "midi": 55,
            "time": 107.5,
            "velocity": 0.4645669291338583,
            "duration": 0.1640625
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 107.6640625,
            "velocity": 0.47244094488188976,
            "duration": 0.16796875
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 107.83203125,
            "velocity": 0.48031496062992124,
            "duration": 0.16796875
          },
          {
            "name": "F4",
            "midi": 65,
            "time": 108,
            "velocity": 0.49606299212598426,
            "duration": 0.90234375
          },
          {
            "name": "G3",
            "midi": 55,
            "time": 108,
            "velocity": 0.4409448818897638,
            "duration": 0.12890625
          },
          {
            "name": "C#2",
            "midi": 37,
            "time": 108,
            "velocity": 0.4409448818897638,
            "duration": 1
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 108.1640625,
            "velocity": 0.49606299212598426,
            "duration": 0.16796875
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 108.33203125,
            "velocity": 0.47244094488188976,
            "duration": 0.16796875
          },
          {
            "name": "G3",
            "midi": 55,
            "time": 108.5,
            "velocity": 0.4251968503937008,
            "duration": 0.1640625
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 108.6640625,
            "velocity": 0.5118110236220472,
            "duration": 0.16796875
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 108.83203125,
            "velocity": 0.4881889763779528,
            "duration": 0.16796875
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 109,
            "velocity": 0.4330708661417323,
            "duration": 0.75
          },
          {
            "name": "G3",
            "midi": 55,
            "time": 109,
            "velocity": 0.4566929133858268,
            "duration": 0.1640625
          },
          {
            "name": "C#3",
            "midi": 49,
            "time": 109,
            "velocity": 0.5118110236220472,
            "duration": 0.90234375
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 109.1640625,
            "velocity": 0.44881889763779526,
            "duration": 0.16796875
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 109.33203125,
            "velocity": 0.44881889763779526,
            "duration": 0.16796875
          },
          {
            "name": "G3",
            "midi": 55,
            "time": 109.5,
            "velocity": 0.49606299212598426,
            "duration": 0.1640625
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 109.6640625,
            "velocity": 0.4251968503937008,
            "duration": 0.16796875
          },
          {
            "name": "C4",
            "midi": 60,
            "time": 109.75,
            "velocity": 0.5118110236220472,
            "duration": 0.125
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 109.83203125,
            "velocity": 0.44881889763779526,
            "duration": 0.1328125
          },
          {
            "name": "C#4",
            "midi": 61,
            "time": 109.875,
            "velocity": 0.49606299212598426,
            "duration": 0.09765625
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 110,
            "velocity": 0.48031496062992124,
            "duration": 1
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 110,
            "velocity": 0.5196850393700787,
            "duration": 0.1640625
          },
          {
            "name": "C3",
            "midi": 48,
            "time": 110,
            "velocity": 0.5039370078740157,
            "duration": 1
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 110.1640625,
            "velocity": 0.47244094488188976,
            "duration": 0.16796875
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 110.33203125,
            "velocity": 0.48031496062992124,
            "duration": 0.16796875
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 110.5,
            "velocity": 0.5039370078740157,
            "duration": 0.1640625
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 110.6640625,
            "velocity": 0.4330708661417323,
            "duration": 0.16796875
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 110.83203125,
            "velocity": 0.47244094488188976,
            "duration": 0.16796875
          },
          {
            "name": "A3",
            "midi": 57,
            "time": 111,
            "velocity": 0.4330708661417323,
            "duration": 1
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 111,
            "velocity": 0.4409448818897638,
            "duration": 0.1640625
          },
          {
            "name": "F2",
            "midi": 41,
            "time": 111,
            "velocity": 0.3937007874015748,
            "duration": 1
          },
          {
            "name": "C3",
            "midi": 48,
            "time": 111.1640625,
            "velocity": 0.49606299212598426,
            "duration": 0.16796875
          },
          {
            "name": "C3",
            "midi": 48,
            "time": 111.33203125,
            "velocity": 0.4566929133858268,
            "duration": 0.16796875
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 111.5,
            "velocity": 0.4645669291338583,
            "duration": 0.1640625
          },
          {
            "name": "C3",
            "midi": 48,
            "time": 111.6640625,
            "velocity": 0.4645669291338583,
            "duration": 0.16796875
          },
          {
            "name": "C3",
            "midi": 48,
            "time": 111.83203125,
            "velocity": 0.4881889763779528,
            "duration": 0.16796875
          },
          {
            "name": "C#4",
            "midi": 61,
            "time": 112,
            "velocity": 0.5118110236220472,
            "duration": 0.90234375
          },
          {
            "name": "F3",
            "midi": 53,
            "time": 112,
            "velocity": 0.4881889763779528,
            "duration": 0.12890625
          },
          {
            "name": "A#1",
            "midi": 34,
            "time": 112,
            "velocity": 0.4094488188976378,
            "duration": 1
          },
          {
            "name": "C#3",
            "midi": 49,
            "time": 112.1640625,
            "velocity": 0.4409448818897638,
            "duration": 0.16796875
          },
          {
            "name": "C#3",
            "midi": 49,
            "time": 112.33203125,
            "velocity": 0.5039370078740157,
            "duration": 0.16796875
          },
          {
            "name": "F3",
            "midi": 53,
            "time": 112.5,
            "velocity": 0.5275590551181102,
            "duration": 0.1640625
          },
          {
            "name": "C#3",
            "midi": 49,
            "time": 112.6640625,
            "velocity": 0.4881889763779528,
            "duration": 0.16796875
          },
          {
            "name": "C#3",
            "midi": 49,
            "time": 112.83203125,
            "velocity": 0.5039370078740157,
            "duration": 0.16796875
          },
          {
            "name": "C#4",
            "midi": 61,
            "time": 113,
            "velocity": 0.5196850393700787,
            "duration": 0.1640625
          },
          {
            "name": "G3",
            "midi": 55,
            "time": 113,
            "velocity": 0.5039370078740157,
            "duration": 0.1640625
          },
          {
            "name": "D#2",
            "midi": 39,
            "time": 113,
            "velocity": 0.5039370078740157,
            "duration": 0.90234375
          },
          {
            "name": "C4",
            "midi": 60,
            "time": 113.1640625,
            "velocity": 0.44881889763779526,
            "duration": 0.1328125
          },
          {
            "name": "C#3",
            "midi": 49,
            "time": 113.1640625,
            "velocity": 0.44881889763779526,
            "duration": 0.1328125
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 113.33203125,
            "velocity": 0.44881889763779526,
            "duration": 0.16796875
          },
          {
            "name": "C#3",
            "midi": 49,
            "time": 113.33203125,
            "velocity": 0.4645669291338583,
            "duration": 0.16796875
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 113.5,
            "velocity": 0.47244094488188976,
            "duration": 0.12890625
          },
          {
            "name": "C#3",
            "midi": 49,
            "time": 113.5,
            "velocity": 0.4645669291338583,
            "duration": 0.12890625
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 113.6640625,
            "velocity": 0.4409448818897638,
            "duration": 0.1328125
          },
          {
            "name": "C#3",
            "midi": 49,
            "time": 113.6640625,
            "velocity": 0.48031496062992124,
            "duration": 0.1328125
          },
          {
            "name": "G3",
            "midi": 55,
            "time": 113.83203125,
            "velocity": 0.4645669291338583,
            "duration": 0.16796875
          },
          {
            "name": "C#3",
            "midi": 49,
            "time": 113.83203125,
            "velocity": 0.48031496062992124,
            "duration": 0.16796875
          },
          {
            "name": "G3",
            "midi": 55,
            "time": 114,
            "velocity": 0.4645669291338583,
            "duration": 0.90234375
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 114,
            "velocity": 0.4645669291338583,
            "duration": 0.90234375
          },
          {
            "name": "C#3",
            "midi": 49,
            "time": 114,
            "velocity": 0.47244094488188976,
            "duration": 0.1640625
          },
          {
            "name": "G#1",
            "midi": 32,
            "time": 114,
            "velocity": 0.4566929133858268,
            "duration": 0.5
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 114.1640625,
            "velocity": 0.4881889763779528,
            "duration": 0.1328125
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 114.33203125,
            "velocity": 0.47244094488188976,
            "duration": 0.16796875
          },
          {
            "name": "C#3",
            "midi": 49,
            "time": 114.5,
            "velocity": 0.5118110236220472,
            "duration": 0.1640625
          },
          {
            "name": "G#2",
            "midi": 44,
            "time": 114.5,
            "velocity": 0.5118110236220472,
            "duration": 0.5
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 114.6640625,
            "velocity": 0.5275590551181102,
            "duration": 0.1328125
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 114.83203125,
            "velocity": 0.49606299212598426,
            "duration": 0.16796875
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 115,
            "velocity": 0.4881889763779528,
            "duration": 0.40234375
          },
          {
            "name": "C3",
            "midi": 48,
            "time": 115,
            "velocity": 0.48031496062992124,
            "duration": 0.12890625
          },
          {
            "name": "G#1",
            "midi": 32,
            "time": 115,
            "velocity": 0.4251968503937008,
            "duration": 0.5
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 115.1640625,
            "velocity": 0.5196850393700787,
            "duration": 0.08203125
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 115.33203125,
            "velocity": 0.4881889763779528,
            "duration": 0.08203125
          },
          {
            "name": "C4",
            "midi": 60,
            "time": 115.5,
            "velocity": 0.5039370078740157,
            "duration": 0.078125
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 115.6640625,
            "velocity": 0.48031496062992124,
            "duration": 0.08203125
          },
          {
            "name": "G#4",
            "midi": 68,
            "time": 115.83203125,
            "velocity": 0.5433070866141733,
            "duration": 0.08203125
          },
          {
            "name": "C4",
            "midi": 60,
            "time": 116,
            "velocity": 0.5118110236220472,
            "duration": 0.1640625
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 116,
            "velocity": 0.4330708661417323,
            "duration": 0.1640625
          },
          {
            "name": "C5",
            "midi": 72,
            "time": 116,
            "velocity": 0.41732283464566927,
            "duration": 1
          },
          {
            "name": "G#2",
            "midi": 44,
            "time": 116,
            "velocity": 0.4409448818897638,
            "duration": 1
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 116.1640625,
            "velocity": 0.5354330708661418,
            "duration": 0.1328125
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 116.1640625,
            "velocity": 0.4251968503937008,
            "duration": 0.1328125
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 116.33203125,
            "velocity": 0.49606299212598426,
            "duration": 0.16796875
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 116.33203125,
            "velocity": 0.4881889763779528,
            "duration": 0.16796875
          },
          {
            "name": "C4",
            "midi": 60,
            "time": 116.5,
            "velocity": 0.41732283464566927,
            "duration": 0.1640625
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 116.5,
            "velocity": 0.49606299212598426,
            "duration": 0.1640625
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 116.6640625,
            "velocity": 0.5118110236220472,
            "duration": 0.1328125
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 116.6640625,
            "velocity": 0.4566929133858268,
            "duration": 0.1328125
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 116.83203125,
            "velocity": 0.5196850393700787,
            "duration": 0.16796875
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 116.83203125,
            "velocity": 0.4645669291338583,
            "duration": 0.16796875
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 117,
            "velocity": 0.44881889763779526,
            "duration": 0.1640625
          },
          {
            "name": "G3",
            "midi": 55,
            "time": 117,
            "velocity": 0.5039370078740157,
            "duration": 0.1640625
          },
          {
            "name": "A#4",
            "midi": 70,
            "time": 117,
            "velocity": 0.4409448818897638,
            "duration": 0.70703125
          },
          {
            "name": "C#3",
            "midi": 49,
            "time": 117,
            "velocity": 0.5196850393700787,
            "duration": 0.70703125
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 117.1640625,
            "velocity": 0.5433070866141733,
            "duration": 0.1328125
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 117.1640625,
            "velocity": 0.44881889763779526,
            "duration": 0.1328125
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 117.33203125,
            "velocity": 0.5275590551181102,
            "duration": 0.16796875
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 117.33203125,
            "velocity": 0.4645669291338583,
            "duration": 0.16796875
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 117.5,
            "velocity": 0.48031496062992124,
            "duration": 0.1640625
          },
          {
            "name": "G3",
            "midi": 55,
            "time": 117.5,
            "velocity": 0.5275590551181102,
            "duration": 0.1640625
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 117.6640625,
            "velocity": 0.5669291338582677,
            "duration": 0.1328125
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 117.6640625,
            "velocity": 0.4566929133858268,
            "duration": 0.1328125
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 117.83203125,
            "velocity": 0.5433070866141733,
            "duration": 0.16796875
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 117.83203125,
            "velocity": 0.44881889763779526,
            "duration": 0.16796875
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 118,
            "velocity": 0.4566929133858268,
            "duration": 0.1640625
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 118,
            "velocity": 0.5039370078740157,
            "duration": 0.1640625
          },
          {
            "name": "D#5",
            "midi": 75,
            "time": 118,
            "velocity": 0.5196850393700787,
            "duration": 1.40234375
          },
          {
            "name": "C3",
            "midi": 48,
            "time": 118,
            "velocity": 0.4566929133858268,
            "duration": 0.90234375
          },
          {
            "name": "G#4",
            "midi": 68,
            "time": 118.1640625,
            "velocity": 0.5669291338582677,
            "duration": 0.1328125
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 118.1640625,
            "velocity": 0.4409448818897638,
            "duration": 0.1328125
          },
          {
            "name": "G#4",
            "midi": 68,
            "time": 118.33203125,
            "velocity": 0.5039370078740157,
            "duration": 0.16796875
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 118.33203125,
            "velocity": 0.4881889763779528,
            "duration": 0.16796875
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 118.5,
            "velocity": 0.4330708661417323,
            "duration": 0.1640625
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 118.5,
            "velocity": 0.5118110236220472,
            "duration": 0.1640625
          },
          {
            "name": "G#4",
            "midi": 68,
            "time": 118.6640625,
            "velocity": 0.5196850393700787,
            "duration": 0.1328125
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 118.6640625,
            "velocity": 0.4015748031496063,
            "duration": 0.1328125
          },
          {
            "name": "G#4",
            "midi": 68,
            "time": 118.83203125,
            "velocity": 0.48031496062992124,
            "duration": 0.16796875
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 118.83203125,
            "velocity": 0.49606299212598426,
            "duration": 0.16796875
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 119,
            "velocity": 0.4251968503937008,
            "duration": 0.1640625
          },
          {
            "name": "G3",
            "midi": 55,
            "time": 119,
            "velocity": 0.5118110236220472,
            "duration": 0.1640625
          },
          {
            "name": "G2",
            "midi": 43,
            "time": 119,
            "velocity": 0.44881889763779526,
            "duration": 0.90234375
          },
          {
            "name": "A#4",
            "midi": 70,
            "time": 119.1640625,
            "velocity": 0.5433070866141733,
            "duration": 0.1328125
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 119.1640625,
            "velocity": 0.4330708661417323,
            "duration": 0.1328125
          },
          {
            "name": "A#4",
            "midi": 70,
            "time": 119.33203125,
            "velocity": 0.4645669291338583,
            "duration": 0.16796875
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 119.33203125,
            "velocity": 0.5118110236220472,
            "duration": 0.16796875
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 119.5,
            "velocity": 0.3779527559055118,
            "duration": 0.12890625
          },
          {
            "name": "G3",
            "midi": 55,
            "time": 119.5,
            "velocity": 0.5275590551181102,
            "duration": 0.12890625
          },
          {
            "name": "C#5",
            "midi": 73,
            "time": 119.5,
            "velocity": 0.41732283464566927,
            "duration": 0.40234375
          },
          {
            "name": "A#4",
            "midi": 70,
            "time": 119.6640625,
            "velocity": 0.5354330708661418,
            "duration": 0.1328125
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 119.6640625,
            "velocity": 0.47244094488188976,
            "duration": 0.1328125
          },
          {
            "name": "A#4",
            "midi": 70,
            "time": 119.83203125,
            "velocity": 0.5275590551181102,
            "duration": 0.16796875
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 119.83203125,
            "velocity": 0.4566929133858268,
            "duration": 0.16796875
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 120,
            "velocity": 0.3779527559055118,
            "duration": 0.1640625
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 120,
            "velocity": 0.4881889763779528,
            "duration": 0.1640625
          },
          {
            "name": "C5",
            "midi": 72,
            "time": 120,
            "velocity": 0.4409448818897638,
            "duration": 0.5
          },
          {
            "name": "G#2",
            "midi": 44,
            "time": 120,
            "velocity": 0.4645669291338583,
            "duration": 0.5
          },
          {
            "name": "G#4",
            "midi": 68,
            "time": 120.1640625,
            "velocity": 0.5433070866141733,
            "duration": 0.1328125
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 120.1640625,
            "velocity": 0.4409448818897638,
            "duration": 0.1328125
          },
          {
            "name": "G#4",
            "midi": 68,
            "time": 120.33203125,
            "velocity": 0.4881889763779528,
            "duration": 0.16796875
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 120.33203125,
            "velocity": 0.44881889763779526,
            "duration": 0.16796875
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 120.5,
            "velocity": 0.3858267716535433,
            "duration": 0.1640625
          },
          {
            "name": "G3",
            "midi": 55,
            "time": 120.5,
            "velocity": 0.5118110236220472,
            "duration": 0.1640625
          },
          {
            "name": "D#5",
            "midi": 75,
            "time": 120.5,
            "velocity": 0.5196850393700787,
            "duration": 0.40234375
          },
          {
            "name": "G2",
            "midi": 43,
            "time": 120.5,
            "velocity": 0.44881889763779526,
            "duration": 0.40234375
          },
          {
            "name": "A#4",
            "midi": 70,
            "time": 120.6640625,
            "velocity": 0.5669291338582677,
            "duration": 0.1328125
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 120.6640625,
            "velocity": 0.4409448818897638,
            "duration": 0.1328125
          },
          {
            "name": "A#4",
            "midi": 70,
            "time": 120.83203125,
            "velocity": 0.47244094488188976,
            "duration": 0.16796875
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 120.83203125,
            "velocity": 0.4645669291338583,
            "duration": 0.16796875
          },
          {
            "name": "G#4",
            "midi": 68,
            "time": 121,
            "velocity": 0.44881889763779526,
            "duration": 0.1640625
          },
          {
            "name": "F3",
            "midi": 53,
            "time": 121,
            "velocity": 0.5118110236220472,
            "duration": 0.1640625
          },
          {
            "name": "G#5",
            "midi": 80,
            "time": 121,
            "velocity": 0.5511811023622047,
            "duration": 0.40234375
          },
          {
            "name": "F2",
            "midi": 41,
            "time": 121,
            "velocity": 0.4566929133858268,
            "duration": 0.40234375
          },
          {
            "name": "C5",
            "midi": 72,
            "time": 121.1640625,
            "velocity": 0.5275590551181102,
            "duration": 0.1328125
          },
          {
            "name": "G#2",
            "midi": 44,
            "time": 121.1640625,
            "velocity": 0.4330708661417323,
            "duration": 0.1328125
          },
          {
            "name": "C5",
            "midi": 72,
            "time": 121.33203125,
            "velocity": 0.49606299212598426,
            "duration": 0.16796875
          },
          {
            "name": "G#2",
            "midi": 44,
            "time": 121.33203125,
            "velocity": 0.4566929133858268,
            "duration": 0.16796875
          },
          {
            "name": "G#4",
            "midi": 68,
            "time": 121.5,
            "velocity": 0.4330708661417323,
            "duration": 0.12890625
          },
          {
            "name": "F3",
            "midi": 53,
            "time": 121.5,
            "velocity": 0.5275590551181102,
            "duration": 0.12890625
          },
          {
            "name": "A#5",
            "midi": 82,
            "time": 121.5,
            "velocity": 0.49606299212598426,
            "duration": 0.25390625
          },
          {
            "name": "F2",
            "midi": 41,
            "time": 121.5,
            "velocity": 0.48031496062992124,
            "duration": 0.25390625
          },
          {
            "name": "D5",
            "midi": 74,
            "time": 121.6640625,
            "velocity": 0.5511811023622047,
            "duration": 0.1328125
          },
          {
            "name": "G#2",
            "midi": 44,
            "time": 121.6640625,
            "velocity": 0.4251968503937008,
            "duration": 0.1328125
          },
          {
            "name": "D5",
            "midi": 74,
            "time": 121.83203125,
            "velocity": 0.48031496062992124,
            "duration": 0.16796875
          },
          {
            "name": "G#2",
            "midi": 44,
            "time": 121.83203125,
            "velocity": 0.4330708661417323,
            "duration": 0.16796875
          },
          {
            "name": "D#5",
            "midi": 75,
            "time": 122,
            "velocity": 0.47244094488188976,
            "duration": 1.40234375
          },
          {
            "name": "G4",
            "midi": 67,
            "time": 122,
            "velocity": 0.6535433070866141,
            "duration": 0.1640625
          },
          {
            "name": "D#2",
            "midi": 39,
            "time": 122,
            "velocity": 0.41732283464566927,
            "duration": 0.078125
          },
          {
            "name": "A#4",
            "midi": 70,
            "time": 122.1640625,
            "velocity": 0.5354330708661418,
            "duration": 0.1328125
          },
          {
            "name": "G2",
            "midi": 43,
            "time": 122.1640625,
            "velocity": 0.5196850393700787,
            "duration": 0.08203125
          },
          {
            "name": "A#4",
            "midi": 70,
            "time": 122.33203125,
            "velocity": 0.5118110236220472,
            "duration": 0.16796875
          },
          {
            "name": "A#2",
            "midi": 46,
            "time": 122.33203125,
            "velocity": 0.44881889763779526,
            "duration": 0.08203125
          },
          {
            "name": "G4",
            "midi": 67,
            "time": 122.5,
            "velocity": 0.4251968503937008,
            "duration": 0.1640625
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 122.5,
            "velocity": 0.5039370078740157,
            "duration": 0.078125
          },
          {
            "name": "A#4",
            "midi": 70,
            "time": 122.6640625,
            "velocity": 0.5118110236220472,
            "duration": 0.1328125
          },
          {
            "name": "G3",
            "midi": 55,
            "time": 122.6640625,
            "velocity": 0.4881889763779528,
            "duration": 0.08203125
          },
          {
            "name": "A#4",
            "midi": 70,
            "time": 122.83203125,
            "velocity": 0.48031496062992124,
            "duration": 0.16796875
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 122.83203125,
            "velocity": 0.5354330708661418,
            "duration": 0.08203125
          },
          {
            "name": "G4",
            "midi": 67,
            "time": 123,
            "velocity": 0.44881889763779526,
            "duration": 0.1640625
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 123,
            "velocity": 0.5590551181102362,
            "duration": 1
          },
          {
            "name": "A#4",
            "midi": 70,
            "time": 123.1640625,
            "velocity": 0.5196850393700787,
            "duration": 0.1328125
          },
          {
            "name": "A#4",
            "midi": 70,
            "time": 123.33203125,
            "velocity": 0.48031496062992124,
            "duration": 0.16796875
          },
          {
            "name": "E5",
            "midi": 76,
            "time": 123.5,
            "velocity": 0.48031496062992124,
            "duration": 0.40234375
          },
          {
            "name": "G4",
            "midi": 67,
            "time": 123.5,
            "velocity": 0.3937007874015748,
            "duration": 0.1640625
          },
          {
            "name": "A#4",
            "midi": 70,
            "time": 123.6640625,
            "velocity": 0.5275590551181102,
            "duration": 0.1328125
          },
          {
            "name": "A#4",
            "midi": 70,
            "time": 123.83203125,
            "velocity": 0.47244094488188976,
            "duration": 0.16796875
          },
          {
            "name": "F5",
            "midi": 77,
            "time": 124,
            "velocity": 0.48031496062992124,
            "duration": 0.90234375
          },
          {
            "name": "G4",
            "midi": 67,
            "time": 124,
            "velocity": 0.41732283464566927,
            "duration": 0.1640625
          },
          {
            "name": "C#2",
            "midi": 37,
            "time": 124,
            "velocity": 0.3937007874015748,
            "duration": 0.078125
          },
          {
            "name": "A#4",
            "midi": 70,
            "time": 124.1640625,
            "velocity": 0.5433070866141733,
            "duration": 0.1328125
          },
          {
            "name": "G2",
            "midi": 43,
            "time": 124.1640625,
            "velocity": 0.5196850393700787,
            "duration": 0.08203125
          },
          {
            "name": "A#4",
            "midi": 70,
            "time": 124.33203125,
            "velocity": 0.4566929133858268,
            "duration": 0.16796875
          },
          {
            "name": "A#2",
            "midi": 46,
            "time": 124.33203125,
            "velocity": 0.5118110236220472,
            "duration": 0.08203125
          },
          {
            "name": "G4",
            "midi": 67,
            "time": 124.5,
            "velocity": 0.41732283464566927,
            "duration": 0.1640625
          },
          {
            "name": "C#3",
            "midi": 49,
            "time": 124.5,
            "velocity": 0.4881889763779528,
            "duration": 0.078125
          },
          {
            "name": "A#4",
            "midi": 70,
            "time": 124.6640625,
            "velocity": 0.5275590551181102,
            "duration": 0.1328125
          },
          {
            "name": "G3",
            "midi": 55,
            "time": 124.6640625,
            "velocity": 0.5275590551181102,
            "duration": 0.08203125
          },
          {
            "name": "A#4",
            "midi": 70,
            "time": 124.83203125,
            "velocity": 0.49606299212598426,
            "duration": 0.16796875
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 124.83203125,
            "velocity": 0.49606299212598426,
            "duration": 0.08203125
          },
          {
            "name": "A#4",
            "midi": 70,
            "time": 125,
            "velocity": 0.3700787401574803,
            "duration": 0.65234375
          },
          {
            "name": "G4",
            "midi": 67,
            "time": 125,
            "velocity": 0.4566929133858268,
            "duration": 0.1640625
          },
          {
            "name": "C#4",
            "midi": 61,
            "time": 125,
            "velocity": 0.5196850393700787,
            "duration": 1
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 125.1640625,
            "velocity": 0.4094488188976378,
            "duration": 0.1328125
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 125.33203125,
            "velocity": 0.4409448818897638,
            "duration": 0.16796875
          },
          {
            "name": "G4",
            "midi": 67,
            "time": 125.5,
            "velocity": 0.5039370078740157,
            "duration": 0.1640625
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 125.6640625,
            "velocity": 0.4251968503937008,
            "duration": 0.1328125
          },
          {
            "name": "C5",
            "midi": 72,
            "time": 125.75,
            "velocity": 0.47244094488188976,
            "duration": 0.125
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 125.83203125,
            "velocity": 0.48031496062992124,
            "duration": 0.1328125
          },
          {
            "name": "C#5",
            "midi": 73,
            "time": 125.875,
            "velocity": 0.4881889763779528,
            "duration": 0.09765625
          },
          {
            "name": "D#5",
            "midi": 75,
            "time": 126,
            "velocity": 0.5118110236220472,
            "duration": 0.90234375
          },
          {
            "name": "G#4",
            "midi": 68,
            "time": 126,
            "velocity": 0.5433070866141733,
            "duration": 0.1640625
          },
          {
            "name": "C4",
            "midi": 60,
            "time": 126,
            "velocity": 0.49606299212598426,
            "duration": 1
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 126.1640625,
            "velocity": 0.4330708661417323,
            "duration": 0.1328125
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 126.33203125,
            "velocity": 0.47244094488188976,
            "duration": 0.16796875
          },
          {
            "name": "G#4",
            "midi": 68,
            "time": 126.5,
            "velocity": 0.5905511811023622,
            "duration": 0.1640625
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 126.6640625,
            "velocity": 0.4015748031496063,
            "duration": 0.1328125
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 126.83203125,
            "velocity": 0.44881889763779526,
            "duration": 0.16796875
          },
          {
            "name": "A4",
            "midi": 69,
            "time": 127,
            "velocity": 0.4094488188976378,
            "duration": 0.90234375
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 127,
            "velocity": 0.49606299212598426,
            "duration": 0.1640625
          },
          {
            "name": "F3",
            "midi": 53,
            "time": 127,
            "velocity": 0.41732283464566927,
            "duration": 1
          },
          {
            "name": "C4",
            "midi": 60,
            "time": 127.1640625,
            "velocity": 0.4015748031496063,
            "duration": 0.1328125
          },
          {
            "name": "C4",
            "midi": 60,
            "time": 127.33203125,
            "velocity": 0.47244094488188976,
            "duration": 0.16796875
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 127.5,
            "velocity": 0.5039370078740157,
            "duration": 0.1640625
          },
          {
            "name": "C4",
            "midi": 60,
            "time": 127.6640625,
            "velocity": 0.4645669291338583,
            "duration": 0.1328125
          },
          {
            "name": "C4",
            "midi": 60,
            "time": 127.83203125,
            "velocity": 0.4566929133858268,
            "duration": 0.16796875
          },
          {
            "name": "C#5",
            "midi": 73,
            "time": 128,
            "velocity": 0.5354330708661418,
            "duration": 0.8046875
          },
          {
            "name": "F4",
            "midi": 65,
            "time": 128,
            "velocity": 0.5196850393700787,
            "duration": 0.12890625
          },
          {
            "name": "A#2",
            "midi": 46,
            "time": 128,
            "velocity": 0.44881889763779526,
            "duration": 0.90234375
          },
          {
            "name": "C#4",
            "midi": 61,
            "time": 128.1640625,
            "velocity": 0.4015748031496063,
            "duration": 0.1328125
          },
          {
            "name": "C#4",
            "midi": 61,
            "time": 128.33203125,
            "velocity": 0.4645669291338583,
            "duration": 0.16796875
          },
          {
            "name": "F4",
            "midi": 65,
            "time": 128.5,
            "velocity": 0.5511811023622047,
            "duration": 0.1640625
          },
          {
            "name": "C#4",
            "midi": 61,
            "time": 128.6640625,
            "velocity": 0.41732283464566927,
            "duration": 0.1328125
          },
          {
            "name": "C#4",
            "midi": 61,
            "time": 128.83203125,
            "velocity": 0.48031496062992124,
            "duration": 0.16796875
          },
          {
            "name": "C#5",
            "midi": 73,
            "time": 129,
            "velocity": 0.5039370078740157,
            "duration": 0.1640625
          },
          {
            "name": "G4",
            "midi": 67,
            "time": 129,
            "velocity": 0.5275590551181102,
            "duration": 0.1640625
          },
          {
            "name": "A#2",
            "midi": 46,
            "time": 129,
            "velocity": 0.47244094488188976,
            "duration": 0.1640625
          },
          {
            "name": "D#2",
            "midi": 39,
            "time": 129,
            "velocity": 0.4881889763779528,
            "duration": 0.5
          },
          {
            "name": "C5",
            "midi": 72,
            "time": 129.1640625,
            "velocity": 0.47244094488188976,
            "duration": 0.10546875
          },
          {
            "name": "C#4",
            "midi": 61,
            "time": 129.1640625,
            "velocity": 0.4015748031496063,
            "duration": 0.10546875
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 129.1640625,
            "velocity": 0.5039370078740157,
            "duration": 0.16796875
          },
          {
            "name": "A#4",
            "midi": 70,
            "time": 129.33203125,
            "velocity": 0.4409448818897638,
            "duration": 0.16796875
          },
          {
            "name": "C#4",
            "midi": 61,
            "time": 129.33203125,
            "velocity": 0.4645669291338583,
            "duration": 0.16796875
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 129.33203125,
            "velocity": 0.5039370078740157,
            "duration": 0.16796875
          },
          {
            "name": "A#4",
            "midi": 70,
            "time": 129.5,
            "velocity": 0.47244094488188976,
            "duration": 0.1640625
          },
          {
            "name": "C#4",
            "midi": 61,
            "time": 129.5,
            "velocity": 0.48031496062992124,
            "duration": 0.1640625
          },
          {
            "name": "D#2",
            "midi": 39,
            "time": 129.5,
            "velocity": 0.4251968503937008,
            "duration": 0.1640625
          },
          {
            "name": "D#2",
            "midi": 39,
            "time": 129.5,
            "velocity": 0.48031496062992124,
            "duration": 0.5
          },
          {
            "name": "G#4",
            "midi": 68,
            "time": 129.6640625,
            "velocity": 0.4409448818897638,
            "duration": 0.10546875
          },
          {
            "name": "C#4",
            "midi": 61,
            "time": 129.6640625,
            "velocity": 0.4645669291338583,
            "duration": 0.10546875
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 129.6640625,
            "velocity": 0.5590551181102362,
            "duration": 0.16796875
          },
          {
            "name": "G4",
            "midi": 67,
            "time": 129.83203125,
            "velocity": 0.44881889763779526,
            "duration": 0.16796875
          },
          {
            "name": "C#4",
            "midi": 61,
            "time": 129.83203125,
            "velocity": 0.48031496062992124,
            "duration": 0.16796875
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 129.83203125,
            "velocity": 0.48031496062992124,
            "duration": 0.16796875
          },
          {
            "name": "G#4",
            "midi": 68,
            "time": 130,
            "velocity": 0.47244094488188976,
            "duration": 0.40234375
          },
          {
            "name": "C4",
            "midi": 60,
            "time": 130,
            "velocity": 0.4330708661417323,
            "duration": 0.40234375
          },
          {
            "name": "G#2",
            "midi": 44,
            "time": 130,
            "velocity": 0.4566929133858268,
            "duration": 0.1640625
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 130.1640625,
            "velocity": 0.4251968503937008,
            "duration": 0.08203125
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 130.33203125,
            "velocity": 0.3937007874015748,
            "duration": 0.0625
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 130.5,
            "velocity": 0.3779527559055118,
            "duration": 0.078125
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 130.6640625,
            "velocity": 0.4094488188976378,
            "duration": 0.0625
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 130.83203125,
            "velocity": 0.4251968503937008,
            "duration": 0.08203125
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 131,
            "velocity": 0.4251968503937008,
            "duration": 0.1640625
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 131.1640625,
            "velocity": 0.4094488188976378,
            "duration": 0.16796875
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 131.33203125,
            "velocity": 0.4015748031496063,
            "duration": 0.16796875
          },
          {
            "name": "D#5",
            "midi": 75,
            "time": 131.5,
            "velocity": 0.33070866141732286,
            "duration": 0.375
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 131.5,
            "velocity": 0.41732283464566927,
            "duration": 0.1640625
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 131.6640625,
            "velocity": 0.36220472440944884,
            "duration": 0.16796875
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 131.83203125,
            "velocity": 0.4094488188976378,
            "duration": 0.16796875
          },
          {
            "name": "E5",
            "midi": 76,
            "time": 131.875,
            "velocity": 0.4409448818897638,
            "duration": 0.125
          },
          {
            "name": "F5",
            "midi": 77,
            "time": 132,
            "velocity": 0.4094488188976378,
            "duration": 0.6640625
          },
          {
            "name": "D#2",
            "midi": 39,
            "time": 132,
            "velocity": 0.3700787401574803,
            "duration": 0.1640625
          },
          {
            "name": "C#3",
            "midi": 49,
            "time": 132,
            "velocity": 0.3700787401574803,
            "duration": 0.1640625
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 132,
            "velocity": 0.3700787401574803,
            "duration": 0.1640625
          },
          {
            "name": "D#2",
            "midi": 39,
            "time": 132.1640625,
            "velocity": 0.47244094488188976,
            "duration": 0.16796875
          },
          {
            "name": "C#3",
            "midi": 49,
            "time": 132.1640625,
            "velocity": 0.47244094488188976,
            "duration": 0.16796875
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 132.1640625,
            "velocity": 0.47244094488188976,
            "duration": 0.16796875
          },
          {
            "name": "D#2",
            "midi": 39,
            "time": 132.33203125,
            "velocity": 0.5275590551181102,
            "duration": 0.16796875
          },
          {
            "name": "C#3",
            "midi": 49,
            "time": 132.33203125,
            "velocity": 0.5275590551181102,
            "duration": 0.16796875
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 132.33203125,
            "velocity": 0.5275590551181102,
            "duration": 0.16796875
          },
          {
            "name": "D#2",
            "midi": 39,
            "time": 132.5,
            "velocity": 0.6062992125984252,
            "duration": 0.1640625
          },
          {
            "name": "C#3",
            "midi": 49,
            "time": 132.5,
            "velocity": 0.6062992125984252,
            "duration": 0.1640625
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 132.5,
            "velocity": 0.6062992125984252,
            "duration": 0.1640625
          },
          {
            "name": "D#5",
            "midi": 75,
            "time": 132.6640625,
            "velocity": 0.6692913385826772,
            "duration": 0.1328125
          },
          {
            "name": "D#2",
            "midi": 39,
            "time": 132.6640625,
            "velocity": 0.6850393700787402,
            "duration": 0.16796875
          },
          {
            "name": "C#3",
            "midi": 49,
            "time": 132.6640625,
            "velocity": 0.6850393700787402,
            "duration": 0.16796875
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 132.6640625,
            "velocity": 0.6850393700787402,
            "duration": 0.16796875
          },
          {
            "name": "C#5",
            "midi": 73,
            "time": 132.83203125,
            "velocity": 0.7165354330708661,
            "duration": 0.08203125
          },
          {
            "name": "D#2",
            "midi": 39,
            "time": 132.83203125,
            "velocity": 0.7559055118110236,
            "duration": 0.16796875
          },
          {
            "name": "C#3",
            "midi": 49,
            "time": 132.83203125,
            "velocity": 0.7559055118110236,
            "duration": 0.16796875
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 132.83203125,
            "velocity": 0.7559055118110236,
            "duration": 0.16796875
          },
          {
            "name": "C5",
            "midi": 72,
            "time": 133,
            "velocity": 0.6929133858267716,
            "duration": 0.078125
          },
          {
            "name": "D#2",
            "midi": 39,
            "time": 133,
            "velocity": 0.7480314960629921,
            "duration": 0.1640625
          },
          {
            "name": "C#3",
            "midi": 49,
            "time": 133,
            "velocity": 0.7480314960629921,
            "duration": 0.1640625
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 133,
            "velocity": 0.7480314960629921,
            "duration": 0.1640625
          },
          {
            "name": "A#4",
            "midi": 70,
            "time": 133.1640625,
            "velocity": 0.7086614173228346,
            "duration": 0.08203125
          },
          {
            "name": "D#2",
            "midi": 39,
            "time": 133.1640625,
            "velocity": 0.7401574803149606,
            "duration": 0.16796875
          },
          {
            "name": "C#3",
            "midi": 49,
            "time": 133.1640625,
            "velocity": 0.7401574803149606,
            "duration": 0.16796875
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 133.1640625,
            "velocity": 0.7401574803149606,
            "duration": 0.16796875
          },
          {
            "name": "G#4",
            "midi": 68,
            "time": 133.33203125,
            "velocity": 0.5826771653543307,
            "duration": 0.0625
          },
          {
            "name": "D#2",
            "midi": 39,
            "time": 133.33203125,
            "velocity": 0.6141732283464567,
            "duration": 0.16796875
          },
          {
            "name": "C#3",
            "midi": 49,
            "time": 133.33203125,
            "velocity": 0.6141732283464567,
            "duration": 0.16796875
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 133.33203125,
            "velocity": 0.6141732283464567,
            "duration": 0.16796875
          },
          {
            "name": "G4",
            "midi": 67,
            "time": 133.5,
            "velocity": 0.5196850393700787,
            "duration": 0.1640625
          },
          {
            "name": "D#2",
            "midi": 39,
            "time": 133.5,
            "velocity": 0.5275590551181102,
            "duration": 0.1640625
          },
          {
            "name": "C#3",
            "midi": 49,
            "time": 133.5,
            "velocity": 0.5275590551181102,
            "duration": 0.1640625
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 133.5,
            "velocity": 0.5275590551181102,
            "duration": 0.1640625
          },
          {
            "name": "C#5",
            "midi": 73,
            "time": 133.6640625,
            "velocity": 0.48031496062992124,
            "duration": 0.16796875
          },
          {
            "name": "D#2",
            "midi": 39,
            "time": 133.6640625,
            "velocity": 0.4645669291338583,
            "duration": 0.16796875
          },
          {
            "name": "C#3",
            "midi": 49,
            "time": 133.6640625,
            "velocity": 0.4645669291338583,
            "duration": 0.16796875
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 133.6640625,
            "velocity": 0.4645669291338583,
            "duration": 0.16796875
          },
          {
            "name": "G4",
            "midi": 67,
            "time": 133.83203125,
            "velocity": 0.3464566929133858,
            "duration": 0.1328125
          },
          {
            "name": "D#2",
            "midi": 39,
            "time": 133.83203125,
            "velocity": 0.36220472440944884,
            "duration": 0.16796875
          },
          {
            "name": "C#3",
            "midi": 49,
            "time": 133.83203125,
            "velocity": 0.36220472440944884,
            "duration": 0.16796875
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 133.83203125,
            "velocity": 0.36220472440944884,
            "duration": 0.16796875
          },
          {
            "name": "G#4",
            "midi": 68,
            "time": 134,
            "velocity": 0.3937007874015748,
            "duration": 0.375
          },
          {
            "name": "G#2",
            "midi": 44,
            "time": 134,
            "velocity": 0.3700787401574803,
            "duration": 0.1640625
          },
          {
            "name": "C3",
            "midi": 48,
            "time": 134,
            "velocity": 0.3700787401574803,
            "duration": 0.1640625
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 134,
            "velocity": 0.3700787401574803,
            "duration": 0.1640625
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 134.1640625,
            "velocity": 0.3779527559055118,
            "duration": 0.16796875
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 134.33203125,
            "velocity": 0.3700787401574803,
            "duration": 0.16796875
          },
          {
            "name": "C5",
            "midi": 72,
            "time": 134.375,
            "velocity": 0.4094488188976378,
            "duration": 0.125
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 134.5,
            "velocity": 0.28346456692913385,
            "duration": 0.40234375
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 134.5,
            "velocity": 0.3779527559055118,
            "duration": 0.1640625
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 134.6640625,
            "velocity": 0.4015748031496063,
            "duration": 0.16796875
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 134.83203125,
            "velocity": 0.4094488188976378,
            "duration": 0.16796875
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 135,
            "velocity": 0.4251968503937008,
            "duration": 0.1640625
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 135.1640625,
            "velocity": 0.3700787401574803,
            "duration": 0.16796875
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 135.33203125,
            "velocity": 0.3858267716535433,
            "duration": 0.16796875
          },
          {
            "name": "D#5",
            "midi": 75,
            "time": 135.5,
            "velocity": 0.3228346456692913,
            "duration": 0.375
          },
          {
            "name": "D#6",
            "midi": 87,
            "time": 135.5,
            "velocity": 0.3228346456692913,
            "duration": 0.375
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 135.5,
            "velocity": 0.4409448818897638,
            "duration": 0.1640625
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 135.6640625,
            "velocity": 0.36220472440944884,
            "duration": 0.16796875
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 135.83203125,
            "velocity": 0.3464566929133858,
            "duration": 0.16796875
          },
          {
            "name": "E5",
            "midi": 76,
            "time": 135.875,
            "velocity": 0.41732283464566927,
            "duration": 0.09765625
          },
          {
            "name": "E6",
            "midi": 88,
            "time": 135.875,
            "velocity": 0.41732283464566927,
            "duration": 0.09765625
          },
          {
            "name": "F5",
            "midi": 77,
            "time": 136,
            "velocity": 0.3858267716535433,
            "duration": 0.6640625
          },
          {
            "name": "F6",
            "midi": 89,
            "time": 136,
            "velocity": 0.3858267716535433,
            "duration": 0.6640625
          },
          {
            "name": "D#2",
            "midi": 39,
            "time": 136,
            "velocity": 0.3700787401574803,
            "duration": 0.1640625
          },
          {
            "name": "C#3",
            "midi": 49,
            "time": 136,
            "velocity": 0.3700787401574803,
            "duration": 0.1640625
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 136,
            "velocity": 0.3700787401574803,
            "duration": 0.1640625
          },
          {
            "name": "D#2",
            "midi": 39,
            "time": 136.1640625,
            "velocity": 0.4645669291338583,
            "duration": 0.16796875
          },
          {
            "name": "C#3",
            "midi": 49,
            "time": 136.1640625,
            "velocity": 0.4645669291338583,
            "duration": 0.16796875
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 136.1640625,
            "velocity": 0.4645669291338583,
            "duration": 0.16796875
          },
          {
            "name": "D#2",
            "midi": 39,
            "time": 136.33203125,
            "velocity": 0.5354330708661418,
            "duration": 0.16796875
          },
          {
            "name": "C#3",
            "midi": 49,
            "time": 136.33203125,
            "velocity": 0.5354330708661418,
            "duration": 0.16796875
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 136.33203125,
            "velocity": 0.5354330708661418,
            "duration": 0.16796875
          },
          {
            "name": "D#2",
            "midi": 39,
            "time": 136.5,
            "velocity": 0.6062992125984252,
            "duration": 0.1640625
          },
          {
            "name": "C#3",
            "midi": 49,
            "time": 136.5,
            "velocity": 0.6062992125984252,
            "duration": 0.1640625
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 136.5,
            "velocity": 0.6062992125984252,
            "duration": 0.1640625
          },
          {
            "name": "D#5",
            "midi": 75,
            "time": 136.6640625,
            "velocity": 0.6692913385826772,
            "duration": 0.1328125
          },
          {
            "name": "D#6",
            "midi": 87,
            "time": 136.6640625,
            "velocity": 0.6692913385826772,
            "duration": 0.1328125
          },
          {
            "name": "D#2",
            "midi": 39,
            "time": 136.6640625,
            "velocity": 0.6771653543307087,
            "duration": 0.16796875
          },
          {
            "name": "C#3",
            "midi": 49,
            "time": 136.6640625,
            "velocity": 0.6771653543307087,
            "duration": 0.16796875
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 136.6640625,
            "velocity": 0.6771653543307087,
            "duration": 0.16796875
          },
          {
            "name": "C#5",
            "midi": 73,
            "time": 136.83203125,
            "velocity": 0.7007874015748031,
            "duration": 0.08203125
          },
          {
            "name": "C#6",
            "midi": 85,
            "time": 136.83203125,
            "velocity": 0.7007874015748031,
            "duration": 0.08203125
          },
          {
            "name": "D#2",
            "midi": 39,
            "time": 136.83203125,
            "velocity": 0.7716535433070866,
            "duration": 0.16796875
          },
          {
            "name": "C#3",
            "midi": 49,
            "time": 136.83203125,
            "velocity": 0.7716535433070866,
            "duration": 0.16796875
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 136.83203125,
            "velocity": 0.7716535433070866,
            "duration": 0.16796875
          },
          {
            "name": "C5",
            "midi": 72,
            "time": 137,
            "velocity": 0.7401574803149606,
            "duration": 0.078125
          },
          {
            "name": "C6",
            "midi": 84,
            "time": 137,
            "velocity": 0.7401574803149606,
            "duration": 0.078125
          },
          {
            "name": "D#2",
            "midi": 39,
            "time": 137,
            "velocity": 0.7952755905511811,
            "duration": 0.1640625
          },
          {
            "name": "C#3",
            "midi": 49,
            "time": 137,
            "velocity": 0.7952755905511811,
            "duration": 0.1640625
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 137,
            "velocity": 0.7952755905511811,
            "duration": 0.1640625
          },
          {
            "name": "A#4",
            "midi": 70,
            "time": 137.1640625,
            "velocity": 0.6456692913385826,
            "duration": 0.08203125
          },
          {
            "name": "A#5",
            "midi": 82,
            "time": 137.1640625,
            "velocity": 0.6456692913385826,
            "duration": 0.08203125
          },
          {
            "name": "D#2",
            "midi": 39,
            "time": 137.1640625,
            "velocity": 0.7165354330708661,
            "duration": 0.16796875
          },
          {
            "name": "C#3",
            "midi": 49,
            "time": 137.1640625,
            "velocity": 0.7165354330708661,
            "duration": 0.16796875
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 137.1640625,
            "velocity": 0.7165354330708661,
            "duration": 0.16796875
          },
          {
            "name": "G#4",
            "midi": 68,
            "time": 137.33203125,
            "velocity": 0.5905511811023622,
            "duration": 0.0625
          },
          {
            "name": "G#5",
            "midi": 80,
            "time": 137.33203125,
            "velocity": 0.5905511811023622,
            "duration": 0.0625
          },
          {
            "name": "D#2",
            "midi": 39,
            "time": 137.33203125,
            "velocity": 0.6299212598425197,
            "duration": 0.16796875
          },
          {
            "name": "C#3",
            "midi": 49,
            "time": 137.33203125,
            "velocity": 0.6299212598425197,
            "duration": 0.16796875
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 137.33203125,
            "velocity": 0.6299212598425197,
            "duration": 0.16796875
          },
          {
            "name": "G4",
            "midi": 67,
            "time": 137.5,
            "velocity": 0.5196850393700787,
            "duration": 0.1640625
          },
          {
            "name": "G5",
            "midi": 79,
            "time": 137.5,
            "velocity": 0.5196850393700787,
            "duration": 0.1640625
          },
          {
            "name": "D#2",
            "midi": 39,
            "time": 137.5,
            "velocity": 0.5590551181102362,
            "duration": 0.1640625
          },
          {
            "name": "C#3",
            "midi": 49,
            "time": 137.5,
            "velocity": 0.5590551181102362,
            "duration": 0.1640625
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 137.5,
            "velocity": 0.5590551181102362,
            "duration": 0.1640625
          },
          {
            "name": "C#5",
            "midi": 73,
            "time": 137.6640625,
            "velocity": 0.48031496062992124,
            "duration": 0.16796875
          },
          {
            "name": "C#6",
            "midi": 85,
            "time": 137.6640625,
            "velocity": 0.48031496062992124,
            "duration": 0.16796875
          },
          {
            "name": "D#2",
            "midi": 39,
            "time": 137.6640625,
            "velocity": 0.4645669291338583,
            "duration": 0.16796875
          },
          {
            "name": "C#3",
            "midi": 49,
            "time": 137.6640625,
            "velocity": 0.4645669291338583,
            "duration": 0.16796875
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 137.6640625,
            "velocity": 0.4645669291338583,
            "duration": 0.16796875
          },
          {
            "name": "G4",
            "midi": 67,
            "time": 137.83203125,
            "velocity": 0.31496062992125984,
            "duration": 0.1328125
          },
          {
            "name": "G5",
            "midi": 79,
            "time": 137.83203125,
            "velocity": 0.31496062992125984,
            "duration": 0.1328125
          },
          {
            "name": "D#2",
            "midi": 39,
            "time": 137.83203125,
            "velocity": 0.33070866141732286,
            "duration": 0.16796875
          },
          {
            "name": "C#3",
            "midi": 49,
            "time": 137.83203125,
            "velocity": 0.33070866141732286,
            "duration": 0.16796875
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 137.83203125,
            "velocity": 0.33070866141732286,
            "duration": 0.16796875
          },
          {
            "name": "G#4",
            "midi": 68,
            "time": 138,
            "velocity": 0.3700787401574803,
            "duration": 0.5
          },
          {
            "name": "G#5",
            "midi": 80,
            "time": 138,
            "velocity": 0.3700787401574803,
            "duration": 0.5
          },
          {
            "name": "G#2",
            "midi": 44,
            "time": 138,
            "velocity": 0.3858267716535433,
            "duration": 0.5
          },
          {
            "name": "C3",
            "midi": 48,
            "time": 138,
            "velocity": 0.3858267716535433,
            "duration": 0.5
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 138,
            "velocity": 0.3858267716535433,
            "duration": 0.5
          },
          {
            "name": "D#5",
            "midi": 75,
            "time": 138.9609375,
            "velocity": 0.4645669291338583,
            "duration": 0.0390625
          },
          {
            "name": "C#5",
            "midi": 73,
            "time": 139,
            "velocity": 0.4881889763779528,
            "duration": 0.1640625
          },
          {
            "name": "D#4",
            "midi": 63,
            "time": 139,
            "velocity": 0.49606299212598426,
            "duration": 1
          },
          {
            "name": "G4",
            "midi": 67,
            "time": 139,
            "velocity": 0.49606299212598426,
            "duration": 1
          },
          {
            "name": "C5",
            "midi": 72,
            "time": 139.1640625,
            "velocity": 0.3543307086614173,
            "duration": 0.16796875
          },
          {
            "name": "C#5",
            "midi": 73,
            "time": 139.33203125,
            "velocity": 0.3937007874015748,
            "duration": 0.1328125
          },
          {
            "name": "F5",
            "midi": 77,
            "time": 139.5,
            "velocity": 0.41732283464566927,
            "duration": 0.1640625
          },
          {
            "name": "D#5",
            "midi": 75,
            "time": 139.6640625,
            "velocity": 0.3464566929133858,
            "duration": 0.1328125
          },
          {
            "name": "C#5",
            "midi": 73,
            "time": 139.83203125,
            "velocity": 0.33070866141732286,
            "duration": 0.08203125
          },
          {
            "name": "C5",
            "midi": 72,
            "time": 140,
            "velocity": 0.33070866141732286,
            "duration": 0.5
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 140,
            "velocity": 0.4015748031496063,
            "duration": 0.5
          },
          {
            "name": "G#4",
            "midi": 68,
            "time": 140,
            "velocity": 0.4015748031496063,
            "duration": 0.5
          },
          {
            "name": "C5",
            "midi": 72,
            "time": 140.9609375,
            "velocity": 0.4409448818897638,
            "duration": 0.0390625
          },
          {
            "name": "A#4",
            "midi": 70,
            "time": 141,
            "velocity": 0.48031496062992124,
            "duration": 0.1640625
          },
          {
            "name": "G4",
            "midi": 67,
            "time": 141,
            "velocity": 0.4881889763779528,
            "duration": 1
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 141,
            "velocity": 0.44881889763779526,
            "duration": 1
          },
          {
            "name": "C#4",
            "midi": 61,
            "time": 141,
            "velocity": 0.44881889763779526,
            "duration": 1
          },
          {
            "name": "A4",
            "midi": 69,
            "time": 141.1640625,
            "velocity": 0.3700787401574803,
            "duration": 0.16796875
          },
          {
            "name": "A#4",
            "midi": 70,
            "time": 141.33203125,
            "velocity": 0.4015748031496063,
            "duration": 0.16796875
          },
          {
            "name": "C#5",
            "midi": 73,
            "time": 141.5,
            "velocity": 0.3937007874015748,
            "duration": 0.1640625
          },
          {
            "name": "C5",
            "midi": 72,
            "time": 141.6640625,
            "velocity": 0.3700787401574803,
            "duration": 0.1328125
          },
          {
            "name": "A#4",
            "midi": 70,
            "time": 141.83203125,
            "velocity": 0.33070866141732286,
            "duration": 0.08203125
          },
          {
            "name": "G#4",
            "midi": 68,
            "time": 142,
            "velocity": 0.3543307086614173,
            "duration": 0.40234375
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 142,
            "velocity": 0.33070866141732286,
            "duration": 0.40234375
          },
          {
            "name": "C4",
            "midi": 60,
            "time": 142,
            "velocity": 0.33070866141732286,
            "duration": 0.40234375
          },
          {
            "name": "C4",
            "midi": 60,
            "time": 142.95703125,
            "velocity": 0.48031496062992124,
            "duration": 0.04296875
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 143,
            "velocity": 0.5039370078740157,
            "duration": 0.1640625
          },
          {
            "name": "G3",
            "midi": 55,
            "time": 143,
            "velocity": 0.47244094488188976,
            "duration": 0.90234375
          },
          {
            "name": "D#2",
            "midi": 39,
            "time": 143,
            "velocity": 0.49606299212598426,
            "duration": 1
          },
          {
            "name": "C#3",
            "midi": 49,
            "time": 143,
            "velocity": 0.49606299212598426,
            "duration": 1
          },
          {
            "name": "A3",
            "midi": 57,
            "time": 143.1640625,
            "velocity": 0.3700787401574803,
            "duration": 0.16796875
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 143.33203125,
            "velocity": 0.36220472440944884,
            "duration": 0.1328125
          },
          {
            "name": "C#4",
            "midi": 61,
            "time": 143.5,
            "velocity": 0.4015748031496063,
            "duration": 0.1640625
          },
          {
            "name": "C4",
            "midi": 60,
            "time": 143.6640625,
            "velocity": 0.3937007874015748,
            "duration": 0.1328125
          },
          {
            "name": "A#3",
            "midi": 58,
            "time": 143.83203125,
            "velocity": 0.3464566929133858,
            "duration": 0.08203125
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 144,
            "velocity": 0.41732283464566927,
            "duration": 0.25
          },
          {
            "name": "G#2",
            "midi": 44,
            "time": 144,
            "velocity": 0.3937007874015748,
            "duration": 0.19921875
          },
          {
            "name": "C3",
            "midi": 48,
            "time": 144,
            "velocity": 0.3937007874015748,
            "duration": 0.19921875
          },
          {
            "name": "C3",
            "midi": 48,
            "time": 144.5,
            "velocity": 0.3779527559055118,
            "duration": 0.25
          },
          {
            "name": "D#3",
            "midi": 51,
            "time": 144.5,
            "velocity": 0.3779527559055118,
            "duration": 0.25
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 144.5,
            "velocity": 0.3779527559055118,
            "duration": 0.25
          },
          {
            "name": "G#1",
            "midi": 32,
            "time": 144.5,
            "velocity": 0.36220472440944884,
            "duration": 0.25
          },
          {
            "name": "C3",
            "midi": 48,
            "time": 145,
            "velocity": 0.33070866141732286,
            "duration": 1
          },
          {
            "name": "G#3",
            "midi": 56,
            "time": 145,
            "velocity": 0.33070866141732286,
            "duration": 1
          },
          {
            "name": "G#1",
            "midi": 32,
            "time": 145,
            "velocity": 0.3464566929133858,
            "duration": 1
          },
          {
            "name": "G#2",
            "midi": 44,
            "time": 145,
            "velocity": 0.3464566929133858,
            "duration": 1
          }
        ],
        "controlChanges": {
          "7": [
            {
              "number": 7,
              "time": 0,
              "value": 0.7874015748031497
            },
            {
              "number": 7,
              "time": 0,
              "value": 0.7874015748031497
            }
          ],
          "10": [
            {
              "number": 10,
              "time": 0,
              "value": 0.4015748031496063
            },
            {
              "number": 10,
              "time": 0,
              "value": 0.4015748031496063
            }
          ],
          "64": [
            {
              "number": 64,
              "time": 0,
              "value": 0
            },
            {
              "number": 64,
              "time": 0,
              "value": 0
            }
          ],
          "91": [
            {
              "number": 91,
              "time": 0,
              "value": 0.3779527559055118
            },
            {
              "number": 91,
              "time": 0,
              "value": 0.3779527559055118
            }
          ],
          "121": [
            {
              "number": 121,
              "time": 0,
              "value": 0
            },
            {
              "number": 121,
              "time": 0,
              "value": 0
            }
          ]
        },
        "id": 1,
        "name": "Piano",
        "instrumentNumber": 0,
        "instrument": "acoustic grand piano",
        "instrumentFamily": "piano",
        "channelNumber": 0,
        "isPercussion": false
      }
    ]
  }

}
