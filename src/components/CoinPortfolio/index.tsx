'use client'

import { formatBRL, formatUSD } from '@/libs/format'
import Card from '../Card'
import { Portfolio } from '@/types'
import TargetPrice from '../Slot/Reference'
import { profitClassName } from '@/libs/utils'

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
        <Card
          label="Token Price"
          reference={
            data.targetPrice ? (
              <div className="reference">
                <p>Target:</p>
                <TargetPrice>{formatUSD(data.targetPrice)}</TargetPrice>
              </div>
            ) : (
              false
            )
          }
        >
          {formatUSD(data.price)}
        </Card>

        {data.profit && (
          <Card
            label="Profit"
            performance
            hasProfit={data.profit?.hasProfit}
            reference={
              <div className="reference">
                <p>Pct:</p>
                <TargetPrice className={profitClassName(data.profit?.hasProfit)}>
                  {data.profit?.percentage}%
                </TargetPrice>
              </div>
            }
          >
            {formatBRL(data.profit?.value)}
          </Card>
        )}

        <Card
          label="Balance"
          performance={Boolean(data.profit)}
          hasProfit={data.profit?.hasProfit}
          reference={
            <div className="reference">
              <p>Entry:</p>
              <TargetPrice>{formatBRL(Number(data.investing.toFixed(2)))}</TargetPrice>
            </div>
          }
        >
          {formatBRL(data.balance)}
        </Card>
      </div>
    </div>
  )
}

export default CoinPortfolio
