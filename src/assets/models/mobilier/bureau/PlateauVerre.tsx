import React from 'react'
import * as THREE from 'three'
import { useControls } from 'leva'

import { CustomBox } from '@/components/r3f/primitives'
import { CustomMeshPhysicalMaterial } from '@/components/r3f/materials'

const options = {
  thickness: 0.2,
  roughness: 0,
  clearcoat: 0,
  clearcoatRoughness: 0,
  transmission: 1,
  ior: 1.52,
  envMapIntensity: 0,
  color: 0xffffff,
  attenuationColor: 0xffe79e,
  attenuationDistance: 0,

  /* transparent: true,
	opacity: 1,
  metalness: 0,
  specularIntensity: 1,
  specularColor: 0xffffff,
  lightIntensity: 1,
  exposure: 1, */
}

export default function PlateauVerre() {
  const materialProps = useControls({
    thickness: { value: 5, min: 0, max: 20 },
    roughness: { value: 0, min: 0, max: 1, step: 0.1 },
    clearcoat: { value: 1, min: 0, max: 1, step: 0.1 },
    clearcoatRoughness: { value: 0, min: 0, max: 1, step: 0.1 },
    transmission: { value: 1, min: 0.9, max: 1, step: 0.01 },
    ior: { value: 1.25, min: 1, max: 2.3, step: 0.05 },
    envMapIntensity: { value: 25, min: 0, max: 100, step: 1 },
    color: '#ffffff',
    attenuationTint: '#ffe79e',
    attenuationDistance: { value: 0, min: 0, max: 1 },
  })

  return (
    <CustomBox
      name={'plateau_verre'}
      width={16}
      depth={8}
      height={0.1}
      position={new THREE.Vector3(0, -10, 6.07)}
    >
      <CustomMeshPhysicalMaterial
        {...materialProps}
        /* thickness={options.thickness}
				roughness={options.roughness}
				clearcoat={options.clearcoat}
				clearcoatRoughness={options.clearcoatRoughness}
				transmission={options.transmission}
				ior={options.ior}
				envMapIntensity={options.envMapIntensity}
				color={new THREE.Color(options.color)}
				attenuationColor={new THREE.Color(options.attenuationColor)}
				attenuationDistance={options.attenuationDistance} */
        /* transparent={options.transparent} */
        /* opacity={options.opacity} */
        /* metalness={options.metalness} */
        /* reflectivity={options.reflectivity} */
        /* specularColor={new THREE.Color(options.specularColor)} */
        /* specularIntensity={options.specularIntensity} */
        /* envMap={hdrEquirect} */
        /* clearcoatRoughness={options.clearcoatRoughness} */
        /* normalScale={new THREE.Vector2(options.normalScale)} */
        /* normalMap={normalMapTexture} */
        /* clearcoatNormalMap={normalMapTexture} */
        /* clearcoatNormalScale={new THREE.Vector2(options.clearcoatNormalScale)} */
      />
    </CustomBox>
  )
}

// Version 1
// https://tympanus.net/codrops/2021/10/27/creating-the-effect-of-transparent-glass-and-plastic-in-three-js/
