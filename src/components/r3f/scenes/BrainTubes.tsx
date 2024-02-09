'use client'

import React, { useRef } from 'react'
import * as THREE from 'three'
import ReactThreeFiber, { extend, useFrame, useThree } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'

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
        mouse: new THREE.Vector3(0, 0, 0),
        color: new THREE.Color(0.1, 0.3, 0.6) 
    },
    /*glsl*/`
      uniform float time;
      uniform vec3 mouse;
      varying vec2 vUv;
      varying float vProgress;
      void main() {
        vUv = uv;
        vProgress = smoothstep(-1.0, 1.0, sin(vUv.x * 8.0 + time * 3.0));

        vec3 p = position;
        float maxDist = 0.5;
        float dist = length(mouse -p);
        if(dist < maxDist) {
            vec3 dir = normalize(mouse - p);
            dir *= (1.0 - dist / maxDist);
            p -= dir * 0.03;
        }


        gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
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

interface TubeInterface {
    curve: THREE.CatmullRomCurve3
}

function Tube({ curve }: TubeInterface) {
    const brainMatRef = useRef(null)

    let { viewport } = useThree()

    useFrame(({ clock, pointer }) => {
        // @ts-ignore
        brainMatRef.current.uniforms.time.value = clock.getElapsedTime();
        
        // @ts-ignore
        brainMatRef.current.uniforms.mouse.value = new THREE.Vector3(
            pointer.x * viewport.width / 2,
            pointer.y * viewport.height / 2,
            0,
        )
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

interface BrainTubesInterface {
    brainCurves: THREE.CatmullRomCurve3[]
}

export default function BrainTubes({ brainCurves }: BrainTubesInterface) {
    return (
        <>
            {brainCurves.map((curve, index) => (
                <Tube key={`curve_${index}`} curve={curve} />
            ))}
        </>
    )
}
