import React from 'react'
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'

import useTextureLoader from '@/hooks/UseTextureLoader'

import { default as gltfConstants } from '@/constants/gltfConstants.json'
import { default as texturesConstants } from '@/constants/texturesConstants.json'

export default function Parois() {
  // @ts-ignore
  const { nodes } = useGLTF(gltfConstants.PAROIS)

  const material = new THREE.MeshStandardMaterial()
  const colorMap = useTextureLoader(texturesConstants.PAROIS_DIFFUSE)
  colorMap.flipY = true
  material.map = colorMap
  material.envMapIntensity = 0

  return (
    <mesh
      geometry={nodes.Parois.geometry}
      material={material}
      receiveShadow
      castShadow
    />
  )
}

useGLTF.preload(gltfConstants.PAROIS)
