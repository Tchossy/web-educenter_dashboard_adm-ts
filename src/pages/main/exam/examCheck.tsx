import { useEffect, useState } from 'react'

// Form
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// Icons
import { SendHorizontal } from 'lucide-react'

// Data
import { routsNameMain } from '../../../data/routsName'

// Components
import { Breadcrumbs } from '../../../components/Breadcrumbs'
import { BadgeSimple } from '../../../components/badge/BadgeSimple'
import { TextAreaLabelSimple } from '../../../components/input/TextAreaLabelSimple'

// Type
import { useNavigate, useParams } from 'react-router-dom'
import { ExamInterface } from '../../../interfaces/IExamInterface'
import { CourseInterface } from '../../../interfaces/ICourseInterface'
import { ModuleInterface } from '../../../interfaces/IModuleInterface'
import ExamResultViewModel from '../../../services/ViewModel/ExamResultViewModel'
import { showToastBottom } from '../../../utils/toasts'
import { ExamResultInterface } from '../../../interfaces/IExamResultInterface'
import { StudentInterface } from '../../../interfaces/IStudentInterface'
import StudentViewModel from '../../../services/ViewModel/StudentViewModel'
import ExamViewModel from '../../../services/ViewModel/ExamViewModel'
import CourseViewModel from '../../../services/ViewModel/CourseViewModel'
import ModuleViewModel from '../../../services/ViewModel/ModuleViewModel'
import { ExamQuestionInterface } from '../../../interfaces/IExamQuestionInterface'
import ExamAnswerViewModel from '../../../services/ViewModel/ExamAnswerViewModel'
import { ExamAnswerInterface } from '../../../interfaces/IExamAnswerInterface'
import { ExamAnswers } from './components/ExamAnswers'
import { BeatLoader } from 'react-spinners'
import { converter } from '../../../utils/converter'

const formSchema = z.object({
  name: z
    .string({
      required_error: 'O titulo é obrigatório!'
    })
    .min(2, 'O titulo deve ter no mínimo 2 caracteres'),
  description: z
    .string({
      required_error: 'A descrição é obrigatório!'
    })
    .min(2, 'O titulo deve ter no mínimo 2 caracteres'),
  course_id: z.string().refine(
    value => {
      return value != ''
    },
    {
      message: 'Por favor, selecione uma opção válida'
    }
  ),
  module_id: z.string().refine(
    value => {
      return value != ''
    },
    {
      message: 'Por favor, selecione uma opção válida'
    }
  ),
  task_type: z.string().refine(
    value => {
      return value === 'online' || value === 'upload'
    },
    {
      message: 'Por favor, selecione uma opção válida'
    }
  ),
  due_date: z.string().refine(
    value => {
      return value != ''
    },
    {
      message: 'Por favor, escolha uma data para o tarefa'
    }
  ),
  status: z.string().refine(
    value => {
      return value === 'inactive' || value === 'active'
    },
    {
      message: "Por favor, selecione uma opção válida: 'Ativo' ou 'Inativo'"
    }
  )
})
type formType = z.infer<typeof formSchema>

