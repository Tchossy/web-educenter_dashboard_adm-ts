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
import ExamViewModel from '../../../services/ViewModel/ExamViewModel'
import CourseViewModel from '../../../services/ViewModel/CourseViewModel'
import ModuleViewModel from '../../../services/ViewModel/ModuleViewModel'

// Data
import { routsNameMain } from '../../../data/routsName'
import { statusExamOptions } from '../../../data/selectOption'

// Component
import { CustomInput } from '../../../components/input/InputLabel'
import { TextAreaLabel } from '../../../components/input/TextAreaLabelZod'
import { SelectCustomZod } from '../../../components/selects/SelectCustomZod'
import { Breadcrumbs } from '../../../components/Breadcrumbs'

// Interfaces
import { ExamInterface } from '../../../interfaces/IExamInterface'

// Utils
import { showToastBottom } from '../../../utils/toasts'
// Interfaces
import { CourseInterface } from '../../../interfaces/ICourseInterface'
import { ModuleInterface } from '../../../interfaces/IModuleInterface'
// Types
import { OptionType } from '../../../types/option'
import { ExamQuestionInterface } from '../../../interfaces/IExamQuestionInterface'
import ExamQuestionViewModel from '../../../services/ViewModel/ExamQuestionViewModel'
import { useParams } from 'react-router-dom'
import { ExamQuestionEditInput } from './components/ExamQuestionEditInput'
import { ModalCreateExamQuestion } from '../../../components/modal/examQuestion/ModalCreate'

const formSchema = z.object({
  name: z
    .string({
      required_error: 'O titulo é obrigatório!'
    })
    .min(3, 'O titulo deve ter no mínimo 3 caracteres'),
  description: z
    .string({
      required_error: 'A descrição é obrigatório!'
    })
    .min(3, 'O titulo deve ter no mínimo 3 caracteres'),
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
  start_time: z.string().refine(
    value => {
      return value != ''
    },
    {
      message: 'Por favor, informe hora de inicio'
    }
  ),
  end_time: z.string().refine(
    value => {
      return value != ''
    },
    {
      message: 'Por favor, informe hora de fim'
    }
  ),
  date_exam: z.string().refine(
    value => {
      return value != ''
    },
    {
      message: 'Por favor, escolha uma data para o exame'
    }
  ),
  mark: z
    .string({
      required_error: 'As marcas totais são obrigatórias'
    })
    .min(1, 'O valor do exame tem que ser maior de 1'),
  status: z.string().refine(
    value => {
      return value === 'scheduled' || value === 'completed'
    },
    {
      message: "Por favor, selecione uma opção válida: 'Agendado' ou 'Completo'"
    }
  )
})
type formType = z.infer<typeof formSchema>

