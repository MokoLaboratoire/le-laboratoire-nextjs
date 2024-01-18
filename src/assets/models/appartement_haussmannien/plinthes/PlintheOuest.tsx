import React from 'react'
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'

import { default as gltfConstants } from '@/constants/gltfConstants.json'

export function PlintheOuest() {
  // @ts-ignore
  const { nodes } = useGLTF(gltfConstants.PLINTHE_OUEST)

  const material = new THREE.MeshStandardMaterial()
  material.envMapIntensity = 0

  return (
    <mesh
      geometry={nodes.PlintheOuest.geometry}
      material={material}
    />
  )
}

useGLTF.preload(gltfConstants.PLINTHE_OUEST)
