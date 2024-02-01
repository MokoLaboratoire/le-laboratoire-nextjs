'use client'

import React, { Component, createRef, RefObject } from 'react'
import ThreejsEnhancedCssSliderClass from './ThreejsEnhancedCssSliderClass.js'

interface ThreejsEnhancedCssSliderSceneState {
  initialized: boolean
}

export default class ThreejsEnhancedCssSliderScene extends Component<
  {},
  ThreejsEnhancedCssSliderSceneState
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
    new ThreejsEnhancedCssSliderClass({
      // @ts-ignore
      container: this.canvasRef.current,
    })
  }

  render() {
    return (
      <>
        <div ref={this.canvasRef} />
      </>
    )
  }
}
