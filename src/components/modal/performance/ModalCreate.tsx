import { useEffect, useState } from 'react'

// Lib
import Modal from 'react-modal'
import { X } from 'lucide-react'
import { BeatLoader } from 'react-spinners'

// Form
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// Services
import uploadViewModel from '../../../services/ViewModel/uploadViewModel'
import WeeklyAverageViewModel from '../../../services/ViewModel/WeeklyAverageViewModel'

// Data
import { genderOptions, statusOptions } from '../../../data/selectOption'

// Component
import { CustomInput } from '../../input/InputLabel'
import { SelectCustomZod } from '../../selects/SelectCustomZod'

// Style
import { customStylesModalCenter } from '../../../styles/custom/modals'

// Types
import { modalCreateType } from '../../../types/modal'

// Interfaces
import { StudentInterface } from '../../../interfaces/IStudentInterface'

// Utils
import { showToast } from '../../../utils/toasts'
import { ToastContainer } from 'react-toastify'
import ExamViewModel from '../../../services/ViewModel/ExamViewModel'
import { ExamResultInterface } from '../../../interfaces/IExamResultInterface'
import { TaskSubmissionInterface } from '../../../interfaces/ITaskSubmissionInterface'
import { useParams } from 'react-router-dom'
import { WeeklyAverageInterface } from '../../../interfaces/IWeeklyAverageInterface'
import { calculateWeeklyAverage } from '../../../utils/calculateWeeklyAverage'
import TaskSubmissionViewModel from '../../../services/ViewModel/TaskSubmissionViewModel'
import ExamResultViewModel from '../../../services/ViewModel/ExamResultViewModel'
import { converter } from '../../../utils/converter'

const formSchema = z.object({
  week_start: z.string().refine(
    value => {
      return value != ''
    },
    {
      message: 'Por favor, informe o inicio da semana'
    }
  ),
  week_end: z.string().refine(
    value => {
      return value != ''
    },
    {
      message: 'Por favor, informe o fim da semana'
    }
  )
})
type formType = z.infer<typeof formSchema>

export function ModalCreateWeeklyAverage({
  baseInfo,
  handleUpdateListing,
  modalCreateRowIsOpen,
  setModalCreateRowIsOpen
}: modalCreateType<StudentInterface>) {
  const { studentId } = useParams<{ studentId: string }>()

  // Loading
  const [isSend, setIsSend] = useState<boolean>(false)

  const [rowsExamResultData, setRowsExamResultData] = useState<
    ExamResultInterface[] | null
  >(null)
  const [rowsTaskSubmissionData, setRowsTaskSubmissionData] = useState<
    TaskSubmissionInterface[] | null
  >(null)

  // Const
  const namePageSingular = 'Performance'

  // Form Zod
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<formType>({
    resolver: zodResolver(formSchema)
  })

  // Modal
  function closeModal() {
    setModalCreateRowIsOpen(false)
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  // Function
  async function fetchTaskData() {
    // Clear
    setRowsTaskSubmissionData(null)

    // Get
    await TaskSubmissionViewModel.getAllByStudent(baseInfo?.id as string).then(
      response => {
        if (response.error) {
          console.log('error Task => ', response.msg as string)
        } else {
          const arrayData =
            response.data as unknown as TaskSubmissionInterface[]

          setRowsTaskSubmissionData(arrayData as TaskSubmissionInterface[])
        }
      }
    )
  }
  async function fetchExamData() {
    // Clear
    setRowsExamResultData(null)

    await ExamResultViewModel.getAllByStudent(baseInfo?.id as string).then(
      response => {
        if (response.error) {
          console.log('error Exam => ', response.msg as string)
        } else {
          const arrayData = response.data as unknown as ExamResultInterface[]

          setRowsExamResultData(arrayData as ExamResultInterface[])
        }
      }
    )
  }

  // Function Submit Form
  async function handleSubmitForm(dataForm: any) {
    setIsSend(true)

    const average = calculateWeeklyAverage(
      rowsTaskSubmissionData as TaskSubmissionInterface[],
      rowsExamResultData as ExamResultInterface[],
      dataForm.week_start,
      dataForm.week_end
    )

    if (!average) {
      showToast('error', 'resultSubmit.msg')
      setIsSend(false)
      return
    }

    try {
      const dataToSave: WeeklyAverageInterface = {
        student_id: studentId as string,
        week_start: average?.week_start,
        week_end: average?.week_end,
        task_average: average?.task_average,
        exam_grade: average?.exam_grade,
        weekly_average: average?.weekly_average,
        status: average?.status
      }

      const resultSubmit = await WeeklyAverageViewModel.create(dataToSave)

      if (resultSubmit.error) {
        showToast('error', resultSubmit.msg)
        setIsSend(false)
      } else {
        showToast('success', resultSubmit.msg)
        setTimeout(() => {
          setIsSend(false)
          closeModal()
        }, 4000)

        handleUpdateListing()
      }
    } catch (error) {
      showToast('error', String(error) as string)
      setIsSend(false)
    }
  }

  useEffect(() => {
    fetchExamData()
    fetchTaskData()
  }, [])
  return (
    <>
      <Modal
        isOpen={modalCreateRowIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        ariaHideApp={false}
        style={customStylesModalCenter}
        contentLabel="Example Modal"
      >
        <div className="w-full h-full flex items-center justify-center ">
          <ToastContainer />

          <div className="w-full h-auto max-h-[100%] max-w-3xl flex flex-col items-center p-0  rounded-md overflow-y-auto bg-dark overflow-x-hidden scroll-smooth">
            <div className="w-full py-4 px-5 flex flex-row justify-between items-center border-b-[1px] border-gray-600 ">
              <p className="text-xl font-medium text-light">
                Criar {namePageSingular}
              </p>

              <button
                onClick={closeModal}
                className="py-2 px-2 rounded-lg text-light hover:bg-gray-300/20 dark:hover:bg-gray-500/20 active:bg-gray-300 active:text-dark flex flex-row items-center justify-center gap-4 transition-all duration-300"
              >
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={handleSubmit(handleSubmitForm)}
              className="w-full p-6 flex flex-col justify-center items-center gap-6"
            >
              <div className="w-full grid gap-6 md:grid-cols-2">
                <CustomInput
                  type="date"
                  htmlFor="week_start"
                  label="Inicio da semana"
                  control={control}
                  error={errors.week_start}
                />

                <CustomInput
                  type="date"
                  htmlFor="week_end"
                  label="Final da semana"
                  control={control}
                  error={errors.week_end}
                />
              </div>

              <div className="w-full pt-4 flex flex-row justify-between items-center border-t-[1px] border-gray-600 ">
                <button
                  type="submit"
                  disabled={isSend}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  {isSend && (
                    <>
                      <BeatLoader color="white" size={10} />
                    </>
                  )}

                  {!isSend && <span>Gerar média semanal</span>}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </>
  )
}
