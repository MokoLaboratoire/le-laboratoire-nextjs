import React, { useEffect } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useLoader } from '@react-three/fiber'
import { CustomMeshStandardMaterial } from '@/components/r3f/materials'

export function BatiPorteChambre() {
  const gltf = useLoader(
    GLTFLoader,
    '/gltf/appartement_haussmannien/porte_chambre/BatiPorteChambre.gltf',
  )

  useEffect(() => {
    gltf.scene.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.castShadow = true
        object.receiveShadow = true
        object.material = new THREE.MeshStandardMaterial
        object.material.envMapIntensity = 0
      }
    })
  }, [gltf])

  return (
    <primitive object={gltf.scene} material={<CustomMeshStandardMaterial />} />
  )
}
