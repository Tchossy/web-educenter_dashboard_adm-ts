import { ExamResultInterface } from '../interfaces/IExamResultInterface'
import { TaskSubmissionInterface } from '../interfaces/ITaskSubmissionInterface'
import { WeeklyAverageInterface } from '../interfaces/IWeeklyAverageInterface'
import { converter } from './converter'

// Função auxiliar para converter data no formato "dd/MM/yyyy" para um objeto Date
const parseDate = (dateString: string): Date => {
  const [day, month, year] = dateString.split('/').map(Number)
  return new Date(year, month - 1, day) // Mês começa de 0 no JavaScript
}

export const calculateWeeklyAverage = (
  tasks: TaskSubmissionInterface[],
  exams: ExamResultInterface[] | undefined,
  weekStart: string,
  weekEnd: string
): WeeklyAverageInterface | null => {
  // Converter weekStart e weekEnd diretamente para Date
  const startOfWeek = new Date(weekStart)
  const endOfWeek = new Date(weekEnd)

  // Certificar-se de que o startOfWeek começa à meia-noite e o endOfWeek inclui o final do dia
  startOfWeek.setHours(0, 0, 0, 0)
  endOfWeek.setHours(23, 59, 59, 999)

  // 1. Filtrar as tarefas da semana
  const filteredTasks = tasks.filter(task => {
    const submissionDate = parseDate(task.date_create as string)
    return submissionDate >= startOfWeek && submissionDate <= endOfWeek
  })

  // 2. Filtrar as provas da semana
  const filteredExams = exams?.filter(exam => {
    const examDate = parseDate(exam.date_create as string)
    return examDate >= startOfWeek && examDate <= endOfWeek
  })

  // 3. Pegar a prova mais recente dentro do intervalo
  const latestExam = filteredExams?.reduce((latest, current) => {
    return parseDate(current.date_create as string) >
      parseDate(latest.date_create as string)
      ? current
      : latest
  }, filteredExams[0])

  // Verifica se há tarefas e uma prova válida para calcular a média
  // if (!filteredTasks.length || !latestExam) {
  //   return null // Sem tarefas ou exames disponíveis para calcular a média
  // }

  // 4. Calcular a média das tarefas
  const totalTaskGrade = filteredTasks.reduce((sum, task) => {
    const grade = task.grade ? parseFloat(task.grade) : 0
    return sum + grade
  }, 0)

  const taskAverage =
    filteredTasks.length > 0 ? totalTaskGrade / filteredTasks.length : 0

  // 5. Nota da prova mais recente
  const examGrade = latestExam?.score ? parseFloat(latestExam?.score) : 0

  // 6. Calcular a média semanal (20% tarefas, 80% exame)
  const weeklyAverage = taskAverage * 0.2 + examGrade * 0.8

  // 7. Definir status (Aprovado/Reprovado)
  const status = weeklyAverage >= 74.5 ? 'approved' : 'failed'

  // 8. Retornar o objeto com os dados da média semanal
  return {
    week_start: weekStart,
    week_end: weekEnd,
    task_average: converter.numberToString(taskAverage),
    exam_grade: converter.numberToString(examGrade),
    weekly_average: converter.numberToString(weeklyAverage),
    status: status
  }
}
