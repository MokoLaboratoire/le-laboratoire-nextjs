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
        vertexShader={`
          void main() {
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          void main() {
            csm_DiffuseColor = vec4(1.0, 0.0, 0.0, 1.0);
          }
        `}
        silent
        uniforms={{
          uTime: {
            value: 0,
          },
        }}
        flatShading
      />
    </mesh>
  )
}

export default TestLibraryCustomShader
