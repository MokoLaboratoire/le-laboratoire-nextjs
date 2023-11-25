import * as THREE from 'three'
import { extend, Object3DNode, useThree } from '@react-three/fiber'

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
      /* lights: true,
      uniforms: THREE.UniformsUtils.merge([
        // THREE.UniformsLib["shadowmap"],
        THREE.UniformsLib["lights"],
        {
          lightPosition: {type: 'v3', value: scene.light1.position},
          time: {type: 'f', value: 0}
        }
      ]), */
      vertexShader: `
        varying vec4 projShadow;
        void main() {
          projShadow = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          gl_Position = projShadow;
        }
      `,
      fragmentShader: `
        varying vec4 projShadow;
        void main() {
          // Use projShadow.z to perform shadow calculations
          // ...
      
          // Example: Apply a shadow if projShadow.z is less than 0.0
          gl_FragColor = projShadow.z < 0.0 ? vec4(0.0, 0.0, 0.0, 1.0) : vec4(1.0, 0.0, 0.0, 1.0);
      
          // Your fragment shader code goes here
          // ...
          // gl_FragColor=vec4(1.0, 0.0, 0.0, 1.0);
        }`,
    })
  }
}

extend({ TestShaderMaterial })
