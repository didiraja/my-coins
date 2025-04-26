'use client'

const Card = ({
  label,
  children,
  showProfit = false,
  profit,
}: {
  label: string
  children: string | number
  showProfit?: boolean
  profit?: boolean
}) => {
  return (
    <div className="bg-white text-black rounded-md p-2 text-xl">
      <p className="font-semibold">{label}</p>

      {showProfit ? (
        <p className={profit ? 'text-green-500' : 'text-red-500'}>{children}</p>
      ) : (
        <p className="">{children}</p>
      )}
    </div>
  )
}

export default Card
