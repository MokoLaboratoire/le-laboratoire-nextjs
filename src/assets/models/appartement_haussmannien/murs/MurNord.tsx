import React from 'react'
import * as THREE from 'three'

import { CustomPlane } from '@/components/r3f/primitives'

export default function MurNord() {
  return (
    <CustomPlane
      name={'mur_nord'}
      width={52}
      depth={26}
      position={new THREE.Vector3(0, -14.55, 13)}
      rotation={new THREE.Euler(0, 0, 0)}
      castShadow
      receiveShadow
    />
  )
}
