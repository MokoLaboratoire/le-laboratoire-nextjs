import React from 'react'
import * as THREE from 'three'

import { CustomBox } from '@/components/r3f/primitives'
import { CustomMeshPhysicalMaterial } from '@/components/r3f/materials'

const options = {
	color: 0xffffff,
	enableSwoopingCamera: false,
	enableRotation: false,
	metalness: 0,
	roughness: 0.2,
	transmission: 1,
	ior: 1.5,
	reflectivity: 0.5,
	thickness: 2.5,
	envMapIntensity: 1.5,
	clearcoat: 1,
	clearcoatRoughness: 0.1,
	normalScale: 0.3,
	clearcoatNormalScale: 0.2,
	normalRepeat: 3,
	bloomThreshold: 0.85,
	bloomStrength: 0.35,
	bloomRadius: 0.33,
}

export default function PlateauVerre() {
  return (
    <CustomBox
      name={'plateau_verre'}
			width={16}
			depth={8}
			height={0.1}
			position={new THREE.Vector3(0, -10, 6.07)}
    >
			<CustomMeshPhysicalMaterial
				color={new THREE.Color(options.color)}
				metalness={options.metalness}
				roughness={options.roughness}
				transmission={options.transmission}
				ior={options.ior}
				reflectivity={options.reflectivity}
				thickness={options.thickness}
				/* envMap={hdrEquirect} */
				envMapIntensity={options.envMapIntensity}
				clearcoat={options.clearcoat}
				clearcoatRoughness={options.clearcoatRoughness}
				normalScale={new THREE.Vector2(options.normalScale)}
				/* normalMap={normalMapTexture} */
				/* clearcoatNormalMap={normalMapTexture} */
				clearcoatNormalScale={new THREE.Vector2(options.clearcoatNormalScale)}
			/>
		</CustomBox>
  )
}

// Version 1
// https://tympanus.net/codrops/2021/10/27/creating-the-effect-of-transparent-glass-and-plastic-in-three-js/