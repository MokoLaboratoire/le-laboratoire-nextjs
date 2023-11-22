'use client'

import React, { Suspense, useEffect, useMemo, useState } from 'react'
import * as THREE from 'three'
import { Canvas, extend, Object3DNode } from '@react-three/fiber'
import { shaderMaterial } from "@react-three/drei";
import {
  KeyboardControls,
  PointerLockControls,
  Sky,
  Stats,
} from '@react-three/drei'

import { Physics, RigidBody } from '@react-three/rapier'
import Player from '@/components/r3f/Player'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      customMaterial: Object3DNode<CustomMaterial, typeof CustomMaterial>
    }
  }
}

import { DirectionalLight } from '@/components/r3f/lights'
import { R3fDefaultCube } from '@/components/r3f/Primitives'
import Assets from '@/components/r3f/Assets'

import { default as controlConstants } from '@/constants/controlConstants.json'



class CustomMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      vertexShader: `
      void main() {
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
      }
  `,
      fragmentShader: `
      uniform vec3 color;


      void main() {
        gl_FragColor=vec4(1.0,0.0,0.0,1.0);
      }`,
      uniforms: {
        color: { value: new THREE.Color("hotpink") },
        // other uniforms...
      },
    })
  }
}

extend({ CustomMaterial })

/* const lineShaderMaterial = shaderMaterial(
  { color: new THREE.Color("hotpink") },

  // language=GLSL
  `
      varying float camera_distance;

      void main() {
          // calculate distance to camera by translating into camera/eye space and measure along the z-axis
          vec4 eyeVertexPosition = modelViewMatrix * vec4(position, 1.0);
          camera_distance = -eyeVertexPosition.z;

          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
  `,

  // language=GLSL
  `
      uniform vec3 color;

      varying float camera_distance;

      void main() {
          gl_FragColor.rgb = vec3(1.0, 1.0, 0.0);
      }`
);

extend({ lineShaderMaterial }); */

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
              {/* <Player /> */}
              {/* <Assets /> */}
              <mesh
                castShadow
                receiveShadow
                position={[2, 2, 2]}
              >
                <boxGeometry
                  attach='geometry'
                  args={[1, 1, 1]}
                />
                <customMaterial
                  attach='material' 
                  />
              </mesh>
              {/* <RigidBody restitution={2}>
                <R3fDefaultCube position={[10, 10, 0]} />
              </RigidBody> */}
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
