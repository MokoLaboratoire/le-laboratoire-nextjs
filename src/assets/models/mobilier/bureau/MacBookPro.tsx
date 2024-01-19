import React from 'react'
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'

import { default as gltfConstants } from '@/constants/gltfConstants.json'

export default function MacBookPro() {
  // @ts-ignore
  const { nodes } = useGLTF(gltfConstants.MAC_BOOK_PRO)

  const material = new THREE.MeshStandardMaterial()
  material.envMapIntensity = 0

  return (
    <mesh
      geometry={nodes.MacBookPro.geometry}
      material={material}
    />
  )
}

useGLTF.preload(gltfConstants.MAC_BOOK_PRO)
