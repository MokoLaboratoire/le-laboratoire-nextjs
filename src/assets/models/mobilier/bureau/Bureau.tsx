import React from 'react'
import * as THREE from 'three'

import { Treteau } from './Treteau'

export default function Bureau() {
  return (
    <>
      <Treteau position={new THREE.Vector3(6, -10, 0.034)} />
      <Treteau position={new THREE.Vector3(-6, -10, 0.034)} />
    </>
  )
}
