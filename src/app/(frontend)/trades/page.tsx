import { getPayload } from 'payload'
import React from 'react'
import config from '@/payload.config'
import { Coin } from '@/payload-types'
import { formatGenericAmount, showReadableDate } from '@/libs/format'

export default async function TradesRoute() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const tradesList = await payload.find({ collection: 'trade', sort: '-tradeDate', limit: 99 })

  return (
    <div className="page-content">
      <div className="page-topbar">
        <span>Workspace</span>
        <span className="breadcrumb-separator">/</span>
        <strong>Operações</strong>
        <span className="topbar-badge">Histórico</span>
      </div>
      <div className="page-body">
        <header className="page-heading">
          <div>
            <div className="eyebrow">
              <span className="status-dot" /> ATIVIDADE
            </div>
            <h1>Operações</h1>
            <p>Histórico das movimentações registradas na sua carteira.</p>
          </div>
          <span className="count-pill">{tradesList.totalDocs} registros</span>
        </header>

        <section className="data-section trades-section">
          <div className="section-heading">
            <div>
              <h2>Histórico recente</h2>
              <p>Últimas operações, da mais recente para a mais antiga</p>
            </div>
          </div>
          <div className="data-panel">
            <div className="trade-table-head" aria-hidden="true">
              <span>DATA</span>
              <span>ENTRADA</span>
              <span>SAÍDA</span>
              <span>TIPO</span>
            </div>
            {tradesList.docs.length ? (
              tradesList.docs.map((trade) => (
                <div className="trade-row" key={trade.id}>
                  <time dateTime={trade.tradeDate}>{showReadableDate(trade.tradeDate)}</time>
                  <div className="trade-amount">
                    <strong>{formatGenericAmount(trade.amountIn)}</strong>
                    <span>{(trade.coinIn as Coin).coin.toUpperCase()}</span>
                  </div>
                  <div className="trade-amount">
                    <strong>{formatGenericAmount(trade.amountOut)}</strong>
                    <span>{(trade.coinOut as Coin).coin.toUpperCase()}</span>
                  </div>
                  <span className="trade-tag">Troca</span>
                </div>
              ))
            ) : (
              <div className="empty-row">Nenhuma operação registrada ainda.</div>
            )}
          </div>
          {tradesList.hasNextPage && (
            <p className="data-note">Exibindo as 99 operações mais recentes.</p>
          )}
        </section>
      </div>
    </div>
  )
}
