import React from 'react'
import { useGLTF } from '@react-three/drei'

export function LatteParquet0102Draco(props) {
  const { nodes, materials } = useGLTF(
    '/gltf/appartement_haussmannien/sol/lattes/LatteParquet0102Draco.gltf',
  )
  return (
    <group
      {...props}
      dispose={null}
    >
      <mesh
        geometry={nodes.LatteParquet0102.geometry}
        material={materials['Material.008']}
        castShadow
        receiveShadow
      />
    </group>
  )
}

useGLTF.preload(
  '/gltf/appartement_haussmannien/sol/lattes/LatteParquet0102Draco.gltf',
)
