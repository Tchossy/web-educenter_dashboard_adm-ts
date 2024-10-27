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

// Course
export const courseData: CourseInterface[] = [
  {
    id: '1',
    image:
      'https://images.unsplash.com/photo-1517632298125-c84c9d9bdf5d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    name: 'Curso de Fluidos de Perfuração e Completação de Poços de Petróleo e Gás',
    description:
      'Scientist less choose receive under camera. May nice personal might business stock.\nType across address. Long painting should short brother guy all. Production not relate argue.',
    duration: 6,
    status: 'active'
  },
  {
    id: '2',
    image:
      'https://images.unsplash.com/photo-1581091215367-1b61af02d27f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    name: 'Curso de Higiene, Saúde e Segurança no Trabalho',
    description:
      'Cold everyone fill bank he response her. Evidence kitchen catch reason land. Set again significant result daughter must. Fear add current forward.',
    duration: 8,
    status: 'inactive'
  },
  {
    id: '3',
    image:
      'https://images.unsplash.com/photo-1537432376769-00a1c4216b3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    name: 'BASIC MUD SCHOOL',
    description:
      'Particular will concern national property. Medical cause base line nearly final really.\nTogether food tax check keep budget. Your program truth many daughter report between.',
    duration: 4,
    status: 'active'
  },
  {
    id: '4',
    image:
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    name: 'Curso de Engenharia de Petróleo',
    description:
      'Work significant fly instead state image. Quite loss sure in many agree study.\nHospital available alone avoid. Same ask rock factor something. Father dinner all operation chair magazine sit grow.',
    duration: 12,
    status: 'active'
  },
  {
    id: '5',
    image:
      'https://images.unsplash.com/photo-1573497491208-6b1acb260507?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    name: 'Curso de Gestão de Projetos em Energia',
    description:
      'Work challenge strong think. Western figure old environmental. Figure exist fund just might thank job. Ready special whatever lead.',
    duration: 10,
    status: 'inactive'
  }
]

// Module
export const moduleData: ModuleInterface[] = [
  {
    id: '1',
    name: 'Introdução',
    description: 'Visão geral do curso.',
    course_id: '1',
    status: 'inactive',
    date_create: '2022-07-12',
    date_update: '2000-10-12'
  },
  {
    id: '2',
    name: 'Teoria Avançada',
    description: 'Exploração de conceitos avançados.',
    course_id: '1',
    status: 'inactive',
    date_create: '1973-01-08',
    date_update: '1985-12-31'
  },
  {
    id: '3',
    name: 'Prática em Campo',
    description: 'Sessões práticas de campo.',
    course_id: '1',
    status: 'active',
    date_create: '2016-05-31',
    date_update: '2009-06-17'
  },
  {
    id: '4',
    name: 'Avaliação Final',
    description: 'Exame final e conclusão.',
    course_id: '1',
    status: 'active',
    date_create: '1989-02-04',
    date_update: '2004-02-22'
  },
  {
    id: '5',
    name: 'Introdução',
    description: 'Visão geral do curso.',
    course_id: '2',
    status: 'active',
    date_create: '2003-05-21',
    date_update: '2013-05-25'
  },
  {
    id: '6',
    name: 'Teoria Avançada',
    description: 'Exploração de conceitos avançados.',
    course_id: '2',
    status: 'active',
    date_create: '1998-06-20',
    date_update: '2021-06-09'
  },
  {
    id: '7',
    name: 'Prática em Campo',
    description: 'Sessões práticas de campo.',
    course_id: '2',
    status: 'active',
    date_create: '2018-09-20',
    date_update: '1970-09-30'
  },
  {
    id: '8',
    name: 'Avaliação Final',
    description: 'Exame final e conclusão.',
    course_id: '2',
    status: 'active',
    date_create: '1987-09-24',
    date_update: '1972-05-03'
  },
  {
    id: '9',
    name: 'Introdução',
    description: 'Visão geral do curso.',
    course_id: '3',
    status: 'inactive',
    date_create: '2010-06-14',
    date_update: '1997-05-06'
  },
  {
    id: '10',
    name: 'Teoria Avançada',
    description: 'Exploração de conceitos avançados.',
    course_id: '3',
    status: 'inactive',
    date_create: '1981-10-16',
    date_update: '1995-02-03'
  },
  {
    id: '11',
    name: 'Prática em Campo',
    description: 'Sessões práticas de campo.',
    course_id: '3',
    status: 'active',
    date_create: '1972-12-15',
    date_update: '1979-08-23'
  },
  {
    id: '12',
    name: 'Avaliação Final',
    description: 'Exame final e conclusão.',
    course_id: '3',
    status: 'active',
    date_create: '1993-08-05',
    date_update: '1982-01-21'
  },
  {
    id: '13',
    name: 'Introdução',
    description: 'Visão geral do curso.',
    course_id: '4',
    status: 'inactive',
    date_create: '2021-09-28',
    date_update: '2007-03-04'
  },
  {
    id: '14',
    name: 'Teoria Avançada',
    description: 'Exploração de conceitos avançados.',
    course_id: '4',
    status: 'active',
    date_create: '1985-02-01',
    date_update: '1995-09-09'
  },
  {
    id: '15',
    name: 'Prática em Campo',
    description: 'Sessões práticas de campo.',
    course_id: '4',
    status: 'active',
    date_create: '1982-02-24',
    date_update: '1998-06-09'
  },
  {
    id: '16',
    name: 'Avaliação Final',
    description: 'Exame final e conclusão.',
    course_id: '4',
    status: 'active',
    date_create: '1999-10-25',
    date_update: '1972-06-26'
  },
  {
    id: '17',
    name: 'Introdução',
    description: 'Visão geral do curso.',
    course_id: '5',
    status: 'inactive',
    date_create: '1980-03-11',
    date_update: '1982-01-07'
  },
  {
    id: '18',
    name: 'Teoria Avançada',
    description: 'Exploração de conceitos avançados.',
    course_id: '5',
    status: 'inactive',
    date_create: '1978-11-12',
    date_update: '2008-08-27'
  },
  {
    id: '19',
    name: 'Prática em Campo',
    description: 'Sessões práticas de campo.',
    course_id: '5',
    status: 'active',
    date_create: '2008-07-01',
    date_update: '1987-12-20'
  },
  {
    id: '20',
    name: 'Avaliação Final',
    description: 'Exame final e conclusão.',
    course_id: '5',
    status: 'active',
    date_create: '1993-07-12',
    date_update: '1972-04-28'
  }
]

