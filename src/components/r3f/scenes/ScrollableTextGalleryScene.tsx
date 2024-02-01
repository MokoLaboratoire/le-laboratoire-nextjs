'use client'

import React, { Component, createRef, RefObject } from 'react'
import ScrollableTextGalleryClass from './ScrollableTextGalleryClass.js'

interface ScrollableTextGallerySceneState {
  initialized: boolean
}

export default class ScrollableTextGalleryScene extends Component<
  {},
  ScrollableTextGallerySceneState
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
    new ScrollableTextGalleryClass({
      // @ts-ignore
      container: this.canvasRef.current,
    })
  }

  render() {
    return <div ref={this.canvasRef} />
  }
}
