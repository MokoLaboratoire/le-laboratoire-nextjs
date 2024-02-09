import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import createInputEvents from 'simple-input-events'

import vertexShader from '../shaders/default_shaders/vertexShader.glsl'
import fragmentShader from '../shaders/default_shaders/fragmentShader.glsl'

export default class TransitionEffectWithThreejsPostprocessingClass {
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
      60,
      this.width / this.height,
      1,
      3000,
    )
    this.camera.position.set(0, 0, 900)

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)

    this.mouse = new THREE.Vector2()
    this.mouseTarget = new THREE.Vector2()
    this.event = createInputEvents(this.renderer.domElement)

    this.events()
    this.addObjects()
    this.render()

    this.setupResize()
  }

  events() {
    this.event.on('move', ({ uv }) => {
        this.mouse.x = uv[0] - 0.5
        this.mouse.y = uv[1] - 0.5

        console.log(this.mouse)
    })
  }

  addObjects() {
    const geometry = new THREE.PlaneGeometry(1920, 1080, 1, 1)

    this.textures = [
    '/img/RoseRouge-70x50.png',
      '/img/VerbalShoota-70x50.png',
      '/img/Dash-70x50.png',
    ]
    this.textures = this.textures.map((t) => new THREE.TextureLoader().load(t))
    this.maskTexture = new THREE.TextureLoader().load('/img/jpg/mask.jpg')
    /* this.textures.map((texture) => ( new THREE.TextureLoader(texture) )) */
    /* this.material = new THREE.MeshBasicMaterial({
        map: this.textures[1]
    }) */

    this.groups = []

    this.textures.forEach((t, j) => {
        const group = new THREE.Group()
        this.scene.add(group)
        this.groups.push(group)
        for (let i = 0; i < 3; i++) {
            let material = new THREE.MeshBasicMaterial({
            map: this.textures[j],
            })
            if (i > 0) {
            material = new THREE.MeshBasicMaterial({
                map: this.textures[j],
                alphaMap: this.maskTexture,
                transparent: true,
            })
            }
            const mesh = new THREE.Mesh(geometry, material)
            mesh.position.z = (i + 1) * 100
            group.add(mesh)
            group.position.x = j * 2500
        }
    })







    /* const plane = new THREE.Mesh(geometry, this.material)
    this.scene.add(plane) */
  }

  render() {
    if (!this.isPlaying) return
    this.time += 0.05

    this.mouseTarget.lerp(this.mouse, 0.1)

    this.groups.forEach(g => {
        g.rotation.x = -this.mouseTarget.y * 0.2
        g.rotation.y = -this.mouseTarget.x * 0.2
    })

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
