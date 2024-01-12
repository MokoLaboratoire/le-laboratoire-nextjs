import React from 'react'

import { LightInterface } from '@/interfaces/components/r3f/LightsInterfaces'

export default function CustomAmbientLight({
  color = 'white',
  intensity = 1,
}: LightInterface) {
  return (
    <ambientLight
      color={color}
      intensity={intensity}
    />
  )
}
