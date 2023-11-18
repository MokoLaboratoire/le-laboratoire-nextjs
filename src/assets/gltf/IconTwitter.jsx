import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function IconTwitter(props) {
  const { nodes, materials } = useGLTF('./gltf/icon_twitter_draco.gltf')
  return (
    <group
      {...props}
      dispose={null}
    >
      <mesh
        geometry={nodes.twitter.geometry}
        material={materials['Material.019']}
        position={[10.1, 12.8, -13.3]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.68}
        castShadow
        receiveShadow
      />
    </group>
  )
}

useGLTF.preload('./gltf/icon_twitter_draco.gltf')
