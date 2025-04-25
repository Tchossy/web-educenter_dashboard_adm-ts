import { useEffect, useState } from 'react'

// Lib
import { ToastContainer } from 'react-toastify'
import { MdOutlinePlaylistAdd } from 'react-icons/md'
import { BeatLoader } from 'react-spinners'

// Form
import { useFieldArray, useForm, useWatch } from 'react-hook-form'
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
import { QuestionInput } from './components/QuestionInput'

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
import { useNavigate } from 'react-router-dom'

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
  ),
  questions: z
    .array(
      z.object({
        question: z.string({
          required_error: 'A questão é obrigatória'
        }),
        value: z
          .string({
            required_error: 'O valor é obrigatória'
          })
          .min(1, 'O valor deve ser no mínimo 1'),
        question_type: z.string().refine(
          value => {
            return (
              value === 'short_answer' ||
              value === 'multiple_choice' ||
              value === 'image_upload'
            )
          },
          {
            message:
              "Por favor, selecione uma opção válida: 'Resposta curta', 'Múltipla escolha' ou 'Upload de imagem'"
          }
        ),
        question_answer: z.string({
          required_error: 'A questão é obrigatória'
        }),
        options: z
          .array(
            z.object({
              text: z.string({
                required_error: 'O texto da opção é obrigatório'
              }),
              is_valid: z.boolean()
            })
          )
          .optional(),
        question_image: z.instanceof(File).optional().or(z.string().optional())
      })
    )
    .optional()
})
type formType = z.infer<typeof formSchema>

