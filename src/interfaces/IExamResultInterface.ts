import { ExamResultStatusType, ExamResultType } from '../types/enum'

export interface ExamResultInterface {
  id?: string
  exam_id: string // Relacionamento com o exame
  student_id: string // Relacionamento com o estudante
  score: string // Pontuação total

  status: ExamResultStatusType // ex: "checked" | "pending" | "sent"
  result: ExamResultType // ex: "approved", "failed", 'pending'

  feedback?: string // Comentários do professor

  submission_date: string
  date_create?: string
  date_update?: string
}
export interface ExamResultACreateInterface {
  exam_id: string
  student_id: string // Relacionamento com o estudante
  status?: ExamResultStatusType // ex: 'checked' | 'pending' | 'sent' | 'expired'
}
