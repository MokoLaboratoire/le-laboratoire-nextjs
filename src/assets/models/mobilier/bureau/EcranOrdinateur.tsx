import React from 'react'
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'

import { default as gltfConstants } from '@/constants/gltfConstants.json'

export default function EcranOrdinateur() {
  // @ts-ignore
  const { nodes } = useGLTF(gltfConstants.ECRAN_ORDINATEUR)

  const material = new THREE.MeshStandardMaterial()
  material.envMapIntensity = 0

  return (
    <mesh
      geometry={nodes.EcranOrdinateur.geometry}
      material={material}
    />
  )
}

useGLTF.preload(gltfConstants.ECRAN_ORDINATEUR)
