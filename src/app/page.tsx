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

import {
  CustomBox,
  CustomPlane,
  R3fDefaultCube,
} from '@/components/r3f/primitives'
import Assets from '@/components/r3f/Assets'

import { default as controlConstants } from '@/constants/controlConstants.json'

import { TestShaderMaterial } from '@/assets/materials/TestShaderMaterial'
import TestLibraryCustomShader from '@/assets/materials/TestLibraryCustomShader'
import DirectionalLightTest from '@/assets/lights/DirectionalLightTest'
import AxeHelper from '@/components/r3f/helpers/AxeHelper'
import AppartementHuassmannien from '@/assets/models/appartement_haussmannien/AppartementHaussmannien'
import Lights from '@/assets/lights/Lights'
import Lampes from '@/assets/models/lampes/Lampes'
import CustomMeshStandardMaterial from '@/components/r3f/materials/CustomMeshStandardMaterial'

export default function Home() {
  const envMap = useEnvironment({ files: '/HDRs/test_1.hdr' })

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
          id='home_canvas'
          shadows
          legacy
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
            /* shadowMapEnabled: true */
          }}
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

          <AppartementHuassmannien />
          <Lampes />
          <Lights />

          <AxeHelper size={10} />

          <Suspense fallback={null}>
            <Physics debug>
              <Player />
              <RigidBody
                type='fixed'
                colliders='trimesh'
              >
                <CustomPlane
                  name={'sol'}
                  width={52}
                  depth={29.1}
                  receiveShadow
                />
              </RigidBody>
              {/* <Assets /> */}
            </Physics>
            <CustomBox
              name={'testBox'}
              width={3}
              depth={3}
              height={3}
              position={new THREE.Vector3(0, 0, 5)}
              castShadow
              receiveShadow
            >
              <CustomMeshStandardMaterial />
            </CustomBox>
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
