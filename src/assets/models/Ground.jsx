import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Ground(props) {
  const { nodes, materials } = useGLTF('./gltf/Ground.gltf')
  return (
    <group
      {...props}
      dispose={null}
    >
      <mesh
        geometry={nodes.Floor.geometry}
        material={materials.Material}
        scale={[6.4, 3.2, 3.2]}
        castShadow
        receiveShadow
      />
    </group>
  )
}

useGLTF.preload('./gltf/Ground.gltf')
