export interface ProfessorInterface {
  id?: string
  photo?: string
  first_name: string
  last_name: string
  phone: string
  email: string
  gender?: string
  status: string // ex: "active", "inactive"
  password?: string
  date_create?: string
  date_update?: string
}
