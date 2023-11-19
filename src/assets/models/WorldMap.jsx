import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function WorldMap(props) {
  const { nodes, materials } = useGLTF('./gltf/world_map_draco.gltf')
  return (
    <group
      {...props}
      dispose={null}
    >
      <group
        position={[19.423, 14.456, -14.479]}
        rotation={[Math.PI, -0.958, Math.PI]}
        scale={1.3}
      >
        <mesh
          geometry={nodes.world_map_basement_marble_1.geometry}
          material={materials.world_map_marble}
          castShadow
          receiveShadow
        />
        <mesh
          geometry={nodes.world_map_basement_marble_2.geometry}
          material={materials.world_map_basement_metal}
          castShadow
          receiveShadow
        />
        <mesh
          geometry={nodes.world_map_basement_marble_3.geometry}
          material={materials.world_map_bar}
          castShadow
          receiveShadow
        />
        <mesh
          geometry={nodes.world_map_basement_marble_4.geometry}
          material={materials.world_map}
          castShadow
          receiveShadow
        />
      </group>
    </group>
  )
}

useGLTF.preload('./gltf/world_map_draco.gltf')
