import React from 'react'
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'

import { default as gltfConstants } from '@/constants/gltfConstants.json'
export default function Cahier({
    position,
    rotation
}: ModelInterface) {
    // @ts-ignore
    const { nodes } = useGLTF(gltfConstants.CAHIER)
  
    const material = new THREE.MeshStandardMaterial()
    material.envMapIntensity = 0
  
    return (
      <mesh
        geometry={nodes.Cahier.geometry}
        position={new THREE.Vector3(position!.x, position!.z, position!.y)}
        rotation={new THREE.Euler(rotation!.x, rotation!.z, rotation!.y)}
        material={material}
        receiveShadow
        castShadow
      />
    )
  }
  
  useGLTF.preload(gltfConstants.CAHIER)