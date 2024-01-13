import React from 'react'
import * as THREE from 'three'

import { MeshPhysicalMaterialInterface } from '@/interfaces/components/r3f/MaterialsInterfaces'

export default function CustomMeshPhysicalMaterial({
  visible = true,
  transparent = false,
  opacity = 1,
  doubleSide = false,
  color = 'white',
  metalness = 0,
  roughness = 1,
  transmission = 0,
  ior = 1.5,
  reflectivity = 0.5,
  thickness = 0,
  clearcoat = 0,
  emissive = 'white',
  emissiveIntensity = 1,
  emissiveMap,
  envMapIntensity = 0,
  wireframe = false,
  wireframeLinecap = 'round',
  wireframeLinewidth = 1,
  normalScale = new THREE.Vector2(1, 1),
  normalMap,
  clearcoatRoughness,
  clearcoatNormalScale = new THREE.Vector2(1, 1),
}: MeshPhysicalMaterialInterface) {
  return (
    <meshPhysicalMaterial
      attach={'material'}
      visible={visible}
      transparent={transparent}
      opacity={opacity}
      color={color}
      metalness={metalness}
      roughness={roughness}
      transmission={transmission}
      ior={ior}
      reflectivity={reflectivity}
      thickness={thickness}
      clearcoat={clearcoat}
      emissive={emissive}
      emissiveIntensity={emissiveIntensity}
      emissiveMap={emissiveMap}
      side={doubleSide ? THREE.DoubleSide : undefined}
      envMapIntensity={envMapIntensity}
      wireframe={wireframe}
      wireframeLinecap={wireframeLinecap}
      wireframeLinewidth={wireframeLinewidth}
      normalScale={normalScale}
      normalMap={normalMap}
      clearcoatRoughness={clearcoatRoughness}
      clearcoatNormalScale={clearcoatNormalScale}
    />
  )
}
