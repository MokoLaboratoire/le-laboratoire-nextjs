'use client'

import React, { Suspense, useEffect, useMemo, useState } from 'react'
import * as THREE from 'three'
import { Canvas, useThree } from '@react-three/fiber'
import {
  Cloud,
  Clouds,
  Environment,
  KeyboardControls,
  PerspectiveCamera,
  PointerLockControls,
  Stats,
  useEnvironment,
} from '@react-three/drei'
import { Physics, RigidBody } from '@react-three/rapier'
import Player from '@/components/r3f/Player'
/* import Sky from '@/components/r3f/CustomSky' */

import { DirectionalLight } from '@/components/r3f/lights'
import { R3fDefaultCube } from '@/components/r3f/primitives'
import Assets from '@/components/r3f/Assets'

import { default as controlConstants } from '@/constants/controlConstants.json'

import { TestShaderMaterial } from '@/assets/materials/TestShaderMaterial'
import TestLibraryCustomShader from '@/assets/materials/TestLibraryCustomShader'
import DirectionalLightTest from '@/assets/lights/DirectionalLightTest'

export default function Home() {

  const envMap = useEnvironment({ files: '/HDRs/safari_sunset_4k.exr' })
  
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
        >
          <PerspectiveCamera
            makeDefault
            aspect={1200 / 600}
            fov={80}
            position={[0, 0, 2]}
            onUpdate={(self) => self.updateProjectionMatrix()}
          />
          <PointerLockControls selector='#button' />
          
          <Environment map={envMap} />

          <Suspense>
            <Physics debug>
              <Player />
              <Assets />
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
