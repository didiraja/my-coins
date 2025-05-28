import { format } from 'date-fns'

export const showReadableDate = (dateTime: string) => {
  return format(dateTime, 'dd/MM/yy')
}

export const formatBRL = (amount: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(amount)
}

export const formatUSD = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

export const formatGenericAmount = (amount: number) => {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  }).format(amount)
}

export const formatProfitRate = ({ invested, balance }: { invested: number; balance: number }) => {
  if (!invested || balance === invested) return 0

  return Math.floor(((balance - invested) / invested) * 100)
}
