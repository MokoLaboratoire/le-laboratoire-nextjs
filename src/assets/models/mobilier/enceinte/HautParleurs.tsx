import React from 'react'
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'

import { default as gltfConstants } from '@/constants/gltfConstants.json'

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
  const hauts_parleurs = [
    {
      position: {
        x: 0,
        y: 0,
        z: 6.7766,
      },
    },
    {
      position: {
        x: 0,
        y: 0,
        z: 4.99904,
      },
    },
    {
      position: {
        x: 0,
        y: 0,
        z: 3.20951,
      },
    },
    {
      position: {
        x: 0,
        y: 0,
        z: 1.43195,
      },
    },
  ]
  
  return (
    <>
      {hauts_parleurs.map((haut_parleur, index) => (
        <HautParleur
          key={`haut_parleur${index}`}
          position={
            new THREE.Vector3(
              haut_parleur.position.x,
              haut_parleur.position.y,
              haut_parleur.position.z,
            )
          }
        />
      ))}
    </>
  )
}
