'use client'

import React, { Suspense, useRef, useState } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import {
  AmorLlamaAmor,
  Armchair,
  Couronnes,
  Ground,
  IconSpotify,
  IconTwitter,
  PersianCarpet,
  RoseRouge,
  TrestleLeft,
  WorldMap,
} from '@/assets/gltf'
import { DirectionalLight } from '@/components/r3f/lights'

function Box(props: any) {
  const meshRef = useRef<THREE.Mesh>(null!)

  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  useFrame((state, delta) => (meshRef.current.rotation.x += delta))

  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? 1.5 : 1}
      onClick={() => setActive(!active)}
      onPointerOyver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
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
    <div className='h-screen'>
      <Canvas shadows>
        <OrbitControls />
        <ambientLight />
        <DirectionalLight
          color={'#FFD95C'}
          position={new THREE.Vector3(20, 10, 0)}
        />
        <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} />

        <Suspense>
          <AmorLlamaAmor />
          <Armchair />
          <Couronnes />
          <Ground />
          <IconSpotify />
          <IconTwitter />
          <PersianCarpet />
          <RoseRouge />
          <TrestleLeft />
          <WorldMap />
        </Suspense>
      </Canvas>
    </div>
  )
}
