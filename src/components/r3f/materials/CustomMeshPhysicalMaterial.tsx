import React from 'react'
import * as THREE from 'three'

import { MeshPhysicalMaterialInterface } from '@/interfaces/components/r3f/MaterialsInterfaces'

export default function CustomMeshPhysicalMaterial({
  visible = true,
  transparent = false,
  opacity = 1,
  doubleSide = false,
  color = 'white',
  emissive = 'white',
  emissiveIntensity = 1,
  emissiveMap,
  envMapIntensity = 0,
  wireframe = false,
  wireframeLinecap = 'round',
  wireframeLinewidth = 1,
}: MeshPhysicalMaterialInterface) {
  return (
    <meshPhysicalMaterial
      attach={'material'}
      visible={visible}
      transparent={transparent}
      opacity={opacity}
      color={color}
      emissive={emissive}
      emissiveIntensity={emissiveIntensity}
      emissiveMap={emissiveMap}
      side={doubleSide ? THREE.DoubleSide : undefined}
      envMapIntensity={envMapIntensity}
      wireframe={wireframe}
      wireframeLinecap={wireframeLinecap}
      wireframeLinewidth={wireframeLinewidth}
    />
  )
}
