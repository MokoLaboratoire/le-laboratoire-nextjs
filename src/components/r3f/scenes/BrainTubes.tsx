'use client'

import React, { useRef } from 'react'
import * as THREE from 'three'
import ReactThreeFiber, { extend, useFrame } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'

import { data } from './data/brainAnimationWithThreejsR3f'

const randonRange = (min: number, max: number) => Math.random() * (max - min) + min

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
        color: new THREE.Color(0.1, 0.3, 0.6) 
    },
    /*glsl*/`
      uniform float time;
      varying vec2 vUv;
      varying float vProgress;
      void main() {
        vUv = uv;
        vProgress = smoothstep(-1.0, 1.0, sin(vUv.x * 8.0 + time * 3.0));
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    /*glsl*/`
      uniform float time;
      uniform vec3 color;
      varying vec2 vUv;
      varying float vProgress;
      void main() {
        vec3 finalColor = mix(color, color * 0.25, vProgress);
        float hideCorners = smoothstep(1.0, 0.9, vUv.x);
        float hideCorners1 = smoothstep(0.0, 0.1, vUv.x);
        gl_FragColor.rgba = vec4(finalColor, hideCorners * hideCorners1);
      }
    `
)
extend({ BrainMaterial })

interface CurveInterface {
    curve: THREE.CatmullRomCurve3
}

function Tube({ curve }: CurveInterface) {
    const brainMatRef = useRef(null)
    useFrame(({ clock }) => {
        // @ts-ignore
        brainMatRef.current.uniforms.time.value = clock.getElapsedTime();
    })
    return (
        <mesh>
            <tubeGeometry args={[curve, 64, 0.001, 2, false]} />
            <brainMaterial
                ref={brainMatRef}
                side={THREE.DoubleSide}
                transparent={true}
                depthTest={false}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
                /* wireframe={true} */
            />
        </mesh>
    )
}

export default function BrainTubes() {
    const PATHS = data.economics[0].paths
    const brainCurves: THREE.CatmullRomCurve3[] = []
    PATHS.forEach((path) => {
        let points = []
        for(let i = 0; i < PATHS.length; i += 3) {
            points.push(new THREE.Vector3(
                path[i],
                path[i + 1],
                path[i + 2]
            ))
        }
        let tempcurve = new THREE.CatmullRomCurve3(points)
        brainCurves.push(tempcurve)
    })
    return (
        <>
            {brainCurves.map((curve, index) => (
                <Tube key={`curve_${index}`} curve={curve} />
            ))}
        </>
    )
}
