import React from 'react'
import * as THREE from 'three'

import CustomRectAreaLight from '@/components/r3f/lights/CustomRectAreaLight'

export default function LampePlafondEmission() {
  return (
    <CustomRectAreaLight
      width={15.7}
      depth={9.5}
      position={new THREE.Vector3(0, 25.5164, 0)}
      intensity={10}
    />
  )
}
