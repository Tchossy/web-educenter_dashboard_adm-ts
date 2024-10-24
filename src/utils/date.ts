// import moment, { Moment } from 'moment'
// import { Timestamp } from 'firebase/firestore'

// export function formatDateFromFirestore(
//   timestamp: any | Moment | Date,
//   formato: string
// ): string {
//   const momentDate = moment(timestamp.toDate())
//   return momentDate.format(formato)
// }
// export function formatDateTimestampToSting(
//   timestamp: Timestamp | Date | any
// ): string {
//   const timestampDate = (timestamp as Timestamp).toDate()
//   const formattedDate = timestampDate?.toISOString().split('T')[0]
//   return formattedDate
// }

export const toDay = new Date().toISOString().split('T')[0]

// Função para converter o horário para minutos totais
export function convertTimeToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number)
  return hours * 60 + minutes
}

const now = new Date()
const hours = String(now.getHours()).padStart(2, '0')
const minutes = String(now.getMinutes()).padStart(2, '0')
export const fullTime = `${hours}:${minutes}`
