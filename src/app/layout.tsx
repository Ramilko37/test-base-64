import '../styles/globals.css'
import Providers from './providers'
import DefaultTags from './default-tags'
import React from 'react'
import TestPage from "../modules/TestPage";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
      <html lang="en">
      <DefaultTags />
      <body>
      <Providers><TestPage /></Providers>
      </body>
      </html>
  )
}

export const metadata = {
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
}
