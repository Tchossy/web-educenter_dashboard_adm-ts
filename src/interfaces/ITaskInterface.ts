export interface TaskInterface {
  id?: string
  image: string
  name: string
  description?: string

  course_id: string // Relacionamento com o curso
  module_id?: string // Relacionamento com o módulo
  mark: string // Nota que a tarefa vale

  task_type: string // "online", "upload"
  due_date: string // Data limite
  status: string // ex: "active", "inactive"

  file_url?: string // URL para o PDF ou instruções (caso seja uma tarefa de upload)

  date_create?: string
  date_update?: string
}
