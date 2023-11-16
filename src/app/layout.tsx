import type { Metadata } from 'next'

import ReduxProvider from '@/redux/ReduxProvider'

import './globals.css'

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
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  )
}
