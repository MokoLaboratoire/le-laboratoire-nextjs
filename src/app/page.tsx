'use client'

import React, { Suspense, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
  KeyboardControls,
  OrbitControls,
  PointerLockControls,
  useKeyboardControls,
} from '@react-three/drei'
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
} from '@/assets/models'
import { DirectionalLight } from '@/components/r3f/lights'
import { Physics, RigidBody, MeshCollider } from '@react-three/rapier'
import Player from '@/components/r3f/Player'

import { default as controlConstants } from '@/constants/controlConstants.json'

function Box(props: any) {
  const meshRef = useRef<THREE.Mesh>(null!)

  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta
    /* state.camera?.lookAt(new THREE.Vector3(20, 0, 0)) */
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
  const keyboardControlsMap = useMemo(
    () => [
      { name: controlConstants.FORWARD, keys: ['ArrowUp', 'W', 'w'] },
      { name: controlConstants.BACKWARD, keys: ['ArrowDown', 'S', 's'] },
      { name: controlConstants.LEFT, keys: ['ArrowLeft', 'A', 'a'] },
      { name: controlConstants.RIGHT, keys: ['ArrowRight', 'D', 'd'] },
      { name: controlConstants.JUMP, keys: ['Space'] },
    ],
    [],
  )

  return (
    <div className='h-screen'>
      <KeyboardControls map={keyboardControlsMap}>
        <Canvas
          shadows
          camera={{ fov: 80 }}
        >
          {/* <OrbitControls /> */}
          <ambientLight />
          <DirectionalLight
            color={'#FFD95C'}
            position={new THREE.Vector3(20, 10, 0)}
          />
          <Box position={[-1.2, 0, 0]} />
          <Box position={[1.2, 0, 0]} />

          <Suspense>
            <Physics debug>
              <Player />
              <AmorLlamaAmor />
              <Armchair />
              <Couronnes />
              <RigidBody type='fixed'>
                {/* <MeshCollider type="trimesh"> */}
                  <Ground />
                {/* </MeshCollider> */}
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
          <PointerLockControls />
        </Canvas>
      </KeyboardControls>
    </div>
  )
}
