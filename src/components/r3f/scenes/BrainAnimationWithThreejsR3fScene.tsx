'use client'

import React from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

import BrainTubes from './BrainTubes'

export default function BrainAnimationWithThreejsR3fScene() {
  return (
    <Canvas
        id='canvas' 
        shadows
        legacy
        gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
            shadowMapEnabled: true
        }}
        camera={{ fov: 75, near: 0.001, far: 1000, position: [0, 0, 0.3
        ] }}
    >
        <color attach='background' args={['black']} />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls />
        <BrainTubes />
    </Canvas>
  )
}
