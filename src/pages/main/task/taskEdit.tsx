import { useEffect, useState } from 'react'

// Lib
import { ToastContainer } from 'react-toastify'
import { MdOutlinePlaylistAdd } from 'react-icons/md'
import { BeatLoader } from 'react-spinners'

// Form
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// Services
import uploadViewModel from '../../../services/ViewModel/UploadViewModel'
import TaskViewModel from '../../../services/ViewModel/TaskViewModel'
import CourseViewModel from '../../../services/ViewModel/CourseViewModel'
import ModuleViewModel from '../../../services/ViewModel/ModuleViewModel'

// Data
import { routsNameMain } from '../../../data/routsName'
import { statusTaskOptions } from '../../../data/selectOption'

// Component
import { CustomInput } from '../../../components/input/InputLabel'
import { TextAreaLabel } from '../../../components/input/TextAreaLabelZod'
import { SelectCustomZod } from '../../../components/selects/SelectCustomZod'
import { Breadcrumbs } from '../../../components/Breadcrumbs'

// Interfaces
import { TaskInterface } from '../../../interfaces/ITaskInterface'

// Utils
// import { showToastBottom } from '../../../utils/toasts'
// Interfaces
import { CourseInterface } from '../../../interfaces/ICourseInterface'
import { ModuleInterface } from '../../../interfaces/IModuleInterface'
// Types
import { OptionType } from '../../../types/option'
import { TaskQuestionInterface } from '../../../interfaces/ITaskQuestionInterface'
import TaskQuestionViewModel from '../../../services/ViewModel/TaskQuestionViewModel'
import { useParams } from 'react-router-dom'
import { TaskQuestionEditInput } from './components/TaskQuestionEditInput'
import { ModalCreateTaskQuestion } from '../../../components/modal/taskQuestion/ModalCreate'

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

