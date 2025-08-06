'use client'

import { loginAction } from '@/actions/login'

export default function LoginRoute() {
  return (
    <div className="login">
      <button
        className="bg-slate-950 p-5"
        onClick={() =>
          loginAction({
            email: 'didiraja@hotmail.com',
            password: process.env.NEXT_PUBLIC_USER_PASS || '',
          })
        }
      >
        Login
      </button>
    </div>
  )
}
