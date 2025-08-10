import React from 'react'
import NextTopLoader from 'nextjs-toploader'
import Header from '@/components/Header'
import '@/app/globals.css'

export const metadata = {
  title: 'My Coins Dashboard',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="pt-BR">
      <body>
        <NextTopLoader />
        <Header />
        <main>{children}</main>
      </body>
    </html>
  )
}
