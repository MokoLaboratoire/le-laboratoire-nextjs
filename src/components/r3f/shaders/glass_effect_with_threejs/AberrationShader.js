import * as THREE from 'three'

import vertexShaderAberration from './vertexShaderAberration.glsl'
import fragmentShaderAberration from './fragmentShaderAberration.glsl'

export const AberrationShader = {
  uniforms: {
    tDiffuse: { value: null },
    distort: { value: 0.5 },
    time: { value: 0 },
  },
  vertexShader: vertexShaderAberration,
  fragmentShader: fragmentShaderAberration,
}
