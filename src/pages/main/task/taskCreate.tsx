import { useEffect, useState } from 'react'

// Lib
import { ToastContainer } from 'react-toastify'
import { BeatLoader } from 'react-spinners'

// Form
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// Services
import uploadViewModel from '../../../services/ViewModel/uploadViewModel'
import TaskViewModel from '../../../services/ViewModel/TaskViewModel'
import CourseViewModel from '../../../services/ViewModel/CourseViewModel'
import ModuleViewModel from '../../../services/ViewModel/ModuleViewModel'

// Data
import { statusTaskOptions, typeTaskOptions } from '../../../data/selectOption'
import { routsNameMain } from '../../../data/routsName'

// Component
import { CustomInput } from '../../../components/input/InputLabel'
import { TextAreaLabel } from '../../../components/input/TextAreaLabelZod'
import { SelectCustomZod } from '../../../components/selects/SelectCustomZod'
import { Breadcrumbs } from '../../../components/Breadcrumbs'

// Interfaces
import { TaskInterface } from '../../../interfaces/ITaskInterface'

// Utils
import { showToastBottom } from '../../../utils/toasts'
// Interfaces
import { CourseInterface } from '../../../interfaces/ICourseInterface'
import { ModuleInterface } from '../../../interfaces/IModuleInterface'
// Types
import { OptionType } from '../../../types/option'
import { TaskType } from '../../../types/enum'

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
  mark: z
    .string({
      required_error: 'A nota total é obrigatória (em %)'
    })
    .min(1, 'O valor do exame tem que ser maior de 1'),
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
      return value === 'closed' || value === 'open' || value === 'pending'
    },
    {
      message:
        "Por favor, selecione uma opção válida: 'Aberto', 'Fechado ou 'Pendente'"
    }
  )
})
type formType = z.infer<typeof formSchema>

