import React from 'react'
import * as THREE from 'three'

import { MeshNormalMaterialInterface } from '@/interfaces/components/r3f/MaterialsInterfaces'

export default function CustomMeshNormalMaterial({
  visible = true,
  transparent = false,
  opacity = 1,
  doubleSide = false,
  wireframe = false,
  wireframeLinewidth = 1,
}: MeshNormalMaterialInterface) {
  return (
    <meshNormalMaterial
      attach={'material'}
      visible={visible}
      transparent={transparent}
      opacity={opacity}
      side={doubleSide ? THREE.DoubleSide : undefined}
      wireframe={wireframe}
      wireframeLinewidth={wireframeLinewidth}
    />
  )
}
