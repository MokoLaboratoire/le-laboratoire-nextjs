'use client'

import React, { Component, createRef, RefObject } from 'react'
import VolumetricLightRayWithThreejsClass from './VolumetricLightRayWithThreejsClass.js'

interface VolumetricLightRayWithThreejsSceneState {
  initialized: boolean
}

export default class VolumetricLightRayWithThreejsScene extends Component<
  {},
  VolumetricLightRayWithThreejsSceneState
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
    new VolumetricLightRayWithThreejsClass({
      // @ts-ignore
      container: this.canvasRef.current,
    })
  }

  render() {
    return <div ref={this.canvasRef}></div>
  }
}
