export interface ExamAnswerInterface {
  id?: string
  exam_id: string // Relacionamento com o exame
  student_id: string // Relacionamento com o estudante
  question_id: string // Relacionamento com a pergunta do exame
  question_title: string // Pergunta do exame
  answer: string // Resposta do estudante (texto da opção escolhida)
  mark: string // Cotação dada pela resposta
  is_correct?: boolean // Se a resposta foi correta ou não (dependendo da correção)
  submission_date: string // Data e hora da submissão da resposta
  date_create?: string
  date_update?: string
}
