'use client'

import { profitClassName } from '@/libs/utils'
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
  children: string | number
  className?: string
  hasProfit?: boolean
  performance?: boolean
  reference?: string | ReactNode
}) => {
  return (
    <div className={`card ${className ?? ''}`}>
      <p className="label">{label}</p>
      <p className={`value ${performance ? profitClassName(hasProfit) : ''}`}>{children}</p>
      {reference}
    </div>
  )
}

export default Card
