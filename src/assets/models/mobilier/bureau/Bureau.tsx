import React from 'react'
import * as THREE from 'three'

import Cahiers from './Cahiers'
import EcranOrdinateur from './EcranOrdinateur'
import MacBookPro from './MacBookPro'
import PlateauVerre from './PlateauVerre'
import Treteaux from './Treteaux'
import Vinyls from './Vinyls'

export default function Bureau() {

  return (
    <>
      <Cahiers />
      <EcranOrdinateur />
      <MacBookPro />
      <PlateauVerre />
      <Treteaux />
      <Vinyls />
    </>
  )
}
