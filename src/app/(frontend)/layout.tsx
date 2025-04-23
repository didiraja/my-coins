import React from 'react'
import '@/app/globals.css'

export const metadata = {
  title: 'My Coins Dashboard',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="pt-BR">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
