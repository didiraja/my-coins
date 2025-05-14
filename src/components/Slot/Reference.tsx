import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
}

const TargetPrice = ({ children, className }: Props) => {
  return <p className={`text-xs ${className}`}>{children}</p>
}

export default TargetPrice
