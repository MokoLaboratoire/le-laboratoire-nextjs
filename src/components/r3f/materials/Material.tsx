/* import React, { Component } from 'react'

import { MaterialInterface } from '@/interfaces/components/r3f/MaterialsInterfaces'
import { materialProps } from '@/constants/materialsConstants'

export default class Material<
  P extends MaterialInterface,
> extends Component<P> {
  render() {
    return (
      <material
        attach={'material'}
        {...materialProps}
      />
    )
  }
}
 */

import React, { Children } from 'react'

import { MaterialInterface } from '@/interfaces/components/r3f/MaterialsInterfaces'
import { materialProps } from '@/constants/materialsConstants'

export default function Material({
  ...materialProps
}: MaterialInterface) {
  return (
    <material
    
    >
    </material>
  )
}
