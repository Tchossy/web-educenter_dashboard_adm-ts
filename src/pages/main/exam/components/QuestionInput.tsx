import { useState } from 'react'

// Form
import { z } from 'zod'

// icons
import { AiFillDelete } from 'react-icons/ai'
import { Plus } from 'lucide-react'

// components
import { CustomInput } from '../../../../components/input/InputLabel'
import { SelectCustomZod } from '../../../../components/selects/SelectCustomZod'
import { questionTypeOptions } from '../../../../data/selectOption'

// Validação Zod
const questionSchema = z.object({
  question: z.string({
    required_error: 'A questão é obrigatória'
  }),
  value: z.number().min(1, 'O valor deve ser no mínimo 1'),
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

type QuestionType = z.infer<typeof questionSchema>

export function QuestionInput({ control, index, removeQuestion }: any) {
  const [questionType, setQuestionType] = useState<string>('short_answer')

  const handleQuestionTypeChange = (value: string) => {
    setQuestionType(value)
  }

  return (
    <div className="w-full flex flex-col gap-4 p-4 border rounded-md">
      <CustomInput
        type="text"
        htmlFor={`questions.${index}.question`}
        label={`Questão ${index + 1}`}
        placeholder="Digite a questão"
        control={control}
      />

      <div className="w-full grid gap-6 md:grid-cols-2">
        <SelectCustomZod
          name={`questions.${index}.question_type`}
          label="Tipo de questão"
          control={control}
          options={questionTypeOptions}
          onOptionChange={handleQuestionTypeChange}
        />

        <div className="w-full h-full flex flex-row gap-5 items-end">
          <CustomInput
            type="number"
            htmlFor={`questions.${index}.value`}
            label={`Valor da questão`}
            placeholder="Valor"
            control={control}
          />

          <button
            type="button"
            onClick={() => removeQuestion(index)}
            className="w-[16rem] h-[2.6rem] min-w-[12rem] px-3 rounded-lg bg-[#FF0000] text-white hover:bg-red-600 active:bg-red-900 flex flex-row items-center justify-center gap-2 transition-all duration-300 "
          >
            <AiFillDelete />
            Remover questão
          </button>
        </div>
      </div>

      {/* {questionType === 'image_upload' && (
          <CustomInput
          type="file"
          htmlFor={`questions.${index}.image`}
          label={`Upload de imagem`}
          placeholder="Valor"
          control={control}
        />

        <div className="flex flex-col gap-2">
          <label className="block mb-2 text-sm font-medium dark:text-light text-gray-600">
            Upload de imagem
          </label>
          <Controller
            name={`questions.${index}.image`}
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="file"
                className={`w-full border dark:bg-gray-700/60 bg-gray-100/10  dark:border-gray-500/60 border-gray-300/60 dark:text-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block`}
              />
            )}
          />
        </div>
      )} */}

      {questionType === 'multiple_choice' && (
        <div className=" mt-4 flex flex-col gap-4">
          <label className="block mb-2 text-base font-semibold dark:text-light text-gray-600">
            Opções:
          </label>
          {/* Renderizar opções múltiplas */}
          <MultipleChoiceOptions control={control} index={index} />
        </div>
      )}
    </div>
  )
}

function MultipleChoiceOptions({ control, index }: any) {
  const [options, setOptions] = useState([{ text: '', is_valid: false }])

  const addOption = () => {
    setOptions([...options, { text: '', is_valid: false }])
  }

  const removeOption = (optIndex: number) => {
    setOptions(options.filter((_, i) => i !== optIndex))
  }

  return (
    <div className="flex flex-col gap-2">
      {options.map((option, optIndex) => (
        <div key={optIndex} className="flex items-end gap-4">
          <div className="w-full">
            <CustomInput
              type="text"
              htmlFor={`questions.${index}.options.${optIndex}.text`}
              label={`Texto da opção`}
              placeholder="Ex.: Opção 1"
              control={control}
            />
          </div>

          <label
            htmlFor="is_valid"
            className="relative custom-radio py-2.5 px-5 flex flex-row justify-start items-center gap-8 border border dark:bg-gray-700/60 bg-gray-100/10  dark:border-gray-500/60 border-gray-300/60 dark:text-gray-300 text-gray-500 text-sm rounded-lg"
          >
            Válido
            <input
              id="is_valid"
              type="checkbox"
              className="custom-control-input text-primary-200 border-gray-300 focus:ring-0 rounded"
              {...control.register(
                `questions.${index}.options.${optIndex}.is_valid`
              )}
            />
          </label>

          <button
            onClick={() => removeOption(optIndex)}
            className="p-[0.650rem] rounded-lg bg-[#FF0000] text-white hover:bg-red-600 active:bg-red-900 flex flex-row items-center justify-center gap-2 transition-all duration-300 text-lg"
          >
            <AiFillDelete />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addOption}
        className="w-[10rem] h-[2.6rem] rounded-lg bg-blue-500 text-white hover:bg-blue-700 active:bg-blue-900 flex flex-row items-center justify-center gap-2 transition-all duration-300 "
      >
        <Plus />
        Adicionar opção
      </button>
    </div>
  )
}
