'use client'

import React, { Suspense, useRef, useState } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
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
import { Physics, RigidBody } from '@react-three/rapier'

function Box(props: any) {
  const meshRef = useRef<THREE.Mesh>(null!)

  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta
    state.camera?.lookAt(new THREE.Vector3(20, 0, 0))
  })

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
      <Canvas shadows camera={{ position: [-20, 20, 0], fov: 80 }}>
        <OrbitControls />
        <ambientLight />
        <DirectionalLight
          color={'#FFD95C'}
          position={new THREE.Vector3(20, 10, 0)}
        />
        <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} />

        <Suspense>
          <Physics debug>
            <AmorLlamaAmor />
            <Armchair />
            <Couronnes />
            <RigidBody type='fixed'>
              <Ground />
            </RigidBody>
            <IconSpotify />
            <IconTwitter />
            <PersianCarpet />
            <RoseRouge />
            <TrestleLeft />
            <WorldMap />
            <RigidBody restitution={2}>
              <Box position={[10, 10, 0]} />
            </RigidBody>
          </Physics>
        </Suspense>
      </Canvas>
    </div>
  )
}
