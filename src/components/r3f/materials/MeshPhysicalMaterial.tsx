import React, { Component } from 'react'

import { MeshPhysicalMaterialInterface } from '@/interfaces/components/r3f/MaterialsInterfaces'
import {
  materialProps,
  meshPhysicalMaterialProps,
  meshStandardMaterialProps,
} from '@/constants/materialsConstants'

export default class MeshPhysicalMaterial<
  P extends MeshPhysicalMaterialInterface,
> extends Component<P> {
  render() {
    // There is an issue than I don't understand yet...
    const { iridescenceThicknessRange = [100, 400] } = this.props

    return (
      <meshPhysicalMaterial
        attach={'material'}
        {...materialProps}
        {...meshStandardMaterialProps}
        {...meshPhysicalMaterialProps}
        iridescenceThicknessRange={iridescenceThicknessRange}
      />
    )
  }
}
