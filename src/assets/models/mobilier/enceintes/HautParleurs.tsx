import React from 'react'
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'

import { default as gltfConstants } from '@/constants/gltfConstants.json'
import { default as meshesConstants } from '@/constants/meshesConstants.json'

function HautParleur({ position }: ModelInterface) {
  // @ts-ignore
  const { nodes } = useGLTF(gltfConstants.HAUT_PARLEUR)

  const material = new THREE.MeshStandardMaterial()
  material.envMapIntensity = 0

  return (
    <mesh
      geometry={nodes.HautParleur.geometry}
      position={new THREE.Vector3(position!.x, position!.z, position!.y)}
      material={material}
      receiveShadow
      castShadow
    />
  )
}

useGLTF.preload(gltfConstants.HAUT_PARLEUR)

export default function HautParleurs() {
  return (
    <>
      {meshesConstants.HAUT_PARLEURS.map((haut_parleur, index) => (
        <HautParleur
          key={`haut_parleur${index}`}
          position={
            new THREE.Vector3(
              haut_parleur.POSITION.X,
              haut_parleur.POSITION.Y,
              haut_parleur.POSITION.Z,
            )
          }
        />
      ))}
    </>
  )
}
