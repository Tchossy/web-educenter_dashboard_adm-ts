export type GenderType = 'male' | 'female'

export type CourseStatusType = 'active' | 'inactive'

export type TaskType = 'online' | 'upload'
export type TaskStatusType = 'open' | 'closed' | 'pending'
export type TaskResultStatusType = 'graded' | 'pending'
export type TaskResultType = 'approved' | 'failed' | 'sufficient' | 'pending'

export type ExamStatusType = 'scheduled' | 'completed'
export type ExamResultType = 'approved' | 'failed' | 'pending'
export type ExamResultStatusType = 'checked' | 'pending' | 'sent' | 'expired'
export type ExamQuestionType =
  | 'multiple_choice'
  | 'short_answer'
  | 'image_upload'

export type TaskQuestionType =
  | 'multiple_choice'
  | 'short_answer'
  | 'image_upload'

export type MaterialType = 'video' | 'pdf'
