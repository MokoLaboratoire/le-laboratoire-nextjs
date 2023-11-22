'use client'

import React, { Suspense, useEffect, useMemo, useState } from 'react'
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import {
  KeyboardControls,
  PointerLockControls,
  Sky,
  Stats,
} from '@react-three/drei'

import { Physics, RigidBody } from '@react-three/rapier'
import Player from '@/components/r3f/Player'

import { DirectionalLight } from '@/components/r3f/lights'
import { R3fDefaultCube } from '@/components/r3f/Primitives'
import Assets from '@/components/r3f/Assets'

import { default as controlConstants } from '@/constants/controlConstants.json'

export default function Home() {
  const keyboardControlsMap = useMemo(
    () => [
      { name: controlConstants.FORWARD, keys: controlConstants.FORWARD_KEYS },
      { name: controlConstants.BACKWARD, keys: controlConstants.BACKWARD_KEYS },
      { name: controlConstants.LEFT, keys: controlConstants.LEFT_KEYS },
      { name: controlConstants.RIGHT, keys: controlConstants.RIGHT_KEYS },
      { name: controlConstants.JUMP, keys: controlConstants.JUMP_KEY },
    ],
    [],
  )

  const [showInstructions, setShowInstructions] = useState(true)

  function HandleShowInstructions() {
    setShowInstructions(!showInstructions)
  }

  useEffect(() => {
    console.log("TEST")
    document.addEventListener('HandleShowInstructions', HandleShowInstructions, false)
    return () => {
      document.removeEventListener('HandleShowInstructions', HandleShowInstructions, false)
    }
  })

  return (
    <div className='h-screen'>
      <KeyboardControls map={keyboardControlsMap}>
        <Canvas
          shadows
          camera={{ fov: 80 }}
          /* camera={{ position: [-20, 20, 0], fov: 80 }} */
        >
          <PointerLockControls selector='#button' />
          <Sky sunPosition={[100, 100, 20]} />
          <ambientLight />
          <DirectionalLight
            color={'#FFD95C'}
            position={new THREE.Vector3(20, 10, 0)}
          />
          <R3fDefaultCube position={[-1.2, 0, 0]} />
          <R3fDefaultCube position={[1.2, 0, 0]} />

          <Suspense>
            <Physics debug>
              <Player />
              <Assets />
              <RigidBody restitution={2}>
                <R3fDefaultCube position={[10, 10, 0]} />
              </RigidBody>
            </Physics>
          </Suspense>
          <Stats />
        </Canvas>
      </KeyboardControls>
      <div className='absolute centered cursor'>+</div>
      <div
        id='instructions'
        className={showInstructions ? 'show' : 'hide'}
      >
        Instructions
        <button id='button' onClick={HandleShowInstructions}>Click To Enter</button>
      </div>
    </div>
  )
}
