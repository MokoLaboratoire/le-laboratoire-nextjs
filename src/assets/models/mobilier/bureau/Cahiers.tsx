import React from 'react'
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'

import { default as gltfConstants } from '@/constants/gltfConstants.json'

import { degrees_to_radians } from 'helpers/threeHelpers'

function Cahier({ position, rotation }: ModelInterface) {
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

export default function Cahiers() {
  const cahiers = [
    {
      position: {
        x: 5.77157,
        y: -8.89845,
        z: 6.17,
      },
      rotation: {
        x: 0,
        y: 0,
        z: degrees_to_radians(40),
      },
    },
    {
      position: {
        x: 5.57157,
        y: -9.09845,
        z: 6.21,
      },
      rotation: {
        x: 0,
        y: 0,
        z: degrees_to_radians(55),
      },
    },
  ]

  return (
    <>
      {cahiers.map((cahier, index) => (
        <Cahier
          key={`cahier${index}`}
          position={
            new THREE.Vector3(
              cahier.position.x,
              cahier.position.y,
              cahier.position.z,
            )
          }
          rotation={
            new THREE.Euler(
              cahier.rotation.x,
              cahier.rotation.y,
              cahier.rotation.z,
            )
          }
        />
      ))}
    </>
  )
}
