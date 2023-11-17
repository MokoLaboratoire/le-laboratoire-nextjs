import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function RoseRouge(props) {
  const { nodes, materials } = useGLTF('./gltf/rose_rouge_draco.gltf')
  return (
    <group {...props} dispose={null}>
      <group position={[4.5, 3, -15.407]} rotation={[-0.161, 0, 0]}>
        <mesh
          geometry={nodes.rose_rouge_frame_1.geometry}
          material={materials.black_frame}
          castShadow
          receiveShadow
        />
        <mesh
          geometry={nodes.rose_rouge_frame_2.geometry}
          material={materials['Material.020']}
          castShadow
          receiveShadow
        />
      </group>
    </group>
  )
}

useGLTF.preload('./gltf/rose_rouge_draco.gltf')
