'use client'

import { useRouter } from 'next/navigation'
import { logoutAction } from '@/actions/logout'

export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    await logoutAction()

    router.push('/')
  }

  return (
    <button className="link" onClick={handleLogout}>
      Logout
    </button>
  )
}
