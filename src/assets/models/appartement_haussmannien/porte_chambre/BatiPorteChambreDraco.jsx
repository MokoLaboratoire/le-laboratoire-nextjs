import React from 'react'
import { useGLTF } from '@react-three/drei'

export function BatiPorteChambreDraco(props) {
  const { nodes, materials } = useGLTF(
    '/gltf/appartement_haussmannien/porte_chambre/BatiPorteChambreDraco.gltf',
  )
  return (
    <mesh
      geometry={nodes.BatiPorteChambre.geometry}
      material={materials['default']}
      castShadow
      receiveShadow
    >
      <meshStandardMaterial
        attach={'material'}
        color={'white'}
      />
    </mesh>
  )
}

useGLTF.preload(
  '/gltf/appartement_haussmannien/porte_chambre/BatiPorteChambreDraco.gltf',
)
