import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

import vertexShader from '../shaders/default_shaders/vertexShader.glsl'
import fragmentShader from '../shaders/default_shaders/fragmentShader.glsl'

export default class DrawingPhotosWithLinesIn3DClass {
  constructor(props) {
    const { container } = props

    this.isPlaying = true
    this.time = 0

    this.container = container

    this.scene = new THREE.Scene()

    this.width = window.innerWidth
    this.height = window.innerHeight

    this.dots = 50
    this.lines = 50
    this.radius = 100

    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    })
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.renderer.setSize(this.width, this.height)
    this.renderer.setClearColor(0x000000, 1)

    this.raycaster = new THREE.Raycaster()
    this.pointer = new THREE.Vector2()

    this.container.appendChild(this.renderer.domElement)

    this.camera = new THREE.PerspectiveCamera(
      70,
      this.width / this.height,
      0.01,
      1000,
    )
    this.camera.position.set(0, 0, 200)

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)

    this.group = new THREE.Group()
    this.scene.add(this.group)


    this.material = new THREE.LineBasicMaterial({
        color: 0xFF00FF
    })

    for(let i = 0; i < this.lines; i++) {
        this.points = []

        for(let j = 0; j < this.lines; j++) {
            let coord = (j / this.dots) * this.radius * 2 - this.radius
            this.points.push(new THREE.Vector3(coord, Math.random() * 30, 0))
        }
        
        this.geometry = new THREE.BufferGeometry().setFromPoints(this.points)
        this.line = new THREE.Line(this.geometry, this.material)
        this.line.rotation.x = Math.random() * Math.PI
        this.line.rotation.y = Math.random() * Math.PI
        this.line.rotation.z = Math.random() * Math.PI
        this.group.add(this.line)
    }

    /* this.addObjects() */
    this.render()

    this.setupResize()
  }

  updateLines(time) {
    let vector, line

    for(let i = 0; i < this.lines; i++) {
        line = this.group.children[i]

        /* console.log(line.geometry.attributes.position.array) */
        for(let j = 0; j < 150; j++) {
            line.geometry.attributes.position.array[j] = Math.sin(j / 5 + time / 1000) * 20
            /* console.log(vector) */
        }
        line.geometry.attributes.position.needsUpdate = true
    }
  }

  /* addObjects() {
    const geometry = new THREE.PlaneGeometry(1, 1)
    this.material = new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
      transparent: true,
      uniforms: {
        time: { value: 0 },
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    })

    const plane = new THREE.Mesh(geometry, this.material)
    this.scene.add(plane)
  } */

  render() {
    if (!this.isPlaying) return
    this.time += 0.05
    this.updateLines(this.time)
    /* this.material.uniforms.time.value = this.time */
    requestAnimationFrame(this.render.bind(this))
    this.renderer.render(this.scene, this.camera)
  }

  setupResize() {
    window.addEventListener('resize', this.resize.bind(this))
  }

  resize() {
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.renderer.setSize(this.width, this.height)
    this.camera.aspect = this.width / this.height
    this.camera.updateProjectionMatrix()
  }
}
