export interface CourseInterface {
  id?: string
  image: string
  name: string
  description?: string
  duration: number // em semanas ou meses
  status: string // ex: "active", "completed"
  date_create?: string
  date_update?: string
}
