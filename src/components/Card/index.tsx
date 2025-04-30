'use client'

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
  reference?: string
}) => {
  return (
    <div className="card">
      <p className="label">{label}</p>
      <p className={`value ${performance ? (hasProfit ? 'text-green-500' : 'text-red-500') : ''}`}>
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
