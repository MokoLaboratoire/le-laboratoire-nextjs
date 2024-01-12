export interface LightInterface {
  color?: string | THREE.Color
  intensity?: number
}

export interface DirectionalLightInterface extends LightInterface {
  position?: THREE.Vector3
  target?: THREE.Object3D
  castShadow?: boolean
}

export interface RectAreaLightInterface extends LightInterface {
  width?: number
  depth?: number
  position?: THREE.Vector3
  rotation?: THREE.Euler
}

export interface HemisphereLightInterface extends LightInterface {
  groundColor?: string | THREE.Color
  position?: THREE.Vector3
}

export interface PointLightInterface extends LightInterface {
  power?: number
  distance?: number
  decay?: number
  position?: THREE.Vector3
  castShadow?: boolean
}

export interface SpotLightInterface {
  color?: number
  intensity?: number
  power?: number
  angle?: number
  distance?: number
  penumbra?: number
  decay?: number
  position?: THREE.Vector3
  target?: THREE.Object3D
  castShadow?: boolean
}
