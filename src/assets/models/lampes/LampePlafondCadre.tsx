import React from 'react'
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'

import { default as gltfConstants } from '@/constants/gltfConstants.json'

export function LampePlafondCadre() {
  // @ts-ignore
  const { nodes } = useGLTF(gltfConstants.LAMPE_PLAFOND_CADRE)

  const material = new THREE.MeshStandardMaterial()
  material.envMapIntensity = 0

  return (
    <mesh
      geometry={nodes.LampePlafondCadre.geometry}
      material={material}
    />
  )
}

useGLTF.preload(gltfConstants.LAMPE_PLAFOND_CADRE)
