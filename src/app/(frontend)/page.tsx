import Link from 'next/link'

export default function Home() {
  return (
    <div className="page-content">
      <div className="page-topbar">
        <span>Workspace</span>
        <span className="breadcrumb-separator">/</span>
        <strong>Início</strong>
      </div>
      <div className="page-body home-page">
        <div className="eyebrow">
          <span className="status-dot" /> SUA CARTEIRA EM UM SÓ LUGAR
        </div>
        <h1>Bem-vindo ao My Coins</h1>
        <p>Uma visão clara dos seus ativos, resultados e operações.</p>
        <div className="home-actions">
          <Link className="primary-button" href="/dashboard">
            Abrir painel <span aria-hidden="true">↗</span>
          </Link>
          <Link className="secondary-button" href="/trades">
            Ver operações
          </Link>
        </div>
      </div>
    </div>
  )
}
