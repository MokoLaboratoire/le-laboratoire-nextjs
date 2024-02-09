'use client'

import React, { Component, createRef, RefObject } from 'react'
import MappingTextureTo3dFaceWithThreejsClass from './MappingTextureTo3dFaceWithThreejsClass.js'

interface MappingTextureTo3dFaceWithThreejsSceneState {
  initialized: boolean
}

export default class MappingTextureTo3dFaceWithThreejsScene extends Component<
  {},
  MappingTextureTo3dFaceWithThreejsSceneState
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
    new MappingTextureTo3dFaceWithThreejsClass({
      // @ts-ignore
      container: this.canvasRef.current,
    })
  }

  render() {
    return <div ref={this.canvasRef}></div>
  }
}
