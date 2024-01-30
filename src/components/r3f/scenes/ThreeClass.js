import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import gsap from 'gsap'

export default class ThreeClass {
  constructor(props) {
    const { container, width, height } = props

    this.width = width
    this.height = height
    this.size = 128

    this.scene = new THREE.Scene()
		this.scene.background = new THREE.Color(0x000000)

    this.camera = new THREE.PerspectiveCamera(
      75,
      width / height,
      0.1,
      1000
    )
		this.camera.position.z = 5

    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    })
		this.renderer.setSize(width, height)

    this.controls = new OrbitControls( this.camera, this.renderer.domElement )

    container.appendChild(this.renderer.domElement)

    this.addParticules(this.scene)
    /* this.addPlane(this.scene) */

    /* this.fbo = this.getRenderTarget
    this.fbol = this.getRenderTarget
    this.fboScene = new THREE.Scene()
    this.fboCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, -1, 1)
    this.fboCamera.position.set(0, 0, 0.5)
    this.fboCamera.lookAt(0, 0, 0)

    container.appendChild(this.renderer.domElement)

    let geometry = new THREE.PlaneGeometry(2, 2) */

    /* this.data = new Float32Array(this.size * this.size * 4)

    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        let index = (i + j * this.size) * 4
        let theta = Math.random() * Math.PI * 2
        let r = 0.5 + 0.5 * Math.random()
        this.data[index + 0] = r * Math.cos(theta)
        this.data[index + 1] = r * Math.sin(theta)
        this.data[index + 2] = 1.0
        this.data[index + 3] = 1.0
      }
    }

    this.fboTexture = new THREE.DataTexture(
      this.data,
      this.size,
      this.size,
      THREE.RGBAFormat,
      THREE.FloatType,
    )
    this.fboTexture.magFilter = THREE.NearestFilter
    this.fboTexture.minFilter = THREE.NearestFilter
    this.fboTexture.needsUpdate = true */

    /* this.fboMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uPositions: { value: this.fboTexture },
      },
      vertexShader: `
 				varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}
			`,
			fragmentShader: `
				uniform sampler2D uPositions;
				varying vec2 vUv;
				void main() {
					vec4 pos = texture2D(uPositions, vUv);
					gl_FragColor = pos;
				}
			`,
    })
    this.fboMesh = new THREE.Mesh(geometry, this.fboMaterial) */
    /* this.fboScene.add(this.fboMesh) */
  }

  getRenderTarget() {
    const renderTarget = new THREE.WebGLRenderTarget(
      this.width, 
      this.height, 
      {
        minFilter: THREE.NearestFilter,
        magFilter: THREE.NearestFilter,
        format: THREE.RGBAFormat,
        type: THREE.FloatType,
      }
    )
    return renderTarget
  }

  /* addPlane(scene) {
    const geometry = new THREE.PlaneGeometry(1, 1)
    const material = new THREE.ShaderMaterial({
      uniforms: {
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
    const plane = new THREE.Mesh(geometry, material)
    plane.rotation.x = Math.PI / 4
    scene.add(plane)
  } */

  addParticules(scene) {
    const material = new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
      uniforms: {
        uPositions: { value: null },
      },
      vertexShader: `
        uniform sampler2D uPositions;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec4 pos = texture2D(uPositions, uv);
          vec4 mvPosition = modelViewMatrix * vec4( pos.xyz, 1.0 );
          gl_PointSize = 10.0 * ( 1.0 / -mvPosition.z );
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        void main() {
          gl_FragColor = vec4(vUv, 0.0, 1.0);
        }
      `,
    })

    this.count = Math.pow(this.size, 2)

    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(this.count * 3)
    const uv = new Float32Array(this.count * 2)

    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        let index = (i + j * this.size)
        positions[index * 3 + 0] = Math.random()
        positions[index * 3 + 1] = Math.random()
        positions[index * 3 + 2] = 0
        uv[index * 2 + 0] = i / this.size
        uv[index * 2 + 1] = j / this.size
      }
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('uv', new THREE.BufferAttribute(uv, 2))

    this.data = new Float32Array(this.size * this.size * 4)

    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        let index = (i + j * this.size) * 4
        let theta = Math.random() * Math.PI * 2
        let r = 0.5 + 0.5 * Math.random()
        this.data[index + 0] = r * Math.cos(theta)
        this.data[index + 1] = r * Math.sin(theta)
        this.data[index + 2] = 1.0
        this.data[index + 3] = 1.0
      }
    }

    this.fboTexture = new THREE.DataTexture(
      this.data,
      this.size,
      this.size,
      THREE.RGBAFormat,
      THREE.FloatType,
    )
    this.fboTexture.magFilter = THREE.NearestFilter
    this.fboTexture.minFilter = THREE.NearestFilter
    this.fboTexture.needsUpdate = true

    material.uniforms.uPositions.value = this.fboTexture
    const points = new THREE.Points(geometry, material)
    /* gsap.to(plane.rotation, {duration: 10, y: Math.PI * 2, repeat: -1, ease: "none"}); */
    scene.add(points)
  }

  setAnimationLoop() {
    this.renderer.setAnimationLoop(() => {
      this.renderer.render(this.scene, this.camera)
      /* this.renderer.setRenderTarget(null)
      this.renderer.render(this.fboScene, this.fboCamera) */
    })
  }
}
