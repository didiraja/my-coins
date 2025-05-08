import { ReactNode } from 'react'

type Props = {
  value: string | false
}

const TargetPrice = ({ value }: Props): ReactNode | false => {
  if (!value) return false

  return <span className="font-medium">{value}</span>
}

export default TargetPrice
