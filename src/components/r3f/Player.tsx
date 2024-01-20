import React, { useRef } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { useKeyboardControls } from '@react-three/drei'
import * as RAPIER from '@dimforge/rapier3d-compat'
import { CuboidCollider, RigidBody } from '@react-three/rapier'

import { default as playerConstants } from '@/constants/playerConstants.json'

export default function Player() {
  const rigidBodyRef = useRef<RAPIER.RigidBody>(null)
  const positionRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0))
  const velocityRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0))
  const isOnFloorRef = useRef(true)

  const { camera } = useThree()
  const [, get] = useKeyboardControls()

  const direction = new THREE.Vector3()

  useFrame((state) => {
    const { forward, backward, left, right, jump } = get()

    if (rigidBodyRef.current) {
      positionRef.current = new THREE.Vector3(
        rigidBodyRef.current.translation().x,
        rigidBodyRef.current.translation().y,
        rigidBodyRef.current!.translation().z,
      )
      velocityRef.current = new THREE.Vector3(
        rigidBodyRef.current.rotation().x,
        rigidBodyRef.current.rotation().y,
        rigidBodyRef.current.rotation().z,
      )

      camera.position.copy(
        new THREE.Vector3(
          positionRef.current.x,
          positionRef.current.y + 15,
          positionRef.current.z,
        ),
      )

      const frontVector = new THREE.Vector3(
        0,
        0,
        (backward ? 1 : 0) - (forward ? 1 : 0),
      )
      const sideVector = new THREE.Vector3(
        (left ? 1 : 0) - (right ? 1 : 0),
        0,
        0,
      )

      direction
        .subVectors(frontVector, sideVector)
        .normalize()
        .multiplyScalar(playerConstants.SPEED)
        .applyEuler(camera.rotation)

      rigidBodyRef.current!.applyImpulse(direction, true)

      if (
        jump &&
        isOnFloorRef.current &&
        Math.abs(velocityRef.current.y) < 0.05
      ) {
        rigidBodyRef.current.applyImpulse(
          new THREE.Vector3(
            velocityRef.current.x,
            playerConstants.JUMP_FORCE,
            velocityRef.current.z,
          ),
          true,
        )
        /* isOnFloorRef.current = false */
      }
    }
  })

  return (
    <>
      <RigidBody
        ref={rigidBodyRef}
        colliders={false}
        mass={1}
        type='dynamic'
        enabledRotations={[false, false, false]}
        onCollisionEnter={() => {
          isOnFloorRef.current = true
        }}
      >
        <CuboidCollider
          args={[0.5, 0.5, 0.5]}
          position={[2, 2, 2]}
        />
      </RigidBody>
    </>
  )
}
