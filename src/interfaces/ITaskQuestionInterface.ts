import { TaskQuestionType } from '../types/enum'
import { TaskQuestionOptionType } from '../types/option'

export interface TaskQuestionInterface {
  id?: string
  task_id: string // Relacionamento com o tarefa
  question_text: string
  question_type: TaskQuestionType // "multiple_choice", "short_answer", "image_upload"
  question_answer: string
  question_image?: string
  options?: TaskQuestionOptionType[] // Lista de opções se for múltipla escolha
  value: string // Valor da pergunta em pontos
  date_create?: string
  date_update?: string
}
