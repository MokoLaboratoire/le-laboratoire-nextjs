import type { Metadata } from 'next'

import ReduxProvider from '@/redux/ReduxProvider'

import './globals.css'
import { Footer, Header } from '../components'

export const metadata: Metadata = {
  title: 'Home',
  description: 'Find a description',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className='relative'>
        <Header />
        <ReduxProvider>{children}</ReduxProvider>
        <Footer />
      </body>
    </html>
  )
}
