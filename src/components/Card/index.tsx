'use client'

import { ReactNode } from 'react'

const Card = ({
  label,
  children,
  performance = false,
  hasProfit = false,
  reference,
}: {
  label: string
  children: string | number
  hasProfit?: boolean
  performance?: boolean
  reference?: string | ReactNode
}) => {
  return (
    <div className="card">
      <p className="label">{label}</p>
      <p
        className={`value flex justify-between items-baseline ${performance ? (hasProfit ? 'text-green-500' : 'text-red-500') : ''}`}
      >
        {children}
        {reference && (
          <>
            {' '}
            <span className="text-sm">{reference}</span>
          </>
        )}
      </p>
    </div>
  )
}

export default Card