export function ExamCreate() {
  const navigate = useNavigate()

  const handleNavigation = (page: string) => {
    navigate(page) // Navega para a página "/about"
  }

  // State
  const [isCreated, setIsCreated] = useState<boolean>(false)
  const [isExameId, setIsExameId] = useState<string | null>(null)

  const [isSend, setIsSend] = useState<boolean>(false)

  const [rowsCourseData, setRowsCourseData] = useState<OptionType[]>([])
  const [rowsModuleData, setRowsModuleData] = useState<OptionType[]>([])

  // Image
  const [selectedImageFile, setSelectedImageFile] = useState<string>('')
  const [urlExamImageUploaded, setUrlExamImageUploaded] = useState<
    string | null
  >(null)
  const [imageSelect, setImageSelect] = useState<string>('')

  // Consts
  const namePageEntry = 'Criar exame'
  const namePageUppercase = 'Exames'

  // List Array
  const itemsBreadcrumbs = [
    { label: 'Inicio', to: routsNameMain.home },
    { label: namePageUppercase, to: routsNameMain.exam.index },
    { label: namePageEntry }
  ]

  // Form Zod
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<formType>({
    resolver: zodResolver(formSchema)
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions'
  })

  const watchedValues = useWatch({
    control,
    name: 'questions'
  })

  // const totalMark = fields.reduce((acc, field) => {
  //   return acc + Number(field.value)
  // }, 0)

  const totalMark =
    watchedValues?.reduce((acc, question) => {
      const val = Number(question?.value)
      return acc + (isNaN(val) ? 0 : val)
    }, 0) || 0

  const addQuestion = () => {
    append({
      question: '',
      value: '1',
      question_type: 'short_answer',
      question_answer: '',
      options: []
      // image: ''
    })
  }

  // OnChange
  const onImageChange = (e: any) => {
    const [file] = e.target.files
    const photo = e.target.files[0]
    setSelectedImageFile(photo)
    setImageSelect(URL.createObjectURL(file))
    console.log('file => ', file)
  }

  // Handle Select
  const handleCourseChange = (course: string) => {
    console.log(`Selected course: ${course}`)
    fetchModuleData(course)
  }
  const handleModuleChange = (module: string) => {
    console.log(`Selected module: ${module}`)
  }

  // Function Upload
  async function handleUploadExamImage(): Promise<{
    urlExamImage: string
    msgUpload: string
  }> {
    console.log('Uploading...')

    const formData = new FormData()
    formData.append('imageTask', selectedImageFile)

    const result = await uploadViewModel.uploadTaskImage(formData)

    if (result.error) {
      throw new Error(result.msg)
    }

    const urlExamImage = result.url as string
    const msgUpload = result.msg as string
    return {
      urlExamImage,
      msgUpload
    }
  }

  async function handleUploadQuestionImage(file: any): Promise<{
    urlQuestionImage: string
    msgQuestionUpload: string
  }> {
    console.log('Uploading Question...')

    const formData = new FormData()
    formData.append('imageQuestion', file)

    const result = await uploadViewModel.uploadQuestionImage(formData)

    if (result.error) {
      throw new Error(result.msg)
    }

    const urlQuestionImage = result.url as string
    const msgQuestionUpload = result.msg as string
    return {
      urlQuestionImage,
      msgQuestionUpload
    }
  }

  // Function Submit Form
  async function handleSubmitForm(dataForm: any) {
    setIsSend(true)

    try {
      let urlExamImageToSave = urlExamImageUploaded ? urlExamImageUploaded : ''

      if (!urlExamImageUploaded) {
        const resUrl = await handleUploadExamImage()

        const { urlExamImage, msgUpload } = resUrl
        urlExamImageToSave = urlExamImage

        setUrlExamImageUploaded(urlExamImage)

        if (!urlExamImage) {
          showToastBottom('error', msgUpload)
          setIsSend(false)
          return
        }
      }

      const dataToSave: ExamInterface = {
        ...dataForm,
        image: urlExamImageToSave
      }

      if (!isCreated) {
        const resultSubmit = await ExamViewModel.create(dataToSave)

        if (resultSubmit.error) {
          showToastBottom('error', resultSubmit.msg)
          setIsSend(false)
        } else {
          // showToastBottom('success', resultSubmit.msg)
          console.log('Success', resultSubmit.msg)

          setIsSend(false)
          setIsCreated(true)
          setIsExameId(resultSubmit.data?.id as string)

          if (dataForm.questions.length !== 0) {
            dataForm.questions.forEach(
              async (question: any, questionIndex: number) => {
                // Upload Question image
                // try {}
                let urlQuestionImageToSave = ''

                if (question.question_image) {
                  const resQuestionUpload = await handleUploadQuestionImage(
                    question.question_image
                  )

                  const { urlQuestionImage, msgQuestionUpload } =
                    resQuestionUpload
                  urlQuestionImageToSave = urlQuestionImage

                  if (!urlQuestionImage) {
                    showToastBottom(
                      'error',
                      `Pergunta ${questionIndex + 1} - ${msgQuestionUpload}`
                    )
                    setIsSend(false)
                    return
                  }
                }

                // Converte o array em uma string JSON
                const optionsString = JSON.stringify(question.options)

                const questionToSave: ExamQuestionInterface = {
                  exam_id: resultSubmit.data?.id as string,
                  question_text: question.question,
                  question_type: question.question_type,
                  question_answer: question.question_answer,
                  question_image: urlQuestionImageToSave,

                  options: optionsString as any,
                  value: question.value
                }

                const resultQuestionSubmit = await ExamQuestionViewModel.create(
                  questionToSave
                )

                if (resultQuestionSubmit.error) {
                  showToastBottom('error', resultQuestionSubmit.msg)
                  setIsSend(false)
                } else {
                  setTimeout(() => {
                    reset()
                    handleNavigation(routsNameMain.exam.index)
                    setSelectedImageFile('')
                    setUrlExamImageUploaded(null)
                    setImageSelect('')
                    setIsSend(false)
                  }, 3000)
                }

                // console.log(questionToSave)
              }
            )
          } else {
            showToastBottom('error', 'Por favor crie as perguntas para o exame')
          }
        }
      } else {
        // alert('Esse exame já foi criado')

        if (dataForm.questions.length !== 0) {
          dataForm.questions.forEach(
            async (question: any, questionIndex: number) => {
              // Upload Question image
              // try {}
              let urlQuestionImageToSave = ''

              if (question.question_image) {
                const resQuestionUpload = await handleUploadQuestionImage(
                  question.question_image
                )

                const { urlQuestionImage, msgQuestionUpload } =
                  resQuestionUpload
                urlQuestionImageToSave = urlQuestionImage

                if (!urlQuestionImage) {
                  showToastBottom(
                    'error',
                    `Pergunta ${questionIndex + 1} - ${msgQuestionUpload}`
                  )
                  setIsSend(false)
                  return
                }
              }

              // Converte o array em uma string JSON
              const optionsString = JSON.stringify(question.options)

              const questionToSave: ExamQuestionInterface = {
                exam_id: isExameId as string,
                question_text: question.question,
                question_type: question.question_type,
                question_answer: question.question_answer,
                question_image: urlQuestionImageToSave,
                options: optionsString as any,
                value: question.value
              }

              const resultQuestionSubmit = await ExamQuestionViewModel.create(
                questionToSave
              )

              if (resultQuestionSubmit.error) {
                showToastBottom('error', resultQuestionSubmit.msg)
                setIsSend(false)
              } else {
                showToastBottom('success', resultQuestionSubmit.msg)
              }
              console.log(questionToSave)
            }
          )

          setTimeout(() => {
            reset()
            handleNavigation(routsNameMain.exam.index)
            setSelectedImageFile('')
            setUrlExamImageUploaded(null)
            setImageSelect('')
            setIsCreated(false)
            setIsExameId(null)
            setIsSend(false)
          }, 3000)
        } else {
          showToastBottom('error', 'Por favor crie as perguntas para o exame')
          // alert('Por favor crie as perguntas para o exame')
        }
        setIsSend(false)
      }
    } catch (error) {
      showToastBottom('error', String(error) as string)
      setIsSend(false)
    }
  }

  // async function handleSubmitForm2(dataForm: any) {
  //   if (dataForm.questions && Array.isArray(dataForm.questions)) {
  //     const questions = dataForm.questions.map(async (question: any) => {
  //       let urlQuestionImageToSave = ''

  //       if (question.question_image) {
  //         const resUrl = await handleUploadQuestionImage(
  //           question.question_image
  //         )

  //         const { urlQuestionImage, msgQuestionUpload } = resUrl
  //         urlQuestionImageToSave = urlQuestionImage

  //         console.log('URL da imagem da questão =>', urlQuestionImageToSave)

  //         // if (!urlQuestionImage) {
  //         //   showToastBottom('error', msgQuestionUpload)
  //         //   setIsSend(false)
  //         //   return
  //         // } else {
  //         // }
  //       }
  //     })
  //   }
  // }

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

      {/* Float Counter */}
      <div className="z-50 w-[16rem] flex flex-col justify-center items-center fixed top-24 right-6 py-4 px-6 rounded-md border-1 bg-dark shadow-4xl">
        <span className="font-light text-xl text-white">Pontuação total: </span>

        <span className="font-semibold text-2xl text-primary-200">
          <h1>{totalMark}</h1>
        </span>
      </div>

      <div className="w-full flex flex-row items-center justify-between gap-2 ">
        <div className="w-full flex flex-col items-start justify-between gap-4">
          <Breadcrumbs items={itemsBreadcrumbs} />
          <h1 className="text-2xl font-bold text-dark dark:text-light ">
            {namePageEntry} {isExameId && `/ ${isExameId}`}
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

            {/* Star Exam Question */}
            <div className="w-full flex flex-col gap-4">
              <h3 className="text-xl font-semibold">Perguntas do exame</h3>
              {fields.map((field, index) => (
                <QuestionInput
                  key={field.id}
                  control={control}
                  index={index}
                  removeQuestion={remove}
                />
              ))}
              <button
                type="button"
                onClick={addQuestion}
                className="h-[2.6rem] max-w-[14rem] px-6 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 active:bg-green-900 flex flex-row items-center justify-center gap-2 transition-all duration-300"
              >
                <MdOutlinePlaylistAdd className="text-2xl" />
                Adicionar Pergunta
              </button>
            </div>
            {/* End Exam Question */}

            <div className="w-full">
              <button
                disabled={isSend}
                type="submit"
                className="h-[2.6rem] max-w-[14rem] px-6 rounded-lg bg-primary-200 text-white hover:bg-primary-500 active:bg-primary-700 flex flex-row items-center justify-center gap-2 transition-all duration-300 "
              >
                {isSend && (
                  <>
                    <BeatLoader color="white" size={10} />
                  </>
                )}

                {!isSend && <span>Criar Exame</span>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
