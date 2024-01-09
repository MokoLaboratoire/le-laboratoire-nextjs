import React, { useEffect } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { useLoader } from '@react-three/fiber'

export function LampePlafondCadre() {
  const gltf = useLoader(
    GLTFLoader,
    '/gltf/lampes/LampePlafondCadre.gltf',
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