// three
import * as THREE from 'three'
// rx
import { Subject } from 'rxjs/Subject'
// project
import { MIDIService } from '../midi.service'
import { makeBox, BoxParams, COLORS } from './hero.component'
import { Vessel } from './vessel'

/**
 * Represent the user's MIDI Piano
 * 
 * - contructs a keyboard of keys, and positions it centrally
 * - TODO: dynamic number of keys
 */
export class Piano {

    noteNames = ['A', 'Bb', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#']
    keys: PianoKey[] = []
    keyboard3D = new THREE.Object3D()

    constructor(
        public midi: MIDIService,
        public scene: THREE.Scene,
        public animationStream: Subject<any>,
    ) {
        // make keys
        for (let i = 0; i < 88; i++) {
            // the low A on an 88 keys keyboard is midi key 21
            let midiOffset = 21
            let midiKey = i + midiOffset
            let noteName = this.noteNames[i % 12]
            let color = noteName.length > 1 ? 'black' : 'white'

            // not in use
            let octave = Math.floor((i + 9) / 12)

            // create piano key
            let key = new PianoKey(this, this.scene, this.animationStream, this.midi, midiKey, color, noteName)
            this.keys.push(key)
        }
        // place keys
        this.placeKeys()
    }


    /**
     * places all given keys into a new keyboard position
     * 
     */
    placeKeys() {
        let whitesPlaced = 0
        for (let key of this.keys) {


            key.group3D.position.x = whitesPlaced

            if (key.color === 'white') {
                whitesPlaced += 1
            }

            // blacks are going up and back
            if (key.color === 'black') {
                key.group3D.position.x = (whitesPlaced * 1) - 0.5
                key.group3D.position.y = 0.5
                key.group3D.position.z = -1
            }

            this.keyboard3D.add(key.group3D)
        }

        // get dimensions of keyboard, center it in scene
        let box = new THREE.Box3().setFromObject(this.keyboard3D)
        let width = box.max.x + box.min.x
        let xOffset = width / -2
        this.keyboard3D.position.x = xOffset

        this.scene.add(this.keyboard3D)
    }
}


/**
 * A single key of a piano
 * 
 * - acts like a piano key being pressed and released
 * - can report her world positon
 * - fires vessel on keydown
 */
export class PianoKey {

    noteNames = ['A', 'Bb', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#']

    // cube objects
    keyMesh: THREE.Mesh
    launchpadMesh: THREE.Mesh
    railsMesh: THREE.Mesh

    /** black and white key dimensions */
    whiteWidth = 0.98
    whiteHeight = this.whiteWidth
    whiteDepth = 4

    blackWidth = 0.4
    blackHeight = 1
    blackDepth = 2

    /* groups the key and her launchpad */
    group3D = new THREE.Object3D()

    /* the note's color */
    noteHSL: { h: number, s: number, l: number }

    constructor(
        public piano: Piano,
        public scene: THREE.Scene,
        public animationStream: Subject<any>,
        public midi: MIDIService,
        public midiKey: number,
        public color: string,
        public noteName: string,
    ) {

        // subscribe to midi
        this.midi.stream.filter(msg => (msg.key === this.midiKey && msg.name === 'keydown')).subscribe(msg => {

            // keydown visuals
            this.keyMesh.rotateX(0.1)
            this.keyMesh.position.y = this.keyMesh.position.y - 0.4

            // keydown: fire vessel
            let vessel = new Vessel(this, this.scene, this.animationStream, msg.velocity)

            // test: hightern launchpad!
            this.launchpadMesh.scale.setY(5)


        })
        this.midi.stream.filter(msg => (msg.key === this.midiKey && msg.name === 'keyup')).subscribe(msg => {

            // keyup visuals
            this.keyMesh.rotateX(-0.1)
            this.keyMesh.position.y = this.keyMesh.position.y + 0.4

            // test back
            this.launchpadMesh.scale.setY(1)
        })

        // record color
        this.noteHSL = COLORS[this.noteName]

        // make the key objects
        this.makeKeyObjects()

    }

    /**
     * creates the  key's meshes
     * 
     * - key
     * - launchpad
     * - railing
     */
    makeKeyObjects() {

        let noteHSL = COLORS[this.noteName]

        if (this.color === 'white') {

            let whiteBox = new THREE.BoxGeometry(this.whiteWidth, this.whiteHeight, this.whiteDepth)

            // white, unless changed
            let whiteKeyMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff })

            this.keyMesh = new THREE.Mesh(whiteBox, whiteKeyMaterial)
            this.group3D.add(this.keyMesh)

            // also make a launchpad
            let launchpadParams: BoxParams = {
                colorHSL: this.noteHSL,
                width: this.whiteWidth,
                height: this.whiteHeight,
                depth: 1,
                // better understand z
                z: (-this.whiteDepth / 2) - 1,
            }
            this.launchpadMesh = makeBox(launchpadParams)
            
            // and rails
            let railsParams = {
                // opacity: 0.5,
                width: this.whiteWidth,
                height: this.whiteHeight,
                depth: 100,
                z: -55,
            }
            this.railsMesh = makeBox(railsParams)
            

        } else {

            let blackBox = new THREE.BoxGeometry(this.blackWidth, this.blackHeight, this.blackDepth)
            let blackKeyMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 })

            let blackMesh = new THREE.Mesh(blackBox, blackKeyMaterial)
            this.keyMesh = blackMesh
            
            // also make a BLACK launchpad
            let launchpadParams: BoxParams = {
                colorHSL: this.noteHSL,

                width: this.blackWidth,
                height: this.blackHeight,
                depth: 1,
                // better understand where on z
                z: (-this.whiteDepth / 2) - 1,
            }
            this.launchpadMesh = makeBox(launchpadParams)

            // and balck rails
            let railsParams: BoxParams = {
                opacity: 0.0,
                width: this.blackWidth,
                height: this.blackHeight,
                depth: 100,
                y: -0.3,
                z: -55,
                colorHSL: {h: 0, s: 0, l: 0.5}
            }
            this.railsMesh = makeBox(railsParams)
        }

        // add objects to group
        this.group3D.add(this.keyMesh)
        this.group3D.add(this.launchpadMesh)
        this.group3D.add(this.railsMesh)
    }

    /**
     * returns this key's world position
     * 
     * only works after the parten keyboard has been positioned
     */
    reportPosition() {
        this.piano.keyboard3D.updateMatrixWorld(true)
        let position = new THREE.Vector3().setFromMatrixPosition(this.keyMesh.matrixWorld)
        return position
    }
}

