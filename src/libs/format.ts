import { format } from 'date-fns'

export const showReadableDate = (dateTime: string) => {
  return format(dateTime, 'dd/MM/yy')
}
