import { useEffect, useState } from 'react'

// lib
import { ToastContainer } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'

// Icons
import { Download, SendHorizontal } from 'lucide-react'

// Data
import { routsNameMain } from '../../../data/routsName'

// Components
import { Breadcrumbs } from '../../../components/Breadcrumbs'
import { BadgeSimple } from '../../../components/badge/BadgeSimple'
import { TextAreaLabelSimple } from '../../../components/input/TextAreaLabelSimple'
import { InputLabelSimple } from '../../../components/input/InputLabelSimple'

// services
import StudentViewModel from '../../../services/ViewModel/StudentViewModel'
import CourseViewModel from '../../../services/ViewModel/CourseViewModel'
import ModuleViewModel from '../../../services/ViewModel/ModuleViewModel'
import TaskSubmissionViewModel from '../../../services/ViewModel/TaskSubmissionViewModel'
import TaskViewModel from '../../../services/ViewModel/TaskViewModel'

// utils
import { showToastBottom } from '../../../utils/toasts'

// Type
import { CourseInterface } from '../../../interfaces/ICourseInterface'
import { ModuleInterface } from '../../../interfaces/IModuleInterface'
import { StudentInterface } from '../../../interfaces/IStudentInterface'
import { TaskSubmissionInterface } from '../../../interfaces/ITaskSubmissionInterface'
import { TaskInterface } from '../../../interfaces/ITaskInterface'

