'use client'

import React, { Component, createRef, RefObject } from 'react'
import GlassEffectWithThreejsClass from './GlassEffectWithThreejsClass.js'

interface GlassEffectWithThreejsSceneState {
  initialized: boolean
}

export default class DefaultThreeScene extends Component<
  {},
  GlassEffectWithThreejsSceneState
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
    new GlassEffectWithThreejsClass({
      // @ts-ignore
      container: this.canvasRef.current,
    })
  }

  render() {
    return <div ref={this.canvasRef}></div>
  }
}
