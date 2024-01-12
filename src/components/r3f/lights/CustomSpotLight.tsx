import React from 'react'
import * as THREE from 'three'
import { SpotLight } from '@react-three/drei'

import { SpotLightInterface } from '@/interfaces/components/r3f/LightsInterfaces'

export default function CustomSpotLight({
  color = 0xffffff,
  intensity = 1,
  power = 1,
  angle = Math.PI / 3,
  distance = 1,
  decay = 2,
  penumbra = 0,
  position = new THREE.Vector3(0, 0, 0),
  target = new THREE.Object3D(),
  castShadow = true,
}: SpotLightInterface) {
  return (
    <SpotLight
      isSpotLight
      color={color}
      intensity={intensity}
      power={power}
      angle={angle}
      distance={distance}
      decay={decay}
      penumbra={penumbra}
      position={position}
      target={target}
      castShadow={castShadow}
    />
  )
}
