import { useState } from 'react'

// Form
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
// Lib
import { BeatLoader } from 'react-spinners'
import { ToastContainer } from 'react-toastify'
// icons
import { MdUpdate } from 'react-icons/md'
import { AiFillDelete } from 'react-icons/ai'

// services
import ExamQuestionViewModel from '../../../../services/ViewModel/ExamQuestionViewModel'

// components
import { MultipleChoiceOptions } from './MultipleChoiceOptions'
import { CustomInput } from '../../../../components/input/InputLabel'
import { SelectCustomZod } from '../../../../components/selects/SelectCustomZod'
// data
import { questionTypeOptions } from '../../../../data/selectOption'
// interfaces
import { ExamQuestionInterface } from '../../../../interfaces/IExamQuestionInterface'
// utils
import { showToastBottom } from '../../../../utils/toasts'

// Validação Zod
const formSchema = z.object({
  question_text: z.string({
    required_error: 'A questão é obrigatória'
  }),
  value: z.string().min(1, 'O valor deve ser no mínimo 1'),
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
    .optional(),
  image: z.string().optional()
})

type formType = z.infer<typeof formSchema>

type rowQuestionType<T> = {
  exam_id: string
  index: number
  baseInfo: T
  handleUpdateListing: () => void
  handleDeleteRow: (e: string) => void
}

export function ExamQuestionEditInput({
  exam_id,
  index,
  baseInfo,
  handleUpdateListing,
  handleDeleteRow
}: rowQuestionType<ExamQuestionInterface>) {
  const [isSending, setIsSending] = useState<boolean>(false)
  const [questionType, setQuestionType] = useState<string>(
    baseInfo?.question_type || 'short_answer'
  )

  const optionsParse = baseInfo.options
    ? JSON.parse(baseInfo.options as any)
    : ''

  const initialValues: ExamQuestionInterface = {
    exam_id: baseInfo.exam_id,
    question_text: baseInfo.question_text,
    question_type: baseInfo.question_type,
    options: optionsParse || [],
    value: baseInfo.value
  }

  // Form Zod
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch // Observa as mudanças no formulário
  } = useForm<formType>({
    defaultValues: initialValues,
    resolver: zodResolver(formSchema)
  })
  const handleQuestionTypeChange = (value: string) => {
    setQuestionType(value)
  }

  // Observa o campo de opções
  const watchOptions = watch('options')

  // Function Submit Form
  async function handleSubmitForm(dataForm: any) {
    setIsSending(true)

    try {
      const dataToSave: ExamQuestionInterface = {
        ...dataForm,
        options: dataForm.options ? JSON.stringify(dataForm.options) : '',
        exam_id: exam_id
      }

      const resultSubmit = await ExamQuestionViewModel.update(
        baseInfo.id as string,
        dataToSave
      )

      if (resultSubmit.error) {
        showToastBottom('error', resultSubmit.msg)
        setIsSending(false)
      } else {
        showToastBottom('success', resultSubmit.msg)

        setTimeout(() => {
          setIsSending(false)
        }, 3000)
      }
    } catch (error) {
      showToastBottom('error', String(error) as string)
      setIsSending(false)
    }

    console.log('Dados do Formulário:', dataForm)
    console.log('Opções Submetidas:', dataForm.options) // Verifica se opções são submetidas
  }

  return (
    <form
      onSubmit={handleSubmit(handleSubmitForm, errors => {
        console.log(errors)
      })}
      className="w-full flex flex-col gap-4 p-4 border rounded-md"
    >
      <ToastContainer />

      <CustomInput
        type="text"
        isDisabled={isSending}
        htmlFor="question_text"
        label={`Questão ${index}`}
        placeholder="Digite a questão"
        control={control}
      />

      <div className="w-full grid gap-6 md:grid-cols-2">
        <SelectCustomZod
          name="question_type"
          isDisabled={isSending}
          label="Tipo de questão"
          control={control}
          options={questionTypeOptions}
          onOptionChange={handleQuestionTypeChange}
        />

        <div className="w-full h-full flex flex-1 flex-row gap-5 items-end">
          <CustomInput
            type="number"
            isDisabled={isSending}
            htmlFor="value"
            label={`Valor da questão`}
            placeholder="Valor"
            control={control}
          />

          <button
            type="button"
            disabled={isSending}
            onClick={() => handleDeleteRow(baseInfo?.id as string)}
            className="w-full max-w-[8rem] h-[2.6rem] px-1 rounded-lg bg-[#FF0000] text-white hover:bg-red-600 active:bg-red-900 flex flex-row items-center justify-center gap-2 transition-all duration-300 "
          >
            <AiFillDelete />
            Remover
          </button>

          <button
            type="submit"
            disabled={isSending}
            className="w-full max-w-[8rem] h-[2.6rem] px-1 rounded-lg bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-900 flex flex-row items-center justify-center gap-2 transition-all duration-300 "
          >
            {isSending && (
              <>
                <BeatLoader color="white" size={10} />
              </>
            )}

            {!isSending && (
              <>
                <MdUpdate />
                Atualizar
              </>
            )}
          </button>
        </div>
      </div>

      {questionType === 'multiple_choice' && (
        <div className=" mt-4 flex flex-col gap-4">
          <label className="block mb-2 text-base font-semibold dark:text-light text-gray-600">
            Opções:
          </label>
          {/* Renderizar opções múltiplas */}
          <MultipleChoiceOptions
            control={control}
            options={optionsParse || []}
          />
        </div>
      )}
    </form>
  )
}
