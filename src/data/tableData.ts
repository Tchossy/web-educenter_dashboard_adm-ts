import { CourseInterface } from '../interfaces/ICourseInterface'
import { ExamAnswerInterface } from '../interfaces/IExamAnswerInterface'
import { ExamInterface } from '../interfaces/IExamInterface'
import { ExamQuestionInterface } from '../interfaces/IExamQuestionInterface'
import { ExamResultInterface } from '../interfaces/IExamResultInterface'
import { MaterialInterface } from '../interfaces/IMaterialInterface'
import { ModuleInterface } from '../interfaces/IModuleInterface'
import { TaskInterface } from '../interfaces/ITaskInterface'
import { TaskSubmissionInterface } from '../interfaces/ITaskSubmissionInterface'

export const professorData = [
  {
    id: '1',
    photo: 'https://randomuser.me/api/portraits/men/1.jpg',
    first_name: 'Carlos',
    last_name: 'Mendes',
    phone: '923567891',
    email: 'carlos.mendes@example.com',
    status: 'active',
    gender: 'male',
    course_id: '1', // Refere-se a um curso específico
    date_create: '10/08/2023'
  },
  {
    id: '2',
    photo: 'https://randomuser.me/api/portraits/women/2.jpg',
    first_name: 'Ana',
    last_name: 'Pereira',
    phone: '923987654',
    email: 'ana.pereira@example.com',
    status: 'inactive',
    gender: 'female',
    course_id: '2',
    date_create: '12/08/2023'
  }
]

export const studentData = [
  {
    id: '1',
    photo: 'https://randomuser.me/api/portraits/men/10.jpg',
    first_name: 'João',
    last_name: 'Silva',
    phone: '923567891',
    email: 'joao.silva@example.com',
    status: 'active',
    gender: 'male',
    course_id: '1', // Deve corresponder a um curso existente
    date_create: '01/09/2023'
  },
  {
    id: '2',
    photo: 'https://randomuser.me/api/portraits/women/11.jpg',
    first_name: 'Maria',
    last_name: 'Fernandes',
    phone: '923654987',
    email: 'maria.fernandes@example.com',
    status: 'active',
    gender: 'female',
    course_id: '2',
    date_create: '08/09/2023'
  }
]

export const courseData: CourseInterface[] = [
  {
    id: '1',
    name: 'Desenvolvimento Web',
    description:
      'Curso completo de Desenvolvimento Web com foco em HTML, CSS, JavaScript e frameworks modernos.',
    image:
      'https://jessup.edu/wp-content/uploads/2024/01/Is-Web-Development-Oversaturated.jpg',
    duration: 24, // semanas
    status: 'active',
    date_create: '2023-12-01',
    date_update: '2024-01-10'
  },
  {
    id: '2',
    name: 'Data Science',
    description:
      'Curso de ciência de dados com foco em Python, análise de dados e aprendizado de máquina.',
    image:
      'https://assets.techrepublic.com/uploads/2023/12/tr_20231215-what-is-data-science.jpg',
    duration: 36, // semanas
    status: 'active',
    date_create: '2023-12-10',
    date_update: '2024-02-01'
  }
]

export const moduleData: ModuleInterface[] = [
  {
    id: '1',
    name: 'Fundamentos da Web',
    description:
      'Este módulo aborda os princípios básicos do desenvolvimento web, incluindo HTML, CSS e JavaScript.',
    course_id: '1', // Relacionado ao curso "Desenvolvimento Web"
    status: 'active',
    date_create: '2024-01-15',
    date_update: '2024-01-15'
  },
  {
    id: '2',
    name: 'Frameworks JavaScript',
    description: 'Introdução a frameworks como React e Vue.js.',
    course_id: '1',
    status: 'active',
    date_create: '2024-02-15',
    date_update: '2024-02-15'
  },
  {
    id: '3',
    name: 'Estatística para Data Science',
    description:
      'Módulo dedicado às técnicas estatísticas para análise de dados.',
    course_id: '2', // Relacionado ao curso "Data Science"
    status: 'active',
    date_create: '2024-03-01',
    date_update: '2024-03-01'
  }
]

export const materialData: MaterialInterface[] = [
  {
    id: '1',
    name: 'Introdução ao HTML',
    description: 'Apostila em PDF sobre a introdução ao HTML para iniciantes.',
    course_id: '1',
    module_id: '1', // Relacionado ao módulo "Fundamentos da Web"
    material_type: 'pdf',
    file_url: 'https://example.com/html-intro.pdf',
    date_create: '2024-01-16',
    date_update: '2024-01-16'
  },
  {
    id: '2',
    name: 'Aula sobre Análise de Dados',
    description:
      'Vídeo explicando os primeiros passos na análise de dados com Python.',
    course_id: '2',
    module_id: '3', // Relacionado ao módulo "Estatística para Data Science"
    material_type: 'video',
    file_url: 'https://example.com/data-analysis.mp4',
    date_create: '2024-02-05',
    date_update: '2024-02-05'
  }
]

export const examData: ExamInterface[] = [
  {
    id: '1',
    image:
      'https://s4.static.brasilescola.uol.com.br/be/2022/11/ilustracao-de-varios-elementos-caracteristicos-da-matematica-calculadora-grafico-compasso-numero-pi-cone-lapis-etc.jpg',
    name: 'Final Exam - Matemática',
    description: 'Final Exam - Matemática',
    course_id: '1',
    module_id: '1',
    start_time: '12:00',
    end_time: '13:30',
    date_exam: '2024-10-20',
    mark: '100',
    status: 'completed',
    date_create: '2024-01-05'
  },
  {
    id: '2',
    image:
      'https://s4.static.brasilescola.uol.com.br/be/2022/11/ilustracao-de-varios-elementos-caracteristicos-da-matematica-calculadora-grafico-compasso-numero-pi-cone-lapis-etc.jpg',
    name: 'Midterm - Física',
    description: 'Midterm - Física',
    course_id: '2',
    module_id: '3',
    start_time: '12:00',
    end_time: '13:30',
    date_exam: '2024-12-10',
    mark: '80',
    status: 'completed',
    date_create: '2024-02-10'
  }
]

