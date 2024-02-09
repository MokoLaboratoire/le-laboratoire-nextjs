'use client'

import React, { Component, createRef, RefObject } from 'react'
import TransitionEffectWithThreejsPostprocessingClass from './TransitionEffectWithThreejsPostprocessingClass.js'

interface TransitionEffectWithThreejsPostprocessingSceneState {
  initialized: boolean
}

export default class TransitionEffectWithThreejsPostprocessingScene extends Component<
  {},
  TransitionEffectWithThreejsPostprocessingSceneState
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
    new TransitionEffectWithThreejsPostprocessingClass({
      // @ts-ignore
      container: this.canvasRef.current,
    })
  }

  render() {
    return <div ref={this.canvasRef}></div>
  }
}