export function TaskCreate() {
  // State
  const [isSend, setIsSend] = useState<boolean>(false)
  const [uploading, setUploading] = useState<boolean>(false)

  const [taskType, setTaskType] = useState<TaskType>('online')

  const [rowsCourseData, setRowsCourseData] = useState<OptionType[]>([])
  const [rowsModuleData, setRowsModuleData] = useState<OptionType[]>([])

  // Image
  const [selectedImageFile, setSelectedImageFile] = useState<string>('')
  const [urlImageUploaded, setUrlImageUploaded] = useState<string | null>(null)
  const [imageSelect, setImageSelect] = useState<string>('')

  // Pdf
  const [selectedPdfFile, setSelectedPdfFile] = useState<string>('')
  const [urlPdfUploaded, setUrlPdfUploaded] = useState<string | null>(null)

  // Const
  const namePageEntry = 'Criar tarefa'
  const namePageUppercase = 'Tarefas'

  // List Array
  const itemsBreadcrumbs = [
    { label: 'Inicio', to: routsNameMain.home },
    { label: namePageUppercase, to: routsNameMain.task.index },
    { label: namePageEntry }
  ]

  // Form Zod
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm<formType>({
    resolver: zodResolver(formSchema)
  })

  // OnChange
  const onImageChange = (e: any) => {
    const [file] = e.target.files
    const photo = e.target.files[0]
    setSelectedImageFile(photo)
    setImageSelect(URL.createObjectURL(file))
  }

  const onTaskPdfChange = (e: any) => {
    const [file] = e.target.files
    const pdf = e.target.files[0]
    setSelectedPdfFile(pdf)
  }

  const handleTaskTypeChange = (value: any) => {
    setTaskType(value)
  }

  // Handle Select
  const handleCourseChange = (course: string) => {
    console.log(`Selected course: ${course}`)
    fetchModuleData(course)
  }
  const handleModuleChange = (module: string) => {
    console.log(`Selected module: ${module}`)
  }
  const handleStatusChange = (gender: string) => {
    // setState(gender)
    console.log(`Selected State: ${gender}`)
  }

  // Function Upload
  async function handleUploadImage(): Promise<{
    urlImage: string
    msgUpload: string
  }> {
    console.log('Uploading...')

    setUploading(true)

    const formData = new FormData()
    formData.append('imageTask', selectedImageFile)

    const result = await uploadViewModel.uploadTaskImage(formData)

    if (result.error) {
      throw new Error(result.msg)
    }

    const urlImage = result.url as string
    const msgUpload = result.msg as string
    return {
      urlImage,
      msgUpload
    }
  }

  // Function Upload
  async function handleUploadPdf(): Promise<{
    urlTaskInstruction: string
    msgUpload: string
  }> {
    console.log('Uploading pdf...')

    setUploading(true)

    const formData = new FormData()
    formData.append('pdfTaskInstruction', selectedPdfFile)

    const result = await uploadViewModel.uploadTaskInstructionPdf(formData)

    if (result.error) {
      throw new Error(result.msg)
    }

    const urlTaskInstruction = result.url as string
    const msgUpload = result.msg as string
    return {
      urlTaskInstruction,
      msgUpload
    }
  }

  // Function Submit Form
  async function handleSubmitForm(dataForm: any) {
    setIsSend(true)

    try {
      let urlPdfToSave = urlPdfUploaded ? urlPdfUploaded : ''
      let urlImageToSave = urlImageUploaded ? urlImageUploaded : ''

      if (!urlImageUploaded) {
        const resUrl = await handleUploadImage()

        const { urlImage, msgUpload } = resUrl
        urlImageToSave = urlImage

        setUrlImageUploaded(urlImage)

        if (!urlImage) {
          showToastBottom('error', msgUpload)
          setIsSend(false)
          return
        }
      }

      if (selectedPdfFile) {
        if (!urlPdfUploaded) {
          const resUrl = await handleUploadPdf()

          const { urlTaskInstruction, msgUpload } = resUrl
          urlPdfToSave = urlTaskInstruction

          setUrlPdfUploaded(urlTaskInstruction)

          if (!urlTaskInstruction) {
            showToastBottom('error', msgUpload)
            setIsSend(false)
            return
          }
        }
      }

      const dataToSave: TaskInterface = {
        ...dataForm,
        image: urlImageToSave,
        file_url: urlPdfToSave
      }

      const resultSubmit = await TaskViewModel.create(dataToSave)

      if (resultSubmit.error) {
        showToastBottom('error', resultSubmit.msg)
        setIsSend(false)
      } else {
        showToastBottom('success', resultSubmit.msg)
        setTimeout(() => {
          reset()
          setSelectedImageFile('')
          setUrlImageUploaded(null)
          setImageSelect('')

          setIsSend(false)
        }, 3000)
      }
    } catch (error) {
      showToastBottom('error', String(error) as string)
      setIsSend(false)
    }
  }

  // Function Course
  async function fetchCourseData() {
    // Clear
    setRowsCourseData([])

    // Get
    await CourseViewModel.getAll().then(response => {
      if (response.error) {
        showToastBottom('error', response.msg as string)
      } else {
        const arrayData = response.data as CourseInterface[]

        const courseOptions: OptionType[] = arrayData?.map(obj => ({
          value: obj.id as string,
          label: obj.name as string
        }))

        setRowsCourseData(courseOptions)
      }
    })
  }
  // Function Module
  async function fetchModuleData(course_id: string) {
    // Clear
    setRowsModuleData([])

    // Get
    await ModuleViewModel.getAllByCourse(course_id)
      .then(response => {
        if (response.error) {
          showToastBottom('error', response.msg as string)
        } else {
          const arrayData = response.data as ModuleInterface[]

          const moduleOptions: OptionType[] = arrayData?.map(obj => ({
            value: obj.id as string,
            label: obj.name as string
          }))

          setRowsModuleData(moduleOptions)
        }
      })
      .catch(err => {
        showToastBottom('error', err as string)
      })
  }

  useEffect(() => {
    fetchCourseData()
  }, [])

  return (
    <div className="w-full h-full flex flex-col justify-start items-start gap-6">
      <ToastContainer />

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
          <form
            onSubmit={handleSubmit(handleSubmitForm)}
            className="w-full p-6 flex flex-col justify-center items-center gap-6"
          >
            <div className="w-full flex flex-col items-start justify-start">
              <label className="block mb-2 text-sm font-medium dark:text-light text-gray-600">
                Imagem do tarefa
              </label>
              <div className="w-full max-w-[14rem] flex items-start justify-start ">
                <label
                  htmlFor="dropzone-file"
                  className="w-full h-40 flex flex-col items-center justify-center border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-70 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100/80 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 transition-all duration-300 relative overflow-hidden"
                >
                  {!imageSelect && (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>{' '}
                        {/* or drag and drop */}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        PNG, JPG or JPEG (MAX. 3Mb)
                      </p>
                    </div>
                  )}

                  {imageSelect && (
                    <img
                      className=" w-full h-full object-cover absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-300"
                      src={imageSelect}
                      alt="Rafael Pilartes"
                    />
                  )}
                  <input
                    id="dropzone-file"
                    type="file"
                    disabled={isSend}
                    className="hidden"
                    onChange={onImageChange}
                  />
                </label>
              </div>
            </div>

            <div className="w-full grid gap-6 md:grid-cols-1">
              <CustomInput
                type="text"
                htmlFor="name"
                label="Titulo do tarefa"
                isDisabled={isSend}
                placeholder="Ex.: Desenvolvimento Web"
                control={control}
                error={errors.name}
              />
            </div>

            <div className="w-full grid gap-6 md:grid-cols-1">
              <TextAreaLabel
                htmlFor="description"
                label="Descrição"
                isDisabled={isSend}
                placeholder="Ex.: Curso completo de Desenvolvimento Web com foco em HTML, CSS, JavaScript e frameworks modernos."
                control={control}
                error={errors.description}
              />
            </div>

            <div className="w-full grid gap-6 md:grid-cols-3">
              <SelectCustomZod
                name="course_id"
                label="Curso"
                isDisabled={isSend}
                control={control}
                error={errors.course_id}
                options={rowsCourseData}
                onOptionChange={handleCourseChange}
              />
              <SelectCustomZod
                name="module_id"
                label="Modulo"
                isDisabled={isSend}
                control={control}
                error={errors.module_id}
                options={rowsModuleData}
                onOptionChange={handleModuleChange}
              />
              <CustomInput
                type="number"
                htmlFor="mark"
                label="Valor do exame"
                isDisabled={isSend}
                placeholder="Ex.: 100"
                control={control}
                error={errors.mark}
              />
            </div>

            <div className="w-full grid gap-6 md:grid-cols-3">
              <SelectCustomZod
                name="status"
                label="Estado"
                isDisabled={isSend}
                control={control}
                error={errors.status}
                options={statusTaskOptions}
                onOptionChange={handleStatusChange}
              />

              <CustomInput
                type="date"
                htmlFor="due_date"
                label="Data limite de entrega"
                isDisabled={isSend}
                control={control}
                error={errors.due_date}
              />

              <SelectCustomZod
                name="task_type"
                label="Tipo de tarefa"
                isDisabled={isSend}
                control={control}
                error={errors.task_type}
                options={typeTaskOptions}
                onOptionChange={handleTaskTypeChange}
              />

              <div className="flex flex-col gap-2">
                <label className="block text-sm font-medium dark:text-light text-gray-600">
                  Upload das instruções (PDF)
                </label>
                <input
                  disabled={isSend}
                  id="dropzone-file"
                  type="file"
                  accept="application/pdf"
                  className={`w-full border dark:bg-gray-700/60 bg-gray-100/10  dark:border-gray-500/60 border-gray-300/60 dark:text-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block`}
                  onChange={onTaskPdfChange}
                />
              </div>
            </div>

            <div className="w-full">
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

                {!isSend && <span>Criar Tarefa</span>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
