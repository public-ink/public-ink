// rx
import { Subject } from 'rxjs/Subject'

// three
import * as THREE from 'three'

// ink
import { MIDIService } from '../midi.service'
import { Hero } from './hero'
import { Piano } from './piano'


/**
 * Represents a Song!
 * 
 * Todo:
 * 
 * (for use by heros that are not hit)
 * - getPendingHerosDelta
 * - pause / play helpers
 * - playback speed
 * - track information
 * - track muting, un-muting
 */

export class Song {

    songMidi
    heros: Hero[] = []

    pendingHeros: Hero[] = []
    lastHeroSpeed: number

    constructor(private midi: MIDIService, private scene: THREE.Scene, private animationStream: Subject<any>, private piano: Piano, private dimensions: any, private midiData) {


        this.setupSong(this.midiData)

        // record last speed
        this.lastHeroSpeed = dimensions.heroSpeed

        // subscribe to dimensions
        this.animationStream.subscribe(dimensions => {
            this.lastHeroSpeed = dimensions.heroSpeed
        })

    }


    setupSong(midiData) {
        console.log('song setup calle with', this.midiData)
        // remove existing hero things
        for (let hero of this.heros) {
            this.scene.remove(hero.mesh)
        }
        this.heros = []

        let tracks = midiData.tracks
        for (let track of tracks) {

            // todo: tracks!!
            let aTrack = new Track(track)

            if (track.notes) {
                for (let note of track.notes) {
                    console.log(note)
                    let hero = new Hero(this, track.number, this.midi, this.animationStream, this.piano, this.scene, note.time * 10, note.midi, note.velocity, 'on', this.dimensions, note.name)
                }
            }

        }
    }

    addToPendingHeros(hero: Hero) {
        this.pendingHeros.push(hero)
        this.checkPendingHeros()
    }
    removeFromPendingHeros(hero: Hero) {
        let index = this.pendingHeros.indexOf(hero)
        this.pendingHeros.splice(index, 1)
        this.checkPendingHeros()
    }

    checkPendingHeros() {
        let delta = 0
        for (let hero of this.pendingHeros) {
            delta += 0 //hero.eigenDelta
        }
        if (this.pendingHeros.length > 0) {
            this.dimensions.heroSpeed = 0
            console.log('got Heros!: setting speed to zero, should be paused')
        } else {
            console.log('no pending heros, continue playing')
            this.dimensions.heroSpeed = 2
        }
        console.log(this.pendingHeros)
        return delta
    }


}


/**
 * Represent a track in a midi song
 * 
 * can switch between instruments, can be muted
 * can be set to 'playalong'
 */
export class Track{

    constructor(private trackData) {

    }

}
