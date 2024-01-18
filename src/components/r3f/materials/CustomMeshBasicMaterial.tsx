import React from 'react'
import * as THREE from 'three'

import { MeshBasicMaterialInterface } from '@/interfaces/components/r3f/MaterialsInterfaces'

export default function CustomMeshBasicMaterial({
  alphaHash,
  alphaTest = 0,
  alphaToCoverage = false,
  blendAlpha = 0,
  blendColor = new THREE.Color(0x000000),
  blendDst = THREE.OneMinusSrcAlphaFactor,
  blendDstAlpha,
  blendEquation = THREE.AddEquation,
  blendEquationAlpha,
  blending = THREE.NormalBlending,
  blendSrc = THREE.SrcAlphaFactor,
  blendSrcAlpha,
  clipIntersection = false,
  clippingPlanes,
  clipShadows = false,
  colorWrite = true,
  defines,
  depthFunc = THREE.LessEqualDepth,
  depthTest = true,
  depthWrite = true,
  forceSinglePass = false,
  stencilWrite = false,
  stencilWriteMask = 0xff,
  stencilFunc = THREE.AlwaysStencilFunc,
  stencilRef = 0,
  stencilFuncMask = 0xff,
  stencilFail = THREE.KeepStencilOp,
  stencilZFail = THREE.KeepStencilOp,
  stencilZPass = THREE.KeepStencilOp,
  id,
  name = '',
  needsUpdate,
  opacity = 1,
  polygonOffset = false,
  polygonOffsetFactor = 0,
  polygonOffsetUnits = 0,
  precision,
  premultipliedAlpha = false,
  dithering = false,
  shadowSide,
  side = THREE.FrontSide,
  toneMapped = true,
  transparent = false,
  version = 0,
  vertexColors = false,
  visible = true,
  userData = {},

  color = 'white',
  wireframe = false,
  wireframeLinecap = 'round',
  wireframeLinewidth = 1,
}: MeshBasicMaterialInterface) {
  return (
    <meshBasicMaterial
      attach={'material'}
      alphaHash={alphaHash}
      alphaTest={alphaTest}
      alphaToCoverage={alphaToCoverage}
      blendAlpha={blendAlpha}
      blendColor={blendColor}
      blendDst={blendDst}
      blendDstAlpha={blendDstAlpha}
      blendEquation={blendEquation}
      blendEquationAlpha={blendEquationAlpha}
      blending={blending}
      blendSrc={blendSrc}
      blendSrcAlpha={blendSrcAlpha}
      clipIntersection={clipIntersection}
      clippingPlanes={clippingPlanes}
      clipShadows={clipShadows}
      colorWrite={colorWrite}
      defines={defines}
      depthFunc={depthFunc}
      depthTest={depthTest}
      depthWrite={depthWrite}
      forceSinglePass={forceSinglePass}
      stencilWrite={stencilWrite}
      stencilWriteMask={stencilWriteMask}
      stencilFunc={stencilFunc}
      stencilRef={stencilRef}
      stencilFuncMask={stencilFuncMask}
      stencilFail={stencilFail}
      stencilZFail={stencilZFail}
      stencilZPass={stencilZPass}
      id={id}
      name={name}
      needsUpdate={needsUpdate}
      opacity={opacity}
      polygonOffset={polygonOffset}
      polygonOffsetFactor={polygonOffsetFactor}
      polygonOffsetUnits={polygonOffsetUnits}
      precision={precision}
      premultipliedAlpha={premultipliedAlpha}
      dithering={dithering}
      shadowSide={shadowSide}
      side={side}
      toneMapped={toneMapped}
      transparent={transparent}
      version={version}
      vertexColors={vertexColors}
      visible={visible}
      userData={userData}
      color={color}
      wireframe={wireframe}
      wireframeLinecap={wireframeLinecap}
      wireframeLinewidth={wireframeLinewidth}
    />
  )
}
