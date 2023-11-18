import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function IconSpotify(props) {
  const { nodes, materials } = useGLTF('./gltf/icon_spotify_draco.gltf')
  return (
    <group
      {...props}
      dispose={null}
    >
      <group position={[1.153, 7.376, -15.772]}>
        <mesh
          geometry={nodes.spotify_green_1.geometry}
          material={materials.spotify_green}
          castShadow
          receiveShadow
        />
        <mesh
          geometry={nodes.spotify_green_2.geometry}
          material={materials.spotify_black}
          castShadow
          receiveShadow
        />
      </group>
    </group>
  )
}

useGLTF.preload('./gltf/icon_spotify_draco.gltf')
