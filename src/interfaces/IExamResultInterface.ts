import { ExamResultType } from '../types/enum'

export interface ExamResultInterface {
  id?: string
  exam_id: string // Relacionamento com o exame
  student_id: string // Relacionamento com o estudante
  score: number // Pontuação total

  status: string // ex: "marked", "pending"
  result: ExamResultType // ex: "approved", "failed", 'pending'

  feedback?: string // Comentários do professor

  submission_date: string
  date_create?: string
  date_update?: string
}