export const examQuestions: ExamQuestionInterface[] = [
  {
    id: '1',
    exam_id: '1',
    question_text: 'Qual é a capital da França?',
    value: '1',
    question_type: 'short_answer',
    options: [] // Sem opções, pois é resposta curta
  },
  {
    id: '2',
    exam_id: '1',
    question_text: 'Qual destes é um animal?',
    value: '2',
    question_type: 'multiple_choice',
    options: [
      { text: 'Cadeira', is_valid: false },
      { text: 'Gato', is_valid: true },
      { text: 'Carro', is_valid: false }
    ]
  },
  {
    id: '3',
    exam_id: '1',
    question_text: 'Faça upload de uma imagem do seu documento',
    value: '3',
    question_type: 'image_upload',
    options: [] // Sem opções, pois é upload de imagem
  },
  {
    id: '4',
    exam_id: '1',
    question_text: 'Complete a frase: O céu é...',
    value: '4',
    question_type: 'short_answer',
    options: [] // Resposta curta
  },
  {
    id: '5',
    exam_id: '1',
    question_text: 'Qual cor você prefere?',
    value: '5',
    question_type: 'multiple_choice',
    options: [
      { text: 'Vermelho', is_valid: true },
      { text: 'Azul', is_valid: false },
      { text: 'Verde', is_valid: false }
    ]
  }
]
export const examAnswers: ExamAnswerInterface[] = [
  {
    id: '1',
    exam_id: '1',
    student_id: '1001',
    question_id: '1',
    question_title: 'Qual é a capital da França?',
    answer: 'Paris',
    mark: '1',
    is_correct: true,
    submission_date: '2024-10-09T10:15:00',
    date_create: '2024-10-09T09:00:00',
    date_update: '2024-10-09T10:30:00'
  },
  {
    id: '2',
    exam_id: '1',
    student_id: '1001',
    question_id: '2',
    question_title: 'Qual destes é um animal?',
    answer: 'Mota',
    mark: '2',
    is_correct: false,
    submission_date: '2024-10-09T10:18:00',
    date_create: '2024-10-09T09:00:00',
    date_update: '2024-10-09T10:30:00'
  },
  {
    id: '3',
    exam_id: '1',
    student_id: '1001',
    question_id: '3',
    question_title: 'Faça upload de uma imagem do seu documento',
    answer: 'image_link.png', // Simulação do link de uma imagem
    mark: '3',
    is_correct: true,
    submission_date: '2024-10-09T10:20:00',
    date_create: '2024-10-09T09:00:00',
    date_update: '2024-10-09T10:30:00'
  },
  {
    id: '4',
    exam_id: '1',
    student_id: '1001',
    question_id: '4',
    question_title: 'Complete a frase: O céu é...',
    answer: 'Preto',
    mark: '4',
    is_correct: false,
    submission_date: '2024-10-09T10:22:00',
    date_create: '2024-10-09T09:00:00',
    date_update: '2024-10-09T10:30:00'
  },
  {
    id: '5',
    exam_id: '1',
    student_id: '1001',
    question_id: '5',
    question_title: 'Qual cor você prefere?',
    answer: 'Vermelho',
    mark: '5',
    is_correct: true,
    submission_date: '2024-10-09T10:25:00',
    date_create: '2024-10-09T09:00:00',
    date_update: '2024-10-09T10:30:00'
  }
]

export const examResultData: ExamResultInterface[] = [
  {
    id: '1',
    exam_id: '1',
    student_id: '2',
    score: 85,
    result: 'approved',
    status: 'checked',
    submission_date: '2024-12-15'
  },
  {
    id: '2',
    exam_id: '2',
    student_id: '3',
    score: 45,
    result: 'pending',
    status: 'pending',
    submission_date: '2024-11-20'
  }
]

export const taskData: TaskInterface[] = [
  {
    id: '1',
    image:
      'https://s4.static.brasilescola.uol.com.br/be/2022/11/ilustracao-de-varios-elementos-caracteristicos-da-matematica-calculadora-grafico-compasso-numero-pi-cone-lapis-etc.jpg',
    name: 'Trabalho de pesquisa - História',
    mark: '100',
    course_id: '1',
    module_id: '2',
    task_type: 'online',
    status: 'closed',
    due_date: '2024-10-15',
    date_create: '2024-09-10'
  },
  {
    id: '2',
    image:
      'https://s4.static.brasilescola.uol.com.br/be/2022/11/ilustracao-de-varios-elementos-caracteristicos-da-matematica-calculadora-grafico-compasso-numero-pi-cone-lapis-etc.jpg',
    name: 'Projeto de Ciências',
    mark: '100',
    course_id: '2',
    module_id: '1',
    task_type: 'upload',
    status: 'open',
    due_date: '2024-11-01',
    date_create: '2024-09-20'
  }
]

export const taskSubmissionData: TaskSubmissionInterface[] = [
  {
    id: '1',
    task_id: '1',
    student_id: '2',
    grade: '80',
    result: 'approved',
    submission_date: '2024-10-10',
    status: 'graded',
    date_create: '2024-10-11'
  },
  {
    id: '2',
    task_id: '2',
    student_id: '3',
    grade: '75',
    result: 'pending',
    submission_date: '2024-10-30',
    status: 'pending',
    date_create: '2024-10-31'
  }
]
