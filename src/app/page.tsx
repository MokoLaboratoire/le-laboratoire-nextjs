'use client'

import React, { Suspense, useRef, useState } from 'react'
import { Mesh } from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from "@react-three/drei";
import { Ground, PersianCarpet } from '@/assets/gltf';

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
    <div className="h-screen">
      <Canvas>
        <OrbitControls />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} />
        <Suspense>
          <Ground />
          <PersianCarpet />
        </Suspense>
      </Canvas>
    </div>
  )
}
