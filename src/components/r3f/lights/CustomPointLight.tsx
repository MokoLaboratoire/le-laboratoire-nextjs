import React from 'react'
import * as THREE from 'three'

import { PointLightInterface } from '@/interfaces/components/r3f/LightsInterfaces'

export default function CustomPointLight({
  color = 'white',
  intensity = 1,
  power = 1,
  distance = 1,
  decay = 1,
  position = new THREE.Vector3(0, 0, 0),
  castShadow = true,
}: PointLightInterface) {
  return (
    <pointLight
      color={color}
      intensity={intensity}
      power={power}
      distance={distance}
      decay={decay}
      position={position}
      castShadow={castShadow}
    />
  )
}
