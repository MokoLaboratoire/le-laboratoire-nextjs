import React from 'react'
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'

import { default as gltfConstants } from '@/constants/gltfConstants.json'

export function BatiPorteChambre() {
  // @ts-ignore
  const { nodes } = useGLTF(gltfConstants.BATI_PORTE_CHAMBRE)

  const material = new THREE.MeshStandardMaterial()
  material.envMapIntensity = 0

  return (
    <mesh
      geometry={nodes.BatiPorteChambre.geometry}
      material={material}
    />
  )
}

useGLTF.preload(gltfConstants.BATI_PORTE_CHAMBRE)
