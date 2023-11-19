import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Axe(props) {
  const { nodes, materials } = useGLTF('./glb/axe.glb')
  return (
    <group
      {...props}
      dispose={null}
    >
      <group />
    </group>
  )
}

useGLTF.preload('./glb/axe.glb')
