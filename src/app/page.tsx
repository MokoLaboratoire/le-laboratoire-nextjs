'use client'

import React, { useRef, useState } from 'react'
import { Mesh } from 'three'
import { Canvas, useFrame } from '@react-three/fiber'

function Box(props: any) {

  const meshRef = useRef<Mesh>(null!)

  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  
  useFrame((state, delta) => (meshRef.current.rotation.x += delta))

  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

export default function Home() {
  return (
    <div className="App w-full h-full">
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} />
      </Canvas>
    </div>
  )
}
