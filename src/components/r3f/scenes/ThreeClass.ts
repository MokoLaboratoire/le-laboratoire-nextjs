import * as THREE from 'three'
import gsap from 'gsap'

interface ThreeClassProps {
  container: HTMLDivElement
  width: number
  height: number
}

export default class ThreeClass {
  private scene: THREE.Scene
  private camera: THREE.Camera
  private renderer: THREE.WebGLRenderer

  constructor(props: ThreeClassProps) {
    const { container, width, height } = props

    this.scene = new THREE.Scene()

    this.camera = new THREE.PerspectiveCamera(
      75,
      width / height,
      0.1,
      1000
    )

    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    })

    this.scene.background = new THREE.Color(0xFF0000)
    this.renderer.setSize(width, height)
    this.camera.position.z = 5

    container.appendChild(this.renderer.domElement)

    this.addMeshes(this.scene)
  }

  addMeshes(scene: THREE.Scene) {
    const geometry = new THREE.PlaneGeometry(1, 1)
    const material = new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
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
    gsap.to(plane.rotation, {duration: 10, y: Math.PI * 2, repeat: -1, ease: "none"});
    scene.add(plane)
  }

  resizeRendererToDisplaySize(renderer: THREE.WebGLRenderer) {
    const canvas = renderer.domElement
    const width = canvas.clientWidth
    const height = canvas.clientHeight

    const needResize = canvas.width !== width || canvas.height !== height

    if (needResize) {
      renderer.setSize(width, height, false)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }

    return needResize
  }

  public setAnimationLoop() {
    this.renderer.setAnimationLoop(() => {
      this.renderer.render(this.scene, this.camera)
    })
  }
}
