'use client'

import HomeScene from '@/components/r3f/scenes/HomeScene'
import React, { useEffect, useState} from 'react'

export default function Home() {

  const [showInstructions, setShowInstructions] = useState(true)

  function HandleShowInstructions() {
    setShowInstructions(!showInstructions)
  }

  useEffect(() => {
    console.log('TEST')
    document.addEventListener(
      'HandleShowInstructions',
      HandleShowInstructions,
      false,
    )
    return () => {
      document.removeEventListener(
        'HandleShowInstructions',
        HandleShowInstructions,
        false,
      )
    }
  })

  return (
    <div className='h-screen'>
      <HomeScene />
      <div className='absolute centered cursor'>+</div>
      <div
        id='instructions'
        className={showInstructions ? 'show' : 'hide'}
      >
        Instructions
        <button
          id='button'
          onClick={HandleShowInstructions}
        >
          Click To Enter
        </button>
      </div>
    </div>
  )
}
