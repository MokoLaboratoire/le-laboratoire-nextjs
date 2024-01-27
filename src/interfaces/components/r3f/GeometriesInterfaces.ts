interface BufferGeometryInterface {
  name: string
  children?: JSX.Element
}

export interface PlaneInterface extends BufferGeometryInterface {
  width?: number
  depth?: number
  position?: THREE.Vector3
  rotation?: THREE.Euler
  castShadow?: boolean
  receiveShadow?: boolean
  material?: any
}

export interface BoxInterface extends BufferGeometryInterface {
  width?: number
  depth?: number
  height?: number
  radius?: number
  smoothness?: number
  bevelSegments?: number
  creaseAngle?: number
  position?: THREE.Vector3
  rotation?: THREE.Euler
  castShadow?: boolean
  receiveShadow?: boolean
  leva?: boolean
}
