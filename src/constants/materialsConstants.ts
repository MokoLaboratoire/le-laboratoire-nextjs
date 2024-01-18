import * as THREE from 'three'

export const materialProps = {
  alphaHash: false,
  alphaTest: 0,
  alphaToCoverage: false,
  blendAlpha: 0,
  blendColor: '#000000',
  blendDst: THREE.OneMinusSrcAlphaFactor,
  blendEquation: THREE.AddEquation,
  blending: THREE.NormalBlending,
  blendSrc: THREE.SrcAlphaFactor,
  clipIntersection: false,
  clipShadows: false,
  colorWrite: true,
  depthFunc: THREE.LessEqualDepth,
  depthTest: true,
  depthWrite: true,
  forceSinglePass: false,
  stencilWrite: false,
  stencilWriteMask: 0xff,
  stencilFunc: THREE.AlwaysStencilFunc,
  stencilRef: 0,
  stencilFuncMask: 0xff,
  stencilFail: THREE.KeepStencilOp,
  stencilZFail: THREE.KeepStencilOp,
  stencilZPass: THREE.KeepStencilOp,
  name: '',
  opacity: 1,
  polygonOffset: false,
  polygonOffsetFactor: 0,
  polygonOffsetUnits: 0,
  premultipliedAlpha: false,
  dithering: false,
  side: THREE.FrontSide,
  toneMapped: true,
  transparent: false,
  version: 0,
  vertexColors: false,
  visible: true,
  userData: {},
  leva: false
}

