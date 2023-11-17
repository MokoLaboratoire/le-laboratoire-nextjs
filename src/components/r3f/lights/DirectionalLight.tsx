import React from 'react'
import * as THREE from 'three'
import { DirectionalLightingInterface } from '@/interfaces/components/r3f/DirectionalLightInterface'

const DirectionalLight = ({
  color,
  intensity = 1,
  position = new THREE.Vector3(0, 0, 0),
  castShadow = true,
  target = new THREE.Object3D()
}: DirectionalLightingInterface) => {
  return (
    <directionalLight
      color={color}
      intensity={intensity}
      position={position}
      castShadow={castShadow}
      isDirectionalLight
      target={target}
      shadow-mapSize={[4096, 4096]}
      shadow-camera-far={100}
      shadow-camera-left={-100}
      shadow-camera-right={100}
      shadow-camera-top={100}
      shadow-camera-bottom={-100}
      shadow-bias={-0.000001}
    />
  )
}

export default DirectionalLight