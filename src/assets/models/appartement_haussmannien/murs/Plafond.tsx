import React from 'react'
import * as THREE from 'three'

import { CustomPlane } from '@/components/r3f/primitives'

export default function Plafond() {
  return (
    <CustomPlane
      width={52}
      depth={29.1}
      position={new THREE.Vector3(0, 26, 0)}
      rotation={new THREE.Euler(Math.PI / 2, 0, 0)}
      castShadow
      receiveShadow
    />
  )
}