export const materialControls = {
  alphaHash: materialProps.alphaHash,
  alphaTest: { value: materialProps.alphaTest, min: 0, max: 1 },
  alphaToCoverage: materialProps.alphaToCoverage,
  blendAlpha: { value: materialProps.alphaTest, min: 0, max: 1 },
  blendColor: materialProps.blendColor,
  blendDst: {
    options: { 
      OneMinusSrcAlphaFactor: materialProps.blendDst,
      ZeroFactor: THREE.ZeroFactor,
      OneFactor: THREE.OneFactor,
      SrcColorFactor: THREE.SrcColorFactor,
      OneMinusSrcColorFactor: THREE.OneMinusSrcColorFactor,
      SrcAlphaFactor: THREE.SrcAlphaFactor,
      DstAlphaFactor: THREE.DstAlphaFactor,
      OneMinusDstAlphaFactor: THREE.OneMinusDstAlphaFactor,
      DstColorFactor: THREE.DstColorFactor,
      OneMinusDstColorFactor: THREE.OneMinusDstColorFactor,
      SrcAlphaSaturateFactor: THREE.SrcAlphaSaturateFactor,
      ConstantColorFactor: THREE.ConstantColorFactor,
      OneMinusConstantColorFactor: THREE.OneMinusConstantColorFactor,
      ConstantAlphaFactor: THREE.ConstantAlphaFactor,
      OneMinusConstantAlphaFactor: THREE.OneMinusConstantAlphaFactor,
    }
  },
  blendEquation: {
    options: { 
      AddEquation: materialProps.blendEquation,
      SubtractEquation: THREE.SubtractEquation,
      ReverseSubtractEquation: THREE.ReverseSubtractEquation,
      MinEquation: THREE.MinEquation,
      MaxEquation: THREE.MaxEquation,
    }
  },
  blending: {
    options: { 
      NormalBlending: materialProps.blending,
      NoBlending: THREE.NoBlending,
      AdditiveBlending: THREE.AdditiveBlending,
      SubtractiveBlending: THREE.SubtractiveBlending,
      MultiplyBlending: THREE.MultiplyBlending,
      CustomBlending: THREE.CustomBlending,
    }
  },
  blendSrc: {
    options: { 
      SrcAlphaFactor: materialProps.blendSrc,
      ZeroFactor: THREE.ZeroFactor,
      OneFactor: THREE.OneFactor,
      SrcColorFactor: THREE.SrcColorFactor,
      OneMinusSrcColorFactor: THREE.OneMinusSrcColorFactor,
      DstAlphaFactor: THREE.DstAlphaFactor,
      OneMinusDstAlphaFactor: THREE.OneMinusDstAlphaFactor,
      DstColorFactor: THREE.DstColorFactor,
      OneMinusDstColorFactor: THREE.OneMinusDstColorFactor,
      SrcAlphaSaturateFactor: THREE.SrcAlphaSaturateFactor,
      ConstantColorFactor: THREE.ConstantColorFactor,
      OneMinusConstantColorFactor: THREE.OneMinusConstantColorFactor,
      ConstantAlphaFactor: THREE.ConstantAlphaFactor,
      OneMinusConstantAlphaFactor: THREE.OneMinusConstantAlphaFactor,
    }
  },
  clipIntersection: materialProps.clipIntersection,
  clipShadows: materialProps.clipShadows,
  colorWrite: materialProps.colorWrite,
  depthFunc: {
    options: { 
      LessEqualDepth: materialProps.depthFunc,
      NeverDepth: THREE.NeverDepth,
      AlwaysDepth: THREE.AlwaysDepth,
      EqualDepth: THREE.EqualDepth,
      LessDepth: THREE.LessDepth,
      GreaterEqualDepth: THREE.GreaterEqualDepth,
      GreaterDepth: THREE.GreaterDepth,
      NotEqualDepth: THREE.NotEqualDepth,
    }
  },
  depthTest: materialProps.depthTest,
  depthWrite: materialProps.depthWrite,
  forceSinglePass: materialProps.forceSinglePass,
  stencilWrite: materialProps.stencilWrite,
  stencilWriteMask: materialProps.stencilWriteMask,
  stencilFunc: {
    options: { 
      AlwaysStencilFunc: materialProps.stencilFunc,
      NeverStencilFunc: THREE.NeverStencilFunc,
      LessStencilFunc: THREE.LessStencilFunc,
      EqualStencilFunc: THREE.EqualStencilFunc,
      LessEqualStencilFunc: THREE.LessEqualStencilFunc,
      GreaterStencilFunc: THREE.GreaterStencilFunc,
      NotEqualStencilFunc: THREE.NotEqualStencilFunc,
      GreaterEqualStencilFunc: THREE.GreaterEqualStencilFunc,
    }
  },
  stencilRef: { value: materialProps.stencilRef, min: 0, max: 1 },
  stencilFuncMask: materialProps.stencilFuncMask,
  stencilFail: {
    options: { 
      KeepStencilOp: materialProps.stencilFail,
      ZeroStencilOp: THREE.ZeroStencilOp, 
      ReplaceStencilOp: THREE.ReplaceStencilOp,
      IncrementStencilOp: THREE.IncrementStencilOp, 
      DecrementStencilOp: THREE.DecrementStencilOp,
      IncrementWrapStencilOp: THREE.IncrementWrapStencilOp, 
      DecrementWrapStencilOp: THREE.DecrementWrapStencilOp,
      InvertStencilOp: THREE.InvertStencilOp,
    }
  },
  stencilZFail: {
    options: { 
      KeepStencilOp: materialProps.stencilZFail,
      ZeroStencilOp: THREE.ZeroStencilOp, 
      ReplaceStencilOp: THREE.ReplaceStencilOp,
      IncrementStencilOp: THREE.IncrementStencilOp, 
      DecrementStencilOp: THREE.DecrementStencilOp,
      IncrementWrapStencilOp: THREE.IncrementWrapStencilOp, 
      DecrementWrapStencilOp: THREE.DecrementWrapStencilOp,
      InvertStencilOp: THREE.InvertStencilOp,
    }
  },
  stencilZPass: {
    options: { 
      KeepStencilOp: materialProps.stencilZPass,
      ZeroStencilOp: THREE.ZeroStencilOp, 
      ReplaceStencilOp: THREE.ReplaceStencilOp,
      IncrementStencilOp: THREE.IncrementStencilOp, 
      DecrementStencilOp: THREE.DecrementStencilOp,
      IncrementWrapStencilOp: THREE.IncrementWrapStencilOp, 
      DecrementWrapStencilOp: THREE.DecrementWrapStencilOp,
      InvertStencilOp: THREE.InvertStencilOp,
    }
  },
  name: materialProps.name,
  opacity: { value: materialProps.opacity, min: 0, max: 1 },
  polygonOffset: materialProps.polygonOffset,
  polygonOffsetFactor: { value: materialProps.polygonOffsetFactor, min: 0, max: 1 },
  polygonOffsetUnits: { value: materialProps.polygonOffsetUnits, min: 0, max: 1 },
  premultipliedAlpha: materialProps.premultipliedAlpha,
  dithering: materialProps.dithering,
  side: {
    options: { 
      FrontSide: materialProps.side,
      BackSide: THREE.BackSide,
      DoubleSide: THREE.DoubleSide, 
    }
  },
  toneMapped: materialProps.toneMapped,
  transparent: materialProps.transparent,
  version: { value: materialProps.version, min: 0, max: 1 },
  vertexColors: materialProps.vertexColors,
  visible: materialProps.visible,
  /* userData: materialProps.userData, */ // Object???
}


