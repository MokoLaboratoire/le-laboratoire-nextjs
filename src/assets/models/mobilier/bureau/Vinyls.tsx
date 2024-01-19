import React from 'react'
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'

import { default as gltfConstants } from '@/constants/gltfConstants.json'

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
  const vinyls = [
    {
      position: {
        x: 6,
        y: -8.4,
        z: 1.1,
      },
      rotation: {
        x: 0,
        y: 0,
        z: 0,
      },
    },
    {
      position: {
        x: 5.91634,
        y: -11.2728,
        z: 1.1,
      },
      rotation: {
        x: degrees_to_radians(-6.31364),
        y: 0,
        z: 0,
      },
    },
    {
      position: {
        x: 5.80836,
        y: -11.3328,
        z: 1.1,
      },
      rotation: {
        x: degrees_to_radians(-6.31364),
        y: 0,
        z: 0,
      },
    },
    {
      position: {
        x: 6,
        y: -11.4,
        z: 1.1,
      },
      rotation: {
        x: degrees_to_radians(-5.87368),
        y: 0,
        z: 0,
      },
    },
  ]

  return (
    <>
      {vinyls.map((vinyl, index) => (
        <Vinyl
          key={`vinyl${index}`}
          position={
            new THREE.Vector3(
              vinyl.position.x,
              vinyl.position.y,
              vinyl.position.z,
            )
          }
          rotation={
            new THREE.Euler(
              vinyl.rotation.x,
              vinyl.rotation.y,
              vinyl.rotation.z,
            )
          }
        />
      ))}
    </>
  )
}

