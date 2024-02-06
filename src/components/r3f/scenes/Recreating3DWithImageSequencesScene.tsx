'use client'

import React, { Component, createRef, RefObject } from 'react'
import Recreating3DWithImageSequencesClass from './Recreating3DWithImageSequencesClass.js'

interface Recreating3DWithImageSequencesSceneState {
  initialized: boolean
}

export default class Recreating3DWithImageSequencesScene extends Component<
  {},
  Recreating3DWithImageSequencesSceneState
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
    new Recreating3DWithImageSequencesClass({
      // @ts-ignore
      container: this.canvasRef.current,
    })
  }

  render() {
    return <div ref={this.canvasRef}></div>
  }
}
