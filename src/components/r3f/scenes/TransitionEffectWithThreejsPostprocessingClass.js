import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { ShaderPass } from 'three/examples/jsm/Addons.js'
import { GUI } from 'dat.gui'
import gsap from 'gsap'
import createInputEvents from 'simple-input-events'

import { CurtainShader } from '../shaders/transition_effect_with_threejs_postprocessing/effect1.js'
import { RGBAShader } from '../shaders/transition_effect_with_threejs_postprocessing/effect2.js'

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
    this.renderer.physicallyCorrectLights = true
    /* this.renderer.outputEncoding = THREE.sRGBEncoding */

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
    this.initPost()
    this.render()

    this.setupResize()
    this.setUpSettings()
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
  }

  initPost() {
    this.composer = new EffectComposer(this.renderer)
    this.composer.setSize(this.width, this.height)
    this.renderPass = new RenderPass(this.scene, this.camera)
    this.composer.addPass(this.renderPass)
    this.effectPass = new ShaderPass(CurtainShader)
    this.composer.addPass(this.effectPass)
    this.effectPass1 = new ShaderPass(RGBAShader)
    this.composer.addPass(this.effectPass1)
  }

  render() {
    if (!this.isPlaying) return
    this.time += 0.05

    this.oscillator = Math.sin(this.time * 0.1) * 0.5 + 0.5

    this.mouseTarget.lerp(this.mouse, 0.1)

    this.groups.forEach((g) => {
      g.rotation.x = -this.mouseTarget.y * 0.2
      g.rotation.y = -this.mouseTarget.x * 0.2

        g.children.forEach((m, i) => {
            m.position.z = (i + 1) * 100 - this.oscillator * 200
        })
    })

    requestAnimationFrame(this.render.bind(this))
    /* this.renderer.render(this.scene, this.camera) */

    this.composer.render()
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

  setUpSettings() {
    this.settings = {
      progress: 0,
      progress1: 0,
      runAnimation: () => {
        this.runAnimation()
      }
    }
    this.gui = new GUI()
    this.gui.add(this.settings, 'progress', 0, 1, 0.01).onChange((value) => {
      this.material.uniforms.progress.value = value
    })
    this.gui
      .add(this.settings, 'progress1', 0, 1, 0.00001).onChange((value) => {
        this.effectPass.uniforms.uProgress.value = value
    }),
    this.gui.add(this.settings, 'runAnimation')
  }

  runAnimation() {
    const tl = gsap.timeline()
    tl.to(this.camera.position, {
        x: 2500,
        duration: 1.5,
        ease: 'power4.inOut'
    })
    tl.to(this.camera.position, {
        z: 700,
        duration: 1,
        ease: 'power4.inOut'
    }, 0)
    tl.to(this.camera.position, {
        z: 900,
        duration: 1,
        ease: 'power4.inOut'
    }, 1)

    tl.to(this.effectPass.uniforms.uProgress, {
        value: 1,
        duration: 1,
        ease: 'power3.inOut'
    }, 0)
    tl.to(this.effectPass.uniforms.uProgress, {
        value: 0,
        duration: 1,
        ease: 'power3.inOut'
    }, 1)

    tl.to(this.effectPass1.uniforms.uProgress, {
        value: 1,
        duration: 1,
        ease: 'power3.inOut'
    }, 0)
    tl.to(this.effectPass1.uniforms.uProgress, {
        value: 0,
        duration: 1,
        ease: 'power3.inOut'
    }, 1)
  }
}
