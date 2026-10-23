import { formatBRL, formatGenericAmount, formatUSD } from '@/libs/format'
import { Portfolio } from '@/types'
import './style.scss'

export default function CoinPortfolio({ data, color }: { color: string; data: Portfolio }) {
  const performance = data.profit
  const isPositive = performance?.hasProfit ?? false

  return (
    <div className="coin-row">
      <div className="coin-identity">
        <span className={`coin-icon ${color}`} aria-hidden="true">
          {data.symbol.slice(0, 1)}
        </span>
        <div className="coin-name-group">
          <span className="coin-name">{data.name}</span>
          <span className="coin-symbol">{data.symbol}</span>
        </div>
      </div>
      <div className="coin-cell coin-hold" data-label="Quantidade">
        {formatGenericAmount(data.hold)} <span>{data.symbol}</span>
      </div>
      <div className="coin-cell coin-price" data-label="Preço">
        {formatUSD(data.price)}
        {data.targetPrice && <small>Meta {formatUSD(data.targetPrice)}</small>}
      </div>
      <div className="coin-cell coin-invested" data-label="Investido">
        {formatBRL(data.investing)}
      </div>
      <div className="coin-cell coin-balance" data-label="Saldo">
        {formatBRL(data.balance)}
      </div>
      <div className="coin-cell coin-performance" data-label="Resultado">
        {performance ? (
          <>
            <span className={isPositive ? 'positive' : 'negative'}>
              {isPositive ? '+' : ''}
              {formatBRL(performance.value)}
            </span>
            <small className={isPositive ? 'positive' : 'negative'}>
              {isPositive ? '+' : ''}
              {performance.percentage}%
            </small>
          </>
        ) : (
          <span className="muted">—</span>
        )}
      </div>
    </div>
  )
}
