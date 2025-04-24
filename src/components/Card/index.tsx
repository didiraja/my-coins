'use client'

import S from './Card.module.css'

const Card = ({
  label,
  children,
  profit,
}: {
  label: string
  children: string
  profit?: boolean
}) => {
  return (
    <div className="bg-white text-black rounded-md p-2 text-xl">
      <p className="font-semibold">{label}</p>
      <p className={profit ? 'text-green-500' : 'text-red-500'}>{children}</p>
    </div>
  )
}

export default Card