export const meshStandardMaterialProps = {
  alphaMap: undefined,
  aoMap: undefined,
  aoMapIntensity: 1,
  bumMap: undefined,
  bumpScale: 1,
  color: '#ffffff',
  displacementMap: undefined,
  displacementScale: 1,
  displacementBias: 0,
  emissive: '#000000',
  emissiveMap: undefined,
  emissiveIntensity: 1,
  envMap: undefined,
  envMapIntensity: 0,
  flatShading: false,
  fog: true,
  lightMap: undefined,
  lightMapIntensity: 1,
  map: undefined,
  metalness: 0,
  metalnessMap: undefined,
  normalMap: undefined,
  normalMapType: THREE.TangentSpaceNormalMap,
  normalScale: new THREE.Vector2(1, 1),
  roughness: 1,
  roughnessMap: undefined,
  wireframe: false,
  wireframeLinecap: 'round',
  wireframeLinejoin: 'round',
  wireframeLinewidth: 1,
}

export const meshStandardMaterialControls = {
  alphaMap: { image: meshStandardMaterialProps.alphaMap },
  aoMap: { image: meshStandardMaterialProps.aoMap },
  aoMapIntensity: { value: meshStandardMaterialProps.aoMapIntensity, min: 0, max: 1 },
  bumMap: { image: meshStandardMaterialProps.bumMap },
  bumpScale: { value: meshStandardMaterialProps.bumpScale, min: 0, max: 1 },
  color: meshStandardMaterialProps.color,
  displacementMap: { image: meshStandardMaterialProps.displacementMap },
  displacementScale: { value: meshStandardMaterialProps.displacementScale, min: 0, max: 1 },
  displacementBias: { value: meshStandardMaterialProps.displacementBias, min: 0, max: 1 },
  emissive: meshStandardMaterialProps.emissive,
  emissiveMap: { image: meshStandardMaterialProps.emissiveMap },
  emissiveIntensity: { value: meshStandardMaterialProps.emissiveIntensity, min: 0, max: 1 },
  envMap: { image: meshStandardMaterialProps.envMap },
  envMapIntensity: { value: meshStandardMaterialProps.envMapIntensity, min: 0, max: 1 },
  flatShading: meshStandardMaterialProps.flatShading,
  fog: meshStandardMaterialProps.fog,
  lightMap: { image: meshStandardMaterialProps.lightMap },
  lightMapIntensity: { value: meshStandardMaterialProps.lightMapIntensity, min: 0, max: 1 },
  map: { image: meshStandardMaterialProps.map/* , onChange: (value: string) => console.log('TEST', value)  */},
  metalness: { value: meshStandardMaterialProps.metalness, min: 0, max: 1 },
  metalnessMap: { image: meshStandardMaterialProps.metalnessMap },
  normalMap: { image: meshStandardMaterialProps.normalMap },
  normalMapType: {
    options: { 
      TangentSpaceNormalMap: meshStandardMaterialProps.normalMapType,
      ObjectSpaceNormalMap: THREE.ObjectSpaceNormalMap,
    }
  },
  normalScale: { x: meshStandardMaterialProps.normalScale.x, y: meshStandardMaterialProps.normalScale.y },
  roughness: { value: meshStandardMaterialProps.metalness, min: 0, max: 1 },
  roughnessMap: { image: meshStandardMaterialProps.roughnessMap },
  wireframe: meshStandardMaterialProps.wireframe,
  wireframeLinecap: {
    options: { 
      Butt: 'butt',
      Round: meshStandardMaterialProps.wireframeLinecap,
      Square: 'square',
    }
  },
  wireframeLinejoin: {
    options: { 
      Bevel: 'bevel',
      Miter: 'Miter',
      Round: meshStandardMaterialProps.wireframeLinejoin,
    }
  },
  wireframeLinewidth: { value: meshStandardMaterialProps.wireframeLinewidth, min: 0, max: 1 },
}

