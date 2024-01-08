/* import React from 'react'
import { useGLTF } from '@react-three/drei'

export function BattantPorteChambreDraco(props) {
  const { nodes } = useGLTF(
    '/gltf/appartement_haussmannien/porte_chambre/BattantPorteChambreDraco.gltf',
  )
  return (
    <mesh
      geometry={nodes.BattantPorteChambre.geometry}
      castShadow
      receiveShadow
    >
      <meshStandardMaterial
        attach={'material'}
        color={'white'}
      />
    </mesh>
  )
}

useGLTF.preload(
  '/gltf/appartement_haussmannien/porte_chambre/BattantPorteChambreDraco.gltf',
) */

import React, { useEffect } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useLoader } from '@react-three/fiber'

export function BattantPorteChambreDraco() {
  const gltf = useLoader(
    GLTFLoader,
    '/gltf/appartement_haussmannien/porte_chambre/BattantPorteChambre.gltf',
  )

  useEffect(() => {
    gltf.scene.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.castShadow = true
        object.receiveShadow = true
        object.material.envMapIntensity = 0
      }
    })
  }, [gltf])

  return <primitive object={gltf.scene} />
}
