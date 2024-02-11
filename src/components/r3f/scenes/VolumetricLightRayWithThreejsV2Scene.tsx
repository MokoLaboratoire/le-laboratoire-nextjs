'use client'

import React, { Component, createRef, RefObject } from 'react'
import VolumetricLightRayWithThreejsV2Class from './VolumetricLightRayWithThreejsV2Class.js'

interface VolumetricLightRayWithThreejsSceneV2State {
  initialized: boolean
}

export default class VolumetricLightRayWithThreejsV2Scene extends Component<
  {},
  VolumetricLightRayWithThreejsSceneV2State
> {
  private canvasRef: RefObject<HTMLDivElement>

  constructor(props: any) {
    super(props)
    this.canvasRef = createRef()
  }

  componentDidMount() {
    this.init()
  }

  init = () => {
    new VolumetricLightRayWithThreejsV2Class({
      // @ts-ignore
      container: this.canvasRef.current,
    })
  }

  render() {
    return <div ref={this.canvasRef}></div>
  }
}
