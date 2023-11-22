import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Armchair(props) {
  const { nodes, materials } = useGLTF('./gltf/armchair_draco.gltf')
  return (
    <group
      {...props}
      dispose={null}
    >
      <mesh
        geometry={nodes.leather_armchair.geometry}
        material={materials.leather_armchair}
        position={[31.523, 0, -18]}
        rotation={[Math.PI, -Math.PI / 3, Math.PI]}
        castShadow
        receiveShadow
      />
    </group>
  )
}

useGLTF.preload('./gltf/armchair_draco.gltf')
