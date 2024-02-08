import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { KTX2Loader } from 'three/addons/loaders/KTX2Loader.js'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GUI } from 'dat.gui'

import vertexShader from '../shaders/recreating_3D_with_image_sequences/vertexShader.glsl'
import fragmentShader from '../shaders/recreating_3D_with_image_sequences/fragmentShader.glsl'

export default class Recreating3DWithImageSequencesClass {
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
    this.renderer.setClearColor(0xFFFFFF, 1)

    this.raycaster = new THREE.Raycaster()
    this.pointer = new THREE.Vector2()

    this.container.appendChild(this.renderer.domElement)

    this.camera = new THREE.PerspectiveCamera(
      70,
      this.width / this.height,
      0.01,
      1000,
    )
    this.camera.position.set(0, 0, 1)

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)

    this.ktx2Loader = new KTX2Loader()
    this.ktx2Loader.setTranscoderPath('/basis/')
    this.ktx2Loader.detectSupport(this.renderer)

    this.stats = new Stats()
    document.body.appendChild(this.stats.dom)

    this.addObjects()
    this.render()

    this.setupResize()
    this.addMouseEvents()

    this.setUpSettings()
  }

  addMouseEvents() {
    document.body.addEventListener('mousemove', (e) => {
      /* console.log(e.clientX / window.innerWidth) */
      this.material.uniforms.uMouse.value = e.clientX / window.innerWidth
    })
  }

  addObjects() {
    const geometry = new THREE.PlaneGeometry(1, 1)
    this.material = new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
      transparent: true,
      uniforms: {
        time: { value: 0 },
        progress: { value: 0 },
        uData: { value: null },
        uDiffuse: { value: null },
        uDisplacementStrength: { value: 0 },
        uMotion: { value: null },
        uPosition: { value: null },
        uMouse: { value: 0 },
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    })

    this.ktx2Loader.load('img/ktx2/gameboy_data-high.png.ktx2', (texture) => {
      texture.colorSpace = THREE.LinearSRGBColorSpace 
      this.material.uniforms.uData.value = texture
    })
    this.ktx2Loader.load(
      'img/ktx2/gameboy_diffuse-high.png.ktx2',
      (texture) => {
        texture.colorSpace = THREE.LinearSRGBColorSpace 
        this.material.uniforms.uDiffuse.value = texture
      },
    )
    this.ktx2Loader.load('img/ktx2/gameboy_mv-high.png.ktx2', (texture) => {
      texture.colorSpace = THREE.LinearSRGBColorSpace 
      this.material.uniforms.uMotion.value = texture
    })
    this.ktx2Loader.load(
      'img/ktx2/gameboy_position-high.png.ktx2',
      (texture) => {
        texture.colorSpace = THREE.LinearSRGBColorSpace 
        this.material.uniforms.uPosition.value = texture
      },
    )

    const plane = new THREE.Mesh(geometry, this.material)
    this.scene.add(plane)
  }

  render() {
    if (!this.isPlaying) return
    this.time += 0.05
    this.material.uniforms.time.value = this.time
    requestAnimationFrame(this.render.bind(this))
    this.renderer.render(this.scene, this.camera)

    this.stats.update()
  }

  setupResize() {
    window.addEventListener('resize', this.resize.bind(this))
  }

  setUpSettings() {
    this.settings = {
      progress: 0,
      uDisplacementStrength: 0,
    }
    this.gui = new GUI()
    this.gui.add(this.settings, 'progress', 0, 1, 0.01).onChange((value) => {
      this.material.uniforms.progress.value = value
    })
    this.gui
      .add(this.settings, 'uDisplacementStrength', 0, 1, 0.00001)
      .onChange((value) => {
        this.material.uniforms.uDisplacementStrength.value = value
      })
  }

  resize() {
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.renderer.setSize(this.width, this.height)
    this.camera.aspect = this.width / this.height
    this.camera.updateProjectionMatrix()
  }
}
