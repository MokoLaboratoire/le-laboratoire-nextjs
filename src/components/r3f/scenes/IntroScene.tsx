'use client'

import React, { Suspense } from 'react'
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import {
  Environment,
  PerspectiveCamera,
  Stats,
  useEnvironment,
} from '@react-three/drei'
import { Physics } from '@react-three/rapier'

import { CustomPlane } from '@/components/r3f/primitives'
import { AxeHelper } from '@/components/r3f/helpers'

export default function IntroScene() {
  return (
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

      <AxeHelper size={10} />

      <Suspense fallback={null}>
        <Physics debug>
          <CustomPlane
            name={'default_cube'}
            rotation={new THREE.Euler(0, 0, 0)}
          />
        </Physics>
      </Suspense>
      <Stats />
    </Canvas>
  )
}
