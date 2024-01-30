'use client'

import React, { Component, createRef, RefObject } from 'react'
import ThreeClass from './ThreeClass.js'

interface ThreeSceneState {
  initialized: boolean
}

export default class ThreeScene extends Component<{}, ThreeSceneState> {
  private canvasRef: RefObject<HTMLDivElement>

  constructor(props: any) {
    super(props)
    this.state = {
      initialized: false,
    }
    this.canvasRef = createRef()
  }

  componentDidMount() {
    if (!this.state.initialized) {
      this.init()
    }
  }

  init = () => {
    const threeCanvas = new ThreeClass({
      // @ts-ignore
      container: this.canvasRef.current,
      // @ts-ignore
      width: this.canvasRef.current.clientWidth,
      // @ts-ignore
      height: this.canvasRef.current.clientHeight,
    })
    this.startRender(threeCanvas)
    this.setState({ initialized: true })
  }

  startRender(threeClass: ThreeClass) {
    threeClass.setAnimationLoop()
  }

  render() {
    return (
      <div
        style={{ width: window.innerWidth, height: window.innerHeight }}
        ref={this.canvasRef}
      ></div>
    )
  }
}
