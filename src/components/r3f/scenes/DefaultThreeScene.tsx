'use client'

import React, { Component, createRef, RefObject } from 'react'
import DefaultThreeClass from './DefaultThreeClass.js'

interface DefaultThreeSceneState {
  initialized: boolean
}

export default class DefaultThreeScene extends Component<
  {},
  DefaultThreeSceneState
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
    new DefaultThreeClass({
      // @ts-ignore
      container: this.canvasRef.current,
    })
  }

  render() {
    return <div ref={this.canvasRef}></div>
  }
}
