'use client'

import React, { Suspense, useMemo } from 'react'
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import {
  Environment,
  KeyboardControls,
  PerspectiveCamera,
  PointerLockControls,
  Stats,
  useEnvironment,
} from '@react-three/drei'
import { Physics } from '@react-three/rapier'
import Player from '@/components/r3f/Player'

import { CustomBox } from '@/components/r3f/primitives'
import { AxeHelper } from '@/components/r3f/helpers'

import { default as controlConstants } from '@/constants/controlConstants.json'

import AppartementHuassmannien from '@/assets/models/appartement_haussmannien/AppartementHaussmannien'
import Lights from '@/assets/lights/Lights'
import Lampes from '@/assets/models/lampes/Lampes'

export default function HomeScene() {
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

  const envMap = useEnvironment({ files: '/HDRs/test_1.hdr' })

  return (
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

        <Lampes />
        <Lights />

        <AxeHelper size={10} />

        <Suspense fallback={null}>
          <Physics debug>
            <Player />
            <AppartementHuassmannien />
          </Physics>
          <CustomBox
            name={'testBox'}
            width={3}
            depth={3}
            height={3}
            position={new THREE.Vector3(0, 0, 5)}
            castShadow
            receiveShadow
          />
        </Suspense>
        <Stats />
      </Canvas>
    </KeyboardControls>
  )
}
