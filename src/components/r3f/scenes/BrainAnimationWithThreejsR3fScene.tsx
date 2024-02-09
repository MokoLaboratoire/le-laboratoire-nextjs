'use client'

import React, { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import ReactThreeFiber, { Canvas, extend, useFrame } from '@react-three/fiber'
import { OrbitControls, shaderMaterial } from '@react-three/drei'

import BrainTubes from './BrainTubes'

import { data } from './data/brainAnimationWithThreejsR3f'

const randonRange = (min: number, max: number) => Math.random() * (max - min) + min

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

interface BrainParticulesInterface {
    brainCurves: THREE.CatmullRomCurve3[]
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            brainParticulesMaterial: ReactThreeFiber.Node<typeof BrainParticulesMaterial & JSX.IntrinsicElements['shaderMaterial'], typeof BrainParticulesMaterial>
        }
    }
}

const BrainParticulesMaterial = shaderMaterial(
    { 
        time: 0, 
        color: new THREE.Color(0.1, 0.3, 0.6) 
    },
    /*glsl*/`
      uniform float time;
      varying vec2 vUv;
      varying float vProgress;
      attribute float randoms;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = randoms * 2.0 * (1.0 / -mvPosition.z);
        /* gl_PointSize = 50.0; */
      }
    `,
    /*glsl*/`
      uniform float time;
      void main() {
        float disc = length(gl_PointCoord.xy - vec2(0.5));
        float opacity = 0.3 * smoothstep(0.5, 0.4, disc);
        gl_FragColor = vec4(vec3(opacity), 1.0);
      }
    `
)
extend({ BrainParticulesMaterial })

interface myPointsRefInterface {
    currentOffset: number
    speed: number
    curve: THREE.CatmullRomCurve3
    curPosition: number
}

function BrainParticules({ brainCurves }: BrainParticulesInterface) {
    const density = 10
    let numberOfPoints = density * brainCurves.length

    const myPointsRef = useRef<myPointsRefInterface[]>([])
    const brainGeoRef = useRef(null)

    const positions = useMemo(() => {
        const positions = []
        for(let i = 0; i < numberOfPoints; i++) {
            positions.push(
                randonRange(-1, 1),
                randonRange(-1, 1),
                randonRange(-1, 1),
            )
        }
        return new Float32Array(positions)
    }, [])

    const randoms = useMemo(() => {
        const randoms = []
        for(let i = 0; i < numberOfPoints; i++) {
            randoms.push(
                randonRange(0.3, 1),
            )
        }
        return new Float32Array(randoms)
    }, [])

    useEffect(() => {
        for(let i = 0; i < brainCurves.length; i++) {
            for(let j = 0; j < density; j++) {
                if(myPointsRef.current) myPointsRef.current.push({
                    currentOffset: Math.random(),
                    speed: Math.random() * 0.01,
                    curve: brainCurves[i],
                    curPosition: Math.random()
                })
            }
        }
    }, [])

    useFrame(() => {
        // @ts-ignore
        let curpositions = brainGeoRef.current.attributes.position.array;
        for(let i = 0; i < myPointsRef.current.length; i++) {
            myPointsRef.current[i].curPosition += myPointsRef.current[i].speed
            myPointsRef.current[i].curPosition = myPointsRef.current[i].curPosition % 1
            const curPoint = myPointsRef.current[i].curve.getPointAt(myPointsRef.current[i].curPosition)
            curpositions[i * 3] = curPoint.x
            curpositions[i * 3 + 1] = curPoint.y
            curpositions[i * 3 + 2] = curPoint.z
        }
        // @ts-ignore
        brainGeoRef.current.attributes.position.needsUpdate = true
    })

    return (
        <points>
            <bufferGeometry attach='geometry' ref={brainGeoRef}>
                <bufferAttribute
                    attach='attributes-position'
                    count={positions.length / 3}
                    array={positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach='attributes-randoms'
                    count={randoms.length}
                    array={randoms}
                    itemSize={1}
                />
            </bufferGeometry>
            <brainParticulesMaterial
                attach='material'
                side={THREE.DoubleSide}
                transparent={true}
                depthTest={false}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
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
        camera={{ fov: 75, near: 0.001, far: 1000, position: [0, 0, 0.3
        ] }}
    >
        <color attach='background' args={['black']} />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls />
        <BrainTubes brainCurves={brainCurves} />
        <BrainParticules brainCurves={brainCurves} />
    </Canvas>
  )
}
