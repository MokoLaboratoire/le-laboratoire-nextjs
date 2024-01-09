import React, { useRef } from 'react'
import * as THREE from 'three'
import { useHelper } from '@react-three/drei'

import { DirectionalLightInterface } from '@/interfaces/components/r3f/LightsInterfaces'

const CustomDirectionalLight = ({
  color = 'white',
  intensity = 1,
  position = new THREE.Vector3(0, 0, 0),
  target = new THREE.Object3D(),
  castShadow = true,
}: DirectionalLightInterface) => {
  const directionalLightRef = useRef<THREE.DirectionalLight>(null)
  // @ts-ignore
  useHelper(directionalLightRef, THREE.DirectionalLightHelper, 'red')

  return (
    <directionalLight
      ref={directionalLightRef}
      isDirectionalLight
      color={color}
      intensity={intensity}
      position={position}
      target={target}
      castShadow={castShadow}
      shadow-bias={-0.0001}
    />
  )
}

export default CustomDirectionalLight
