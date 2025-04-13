import { useEffect, useState } from 'react'
// interfaces
import {
  ExamAnswerInterface
  // ExamAnswerMarkInterface
} from '../../../../interfaces/IExamAnswerInterface'
// components
import { InputLabelSimple } from '../../../../components/input/InputLabelSimple'
import { InputCheckbox } from '../../../../components/input/InputCheckbox'
import { TextAreaLabelSimple } from '../../../../components/input/TextAreaLabelSimple'
// import { BeatLoader } from 'react-spinners'
// import ExamAnswerViewModel from '../../../../services/ViewModel/ExamAnswerViewModel'
import { showToastBottom } from '../../../../utils/toasts'
import { ToastContainer } from 'react-toastify'
// import { converter } from '../../../../utils/converter'
import { ExamQuestionInterface } from '../../../../interfaces/IExamQuestionInterface'
import ExamQuestionViewModel from '../../../../services/ViewModel/ExamQuestionViewModel'

interface Props {
  examAnswersData: ExamAnswerInterface[]
  onAnswersUpdate: (updatedAnswers: ExamAnswerInterface[]) => void // Nova prop para enviar dados atualizados para o pai
}

export function ExamAnswers({ examAnswersData, onAnswersUpdate }: Props) {
  // const [isSending, setIsSending] = useState<{ [key: string]: boolean }>({})

  const [examQuestionsData, setExamQuestionsData] = useState<{
    [key: string]: ExamQuestionInterface
  }>({})

  const [updatedAnswers, setUpdatedAnswers] =
    useState<ExamAnswerInterface[]>(examAnswersData)

  // Atualiza o estado `updatedAnswers` sempre que `examAnswersData` for recebido
  useEffect(() => {
    if (examAnswersData && examAnswersData.length > 0) {
      setUpdatedAnswers(examAnswersData)
    }
  }, [examAnswersData])

  // Chamar a função passada como prop para atualizar os dados no componente pai
  useEffect(() => {
    onAnswersUpdate(updatedAnswers)
  }, [updatedAnswers, onAnswersUpdate])

  // Função para atualizar os valores ao mudar o checkbox ou cotação
  const handleChange = (
    id: string,
    key: keyof ExamAnswerInterface,
    value: any,
    questionId?: string
  ) => {
    const questionType = examQuestionsData[questionId as string]?.question_type

    if (questionType === 'multiple_choice') {
      showToastBottom(
        'error',
        'Não pode alterar o valor de uma questão multipla escolha'
      )
    } else {
      setUpdatedAnswers(prevAnswers =>
        prevAnswers.map(answer =>
          answer?.id === id ? { ...answer, [key]: value } : answer
        )
      )
    }
  }

  // Função chamada ao clicar no botão salvar
  // const handleSave = async (answer: ExamAnswerInterface) => {
  //   setIsSending(prev => ({ ...prev, [answer.id as string]: true }))

  //   const maxMarkNumber = examQuestionsData[answer.question_id]?.value || 100

  //   const markValue = converter.stringToNumber(answer.mark)

  //   if (markValue < 0) {
  //     showToastBottom('error', 'A cotação não pode ser inferior a zero')
  //     setIsSending(prev => ({ ...prev, [answer.id as string]: false }))
  //   } else if (markValue > converter.stringToNumber(maxMarkNumber as string)) {
  //     showToastBottom(
  //       'error',
  //       `A cotação não pode ser superior a ${maxMarkNumber}`
  //     )
  //     setIsSending(prev => ({ ...prev, [answer.id as string]: false }))
  //   } else if (markValue > 100) {
  //     showToastBottom('error', 'A cotação não pode ser superior a 100')
  //     setIsSending(prev => ({ ...prev, [answer.id as string]: false }))
  //   } else {
  //     const dataToSave: ExamAnswerMarkInterface = {
  //       exam_id: answer.exam_id as string,
  //       student_id: answer.student_id as string,
  //       question_id: answer.question_id as string,
  //       is_correct: answer.is_correct as boolean,
  //       mark: answer.mark
  //     }

  //     const resultSubmit = await ExamAnswerViewModel.update(
  //       answer.id as string,
  //       dataToSave
  //     )

  //     if (resultSubmit.error) {
  //       showToastBottom('error', resultSubmit.msg)
  //       setIsSending(prev => ({ ...prev, [answer.id as string]: false }))
  //     } else {
  //       showToastBottom('success', 'Nota atribuida com sucesso')

  //       setTimeout(() => {
  //         setIsSending(prev => ({ ...prev, [answer.id as string]: false }))
  //       }, 2000)
  //     }
  //   }
  // }

  // Exam
  async function fetchExamData() {
    try {
      const response = await ExamQuestionViewModel.getAll()
      if (response.error) {
        showToastBottom('error', 'Não foi possível carregar as perguntas')
        console.error(response.error)
      } else {
        const dataExamArray = response.data as ExamQuestionInterface[]

        // Transforme o array em um objeto indexado por `question_id`
        const dataExamObject = dataExamArray.reduce((acc, question) => {
          acc[question.id as string] = question
          return acc
        }, {} as { [key: string]: ExamQuestionInterface })

        setExamQuestionsData(dataExamObject)
      }
    } catch (err) {
      showToastBottom('error', 'Erro ao carregar dados do exame')
      console.error(err)
    }
  }

  useEffect(() => {
    fetchExamData()
  }, [])

  return (
    <div className="w-full gap-4 p-4 border border-gray-300 dark:border-gray-600 rounded-md">
      <ToastContainer />
      {updatedAnswers.map((answer, answerIndex) => {
        const currentIndex = answerIndex + 1
        // const questionType =
        //   examQuestionsData[answer?.question_id as string]?.question_type
        // const isMultiChoice = questionType === 'multiple_choice'

        return (
          <div
            key={answer?.id}
            className={`w-full my-8 flex flex-1 flex-row max-w-s-740:flex-col gap-3 border rounded-lg p-4 ${
              answer.is_correct ? 'border-green-400' : 'border-red-400'
            }`}
          >
            <div className="min-w-44 flex flex-1">
              <TextAreaLabelSimple
                isDisabled={true}
                htmlFor={`answer_${answer?.id}`}
                label={`Questão ${currentIndex}: ${answer.question_title}`}
                value={`Resposta do estudante: ${answer.answer}`}
                onChange={() => null}
              />
            </div>

            <div className="flex flex-row gap-3 items-end flex-wrap">
              {/* {isMultiChoice && ( */}
              <div className="">
                <InputCheckbox
                  htmlFor="is_valid"
                  isDisabled={true}
                  label="Correta"
                  value={answer.is_correct}
                  onChange={isChecked =>
                    handleChange(answer?.id as string, 'is_correct', isChecked)
                  }
                />
              </div>
              {/* )} */}

              <div className="w-full max-w-[5rem]">
                <InputLabelSimple
                  type="number"
                  htmlFor="mark"
                  isDisabled={true}
                  label={`Cotação`}
                  value={answer.mark}
                  onChange={e =>
                    handleChange(
                      answer?.id as string,
                      'mark',
                      e,
                      answer?.question_id
                    )
                  }
                />
              </div>

              {/* 
              {!isMultiChoice && (
                <button
                  disabled={isSending[answer?.id as string]}
                  onClick={() => handleSave(answer)}
                  className="w-[4rem] h-[2.6rem] px-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-900 flex flex-row items-center justify-center gap-2 transition-all duration-300"
                >
                  {isSending[answer?.id as string] && (
                    <>
                      <BeatLoader color="white" size={10} />
                    </>
                  )}

                  {!isSending[answer?.id as string] && <span>Salvar</span>}
                </button>
              )} 
               */}
            </div>
          </div>
        )
      })}
    </div>
  )
}
