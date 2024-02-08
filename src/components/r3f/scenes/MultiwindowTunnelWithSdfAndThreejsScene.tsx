'use client'

import React, { Component, createRef, RefObject } from 'react'
import MultiwindowTunnelWithSdfAndThreejsClass from './MultiwindowTunnelWithSdfAndThreejsClass.js'

interface MultiwindowTunnelWithSdfAndThreejsSceneState {
  initialized: boolean
}

export default class MultiwindowTunnelWithSdfAndThreejsScene extends Component<
  {},
  MultiwindowTunnelWithSdfAndThreejsSceneState
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
    new MultiwindowTunnelWithSdfAndThreejsClass({
      // @ts-ignore
      container: this.canvasRef.current,
    })
  }

  render() {
    return <div ref={this.canvasRef}></div>
  }
}
