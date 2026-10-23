import Link from 'next/link'
import { GetDashValues } from '@/libs/request'
import { formatBRL } from '@/libs/format'
import CoinPortfolio from '@/components/CoinPortfolio'
import Card from '@/components/Card'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function Dashboard() {
  const dashValues = await GetDashValues()
  const portfolio = [...(dashValues?.portfolio ?? [])].sort((a, b) => b.balance - a.balance)
  const balance = portfolio.reduce((total, item) => total + item.balance, 0)
  const invested = portfolio.reduce((total, item) => total + item.investing, 0)
  const profit = balance - invested
  const profitRate = invested ? (profit / invested) * 100 : 0

  return (
    <div className="page-content">
      <div className="page-topbar">
        <span>Workspace</span>
        <span className="breadcrumb-separator">/</span>
        <strong>Visão geral</strong>
        <span className="topbar-badge">Carteira</span>
      </div>

      <div className="page-body">
        <header className="page-heading">
          <div>
            <div className="eyebrow">
              <span className="status-dot" /> SEU PAINEL
            </div>
            <h1>Visão geral</h1>
            <p>Acompanhe o desempenho e a composição da sua carteira.</p>
          </div>
          <Link className="header-action" href="/trades">
            Ver operações <span aria-hidden="true">↗</span>
          </Link>
        </header>

        {!dashValues ? (
          <div className="state-panel" role="status">
            <strong>Não foi possível carregar a carteira.</strong>
            <p>Verifique a conexão e tente novamente em alguns instantes.</p>
          </div>
        ) : (
          <>
            <section className="balance-panel" aria-label="Resumo da carteira">
              <div className="balance-panel-copy">
                <span className="section-kicker">PATRIMÔNIO TOTAL</span>
                <strong>{formatBRL(balance)}</strong>
                <span className="balance-caption">Valor estimado dos ativos na carteira</span>
              </div>
              <div className={`balance-performance ${profit >= 0 ? 'positive' : 'negative'}`}>
                <span>{profit >= 0 ? '↗' : '↘'}</span>
                {profit >= 0 ? '+' : ''}
                {profitRate.toFixed(1)}%<small>sobre o valor investido</small>
              </div>
            </section>

            <div className="summary-grid">
              <Card label="Valor investido" reference={<span>Somatório dos ativos</span>}>
                {formatBRL(invested)}
              </Card>
              <Card
                label="Resultado estimado"
                performance
                hasProfit={profit >= 0}
                reference={<span>Saldo menos valor investido</span>}
              >
                {profit >= 0 ? '+' : ''}
                {formatBRL(profit)}
              </Card>
              <Card label="Ativos na carteira" reference={<span>Moedas acompanhadas</span>}>
                {portfolio.length}
              </Card>
            </div>

            <section className="data-section">
              <div className="section-heading">
                <div>
                  <h2>Seus ativos</h2>
                  <p>Posições e desempenho por moeda</p>
                </div>
                <span className="count-pill">{portfolio.length} ativos</span>
              </div>
              <div className="data-panel">
                <div className="coin-table-head" aria-hidden="true">
                  <span>ATIVO</span>
                  <span>QUANTIDADE</span>
                  <span>PREÇO</span>
                  <span>INVESTIDO</span>
                  <span>SALDO</span>
                  <span>RESULTADO</span>
                </div>
                {portfolio.length ? (
                  portfolio.map((item) => (
                    <CoinPortfolio key={item.symbol} color={item.color} data={item} />
                  ))
                ) : (
                  <div className="empty-row">Nenhum ativo encontrado na carteira.</div>
                )}
              </div>
              <p className="data-note">Valores estimados com base nas cotações disponíveis.</p>
            </section>
          </>
        )}
      </div>
    </div>
  )
}
