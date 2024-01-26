import React from 'react'

import Bureau from './bureau/Bureau'
import Cadres from './cadres/Cadres'
import Enceintes from './enceintes/Enceintes'
import EtagereBureau from './etagere_bureau/EtagereBureau'
import Sol from './sol/Sol'

export default function Mobilier() {
  return (
    <>
      <Bureau />
      <Cadres />
      <Enceintes />
      <EtagereBureau />
      <Sol />
    </>
  )
}
