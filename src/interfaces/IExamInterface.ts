import { ExamStatusType } from '../types/enum'

export interface ExamInterface {
  id?: string
  image?: string
  name: string
  description: string

  course_id: string // Relacionamento com o curso
  module_id?: string // Relacionamento com o módulo (opcional)

  start_time: string // Data e hora do início
  end_time: string // Data e hora do fim
  date_exam: string // Data do exame

  mark: string //
  status: ExamStatusType // ex: "scheduled", "completed"
  date_create?: string
  date_update?: string
}
