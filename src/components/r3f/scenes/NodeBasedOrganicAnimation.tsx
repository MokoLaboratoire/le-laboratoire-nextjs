'use client'

import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Box } from '@react-three/drei'

export default function NodeBasedOrganicAnimation() {

  return (
    <Canvas
      id='intro_canvas'
      shadows
      legacy
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
        /* shadowMapEnabled: true */
      }}
    >
      <ambientLight intensity={Math.PI / 2} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
      <Box
        args={[1, 1, 1]}                // Args for the buffer geometry
      />
    </Canvas>
  )
}
