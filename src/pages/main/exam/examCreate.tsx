import { useState } from 'react'

// Form
import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// Icon
import { MdOutlinePlaylistAdd } from 'react-icons/md'

// Data
import { routsNameMain } from '../../../data/routsName'

// Components
import { Breadcrumbs } from '../../../components/Breadcrumbs'

// Modals
import { CustomInput } from '../../../components/input/InputLabel'
import { SelectCustomZod } from '../../../components/selects/SelectCustomZod'
import { genderOptions, statusOptions } from '../../../data/selectOption'
import { TextAreaLabel } from '../../../components/input/TextAreaLabelZod'
import { QuestionInput } from './components/QuestionInput'

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
      return value === 'inactive' || value === 'active'
    },
    {
      message: "Por favor, selecione uma opção válida: 'Ativo' ou 'Inativo'"
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
        options: z
          .array(
            z.object({
              text: z.string({
                required_error: 'O texto da opção é obrigatório'
              }),
              is_valid: z.boolean()
            })
          )
          .optional()
        // image: z.string().optional()
      })
    )
    .optional()
})
type formType = z.infer<typeof formSchema>

export function ExamCreate() {
  // State
  const [isSend, setIsSend] = useState<boolean>(false)

  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [imagesSelect, setImagesSelect] = useState<string>('')

  const [rowSelect, setRowSelect] = useState<any | null>(null)
  const [selectedValue, setSelectedValue] = useState('8')

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

  const addQuestion = () => {
    append({
      question: '',
      value: '1',
      question_type: 'short_answer',
      options: []
      // image: ''
    })
  }

  // OnChange
  const onImageChange = (e: any) => {
    const [file] = e.target.files
    const photo = e.target.files[0]
    setSelectedFile(photo)
    setImagesSelect(URL.createObjectURL(file))
  }

  // Funtion
  const handleSubmitForm = async (data: formType) => {
    console.log('Formulário enviado com sucesso', data)
    try {
      setIsSend(true)
      // Adicionar lógica de envio, como uma requisição para a API
    } catch (error) {
      console.error('Erro ao enviar o formulário', error)
    } finally {
      setIsSend(false)
    }
  }

  return (
    <div className="w-full h-full flex flex-col justify-start items-start gap-6">
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
                Imagem do exame
              </label>
              <div className="w-full max-w-[14rem] flex items-start justify-start ">
                <label
                  htmlFor="dropzone-file"
                  className="w-full h-40 flex flex-col items-center justify-center border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-70 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100/80 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 transition-all duration-300 relative overflow-hidden"
                >
                  {!imagesSelect && (
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

                  {imagesSelect && (
                    <img
                      className=" w-full h-full object-cover absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-300"
                      src={imagesSelect}
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
                options={statusOptions}
                onOptionChange={() => null}
              />
              <SelectCustomZod
                name="module_id"
                label="Modulo"
                control={control}
                error={errors.module_id}
                options={statusOptions}
                onOptionChange={() => null}
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
                options={statusOptions}
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
                className="w-[16rem] h-[2.6rem] min-w-[12rem] px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 active:bg-green-900 flex flex-row items-center justify-center gap-2 transition-all duration-300"
              >
                <MdOutlinePlaylistAdd className="text-2xl" />
                Adicionar Pergunta
              </button>
            </div>
            {/* End Exam Question */}

            <div className="w-full">
              <button
                type="submit"
                className="w-[16rem] h-[2.6rem] min-w-[12rem] px-3 rounded-lg bg-primary-200 text-white hover:bg-primary-500 active:bg-primary-700 flex flex-row items-center justify-center gap-2 transition-all duration-300 "
              >
                Criar Exame
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
