import React, { useRef } from 'react'
import * as THREE from 'three'
import { useHelper } from '@react-three/drei'

import { RectAreaLightInterface } from '@/interfaces/components/r3f/LightsInterfaces'

export default function CustomRectAreaLight({
    width = 1,
    depth = 1,
    color = 'white',
    intensity = 1,
    position = new THREE.Vector3(0, 0, 0),
		rotation = new THREE.Euler(-Math.PI / 2, 0, 0),
}: RectAreaLightInterface) {
  const rectAreaLightRef = useRef<THREE.RectAreaLight>(null)
  // @ts-ignore
  useHelper(rectAreaLightRef, THREE.RectAreaLightHelper, 'red')
  return (
    <rectAreaLight
			ref={rectAreaLightRef}
      isRectAreaLight
      width={width}
      height={depth}
      position={position}
      rotation={rotation}
      color={color}
      intensity={intensity}
    />
  )
}
