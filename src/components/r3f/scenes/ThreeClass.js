import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import gsap from 'gsap'

export default class ThreeClass {
  constructor(props) {
    const { container } = props

		this.isPlaying = true
		this.time = 0
		this.size = 256

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
      1000
    )
		this.camera.position.set(0, 0, 4)

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
		
		this.setupFBO()
		this.setupEvents()
		this.addObjects()
		this.render()

		this.setupResize()
  }

	setupEvents() {
		this.dummy = new THREE.Mesh(
			new THREE.PlaneGeometry(100, 100),
			new THREE.MeshBasicMaterial()
		)
		this.ball = new THREE.Mesh(
			new THREE.SphereGeometry(0.1, 32, 32),
			new THREE.MeshBasicMaterial({ color: 0xff0000 })
		)
		/* this.scene.add(this.ball) */
		document.addEventListener('pointermove', (e) => {
			this.pointer.x = (e.clientX / window.innerWidth) * 2 - 1
			this.pointer.y = - (e.clientY / window.innerHeight) * 2 + 1
			this.raycaster.setFromCamera(this.pointer, this.camera)
			let intersects = this.raycaster.intersectObject(this.dummy)
			if(intersects.length > 0) {
				let {x, y} = intersects[0].point
				this.fboMaterial.uniforms.uMouse.value = new THREE.Vector2(x, y)
				console.log(x, y)
				this.ball.position.set(x, y, 1)
			}
		})
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
        uInfo: { value: null },
        uMouse: { value: new THREE.Vector2(0, 0) },
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
				uniform sampler2D uInfo;
				uniform vec2 uMouse;
				uniform float time;
				varying vec2 vUv;
				#define PI 3.1415926538
				const float EPS = 0.001;
				vec4 mod289(vec4 x) {
						return x - floor(x * (1.0 / 289.0)) * 289.0;
				}
				float mod289(float x) {
						return x - floor(x * (1.0 / 289.0)) * 289.0;
				}
				vec4 permute(vec4 x) {
						return mod289(((x*34.0)+1.0)*x);
				}
				float permute(float x) {
						return mod289(((x*34.0)+1.0)*x);
				}
				vec4 taylorInvSqrt(vec4 r) {
						return 1.79284291400159 - 0.85373472095314 * r;
				}
				float taylorInvSqrt(float r) {
						return 1.79284291400159 - 0.85373472095314 * r;
				}
				vec4 grad4(float j, vec4 ip) {
						const vec4 ones = vec4(1.0, 1.0, 1.0, -1.0);
						vec4 p, s;
						p.xyz = floor( fract (vec3(j) * ip.xyz) * 7.0) * ip.z - 1.0;
						p.w = 1.5 - dot(abs(p.xyz), ones.xyz);
						s = vec4(lessThan(p, vec4(0.0)));
						p.xyz = p.xyz + (s.xyz*2.0 - 1.0) * s.www;
						return p;
				}
				#define F4 0.309016994374947451

				vec4 simplexNoiseDerivatives (vec4 v) {
						const vec4  C = vec4( 0.138196601125011, 0.276393202250021, 0.414589803375032, -0.447213595499958);
						vec4 i = floor(v + dot(v, vec4(F4)) );
						vec4 x0 = v -   i + dot(i, C.xxxx);
						vec4 i0;
						vec3 isX = step( x0.yzw, x0.xxx );
						vec3 isYZ = step( x0.zww, x0.yyz );
						i0.x = isX.x + isX.y + isX.z;
						i0.yzw = 1.0 - isX;
						i0.y += isYZ.x + isYZ.y;
						i0.zw += 1.0 - isYZ.xy;
						i0.z += isYZ.z;
						i0.w += 1.0 - isYZ.z;
						vec4 i3 = clamp( i0, 0.0, 1.0 );
						vec4 i2 = clamp( i0-1.0, 0.0, 1.0 );
						vec4 i1 = clamp( i0-2.0, 0.0, 1.0 );
						vec4 x1 = x0 - i1 + C.xxxx;
						vec4 x2 = x0 - i2 + C.yyyy;
						vec4 x3 = x0 - i3 + C.zzzz;
						vec4 x4 = x0 + C.wwww;
						i = mod289(i);
						float j0 = permute( permute( permute( permute(i.w) + i.z) + i.y) + i.x);
						vec4 j1 = permute( permute( permute( permute (
						i.w + vec4(i1.w, i2.w, i3.w, 1.0 ))
						+ i.z + vec4(i1.z, i2.z, i3.z, 1.0 ))
						+ i.y + vec4(i1.y, i2.y, i3.y, 1.0 ))
						+ i.x + vec4(i1.x, i2.x, i3.x, 1.0 ));
						vec4 ip = vec4(1.0/294.0, 1.0/49.0, 1.0/7.0, 0.0) ;
						vec4 p0 = grad4(j0, ip);
						vec4 p1 = grad4(j1.x, ip);
						vec4 p2 = grad4(j1.y, ip);
						vec4 p3 = grad4(j1.z, ip);
						vec4 p4 = grad4(j1.w, ip);
						vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
						p0 *= norm.x;
						p1 *= norm.y;
						p2 *= norm.z;
						p3 *= norm.w;
						p4 *= taylorInvSqrt(dot(p4, p4));
						vec3 values0 = vec3(dot(p0, x0), dot(p1, x1), dot(p2, x2)); //value of contributions from each corner at point
						
						vec2 values1 = vec2(dot(p3, x3), dot(p4, x4));
						vec3 m0 = max(0.5 - vec3(dot(x0, x0), dot(x1, x1), dot(x2, x2)), 0.0); //(0.5 - x^2) where x is the distance
						
						vec2 m1 = max(0.5 - vec2(dot(x3, x3), dot(x4, x4)), 0.0);
						vec3 temp0 = -6.0 * m0 * m0 * values0;
						vec2 temp1 = -6.0 * m1 * m1 * values1;
						vec3 mmm0 = m0 * m0 * m0;
						vec2 mmm1 = m1 * m1 * m1;
						float dx = temp0[0] * x0.x + temp0[1] * x1.x + temp0[2] * x2.x + temp1[0] * x3.x + temp1[1] * x4.x + mmm0[0] * p0.x + mmm0[1] * p1.x + mmm0[2] * p2.x + mmm1[0] * p3.x + mmm1[1] * p4.x;
						float dy = temp0[0] * x0.y + temp0[1] * x1.y + temp0[2] * x2.y + temp1[0] * x3.y + temp1[1] * x4.y + mmm0[0] * p0.y + mmm0[1] * p1.y + mmm0[2] * p2.y + mmm1[0] * p3.y + mmm1[1] * p4.y;
						float dz = temp0[0] * x0.z + temp0[1] * x1.z + temp0[2] * x2.z + temp1[0] * x3.z + temp1[1] * x4.z + mmm0[0] * p0.z + mmm0[1] * p1.z + mmm0[2] * p2.z + mmm1[0] * p3.z + mmm1[1] * p4.z;
						// float dw = temp0[0] * x0.w + temp0[1] * x1.w + temp0[2] * x2.w + temp1[0] * x3.w + temp1[1] * x4.w + mmm0[0] * p0.w + mmm0[1] * p1.w + mmm0[2] * p2.w + mmm1[0] * p3.w + mmm1[1] * p4.w;
						
						
						// return vec4(dx, dy, dz, dw) * 49.0;
						return vec4(dx, dy, dz, 0.0) * 49.0;
				}
				vec3 curl( in vec3 p, in float noiseTime, in float persistence ) {
						vec4 xNoisePotentialDerivatives = vec4(0.0);
						vec4 yNoisePotentialDerivatives = vec4(0.0);
						// vec4 zNoisePotentialDerivatives = vec4(0.0);
						
						
						for (int i = 0; i < 2; ++i) {
								float twoPowI = pow(2.0, float(i));
								float scale = 0.5 * twoPowI * pow(persistence, float(i));
								xNoisePotentialDerivatives += simplexNoiseDerivatives(vec4(p * twoPowI, noiseTime)) * scale;
								yNoisePotentialDerivatives += simplexNoiseDerivatives(vec4((p + vec3(123.4, 129845.6, -1239.1)) * twoPowI, noiseTime)) * scale;
								// zNoisePotentialDerivatives += snoise4(vec4((p + vec3(-9519.0, 9051.0, -123.0)) * twoPowI, noiseTime)) * scale;
						}
						return vec3(
						yNoisePotentialDerivatives[1] - xNoisePotentialDerivatives[1], yNoisePotentialDerivatives[2] - xNoisePotentialDerivatives[2], yNoisePotentialDerivatives[0] - xNoisePotentialDerivatives[0]
						);
				}
				void main() {
					vec4 pos = texture2D(uPositions, vUv);
					vec4 info = texture2D(uInfo, vUv);

					/* vec2 mouse = vec2(sin(-time), cos(-time)); */
					vec2 mouse = uMouse;


					/* float radius = info.x; */
					/* float angle = atan(pos.y, pos.x) - 0.1; */

					float radius = length(pos.xy);
					float circularForce = 1.0 - smoothstep(0.3, 1.4, abs(pos.x - radius));
					float angle = atan(pos.y, pos.x) - info.y * 0.3 * mix(0.5, 1.0, circularForce);

					float targetRadius = mix(info.x, 1.8, 0.5 + 0.45 * sin(angle * 2.0 + time * 0.2));
					radius += (targetRadius - radius) * mix(0.2, 0.5, circularForce);

					vec3 targetPos = vec3(cos(angle), sin(angle), 0.0) * radius;
					pos.xy += (targetPos.xy - pos.xy) * 0.1;


					/* pos.xy += vec2(0.001); */

					pos.xy += curl(pos.xyz * 4.0, time * 0.1, 0.1).xy * 0.006;

					float dist = length(pos.xy - mouse);
					vec2 dir = normalize(pos.xy - mouse);
					pos.xy += dir * 0.1 * smoothstep(0.3, 0.0, dist);

					gl_FragColor = vec4(pos.xy, 1.0, 1.0);
				}
			`,
    })

    this.infoarray = new Float32Array(this.size * this.size * 4)

    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        let index = (i + j * this.size) * 4
        this.infoarray[index + 0] = 0.5 + Math.random()
        this.infoarray[index + 1] = 0.5 + Math.random()
        this.infoarray[index + 2] = 1.0
        this.infoarray[index + 3] = 1.0
      }
    }

    this.info = new THREE.DataTexture(
      this.infoarray,
      this.size,
      this.size,
      THREE.RGBAFormat,
      THREE.FloatType,
    )
    this.info.magFilter = THREE.NearestFilter
    this.info.minFilter = THREE.NearestFilter
    this.info.needsUpdate = true
		this.fboMaterial.uniforms.uInfo.value = this.info

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
			transparent: true,
      uniforms: {
				uPositions: { value: null },
        time: { value: 0 },
      },
      vertexShader: `
        uniform sampler2D uPositions;
        uniform float time;
        varying vec2 vUv;
        varying vec4 vColor;
        void main() {
          vUv = uv;
          vec4 pos = texture2D(uPositions, vUv);

					float angle = atan(pos.y, pos.x);
					vColor = 0.8 * vec4(0.5 + 0.45 * sin(angle + time * 0.4));

          vec4 mvPosition = modelViewMatrix * vec4(pos.xyz, 1.0);
          gl_PointSize = 1.0 * (1.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
				uniform sampler2D uPositions;
        varying vec2 vUv;
        varying vec4 vColor;
        void main() {
					gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
					gl_FragColor = vColor;
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
