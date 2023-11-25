import React, { useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import CustomShaderMaterial from 'three-custom-shader-material'

function TestLibraryCustomShader() {
  const materialRef = useRef()

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
    }
  })

  return (
    <mesh
    castShadow
    receiveShadow
    >
      <boxGeometry />
      <CustomShaderMaterial
        ref={materialRef}
        baseMaterial={THREE.MeshPhysicalMaterial}
        vertexShader={/* glsl */ `
        varying vec4 projShadow;
        void main() {
          projShadow = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          gl_Position = projShadow;
        }
      `}
        fragmentShader={/* glsl */ `
        varying vec4 projShadow;
        void main() {
          // Use projShadow.z to perform shadow calculations
          // ...
      
          // Example: Apply a shadow if projShadow.z is less than 0.0
          gl_FragColor = projShadow.z < 0.0 ? vec4(0.0, 0.0, 0.0, 1.0) : vec4(1.0, 0.0, 0.0, 1.0);
      
          // Your fragment shader code goes here
          // ...
          // gl_FragColor=vec4(1.0, 0.0, 0.0, 1.0);
        }`}
        silent
        uniforms={{
          uTime: {
            value: 0,
          },
        }}
        flatShading
        color={0xff0000}
        // ...
      />
    </mesh>
  )
}

export default TestLibraryCustomShader