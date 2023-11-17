import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Header() {
  return (
    <header className='z-10 absolute v-full'>
      <nav className='mx-auto flex justify-between items-center sm:px-16 px-6 py-4'>
        <Link href='/' className='flex jutify-center items-center'>
          <Image 
            src='/next-logo.png'
            alt='logo'
            width={40}
            height={40}
            className='object-contain'
          />
        </Link>
      </nav>
      Header
    </header>
  )
}
