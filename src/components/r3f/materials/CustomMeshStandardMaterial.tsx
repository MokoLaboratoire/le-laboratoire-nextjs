import React from 'react'
import * as THREE from 'three'

import { MeshStandardMaterialInterface } from '@/interfaces/components/r3f/MaterialsInterfaces'

export default function CustomMeshStandardMaterial({
  visible = true,
  transparent = false,
  opacity,
  doubleSide = true,
  color = 'white',
  metalness = 0,
  roughness = 1,
  emissive,
  emissiveIntensity,
  emissiveMap,
  envMapIntensity = 0,
  wireframe = false,
  wireframeLinecap = 'round',
  wireframeLinewidth = 1,
  normalScale = new THREE.Vector2(1, 1),
  normalMap
}: MeshStandardMaterialInterface) {
  return (
    <meshStandardMaterial
      attach={'material'}
      visible={visible}
      transparent={transparent}
      opacity={opacity}
      color={color}
      metalness={metalness}
      roughness={roughness}
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
    />
  )
}
