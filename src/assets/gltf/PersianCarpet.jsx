import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function PersianCarpet(props) {
  const { nodes, materials } = useGLTF('./gltf/persian_carpet_draco.gltf')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.persian_carpet.geometry} material={materials.PersianCarpet} position={[14.266, 0, -0.5]} rotation={[Math.PI, 0, Math.PI]} scale={1.2} />
    </group>
  )
}

useGLTF.preload('./gltf/persian_carpet_draco.gltf')
