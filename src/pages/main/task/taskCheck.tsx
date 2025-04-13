import { useEffect, useState } from 'react'

// Icons
import { BadgeCheck, Proportions, CalendarCheck2 } from 'lucide-react'

// Data
import { routsNameMain } from '../../../data/routsName'

// Components
import { Breadcrumbs } from '../../../components/Breadcrumbs'
import { BadgeSimple } from '../../../components/badge/BadgeSimple'

// Type
import { useParams } from 'react-router-dom'
import { TaskInterface } from '../../../interfaces/ITaskInterface'
import { showToastBottom } from '../../../utils/toasts'
import TaskViewModel from '../../../services/ViewModel/TaskViewModel'
import { ToastContainer } from 'react-toastify'
import { TaskSubmissionInterface } from '../../../interfaces/ITaskSubmissionInterface'
import TaskSubmissionViewModel from '../../../services/ViewModel/TaskSubmissionViewModel'
import { BeatLoader } from 'react-spinners'
import { TextAreaLabelSimple } from '../../../components/input/TextAreaLabelSimple'
import { ExamAnswerInterface } from '../../../interfaces/IExamAnswerInterface'
import TaskAnswerViewModel from '../../../services/ViewModel/TaskAnswerViewModel'
import { ExamAnswers } from './components/ExamAnswers'

