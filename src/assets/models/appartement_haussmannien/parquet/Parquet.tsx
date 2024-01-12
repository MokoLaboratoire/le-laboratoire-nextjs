import React, { useEffect } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { useLoader } from '@react-three/fiber'

import useTextureLoader from '@/hooks/UseTextureLoader'

import { default as gltfConstants } from '@/constants/gltfConstants.json'
import { default as texturesConstants } from '@/constants/texturesConstants.json'

const repeat = 1.2
const greyGradient = [
  0x111111, 0x121212, 0x222222, 0x232323, 0x333333, 0x343434, 0x444444,
  0x454545, 0x555555, 0x565656, 0x666666, 0x676767, 0x777777, 0x787878,
  0x888888, 0x898989, 0x999999, 0x9a9a9a, 0xaaaaaa, 0xababab, 0xbbbbbb,
  0xbcbcbc, 0xcccccc, 0xcdcdcd, 0xdddddd, 0xdedede, 0xeeeeee, 0xefefef,
  0xffffff,
]
const maxGreyGradientRange = 15
const minGreyGradientRange = 8

export function Parquet() {
  const gltf = useLoader(GLTFLoader, gltfConstants.PARQUET)

  const colorMap = useTextureLoader(texturesConstants.PARQUET_DIFFUSE)
  colorMap.wrapS = THREE.RepeatWrapping
  colorMap.wrapT = THREE.RepeatWrapping
  colorMap.repeat.set(repeat, repeat)

  const bumpMap = useTextureLoader(texturesConstants.PARQUET_BUMP)
  bumpMap.wrapS = THREE.RepeatWrapping
  bumpMap.wrapT = THREE.RepeatWrapping
  bumpMap.repeat.set(repeat, repeat)

  const normalMap = useTextureLoader(texturesConstants.PARQUET_NORMAL)
  normalMap.wrapS = THREE.RepeatWrapping
  normalMap.wrapT = THREE.RepeatWrapping
  normalMap.repeat.set(repeat, repeat)

  const roughnessMap = useTextureLoader(texturesConstants.PARQUET_ROUGHNESS)
  roughnessMap.wrapS = THREE.RepeatWrapping
  roughnessMap.wrapT = THREE.RepeatWrapping
  roughnessMap.repeat.set(repeat, repeat)

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
          greyGradient[
            Math.floor(
              Math.random() * (maxGreyGradientRange - minGreyGradientRange) +
                minGreyGradientRange,
            )
          ],
        )
        object.material.envMapIntensity = 0
      }
    })
  }, [gltf])

  return <primitive object={gltf.scene} />
}
