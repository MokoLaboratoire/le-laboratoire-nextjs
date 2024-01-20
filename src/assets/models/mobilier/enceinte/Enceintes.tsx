import React from 'react'
import * as THREE from 'three'

import HautParleurs from './HautParleurs'
import Parois from './Parois'
import Mappemonde from './Mappemonde'

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
  const enceintes = [
    {
      position: {
        x: -9.87494,
        y: -12.4251,
        z: 0,
      },
    },
    {
      position: {
        x: 10.7,
        y: -12.5,
        z: 0,
      },
    },
  ]
  
  return (
    <>
      {enceintes.map((enceinte, index) => (
        <Enceinte
          key={`enceinte${index}`}
          position={
            new THREE.Vector3(
              enceinte.position.x,
              enceinte.position.y,
              enceinte.position.z,
            )
          }
        />
      ))}
			<Mappemonde />
    </>
  )
}
