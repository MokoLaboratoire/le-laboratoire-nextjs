import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js'
import { ShaderPass } from 'three/examples/jsm/Addons.js'
import VirtualScroll from 'virtual-scroll'
import createInputEvents from 'simple-input-events'

import vertexShader from '../shaders/glass_effect_with_threejs/vertexShader.glsl'
import fragmentShader from '../shaders/glass_effect_with_threejs/fragmentShader.glsl'
import fragmentShaderQuad from '../shaders/glass_effect_with_threejs/fragmentShaderQuad.glsl'
import { AberrationShader } from '../shaders/glass_effect_with_threejs/AberrationShader'

export default class GlassEffectWithThreejsClass {
  constructor(props) {
    const { container } = props

    this.isPlaying = true
    this.time = 0

    this.container = container

    this.scene = new THREE.Scene()

    this.width = window.innerWidth
    this.height = window.innerHeight

    this.renderer = new THREE.WebGLRenderer({
      /* alpha: true, */
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
    this.camera.position.set(0, 0, 2)

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)

    this.loader = new GLTFLoader()
    this.dracoLoader = new DRACOLoader()
    this.dracoLoader.setDecoderPath('https://raw.githubusercontent.com/mrdoob/three.js/r147/examples/js/libs/draco/')
    this.loader.setDRACOLoader(this.dracoLoader)

    this.event = createInputEvents(window)
    this.target = new THREE.Vector2(0, 0)
    this.mouse = new THREE.Vector2(0, 0)

    this.initFinalScene()
    this.mouseEvents()
    
    this.addObjects()
    this.initPostProcessing()
    this.render()

    this.setupResize()
  }

  initFinalScene() {
    this.finalScene = new THREE.Scene()
    this.finalCamera = new THREE.OrthographicCamera(-1 * this.camera.aspect, 1 * this.camera.aspect, 1, -1, -100, 100)
    
    this.materialQuad = new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
      transparent: true,
      uniforms: {
        time: { value: 0 },
        uTexture: { value: null },
        uGrain: { value: new THREE.TextureLoader().load('/img/jpg/gr.jpg') },
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShaderQuad,
    })

    this.dummy = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1),
      /* new THREE.MeshBasicMaterial({ color: 0xFF0000 }) */
      this.materialQuad
    )
    this.finalScene.add(this.dummy)

    this.bleckBackground = new THREE.Mesh(
      new THREE.PlaneGeometry(10, 10),
      new THREE.MeshBasicMaterial({ color: 0x000000 })
    )
    this.bleckBackground.position.z = -1
    this.finalScene.add(this.bleckBackground)

    /* this.scroller = new VirtualScroll()
    this.scroller.on((event) => {
      this.finalScene.position.y = event.y / 4000
    }) */
  }
 
  mouseEvents() {
    this.event.on('move', ({ uv }) => {
      console.log('uv', uv)
      this.mouse.x = uv[0] - 0.5
      this.mouse.y = -uv[1] + 0.5
    })
  }

  addObjects() {
    this.renderTarget = new THREE.WebGLRenderTarget(this.width, this.height)

    this.material = new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
      transparent: true,
      uniforms: {
        time: { value: 0 },
        /* uTexture: { value: new THREE.TextureLoader().load('/img/uv/checker_map.png')}, */
        uTexture: { value: new THREE.TextureLoader().load('/img/webp/texture.webp')},
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    })

    this.loader.load(
	    /* '/glb/gdn.glb', */
      'gltf/Suzanne/Suzanne.gltf',
	    (gltf) => {
        /* this.mesh = gltf.scene.getObjectByName('rabbit_v3_rm_20211118') */
        this.mesh = gltf.scene.getObjectByName('Suzanne')
        /* console.log(this.mesh.geometry.attributes.uv.array) */
        /* this.mesh.position.set(0, 0, 0) */
        /* this.mesh.scale.set(0.01, 0.01, 0.01) */
        this.mesh.material = this.material

        const uv = this.mesh.geometry.attributes.uv.array

        for(let i = 0; i < uv.length; i += 4) {
          uv[i] = 0
          uv[i + 1] = 0
          uv[i + 2] = 1
          uv[i + 3] = 0
        }

        this.mesh.geometry.attributes.uv.needsUpdate = true

        this.scene.add(this.mesh)
    	}
    )
  }

  initPostProcessing() {
    this.composer = new EffectComposer(this.renderer)
    this.renderPass = new RenderPass(this.finalScene, this.finalCamera)
    this.composer.addPass(this.renderPass)
    console.log(AberrationShader)
    this.effectPass1 = new ShaderPass(AberrationShader)
    this.composer.addPass(this.effectPass1)
    this.outputPass = new OutputPass()
    this.composer.addPass(this.outputPass)
  }

  render() {
    if (!this.isPlaying) return

    this.time += 0.05
    this.material.uniforms.time.value = this.time

    requestAnimationFrame(this.render.bind(this))

    this.renderer.setRenderTarget(this.renderTarget)
    this.materialQuad.uniforms.uTexture.value = this.renderTarget.texture
    this.renderer.render(this.scene, this.camera)
    this.renderer.setRenderTarget(null)
    /* this.renderer.render(this.finalScene, this.finalCamera) */

    this.composer.render()

    this.target.lerp(this.mouse, 0.1)
    this.finalScene.position.x = this.target.x / 5
    this.finalScene.position.y = this.target.y / 5
    this.scene.position.x = -this.target.x / 3
    this.scene.position.y = -this.target.y / 3
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
