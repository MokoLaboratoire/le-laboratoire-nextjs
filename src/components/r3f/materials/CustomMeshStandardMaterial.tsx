import React from 'react'
import * as THREE from 'three'

import { MeshStandardMaterialInterface } from '@/interfaces/components/r3f/MaterialsInterfaces'

export default function CustomMeshStandardMaterial({
	visible = true,
  transparent = false,
  opacity,
  doubleSide = true,
  color = 'white',
	emissive,
  emissiveIntensity,
  emissiveMap,
  envMapIntensity = 0,
  wireframe = false,
  wireframeLinecap = 'round',
  wireframeLinewidth = 1,
}: MeshStandardMaterialInterface) {
  return (
    <meshStandardMaterial
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
