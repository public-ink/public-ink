// three
import * as THREE from 'three'
// rxjs
import { Subject } from 'rxjs/Subject'
// project
import { makeBox, BoxParams } from './hero.component'
import { Piano, PianoKey } from './piano'
import { Song } from './song'
import { MIDIService } from '../midi.service'

/**
 * A box to kick off!
 * 
 * all we do is position a box, and give her her color
 * and we find the partner!
 * 
 * TODO: receive hit - animate that effect.
 */
export class Hero {

    partnerKey: PianoKey
    hueDecimal: number
    mesh: THREE.Mesh
    played = false
    pending = false

    colorHSL

    downVelocity = 0
    hit = false

    constructor(
        private song: Song,
        private track: number,
        private midi: MIDIService,
        private animationStream: Subject<any>,
        private piano: Piano,
        private scene: THREE.Scene,
        public trackDelta: number,
        public eigenDelta: number,
        private midiKey: number,
        private velocity: number,
        private type: string,
        private dimensions: any,
    ) {

        // get your partner key
        this.partnerKey = this.piano.keys.find(key => {
            return key.midiKey === this.midiKey
        })

        this.colorHSL = this.partnerKey.noteHSL

        let keyPosition = this.partnerKey.reportPosition()
        let x = keyPosition.x
        let y = keyPosition.y

        // make yourself a box
        let boxParams: BoxParams = {
            scene: this.scene,
            width: this.partnerKey.color === 'white' ? 0.98 : 0.4,
            height: 1,
            depth: 3,
            x: x,           // as partner
            z: trackDelta * -1,  // depth is time delta
            y: y + 1,       // one above
            colorHSL: this.partnerKey.noteHSL,
        }

        this.mesh = makeBox(boxParams)

        // subscribe to midi - to know if you get hit
        this.midi.stream.filter(msg => (msg.key === this.midiKey && msg.name === 'keydown')).subscribe(msg => {

            // get hit if you are in range!
            if (this.mesh.position.z > -2 && !this.hit) {
                this.downVelocity = 0.1
                this.hit = true
                let mat: any = this.mesh.material
                mat.color.setHSL
            }
        })

        // subscribe to animation stream (tick if song playing)
        this.animationStream.subscribe(dimensions => {
            if (dimensions.song.playing) {
                this.tick(dimensions)
            }
            // if hit, fade out!
            if (this.hit) {
                this.mesh.material.opacity -= 0.05
                if (this.pending) {
                    console.log('hero removes herself from pending')
                    this.pending = false
                    this.song.removeFromPendingHeros(this)
                }

            }
        })
    }

    /** 
     * tick! called between renderings
     * 
     * - update position
     * - highlight partner when close TODO
     * - plays note if crossed the line
     */
    tick(dimensions) {
        // apply velocity vector
        let velocityVector = new THREE.Vector3(0, this.downVelocity, dimensions.heroSpeed)
        // TODO: apply gravity if kicked

        // update position
        this.mesh.position.add(velocityVector)

        // if you crossed the line, play the note
        if (this.mesh.position.z > 0 && !this.played) {
            this.midi.soundNote(0, this.midiKey, this.velocity)
            this.played = true
        }
        // if you have not been hit but are at zero: make the song wait!
        // why does this keep happening?
        if (this.mesh.position.z > 0 && !this.hit && !this.pending) {
            console.log('hero add herself to pending')
            this.pending = true
            this.song.addToPendingHeros(this)
        }
    }
}
