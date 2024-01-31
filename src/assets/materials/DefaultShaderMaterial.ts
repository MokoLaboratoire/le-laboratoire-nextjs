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

const uniforms = {
  uPositions: { value: null },
  time: { value: 0 },
}

export class DefaultShaderMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: uniforms,
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }
      `,
      fragmentShader: `
        uniform sampler2D uPositions;
        uniform float time;
				varying vec2 vUv;
        void main() {
					gl_FragColor = vec4(vUv, 0.0, 1.0);
        }`,
    })
  }
}

extend({ DefaultShaderMaterial })

// https://threejs-university.com/2022/08/13/shadermaterial-et-glsl-notre-premier-shader/
