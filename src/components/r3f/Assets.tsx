import React from 'react'
import { RigidBody } from '@react-three/rapier'

import {
  AmorLlamaAmor,
  Armchair,
  Couronnes,
  Ground,
  IconSpotify,
  IconTwitter,
  PersianCarpet,
  RoseRouge,
  TrestleLeft,
  WorldMap,
} from '@/assets/models'

export default function Assets() {
  return (
    <>
      {/* <AmorLlamaAmor />
      <Armchair />
      <Couronnes />
      <IconSpotify />
      <IconTwitter />
      <PersianCarpet />
      <RoseRouge />
      <TrestleLeft />
      <WorldMap /> */}
      <RigidBody
        type='fixed'
        colliders='trimesh'
      >
        <Ground />
      </RigidBody>
    </>
  )
}
