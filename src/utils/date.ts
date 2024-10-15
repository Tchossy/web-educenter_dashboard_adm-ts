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
