import React from 'react'
import { RigidBody } from '@react-three/rapier'

import { CustomPlane } from '@/components/r3f/primitives'
import { MeshStandardMaterial } from '@/components/r3f/materials'

export default function Sol() {
  return (
    <RigidBody
      type='fixed'
      colliders='trimesh'
    >
      <CustomPlane
        name={'sol'}
        width={52}
        depth={29.1}
        receiveShadow
      >
        <MeshStandardMaterial color={'black'} />
      </CustomPlane>
    </RigidBody>
  )
}
