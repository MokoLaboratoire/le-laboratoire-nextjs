import React from 'react'
import * as THREE from 'three'

import { CustomPlane } from '@/components/r3f/primitives'

export default function MurOuest() {
  return (
    <>
      <CustomPlane
        width={17.7}
        depth={26}
        position={new THREE.Vector3(-26, 13, 5.7)}
        rotation={new THREE.Euler(0, Math.PI / 2, 0)}
        doubleSide
        castShadow
        receiveShadow
      />
      <CustomPlane
        width={10.6}
        depth={1.26}
        position={new THREE.Vector3(-26, 25.37, -8.5)}
        rotation={new THREE.Euler(0, Math.PI / 2, 0)}
        doubleSide
        castShadow
        receiveShadow
      />
    </>
  )
}
