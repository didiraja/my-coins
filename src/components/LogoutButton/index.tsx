'use client'

import { useRouter } from 'nextjs-toploader/app'
import { logoutAction } from '@/actions/logout'

export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    await logoutAction()

    router.push('/login')
  }

  return (
    <button className="link cursor-pointer" onClick={handleLogout}>
      Logout
    </button>
  )
}
