'use client'

import React, { Suspense, useRef, useState } from 'react'
import { Mesh } from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from "@react-three/drei";
import { Ground, PersianCarpet, RoseRouge, TrestleLeft } from '@/assets/gltf';

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
      onPointerOut={(event) => setHover(false)}
      castShadow
      receiveShadow
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

export default function Home() {
  return (
    <div className="h-screen">
      <Canvas shadows>
        <OrbitControls />
        <ambientLight castShadow />
        <directionalLight
          position={[10, 10, 0]}
          castShadow
          shadow-mapSize={[4096, 4096]}
          shadow-camera-far={100}
          shadow-camera-left={-100}
          shadow-camera-right={100}
          shadow-camera-top={100}
          shadow-camera-bottom={-100}
          shadow-bias={-0.000001}
        />
        <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} />
        
        <Suspense>
          <Ground />
          <PersianCarpet />
          <RoseRouge />
          <TrestleLeft />
        </Suspense>
      </Canvas>
    </div>
  )
}
