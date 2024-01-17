export interface MaterialInterface {
  alphaHash?: boolean
  alphaTest?: number
  alphaToCoverage?: boolean
  blendAlpha?: number
  blendColor?: string | THREE.Color
  blendDst?: THREE.BlendingDstFactor | undefined
  blendDstAlpha?: number
  blendEquation?: THREE.BlendingEquation | undefined
  blendEquationAlpha?: number
  blending?: THREE.Blending
  blendSrc?:
    | 200
    | 201
    | 202
    | 203
    | 204
    | 205
    | 206
    | 207
    | 208
    | 209
    | 211
    | 212
    | 213
    | 214
    | 210
    | undefined
  blendSrcAlpha?: number
  clipIntersection?: boolean
  clippingPlanes?: THREE.Plane[]
  clipShadows?: boolean
  colorWrite?: boolean
  defines?: Object | undefined
  depthFunc?: THREE.DepthModes | undefined
  depthTest?: boolean
  depthWrite?: boolean
  forceSinglePass?: boolean
  stencilWrite?: boolean
  stencilWriteMask?: number
  stencilFunc?: THREE.StencilFunc | undefined
  stencilRef?: number
  stencilFuncMask?: number
  stencilFail?: THREE.StencilOp | undefined
  stencilZFail?: THREE.StencilOp | undefined
  stencilZPass?: THREE.StencilOp | undefined
  id?: number
  name?: string
  needsUpdate?: boolean
  opacity?: number
  polygonOffset?: boolean
  polygonOffsetFactor?: number
  polygonOffsetUnits?: number
  precision?: 'highp' | 'mediump' | 'lowp'
  premultipliedAlpha?: boolean
  dithering?: boolean
  shadowSide?: THREE.Side
  side?: THREE.Side
  toneMapped?: boolean
  transparent?: boolean
  version?: number
  vertexColors?: boolean
  visible?: boolean
  userData?: Object
}

export interface MeshBasicMaterialInterface extends MaterialInterface {
  color?: string | THREE.Color
  wireframe?: boolean
  wireframeLinecap?: 'butt' | 'round' | 'square'
  wireframeLinewidth?: number
}

export interface MeshDepthMaterialInterface extends MaterialInterface {
  wireframe?: boolean
  wireframeLinewidth?: number
}

export interface MeshLambertMaterialInterface extends MaterialInterface {
  color?: string | THREE.Color
  emissive?: string | THREE.Color
  emissiveIntensity?: number
  emissiveMap?: THREE.Texture
  wireframe?: boolean
  wireframeLinecap?: 'butt' | 'round' | 'square'
  wireframeLinejoin?: 'bevel' | 'miter' | 'round'
  wireframeLinewidth?: number
}

export interface MeshMatcapMaterialInterface extends MaterialInterface {
  color?: string | THREE.Color
  matcap?: THREE.Texture
}

export interface MeshNormalMaterialInterface extends MaterialInterface {
  wireframe?: boolean
  wireframeLinewidth?: number
}

export interface MeshPhongMaterialInterface extends MaterialInterface {
  color?: string | THREE.Color
  emissive?: string | THREE.Color
  emissiveIntensity?: number
  emissiveMap?: THREE.Texture
  wireframe?: boolean
  wireframeLinecap?: 'butt' | 'round' | 'square'
  wireframeLinejoin?: 'bevel' | 'miter' | 'round'
  wireframeLinewidth?: number
}

export interface MeshPhysicalMaterialInterface
  extends MeshStandardMaterialInterface {
  attenuationColor?: string | THREE.Color
  attenuationDistance?: number
  clearcoat?: number
  clearcoatMap?: THREE.Texture
  clearcoatNormalMap?: THREE.Texture
  clearcoatNormalScale?: THREE.Vector2
  clearcoatRoughness?: number
  clearcoatRoughnessMap?: THREE.Texture
  defines?: Object
  ior?: number
  reflectivity?: number
  iridescence?: number
  iridescenceMap?: THREE.Texture
  iridescenceIOR?: number
  iridescenceThicknessRange?: [number, number]
  iridescenceThicknessMap?: THREE.Texture
  sheen?: number
  sheenRoughness?: number
  sheenColor?: string | THREE.Color
  sheenColorMap?: THREE.Texture
  specularIntensity?: number
  specularIntensityMap?: THREE.Texture
  specularColor?: string | THREE.Color
  specularColorMap?: THREE.Texture
  thickness?: number
  thicknessMap?: THREE.Texture
  transmission?: number
  transmissionMap?: THREE.Texture
}

export interface MeshStandardMaterialInterface extends MaterialInterface {
  alphaMap?: THREE.Texture
  aoMap?: THREE.Texture
  aoMapIntensity?: number
  bumpMap?: THREE.Texture
  bumpScale?: number
  color?: string | THREE.Color
  defines?: Object
  displacementMap?: THREE.Texture
  displacementScale?: number
  displacementBias?: number
  emissive?: string | THREE.Color
  emissiveMap?: THREE.Texture
  emissiveIntensity?: number
  envMap?: THREE.Texture
  envMapIntensity?: number
  flatShading?: boolean
  fog?: boolean
  lightMap?: THREE.Texture
  lightMapIntensity?: number
  map?: THREE.Texture
  metalness?: number
  metalnessMap?: THREE.Texture
  normalMap?: THREE.Texture
  normalMapType?: THREE.NormalMapTypes | undefined
  normalScale?: THREE.Vector2
  roughness?: number
  roughnessMap?: THREE.Texture
  wireframe?: boolean
  wireframeLinecap?: 'butt' | 'round' | 'square'
  wireframeLinejoin?: 'bevel' | 'meter' | 'round'
  wireframeLinewidth?: number
}

export interface MeshToonMaterialInterface extends MaterialInterface {
  color?: string | THREE.Color
  emissive?: string | THREE.Color
  emissiveIntensity?: number
  emissiveMap?: THREE.Texture
  wireframe?: boolean
  wireframeLinecap?: 'butt' | 'round' | 'square'
  wireframeLinejoin?: 'bevel' | 'miter' | 'round'
  wireframeLinewidth?: number
}
