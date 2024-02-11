import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
/* import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js' */
import { GUI } from 'dat.gui'

import vertexShader from '../shaders/volumetric_light_ray_with_threejs_v2/vertexShader.glsl'
import fragmentShader from '../shaders/volumetric_light_ray_with_threejs_v2/fragmentShader.glsl'
import fragmentShaderPost from '../shaders/volumetric_light_ray_with_threejs_v2/fragmentShaderPost.glsl'

export default class VolumetricLightRayWithThreejsV2Class {
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
    this.camera.position.set(0, 0, 2.5)

    const frustrumSize = 1;
    const aspect = 1;
    this.cameraPost = new THREE.OrthographicCamera(frustrumSize * aspect / -2, frustrumSize * aspect / 2, frustrumSize / 2, frustrumSize / -2, -1000, 1000)

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    
    /* const loader = new GLTFLoader()
    loader.load('path', (gltf) => {
      this.model = gltf.scene
      console.log(gltf)
    }) */

    this.addObjects()
    this.addLights()
    this.initPost()
    this.render()

    this.setupResize()
    /* this.setUpSettings() */
  }

  addObjects() {
    const geometry = new THREE.SphereGeometry(1, 30, 30)
    this.material = new THREE.ShaderMaterial({
      extensions: {
        derivates: 'extensions GL_OES_derivates: enable'
      },
      side: THREE.DoubleSide,
      transparent: true,
      uniforms: {
        time: { value: 0 },
        uMap: { value: new THREE.TextureLoader().load('/img/webp/dft-une-seule-ligne-dessin-2.webp') },
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    })

    this.sphere = new THREE.Mesh(geometry, this.material)
    this.scene.add(this.sphere)
  }

  addLights() {
    this.ambient = new THREE.AmbientLight(0xFFFFFF, 0.15)
    this.directionnal = new THREE.DirectionalLight(0xFFFFFF, 0.75)
    this.directionnal.position.set(0, 2, 2)
    this.scene.add(this.ambient)
    this.scene.add(this.directionnal)
  }

  initPost() {
    this.baseTexture = new THREE.WebGLRenderTarget(this.width, this.height, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat
    })

    this.materialOrtho = new THREE.ShaderMaterial({
      extensions: {
        derivates: 'extensions GL_OES_derivates: enable'
      },
      side: THREE.DoubleSide,
      transparent: true,
      uniforms: {
        time: { value: 0 },
        uMap: { value: null },
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShaderPost,
    })

    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), this.materialOrtho)

    this.scenePost = new THREE.Scene()

    this.scenePost.add(mesh)
  }

  render() {
    if (!this.isPlaying) return
    this.time += 0.05
    this.material.uniforms.time.value = this.time
    this.sphere.rotation.y = -this.time / 20
    requestAnimationFrame(this.render.bind(this))

    this.renderer.setRenderTarget(this.baseTexture)
    this.renderer.render(this.scene, this.camera)

    this.materialOrtho.uniforms.uMap.value = this.baseTexture.texture
    
    this.renderer.setRenderTarget(null)
    this.renderer.render(this.scenePost, this.cameraPost)
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
    }
    this.gui = new GUI()
    this.gui.add(this.settings, 'progress', 0, 1, 0.01).onChange((value) => {
      this.material.uniforms.progress.value = value
    })
  }
}
