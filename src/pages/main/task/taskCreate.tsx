import { useState } from 'react'

// Form
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// Data
import { routsNameMain } from '../../../data/routsName'

// Components
import { Breadcrumbs } from '../../../components/Breadcrumbs'

// Modals
import { CustomInput } from '../../../components/input/InputLabel'
import { SelectCustomZod } from '../../../components/selects/SelectCustomZod'
import { statusOptions, typeTaskOptions } from '../../../data/selectOption'
import { TextAreaLabel } from '../../../components/input/TextAreaLabelZod'
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
      return value === 'inactive' || value === 'active'
    },
    {
      message: "Por favor, selecione uma opção válida: 'Ativo' ou 'Inativo'"
    }
  )
})
type formType = z.infer<typeof formSchema>

export function TaskCreate() {
  // State
  const [isSend, setIsSend] = useState<boolean>(false)
  const [taskType, setTaskType] = useState<TaskType>('online')

  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [selectedTaskFile, setSelectedTaskFile] = useState<File | null>(null)
  const [imagesSelect, setImagesSelect] = useState<string>('')

  const [rowSelect, setRowSelect] = useState<any | null>(null)
  const [selectedValue, setSelectedValue] = useState('8')

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
    handleSubmit,
    formState: { errors }
  } = useForm<formType>({
    resolver: zodResolver(formSchema)
  })

  // OnChange
  const onImageChange = (e: any) => {
    const [file] = e.target.files
    const photo = e.target.files[0]
    setSelectedFile(photo)
    setImagesSelect(URL.createObjectURL(file))
  }
  const onTaskPdfChange = (e: any) => {
    const [file] = e.target.files
    const pdf = e.target.files[0]
    setSelectedTaskFile(pdf)
  }
  const handleTaskTypeChange = (value: any) => {
    setTaskType(value)
  }
  const handleStatusChange = (gender: string) => {
    // setState(gender)
    console.log(`Selected State: ${gender}`)
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
                Imagem do tarefa
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
                label="Titulo do tarefa"
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

            <div className="w-full grid gap-6 md:grid-cols-3">
              <SelectCustomZod
                name="status"
                label="Estado"
                control={control}
                error={errors.status}
                options={statusOptions}
                onOptionChange={handleStatusChange}
              />

              <CustomInput
                type="date"
                htmlFor="due_date"
                label="Data limite de entrega"
                control={control}
                error={errors.due_date}
              />

              <SelectCustomZod
                name="task_type"
                label="Tipo de tarefa"
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
                className="w-[16rem] h-[2.6rem] min-w-[12rem] px-3 rounded-lg bg-primary-200 text-white hover:bg-primary-500 active:bg-primary-700 flex flex-row items-center justify-center gap-2 transition-all duration-300 "
              >
                Criar Tarefa
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
