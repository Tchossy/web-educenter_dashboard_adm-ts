import { useState } from 'react'

// Form
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// Icons
import { SendHorizontal } from 'lucide-react'

// Data
import { routsNameMain } from '../../../data/routsName'
import { examAnswers } from '../../../data/tableData'

// Components
import { Breadcrumbs } from '../../../components/Breadcrumbs'
import { BadgeSimple } from '../../../components/badge/BadgeSimple'
import { InputLabelSimple } from '../../../components/input/InputLabelSimple'
import { TextAreaLabelSimple } from '../../../components/input/TextAreaLabelSimple'

// Type
import { TaskType } from '../../../types/enum'
import { InputCheckbox } from '../../../components/input/InputCheckbox'

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
  // State
  const [isSend, setIsSend] = useState<boolean>(false)
  const [taskType, setTaskType] = useState<TaskType>('online')

  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [selectedTaskFile, setSelectedTaskFile] = useState<File | null>(null)
  const [imagesSelect, setImagesSelect] = useState<string>('')

  // Const
  const namePageEntry = 'Correção do exame'
  const namePageUppercase = 'Exames'

  const status = 'checked'

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
            <div className="w-full grid gap-6 md:grid-cols-3 rounded-2xl p-4 border-2">
              <div className="flex flex-row items-center justify-start">
                <div className="w-20 h-20 flex flex-col items-center justify-center border-2 border-gray-300 border-dashed rounded-full cursor-pointer bg-gray-70 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100/80 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 transition-all duration-300 relative overflow-hidden">
                  <img
                    className=" w-full h-full object-cover absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-300"
                    src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                    alt="Tchossy"
                  />
                </div>
                <div className="ml-4 flex flex-col">
                  <h4 className="text-2xl font-semibold text-center md:text-left">
                    Leroy Jenkins
                  </h4>
                  <p className="">joao.silva@example.com</p>
                </div>
              </div>

              <div className="w-full flex flex-1 flex-col items-start justify-center gap-3">
                <p className="">
                  <span className="font-semibold">Curso:</span>
                  <span> Desenvolvimento Web </span>
                </p>

                <p className="">
                  <span className="font-semibold">Módulo:</span>
                  <span> Fundamentos da Web </span>
                </p>
              </div>

              <div className="w-full flex flex-1 flex-col items-start justify-center gap-3">
                <div className="w-full flex flex-row items-center gap-3">
                  <span className="font-semibold">Status do exame:</span>
                  <div className="w-44 flex flex-row items-start gap-3">
                    <BadgeSimple
                      color={status == 'checked' ? 'green' : 'red'}
                      label={
                        status == 'checked'
                          ? 'Exame já corrigido'
                          : 'Exame por corrigir'
                      }
                    />
                  </div>
                </div>
                <p className="">
                  <span className="font-semibold">Data de entrega:</span>
                  <span> 2024-12-15</span>
                </p>
              </div>
            </div>

            <div className="w-full flex flex-1 flex-row items-end gap-3">
              <TextAreaLabelSimple
                isDisabled={true}
                htmlFor={`feedback`}
                label={`Feedback para o aluno`}
                onChange={() => null}
              />
              <button
                onClick={() => null}
                className="w-[12rem] h-[2.9rem] px-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-900 flex flex-row items-center justify-center gap-2 transition-all duration-300 "
              >
                Enviar feedback
                <SendHorizontal size={18} />
              </button>
            </div>

            <div className="w-full flex flex-1 flex-col items-start justify-center gap-1">
              <label className="block mb-2 text-lg font-medium dark:text-light text-gray-600">
                Questões
              </label>

              <div className="w-full gap-4 p-4 border rounded-md">
                {examAnswers.map((answer, answerIndex) => {
                  const currentIndex = answerIndex + 1
                  return (
                    <div className="w-full my-4 flex flex-1 flex-row gap-3">
                      <div className="flex flex-1">
                        <TextAreaLabelSimple
                          isDisabled={true}
                          htmlFor={`answer_${answer.id}`}
                          label={`Questão ${currentIndex}: ${answer.question_title}`}
                          value={`Resposta: ${answer.answer}`}
                          onChange={() => null}
                        />
                      </div>

                      <div className="flex flex-row gap-3 items-end">
                        <div className="">
                          <InputCheckbox
                            htmlFor="is_valid"
                            label="Correta"
                            value={answer.is_correct} // Valor inicial
                            onChange={isChecked =>
                              console.log(
                                `Checkbox ${answer.id} marcado:`,
                                isChecked
                              )
                            } // Função para capturar a mudança
                          />
                        </div>

                        <div className="w-full max-w-[6rem]">
                          <InputLabelSimple
                            type="number"
                            htmlFor="name"
                            label={`Cotação`}
                            value={answer.mark}
                            // isDisabled={answer.is_correct}
                            onChange={() => null}
                          />
                        </div>

                        <button
                          onClick={() => null}
                          className="w-[4rem] h-[2.6rem] px-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-900 flex flex-row items-center justify-center gap-2 transition-all duration-300 "
                        >
                          Salvar
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="w-full">
              <button
                type="submit"
                className="w-[16rem] h-[2.6rem] min-w-[12rem] px-3 rounded-lg bg-primary-200 text-white hover:bg-primary-500 active:bg-primary-700 flex flex-row items-center justify-center gap-2 transition-all duration-300"
              >
                Salvar como corrigido
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
