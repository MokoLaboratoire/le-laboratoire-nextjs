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
			<div
				className='slider__parent'
				style={{ position: 'absolute', clipPath: 'inset(0 50% 0 0)', width: '100%', zIndex: '1' }}
			>
				<div
					className='slider'
					style={{ overflow: 'hidden', width: '100%' }}
				>
					<div
						className='slider__scroller'
						style={{ display: 'flex', flexWrap: 'nowrap', gap: '200px' }}
					>
						<div
							className='slide'
							style={{ width: '360px', height: '240px', minWidth: '360px' }}
						>
							<img
								src='/img/RoseRouge-70x50.png'
								alt=''
								style={{ display: 'block', width: '100%' }}
							/>
						</div>
						<div
							className='slide'
							style={{ width: '360px', height: '240px', minWidth: '360px' }}
						>
							<img
								src='/img/RoseRouge-70x50.png'
								alt=''
								style={{ display: 'block', width: '100%' }}
							/>
						</div>
						<div
							className='slide'
							style={{ width: '360px', height: '240px', minWidth: '360px' }}
						>
							<img
								src='/img/RoseRouge-70x50.png'
								alt=''
								style={{ display: 'block', width: '100%' }}
							/>
						</div>
						<div
							className='slide'
							style={{ width: '360px', height: '240px', minWidth: '360px' }}
						>
							<img
								src='/img/RoseRouge-70x50.png'
								alt=''
								style={{ display: 'block', width: '100%' }}
							/>
						</div>
						<div
							className='slide'
							style={{ width: '360px', height: '240px', minWidth: '360px' }}
						>
							<img
								src='/img/RoseRouge-70x50.png'
								alt=''
								style={{ display: 'block', width: '100%' }}
							/>
						</div>
						<div
							className='slide'
							style={{ width: '360px', height: '240px', minWidth: '360px' }}
						>
							<img
								src='/img/RoseRouge-70x50.png'
								alt=''
								style={{ display: 'block', width: '100%' }}
							/>
						</div>
						<div
							className='slide'
							style={{ width: '360px', height: '240px', minWidth: '360px' }}
						>
							<img
								src='/img/RoseRouge-70x50.png'
								alt=''
								style={{ display: 'block', width: '100%' }}
							/>
						</div>
					</div>
				</div>
			</div>
			<div
				className='slider__parent encoded'
				/* style={{ position: 'relative', top: '-240px', clipPath: 'inset(0 0 0 50% )', zIndex: '2' }} */
				style={{ position: 'absolute', left: '0', clipPath: 'inset(0 0 0 50% )', zIndex: '2' }}
			>
				<div
					className='slider'
					style={{ overflow: 'hidden', width: '100%' }}
				>
					<div
						className='slider__scroller'
						style={{ display: 'flex', flexWrap: 'nowrap', gap: '200px' }}
					>
						<div
							className='slide'
							style={{ width: '360px', height: '240px', minWidth: '360px', color: '#999', overflow: 'hidden' }}
						>
							ABCDEFGHIJKLMNO
						</div>
						<div
							className='slide'
							style={{ width: '360px', height: '240px', minWidth: '360px', color: '#999', overflow: 'hidden' }}
						>
							ABCDEFGHIJKLMNO
						</div>
						<div
							className='slide'
							style={{ width: '360px', height: '240px', minWidth: '360px', color: '#999', overflow: 'hidden' }}
						>
							ABCDEFGHIJKLMNO
						</div>
						<div
							className='slide'
							style={{ width: '360px', height: '240px', minWidth: '360px', color: '#999', overflow: 'hidden' }}
						>
							ABCDEFGHIJKLMNO
						</div>
						<div
							className='slide'
							style={{ width: '360px', height: '240px', minWidth: '360px', color: '#999', overflow: 'hidden' }}
						>
							ABCDEFGHIJKLMNO
						</div>
						<div
							className='slide'
							style={{ width: '360px', height: '240px', minWidth: '360px', color: '#999', overflow: 'hidden' }}
						>
							ABCDEFGHIJKLMNO
						</div>
						<div
							className='slide'
							style={{ width: '360px', height: '240px', minWidth: '360px', color: '#999', overflow: 'hidden' }}
						>
							ABCDEFGHIJKLMNO
						</div>
					</div>
				</div>
			</div>
      <div ref={this.canvasRef} style={{ position: 'absolute', top: '-1200', zIndex: '100' }} />
      </>
    )
  }
}
