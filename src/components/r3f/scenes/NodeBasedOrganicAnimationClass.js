import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

import vertexShader from '../shaders/node_based_organic_animation/vertexShader.glsl'
import fragmentShader from '../shaders/node_based_organic_animation/fragmentShader.glsl'

export default class NodeBasedOrganicAnimationClass {
  constructor(props) {
    const { container } = props

    this.isPlaying = true
    this.time = 0

    this.container = container

    this.scene = new THREE.Scene()

    this.width = window.innerWidth
    this.height = window.innerHeight

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
    this.camera.position.set(0, 0, 4)

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)

    this.addObjects()
    this.render()

    this.setupResize()
  }

  addObjects() {
    const geometry = new THREE.IcosahedronGeometry(1, 100)
    this.material = new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
      transparent: true,
      uniforms: {
        uTime: { value: 0 },
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader, 
    })

    const plane = new THREE.Mesh(geometry, this.material)
    this.scene.add(plane)
  }

  render() {
    if (!this.isPlaying) return
    this.time += 0.05
    if(this.material) this.material.uniforms.uTime.value = this.time / 50
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
