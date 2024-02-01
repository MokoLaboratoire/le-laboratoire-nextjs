import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

function generateString(length) {
  let result = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  const charactersLength = characters.length
  let counter = 0
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
		result += ' '
    counter += 1
  }
  return result
}

export default class ThreejsEnhancedCssSliderClass {
  constructor(props) {
    const { container } = props

    this.isPlaying = true
    this.time = 0

    this.scroller = [...document.querySelectorAll('.slider__scroller')]
    this.encodedScroller = [...document.querySelectorAll('.encoded .slide')]
    this.position = -2 * (360 + 200)

    this.container = container

    this.scene = new THREE.Scene()

    this.width = window.innerWidth
    this.height = 240

    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    })
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.renderer.setSize(this.width, this.height)
    /* this.renderer.setClearColor(0x333333, 1) */

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

    /* this.controls = new OrbitControls(this.camera, this.renderer.domElement) */

    this.addObjects()
    this.render()
		this.populateEncodedSlices()

    this.setupResize()
  }

	populateEncodedSlices() {
		this.encodedScroller.forEach((slide, 
			index) => {
			let string = generateString(500)
			slide.innerHTML = string
		})
	}

  addObjects() {
    const geometry = new THREE.PlaneGeometry(1, 1)
    this.material = new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
      transparent: true,
      uniforms: {
        time: { value: 0 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        void main() {
					gl_FragColor = vec4(vUv, 0.0, 1.0);
        }
      `,
    })

    const plane = new THREE.Mesh(geometry, this.material)
    this.scene.add(plane)
  }

  render() {
    if (!this.isPlaying) return
    this.time += 0.05

    this.position += 0.5
    if (this.position > 0) this.position = -2 * (360 + 200)
    this.scroller.forEach((scroller, index) => {
      scroller.style.transform = `translateX(${this.position}px)`
    })

    this.material.uniforms.time.value = this.time
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
