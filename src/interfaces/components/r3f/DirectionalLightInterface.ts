export interface DirectionalLightingInterface {
  color?: string
  intensity?: number
  position?: THREE.Vector3
  castShadow?: boolean
  target?: THREE.Object3D
}
