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

import React, { useEffect, useRef } from 'react'
import { folder, useControls } from 'leva'

import {
  materialControls,
  meshStandardMaterialControls,
  meshStandardMaterialProps,
} from '@/constants/materialsConstants'
import { MeshStandardMaterialInterface } from '@/interfaces/components/r3f/MaterialsInterfaces'

export default function MeshStandardMaterial(props: MeshStandardMaterialInterface) {
  /* const meshStandardMaterialRef = useRef<MeshStandardMaterialInterface>(null) */

  /* useEffect(() => {
    console.log('meshStandardMaterialRef', meshStandardMaterialRef)
  }, [meshStandardMaterialRef]) */

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
      /* ref={meshStandardMaterialRef} */
      attach={'material'}
      {...props.leva ? {...controls} : {...props}}
    />
  )
}
