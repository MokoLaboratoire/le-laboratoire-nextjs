/* import React, { useEffect } from 'react'
import * as THREE from 'three'

import useGltfLoader from '@/hooks/UseGltfLoader'
import useTextureLoader from '@/hooks/UseTextureLoader'

import { default as gltfConstants } from '@/constants/gltfConstants.json'
import { default as texturesConstants } from '@/constants/texturesConstants.json'

export function Treteau({
  position
}: TreteauInterface) {

  const gltf = useGltfLoader(gltfConstants.TRETEAU)

  const colorMap = useTextureLoader(texturesConstants.TRETEAU_DIFFUSE)

  useEffect(() => {
    gltf.scene.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.castShadow = true
        object.receiveShadow = true
        object.material.map = colorMap
        object.material.envMapIntensity = 0
      }
    })
  }, [gltf])

  return (
    <primitive object={gltf.scene} position={[position.x, position.z, position.y]} />
  )
} */

import React from 'react'
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'

import useTextureLoader from '@/hooks/UseTextureLoader'

import { default as gltfConstants } from '@/constants/gltfConstants.json'
import { default as texturesConstants } from '@/constants/texturesConstants.json'

export function Treteau({ position }: TreteauInterface) {
  
	// @ts-ignore
  const { nodes, materials } = useGLTF(gltfConstants.TRETEAU)

	const material = new THREE.MeshStandardMaterial
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

useGLTF.preload('/Treteau.gltf')
