import React from 'react'
import { redirect } from 'next/navigation'
import { IsUserAuthenticated } from '@/libs/request'
import '@/app/globals.css'

export default async function UnprotectedLayout({ children }: { children: React.ReactNode }) {
  const userData = await IsUserAuthenticated()

  console.log(userData)

  if (userData.user && userData.user.token) {
    return redirect('/wallet')
  }

  if (userData.user === null) {
    return redirect('/login')
  }

  return (
    <html lang="pt-BR">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
