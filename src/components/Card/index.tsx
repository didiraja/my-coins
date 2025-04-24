'use client'

import S from './Card.module.css'

const Card = ({ label, children }: { label: string; children: string }) => {
  return (
    <div className={S.card}>
      <p className={S.label}>{label}</p>
      <p className={S.value}>{children}</p>
    </div>
  )
}

export default Card
