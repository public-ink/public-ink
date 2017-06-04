// three
import * as THREE from 'three'
// rxjs
import { Subject } from 'rxjs/Subject'
// project
import { MIDIService } from '../midi.service'
import { makeBox, BoxParams, COLORS } from './hero.component'
import { PianoKey } from './piano'

/**
 * A vessel to be shot
 * 
 * TODO
 * - detect collisions against hero's!
 * 
 */
export class Vessel {

    mesh: THREE.Mesh
    velocity = new THREE.Vector3()

    constructor(
        private pianoKey: PianoKey, 
        private scene: THREE.Scene,
        private animationStream: Subject<any>,
        private kickVelocity: number,
        ) {

        // make a ball just above the key
        let noteHSL = this.pianoKey.noteHSL
        let mat = new THREE.MeshPhongMaterial()
        mat.color.setHSL(noteHSL.h, noteHSL.s, noteHSL.l)


        let geo = new THREE.SphereGeometry(0.3, 5)

        this.mesh = new THREE.Mesh(geo, mat)

        // position
        let keyPosition = this.pianoKey.reportPosition()
        this.mesh.position.x = keyPosition.x
        this.mesh.position.y = 2
        this.mesh.position.z = -2

        this.scene.add(this.mesh)
        
        // kick it!
        this.velocity.y = this.kickVelocity

        // move with your velocity vector along time
        this.animationStream.subscribe((dimensions) => {

            // apply gravity
            let gravity = new THREE.Vector3(0, -0.01, 0)
            this.velocity.add(gravity)

            // update your position
            this.mesh.position.add(this.velocity)

            // remove if going down!
            if (this.velocity.y < 0) {
                this.mesh.visible = false
            }
        })
    }
}
