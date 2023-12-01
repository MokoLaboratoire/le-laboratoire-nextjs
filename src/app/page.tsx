'use client'

import React, { Suspense, useEffect, useMemo, useState } from 'react'
import * as THREE from 'three'
import { Canvas, useThree } from '@react-three/fiber'
import {
  Cloud,
  Clouds,
  KeyboardControls,
  PerspectiveCamera,
  PointerLockControls,
  Sky,
  Stats,
} from '@react-three/drei'

import { Physics, RigidBody } from '@react-three/rapier'
import Player from '@/components/r3f/Player'

import { DirectionalLight } from '@/components/r3f/lights'
import { R3fDefaultCube } from '@/components/r3f/primitives'
import Assets from '@/components/r3f/Assets'

import { default as controlConstants } from '@/constants/controlConstants.json'

import { TestShaderMaterial } from '@/assets/materials/TestShaderMaterial'
import TestLibraryCustomShader from '@/assets/materials/TestLibraryCustomShader'
import DirectionalLightTest from '@/assets/lights/DirectionalLightTest'

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
    console.log('TEST')
    document.addEventListener(
      'HandleShowInstructions',
      HandleShowInstructions,
      false,
    )
    return () => {
      document.removeEventListener(
        'HandleShowInstructions',
        HandleShowInstructions,
        false,
      )
    }
  })

  return (
    <div className='h-screen'>
      <KeyboardControls map={keyboardControlsMap}>
        <Canvas
          shadows
          /* camera={{ fov: 80 }} */
          /* camera={{ position: [-20, 20, 0], fov: 80 }} */
        >
          <DirectionalLightTest />
          <PerspectiveCamera
            makeDefault
            aspect={1200 / 600}
            fov={80}
            position={[0, 0, 2]}
            onUpdate={(self) => self.updateProjectionMatrix()}
          />
          <PointerLockControls selector='#button' />
          <Sky
            distance={450000}
            sunPosition={[1, 1, 50]}
            inclination={0.4}
            azimuth={0.5}
          />
          <ambientLight />
          <Clouds material={THREE.MeshBasicMaterial}>
            <Cloud
              segments={40}
              bounds={[10, 2, 2]}
              volume={10}
              color='orange'
            />
            <Cloud
              seed={1}
              scale={2}
              volume={5}
              color='hotpink'
              fade={100}
            />
          </Clouds>
          <R3fDefaultCube position={[-1.2, 0, 0]} />
          <R3fDefaultCube position={[1.2, 0, 0]} />

          <Suspense>
            <Physics debug>
              <Player />
              <Assets />
              <mesh
                castShadow
                receiveShadow
                position={[2, 2, 2]}
                material={new TestShaderMaterial()}
              >
                <boxGeometry
                  attach='geometry'
                  args={[1, 1, 1]}
                />
              </mesh>
              <TestLibraryCustomShader />
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
        <button
          id='button'
          onClick={HandleShowInstructions}
        >
          Click To Enter
        </button>
      </div>
    </div>
  )
}
