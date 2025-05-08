'use client'

import { formatBRL, formatUSD } from '@/libs/format'
import Card from '../Card'
import { Portfolio } from '@/types'

const CoinPortfolio = ({ color = 'bg-gray-400', data }: { color: string; data: Portfolio }) => {
  return (
    <div className="coin-wrapper">
      <div className="coin-title">
        <div className={`coin-icon ${color}`} />
        <p className="label">
          {data.name}{' '}
          <span className="text-sm">
            {data.symbol} {data.hold}
          </span>
        </p>
      </div>

      <div className="wallet-data">
        <Card label="Token Price">{formatUSD(data.price)}</Card>

        <Card
          label="Profit"
          performance
          hasProfit={data.profit.hasProfit}
          reference={`+${data.profit.percentage}%`}
        >
          {formatBRL(data.profit.value)}
        </Card>

        <Card label="Balance" performance hasProfit={data.profit.hasProfit}>
          {formatBRL(data.balance)}
        </Card>
      </div>
    </div>
  )
}

export default CoinPortfolio
