import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Couronnes(props) {
  const { nodes, materials } = useGLTF('./gltf/couronnes_draco.gltf')
  return (
    <group
      {...props}
      dispose={null}
    >
      <group
        position={[15.5, 17, -16.12]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <mesh
          geometry={nodes.Cube006.geometry}
          material={materials['Material.017']}
          castShadow
          receiveShadow
        />
        <mesh
          geometry={nodes.Cube006_1.geometry}
          material={materials['Material.018']}
          castShadow
          receiveShadow
        />
        <mesh
          geometry={nodes.Cube006_2.geometry}
          material={materials['Material.018']}
          castShadow
          receiveShadow
        />
      </group>
    </group>
  )
}

useGLTF.preload('./gltf/couronnes_draco.gltf')
