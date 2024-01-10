import React from 'react'
import * as THREE from 'three'

import { CustomPlane } from '@/components/r3f/primitives'

export default function Plafond() {
  return (
    <CustomPlane
      name={'plafond'}
      width={52}
      depth={29.1}
      position={new THREE.Vector3(0, 0, 26)}
      castShadow
      receiveShadow
    />
  )
}
