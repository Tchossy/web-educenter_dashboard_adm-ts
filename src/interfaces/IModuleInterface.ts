export interface ModuleInterface {
  id?: string
  name: string
  description?: string
  course_id: string // Relacionamento com o curso
  status: 'inactive' | 'active' // ex: "active", "inactive"
  date_create?: string
  date_update?: string
}
