import { useEffect, useState } from 'react'
import { ExamQuestionInterface } from '../../../../interfaces/IExamQuestionInterface'
import ExamQuestionViewModel from '../../../../services/ViewModel/ExamQuestionViewModel'
import { ExamAnswerInterface } from '../../../../interfaces/IExamAnswerInterface'
import { ExamQuestionOptionType } from '../../../../types/option'
import { convertToBoolean } from '../../../../utils/strings'
import { ToastContainer } from 'react-toastify'
import { TextAreaLabelSimple } from '../../../../components/input/TextAreaLabelSimple'
import { InputLabelSimple } from '../../../../components/input/InputLabelSimple'

interface Props {
  examAnswersData: ExamAnswerInterface[]
}
interface ExamAnswerWithCorrect extends ExamAnswerInterface {
  correct_answer: string
  incorrect_options?: ExamQuestionOptionType[]
}

export function ExamAnswers({ examAnswersData }: Props) {
  const [updatedAnswers, setUpdatedAnswers] = useState<ExamAnswerWithCorrect[]>(
    []
  )

  // Atualiza o estado `updatedAnswers` sempre que `examAnswersData` for recebido
  useEffect(() => {
    // Function to get the question
    const fetchAnswersWithCorrectAnswers = async () => {
      const updated = await Promise.all(
        examAnswersData.map(async answer => {
          const response = await ExamQuestionViewModel.getOne(
            answer.question_id
          )

          // console.log('fetchAnswersWithCorrectAnswers', response)

          const questionData = response?.data as
            | ExamQuestionInterface
            | undefined

          // Tenta pegar a resposta correta da propriedade `question_answer`
          let correct_answer = ''
          let incorrect_options: ExamQuestionOptionType[] = []

          if (questionData) {
            switch (questionData.question_type) {
              case 'short_answer':
                // Usa `question_answer` para tipos de resposta direta
                correct_answer = questionData.question_answer || ''
                break

              case 'multiple_choice':
              case 'image_upload':
              default:
                if (questionData.options) {
                  try {
                    const parsedOptions: ExamQuestionOptionType[] = JSON.parse(
                      questionData.options as unknown as string
                    )

                    const correctOption = parsedOptions.find(
                      option => option.is_valid
                    )
                    incorrect_options = parsedOptions.filter(
                      option => !option.is_valid
                    )

                    if (correctOption) {
                      correct_answer = correctOption.text
                    }
                  } catch (error) {
                    console.error('Erro ao fazer parse das options:', error)
                  }
                }
                break
            }
          }

          return {
            ...answer,
            is_correct: convertToBoolean(answer.is_correct),
            correct_answer,
            incorrect_options
          }
        })
      )

      // console.log('Updated answers fetched:', updated)
      setUpdatedAnswers(updated)
    }

    if (examAnswersData.length > 0) {
      fetchAnswersWithCorrectAnswers()
    }
  }, [examAnswersData])

  return (
    <div className="w-full gap-4 p-4 border border-gray-300 dark:border-gray-600 rounded-md">
      <ToastContainer />
      {updatedAnswers.map((answer, answerIndex) => {
        const currentIndex = answerIndex + 1

        return (
          <div
            key={answer?.id}
            className={`w-full my-4 flex flex-1 flex-row items-start gap-3 border rounded-lg p-4 ${
              answer.is_correct ? 'border-green-400' : 'border-red-400'
            }`}
          >
            <div className="flex flex-1">
              <TextAreaLabelSimple
                isDisabled={true}
                htmlFor={`answer_${answer?.id}`}
                label={`Questão ${currentIndex}: ${answer.question_title}`}
                value={`Sua resposta: ${answer.answer}`}
                onChange={() => null}
              />
            </div>

            <div className="flex flex-col gap-3 items-end">
              <InputLabelSimple
                isDisabled={true}
                type="text"
                htmlFor={`correct_answer_${answer?.id}`}
                label={`Resposta correta`}
                value={(answer.correct_answer as any) || 'Não disponível'}
                onChange={() => null}
              />
              {/* map wrong options */}
              {answer.incorrect_options &&
                answer.incorrect_options.length > 0 && (
                  <div className="flex flex-col gap-1 text-sm">
                    <p className="text-red-500 font-semibold">
                      Opções incorretas:
                    </p>
                    {answer.incorrect_options.map((opt, idx) => (
                      <InputLabelSimple
                        isDisabled={true}
                        type="text"
                        htmlFor={`correct_answer_${idx}`}
                        label={``}
                        value={(opt.text as any) || 'Não disponível'}
                        onChange={() => null}
                      />
                    ))}
                  </div>
                )}
            </div>

            <div className="flex flex-row gap-3 items-end">
              <div className="w-full max-w-[12rem]">
                <InputLabelSimple
                  isDisabled={true}
                  type="number"
                  htmlFor="mark"
                  label={`Cotação`}
                  value={answer.mark}
                  onChange={() => null}
                />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
