import * as THREE from 'three'
import { extend, Object3DNode } from '@react-three/fiber'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      customMaterial: Object3DNode<
      DefaultShaderMaterial,
        typeof DefaultShaderMaterial
      >
    }
  }
}

export class DefaultShaderMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
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
        }`,
    })
  }
}

extend({ DefaultShaderMaterial })