// Material
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

// Exam
export const examData: ExamInterface[] = [
  {
    id: '1',
    image:
      'https://images.unsplash.com/photo-1600195077900-d97a6930f2b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwyMDg2OHwwfDF8c2VhcmNofDF8fGV4YW18ZW58MHx8fHwxNjI4MjU5OTY1&ixlib=rb-1.2.1&q=80&w=944',
    name: 'Exame Final',
    description: 'Exame abrangente dos conteúdos do módulo.',
    course_id: '1',
    module_id: '1',
    start_time: '05:16',
    end_time: '10:16',
    date_exam: '2024-10-22',
    mark: '81',
    status: 'scheduled'
  },
  {
    id: '2',
    image:
      'https://images.unsplash.com/photo-1502767089025-6572583495a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwyMDg2OHwwfDF8c2VhcmNofDF8fGV4YW18ZW58MHx8fHwxNjI4MjU5OTY1&ixlib=rb-1.2.1&q=80&w=97',
    name: 'Exame Intermediário',
    description: 'Avaliação intermediária para revisão dos conceitos.',
    course_id: '1',
    module_id: '2',
    start_time: '08:30',
    end_time: '12:45',
    date_exam: '2024-10-28',
    mark: '78',
    status: 'scheduled'
  },
  {
    id: '3',
    image:
      'https://images.unsplash.com/photo-1521747116042-5a810fda9664?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwyMDg2OHwwfDF8c2VhcmNofDF8fGV4YW18ZW58MHx8fHwxNjI4MjU5OTY1&ixlib=rb-1.2.1&q=80&w=647',
    name: 'Exame Teórico',
    description: 'Exame teórico de conceitos básicos.',
    course_id: '1',
    module_id: '3',
    start_time: '13:15',
    end_time: '15:45',
    date_exam: '2024-11-05',
    mark: '57',
    status: 'completed'
  },
  {
    id: '4',
    image:
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwyMDg2OHwwfDF8c2VhcmNofDF8fGV4YW18ZW58MHx8fHwxNjI4MjU5OTY1&ixlib=rb-1.2.1&q=80&w=536',
    name: 'Exame Prático',
    description: 'Avaliação prática do conhecimento adquirido.',
    course_id: '1',
    module_id: '4',
    start_time: '09:00',
    end_time: '11:30',
    date_exam: '2024-11-12',
    mark: '90',
    status: 'scheduled'
  },
  {
    id: '5',
    image:
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwyMDg2OHwwfDF8c2VhcmNofDF8fGV4YW18ZW58MHx8fHwxNjI4MjU5OTY1&ixlib=rb-1.2.1&q=80&w=952',
    name: 'Avaliação Final',
    description: 'Avaliação final do módulo.',
    course_id: '2',
    module_id: '5',
    start_time: '07:45',
    end_time: '10:30',
    date_exam: '2024-11-18',
    mark: '86',
    status: 'completed'
  },
  {
    id: '6',
    image:
      'https://images.unsplash.com/photo-1512446733611-9099a758e8f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwyMDg2OHwwfDF8c2VhcmNofDF8fGV4YW18ZW58MHx8fHwxNjI4MjU5OTY1&ixlib=rb-1.2.1&q=80&w=345',
    name: 'Exame Prático',
    description: 'Exame prático do módulo avançado.',
    course_id: '2',
    module_id: '6',
    start_time: '14:20',
    end_time: '17:00',
    date_exam: '2024-11-25',
    mark: '84',
    status: 'completed'
  },
  {
    id: '7',
    image:
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwyMDg2OHwwfDF8c2VhcmNofDF8fGV4YW18ZW58MHx8fHwxNjI4MjU5OTY1&ixlib=rb-1.2.1&q=80&w=904',
    name: 'Exame de Revisão',
    description: 'Avaliação de revisão dos conceitos do curso.',
    course_id: '2',
    module_id: '7',
    start_time: '06:00',
    end_time: '09:15',
    date_exam: '2024-12-02',
    mark: '92',
    status: 'scheduled'
  },
  {
    id: '8',
    image:
      'https://images.unsplash.com/photo-1519337265831-281ec6cc8514?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwyMDg2OHwwfDF8c2VhcmNofDF8fGV4YW18ZW58MHx8fHwxNjI4MjU5OTY1&ixlib=rb-1.2.1&q=80&w=843',
    name: 'Avaliação Prática Final',
    description: 'Exame final prático abrangendo todo o conteúdo.',
    course_id: '3',
    module_id: '8',
    start_time: '15:00',
    end_time: '18:30',
    date_exam: '2024-12-08',
    mark: '88',
    status: 'completed'
  }
]
export const examStudentData: ExamInterface[] = [
  {
    image:
      'https://images.unsplash.com/photo-1530305408565-07c1f24e80d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwyMDg2OHwwfDF8c2VhcmNofDd8fGV4YW18ZW58MHx8fHwxNjI4MjU5OTY1&ixlib=rb-1.2.1&q=80&w=944',
    name: 'Exame de Prática para avaliação',
    description:
      'Exame abrangente dos conteúdos do módulo para avaliar a prática em campo do módulo.',
    course_id: '4',
    module_id: '15',
    start_time: '08:00',
    end_time: '12:00',
    date_exam: '2024-10-19',
    mark: '100',
    status: 'completed'
  },
  {
    image:
      'https://images.unsplash.com/photo-1530305408565-07c1f24e80d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwyMDg2OHwwfDF8c2VhcmNofDd8fGV4YW18ZW58MHx8fHwxNjI4MjU5OTY1&ixlib=rb-1.2.1&q=80&w=944',
    name: 'Exame de Prática em Campo',
    description: 'Exame final para avaliar a prática em campo do módulo.',
    course_id: '4',
    module_id: '15',
    start_time: '10:00',
    end_time: '14:00',
    date_exam: '2024-10-26',
    mark: '100',
    status: 'scheduled'
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
    score: '85',
    result: 'approved',
    status: 'checked',
    submission_date: '2024-12-15'
  },
  {
    id: '2',
    exam_id: '2',
    student_id: '3',
    score: '45',
    result: 'pending',
    status: 'pending',
    submission_date: '2024-11-20'
  }
]

