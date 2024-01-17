import React from 'react'
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'

import useTextureLoader from '@/hooks/UseTextureLoader'

import { default as gltfConstants } from '@/constants/gltfConstants.json'
import { default as texturesConstants } from '@/constants/texturesConstants.json'

export function Treteau({ position }: ModelInterface) {
  // @ts-ignore
  const { nodes } = useGLTF(gltfConstants.TRETEAU)

  const material = new THREE.MeshStandardMaterial()
  const colorMap = useTextureLoader(texturesConstants.TRETEAU_DIFFUSE)
  material.map = colorMap
  material.envMapIntensity = 0

  return (
    <mesh
      geometry={nodes.Traiteau.geometry}
      position={new THREE.Vector3(position.x, position.z, position.y)}
      material={material}
      receiveShadow
      castShadow
    />
  )
}

useGLTF.preload(gltfConstants.TRETEAU)
