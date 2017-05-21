/**
 * A beautiful mass midi file to databse converter
 */

// imports
const walkSync = require('walk-sync')
const MidiConvert = require('./nextparser')

// the directory where we start our walk
let dir = '/Users/martin.micklinghoff/Downloads/50000_MIDI_FILES/Stadium/'

// walk the provided root directory
var paths = walkSync(dir, {})
console.log(paths)

let midiPaths = paths.filter(p => {
	return p.indexOf('.mid') > 0
})

// too many notes
// midiPaths = ['AGUITA_SALA-por_debajo_de_tu_cintura.mid']

fileCount = midiPaths.length

function parseOne(index) {

	// exit when end of paths reached
	if (!midiPaths[index]) {
		console.log('done done!')
		return
	}

	let path = dir + midiPaths[index]
	// console.log('now parsing', path)

	// parse file
	MidiConvert.load(path).then(function (midi) {
		//console.log('parsed midi!', path)
		
		let midiObject = midi
		// check if there are errors || todo -> stack error works, but track errors not. we could do a filter against...
		// check track for events with errors

		console.log(midi)
		for (let track of midi.tracks) {
			for (let note of track.notes) {
				if (note.error || note.errors) {
					console.log('note')
				}
			}
		}
		if (midi.errors.length > 0) {
			// console.error('stopping because of track errors', midi.errors)
			// don't write to db
		} else {
			// write to db -> JSON? indexable.
		}

		// go on
		parseOne(index + 1)
	})
}

console.log('kicking off, midiPaths are', midiPaths)
parseOne(0)
