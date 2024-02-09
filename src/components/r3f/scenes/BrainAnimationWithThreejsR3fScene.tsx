'use client'

import React, { Suspense, useRef } from 'react'
import * as THREE from 'three'
import ReactThreeFiber, { Canvas, extend, useFrame } from '@react-three/fiber'
import { OrbitControls, shaderMaterial } from '@react-three/drei'

import { data } from './data/brainAnimationWithThreejsR3f'

const PATH = data.economics[0].paths

const randonRange = (min: number, max: number) => Math.random() * (max - min) + min

/* const Tube = () => {
    const points = []
    for(let i = 0; i < 10; i++) {
        points.push(
            new THREE.Vector3(
                (i - 5) * 0.5,
                Math.sin(i + 2) * 10 + 5,
                0
            )
        )
    }
    const curve = new THREE.CatmullRomCurve3(points)

    return (
        <mesh>
            <tubeGeometry args={[curve, 64, 0.1, 8, false]} />
            <meshStandardMaterial color='hotpink' />
        </mesh>
    )
} */

interface CurveInterface {
    curve: THREE.CatmullRomCurve3
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            brainMaterial: ReactThreeFiber.Node<typeof BrainMaterial & JSX.IntrinsicElements['shaderMaterial'], typeof BrainMaterial>
        }
    }
}

const BrainMaterial = shaderMaterial(
    { 
        time: 0, 
        color: new THREE.Color(0.2, 0.4, 0.1) 
    },
    /*glsl*/`
      uniform float time;
      varying vec2 vUv;
      varying float vProgress;
      void main() {
        vUv = uv;
        vProgress = smoothstep(-1.0, 1.0, sin(vUv.x * 8.0 + time));
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    /*glsl*/`
      uniform float time;
      uniform vec3 color;
      varying vec2 vUv;
      varying float vProgress;
      void main() {
        vec3 color1 = vec3(1.0, 0.0, 0.0);
        vec3 color2 = vec3(1.0, 1.0, 0.0);
        vec3 finalColor = mix(color1, color2, vProgress);
        gl_FragColor.rgba = vec4(finalColor, 1.0);
      }
    `
)
extend({ BrainMaterial })

function Tube({ curve }: CurveInterface) {
    const brainMatRef = useRef(null)
    useFrame(({ clock }) => {
        // @ts-ignore
        brainMatRef.current.uniforms.time.value = clock.getElapsedTime();
    })
    return (
        <mesh>
            <tubeGeometry args={[curve, 64, 0.01, 3, false]} />
            <brainMaterial ref={brainMatRef} side={THREE.DoubleSide} />
        </mesh>
    )
}

function Tubes() {
    const curves: THREE.CatmullRomCurve3[] = []
    for(let i = 0; i < 100; i++) {
        const points = []
        const length = randonRange(0.1, 1)
        for(let j = 0; j < 100; j++) {
            points.push(
                new THREE.Vector3().setFromSphericalCoords(
                    1,
                    Math.PI -(j / 100) * Math.PI * length,
                    (i / 100) * Math.PI * 2
                )
            )
        }
        const tempcurve = new THREE.CatmullRomCurve3(points)
        curves.push(tempcurve)
    }
    return (
        <>
            {curves.map((curve, index) => (
                <Tube key={`curve_${index}`} curve={curve} />
            ))}
        </>
    )
}


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
        camera={{ fov: 75, near: 0.1, far: 5000, position: [0, 0, 2] }}
    >
        <color attach='background' args={['black']} />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls />
        {/* <Suspense> */}
            {/* <Tube /> */}
            <Tubes />
        {/* </Suspense> */}
    </Canvas>
  )
}
