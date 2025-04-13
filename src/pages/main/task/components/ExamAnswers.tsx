import { useEffect, useState } from 'react'
// interfaces
import { ExamAnswerInterface } from '../../../../interfaces/IExamAnswerInterface'
// components
import { InputLabelSimple } from '../../../../components/input/InputLabelSimple'
import { TextAreaLabelSimple } from '../../../../components/input/TextAreaLabelSimple'
import { ToastContainer } from 'react-toastify'

interface Props {
  examAnswersData: ExamAnswerInterface[]
}

export function ExamAnswers({ examAnswersData }: Props) {
  const [updatedAnswers, setUpdatedAnswers] =
    useState<ExamAnswerInterface[]>(examAnswersData)

  // Atualiza o estado `updatedAnswers` sempre que `examAnswersData` for recebido
  useEffect(() => {
    if (examAnswersData && examAnswersData.length > 0) {
      setUpdatedAnswers(examAnswersData)
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
            className="w-full my-4 flex flex-1 flex-row gap-3"
          >
            <div className="flex flex-1">
              <TextAreaLabelSimple
                isDisabled={true}
                htmlFor={`answer_${answer?.id}`}
                label={`Questão ${currentIndex}: ${answer.question_title}`}
                value={`Resposta: ${answer.answer}`}
                onChange={() => null}
              />
            </div>

            <div className="flex flex-row gap-3 items-end">
              <div className="w-full max-w-[12rem]">
                <InputLabelSimple
                  isDisabled={true}
                  type="number"
                  htmlFor="mark"
                  label={`Cotação atribuida`}
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
