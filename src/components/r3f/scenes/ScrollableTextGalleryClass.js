import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { MSDFTextGeometry, MSDFTextMaterial, uniforms } from 'three-msdf-text-utils'
import VirtualScroll from 'virtual-scroll'

import fnt from '@/assets/fonts/msdf/Roboto-Black-msdf.json'
import atlasURL from '@/assets/fonts/msdf/Roboto-Black.png'

const TEXTS = [
  'Rocambolesque',
  'Epoustouflant',
  'Panache',
  'Albatros',
  'Coquelicot',
  'Amant',
  'Merveilleux',
  'Baiser',
  'Badiner',
  'Melancolie',
]

export default class ScrollableTextGalleryClass {
  constructor(props) {
    const { container } = props

    this.isPlaying = true
    this.time = 0

    this.container = container

    this.scene = new THREE.Scene()
    this.sceneCopy = new THREE.Scene()
    this.group = new THREE.Group()
    this.groupCopy = new THREE.Group()
    this.groupplane = new THREE.Group()
    this.scene.add(this.group)
    this.sceneCopy.add(this.groupCopy)
    this.scene.add(this.groupplane)

    this.textures = [...document.querySelectorAll('.js-texture')]
    this.textures = this.textures.map(t => {
      console.log(t)
      return new THREE.TextureLoader().load(t.src)
    })

    this.width = window.innerWidth
    this.height = window.innerHeight

    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    })
    this.renderer.autoClear = false
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.renderer.setSize(this.width, this.height)
    this.renderer.setClearColor(0x000000, 1)

    this.container.appendChild(this.renderer.domElement)

    this.camera = new THREE.PerspectiveCamera(
      70,
      this.width / this.height,
      0.01,
      1000,
    )
    this.camera.position.set(0, 0, 2)

    /* this.controls = new OrbitControls(this.camera, this.renderer.domElement) */

    /* this.raycaster = new THREE.Raycaster()
    this.pointer = new THREE.Vector2() */

    this.position = 0
    this.speed = 0
    this.scroller = new VirtualScroll()
    this.scroller.on((event) => {
	    /* wrapper.style.transform = `translateY(${event.y}px)` */
      this.position = event.y / 4000
      this.speed = event.deltaY / 2000
    })
 
    this.addObjects()
    this.addText()
    this.render()

    this.setupResize()
  }

	addText() {
		Promise.all([ 
				loadFontAtlas(atlasURL.src),
		]).then(([atlas]) => {
      this.material = new THREE.ShaderMaterial({
        side: THREE.DoubleSide,
        transparent: true,
        defines: {
          IS_SMALL: false,
        },
        extensions: {
          derivatives: true,
        },
        uniforms: {
          uSpeed: { value: 0 },
          ...uniforms.common,
          ...uniforms.rendering,
          ...uniforms.strokes,
        },
        vertexShader: `
            // Attribute
            attribute vec2 layoutUv;
    
            attribute float lineIndex;
    
            attribute float lineLettersTotal;
            attribute float lineLetterIndex;
    
            attribute float lineWordsTotal;
            attribute float lineWordIndex;
    
            attribute float wordIndex;
    
            attribute float letterIndex;
    
            // Varyings
            varying vec2 vUv;
            varying vec2 vLayoutUv;
            varying vec3 vViewPosition;
            varying vec3 vNormal;
    
            varying float vLineIndex;
    
            varying float vLineLettersTotal;
            varying float vLineLetterIndex;
    
            varying float vLineWordsTotal;
            varying float vLineWordIndex;
    
            varying float vWordIndex;
    
            varying float vLetterIndex;

            mat4 rotationMatrix(vec3 axis, float angle) {
              axis = normalize(axis);
              float s = sin(angle);
              float c = cos(angle);
              float oc = 1.0 - c;
              
              return mat4(oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
                          oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
                          oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
                          0.0,                                0.0,                                0.0,                                1.0);
          }
          
          vec3 rotate(vec3 v, vec3 axis, float angle) {
            mat4 m = rotationMatrix(axis, angle);
            return (m * vec4(v, 1.0)).xyz;
          }
          uniform float uSpeed;
    
            void main() {
              // Varyings
              vUv = uv;
              vLayoutUv = layoutUv;

              vNormal = normal;
  
              vLineIndex = lineIndex;
  
              vLineLettersTotal = lineLettersTotal;
              vLineLetterIndex = lineLetterIndex;
  
              vLineWordsTotal = lineWordsTotal;
              vLineWordIndex = lineWordIndex;
  
              vWordIndex = wordIndex;
  
              vLetterIndex = letterIndex;

              // Output
              vec3 newpos = position;
              float xx = position.x * 0.005;
              newpos = rotate(newpos, vec3(0.0, 0.0, 1.0), uSpeed * xx * xx * xx);

              vec4 mvPosition = vec4(newpos, 1.0);
              mvPosition = modelViewMatrix * mvPosition;
              gl_Position = projectionMatrix * mvPosition;

              vViewPosition = -mvPosition.xyz;
            }
        `,
        fragmentShader: `
            // Varyings
            varying vec2 vUv;
            varying vec2 vLayoutUv;
    
            // Uniforms: Common
            uniform float uOpacity;
            uniform float uThreshold;
            uniform float uAlphaTest;
            uniform vec3 uColor;
            uniform sampler2D uMap;
    
            // Uniforms: Strokes
            uniform vec3 uStrokeColor;
            uniform float uStrokeOutsetWidth;
            uniform float uStrokeInsetWidth;
    
            // Utils: Median
            float median(float r, float g, float b) {
                return max(min(r, g), min(max(r, g), b));
            }
    
            void main() {

                vec3 s = texture2D(uMap, vUv).rgb;
    
                // Signed distance
                float sigDist = median(s.r, s.g, s.b) - 0.5;
    
                float afwidth = 1.4142135623730951 / 2.0;
    
                #ifdef IS_SMALL
                    float alpha = smoothstep(uThreshold - afwidth, uThreshold + afwidth, sigDist);
                #else
                    float alpha = clamp(sigDist / fwidth(sigDist) + 0.5, 0.0, 1.0);
                #endif
    
                // Strokes
                // Outset
                float sigDistOutset = sigDist + uStrokeOutsetWidth * 0.5;
    
                // Inset
                float sigDistInset = sigDist - uStrokeInsetWidth * 0.5;
    
                #ifdef IS_SMALL
                    float outset = smoothstep(uThreshold - afwidth, uThreshold + afwidth, sigDistOutset);
                    float inset = 1.0 - smoothstep(uThreshold - afwidth, uThreshold + afwidth, sigDistInset);
                #else
                    float outset = clamp(sigDistOutset / fwidth(sigDistOutset) + 0.5, 0.0, 1.0);
                    float inset = 1.0 - clamp(sigDistInset / fwidth(sigDistInset) + 0.5, 0.0, 1.0);
                #endif
    
                // Border
                float border = outset * inset;
    
                // Alpha Test
                if (alpha < uAlphaTest) discard;
    
                // Output: Common
                vec4 filledFragColor = vec4(uColor, uOpacity * alpha);
    
                // Output: Strokes
                vec4 strokedFragColor = vec4(uStrokeColor, uOpacity * border);
    
                gl_FragColor = vec4(vLayoutUv, 1.0, 1.0);              }
        `,
      });
      this.material.uniforms.uMap.value = atlas;

      this.size = 0.2

      TEXTS.forEach((text, i) => {
				const geometry = new MSDFTextGeometry({
          text: text.toUpperCase(),
          font: fnt,
        });
		
				const mesh = new THREE.Mesh(geometry, this.material);
        const scale = 0.005
        mesh.scale.set(scale, -scale, scale)
        mesh.position.x = -0.9
        mesh.position.y = this.size * i
				this.group.add(mesh)
				this.groupCopy.add(mesh.clone())
      })
		});
		
		function loadFontAtlas(path) {
				const promise = new Promise((resolve, reject) => {
						const loader = new THREE.TextureLoader();
						loader.load(path, resolve);
				});
		
				return promise;
		}
	}

  addObjects() {
    this.geometry = new THREE.PlaneGeometry(1.77 / 3, 1 / 3, 30, 30).translate(0, 0, 1)
    const pos = this.geometry.attributes.position.array
    const newpos = []
    let r = 1.2
    for(let i = 0; i < pos.length; i += 3) {
      const x = pos[i]
      const y = pos[i + 1]
      const z = pos[i + 2]
      let xz = new THREE.Vector2(x, z).normalize().multiplyScalar(r)
      let xyz = new THREE.Vector3(x, y, z).normalize().multiplyScalar(r)
      /* newpos.push(xz.x, y, xz.y) */
      newpos.push(xyz.x, xyz.y, xyz.z)
    }

    const testmesh = new THREE.Mesh(
      new THREE.SphereGeometry(r, 32, 32),
      new THREE.MeshBasicMaterial({ wireframe: true, color: new THREE.Color(0xff0000)})
    )
    this.scene.add(testmesh)
    this.geometry.setAttribute('position', new THREE.Float32BufferAttribute(newpos, 3))

    this.planematerial = new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
      transparent: true,
      uniforms: {
        uTexture: { value: this.textures[1] },
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
      uniform sampler2D uTexture;
        varying vec2 vUv;
        void main() {
		    	gl_FragColor = texture2D(uTexture, vUv);
        }
      `,
    })

    const plane = new THREE.Mesh(this.geometry, this.planematerial)
    this.groupplane.add(plane)
  }

  updateTexture() {
    const index = Math.round(this.position + 10000) % this.textures.length
    this.planematerial.uniforms.uTexture.value = this.textures[index]

    this.groupCopy.children.forEach((mesh, i) => {
      if(i !== index) {
        mesh.visible = false
      } else {
        mesh.visible = true
      }
    })
  }

  render() {
    if (!this.isPlaying) return
    this.time += 0.05
    this.updateTexture()
    this.speed *= 0.9
    /* this.targetSpeed += (this.speed - this.targetSpeed) * 0.1 */
    if(this.material) this.material.uniforms.uSpeed.value = this.speed
    this.group.position.y = -this.position * this.size
    this.groupCopy.position.y = -this.position * this.size
    this.groupplane.rotation.y = this.position * 2 * Math.PI
    this.groupplane.rotation.z = 0.2 * Math.sin(this.position * 0.5)
    requestAnimationFrame(this.render.bind(this))
		this.renderer.render(this.scene, this.camera)
    this.renderer.clearDepth()
		this.renderer.render(this.sceneCopy, this.camera)
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
