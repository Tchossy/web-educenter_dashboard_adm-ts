import { useEffect, useState } from 'react'

// Form
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller } from 'react-hook-form'

// Lib
import { BeatLoader } from 'react-spinners'
// import { ToastContainer } from 'react-toastify'
// icons
import { MdUpdate } from 'react-icons/md'
import { AiFillDelete } from 'react-icons/ai'

// services
import TaskQuestionViewModel from '../../../../services/ViewModel/TaskQuestionViewModel'

// components
import { MultipleChoiceOptions } from './MultipleChoiceOptions'
import { CustomInput } from '../../../../components/input/InputLabel'
import { SelectCustomZod } from '../../../../components/selects/SelectCustomZod'
// data
import { questionTypeOptions } from '../../../../data/selectOption'
// interfaces
import { TaskQuestionInterface } from '../../../../interfaces/ITaskQuestionInterface'
// utils
import { showToastBottom } from '../../../../utils/toasts'
import { TextAreaLabel } from '../../../../components/input/TextAreaLabelZod'
import UploadViewModel from '../../../../services/ViewModel/UploadViewModel'

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
  question_answer: z
    .string({
      required_error: 'A resposta correta é obrigatória'
    })
    .optional(),
  question_image: z.instanceof(File).optional(),
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
})

type formType = z.infer<typeof formSchema>

type rowQuestionType<T> = {
  task_id: string
  index: number
  baseInfo: T
  handleDeleteRow: (e: string) => void
}

export function TaskQuestionEditInput({
  task_id,
  index,
  baseInfo,
  handleDeleteRow
}: rowQuestionType<TaskQuestionInterface>) {
  const [isSending, setIsSending] = useState<boolean>(false)
  const [questionType, setQuestionType] = useState<string>(
    baseInfo?.question_type || 'short_answer'
  )
  const [imagePreview, setImagePreview] = useState<string>('')

  const optionsParse = baseInfo.options
    ? JSON.parse(baseInfo.options as any)
    : ''

  const initialValues: formType = {
    // task_id: baseInfo.task_id,
    question_text: baseInfo.question_text,
    question_type: baseInfo.question_type || 'short_answer',
    question_answer: baseInfo.question_answer,
    question_image: undefined,
    options: optionsParse(),
    value: baseInfo.value
  }

  // Form Zod
  const {
    control,
    handleSubmit
    // watch // Observa as mudanças no formulário
  } = useForm<formType>({
    defaultValues: initialValues,
    resolver: zodResolver(formSchema)
  })
  const handleQuestionTypeChange = (value: string) => {
    setQuestionType(value)
  }

  // Observa o campo de opções
  // const watchOptions = watch('options')

  async function handleUploadQuestionImage(file: any): Promise<{
    urlQuestionImage: string
    msgQuestionUpload: string
  }> {
    console.log('Uploading Question...')

    const formData = new FormData()
    formData.append('imageQuestion', file)

    const result = await UploadViewModel.uploadQuestionImage(formData)

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
    setIsSending(true)

    console.log(dataForm)

    // Upload Question image
    // try {}
    let urlQuestionImageToSave = ''

    if (dataForm.question_image) {
      const resQuestionUpload = await handleUploadQuestionImage(
        dataForm.question_image
      )

      const { urlQuestionImage, msgQuestionUpload } = resQuestionUpload
      urlQuestionImageToSave = urlQuestionImage

      // setUrlQuestionImageUploaded(urlQuestionImage)

      if (!urlQuestionImage) {
        showToastBottom('error', `Pergunta ${index} - ${msgQuestionUpload}`)
        setIsSending(false)
        return
      }
    }

    try {
      const dataToSave: TaskQuestionInterface = {
        ...dataForm,
        question_answer: dataForm.question_answer,
        question_image: urlQuestionImageToSave,
        options: dataForm.options ? JSON.stringify(dataForm.options) : '',
        task_id: task_id
      }

      const resultSubmit = await TaskQuestionViewModel.update(
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
  }

  useEffect(() => {
    if (baseInfo.question_image) {
      setImagePreview(baseInfo.question_image)
    }
  }, [baseInfo.question_image])

  return (
    <form
      onSubmit={handleSubmit(handleSubmitForm, errors => {
        console.log(errors)
      })}
      className="w-full flex flex-col gap-4 p-4 border border-gray-300 dark:border-gray-500 rounded-md"
    >
      <TextAreaLabel
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

        <div className="w-full h-full flex flex-1 flex-row max-w-s-520:flex-col gap-5 items-end max-w-s-520:items-start">
          <div className="min-w-16 max-w-s-520:max-w-20">
            <CustomInput
              type="number"
              isDisabled={isSending}
              htmlFor="value"
              label={`Valor da questão`}
              placeholder="Valor"
              control={control}
            />
          </div>

          <button
            type="button"
            disabled={isSending}
            onClick={() => handleDeleteRow(baseInfo?.id as string)}
            className="w-full min-w-24 max-w-[8rem] h-[2.6rem] px-1 rounded-lg bg-[#FF0000] text-white hover:bg-red-600 active:bg-red-900 flex flex-row items-center justify-center gap-2 transition-all duration-300 "
          >
            <span>
              <AiFillDelete />
            </span>
            Remover
          </button>

          <button
            type="submit"
            disabled={isSending}
            className="w-full min-w-24 max-w-[8rem] h-[2.6rem] px-1 rounded-lg bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-900 flex flex-row items-center justify-center gap-2 transition-all duration-300 "
          >
            {isSending && (
              <span>
                <BeatLoader color="white" size={10} />
              </span>
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

      {questionType === 'image_upload' && (
        <div className="flex flex-col gap-2">
          <div className="w-full max-w-[14rem] flex items-start justify-start ">
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Pré-visualização"
                className="w-full max-h-64 object-contain rounded-md"
              />
            )}
          </div>

          <label className="block mb-2 text-sm font-medium dark:text-light text-gray-600">
            Upload de imagem
          </label>

          <Controller
            name="question_image"
            control={control}
            render={({ field }) => (
              <>
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => {
                    const file = e.target.files?.[0]
                    field.onChange(file)
                    setImagePreview(file ? URL.createObjectURL(file) : '')
                  }}
                  className="w-full border dark:bg-gray-700/60 bg-gray-100/10  dark:border-gray-500/60 border-gray-300/60 dark:text-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block"
                />
              </>
            )}
          />

          <label className="block mt-2 mb-2 text-base font-semibold dark:text-light text-gray-600">
            Opções:
          </label>
          <MultipleChoiceOptions control={control} options={optionsParse()} />
        </div>
      )}

      {questionType === 'short_answer' && (
        <div className=" mt-4 flex flex-col gap-4">
          <div className="w-full min-w-[66px]">
            <TextAreaLabel
              htmlFor="question_answer"
              label={`Resposta correta`}
              placeholder="Resposta"
              control={control}
            />
          </div>
        </div>
      )}

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
