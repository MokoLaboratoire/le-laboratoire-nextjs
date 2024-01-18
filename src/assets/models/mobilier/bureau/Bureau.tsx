import React from 'react'
import * as THREE from 'three'

import Cahier from './Cahier'
import EcranOrdinateur from './EcranOrdinateur'
import MacBookPro from './MacBookPro'
import PlateauVerre from './PlateauVerre'
import Treteau from './Treteau'

import { degrees_to_radians } from 'helpers/threeHelpers'

export default function Bureau() {
  return (
    <>
      <Cahier
        position={new THREE.Vector3(5.77157, -8.89845, 6.17)}
        rotation={new THREE.Euler(0, 0, degrees_to_radians(40))}
      />
      <Cahier
        position={new THREE.Vector3(5.57157, -9.09845, 6.21)}
        rotation={new THREE.Euler(0, 0, degrees_to_radians(55))}
      />
      <EcranOrdinateur />
      <MacBookPro />
      <PlateauVerre />
      <Treteau position={new THREE.Vector3(6, -10, 0.034)} />
      <Treteau position={new THREE.Vector3(-6, -10, 0.034)} />
    </>
  )
}
