import * as THREE from 'three'
import { extend, Object3DNode } from '@react-three/fiber'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      customMaterial: Object3DNode<
        TestShaderMaterial,
        typeof TestShaderMaterial
      >
    }
  }
}

export class TestShaderMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      vertexShader: `
        void main() {
          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }
      `,
      fragmentShader: `
        void main() {
          gl_FragColor=vec4(1.0, 0.0, 0.0, 1.0);
        }`,
      uniforms: {
        color: { value: new THREE.Color('hotpink') },
      },
    })
  }
}

extend({ TestShaderMaterial })
