import { useState } from 'react'

// Lib
import { useParams } from 'react-router-dom'
import Modal from 'react-modal'
import { ToastContainer } from 'react-toastify'

// Icon
import { X } from 'lucide-react'

// Form
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// Services
import ExamQuestionViewModel from '../../../services/ViewModel/ExamQuestionViewModel'

// Data
import { questionTypeOptions } from '../../../data/selectOption'

// Component
import { CustomInput } from '../../input/InputLabel'
import { SelectCustomZod } from '../../selects/SelectCustomZod'
import { MultipleChoiceOptionsModal } from '../../../components/MultipleChoiceOptionsModal'

// Style
import { customStylesModalCenter } from '../../../styles/custom/modals'

// Types
import { modalCreateType } from '../../../types/modal'

// Interfaces
import { ExamQuestionInterface } from '../../../interfaces/IExamQuestionInterface'

// Utils
import { showToast } from '../../../utils/toasts'
import { TextAreaLabel } from '../../input/TextAreaLabelZod'

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
  options_modal: z
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

export function ModalCreateExamQuestion({
  handleUpdateListing,
  modalCreateRowIsOpen,
  setModalCreateRowIsOpen
}: modalCreateType<ExamQuestionInterface>) {
  // Params
  const { examId } = useParams()

  // Loading
  const [isSend, setIsSend] = useState<boolean>(false)
  const [questionType, setQuestionType] = useState<string>('')

  // Const
  const namePageSingular = 'questão'

  // Form Zod
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
    // watch // Observa as mudanças no formulário
  } = useForm<formType>({
    resolver: zodResolver(formSchema)
  })
  const handleQuestionTypeChange = (value: string) => {
    setQuestionType(value)
  }

  // Observa o campo de opções
  // const watchOptions = watch('options_modal')

  // Modal
  function closeModal() {
    setModalCreateRowIsOpen(false)
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  // Function Submit Form
  async function handleSubmitForm(dataForm: any) {
    setIsSend(true)

    try {
      const dataToSave: ExamQuestionInterface = {
        ...dataForm,
        options: dataForm.options_modal
          ? JSON.stringify(dataForm.options_modal)
          : '',
        exam_id: examId
      }

      const resultSubmit = await ExamQuestionViewModel.create(dataToSave)

      if (resultSubmit.error) {
        showToast('error', resultSubmit.msg)
        setIsSend(false)
      } else {
        showToast('success', resultSubmit.msg)

        handleUpdateListing()
        setTimeout(() => {
          reset()
          setIsSend(false)
          setModalCreateRowIsOpen(false)
        }, 3000)
      }
    } catch (error) {
      showToast('error', String(error) as string)
      setIsSend(false)
    }

    console.log('Dados do Formulário:', dataForm)
    console.log('Opções Submetidas:', dataForm.options_modal) // Verifica se opções são submetidas
  }

  return (
    <>
      <Modal
        isOpen={modalCreateRowIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        ariaHideApp={false}
        style={customStylesModalCenter}
        contentLabel="Example Modal"
      >
        <ToastContainer />

        <div className="w-full h-full flex items-center justify-center ">
          <div className="w-full h-auto max-h-[90%] max-w-3xl flex flex-col items-center p-0  rounded-md overflow-y-auto bg-dark overflow-x-hidden scroll-smooth">
            <div className="w-full py-4 px-5 flex flex-row justify-between items-center border-b-[1px] border-gray-600 ">
              <p className="text-xl font-medium text-light">
                Criar {namePageSingular}
              </p>

              <button
                onClick={closeModal}
                className="py-2 px-2 rounded-lg text-light hover:bg-gray-300/20 dark:hover:bg-gray-500/20 active:bg-gray-300 active:text-dark flex flex-row items-center justify-center gap-4 transition-all duration-300"
              >
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={handleSubmit(handleSubmitForm)}
              className="w-full p-8 flex flex-col justify-center items-center gap-6"
            >
              <div className="w-full grid gap-6 md:grid-cols-1">
                <CustomInput
                  type="text"
                  isDisabled={isSend}
                  htmlFor="question_text"
                  error={errors.question_text}
                  label={`Questão`}
                  placeholder="Digite a questão"
                  control={control}
                />
              </div>

              <div className="w-full grid gap-6 md:grid-cols-2">
                <SelectCustomZod
                  isDisabled={isSend}
                  name="question_type"
                  error={errors.question_type}
                  label="Tipo de questão"
                  control={control}
                  options={questionTypeOptions}
                  onOptionChange={handleQuestionTypeChange}
                />

                <div className="w-full h-full flex flex-1 flex-row gap-5 items-end">
                  <CustomInput
                    type="number"
                    isDisabled={isSend}
                    htmlFor="value"
                    error={errors.value}
                    label={`Valor da questão`}
                    placeholder="Valor"
                    control={control}
                  />
                </div>
              </div>

              {questionType === 'short_answer' && (
                <div className="w-full mt-4 flex flex-col gap-4">
                  <div className="w-full min-w-[66px]">
                    <TextAreaLabel
                      htmlFor={`question_answer`}
                      label={`Resposta correta`}
                      placeholder="Resposta"
                      control={control}
                    />
                  </div>
                </div>
              )}

              {questionType === 'multiple_choice' && (
                <div className="w-full mt-4 flex flex-col gap-4">
                  <label className="block mb-2 text-sm font-medium dark:text-light text-gray-400">
                    Opções:
                  </label>
                  {/* Renderizar opções múltiplas */}
                  <MultipleChoiceOptionsModal control={control} options={[]} />
                </div>
              )}

              <div className="w-full pt-4 flex flex-row justify-between items-center border-t-[1px] border-gray-600 ">
                <button
                  type="submit"
                  disabled={isSend}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  {isSend && (
                    <>
                      <svg
                        aria-hidden="true"
                        role="status"
                        className="inline w-4 h-4 mr-3 text-white animate-spin"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="#E5E7EB"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentColor"
                        />
                      </svg>
                      Criando usuario ...
                    </>
                  )}

                  {!isSend && <span>Criar</span>}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </>
  )
}
