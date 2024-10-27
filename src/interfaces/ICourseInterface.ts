import { CourseStatusType } from '../types/enum'

export interface CourseInterface {
  id?: string
  image: string
  name: string
  description?: string
  duration: number // em semanas ou meses
  status: CourseStatusType // ex: "active", "inactive"
  date_create?: string
  date_update?: string
}
