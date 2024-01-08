import React from 'react'
import * as THREE from 'three'

import { MeshStandardMaterialInterface } from '@/interfaces/components/r3f/MaterialsInterfaces'

export default function CustomMeshStandardMaterial({
	visible = true,
  color = 'white',
  transparent = false,
  opacity = 1,
	emissive = 'white',
  doubleSide = false,
  envMapIntensity = 0,
}: MeshStandardMaterialInterface) {
  return (
    <meshStandardMaterial
      attach={'material'}
			visible={visible}
      color={color}
      transparent={transparent}
      opacity={opacity}
      emissive={emissive}
      side={doubleSide ? THREE.DoubleSide : undefined}
      envMapIntensity={envMapIntensity}
    />
  )
}
