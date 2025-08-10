import React from 'react'
import NextTopLoader from 'nextjs-toploader'
import { cookies } from 'next/headers'
import Header from '@/components/Header'
import '@/app/globals.css'

export const metadata = {
  title: 'My Coins Dashboard',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const cookieStore = await cookies()

  const payloadToken = cookieStore.get('payload-token')?.value

  const isAuthenticated = !(!payloadToken || payloadToken.length === 0)

  const { children } = props

  return (
    <html lang="pt-BR">
      <body>
        <NextTopLoader />
        {isAuthenticated && <Header />}
        <main>{children}</main>
      </body>
    </html>
  )
}
