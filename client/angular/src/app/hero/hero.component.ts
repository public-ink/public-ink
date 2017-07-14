import { Component, OnInit, AfterViewInit, ViewChild, AfterViewChecked, ElementRef, ChangeDetectionStrategy } from '@angular/core';

import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'

// THREE
import * as THREE from 'three'
import OrbitControls from 'orbit-controls-es6'

// Services
import { MIDIService } from '../midi.service'
import { BackendService } from '../backend.service'

// hero classes
import { Hero } from './hero'
import { Piano, PianoKey } from './piano'
import { Song } from './song'


// Light interfaces
interface Light {
  name: string,
  color: number,
  intensity: number
}
interface Directional extends Light {
  position: { x: number, y: number, z: number }
}
interface Ambient extends Light {
}
interface Spot {
  name: string
  intensity: number
  color: number
}

/**
 * parameters used for creating a box
 * 
 * when a scene is provided, it is automatically added
 */
export interface BoxParams {
  opacity?: number,
  shape?: string, // ball or box
  width?: number,
  height?: number,
  depth?: number,
  x?: number,
  y?: number,
  z?: number,
  visible?: boolean,
  colorHSL?: { h: number, s: number, l: number },
  scene?: THREE.Scene,
}


export const COLORS = {
  'A': { h: 56 / 360, s: 1.0, l: .60 }, // yellow
  'Bb': { h: (56 + 323) / 2, s: .99, l: .63 }, // 'brown',
  'B': { h: 323 / 350, s: .96, l: .67 }, // 'pink',
  'C': { h: .44, s: .96, l: 1 }, // 'white',
  'C#': { h: .44, s: .96, l: .1 }, // 'dunno',
  'D': { h: 39 / 360, s: 1, l: .50 }, // 'orange',
  'D#': { h: .24, s: .50, l: .2 }, // 'dunno',
  'E': { h: 112 / 360, s: .65, l: .55 }, // 'green',
  'F': { h: 226 / 360, s: .65, l: .55 }, // 'blue',
  'F#': { h: 266 / 360, s: .65, l: .46 }, // 'violet',
  'G': { h: 350 / 360, s: 1, l: .50 }, // 'red',
  'G#': { h: 0, s: .36, l: .31 }, // brown,

}

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit, AfterViewChecked, AfterViewInit {

  @ViewChild('sceneContainer') sceneContainer: ElementRef
  @ViewChild('sidebar') sidebar: ElementRef
  @ViewChild('midiFile') midiFile: ElementRef

  scene: THREE.Scene
  camera: THREE.PerspectiveCamera
  renderer: THREE.WebGLRenderer
  controls: any// OrbitControls

  animationStream: Subject<any>

  window = window
  sidebarWidth = 300
  sidebarVisible = true

  piano: Piano
  heros: Hero[] = []
  heroSpeed = 0.12
  heroRunning = false
  song: Song
  query: string = ''

  // LIGHT DIMENSIONS
  lights: {
    directionals: Directional[],
    ambients: Ambient[],
    spots: Spot[],
  } = {
    directionals: [
      {
        name: 'sun',
        position: { x: 3, y: 10, z: 10 },
        color: 0xffffff,
        intensity: 0.7,
      },
      {
        name: 'moon',
        position: { x: -3, y: 10, z: -10 },
        color: 0xffffff,
        intensity: 0.3,
      },
    ],
    ambients: [
      {
        name: 'daylight',
        color: 0xffffff,
        intensity: 0.3,
      }
    ],
    spots: [
      {
        name: 'bulb',
        color: 0xffffff,
        intensity: 0,
      }
    ]
  }

  dimensions = {
    gravity: 0.01,
    running: true,
    time: 10000,
    lights: this.lights,
    heroSpeed: 0.1,
    renderer: {
      opacity: 1
    },
    song: {
      playing: false
    }
  }

  searchResults = []

  constructor(

    public midi: MIDIService,
    public backend: BackendService,

  ) {
    console.log('hero component constructed')

    /**
     * Subscribe to keyboard events
     */
    Observable.fromEvent(window, 'keypress').subscribe((event: KeyboardEvent) => {
      console.log(event.which)

      // CMD B: toggle sidebar
      if (event.which === 98 && event.metaKey) {
        this.toggleSidebar()
      }
      // CMD F: request fullscreen
      if (event.which === 102) {
        this.requestFullscreen()
      }
    })

    /**
     * create observable dimensions subject
     */
    this.animationStream = new Subject()

  }

  search(query: string) {
    console.log('search for ', query)
    this.backend.searchSongs(query).subscribe((data: any) => {
      console.log('hero got', data)
      this.searchResults = data.songSearch
    })
  }

  loadSong(id: string) {
    this.backend.loadSong(id).subscribe((song: any) => {
      console.log('hero loaded song!', song)
      let tracks = JSON.parse(song.tracksString)
      song.tracks = tracks
      this.song = song
      this.songSetup(song)
    })
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.sceneSetup(this.dimensions)
    window.addEventListener('resize', this.onWindowResize, false)
  }


  ngAfterViewChecked() {
    // console.log('view checked')
  }

  onWindowResize = () => {
    this.resizeScene()
  }

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible
    this.resizeScene()
  }

  /**
   * resize canvas and update camera according to available space
   */
  resizeScene() {
    let availableWidth = this.window.innerWidth - (this.sidebarVisible ? this.sidebarWidth : 0)
    let availableHeight = this.window.innerHeight
    this.camera.aspect = availableWidth / availableHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(availableWidth, availableHeight)
  }

  requestFullscreen() {
    let doc = document.getElementById('screen')
    doc.webkitRequestFullScreen()
  }

  /**
   * Set-up Three.js Scene
   */
  sceneSetup(dimensions) {

    // scene
    this.scene = new THREE.Scene()

    // renderer
    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    this.renderer.setClearColor(0x111111, dimensions.renderer.opacity)
    this.renderer.shadowMap.enabled = true
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
    this.renderer.setSize(this.sceneContainer.nativeElement.scrollWidth, this.sceneContainer.nativeElement.scrollHeight)
    this.sceneContainer.nativeElement.appendChild(this.renderer.domElement)

    // camera
    this.camera = new THREE.PerspectiveCamera(40, this.sceneContainer.nativeElement.scrollWidth / this.sceneContainer.nativeElement.scrollHeight, 1, 10000)
    this.camera.position.z = 5
    this.camera.fov = 5
    this.camera.position.set(0, 17, 26)

    // controls
    //this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enabled = true
    this.controls.autoRotate = true
    this.controls.maxDistance = 15000
    this.controls.minDistance = 0
    this.controls.autoRotateSpeed = 0
    this.controls.autoRotate = true

    // lights
    for (let light of this.dimensions.lights.directionals) {
      let directional = new THREE.DirectionalLight(light.color, light.intensity)
      directional.position.set(light.position.x, light.position.y, light.position.z)
      this.scene.add(directional)
    }
    for (let light of this.dimensions.lights.ambients) {
      let ambient = new THREE.AmbientLight(light.color, light.intensity)
      this.scene.add(ambient)
    }
    for (let light of this.dimensions.lights.spots) {
      let spot = new THREE.SpotLight(light.color, light.intensity)
      this.scene.add(spot)
    }

    /**
     * Subscribe to midi events (test)
     */
    this.midi.stream.filter(msg => msg.keyName === 'modulation').subscribe(msg => {

      // nothing here

    })

    /** kick off animation loop */
    this.animate()


    /** create piano! */
    this.makePiano()

    /** hero setup via song */
    // this.makeSong()
    let hsl = { h: 1, s: 0.5, l: 0.5 }
    let testBox: BoxParams = { y: 10, scene: this.scene, colorHSL: hsl }
    let testMesh = makeBox(testBox)

  }

  /** creates a piano and add it to scene */
  makePiano() {
    this.piano = new Piano(this.midi, this.scene, this.animationStream)
    this.scene.add(this.piano.keyboard3D)
  }

  /** 
   * create a song for testing
   */
  songSetup(midiData) {
    this.song = new Song(this.midi, this.scene, this.animationStream, this.piano, this.dimensions, midiData)

    
  }



  /**
   * THE ANIMATION LOOP
   * 
   * - publishes time updated dimensions
   * - renders the scene
   */

  animate = () => {

    // forward time
    this.dimensions.time += 15

    // publish dimensions
    this.animationStream.next(this.dimensions)

    // render
    this.renderer.render(this.scene, this.camera)

    // repeat
    requestAnimationFrame(this.animate)
  }

}




