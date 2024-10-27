import { TaskResultType, TaskResultStatusType } from '../types/enum'

export interface TaskSubmissionInterface {
  id?: string
  task_id: string // Relacionamento com a tarefa
  student_id: string // Relacionamento com o estudante

  submission_text?: string // Caso seja uma resposta online
  submission_url?: string // URL para o PDF ou documento submetido
  result: TaskResultType // ex: "approved", "failed", "sufficient" 'pending'

  feedback?: string // Comentários do professor

  submission_date: string
  grade?: string // Nota atribuída
  status: TaskResultStatusType // ex: "pending", "graded"
  date_create?: string
  date_update?: string
}