export function ExamEdit() {
  // Params
  const { examId } = useParams()

  // State
  const [baseInfo, setBaseInfo] = useState<ExamInterface | null>(null)
  const [examQuestions, setExamQuestions] = useState<
    ExamQuestionInterface[] | null
  >(null)

  const [isLoading, setIsLoading] = useState<boolean>(true)
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
  const namePageEntry = 'Editar exame'
  const namePageUppercase = 'Exames'

  // List Array
  const itemsBreadcrumbs = [
    { label: 'Inicio', to: routsNameMain.home },
    { label: namePageUppercase, to: routsNameMain.exam.index },
    { label: namePageEntry },
    { label: examId as string }
  ]

  let initialValues: ExamInterface = {
    name: '',
    description: '',
    course_id: '',
    module_id: '',
    start_time: '',
    end_time: '',
    date_exam: '',
    mark: '',
    status: 'scheduled'
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
        await ExamQuestionViewModel.delete(id).then(response => {
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

            fetchExamData()
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
            showToastBottom('error', msgUpload)
            setIsSending(false)
            return
          }
        }
      }

      const dataToSave: ExamInterface = {
        ...dataForm,
        image: urlImageToSave
      }

      const resultSubmit = await ExamViewModel.update(
        examId as string,
        dataToSave
      )

      if (resultSubmit.error) {
        console.log('error', resultSubmit.msg as string)
        setIsSending(false)
      } else {
        console.log('success', 'Exame atualizado com sucesso')

        setTimeout(() => {
          setIsSending(false)
        }, 3000)
      }
    } catch (error) {
      console.log('error', String(error) as string)
      setIsSending(false)
    }
  }

  // Function Course
  async function fetchCourseData() {
    // Clear
    setRowsCourseData([])

    // Get
    await CourseViewModel.getAll().then(response => {
      if (response.error) {
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
        console.log('error', err as string)
      })
  }

  // Function Task
  async function fetchExamData() {
    // Clear
    setBaseInfo(null)

    // Get
    await ExamViewModel.getOne(examId as string).then(response => {
      if (response.error) {
        // alert(response.msg as string)
        // showToastBottom('error', response.msg as string)
        console.log('error', response.msg as string)
      } else {
        const data = response.data as ExamInterface

        setBaseInfo(data)
      }
      setIsLoading(false)
    })
  }

  // Function Task
  async function fetchExamQuestionData() {
    // Clear
    setExamQuestions(null)

    // Get
    await ExamViewModel.getAllByExam(examId as string).then(response => {
      if (response.error) {
        // alert(response.msg as string)
        // showToastBottom('error', response.msg as string)
        console.log('error', response.msg as string)
      } else {
        const data = response.data as ExamQuestionInterface[]

        setExamQuestions(data)
      }
      setIsLoading(false)
    })
  }

  // Update Listing
  const handleUpdateListing = () => {
    fetchExamQuestionData()
  }

  useEffect(() => {
    if (baseInfo) {
      reset({
        name: baseInfo.name,
        description: baseInfo.description,
        course_id: baseInfo.course_id,
        module_id: baseInfo.module_id,
        start_time: baseInfo.start_time,
        end_time: baseInfo.end_time,
        date_exam: baseInfo.date_exam,
        mark: baseInfo.mark,
        status: baseInfo.status
      })
      setImageSelect(baseInfo?.image as string)
      fetchModuleData(baseInfo?.course_id as string)

      fetchExamQuestionData()
    }
  }, [baseInfo, reset])

  useEffect(() => {
    fetchExamData()
    fetchCourseData()
  }, [examId])

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
                {namePageEntry} {examId && `/ ${examId}`}
              </h1>
            </div>
          </div>

          <div className="w-full p-6 flex flex-col justify-start items-start gap-6 rounded-md bg-light dark:bg-dark">
            <div className="w-full h-full flex flex-col items-center justify-center ">
              <form
                onSubmit={handleSubmit(handleSubmitForm)}
                className="w-full p-6 flex flex-col justify-center items-center gap-6"
              >
                <div className="w-full flex flex-col items-start justify-start">
                  <label className="block mb-2 text-sm font-medium dark:text-light text-gray-600">
                    Imagem do exame
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
                    htmlFor="name"
                    label="Titulo do exame"
                    placeholder="Ex.: Desenvolvimento Web"
                    control={control}
                    error={errors.name}
                  />
                </div>

                <div className="w-full grid gap-6 md:grid-cols-1">
                  <TextAreaLabel
                    htmlFor="description"
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
                    control={control}
                    error={errors.course_id}
                    options={rowsCourseData}
                    onOptionChange={handleCourseChange}
                  />
                  <SelectCustomZod
                    name="module_id"
                    label="Modulo"
                    control={control}
                    error={errors.module_id}
                    options={rowsModuleData}
                    onOptionChange={handleModuleChange}
                  />
                  <CustomInput
                    type="number"
                    htmlFor="mark"
                    label="Valor do exame"
                    placeholder="Ex.: 100"
                    control={control}
                    error={errors.mark}
                  />
                </div>

                <div className="w-full grid gap-6 md:grid-cols-4">
                  <SelectCustomZod
                    name="status"
                    label="Estado"
                    control={control}
                    error={errors.status}
                    options={statusExamOptions}
                    onOptionChange={() => null}
                  />
                  <CustomInput
                    type="time"
                    htmlFor="start_time"
                    label="Hora do início do exame"
                    control={control}
                    error={errors.start_time}
                  />
                  <CustomInput
                    type="time"
                    htmlFor="end_time"
                    label="Hora do fim do exame"
                    control={control}
                    error={errors.end_time}
                  />
                  <CustomInput
                    type="date"
                    htmlFor="date_exam"
                    label="Data do exame"
                    control={control}
                    error={errors.date_exam}
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
              {/* Star Exam Question */}
              <div className="w-full flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Perguntas do exame</h3>
                {/* Question Exam Start */}
                {examQuestions?.map(
                  (question: ExamQuestionInterface, index) => (
                    <ExamQuestionEditInput
                      index={index + 1}
                      exam_id={examId as string}
                      baseInfo={question}
                      handleDeleteRow={handleDeleteRow}
                    />
                  )
                )}
                {/* Question ExamEnd */}

                <button
                  type="button"
                  onClick={openModalCreateRow}
                  className="w-[16rem] h-[2.6rem] min-w-[12rem] px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 active:bg-green-900 flex flex-row items-center justify-center gap-2 transition-all duration-300"
                >
                  <MdOutlinePlaylistAdd className="text-2xl" />
                  Adicionar Pergunta
                </button>
              </div>
              {/* End Exam Question */}
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
        <ModalCreateExamQuestion
          handleUpdateListing={handleUpdateListing}
          modalCreateRowIsOpen={modalCreateRowIsOpen}
          setModalCreateRowIsOpen={setModalCreateRowIsOpen}
        />
      )}
    </div>
  )
}
