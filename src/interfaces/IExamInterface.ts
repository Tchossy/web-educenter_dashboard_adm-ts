import { ExamQuestionType, ExamStatusType } from '../types/enum'

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

// Tipagem para os dados do exame
export interface ExamData {
  id?: string
  exam_id: string
  title: string
  description?: string
  start_time: string
  end_time: string
}

// Tipagem para as opções das perguntas de múltipla escolha
export interface ExamQuestionOptionType {
  text: string
  is_valid: boolean
}

// Tipagem para as perguntas do exame
export interface ExamQuestionInterface {
  id: string
  exam_id: string
  question_text: string
  question_type: ExamQuestionType
  question_answer?: string
  question_image?: string
  options?: ExamQuestionOptionType[]
  value: string // Valor da pergunta em pontos
}
