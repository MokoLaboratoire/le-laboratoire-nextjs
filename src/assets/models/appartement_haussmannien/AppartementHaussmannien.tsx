import React from 'react'

import Murs from './murs/Murs'
import { Parquet } from './parquet/Parquet'
import Plinthes from './plinthes/Plinthes'
import PorteChambre from './porte_chambre/PorteChambre'

export default function AppartementHuassmannien() {
  return (
    <>
      <Murs />
      <Parquet />
      <Plinthes />
      <PorteChambre />
    </>
  )
}
