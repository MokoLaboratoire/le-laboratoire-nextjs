import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import gsap from 'gsap'

export default class ThreeClass {
  constructor(props) {
    const { container } = props

		this.isPlaying = true
		this.time = 0
		this.size = 128

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

		this.container.appendChild(this.renderer.domElement)

    this.camera = new THREE.PerspectiveCamera(
      70,
      this.width / this.height,
      0.01,
      1000
    )
		this.camera.position.set(0, 0, 2)

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)

		this.setupFBO()
		this.addObjects()
		this.render()

		this.setupResize()
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

	setupFBO() {
		this.fbo = this.getRenderTarget()
    this.fbo1 = this.getRenderTarget()

		this.fboScene = new THREE.Scene()
    this.fboCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, -1, 1)
    this.fboCamera.position.set(0, 0, 0.5)
    this.fboCamera.lookAt(0, 0, 0)
		let geometry = new THREE.PlaneGeometry(2, 2)

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

		this.fboMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uPositions: { value: this.fboTexture },
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
				uniform sampler2D uPositions;
				varying vec2 vUv;
				void main() {
					vec4 pos = texture2D(uPositions, vUv);


					float radius = length(pos.xy);
					float angle = atan(pos.y, pos.x) - 0.1;
					vec3 targetPos = vec3(cos(angle), sin(angle), 0.0) * radius;
					pos.xy += (targetPos.xy - pos.xy) * 0.1;


					/* pos.xy += vec2(0.001); */
					gl_FragColor = pos;
				}
			`,
    })

    this.fboMesh = new THREE.Mesh(geometry, this.fboMaterial)
    this.fboScene.add(this.fboMesh)

		this.renderer.setRenderTarget(this.fbo)
		this.renderer.render(this.fboScene, this.fboCamera)
		this.renderer.setRenderTarget(this.fbo1)
		this.renderer.render(this.fboScene, this.fboCamera)
	}

	addObjects() {
    /* const geometry = new THREE.PlaneGeometry(1, 1) */
    this.material = new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
      uniforms: {
				uPositions: { value: null },
        time: { value: 0 },
      },
      vertexShader: `
        uniform sampler2D uPositions;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec4 pos = texture2D(uPositions, vUv);
          vec4 mvPosition = modelViewMatrix * vec4(pos.xyz, 1.0);
          gl_PointSize = 10.0 * (1.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
				uniform sampler2D uPositions;
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

    this.material.uniforms.uPositions.value = this.fboTexture
    const points = new THREE.Points(geometry, this.material)
    this.scene.add(points)
	}

	render() {
		if(!this.isPlaying) return
		this.time += 0.05
		this.material.uniforms.time.value = this.time
		this.fboMaterial.uniforms.time.value = this.time
		requestAnimationFrame(this.render.bind(this))

		this.material.uniforms.uPositions.value = this.fbo.texture 
		this.fboMaterial.uniforms.uPositions.value = this.fbo1.texture

		this.renderer.setRenderTarget(this.fbo)
		this.renderer.render(this.fboScene, this.fboCamera)
		this.renderer.setRenderTarget(null)
		this.renderer.render(this.scene, this.camera)

		let temp = this.fbo
		this.fbo = this.fbo1
		this.fbo1 = temp
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
