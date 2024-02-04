'use client'

import React, { Component, createRef, RefObject } from 'react'

import NodeBasedOrganicAnimationClass from './NodeBasedOrganicAnimationClass.js'

interface NodeBasedOrganicAnimationSceneState {
  initialized: boolean
}

export default class NodeBasedOrganicAnimationScene extends Component<
  {},
  NodeBasedOrganicAnimationSceneState
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
    new NodeBasedOrganicAnimationClass({
      // @ts-ignore
      container: this.canvasRef.current,
    })
  }

  render() {
    return <div ref={this.canvasRef}></div>
  }
}
