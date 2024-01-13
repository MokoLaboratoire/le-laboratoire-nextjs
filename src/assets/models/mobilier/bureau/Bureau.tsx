import React from 'react'
import * as THREE from 'three'

import PlateauVerre from './PlateauVerre'
import { Treteau } from './Treteau'

export default function Bureau() {
  return (
    <>
      <PlateauVerre />
      <Treteau position={new THREE.Vector3(6, -10, 0.034)} />
      <Treteau position={new THREE.Vector3(-6, -10, 0.034)} />
    </>
  )
}
