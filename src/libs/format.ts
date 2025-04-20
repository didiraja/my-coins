import { format } from 'date-fns'

export const showReadableDate = (dateTime: string) => {
  return format(dateTime, 'dd/MM/yy')
}

export const formatBRL = (number: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(number)
}

export const formatUSD = (number: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(number)
}
