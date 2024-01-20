import React from 'react'
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'

import { default as gltfConstants } from '@/constants/gltfConstants.json'

export default function ChaiseDeBureau() {
  // @ts-ignore
  const { nodes } = useGLTF(gltfConstants.CHAISE_DE_BUREAU)

  const material = new THREE.MeshStandardMaterial()
  material.envMapIntensity = 0

  return (
    <mesh
      geometry={nodes.ChaiseDeBureau.geometry}
      material={material}
      receiveShadow
      castShadow
    />
  )
}

useGLTF.preload(gltfConstants.CHAISE_DE_BUREAU)