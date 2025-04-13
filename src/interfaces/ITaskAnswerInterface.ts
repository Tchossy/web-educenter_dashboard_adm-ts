export interface TaskAnswerInterface {
  id?: string
  task_id: string // Relacionamento com a tarefa
  student_id: string // Relacionamento com o estudante
  question_id: string // Relacionamento com a pergunta da tarefa
  question_title: string // Pergunta da tarefa
  answer: string // Resposta do estudante (texto da opção escolhida)
  mark: string // Cotação dada pela resposta
  is_correct?: boolean // Se a resposta foi correta ou não (dependendo da correção)
  submission_date: string // Data e hora da submissão da resposta
  date_create?: string
  date_update?: string
}
export interface TaskAnswerMarkInterface {
  task_id: string
  student_id: string
  question_id: string
  mark: string // Cotação dada pela resposta
  is_correct: boolean // Se a resposta foi correta ou não (dependendo da correção)
}
