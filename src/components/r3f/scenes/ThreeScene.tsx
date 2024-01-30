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
    this.canvasRef = createRef()
  }

  componentDidMount() {
    this.init()
  }

  init = () => {
    new ThreeClass({
      // @ts-ignore
      container: this.canvasRef.current,
    })
  }

  render() {
    return (
      <div
        ref={this.canvasRef}
      ></div>
    )
  }
}
