import React from 'react'
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'

import { default as gltfConstants } from '@/constants/gltfConstants.json'

export default function Papillon() {
  // @ts-ignore
  const { nodes } = useGLTF(gltfConstants.PAPILLON)

  const material = new THREE.MeshStandardMaterial()
  material.envMapIntensity = 0

  return (
    <mesh
      geometry={nodes.Papillon.geometry}
      receiveShadow
      castShadow
    />
  )
}

useGLTF.preload(gltfConstants.PAPILLON)