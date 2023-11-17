import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function TrestleLeft(props) {
  const { nodes, materials } = useGLTF('./gltf/trestle_left_draco.gltf')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.trestle_left.geometry} material={materials.trestle_left} position={[10, 0, -11.8]} />
    </group>
  )
}

useGLTF.preload('./gltf/trestle_left_draco.gltf')
