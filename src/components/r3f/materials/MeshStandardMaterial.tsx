/* import React, { Component } from 'react'
import { useControls } from 'leva'

import { MeshStandardMaterialInterface } from '@/interfaces/components/r3f/MaterialsInterfaces'

import {
  materialControls,
  materialProps,
  meshStandardMaterialProps,
} from '@/constants/materialsConstants'

export default class MeshStandardMaterial<
  P extends MeshStandardMaterialInterface,
> extends Component<P> {

  controls = useControls({
    ...materialControls
  })

  render() {
    return (
      <meshStandardMaterial
        attach={'material'}
        {...this.controls}
        {...materialProps}
        {...meshStandardMaterialProps}
      />
    )
  }
}
 */

import React from 'react'
import { folder, useControls } from 'leva'

import {
  materialControls,
  meshStandardMaterialControls,
} from '@/constants/materialsConstants'

import { MeshStandardMaterialInterface } from '@/interfaces/components/r3f/MaterialsInterfaces'

export default function MeshStandardMaterial(props: MeshStandardMaterialInterface) {
  const controls = useControls({
    'Material': folder({
      ...materialControls,
    }),
    'MeshStandardMaterial': folder({
      ...meshStandardMaterialControls
    }),
  })

  return (
    <meshStandardMaterial
      attach={'material'}
      {...props.leva ? {...controls} : {...props}}
    />
  )
}
