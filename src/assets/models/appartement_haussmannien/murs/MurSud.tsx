import React from 'react'
import * as THREE from 'three'

import { CustomPlane } from '@/components/r3f/primitives'
import { CustomMeshStandardMaterial } from '@/components/r3f/materials'

export default function MurSud() {
  return (
    <CustomPlane
      name={'mur_sud'}
      width={52}
      depth={26}
      position={new THREE.Vector3(0, 14.55, 13)}
      rotation={new THREE.Euler(0, Math.PI, 0)}
      castShadow
      receiveShadow
    />
  )
}
