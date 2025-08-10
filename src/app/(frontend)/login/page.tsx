'use client'

import { useRouter } from 'nextjs-toploader/app'
import { loginAction } from '@/actions/login'
import { useActionState } from 'react'

export default function LoginRoute() {
  const router = useRouter()

  const [state, formAction] = useActionState(loginAction, {
    user: '',
    password: '',
  })

  const handleLogin = async () => {
    await loginAction({
      email: 'didiraja@hotmail.com',
      password: process.env.NEXT_PUBLIC_USER_PASS || '',
    })

    router.push('/')
  }

  return (
    <div className="login">
      <form action={formAction}>
        <input className="input-field" type="text" name="user" />
        <input className="input-field" type="password" name="password" />
      </form>
      <button className="bg-slate-950 p-5">Login</button>
      {/* <button className="bg-slate-950 p-5" onClick={handleLogin}>
        Login
      </button> */}
    </div>
  )
}
