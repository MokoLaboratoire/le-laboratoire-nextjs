import * as THREE from 'three'
import { useThree } from '@react-three/fiber'

import { AxeHelperInterface } from '@/interfaces/components/r3f/HelpersInterfaces'

export default function AxeHelper({ size }: AxeHelperInterface) {
  const { scene } = useThree()

  const axesHelper = new THREE.AxesHelper(size)
  scene.add(axesHelper)

  return null
}
