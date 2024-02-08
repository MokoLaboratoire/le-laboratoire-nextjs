'use client'

import React, { Component, createRef, RefObject } from 'react'
import BrainAnimationWithThreejsR3fClass from './BrainAnimationWithThreejsR3fClass.js'

interface BrainAnimationWithThreejsR3fSceneState {
  initialized: boolean
}

export default class BrainAnimationWithThreejsR3fScene extends Component<
  {},
  BrainAnimationWithThreejsR3fSceneState
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
    new BrainAnimationWithThreejsR3fClass({
      // @ts-ignore
      container: this.canvasRef.current,
    })
  }

  render() {
    return <div ref={this.canvasRef}></div>
  }
}
