import React, { Component } from 'react'

import { MeshStandardMaterialInterface } from '@/interfaces/components/r3f/MaterialsInterfaces'

import {
  materialProps,
  meshStandardMaterialProps,
} from '@/constants/materialsConstants'

export default class MeshStandardMaterial<
  P extends MeshStandardMaterialInterface,
> extends Component<P> {
  render() {
    return (
      <meshStandardMaterial
        attach={'material'}
        {...materialProps}
        {...meshStandardMaterialProps}
      />
    )
  }
}
