import React from 'react'
import * as THREE from 'three'
import { Plane } from '@react-three/drei'

import { PlaneInterface } from '@/interfaces/components/r3f/GeometriesInterfaces'

export default function CustomPlane({
  width = 1,
  depth = 1,
  position = new THREE.Vector3(0, 0, 0),
  rotation = new THREE.Euler(-Math.PI / 2, 0, 0),
  castShadow = false,
  receiveShadow = false,
  children,
}: PlaneInterface) {
  return (
    <Plane
      args={[width, depth]}
      position={[position.x, position.z, position.y]}
      rotation={rotation}
      castShadow={castShadow}
      receiveShadow={receiveShadow}
    >
      {children}
    </Plane>
  )
}