export function TaskEdit() {
  // Params
  const { taskId } = useParams()

  // State
  const [baseInfo, setBaseInfo] = useState<TaskInterface | null>(null)
  const [taskQuestions, setTaskQuestions] = useState<
    TaskQuestionInterface[] | null
  >(null)

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isError, setIsError] = useState<boolean>(false)
  const [isErrorMessage, setIsErrorMessage] = useState<string>('')
  const [isSending, setIsSending] = useState<boolean>(false)

  const [rowsCourseData, setRowsCourseData] = useState<OptionType[]>([])
  const [rowsModuleData, setRowsModuleData] = useState<OptionType[]>([])

  // Modal
  const [modalCreateRowIsOpen, setModalCreateRowIsOpen] =
    useState<boolean>(false)

  // Image
  const [selectedImageFile, setSelectedImageFile] = useState<string>('')
  const [urlImageUploaded, setUrlImageUploaded] = useState<string | null>(null)
  const [imageSelect, setImageSelect] = useState<string>('')

  // Consts
  const namePageEntry = 'Editar tarefa'
  const namePageUppercase = 'Tarefas'

  // List Array
  const itemsBreadcrumbs = [
    { label: 'Inicio', to: routsNameMain.home },
    { label: namePageUppercase, to: routsNameMain.task.index },
    { label: namePageEntry },
    { label: taskId as string }
  ]

  let initialValues: TaskInterface = {
    name: '',
    description: '',
    course_id: '',
    module_id: '',
    mark: '',
    due_date: '',
    status: 'pending'
  }

  // Form Zod
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<formType>({
    defaultValues: initialValues,
    resolver: zodResolver(formSchema)
  })

  // OnChange
  const onImageChange = (e: any) => {
    const [file] = e.target.files
    const photo = e.target.files[0]
    setSelectedImageFile(photo)
    setImageSelect(URL.createObjectURL(file))
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

  // Modal
  function openModalCreateRow() {
    setModalCreateRowIsOpen(true)
  }

  // Delete row
  function handleDeleteRow(id: string) {
    swal({
      title: 'Tem certeza?',
      text: 'Uma vez excluído, você não poderá recuperar!',
      buttons: ['Cancelar', 'Confirmar'],
      icon: 'warning',
      dangerMode: true
    }).then(async willDelete => {
      if (willDelete) {
        await TaskQuestionViewModel.delete(id).then(response => {
          console.log(response)

          if (response.error) {
            swal(`Erro ao deletar registo: ${response.msg}`, {
              icon: 'error'
            })
            console.error('', response.msg)
          } else {
            swal('Deletado com sucesso', {
              icon: 'success'
            })

            fetchTaskData()
          }
        })
      } else {
        swal('O registo está seguro!', {
          icon: 'error'
        })
      }
    })
  }

  // Function Upload
  async function handleUploadImage(): Promise<{
    urlImage: string
    msgUpload: string
  }> {
    console.log('Uploading...')

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

  // Function Submit Form
  async function handleSubmitForm(dataForm: any) {
    setIsSending(true)

    try {
      let urlImageToSave = urlImageUploaded ? urlImageUploaded : ''

      if (selectedImageFile) {
        console.log('selectedImageFile')

        if (!urlImageUploaded) {
          const resUrl = await handleUploadImage()

          const { urlImage, msgUpload } = resUrl
          urlImageToSave = urlImage

          setUrlImageUploaded(urlImage)

          if (!urlImage) {
            setIsError(true)
            setIsErrorMessage(msgUpload)

            setIsSending(false)
            return
          }
        }
      }

      const dataToSave: TaskInterface = {
        ...dataForm,
        image: urlImageToSave
      }

      const resultSubmit = await TaskViewModel.update(
        taskId as string,
        dataToSave
      )

      if (resultSubmit.error) {
        setIsErrorMessage(resultSubmit.msg as string)
        setIsError(true)
        setIsSending(false)
      } else {
        console.log('success', 'Tarefa atualizado com sucesso')

        setTimeout(() => {
          setIsSending(false)
        }, 3000)
      }
    } catch (error) {
      setIsErrorMessage(String(error) as string)
      setIsError(true)
      setIsSending(false)
    }

    setTimeout(() => {
      setIsError(false)
    }, 5000)
  }

  // Function Course
  async function fetchCourseData() {
    // Clear
    setRowsCourseData([])

    // Get
    await CourseViewModel.getAll().then(response => {
      if (response.error) {
        setIsError(true)
        console.log('error', response.msg as string)
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
          setIsError(true)
          console.log('error', response.msg as string)
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
        setIsError(true)
        console.log('error', err as string)
      })
  }

  // Function Task
  async function fetchTaskData() {
    // Clear
    setBaseInfo(null)

    // Get
    await TaskViewModel.getOne(taskId as string).then(response => {
      if (response.error) {
        // alert(response.msg as string)
        // showToastBottom('error', response.msg as string)
        console.log('error', response.msg as string)
      } else {
        const data = response.data as TaskInterface

        setBaseInfo(data)
      }
      setIsLoading(false)
    })
  }

  // Function Task
  async function fetchTaskQuestionData() {
    // Clear
    setTaskQuestions(null)

    // Get
    await TaskViewModel.getAllByTask(taskId as string).then(response => {
      if (response.error) {
        // alert(response.msg as string)
        // showToastBottom('error', response.msg as string)
        console.log('error', response.msg as string)
      } else {
        const data = response.data as TaskQuestionInterface[]

        setTaskQuestions(data)
      }
      setIsLoading(false)
    })
  }

  // Update Listing
  const handleUpdateListing = () => {
    fetchTaskQuestionData()
  }

  useEffect(() => {
    if (baseInfo) {
      reset({
        name: baseInfo.name,
        description: baseInfo.description,
        course_id: baseInfo.course_id,
        module_id: baseInfo.module_id,
        mark: baseInfo.mark,
        due_date: baseInfo.due_date,
        status: baseInfo.status
      })
      setImageSelect(baseInfo?.image as string)
      fetchModuleData(baseInfo?.course_id as string)

      fetchTaskQuestionData()
    }
  }, [baseInfo, reset])

  useEffect(() => {
    fetchTaskData()
    fetchCourseData()
  }, [taskId])

  useEffect(() => {
    fetchCourseData()
  }, [])

  return (
    <div className="w-full h-full flex flex-col justify-start items-start gap-6">
      <ToastContainer />

      {isLoading && (
        <>
          <section className="w-full bg-white dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-48 lg:px-6">
              <div className="mx-auto max-w-screen-sm text-center">
                <BeatLoader color="Blue" size={50} />
                <span className="mb-4 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Buscando detalhes
                </span>
              </div>
            </div>
          </section>
        </>
      )}

      {!isLoading && baseInfo && (
        <>
          <div className="w-full flex flex-row items-center justify-between gap-2 ">
            <div className="w-full flex flex-col items-start justify-between gap-4">
              <Breadcrumbs items={itemsBreadcrumbs} />
              <h1 className="text-2xl font-bold text-dark dark:text-light ">
                {namePageEntry} {taskId && `/ ${taskId}`}
              </h1>
            </div>
          </div>

          <div className="w-full p-6 flex flex-col justify-start items-start gap-6 rounded-md bg-light dark:bg-dark">
            <div className="w-full h-full flex flex-col items-center justify-center ">
              <form
                onSubmit={handleSubmit(handleSubmitForm)}
                className="w-full p-6 flex flex-col justify-center items-center gap-6"
              >
                {isError && (
                  <div
                    className="w-full flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                    role="alert"
                  >
                    <svg
                      className="flex-shrink-0 inline w-4 h-4 me-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <span className="sr-only">Info</span>
                    <div>
                      <span className="font-medium">Erro: </span>{' '}
                      {isErrorMessage}
                    </div>
                  </div>
                )}

                <div className="w-full flex flex-col items-start justify-start">
                  <label className="block mb-2 text-sm font-medium dark:text-light text-gray-600">
                    Imagem da tarefa
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
                            <span className="font-semibold">
                              Click to upload
                            </span>{' '}
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
                        className="hidden"
                        onChange={onImageChange}
                      />
                    </label>
                  </div>
                </div>

                <div className="w-full grid gap-6 md:grid-cols-1">
                  <CustomInput
                    type="text"
                    isDisabled={isSending}
                    htmlFor="name"
                    label="Titulo da tarefa"
                    placeholder="Ex.: Desenvolvimento Web"
                    control={control}
                    error={errors.name}
                  />
                </div>

                <div className="w-full grid gap-6 md:grid-cols-1">
                  <TextAreaLabel
                    htmlFor="description"
                    isDisabled={isSending}
                    label="Descrição"
                    placeholder="Ex.: Curso completo de Desenvolvimento Web com foco em HTML, CSS, JavaScript e frameworks modernos."
                    control={control}
                    error={errors.description}
                  />
                </div>

                <div className="w-full grid gap-6 md:grid-cols-3">
                  <SelectCustomZod
                    name="course_id"
                    label="Curso"
                    isDisabled={isSending}
                    control={control}
                    error={errors.course_id}
                    options={rowsCourseData}
                    onOptionChange={handleCourseChange}
                  />
                  <SelectCustomZod
                    name="module_id"
                    label="Modulo"
                    isDisabled={isSending}
                    control={control}
                    error={errors.module_id}
                    options={rowsModuleData}
                    onOptionChange={handleModuleChange}
                  />
                  <CustomInput
                    type="number"
                    htmlFor="mark"
                    isDisabled={isSending}
                    label="Valor da tarefa"
                    placeholder="Ex.: 100"
                    control={control}
                    error={errors.mark}
                  />
                </div>

                <div className="w-full grid gap-6 md:grid-cols-4">
                  <SelectCustomZod
                    name="status"
                    label="Estado"
                    isDisabled={isSending}
                    control={control}
                    error={errors.status}
                    options={statusTaskOptions}
                    onOptionChange={handleStatusChange}
                  />

                  <CustomInput
                    type="date"
                    htmlFor="due_date"
                    label="Data limite de entrega"
                    isDisabled={isSending}
                    control={control}
                    error={errors.due_date}
                  />
                </div>

                <div className="w-full">
                  <button
                    type="submit"
                    className="w-[16rem] h-[2.6rem] min-w-[12rem] px-3 rounded-lg bg-primary-200 text-white hover:bg-primary-500 active:bg-primary-700 flex flex-row items-center justify-center gap-2 transition-all duration-300 "
                  >
                    {isSending && (
                      <>
                        <BeatLoader color="white" size={10} />
                      </>
                    )}

                    {!isSending && <span>Salvar alterações</span>}
                  </button>
                </div>
              </form>
              {/* Star Task Question */}
              <div className="w-full flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Perguntas da tarefa</h3>
                {/* Question Task Start */}
                {taskQuestions?.map(
                  (question: TaskQuestionInterface, index) => (
                    <TaskQuestionEditInput
                      index={index + 1}
                      task_id={taskId as string}
                      baseInfo={question}
                      handleDeleteRow={handleDeleteRow}
                    />
                  )
                )}
                {/* Question TaskEnd */}

                <button
                  type="button"
                  onClick={openModalCreateRow}
                  className="w-[16rem] h-[2.6rem] min-w-[12rem] px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 active:bg-green-900 flex flex-row items-center justify-center gap-2 transition-all duration-300"
                >
                  <MdOutlinePlaylistAdd className="text-2xl" />
                  Adicionar Pergunta
                </button>
              </div>
              {/* End Task Question */}
            </div>
          </div>
        </>
      )}

      {!isLoading && !baseInfo && (
        <section className="w-full bg-white dark:bg-gray-900">
          <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-10 lg:px-6">
            <div className="mx-auto max-w-screen-sm text-center">
              <img src="/illustration/empty-folder.jpg" alt="" />
              <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
                O registo não foi encontrado.
              </p>
              <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
                O registo que está procurando não existe ou foi apagado. Por
                favor, recarregue ou tente novamente.
              </p>
            </div>
          </div>
        </section>
      )}

      {modalCreateRowIsOpen && (
        <ModalCreateTaskQuestion
          handleUpdateListing={handleUpdateListing}
          modalCreateRowIsOpen={modalCreateRowIsOpen}
          setModalCreateRowIsOpen={setModalCreateRowIsOpen}
        />
      )}
    </div>
  )
}
