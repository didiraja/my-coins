'use client'

import { useRouter } from 'nextjs-toploader/app'
import { loginAction } from '@/actions/login'

export default function LoginRoute() {
  const router = useRouter()

  const handleLogin = async () => {
    await loginAction()

    router.push('/')
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-brand">
          <span className="login-brand-mark">◈</span> my coins
        </div>
        <div className="eyebrow">
          <span className="status-dot" /> ACESSO À CARTEIRA
        </div>
        <h1>Bem-vindo de volta</h1>
        <p>Entre para acompanhar sua carteira e suas operações.</p>
        <button className="primary-button login-button" onClick={handleLogin}>
          Entrar na carteira <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  )
}
