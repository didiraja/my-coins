'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { DoLogin, Logout } from '@/libs/request'

export default function Login() {
  const router = useRouter()

  const TryLogin = async () => {
    try {
      await DoLogin()

      router.push('/wallet')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="home">
      <div className="title">
        <h1>Login</h1>
      </div>

      <button className="button" onClick={TryLogin}>
        Login
      </button>

      <button className="button" onClick={Logout}>
        Logout
      </button>
    </div>
  )
}
