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
    <button className="logout-button" onClick={handleLogout}>
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M8 3.5H5.5A2.5 2.5 0 0 0 3 6v8a2.5 2.5 0 0 0 2.5 2.5H8M12 6l4 4-4 4M16 10H7" />
      </svg>
      Sair da conta
    </button>
  )
}
