import React from 'react'
import '@/app/globals.css'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const metadata = {
  title: 'My Coins Dashboard',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const cookieStore = await cookies()

  // console.log('value', cookieStore.get('payload-token'))

  if (!cookieStore.get('payload-token')) {
    redirect('/admin/login')
  }

  const { children } = props

  return (
    <html lang="pt-BR">
      <body>
        <nav>
          <Link href="/" className="link">
            My Coins
          </Link>
          <Link href="/trades" className="link">
            Trades
          </Link>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  )
}