/**
 * UTLILS
 */

/**
 * Creates a box for, the way you like it...
 */
export const makeBox = (params: BoxParams) => {

  /** Read Params */

  const shape = params.shape || 'box'

  // size
  const width = params.width || 1
  const height = params.height || 1
  const depth = params.depth || 1

  // position
  const x = params.x || 0
  const y = params.y || 0
  const z = params.z || 0

  // color {hsl} | default WHITE
  const hsl = params.colorHSL || { h: 0, s: 0, l: 1 }

  // opacity
  const opacity = params.opacity || 1

  // scene means adding to it
  const scene = params.scene

  /** Create Box */

  // material
  const boxMaterial = new THREE.MeshPhongMaterial({ transparent: true })
  boxMaterial.opacity = opacity

  boxMaterial.color.setHSL(hsl.h, hsl.s, hsl.l)

  // geometry
  let geometry
  if (shape === 'box') {
    geometry = new THREE.BoxGeometry(width, height, depth)
  } else if (shape === 'ball') {
    geometry = new THREE.Sphere()
  }

  // create mesh
  const boxMesh = new THREE.Mesh(geometry, boxMaterial)
  boxMesh.position.set(x, y, z)

  // add to scene
  if (scene) { scene.add(boxMesh) }

  return boxMesh
}


/**
 * degrees -> radians
 */
export function toRadians(degrees: number) {
  return degrees * Math.PI / 180
}

/**
 * radians -> degrees
 */
export function toDegrees(radians: number) {
  return 180 * radians / Math.PI
}
