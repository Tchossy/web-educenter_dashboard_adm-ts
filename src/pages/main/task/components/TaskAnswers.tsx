import { useEffect, useState } from 'react'
// interfaces
import { TaskAnswerInterface } from '../../../../interfaces/ITaskAnswerInterface'
// components
import { InputLabelSimple } from '../../../../components/input/InputLabelSimple'
import { TextAreaLabelSimple } from '../../../../components/input/TextAreaLabelSimple'
import { ToastContainer } from 'react-toastify'
import TaskQuestionViewModel from '../../../../services/ViewModel/TaskQuestionViewModel'
import { convertToBoolean } from '../../../../utils/strings'
import { TaskQuestionOptionType } from '../../../../types/option'
import { TaskQuestionInterface } from '../../../../interfaces/ITaskQuestionInterface'

interface Props {
  taskAnswersData: TaskAnswerInterface[]
}
interface TaskAnswerWithCorrect extends TaskAnswerInterface {
  correct_answer: TaskQuestionOptionType[] | string
  incorrect_options?: TaskQuestionOptionType[]
}

export function TaskAnswers({ taskAnswersData }: Props) {
  const [updatedAnswers, setUpdatedAnswers] = useState<TaskAnswerWithCorrect[]>(
    []
  )

  // Atualiza o estado `updatedAnswers` sempre que `taskAnswersData` for recebido
  useEffect(() => {
    // Function to get the question
    const fetchAnswersWithCorrectAnswers = async () => {
      const updated = await Promise.all(
        taskAnswersData.map(async answer => {
          const response = await TaskQuestionViewModel.getOne(
            answer.question_id
          )

          // console.log('fetchAnswersWithCorrectAnswers', response)

          const questionData = response?.data as
            | TaskQuestionInterface
            | undefined

          // Tenta pegar a resposta correta da propriedade `question_answer`
          // let correct_answer = ''
          let correct_answer: TaskQuestionOptionType[] | string = []
          let incorrect_options: TaskQuestionOptionType[] = []

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
                    const parsedOptions: TaskQuestionOptionType[] = JSON.parse(
                      questionData.options as unknown as string
                    )

                    correct_answer = parsedOptions.filter(
                      option => option.is_valid
                    )
                    incorrect_options = parsedOptions.filter(
                      option => !option.is_valid
                    )

                    // Pegara apenas 1 resposta correta
                    // const correctOption = parsedOptions.find(
                    //   option => option.is_valid
                    // )
                    // if (correctOption) {
                    //   correct_answer = correctOption.text
                    // }
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

    if (taskAnswersData.length > 0) {
      fetchAnswersWithCorrectAnswers()
    }
  }, [taskAnswersData])

  return (
    <div className="w-full gap-4 p-4 border border-gray-300 dark:border-gray-600 rounded-md">
      <ToastContainer />
      {updatedAnswers.map((answer, answerIndex) => {
        const currentIndex = answerIndex + 1
        // let isCorrect

        // switch (answer.is_correct) {
        //   case true:
        //     isCorrect = 'border-green-400'
        //     break
        //   case false:
        //     isCorrect = 'border-red-400'
        //     break
        //   default:
        //     isCorrect = 'border-gray-600'
        //     break
        // }
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
              {/* map correct options */}
              {Array.isArray(answer.correct_answer)
                ? answer.correct_answer.length > 0 && (
                    <div className="flex flex-col gap-1 text-sm">
                      <p className="text-green-500 font-semibold">
                        Opções corretas:
                      </p>
                      {answer.correct_answer.map((opt, idx) => (
                        <InputLabelSimple
                          key={idx}
                          isDisabled={true}
                          type="text"
                          htmlFor={`correct_answer_${idx}`}
                          label=""
                          value={
                            typeof opt === 'object' && 'text' in opt
                              ? opt.text
                              : 'Não disponível'
                          }
                          onChange={() => null}
                        />
                      ))}
                    </div>
                  )
                : answer.correct_answer && (
                    <div className="flex flex-col gap-1 text-sm">
                      <p className="text-green-500 font-semibold">
                        Resposta correta:
                      </p>
                      <InputLabelSimple
                        isDisabled={true}
                        type="text"
                        htmlFor="correct_answer_single"
                        label=""
                        value={String(answer.correct_answer)}
                        onChange={() => null}
                      />
                    </div>
                  )}

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
