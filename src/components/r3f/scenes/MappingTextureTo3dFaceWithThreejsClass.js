import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { EXRLoader } from 'three/addons/loaders/EXRLoader.js'
import { GUI } from 'dat.gui'

import vertexShader from '../shaders/mapping_texture_to_3D_face_with_threejs/vertexShader.glsl'
import fragmentShader from '../shaders/mapping_texture_to_3D_face_with_threejs/fragmentShader.glsl'

export default class MappingTextureTo3dFaceWithThreejsClass {
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
    this.camera.position.set(0, 0, 4)

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)

    this.ambient = new THREE.AmbientLight(0xFFFFFF, 0.15)
    this.directionnal = new THREE.DirectionalLight(0xFFFFFF, 0.75)
    this.directionnal.position.set(0, 1, 1)
    this.scene.add(this.ambient)
    this.scene.add(this.directionnal)
    
    new EXRLoader().load('img/exr/displacement-2EPGKKOV.exr', (texture) => {
        this.displacementTexture = texture
        this.addObjects()
        this.render()
        this.setupResize()
        this.setUpSettings()
    })
  }

  addObjects() {
    const geometry = new THREE.PlaneGeometry(2, 2, 100, 100)

    this.material = new THREE.ShaderMaterial({
      extensions: {
        derivates: 'extensions GL_OES_derivates: enable'
      },
      side: THREE.DoubleSide,
      transparent: true,
      wireframe: true,
      uniforms: {
        time: { value: 0 },
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    })

    this.tDiffuse = new THREE.TextureLoader().load('/img/svg/001ae0ae-ed40-4c9d-aaea-780fc88bbf57_vfr.svg')

    this.material1 = new THREE.MeshPhongMaterial({
        side: THREE.DoubleSide,
        transparent: true,
        map: this.tDiffuse,
        normalMap: new THREE.TextureLoader().load('/img/png/normal-Y5M5654G.png'),
        displacementMap: this.displacementTexture
    })

    this.material1.onBeforeCompile = (shader) => {
        shader.uniforms.progress = { value: 0 }
        shader.uniforms.translate = { value: new THREE.Vector2(0, 0) }
        
        shader.vertexShader = shader.vertexShader.replace(
            `#include <clipping_planes_pars_vertex>`,
            `#include <clipping_planes_pars_vertex>
                varying vec2 vDisplacementUV;
                uniform vec2 translate;

                vec2 rotate(vec2 v, float a) {
                    float s = sin(a);
                    float c = cos(a);
                    mat2 m = mat2(c, -s, s, c);
                    return m * v;
                }

                float map(float value, float min1, float max1, float min2, float max2) {
                    return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
                }
            `,
        )
        
        shader.vertexShader = shader.vertexShader.replace(
            `#include <project_vertex>`,
            `
                vec2 pos = position.xy * 0.5 * vec2(1.0, 4.0) + translate;

                float u = fract(pos.x + 0.5);
                // float v = pos.y + 0.5;
                float v = map(pos.y, -1.5, 1.5, 0.0, 1.0);

                vec2 displacementUV = vec2(u, v);

                vDisplacementUV = displacementUV;

                float displacement = (texture2D(displacementMap, displacementUV).r - 0.5) * 2.0;

                float radius = 1.4 + 1.25 * displacement;

                vec2 rotateDisplacement = rotate(vec2(0.0, radius), 2.0 * PI * pos.x);

                // transformed.z += 0.4 * sin(10.0 * transformed.x);
                vec4 mvPosition = vec4(vec3(rotateDisplacement.x, position.y, rotateDisplacement.y), 1.0);

                #ifdef USE_BATCHING
                    mvPosition = batchingMatrix * mvPosition;
                #endif

                #ifdef USE_INSTANCING
                    mvPosition = instanceMatrix * mvPosition;
                #endif

                mvPosition = modelViewMatrix * mvPosition;
                gl_Position = projectionMatrix * mvPosition;
            
            `
        )
        
        shader.fragmentShader = shader.fragmentShader.replace(
            `#include <common>`,
            `#include <common>
                varying vec2 vDisplacementUV;
            `,
        )
        
        shader.fragmentShader = shader.fragmentShader.replace(
            `#include <normal_fragment_maps>`,
            `#include <normal_fragment_maps>
                normal = texture2D(normalMap, vDisplacementUV).xyz * 2.0 - 1.0;
            `,
        )

        this.material1.userData.shader = shader
    }

    const plane = new THREE.Mesh(geometry, this.material1)
    this.scene.add(plane)
  }

  render() {
    if (!this.isPlaying) return
    this.time += 0.05
    /* this.material.uniforms.time.value = this.time */
    if(this.material1.userData.shader) {
        console.log(this.material1.userData.shader.uniforms.progress.value)
        this.tDiffuse.offset.y = this.settings.y
        this.tDiffuse.offset.x = this.settings.y
        /* this.material1.userData.shader.uniforms.translate.value.x = this.settings.x
        this.material1.userData.shader.uniforms.translate.value.y = this.settings.y */
    }
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

  setUpSettings() {
    this.settings = {
      x: 0,
      y: 0,
    }
    this.gui = new GUI()
    this.gui.add(this.settings, 'x', -2, 2, 0.01),
    this.gui.add(this.settings, 'y', -2, 2, 0.01)
  }
}
