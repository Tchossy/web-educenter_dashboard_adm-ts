// types.ts

export interface Student {
  id: number
  name: string
}

export interface Task {
  id: number
  studentId: number
  grade: number
  dateCreate: string // formato de data
}

export interface Exam {
  id: number
  studentId: number
  grade: number
  dateCreate: string
}

// mockData.ts

export const students: Student[] = [
  { id: 1, name: 'João Silva' },
  { id: 2, name: 'Maria Pereira' },
  { id: 3, name: 'Carlos Eduardo' }
]

export const tasks: Task[] = [
  { id: 1, studentId: 1, grade: 80, dateCreate: '2024-10-14' },
  { id: 2, studentId: 1, grade: 85, dateCreate: '2024-10-15' },
  { id: 3, studentId: 1, grade: 90, dateCreate: '2024-10-16' },
  { id: 4, studentId: 1, grade: 75, dateCreate: '2024-10-17' },
  { id: 5, studentId: 1, grade: 70, dateCreate: '2024-10-18' },
  { id: 6, studentId: 2, grade: 88, dateCreate: '2024-10-14' }
]

export const exams: Exam[] = [
  { id: 1, studentId: 1, grade: 99, dateCreate: '2024-10-18' },
  { id: 1, studentId: 1, grade: 92, dateCreate: '2024-10-19' },
  { id: 2, studentId: 2, grade: 80, dateCreate: '2024-10-19' }
]
