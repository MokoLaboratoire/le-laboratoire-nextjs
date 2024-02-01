import React from 'react'

/* import DefaultThreeScene from '@/components/r3f/scenes/DefaultThreeScene' */
/* import InteractiveParticulesLoopScene from '@/components/r3f/scenes/InteractiveParticulesLoopScene' */
/* import ScrollableTextGalleryScene from '@/components/r3f/scenes/ScrollableTextGalleryScene' */
import ThreejsEnhancedCssSliderScene from '@/components/r3f/scenes/ThreejsEnhancedCssSliderScene'

export default function page() {
  return (
    <>
      <div
        /* className='h-screen' */
        style={
          {
            /* overflow: 'hidden', */
          }
        }
      >
        <div className='slider__parent'>
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
        {/* <DefaultThreeScene /> */}
        {/* <InteractiveParticulesLoopScene /> */}
        {/* <ScrollableTextGalleryScene /> */}
        <ThreejsEnhancedCssSliderScene />
      </div>
      <div
        className='images'
        hidden
      >
        <img
          src='/img/Dash-70x50.png/'
          className={'js-texture'}
          alt='images'
        />
        <img
          src='/img/Jesus-70x50.png/'
          className={'js-texture'}
          alt='images'
        />
        <img
          src='/img/LHommeAuLapinBlanc-70x50.png/'
          className={'js-texture'}
          alt='images'
        />
        <img
          src='/img/Loost-50x70.png/'
          className={'js-texture'}
          alt='images'
        />
        <img
          src='/img/NecPluribusImpar-70x50.png/'
          className={'js-texture'}
          alt='images'
        />
        <img
          src='/img/Robuste-70x50.jpg/'
          className={'js-texture'}
          alt='images'
        />
        <img
          src='/img/RoseRouge-70x50.png/'
          className={'js-texture'}
          alt='images'
        />
        <img
          src='/img/VerbalShoota-70x50.png/'
          className={'js-texture'}
          alt='images'
        />
        <img
          src='/img/Dash-70x50.png/'
          className={'js-texture'}
          alt='images'
        />
        <img
          src='/img/Jesus-70x50.png/'
          className={'js-texture'}
          alt='images'
        />
      </div>
    </>
  )
}
