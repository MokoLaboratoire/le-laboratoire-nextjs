import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function AmorLlamaAmor(props) {
  const { nodes, materials } = useGLTF('./gltf/amor_llama_amor_draco.gltf')
  return (
    <group
      {...props}
      dispose={null}
    >
      <group position={[4.025, 15.7, -15.918]}>
        <mesh
          geometry={nodes.amor_amor_frame_1.geometry}
          material={materials.black_frame}
          castShadow
          receiveShadow
        />
        <mesh
          geometry={nodes.amor_amor_frame_2.geometry}
          material={materials['Material.010']}
          castShadow
          receiveShadow
        />
      </group>
    </group>
  )
}

useGLTF.preload('./gltf/amor_llama_amor_draco.gltf')
