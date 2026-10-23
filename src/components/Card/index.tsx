import { ReactNode } from 'react'
import './style.scss'

const Card = ({
  label,
  children,
  performance = false,
  hasProfit = false,
  reference,
  className,
}: {
  label: string
  children: ReactNode
  className?: string
  hasProfit?: boolean
  performance?: boolean
  reference?: string | ReactNode
}) => {
  return (
    <div className={`card ${className ?? ''}`}>
      <p className="label">{label}</p>
      <p className={`value ${performance ? (hasProfit ? 'positive' : 'negative') : ''}`}>
        {children}
      </p>
      {reference && <div className="reference">{reference}</div>}
    </div>
  )
}

export default Card
