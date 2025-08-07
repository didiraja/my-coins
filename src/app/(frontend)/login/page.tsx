'use client'

import { useRouter } from 'next/navigation'
import { loginAction } from '@/actions/login'

export default function LoginRoute() {
  const router = useRouter()

  const handleLogin = async () => {
    await loginAction({
      email: 'didiraja@hotmail.com',
      password: process.env.NEXT_PUBLIC_USER_PASS || '',
    })

    router.push('/')
  }

  return (
    <div className="login">
      <button className="bg-slate-950 p-5" onClick={handleLogin}>
        Login
      </button>
    </div>
  )
}
