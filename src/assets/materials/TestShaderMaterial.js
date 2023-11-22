import * as THREE from 'three'
import { extend } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'
import glsl from 'babel-plugin-glsl/macro'

const TestShaderMaterial = shaderMaterial(
  {
    uScale: 0.0,
    uOpacity: 0.0,
    uBW: 0.0,
    uResolution: new THREE.Vector2(),
    uTexture: new THREE.Texture()
  },
  glsl`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  glsl`
    varying vec2 vUv;
    uniform float uOpacity;
    uniform float uBW;
    uniform sampler2D uTexture;
    void main() {
      vec4 texture = texture2D(uTexture, vUv);
      float bw = (texture.r + texture.b + texture.g) / 3.0;
      vec4 another = vec4(bw, bw, bw, 1.0);
      gl_FragColor = mix(another, texture, uBW);
      gl_FragColor.a = uOpacity;
    }
  `
)

extend({ TestShaderMaterial })

export default TestShaderMaterial