export function TaskCheck() {
  // Params
  const { taskId, submissionId } = useParams()

  const navigate = useNavigate()

  const handleNavigation = (page: string) => {
    navigate(page) // Navega para a página "/about"
  }

  // Loading
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isSending, setIsSending] = useState<boolean>(false)

  // Data
  const [rowTaskData, setRowTaskData] = useState<TaskInterface | null>(null)
  const [rowTaskSubmissionData, setRowTaskSubmissionData] =
    useState<TaskSubmissionInterface | null>(null)
  const [rowStudentData, setRowStudentData] = useState<StudentInterface | null>(
    null
  )
  const [rowCourseData, setRowCourseData] = useState<CourseInterface | null>(
    null
  )
  const [rowModuleData, setRowModuleData] = useState<ModuleInterface | null>(
    null
  )

  // State
  const [grade, setGrade] = useState<string>(
    rowTaskSubmissionData?.grade as string
  )
  const [feedbackText, setFeedbackText] = useState<string>('')

  // Const
  const namePageUppercase = 'Tarefas'

  // List Array
  const itemsBreadcrumbs = [
    { label: 'Inicio', to: routsNameMain.home },
    { label: namePageUppercase, to: routsNameMain.exam.index },
    { label: 'Resultados', to: routsNameMain.exam.result },
    { label: rowTaskData?.name as string }
  ]

  const handleGrade = (e: string) => {
    setGrade(e)
  }
  const handleFeedback = (e: string) => {
    setFeedbackText(e)
  }

  // Task
  async function fetchTaskData() {
    setIsLoading(true)

    // Clear
    setRowTaskData(null)

    // Get
    await TaskViewModel.getOne(taskId as string)
      .then(response => {
        if (response.error) {
          showToastBottom('error', 'Não foi possivel encontrar a tarefa')
          console.log(response.error)
        } else {
          const dataTask = response.data as unknown as TaskInterface

          setRowTaskData(dataTask as TaskInterface)
          // fetch
          fetchCourseData(dataTask?.course_id as string)
          fetchModuleData(dataTask?.module_id as string)
        }
        setIsLoading(false)
      })
      .catch(err => {
        showToastBottom('error', err as string)
        setIsLoading(false)
      })
  }

  // Task Submission
  async function fetchTaskSubmissionData() {
    setIsLoading(true)

    // Clear
    setRowTaskSubmissionData(null)

    // Get
    await TaskSubmissionViewModel.getOne(submissionId as string)
      .then(response => {
        if (response.error) {
          showToastBottom('error', response.msg as string)
          console.log(response.error)
        } else {
          const dataSubmission =
            response.data as unknown as TaskSubmissionInterface

          setRowTaskSubmissionData(dataSubmission as TaskSubmissionInterface)
          fetchStudentData(dataSubmission?.student_id as string)
        }
        setIsLoading(false)
      })
      .catch(err => {
        showToastBottom('error', err as string)
        setIsLoading(false)
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

  // Function
  const handleSubmitGrade = async () => {
    setIsSending(true)
    const gradeInNumber: number = parseInt(grade) as number
    const markInNumber: number = rowTaskData?.mark as unknown as number
    if (gradeInNumber > markInNumber) {
      showToastBottom(
        'error',
        `O valor maximo atribuivel a está tarefa é: ${markInNumber}`
      )
      return
    }
    const dataToSave = {
      grade: grade
    }

    const resultSubmit = await TaskSubmissionViewModel.update(
      submissionId as string,
      dataToSave
    )

    if (resultSubmit.error) {
      showToastBottom('error', resultSubmit.msg)
      setIsSending(false)
    } else {
      showToastBottom('success', 'Nota atualizada')

      setTimeout(() => {
        setIsSending(false)
      }, 2000)
    }
  }
  // Function
  const handleSubmitFeedback = async () => {
    setIsSending(true)

    const dataToSave = {
      feedback: feedbackText
    }

    const resultSubmit = await TaskSubmissionViewModel.update(
      submissionId as string,
      dataToSave
    )

    if (resultSubmit.error) {
      showToastBottom('error', resultSubmit.msg)
      setIsSending(false)
    } else {
      showToastBottom('success', 'Nota atualizada')

      setTimeout(() => {
        setIsSending(false)
      }, 2000)
    }
  }
  // Function
  const handleSubmitChecked = async () => {
    setIsSending(true)

    const dataToSave = {
      status: 'graded'
    }

    const resultSubmit = await TaskSubmissionViewModel.update(
      submissionId as string,
      dataToSave
    )

    if (resultSubmit.error) {
      showToastBottom('error', resultSubmit.msg)
      setIsSending(false)
    } else {
      showToastBottom('success', 'Prova corrigida')

      setTimeout(() => {
        setIsSending(false)
      }, 2000)
    }
  }

  useEffect(() => {
    fetchTaskSubmissionData()
    fetchTaskData()
  }, [])
  return (
    <div className="w-full h-full flex flex-col justify-start items-start gap-6">
      <ToastContainer />

      <div className="w-full flex flex-row items-center justify-between gap-2 ">
        <div className="w-full flex flex-col items-start justify-between gap-4">
          <Breadcrumbs items={itemsBreadcrumbs} />
          <h1 className="text-2xl font-bold text-dark dark:text-light ">
            Tarefa: {rowTaskData?.name}
          </h1>
        </div>
      </div>

      <div className="w-full p-6 flex flex-col justify-start items-start gap-6 rounded-md bg-light dark:bg-dark">
        <div className="w-full h-full flex items-center justify-center ">
          <div className="w-full p-6 flex flex-col justify-center items-center gap-6">
            {/* Header */}
            <div className="w-full grid gap-6 md:grid-cols-3 rounded-2xl p-4 border-2 ">
              {/* Student */}
              <div className="flex flex-row items-center justify-start">
                <div className="w-20 h-20 flex flex-col items-center justify-center border-2 border-gray-300 border-dashed rounded-full cursor-pointer bg-gray-70 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100/80 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 transition-all duration-300 relative overflow-hidden">
                  <img
                    className=" w-full h-full object-cover absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-300"
                    src={rowStudentData?.photo}
                    alt="Tchossy"
                  />
                </div>
                <div className="ml-4 flex flex-col">
                  <h4 className="text-2xl font-semibold text-center md:text-left">
                    {rowStudentData?.first_name} {rowStudentData?.last_name}
                  </h4>
                  <p className="">{rowStudentData?.email}</p>
                </div>
              </div>

              {/* Course */}
              <div className="w-full flex flex-1 flex-col items-start justify-center gap-3">
                <p className="">
                  <span className="font-semibold">Curso:</span>
                  <span> {rowCourseData?.name} </span>
                </p>

                {/* Module */}
                <p className="">
                  <span className="font-semibold">Módulo:</span>
                  <span> {rowModuleData?.name} </span>
                </p>
              </div>

              {/* Other info */}
              <div className="w-full flex flex-1 flex-col items-start justify-center gap-3">
                {/* Status */}
                <div className="w-full flex flex-row items-center gap-3">
                  <span className="font-semibold">Status da tarefa:</span>
                  <div className="w-44 flex flex-row items-start gap-3">
                    <BadgeSimple
                      color={
                        rowTaskSubmissionData?.status == 'graded'
                          ? 'green'
                          : 'red'
                      }
                      label={
                        rowTaskSubmissionData?.status == 'graded'
                          ? 'Exame já corrigido'
                          : 'Exame por corrigir'
                      }
                    />
                  </div>
                </div>
                {/* Date */}
                <p className="">
                  <span className="font-semibold">Data de entrega:</span>
                  <span> {rowTaskSubmissionData?.date_create} </span>
                </p>
              </div>
            </div>

            {/* Submission */}
            <div className="w-full flex flex-1 flex-col items-start justify-center gap-1">
              <div className="w-96 h-64 my-4 flex flex-col items-center justify-center  rounded-lg cursor-pointer bg-gray-70 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100/80 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 transition-all duration-300 relative overflow-hidden">
                <img
                  className=" w-full h-full object-cover absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-300"
                  src={rowTaskData?.image}
                  alt="Tchossy"
                />
              </div>

              <div className="mb-2">
                <BadgeSimple
                  color={'green'}
                  label={`Tarefa do tipo: ${rowTaskData?.task_type}`}
                />
              </div>

              <label className="block mb-2 text-xl dark:text-light text-gray-800">
                <span className="font-semibold">Titulo:</span>{' '}
                {rowTaskData?.name}
              </label>

              <p className="flex flex-col mb-2 dark:text-light text-gray-800">
                <span className="text-lg font-semibold">Instruções:</span>
                {rowTaskData?.description}
              </p>

              <div className="w-full mt-12 gap-4 p-4 border rounded-md">
                <div className="w-full my-4 flex flex-row gap-3">
                  <div className="w-full flex flex-1 flex-col justify-end gap-3">
                    {rowTaskSubmissionData?.submission_text && (
                      <div className="flex-1">
                        <TextAreaLabelSimple
                          isDisabled={true}
                          htmlFor={`task_submitted`}
                          label={`Submissão:`}
                          rows={6}
                          defaultValue={rowTaskSubmissionData?.submission_text}
                          onChange={() => null}
                        />
                      </div>
                    )}

                    {rowTaskSubmissionData?.submission_url && (
                      <div className="w-full">
                        <a
                          href={rowTaskSubmissionData?.submission_url}
                          target="_blank"
                          className="w-[16rem] h-[2.6rem] min-w-[12rem] px-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700 flex flex-row items-center justify-center gap-2 transition-all duration-300 "
                        >
                          <Download />
                          Baixar documento enviado
                        </a>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-row gap-3 items-end">
                    <div className="w-full max-w-[6rem]">
                      <InputLabelSimple
                        type="number"
                        htmlFor="grade"
                        label={`Cotação`}
                        value={grade}
                        onChange={handleGrade}
                      />
                    </div>

                    <button
                      onClick={() => handleSubmitGrade()}
                      className="w-[4rem] h-[2.6rem] px-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-900 flex flex-row items-center justify-center gap-2 transition-all duration-300 "
                    >
                      Salvar
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Feedback  */}
            <div className="w-full flex flex-1 flex-row items-end gap-3">
              <TextAreaLabelSimple
                htmlFor={`feedback`}
                label={`Feedback para o aluno`}
                placeholder="Seu feedback"
                rows={3}
                defaultValue={rowTaskSubmissionData?.feedback}
                onChange={handleFeedback}
              />
              <button
                onClick={() => handleSubmitFeedback()}
                className="w-[12rem] h-[2.9rem] px-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-900 flex flex-row items-center justify-center gap-2 transition-all duration-300 "
              >
                Enviar feedback
                <SendHorizontal size={18} />
              </button>
            </div>

            {rowTaskSubmissionData?.status !== 'graded' && (
              <>
                {/* Btn Save  */}
                <div className="w-full">
                  <button
                    type="button"
                    onClick={() => handleSubmitChecked()}
                    className="w-[16rem] h-[2.6rem] min-w-[12rem] px-3 rounded-lg bg-primary-200 text-white hover:bg-primary-500 active:bg-primary-700 flex flex-row items-center justify-center gap-2 transition-all duration-300 "
                  >
                    Salvar como corrigido
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