export function TaskCheck() {
  // Params
  const { taskId, submissionId } = useParams()

  // Const
  const namePageUppercase = 'Tarefas'

  // Loading
  const [isLoading, setIsLoading] = useState<boolean>(true)

  // Data
  const [rowTaskData, setRowTaskData] = useState<TaskInterface | null>(null)
  const [rowTaskSubmissionData, setRowTaskSubmissionData] =
    useState<TaskSubmissionInterface | null>(null)
  const [examAnswersData, setExamAnswersData] = useState<ExamAnswerInterface[]>(
    []
  )

  const labelResultTask =
    rowTaskSubmissionData?.result === 'approved'
      ? 'Aprovado'
      : rowTaskSubmissionData?.result === 'failed'
      ? 'Falhou'
      : 'Resultado pendente'

  const colorTask =
    rowTaskSubmissionData?.result === 'approved'
      ? 'green'
      : rowTaskSubmissionData?.result === 'failed'
      ? 'red'
      : 'orange'

  // List Array
  const itemsBreadcrumbs = [
    { label: 'Inicio', to: routsNameMain.home },
    { label: namePageUppercase, to: routsNameMain.exam.index },
    { label: 'Resultado' },
    { label: rowTaskData?.name as string }
  ]

  // Fetch Task
  async function fetchTaskData() {
    setIsLoading(true)

    // Clear
    setRowTaskData(null)

    // Get
    await TaskViewModel.getOne(taskId as string)
      .then(response => {
        if (response.error) {
          showToastBottom('error', response.msg as string)
          console.log(response.error)
        } else {
          const dataResult = response.data as unknown as TaskInterface

          setRowTaskData(dataResult as TaskInterface)
        }
        setIsLoading(false)
      })
      .catch(err => {
        showToastBottom('error', err as string)
        setIsLoading(false)
      })
  }

  // Fetch Task Submission
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
          const dataResult = response.data as unknown as TaskSubmissionInterface

          console.log(dataResult)

          fetchSubmittedAnswers(dataResult?.task_id, dataResult?.student_id)
          setRowTaskSubmissionData(dataResult as TaskSubmissionInterface)
        }
        setIsLoading(false)
      })
      .catch(err => {
        showToastBottom('error', err as string)
        setIsLoading(false)
      })
  }

  async function fetchSubmittedAnswers(taskId: string, studentId: string) {
    const response = await TaskAnswerViewModel.getAllByTaskAndStudent(
      taskId,
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
    fetchTaskData()
    fetchTaskSubmissionData()
  }, [])
  return (
    <div className="w-full h-full flex flex-col justify-start items-start gap-6">
      {!isLoading && rowTaskData && (
        <>
          <ToastContainer />

          <div className="w-full flex flex-row items-center justify-between gap-2 ">
            <div className="w-full flex flex-col items-start justify-between gap-4">
              <Breadcrumbs items={itemsBreadcrumbs} />
              <h1 className="text-2xl font-bold text-dark dark:text-light ">
                Tarefa: {rowTaskData?.name}
              </h1>
            </div>
          </div>

          <div className="w-full h-full p-6 flex flex-col justify-start items-start gap-6 rounded-md bg-light dark:bg-dark">
            <div className="w-full h-full flex gap-8 flex-row justify-start items-start">
              {/* Left */}
              <div className="w-full p-6 flex flex-1 flex-col justify-center items-center gap-6">
                <div className="w-full p-6 flex flex-col justify-start items-start gap-6 rounded-md bg-light dark:bg-dark">
                  <div className="w-full h-full flex items-center justify-center ">
                    <div className="w-full p-6 flex flex-col justify-center items-center gap-6">
                      {/* Info */}
                      <div className="w-full flex flex-col items-start justify-center gap-1">
                        <div className="w-96 h-64 my-4 flex flex-col items-center justify-center  rounded-lg cursor-pointer bg-gray-70 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100/80 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 transition-all duration-300 relative overflow-hidden">
                          <img
                            className=" w-full h-full object-cover absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-300"
                            src={rowTaskData?.image}
                            alt="Tchossy"
                          />
                        </div>
                      </div>

                      {/* Exam */}
                      <div className="w-full flex flex-1 flex-row items-end gap-3">
                        <TextAreaLabelSimple
                          isDisabled={true}
                          htmlFor={`feedback`}
                          label={`Feedback do professor`}
                          defaultValue={
                            rowTaskSubmissionData
                              ? rowTaskSubmissionData.feedback
                              : ''
                          }
                          onChange={() => null}
                        />
                      </div>

                      <div className="w-full flex flex-1 flex-col items-start justify-center gap-1">
                        <label className="block mb-2 text-lg font-medium dark:text-light text-gray-600">
                          Questões
                        </label>

                        <ExamAnswers examAnswersData={examAnswersData} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right */}
              <div className="w-[26rem] px-2 flex flex-col items-start justify-start">
                <div className="flex flex-col gap-4 items-start justify-start">
                  <h1 className="flex flex-col mb-8 text-lg font-semibold dark:text-light text-gray-800">
                    Resultado da tarefa:
                  </h1>

                  {/* Cotação total */}
                  <div className="flex flex-row gap-3 items-start justify-start">
                    <BadgeCheck size={23} className="pt-1" />
                    <div className="flex flex-col items-start justify-start">
                      <span className="font-semibold">Cotação total</span>
                      <span className="">{rowTaskSubmissionData?.grade}%</span>
                    </div>
                  </div>

                  {/* Data de envio */}
                  <div className="flex flex-row gap-3 items-start justify-start">
                    <CalendarCheck2 size={23} className="pt-1" />
                    <div className="flex flex-col items-start justify-start">
                      <span className="font-semibold">Data de envio</span>
                      <span className="">
                        {rowTaskSubmissionData?.submission_date}
                      </span>
                    </div>
                  </div>

                  {/* Resultado de Tarefa */}
                  <div className="flex flex-row gap-3 items-start justify-start">
                    <Proportions size={23} className="pt-1" />
                    <div className="flex flex-col gap-2 items-start justify-start">
                      <span className="font-semibold">Resultado</span>
                      <div className="mb-2">
                        <BadgeSimple
                          color={colorTask}
                          label={labelResultTask}
                        />
                      </div>
                    </div>
                  </div>

                  {rowTaskSubmissionData?.feedback && (
                    <>
                      {/* Resultado de Tarefa */}
                      <div className="mt-6 flex flex-col gap-2 items-start justify-start">
                        <span className="font-semibold">
                          Feedback do professor
                        </span>
                        <span className="">
                          {rowTaskSubmissionData?.feedback}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {isLoading && (
        <>
          <section className="w-full bg-white dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-48 lg:px-6">
              <div className="mx-auto max-w-screen-sm text-center">
                <BeatLoader color="Blue" size={50} />
                <span className="mb-4 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Buscando a tarefa
                </span>
              </div>
            </div>
          </section>
        </>
      )}

      {!isLoading && !rowTaskData && (
        <section className="w-full bg-white dark:bg-gray-900">
          <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-10 lg:px-6">
            <div className="mx-auto max-w-screen-sm text-center">
              <img src="/illustration/empty-folder.jpg" alt="" />
              <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
                A tarefa não foi encontrado.
              </p>
              <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
                A tarefa que está procurando não existe ou já não se encontra
                disponivel. Por favor, recarregue ou tente novamente.
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
