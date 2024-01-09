interface MaterialInterface {
	visible?: boolean
	transparent?: boolean
	opacity?: number
	doubleSide?: boolean
}

export interface MeshStandardMaterialInterface extends MaterialInterface {
  color?: string | THREE.Color
	emissive?: string | THREE.Color
	emissiveIntensity?: number
	emissiveMap?: THREE.Texture
  envMapIntensity?: number
}