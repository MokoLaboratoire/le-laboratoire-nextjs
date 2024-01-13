import React, { useEffect } from 'react'
import * as THREE from 'three'

import useGltfLoader from '@/hooks/UseGltfLoader'

export function PlintheNord() {
  const gltf = useGltfLoader(
    '/gltf/appartement_haussmannien/plinthes/PlintheNord.gltf',
  )

  useEffect(() => {
    gltf.scene.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.castShadow = true
        object.receiveShadow = true
        object.material = new THREE.MeshStandardMaterial()
        object.material.envMapIntensity = 0
      }
    })
  }, [gltf])

  return <primitive object={gltf.scene} />
}
