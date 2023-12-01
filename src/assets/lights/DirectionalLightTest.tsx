import React from 'react'
import * as THREE from 'three'
import { useThree } from '@react-three/fiber'

import { DirectionalLight } from '@/components/r3f/lights'

export default function DirectionalLightTest() {
  const { scene } = useThree()

  const light1 = new THREE.SpotLight(0xffffff, 2, 200, 30)
  light1.position.set(-30, 30, 40)
  light1.castShadow = true
  light1.shadow.mapSize.x = 2048
  light1.shadow.mapSize.y = 2048
  light1.shadow.camera.near = 0.1
  scene.add(light1)

  return (
    <DirectionalLight
      color={'#FFD95C'}
      position={new THREE.Vector3(20, 10, 0)}
    />
  )
}
