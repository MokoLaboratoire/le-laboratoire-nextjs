'use client'

import React from 'react'

import styles from 'styles.module.css'

/* import BrainAnimationWithThreejsR3fScene from '@/components/r3f/scenes/BrainAnimationWithThreejsR3fScene' */
/* import DefaultThreeScene from '@/components/r3f/scenes/DefaultThreeScene' */
/* import DrawingPhotosWithLinesIn3DScene from '@/components/r3f/scenes/DrawingPhotosWithLinesIn3DScene' */
/* import GlassEffectWithThreejsScene from '@/components/r3f/scenes/GlassEffectWithThreejsScene' */
/* import InteractiveParticulesLoopScene from '@/components/r3f/scenes/InteractiveParticulesLoopScene' */
/* import NodeBasedOrganicAnimationScene from '@/components/r3f/scenes/NodeBasedOrganicAnimationScene' */
/* import Recreating3DWithImageSequencesScene from '@/components/r3f/scenes/Recreating3DWithImageSequencesScene' */
/* import ScrollableTextGalleryScene from '@/components/r3f/scenes/ScrollableTextGalleryScene' */
/* import ThreejsEnhancedCssSliderScene from '@/components/r3f/scenes/ThreejsEnhancedCssSliderScene' */
import TransitionEffectWithThreejsPostprocessingScene from '@/components/r3f/scenes/TransitionEffectWithThreejsPostprocessingScene'

export default function page() {
  return (
    <>
      <div
        className='h-screen'
        style={
          {
            /* overflow: 'hidden', */
          }
        }
      >
        {/* <BrainAnimationWithThreejsR3fScene /> */}
        {/* <DefaultThreeScene /> */}
        {/* <DrawingPhotosWithLinesIn3DScene /> */}
        {/* <GlassEffectWithThreejsScene /> */}
        {/* <InteractiveParticulesLoopScene /> */}
        {/* <NodeBasedOrganicAnimationScene /> */}
        {/* <Recreating3DWithImageSequencesScene /> */}
        {/* <ScrollableTextGalleryScene /> */}
        {/* <ThreejsEnhancedCssSliderScene /> */}
        <TransitionEffectWithThreejsPostprocessingScene />
      </div>
      {/* <img
        src='/img/ktx2/gameboy_diffuse-high.png.ktx2'
        className={'tDiffuse'}
        alt='ktx2_images'
      /> */}
      {/* <div
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
      </div> */}
    </>
  )
}
