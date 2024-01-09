interface MaterialInterface {
	visible?: boolean
	transparent?: boolean
	opacity?: number
	doubleSide?: boolean
}

export interface MeshBasicMaterialInterface extends MaterialInterface {
  color?: string | THREE.Color
	wireframe?: boolean
	wireframeLinecap?: 'butt' | 'round' | 'square'
	wireframeLinewidth?: number
}

export interface MeshDepthMaterialInterface extends MaterialInterface {
	wireframe?: boolean
	wireframeLinewidth?: number
}

export interface MeshLambertMaterialInterface extends MaterialInterface {
  color?: string | THREE.Color
	emissive?: string | THREE.Color
	emissiveIntensity?: number
	emissiveMap?: THREE.Texture
	wireframe?: boolean
	wireframeLinecap?: 'butt' | 'round' | 'square'
	wireframeLinejoin?: 'bevel' | 'miter' | 'round'
	wireframeLinewidth?: number
}

export interface MeshMatcapMaterialInterface extends MaterialInterface {
  color?: string | THREE.Color
	matcap?: THREE.Texture
}

export interface MeshNormalMaterialInterface extends MaterialInterface {
	wireframe?: boolean
	wireframeLinewidth?: number
}

export interface MeshPhongMaterialInterface extends MaterialInterface {
  color?: string | THREE.Color
	emissive?: string | THREE.Color
	emissiveIntensity?: number
	emissiveMap?: THREE.Texture
	wireframe?: boolean
	wireframeLinecap?: 'butt' | 'round' | 'square'
	wireframeLinejoin?: 'bevel' | 'miter' | 'round'
	wireframeLinewidth?: number
}

export interface MeshPhysicalMaterialInterface extends MeshStandardMaterialInterface {
}

export interface MeshStandardMaterialInterface extends MaterialInterface {
  color?: string | THREE.Color
	emissive?: string | THREE.Color
	emissiveIntensity?: number
	emissiveMap?: THREE.Texture
  envMapIntensity?: number
	wireframe?: boolean
	wireframeLinecap?: 'butt' | 'round' | 'square'
	wireframeLinewidth?: number
}

export interface MeshToonMaterialInterface extends MaterialInterface {
  color?: string | THREE.Color
	emissive?: string | THREE.Color
	emissiveIntensity?: number
	emissiveMap?: THREE.Texture
	wireframe?: boolean
	wireframeLinecap?: 'butt' | 'round' | 'square'
	wireframeLinejoin?: 'bevel' | 'miter' | 'round'
	wireframeLinewidth?: number
}