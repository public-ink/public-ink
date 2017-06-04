// angular
import { Injectable } from '@angular/core'
// rx
import { Subject } from 'rxjs/Subject'
// three
import * as THREE from 'three'
// ink
import { MIDIService, Instrument } from '../midi.service'
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

    tracks: Track[] = []

    pendingHeros: Hero[] = []
    lastHeroSpeed: number

    songSubject = new Subject()
    

    constructor(private midi: MIDIService, private scene: THREE.Scene, private animationStream: Subject<any>, private piano: Piano, private dimensions: any, public midiData) {


        this.setupSong(this.midiData)

        // record last speed
        this.lastHeroSpeed = dimensions.heroSpeed

        // subscribe to dimensions
        this.animationStream.subscribe(dimensions => {
            this.lastHeroSpeed = dimensions.heroSpeed
        })

    }

    /** this is how we make heros these days. */
    setupSong(midiData) {
        console.log('song setup calle with', this.midiData)

        // todo: remove existing tracks and their heros
        for (let track of midiData.tracks) {

            let aTrack = new Track(this.midi, track, this, this.animationStream, this.piano, this.scene, this.dimensions)
            this.tracks.push(aTrack)
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
            // if we are pausing
            this.dimensions.heroSpeed = 0
            console.log('got Heros!: setting speed to zero, should be paused')
        } else {
            console.log('no pending heros, continue playing')
            this.dimensions.heroSpeed = 0.155
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

export class Track {

    name: string
    duration: number
    instrument: Instrument

    subject: Subject<any> = new Subject()
    visible = true
    muted = false
    playAlong = false

    constructor(
        private midi: MIDIService,
        public trackData,
        private song: Song,
        private animationStream,
        private piano: Piano,
        private scene: THREE.Scene,
        private dimensions,

    ) {
        this.name = trackData.name
        this.duration = trackData.duration

        // just the main midi instrument for now
        if (this.trackData.id > 0) {
            this.instrument = this.midi.instrument
        }
        if (this.trackData.id === 4) {
            this.playAlong = false // can be disabled
        }

        console.log('track got trackData', this.trackData)

        if (!this.trackData.notes) return
        for (let note of this.trackData.notes) {
            let hero = new Hero(
                this.song,
                this,
                this.midi,
                this.animationStream,
                this.piano,
                this.scene,
                note.time * 10,
                note.midi,
                note.velocity,
                'on',
                this.dimensions,
                note.name,
                note
            )
        }

        this.song.songSubject.subscribe((data: any) => {
            if (data.solo) {
                if (data.solo === this.trackData.id) {
                    this.setVisible()
                } else {
                    this.setInvisible()
                }
            }
        })

    }
    setVisible() {
        this.visible = true
        this.publishStatus()
    }
    setInvisible() {
        this.visible = false
        this.publishStatus()
    }
    setMuted() {
        this.muted = true
        this.publishStatus()
    }
    setUnmuted() {
        this.muted = false
        this.publishStatus()
    }

    toggleVisible() {
        this.visible = !this.visible
        this.publishStatus()
    }

    toggleMuted() {
        this.muted = !this.muted
        this.publishStatus()
    }

    solo() {
        this.song.songSubject.next({ solo: this.trackData.id })
    }

    setInstrument(instrument: Instrument) {
        this.instrument = instrument
    }

    /** publish the track status: heros are listening to this */
    publishStatus() {
        this.subject.next({ visible: this.visible, muted: this.muted })
    }

}
