import React from 'react'
import * as THREE from 'three'

import { CustomDirectionalLight } from '@/components/r3f/lights'

export default function Lights() {
  return (
    <>
      <ambientLight intensity={0.1} />
      <CustomDirectionalLight
        position={new THREE.Vector3(0, 25, 0)}
        /* rotation={new THREE.Euler(0, 0, Math.PI / 4)} */
      />
    </>
  )
}
