import React from 'react'
import '@/app/globals.css'
import Link from 'next/link'

export const metadata = {
  title: 'My Coins Dashboard',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="pt-BR">
      <body>
        <nav>
          <Link href="/" className="link">My Coins</Link>
          <Link href="/trades" className="link">Trades</Link>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  )
}
