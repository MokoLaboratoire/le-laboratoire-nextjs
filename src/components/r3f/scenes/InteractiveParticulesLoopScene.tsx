'use client'

import React, { Component, createRef, RefObject } from 'react'
import InteractiveParticulesLoopClass from './InteractiveParticulesLoopClass.js'

interface InteractiveParticulesLoopSceneState {
  initialized: boolean
}

export default class InteractiveParticulesLoopScene extends Component<
  {},
  InteractiveParticulesLoopSceneState
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
    new InteractiveParticulesLoopClass({
      // @ts-ignore
      container: this.canvasRef.current,
    })
  }

  render() {
    return <div ref={this.canvasRef}></div>
  }
}
