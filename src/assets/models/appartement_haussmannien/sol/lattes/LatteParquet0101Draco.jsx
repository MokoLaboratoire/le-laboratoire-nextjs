import React from 'react'
import { useGLTF } from '@react-three/drei'

export function LatteParquet0101Draco(props) {
  const { nodes, materials } = useGLTF(
    '/gltf/appartement_haussmannien/sol/lattes/LatteParquet0101Draco.gltf',
  )
  return (
    <group
      {...props}
      dispose={null}
    >
      <mesh
        geometry={nodes.LatteParquet0101.geometry}
        material={materials['Material.008']}
        castShadow
        receiveShadow
      />
    </group>
  )
}

useGLTF.preload(
  '/gltf/appartement_haussmannien/sol/lattes/LatteParquet0101Draco.gltf',
)
