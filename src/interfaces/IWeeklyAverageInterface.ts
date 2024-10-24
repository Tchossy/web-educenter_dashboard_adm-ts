export interface WeeklyAverageInterface {
  id?: string
  student_id?: string
  week_start: string // formato de data
  week_end: string // formato de data
  task_average: string
  exam_grade: string
  weekly_average: string
  status: 'failed' | 'approved'
  date_create?: string
  date_update?: string
}
