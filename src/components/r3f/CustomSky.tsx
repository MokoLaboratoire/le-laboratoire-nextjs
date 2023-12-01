import React from 'react'
import * as THREE from 'three'
import { Sky } from 'three/addons/objects/Sky.js'
import { GUI } from 'three/addons/libs/lil-gui.module.min.js'
import { useThree } from '@react-three/fiber'

export default function CustomSky() {
  const { scene, gl, camera } = useThree()

  console.log('scene', scene)
  console.log('gl', gl)

  const sky = new Sky()
  sky.scale.setScalar(450000)
  scene.add(sky)

  const sun = new THREE.Vector3()

  const gui = new GUI()

  const effectController = {
    turbidity: 10,
    rayleigh: 3,
    mieCoefficient: 0.005,
    mieDirectionalG: 0.7,
    elevation: 2,
    azimuth: 180,
    exposure: gl.toneMappingExposure,
  }

  gui.add(effectController, 'turbidity', 0.0, 20.0, 0.1).onChange(guiChanged)
  gui.add(effectController, 'rayleigh', 0.0, 4, 0.001).onChange(guiChanged)
  gui.add(effectController, 'mieCoefficient', 0.0, 0.1, 0.001).onChange(guiChanged)
  gui.add(effectController, 'mieDirectionalG', 0.0, 1, 0.001).onChange(guiChanged)
  gui.add(effectController, 'elevation', 0, 90, 0.1).onChange(guiChanged)
  gui.add(effectController, 'azimuth', -180, 180, 0.1).onChange(guiChanged)
  gui.add(effectController, 'exposure', 0, 1, 0.0001).onChange(guiChanged)

  function guiChanged() {
    const uniforms = sky.material.uniforms
    uniforms['turbidity'].value = effectController.turbidity
    uniforms['rayleigh'].value = effectController.rayleigh
    uniforms['mieCoefficient'].value = effectController.mieCoefficient
    uniforms['mieDirectionalG'].value = effectController.mieDirectionalG

    const phi = THREE.MathUtils.degToRad(90 - effectController.elevation)
    const theta = THREE.MathUtils.degToRad(effectController.azimuth)

    sun.setFromSphericalCoords(1, phi, theta)

    uniforms['sunPosition'].value.copy(sun)

    gl.toneMappingExposure = effectController.exposure
    gl.render(scene, camera)
  }

  guiChanged();

  return null
}