export function ExamCheck() {
  // Params
  const { resultId } = useParams()

  const navigate = useNavigate()

  const handleNavigation = (page: string) => {
    navigate(page) // Navega para a página "/about"
  }

  // Loading
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isSending, setIsSending] = useState<boolean>(false)

  // Data
  const [rowExamResultData, setRowExamResultData] =
    useState<ExamResultInterface | null>(null)

  const [rowExamData, setRowExamData] = useState<ExamInterface | null>(null)
  const [rowStudentData, setRowStudentData] = useState<StudentInterface | null>(
    null
  )
  const [rowCourseData, setRowCourseData] = useState<CourseInterface | null>(
    null
  )
  const [rowModuleData, setRowModuleData] = useState<ModuleInterface | null>(
    null
  )
  const [examAnswersData, setExamAnswersData] = useState<ExamAnswerInterface[]>(
    []
  )

  // State
  const [isSend, setIsSend] = useState<boolean>(false)
  const [isSendingFeedback, setIsSendingFeedback] = useState<boolean>(false)
  const [feedbackText, setFeedbackText] = useState<string>('')

  // Const
  const namePageEntry = 'Correção do exame'
  const namePageUppercase = 'Exames'

  // List Array
  const itemsBreadcrumbs = [
    { label: 'Inicio', to: routsNameMain.home },
    { label: namePageUppercase, to: routsNameMain.exam.index },
    { label: 'Resultados', to: routsNameMain.exam.result },
    { label: namePageEntry }
  ]

  // Form Zod
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<formType>({
    resolver: zodResolver(formSchema)
  })

  // Exam Result
  async function fetchExamResultData() {
    setIsLoading(true)

    // Clear
    setRowExamResultData(null)

    // Get
    await ExamResultViewModel.getOne(resultId as string)
      .then(response => {
        if (response.error) {
          showToastBottom('error', response.msg as string)
          console.log(response.error)
        } else {
          const dataResult = response.data as unknown as ExamResultInterface

          setRowExamResultData(dataResult as ExamResultInterface)
          fetchExamData(dataResult?.exam_id as string)
          fetchStudentData(dataResult?.student_id as string)
          fetchSubmittedAnswers(dataResult?.exam_id, dataResult?.student_id)
        }
        setIsLoading(false)
      })
      .catch(err => {
        showToastBottom('error', err as string)
        setIsLoading(false)
      })
  }
  // Function Exam
  async function fetchExamData(examId: string) {
    // Clear
    setRowExamData(null)

    // Get
    await ExamViewModel.getOne(examId).then(response => {
      if (response.error) {
        showToastBottom('error', response.msg as string)
        console.log('error', response.msg)
      } else {
        const arrayData = response.data as ExamInterface
        const listData = arrayData

        fetchCourseData(listData?.course_id as string)
        fetchModuleData(listData?.module_id as string)

        setRowExamData(listData)
      }
    })
  }
  // Function Student
  async function fetchStudentData(studentId: string) {
    // Clear
    setRowStudentData(null)

    // Get
    await StudentViewModel.getOne(studentId).then(response => {
      if (response.error) {
        showToastBottom('error', response.msg as string)
        console.log('error', response.msg)
      } else {
        const arrayData = response.data as StudentInterface
        const listData = arrayData

        setRowStudentData(listData)
      }
    })
  }
  // Function Course
  async function fetchCourseData(courseID: string) {
    // Clear
    setRowCourseData(null)

    // Get
    await CourseViewModel.getOne(courseID).then(response => {
      if (response.error) {
        showToastBottom('error', response.msg as string)
        console.log('error', response.msg)
      } else {
        const arrayData = response.data as CourseInterface
        const listData = arrayData

        setRowCourseData(listData)
      }
    })
  }
  // Function Module
  async function fetchModuleData(moduleID: string) {
    // Clear
    setRowModuleData(null)

    // Get
    await ModuleViewModel.getOne(moduleID).then(response => {
      if (response.error) {
        showToastBottom('error', response.msg as string)
        console.log('error', response.msg)
      } else {
        const arrayData = response.data as ModuleInterface
        const listData = arrayData

        setRowModuleData(listData)
      }
    })
  }

  async function fetchSubmittedAnswers(examId: string, studentId: string) {
    const response = await ExamAnswerViewModel.getAllByExamAndStudent(
      examId,
      studentId
    )

    if (!response.error) {
      const arrayData = response.data as unknown as ExamAnswerInterface[]
      const listData = arrayData

      setExamAnswersData(listData)
    } else {
      showToastBottom('error', response.msg)
    }
  }

  useEffect(() => {
    fetchExamResultData()
  }, [])

  const handleTextFeedback = (text: string) => {
    setFeedbackText(text)
  }
  const handleSubmitFeedback = async () => {
    setIsSendingFeedback(true)

    const dataToSave = {
      // exam_id: '',
      // student_id: '',
      feedback: feedbackText
    }

    const resultSubmit = await ExamResultViewModel.update(
      rowExamResultData?.id as string,
      dataToSave
    )

    if (resultSubmit.error) {
      showToastBottom('error', resultSubmit.msg)
      setIsSendingFeedback(false)
    } else {
      showToastBottom('success', 'Feedback enviado com sucesso')

      setTimeout(() => {
        setIsSendingFeedback(false)
      }, 2000)
    }
  }
  const handleSubmitMark = async () => {
    setIsSend(true)

    const totalMarks = examAnswersData.reduce((acc, answer) => {
      const answerMark = converter.stringToNumber(answer.mark)
      return acc + (answerMark || 0) // Soma o valor de 'mark' ou 0 se for indefinido
    }, 0)

    const markResult = totalMarks >= 79.5 ? 'approved' : 'failed'
    const dataToSave = {
      // exam_id: '',
      // student_id: '',
      result: markResult,
      status: 'checked',
      score: converter.numberToString(totalMarks)
    }

    const resultSubmit = await ExamResultViewModel.update(
      rowExamResultData?.id as string,
      dataToSave
    )

    if (resultSubmit.error) {
      showToastBottom('error', resultSubmit.msg)
      setIsSend(false)
    } else {
      showToastBottom('success', 'Exame corrigido')

      setTimeout(() => {
        handleNavigation(`${routsNameMain.exam.result}`)
        setIsSend(false)
      }, 2000)
    }
  }
  // Função chamada quando as respostas forem atualizadas
  const handleUpdatedAnswers = (updatedAnswers: ExamAnswerInterface[]) => {
    setExamAnswersData(updatedAnswers)
  }

  return (
    <div className="w-full h-full flex flex-col justify-start items-start gap-6">
      {!isLoading && rowExamResultData && (
        <>
          <div className="w-full flex flex-row items-center justify-between gap-2 ">
            <div className="w-full flex flex-col items-start justify-between gap-4">
              <Breadcrumbs items={itemsBreadcrumbs} />
              <h1 className="text-2xl font-bold text-dark dark:text-light ">
                {namePageEntry}
              </h1>
            </div>
          </div>

          <div className="w-full p-6 flex flex-col justify-start items-start gap-6 rounded-md bg-light dark:bg-dark">
            <div className="w-full h-full flex items-center justify-center ">
              <div className="w-full p-6 flex flex-col justify-center items-center gap-6">
                <div className="w-full grid gap-6 md:grid-cols-3 rounded-2xl p-4 border-2 border-gray-300 dark:border-gray-600">
                  <div className="flex flex-row items-center justify-start">
                    <div className="w-20 h-20 flex flex-col items-center justify-center border-2 border-gray-300 border-dashed rounded-full cursor-pointer bg-gray-70 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100/80 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 transition-all duration-300 relative overflow-hidden">
                      <img
                        className=" w-full h-full object-cover absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-300"
                        src={rowStudentData ? rowStudentData.photo : ''}
                        alt="Tchossy"
                      />
                    </div>
                    <div className="ml-4 flex flex-col">
                      <h4 className="text-2xl font-semibold text-center md:text-left">
                        {rowStudentData
                          ? `${rowStudentData.first_name} ${rowStudentData.last_name}`
                          : ''}
                      </h4>
                      <p className="">
                        {rowStudentData ? rowStudentData.email : ''}
                      </p>
                    </div>
                  </div>

                  <div className="w-full flex flex-1 flex-col items-start justify-center gap-3">
                    <p className="">
                      <span className="font-semibold">Curso:</span>
                      <span> {rowCourseData ? rowCourseData.name : ''} </span>
                    </p>

                    <p className="">
                      <span className="font-semibold">Módulo:</span>
                      <span> {rowModuleData ? rowModuleData.name : ''} </span>
                    </p>
                  </div>

                  <div className="w-full flex flex-1 flex-col items-start justify-center gap-3">
                    <div className="w-full flex flex-row items-center gap-3">
                      <span className="font-semibold">Status do exame:</span>
                      <div className="w-44 flex flex-row items-start gap-3">
                        <BadgeSimple
                          color={
                            rowExamResultData?.status == 'checked'
                              ? 'green'
                              : 'red'
                          }
                          label={
                            rowExamResultData?.status == 'checked'
                              ? 'Exame já corrigido'
                              : 'Exame por corrigir'
                          }
                        />
                      </div>
                    </div>
                    <p className="">
                      <span className="font-semibold">Data de entrega:</span>
                      <span> {rowExamResultData?.submission_date} </span>
                    </p>
                  </div>
                </div>

                <div className="w-full flex flex-1 flex-row items-end gap-3">
                  <TextAreaLabelSimple
                    htmlFor={`feedback`}
                    label={`Feedback para o aluno`}
                    defaultValue={
                      rowExamResultData ? rowExamResultData.feedback : ''
                    }
                    onChange={handleTextFeedback}
                  />
                  <button
                    disabled={isSendingFeedback}
                    onClick={handleSubmitFeedback}
                    className="w-[12rem] h-[2.9rem] px-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-900 flex flex-row items-center justify-center gap-2 transition-all duration-300 "
                  >
                    {isSendingFeedback && (
                      <>
                        <BeatLoader color="white" size={10} />
                      </>
                    )}
                    {!isSendingFeedback && (
                      <>
                        Enviar feedback
                        <SendHorizontal size={18} />
                      </>
                    )}
                  </button>
                </div>

                <div className="w-full flex flex-1 flex-col items-start justify-center gap-1">
                  <label className="block mb-2 text-lg font-medium dark:text-light text-gray-600">
                    Questões
                  </label>

                  <ExamAnswers
                    examAnswersData={examAnswersData}
                    onAnswersUpdate={handleUpdatedAnswers}
                  />
                </div>

                <div className="w-full">
                  <button
                    disabled={isSend}
                    onClick={handleSubmitMark}
                    type="button"
                    className="w-[16rem] h-[2.6rem] min-w-[12rem] px-3 rounded-lg bg-primary-200 text-white hover:bg-primary-500 active:bg-primary-700 flex flex-row items-center justify-center gap-2 transition-all duration-300"
                  >
                    {isSend && (
                      <>
                        <BeatLoader color="white" size={10} />
                      </>
                    )}
                    {!isSend && <>Salvar como corrigido</>}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
