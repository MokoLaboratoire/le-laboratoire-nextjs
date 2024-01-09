import React from 'react'
import * as THREE from 'three'

import { MeshDepthMaterialInterface } from '@/interfaces/components/r3f/MaterialsInterfaces'

export default function CustomMeshDepthMaterial({
	visible = true,
  transparent = false,
  opacity = 1,
  doubleSide = false,
  wireframe = false,
  wireframeLinewidth = 1,
}: MeshDepthMaterialInterface) {
  return (
    <meshDepthMaterial
			attach={'material'}
			visible={visible}
			transparent={transparent}
			opacity={opacity}
			wireframe={wireframe}
			wireframeLinewidth={wireframeLinewidth}
			side={doubleSide ? THREE.DoubleSide : undefined}
    />
  )
}
