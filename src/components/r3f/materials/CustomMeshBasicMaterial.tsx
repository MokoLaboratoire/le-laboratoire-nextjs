import React from 'react'
import * as THREE from 'three'

import { MeshBasicMaterialInterface } from '@/interfaces/components/r3f/MaterialsInterfaces'

export default function CustomMeshBasicMaterial({
  visible = true,
  transparent = false,
  opacity = 1,
  doubleSide = false,
  color = 'white',
  wireframe = false,
  wireframeLinecap = 'round',
  wireframeLinewidth = 1,
}: MeshBasicMaterialInterface) {
  return (
    <meshBasicMaterial
      attach={'material'}
      visible={visible}
      transparent={transparent}
      opacity={opacity}
      side={doubleSide ? THREE.DoubleSide : undefined}
      color={color}
      wireframe={wireframe}
      wireframeLinecap={wireframeLinecap}
      wireframeLinewidth={wireframeLinewidth}
    />
  )
}
