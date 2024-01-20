import React from 'react'
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'

import { default as gltfConstants } from '@/constants/gltfConstants.json'
import { default as meshesConstants } from '@/constants/meshesConstants.json'

import { degrees_to_radians } from 'helpers/threeHelpers'

function Vinyl({ position, rotation }: ModelInterface) {
  // @ts-ignore
  const { nodes } = useGLTF(gltfConstants.VINYL)

  const material = new THREE.MeshStandardMaterial()
  material.envMapIntensity = 0

  return (
    <mesh
      geometry={nodes.Vinyl.geometry}
      position={new THREE.Vector3(position!.x, position!.z, position!.y)}
      rotation={new THREE.Euler(rotation!.x, rotation!.z, rotation!.y)}
      material={material}
      receiveShadow
      castShadow
    />
  )
}

useGLTF.preload(gltfConstants.VINYL)

export default function Vinyls() {
  return (
    <>
      {meshesConstants.VINYLS.map((vinyl, index) => (
        <Vinyl
          key={`vinyl${index}`}
          position={
            new THREE.Vector3(
              vinyl.POSITION.X,
              vinyl.POSITION.Y,
              vinyl.POSITION.Z,
            )
          }
          rotation={
            new THREE.Euler(
              degrees_to_radians(vinyl.ROTATION.X),
              vinyl.ROTATION.Y,
              vinyl.ROTATION.Z,
            )
          }
        />
      ))}
    </>
  )
}

