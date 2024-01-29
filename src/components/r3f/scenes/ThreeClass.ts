import * as THREE from 'three'

interface ThreeClassProps {
  mountPoint: HTMLDivElement
  width: number
  height: number
}

export default class ThreeClass {
  private scene: THREE.Scene
  private camera: THREE.Camera
  private renderer: THREE.WebGLRenderer

  constructor(props: ThreeClassProps) {
    const { mountPoint, width, height } = props

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

    mountPoint.appendChild(this.renderer.domElement)

    this.addMeshes(this.scene)
  }

  addMeshes(scene: THREE.Scene) {
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