export const meshPhysicalMaterialProps = {
  attenuationColor: '#ffffff',
  attenuationDistance: Infinity,
  clearcoat: 0,
  clearcoatMap: undefined,
  clearcoatNormalMap: undefined,
  clearcoatNormalScale: new THREE.Vector2(1, 1),
  clearcoatRoughness: 0,
  clearcoatRoughnessMap: undefined,
  ior: 1.5,
  reflectivity: 0.5,
  iridescence: 0,
  iridescenceMap: undefined,
  iridescenceIOR: 1.3,
  /* iridescenceThicknessRange: [100, 400], */
  iridescenceThicknessMap: undefined,
  sheen: 0,
  sheenRoughness: 1,
  sheenRoughnessMap: undefined,
  sheenColor: '#000000',
  sheenColorMap: undefined,
  specularIntensity: 1,
  specularIntensityMap: undefined,
  specularColor: '#ffffff',
  specularColorMap: undefined,
  thickness: 0,
  thicknessMap: undefined,
  transmission: 0,
  transmissionMap: undefined,
}

export const meshPhysicalMaterialControls = {
  attenuationColor: meshPhysicalMaterialProps.attenuationColor,
  attenuationDistance: { value: meshPhysicalMaterialProps.attenuationDistance, min: 0, max: Infinity },
  clearcoat: { value: meshPhysicalMaterialProps.clearcoat, min: 0, max: 1 },
  clearcoatMap: { image: meshPhysicalMaterialProps.clearcoatMap },
  clearcoatNormalMap: { image: meshPhysicalMaterialProps.clearcoatNormalMap },
  clearcoatNormalScale: { x: meshPhysicalMaterialProps.clearcoatNormalScale.x, y: meshPhysicalMaterialProps.clearcoatNormalScale.y },
  clearcoatRoughness: { value: meshPhysicalMaterialProps.clearcoatRoughness, min: 0, max: 1 },
  clearcoatRoughnessMap: { image: meshPhysicalMaterialProps.clearcoatRoughnessMap },
  ior: { value: meshPhysicalMaterialProps.ior, min: 0, max: 10 },
  reflectivity: { value: meshPhysicalMaterialProps.reflectivity, min: 0, max: 1 },
  iridescence: { value: meshPhysicalMaterialProps.iridescence, min: 0, max: 1 },
  iridescenceMap: { image: meshPhysicalMaterialProps.iridescenceMap },
  iridescenceIOR: { value: meshPhysicalMaterialProps.iridescenceIOR, min: 0, max: 10 },
  // iridescenceThicknessRange
  iridescenceThicknessMap: { image: meshPhysicalMaterialProps.iridescenceThicknessMap },
  sheen: { value: meshPhysicalMaterialProps.sheen, min: 0, max: 1 },
  sheenRoughness: { value: meshPhysicalMaterialProps.sheenRoughness, min: 0, max: 1 },
  sheenRoughnessMap: { image: meshPhysicalMaterialProps.sheenRoughnessMap },
  sheenColor: meshPhysicalMaterialProps.sheenColor,
  sheenColorMap: { image: meshPhysicalMaterialProps.sheenColorMap },
  specularIntensity: { value: meshPhysicalMaterialProps.specularIntensity, min: 0, max: 1 },
  specularIntensityMap: { image: meshPhysicalMaterialProps.specularIntensityMap },
  specularColor: meshPhysicalMaterialProps.specularColor,
  specularColorMap: { image: meshPhysicalMaterialProps.specularColorMap },
  thickness: { value: meshPhysicalMaterialProps.thickness, min: 0, max: 1 },
  thicknessMap: { image: meshPhysicalMaterialProps.thicknessMap },
  transmission: { value: meshPhysicalMaterialProps.transmission, min: 0, max: 1 },
  transmissionMap: { image: meshPhysicalMaterialProps.transmissionMap },
}
