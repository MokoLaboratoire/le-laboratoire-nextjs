import React from 'react'
import * as THREE from 'three'

import HautParleurs from './HautParleurs'
import Parois from './Parois'
import Mappemonde from './Mappemonde'

import { default as meshesConstants } from '@/constants/meshesConstants.json'

function Enceinte({ position }: ModelInterface) {
  return (
    <>
      <group
        position={new THREE.Vector3(position!.x, position!.z, position!.y)}
      >
        <HautParleurs />
        <Parois />
      </group>
    </>
  )
}

export default function Enceintes() {
  return (
    <>
      {meshesConstants.ENCEINTES.map((enceinte, index) => (
        <Enceinte
          key={`enceinte${index}`}
          position={
            new THREE.Vector3(
              enceinte.POSITION.X,
              enceinte.POSITION.Y,
              enceinte.POSITION.Z,
            )
          }
        />
      ))}
      <Mappemonde />
    </>
  )
}
