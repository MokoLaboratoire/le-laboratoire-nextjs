import React from 'react'
import * as THREE from 'three'

import { CustomBox } from '@/components/r3f/primitives'
import { MeshPhysicalMaterial } from '@/components/r3f/materials'

export default function PlateauVerre() {
  return (
    <CustomBox
      name={'plateau_verre'}
      width={16}
      depth={8}
      height={0.1}
      position={new THREE.Vector3(0, -10, 6.07)}
    >
      <MeshPhysicalMaterial
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
