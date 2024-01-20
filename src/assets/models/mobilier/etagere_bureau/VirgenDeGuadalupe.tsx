import React from 'react'
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'

import { default as gltfConstants } from '@/constants/gltfConstants.json'

export default function VirgenDeGuadalupe() {
  // @ts-ignore
  const { nodes } = useGLTF(gltfConstants.VIRGEN_DE_GUADALUPE)

  const material = new THREE.MeshStandardMaterial()
  material.envMapIntensity = 0

  return (
    <mesh
      geometry={nodes.VirgenDeGuadalupe.geometry}
      material={material}
      receiveShadow
      castShadow
    />
  )
}

useGLTF.preload(gltfConstants.VIRGEN_DE_GUADALUPE)