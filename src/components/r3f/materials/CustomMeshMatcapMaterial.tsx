import React from 'react'
import * as THREE from 'three'

import { MeshMatcapMaterialInterface } from '@/interfaces/components/r3f/MaterialsInterfaces'

export default function CustomMeshMatcapMaterial({
	visible = true,
	transparent = false,
  opacity = 1,
  doubleSide = false,
  color = 'white',
	matcap
}: MeshMatcapMaterialInterface) {
  return (
    <meshMatcapMaterial
			attach={'material'}
			visible={visible}
			transparent={transparent}
			opacity={opacity}
			side={doubleSide ? THREE.DoubleSide : undefined}
			color={color}
			matcap={matcap}
    />
  )
}
