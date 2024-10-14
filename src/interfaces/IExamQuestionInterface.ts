import { ExamQuestionType } from '../types/enum'
import { ExamQuestionOptionType } from '../types/option'

export interface ExamQuestionInterface {
  id?: string
  exam_id: string // Relacionamento com o exame
  question_text: string
  question_type: ExamQuestionType // "multiple_choice", "short_answer", "image_upload"
  options?: ExamQuestionOptionType[] // Lista de opções se for múltipla escolha
  value: string // Valor da pergunta em pontos
  date_create?: string
  date_update?: string
}
