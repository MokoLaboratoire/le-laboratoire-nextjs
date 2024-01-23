import React from 'react'
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'

import { default as gltfConstants } from '@/constants/gltfConstants.json'

export default function NicotianaRusticaL() {
  // @ts-ignore
  const { nodes } = useGLTF(gltfConstants.NICOTIANA_RUSTICA_L)

  const material = new THREE.MeshStandardMaterial()
  material.envMapIntensity = 0

  return (
    <mesh
      geometry={nodes.NicotianaRusticaL.geometry}
      material={material}
      receiveShadow
      castShadow
    />
  )
}

useGLTF.preload(gltfConstants.NICOTIANA_RUSTICA_L)
