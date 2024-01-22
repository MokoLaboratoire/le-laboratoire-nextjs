import React, { useEffect } from 'react'
import * as THREE from 'three'

import useGltfLoader from '@/hooks/UseGltfLoader'
import useTextureLoader from '@/hooks/UseTextureLoader'

import { default as gltfConstants } from '@/constants/gltfConstants.json'
import { default as texturesConstants } from '@/constants/texturesConstants.json'
import { default as parquetConstants } from '@/constants/parquetConstants.json'

export function Parquet() {
  const gltf = useGltfLoader(gltfConstants.PARQUET)

  const colorMap = useTextureLoader(texturesConstants.PARQUET_DIFFUSE)
  colorMap.wrapS = THREE.RepeatWrapping
  colorMap.wrapT = THREE.RepeatWrapping
  colorMap.repeat.set(parquetConstants.REPEAT, parquetConstants.REPEAT)

  const bumpMap = useTextureLoader(texturesConstants.PARQUET_BUMP)
  bumpMap.wrapS = THREE.RepeatWrapping
  bumpMap.wrapT = THREE.RepeatWrapping
  bumpMap.repeat.set(parquetConstants.REPEAT, parquetConstants.REPEAT)

  const normalMap = useTextureLoader(texturesConstants.PARQUET_NORMAL)
  normalMap.wrapS = THREE.RepeatWrapping
  normalMap.wrapT = THREE.RepeatWrapping
  normalMap.repeat.set(parquetConstants.REPEAT, parquetConstants.REPEAT)

  const roughnessMap = useTextureLoader(texturesConstants.PARQUET_ROUGHNESS)
  roughnessMap.wrapS = THREE.RepeatWrapping
  roughnessMap.wrapT = THREE.RepeatWrapping
  roughnessMap.repeat.set(parquetConstants.REPEAT, parquetConstants.REPEAT)

  useEffect(() => {
    gltf.scene.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.receiveShadow = true
        object.material = new THREE.MeshStandardMaterial()
        object.material.map = colorMap
        object.material.bumpMap = bumpMap
        object.material.normalMap = normalMap
        object.material.roughnessMap = roughnessMap
        object.material.color = new THREE.Color(
          parseInt(
            parquetConstants.GREY_GRADIENT[
              Math.floor(
                Math.random() *
                  (parquetConstants.MAX_GREY_GRADIENT_RANGE -
                    parquetConstants.MIN_GREY_GRADIENT_RANGE) +
                  parquetConstants.MIN_GREY_GRADIENT_RANGE,
              )
            ],
          ),
        )
        object.material.envMapIntensity = 0
      }
    })
  }, [gltf])

  return <primitive object={gltf.scene} />
}
