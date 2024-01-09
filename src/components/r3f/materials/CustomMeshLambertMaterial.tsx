import React from 'react'
import * as THREE from 'three'

import { MeshLambertMaterialInterface } from '@/interfaces/components/r3f/MaterialsInterfaces'

export default function CustomMeshLambertMaterial({
	visible = true,
  transparent = false,
  opacity = 1,
  doubleSide = false,
  color = 'white',
	emissive = 'white',
  emissiveIntensity = 1,
  emissiveMap,
  wireframe = false,
  wireframeLinecap = 'round',
  wireframeLinejoin = 'round',
  wireframeLinewidth = 1,
}: MeshLambertMaterialInterface) {
  return (
    <meshLambertMaterial
			attach={'material'}
			visible={visible}
			transparent={transparent}
			opacity={opacity}
			color={color}
			emissive={emissive}
			emissiveIntensity={emissiveIntensity}
			emissiveMap={emissiveMap}
			side={doubleSide ? THREE.DoubleSide : undefined}
			wireframe={wireframe}
			wireframeLinecap={wireframeLinecap}
			wireframeLinejoin={wireframeLinejoin}
			wireframeLinewidth={wireframeLinewidth}
    />
  )
}
