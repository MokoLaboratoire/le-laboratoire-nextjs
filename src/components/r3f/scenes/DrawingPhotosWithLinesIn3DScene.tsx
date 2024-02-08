'use client'

import React, { Component, createRef, RefObject } from 'react'
import DrawingPhotosWithLinesIn3DClass from './DrawingPhotosWithLinesIn3DClass.js'

interface DrawingPhotosWithLinesIn3DSceneState {
  initialized: boolean
}

export default class DrawingPhotosWithLinesIn3DScene extends Component<
  {},
  DrawingPhotosWithLinesIn3DSceneState
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
    new DrawingPhotosWithLinesIn3DClass({
      // @ts-ignore
      container: this.canvasRef.current,
    })
  }

  render() {
    return <div ref={this.canvasRef}></div>
  }
}
