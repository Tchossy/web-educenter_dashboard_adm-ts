export interface ModuleInterface {
  id?: string
  name: string
  description?: string
  course_id: string // Relacionamento com o curso
  status: string // ex: "active", "inactive"
  date_create?: string
  date_update?: string
}
