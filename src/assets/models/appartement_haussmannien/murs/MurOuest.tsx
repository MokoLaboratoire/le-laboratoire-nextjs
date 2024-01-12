import React from 'react'
import * as THREE from 'three'

import { CustomMeshStandardMaterial } from '@/components/r3f/materials'

export default function MurOuest() {
  const shape = new THREE.Shape()
  shape.moveTo(14.55, 0)
  shape.lineTo(14.55, 26)
  shape.lineTo(-14.55, 26)
  shape.lineTo(-14.55, 0)
  shape.lineTo(-13.82, 0)
  shape.lineTo(-13.82, 24.738)
  shape.lineTo(-3.18, 24.738)
  shape.lineTo(-3.18, 0)

  return (
    <mesh
      position={[-26, 0, 0]}
      rotation={[0, -Math.PI / 2, 0]}
    >
      <shapeGeometry args={[new THREE.Shape(shape.getPoints(8))]} />
      <CustomMeshStandardMaterial />
    </mesh>
  )
}

/* function BoxBlendGeometry() {
  const geometry = useRef<THREE.BufferGeometry>(null)
  const shape = useMemo(() => {
    const s = new THREE.Shape()
    s.moveTo(14.55, 0)
    s.lineTo(14.55, 26)
    s.lineTo(-14.55, 26)
    s.lineTo(-14.55, 0)
    s.lineTo(-13.82, 0)
    s.lineTo(-13.82, 24.738)
    s.lineTo(-3.18, 24.738)
    s.lineTo(-3.18, 0)
    return new THREE.Shape(s.getPoints(10))
  }, [])
  // @ts-ignore
  return <shapeGeometry ref={geometry} args={[shape, config]} />
}

export default function MurOuest() {
  return (
    <mesh position={[-26, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
      <BoxBlendGeometry />
      <CustomMeshStandardMaterial />
    </mesh>
  )
} */

// https://discourse.threejs.org/t/simple-custom-geometry/45213/2
