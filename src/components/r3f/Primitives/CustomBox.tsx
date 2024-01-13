import React from 'react'
import * as THREE from 'three'
import { Box, RoundedBox } from '@react-three/drei'

import { CustomMeshStandardMaterial } from '@/components/r3f/materials'

import { BoxInterface } from '@/interfaces/components/r3f/GeometriesInterfaces'

export default function CustomBox({
  width = 1,
  depth = 1,
  height = 1,
  radius = 0,
  smoothness = 0,
  bevelSegments = 0,
  creaseAngle = 0,
  position = new THREE.Vector3(0, 0, 0),
  rotation = new THREE.Euler(Math.PI / 2, 0, 0),
  castShadow = false,
  receiveShadow = false,
  children,
}: BoxInterface) {
  const MeshType = !radius && !bevelSegments ? Box : RoundedBox
  return (
    <MeshType
      args={[width, depth, height]}
      radius={radius}
      smoothness={smoothness}
      bevelSegments={bevelSegments}
      creaseAngle={creaseAngle}
      position={[position.x, position.z, position.y]}
      rotation={rotation}
      castShadow={castShadow}
      receiveShadow={receiveShadow}
    >
      {children ? children : <CustomMeshStandardMaterial />}
    </MeshType>
  )
}
