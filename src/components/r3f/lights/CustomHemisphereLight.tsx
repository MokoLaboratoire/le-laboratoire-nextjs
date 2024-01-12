import React from 'react'
import * as THREE from 'three'

import { HemisphereLightInterface } from '@/interfaces/components/r3f/LightsInterfaces'

export default function CustomHemisphereLight({
  color = 'white',
  intensity = 1,
  groundColor = 'white',
  position = new THREE.Vector3(),
}: HemisphereLightInterface) {
  return (
    <hemisphereLight
      isHemisphereLight
      color={color}
      groundColor={groundColor}
      intensity={intensity}
      position={position}
    />
  )
}
