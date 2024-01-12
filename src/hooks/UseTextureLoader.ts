import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader.js'

export default function useTextureLoader(path: string) {
  return useLoader(TextureLoader, path)
}
