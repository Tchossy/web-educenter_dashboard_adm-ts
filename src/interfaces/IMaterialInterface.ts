import { MaterialType } from '../types/enum'

export interface MaterialInterface {
  id?: string
  name: string
  description?: string
  course_id: string // Relacionamento com o curso
  module_id: string // Relacionamento com o módulo
  material_type: MaterialType // ex: "video", "pdf"
  file_url: string // URL para o material
  date_create?: string
  date_update?: string
}