// Task
export const taskData: TaskInterface[] = [
  {
    id: '1',
    image: 'https://placekitten.com/304/262',
    name: 'Análise de Mercado',
    description:
      'Realize uma análise detalhada do mercado-alvo e elabore um relatório com os principais insights.',
    course_id: '1',
    module_id: '1',
    mark: '18',
    task_type: 'online',
    due_date: '2024-10-22',
    status: 'closed',
    file_url: 'https://www.empresa-analise.com/'
  },
  {
    id: '2',
    image: 'https://placekitten.com/274/562',
    name: 'Desenvolvimento de Proposta',
    description:
      'Crie uma proposta inovadora para solucionar um problema real do cliente.',
    course_id: '1',
    module_id: '2',
    mark: '13',
    task_type: 'online',
    due_date: '2024-10-28',
    status: 'closed',
    file_url: 'http://cliente-proposta.com/'
  },
  {
    id: '3',
    image: 'https://dummyimage.com/949x224',
    name: 'Avaliação de Casos',
    description:
      'Estude os casos fornecidos e escreva um resumo com as principais lições aprendidas.',
    course_id: '1',
    module_id: '3',
    mark: '13',
    task_type: 'upload',
    due_date: '2024-11-05',
    status: 'open',
    file_url: 'http://casos-exemplos.com/'
  },
  {
    id: '4',
    image: 'https://www.lorempixel.com/825/646',
    name: 'Planejamento Estratégico',
    description:
      'Desenvolva um plano estratégico de 5 anos para uma empresa fictícia.',
    course_id: '1',
    module_id: '4',
    mark: '18',
    task_type: 'online',
    due_date: '2024-11-12',
    status: 'open',
    file_url: 'https://planejamento.com/'
  },
  {
    id: '5',
    image: 'https://dummyimage.com/572x122',
    name: 'Estudo de Viabilidade',
    description:
      'Avalie a viabilidade de um novo produto e documente os resultados.',
    course_id: '2',
    module_id: '5',
    mark: '19',
    task_type: 'upload',
    due_date: '2024-11-18',
    status: 'open',
    file_url: 'https://estudo-viabilidade.com/'
  },
  {
    id: '6',
    image: 'https://placeimg.com/476/981/any',
    name: 'Relatório de Impacto Social',
    description:
      'Investigue o impacto social de um projeto específico e apresente suas conclusões.',
    course_id: '2',
    module_id: '6',
    mark: '29',
    task_type: 'upload',
    due_date: '2024-11-25',
    status: 'pending',
    file_url: 'http://impacto-social.com/'
  },
  {
    id: '7',
    image: 'https://placekitten.com/6/261',
    name: 'Estratégias de Marketing',
    description:
      'Desenvolva uma estratégia de marketing digital para o lançamento de um produto.',
    course_id: '2',
    module_id: '7',
    mark: '22',
    task_type: 'online',
    due_date: '2024-12-02',
    status: 'open',
    file_url: 'http://estrategia-marketing.com/'
  },
  {
    id: '8',
    image: 'https://placekitten.com/373/443',
    name: 'Revisão de Orçamento',
    description:
      'Revise o orçamento anual e sugira ajustes para redução de custos.',
    course_id: '2',
    module_id: '8',
    mark: '26',
    task_type: 'upload',
    due_date: '2024-12-08',
    status: 'pending',
    file_url: 'http://orcamento-revisao.com/'
  },
  {
    id: '9',
    image: 'https://placekitten.com/718/27',
    name: 'Pesquisa de Satisfação do Cliente',
    description:
      'Analise os resultados da pesquisa de satisfação e escreva um relatório.',
    course_id: '3',
    module_id: '9',
    mark: '10',
    task_type: 'online',
    due_date: '2024-12-15',
    status: 'open',
    file_url: 'https://pesquisa-satisfacao.com/'
  },
  {
    id: '10',
    image: 'https://dummyimage.com/942x23',
    name: 'Estudo de Caso Internacional',
    description:
      'Explore um caso de sucesso internacional e destaque os fatores-chave para o sucesso.',
    course_id: '3',
    module_id: '10',
    mark: '27',
    task_type: 'upload',
    due_date: '2024-12-22',
    status: 'pending',
    file_url: 'http://caso-internacional.com/'
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

export const taskStudentData: TaskInterface[] = [
  {
    image:
      'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwyMDg2OHwwfDF8c2VhcmNofDIyfHxwcm9qZWN0JTIwY3VsdHVyZXxlbnwwfHx8fDE2Mjg2NzE1NjY&ixlib=rb-1.2.1&q=80&w=304',
    name: 'Análise de Risco de Projetos',
    description:
      'Realize uma análise de risco para um projeto de energia específico e elabore um relatório detalhado.',
    course_id: '4',
    module_id: '15',
    mark: '100',
    task_type: 'online',
    due_date: '2024-10-21',
    status: 'open',
    file_url: 'https://analiserisco.com/'
  },
  {
    image:
      'https://images.unsplash.com/photo-1517578726338-79a7e9ed771c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwyMDg2OHwwfDF8c2VhcmNofDE3fHxjb25zdWx0JTIwYXNzaWduJTIwZGV2ZWxvcGVyJTIwZXhhbXBsZXxlbnwwfHx8fDE2Mjg2NzE1NjY&ixlib=rb-1.2.1&q=80&w=274',
    name: 'Planejamento de Recursos',
    description:
      'Elabore um plano de alocação de recursos para um projeto de energia.',
    course_id: '4',
    module_id: '15',
    mark: '100',
    task_type: 'upload',
    due_date: '2024-10-22',
    status: 'open',
    file_url: 'https://planejamentorecursos.com/'
  },
  {
    image:
      'https://images.unsplash.com/photo-1517505308660-4e3c2a70f4f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwyMDg2OHwwfDF8c2VhcmNofDMyfHxlZGl0b3JhbCUyMHByb2plY3QlMjBzdGFydHN8ZW58MHx8fHwxNjI4NjcxNTY2&ixlib=rb-1.2.1&q=80&w=949',
    name: 'Execução de Projeto em Campo',
    description:
      'Realize a execução de um projeto em campo e documente as etapas e desafios enfrentados.',
    course_id: '4',
    module_id: '15',
    mark: '100',
    task_type: 'online',
    due_date: '2024-10-23',
    status: 'open',
    file_url: 'https://execucaoprojeto.com/'
  },
  {
    image:
      'https://images.unsplash.com/photo-1519983009562-8b0b6f5d1f3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwyMDg2OHwwfDF8c2VhcmNofDM2fHxwcm9qb3Rlc3xlbnwwfHx8fDE2Mjg2NzE1NjY&ixlib=rb-1.2.1&q=80&w=825',
    name: 'Relatório de Campo',
    description:
      'Elabore um relatório de campo detalhando a execução e o andamento do projeto.',
    course_id: '4',
    module_id: '15',
    mark: '100',
    task_type: 'upload',
    due_date: '2024-10-24',
    status: 'open',
    file_url: 'https://relatoriodecampo.com/'
  },
  {
    image:
      'https://images.unsplash.com/photo-1514978312268-29834e1c29b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwyMDg2OHwwfDF8c2VhcmNofDQyfHxwcm9qZWN0JTIwcGFyYXRpdml0eSUyMG5vdGV8ZW58MHx8fHwxNjI4NjcxNTY2&ixlib=rb-1.2.1&q=80&w=572',
    name: 'Avaliação de Resultados',
    description:
      'Avalie os resultados do projeto e identifique lições aprendidas para projetos futuros.',
    course_id: '4',
    module_id: '15',
    mark: '100',
    task_type: 'online',
    due_date: '2024-10-25',
    status: 'open',
    file_url: 'https://avaliacaoderesultados.com/'
  }
]
export const taskSubmissionsStudentData: TaskSubmissionInterface[] = [
  {
    task_id: '1',
    student_id: '3',
    submission_text:
      'Realizei uma análise completa dos riscos do projeto, destacando os pontos críticos.',
    result: 'approved',
    feedback:
      'Ótima análise de riscos! Continue com esse nível de detalhamento.',
    submission_date: '2024-10-21',
    grade: '95',
    status: 'graded'
  },
  {
    task_id: '2',
    student_id: '3',
    submission_url: 'https://documentosubmetido.com/planejamento-recursos.pdf',
    result: 'approved',
    feedback:
      'Plano de alocação de recursos bem estruturado. Parabéns pelo trabalho!',
    submission_date: '2024-10-22',
    grade: '92',
    status: 'graded'
  },
  {
    task_id: '3',
    student_id: '3',
    submission_text:
      'Execução realizada em campo conforme planejado, com documentação detalhada das etapas.',
    result: 'pending',
    feedback: 'Ainda em avaliação.',
    submission_date: '2024-10-23',
    status: 'pending'
  },
  {
    task_id: '4',
    student_id: '3',
    submission_url: 'https://documentosubmetido.com/relatorio-campo.pdf',
    result: 'pending',
    feedback: 'Em análise pelo professor.',
    submission_date: '2024-10-24',
    status: 'pending'
  },
  {
    task_id: '5',
    student_id: '3',
    submission_text:
      'Avaliação dos resultados e identificação de lições aprendidas para melhorias futuras.',
    result: 'approved',
    feedback:
      'Excelente trabalho! Lembre-se de incluir mais exemplos específicos.',
    submission_date: '2024-10-25',
    grade: '88',
    status: 'graded'
  }
]

// =========================

export const taskStudentData2: TaskInterface[] = [
  {
    image:
      'https://images.unsplash.com/photo-1517638851339-e26b83f9e8cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDN8fGVudHJlZ2ElMjBkaWFncmlhbWVudG98ZW58MHx8fHwxNjY2Mjg1NTk5&ixlib=rb-1.2.1&q=80&w=400',
    name: 'Planejamento Energético',
    description: 'Desenvolva um plano de gestão energética para o próximo ano.',
    course_id: '4',
    module_id: '15',
    mark: '100',
    task_type: 'online',
    due_date: '2024-11-14',
    status: 'closed',
    file_url: 'https://planejamentoenergetico.com/'
  },
  {
    image:
      'https://images.unsplash.com/photo-1504502350688-5b726a1b8d97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDZ8fGVudHJlZ2ElMjBtYW5hZ2VtZW50fGVufDB8fHx8MTY2NjI4NTU5OQ&ixlib=rb-1.2.1&q=80&w=400',
    name: 'Controle de Qualidade',
    description:
      'Crie um plano para monitorar a qualidade dos processos energéticos.',
    course_id: '4',
    module_id: '15',
    mark: '100',
    task_type: 'upload',
    due_date: '2024-11-15',
    status: 'closed',
    file_url: 'https://controledequalidade.com/'
  },
  {
    image:
      'https://images.unsplash.com/photo-1527922951-d7b6cba00ecb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGVuZXJneSUyMGFuYWx5c2lzfGVufDB8fHx8MTY2NjI4NTU5OQ&ixlib=rb-1.2.1&q=80&w=400',
    name: 'Análise de Eficiência Energética',
    description:
      'Realize uma análise de eficiência energética para um caso de estudo.',
    course_id: '4',
    module_id: '15',
    mark: '100',
    task_type: 'online',
    due_date: '2024-11-16',
    status: 'closed',
    file_url: 'https://analiseeficiencia.com/'
  },
  {
    image:
      'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDExfHxlbmVyZ3klMjB0YXNrfGVufDB8fHx8MTY2NjI4NTU5OQ&ixlib=rb-1.2.1&q=80&w=400',
    name: 'Relatório de Consumo Energético',
    description:
      'Elabore um relatório sobre o consumo energético do último ano.',
    course_id: '4',
    module_id: '15',
    mark: '100',
    task_type: 'upload',
    due_date: '2024-11-17',
    status: 'closed',
    file_url: 'https://relatorioconsumo.com/'
  },
  {
    image:
      'https://images.unsplash.com/photo-1560179707-f38b1a4b08f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDR8fGVuZXJneSUyMHNvbHV0aW9ufGVufDB8fHx8MTY2NjI4NTU5OQ&ixlib=rb-1.2.1&q=80&w=400',
    name: 'Propostas de Redução de Consumo',
    description: 'Sugira propostas para reduzir o consumo energético.',
    course_id: '4',
    module_id: '15',
    mark: '100',
    task_type: 'online',
    due_date: '2024-11-18',
    status: 'closed',
    file_url: 'https://reducaoenergetica.com/'
  }
]

export const taskSubmissionsStudentData2: TaskSubmissionInterface[] = [
  {
    task_id: '1',
    student_id: '3',
    submission_text:
      'Plano completo de gestão energética, com foco em sustentabilidade.',
    result: 'approved',
    feedback: 'Excelente visão e detalhamento no planejamento energético!',
    submission_date: '2024-11-14',
    status: 'graded'
  },
  {
    task_id: '2',
    student_id: '3',
    submission_url: 'https://documentosubmetido.com/controle-qualidade.pdf',
    result: 'approved',
    feedback: 'Plano de qualidade muito bem estruturado. Ótimo trabalho!',
    submission_date: '2024-11-15',
    grade: '90',
    status: 'graded'
  },
  {
    task_id: '3',
    student_id: '3',
    submission_text:
      'Análise focada na eficiência energética e nos benefícios financeiros.',
    result: 'approved',
    feedback: 'Análise profunda e bem executada. Parabéns!',
    submission_date: '2024-11-16',
    grade: '69',
    status: 'graded'
  },
  {
    task_id: '4',
    student_id: '3',
    submission_url: 'https://documentosubmetido.com/relatorio-consumo.pdf',
    result: 'pending',
    feedback: 'Relatório em avaliação.',
    submission_date: '2024-11-17',
    grade: '81',
    status: 'graded'
  },
  {
    task_id: '5',
    student_id: '3',
    submission_text:
      'Propostas para redução energética com foco em práticas sustentáveis.',
    result: 'pending',
    feedback: 'Em análise pelo professor.',
    submission_date: '2024-11-18',
    grade: '79',
    status: 'graded'
  }
]

export const examQuestionsStudentData: ExamQuestionInterface[] = [
  // Perguntas para o primeiro exame
  {
    exam_id: '1',
    question_text: 'Qual é a principal função do exame de prática?',
    question_type: 'short_answer',
    value: '20'
  },
  {
    exam_id: '1',
    question_text: 'Quais são os principais passos do exame prático?',
    question_type: 'multiple_choice',
    options: [
      { text: 'Estudo teórico', is_valid: false },
      { text: 'Aplicação prática em campo', is_valid: true },
      { text: 'Relatório final', is_valid: false },
      { text: 'Análise de resultados', is_valid: true }
    ],
    value: '10'
  },
  {
    exam_id: '1',
    question_text: 'Como é realizado o monitoramento do aluno?',
    question_type: 'short_answer',
    value: '20'
  },
  {
    exam_id: '1',
    question_text: 'Qual é a duração máxima do exame?',
    question_type: 'multiple_choice',
    options: [
      { text: '2 horas', is_valid: false },
      { text: '4 horas', is_valid: true },
      { text: '6 horas', is_valid: false }
    ],
    value: '20'
  },
  {
    exam_id: '1',
    question_text: 'Quais materiais são permitidos durante o exame?',
    question_type: 'short_answer',
    value: '20'
  },
  {
    exam_id: '1',
    question_text: 'É permitido utilizar equipamentos eletrônicos?',
    question_type: 'multiple_choice',
    options: [
      { text: 'Sim, em todos os momentos', is_valid: false },
      { text: 'Apenas em atividades específicas', is_valid: true },
      { text: 'Não é permitido', is_valid: false }
    ],
    value: '10'
  },

  // Perguntas para o segundo exame
  {
    exam_id: '2',
    question_text: 'Quais tópicos são abordados no exame em campo?',
    question_type: 'multiple_choice',
    options: [
      { text: 'Procedimentos de laboratório', is_valid: false },
      { text: 'Aplicação prática em campo', is_valid: true },
      { text: 'Elaboração de relatórios', is_valid: true }
    ],
    value: '20'
  },
  {
    exam_id: '2',
    question_text: 'Como é avaliada a performance do aluno?',
    question_type: 'short_answer',
    value: '20'
  },
  {
    exam_id: '2',
    question_text: 'Quais são as etapas do exame final?',
    question_type: 'multiple_choice',
    options: [
      { text: 'Teoria, prática e avaliação', is_valid: true },
      { text: 'Apenas prática', is_valid: false },
      { text: 'Relatório final', is_valid: false }
    ],
    value: '20'
  },
  {
    exam_id: '2',
    question_text: 'Quais materiais adicionais são necessários?',
    question_type: 'short_answer',
    value: '20'
  },
  {
    exam_id: '2',
    question_text: 'Qual é o objetivo do exame final?',
    question_type: 'short_answer',
    value: '20'
  }
]
