export interface StudentInterface {
  id?: string
  photo?: string
  first_name: string
  last_name: string
  phone: string
  email: string
  gender?: string
  date_of_birth?: string
  course_id: string // Relacionamento com o curso
  module_id?: string // Relacionamento com a especialidade
  status: string // ex: "active", "inactive"
  password?: string
  date_create?: string
  date_update?: string
}
