import React, { useState, useEffect } from 'react'
import { CourseInterface } from '../../interfaces/ICourseInterface'
import { ModuleInterface } from '../../interfaces/IModuleInterface'
import { ExamInterface } from '../../interfaces/IExamInterface'
import { TaskInterface } from '../../interfaces/ITaskInterface'
import {
  courseData,
  examData,
  examQuestionsStudentData,
  examResultData,
  examStudentData,
  moduleData,
  taskData,
  taskStudentData,
  taskStudentData2,
  taskSubmissionsStudentData,
  taskSubmissionsStudentData2
} from '../../data/tableData'
import ModuleViewModel from '../../services/ViewModel/ModuleViewModel'
import ExamViewModel from '../../services/ViewModel/ExamViewModel'
import TaskViewModel from '../../services/ViewModel/TaskViewModel'
import { showToastBottom } from '../../utils/toasts'
import CourseViewModel from '../../services/ViewModel/CourseViewModel'
import { ToastContainer } from 'react-toastify'
import { ExamResultInterface } from '../../interfaces/IExamResultInterface'
import { TaskSubmissionInterface } from '../../interfaces/ITaskSubmissionInterface'
import ExamResultViewModel from '../../services/ViewModel/ExamResultViewModel'
import TaskSubmissionViewModel from '../../services/ViewModel/TaskSubmissionViewModel'
import { ExamQuestionInterface } from '../../interfaces/IExamQuestionInterface'
import ExamQuestionViewModel from '../../services/ViewModel/ExamQuestionViewModel'

// Opções possíveis para o select
type DataType =
  | 'courseData'
  | 'moduleData'
  | 'examData'
  | 'examResultData'
  | 'examQuestionsStudentData'
  | 'taskData'
  | 'taskSubmissionsStudentData'

export const DataSelectionPage: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<DataType>('courseData')
  const [dataToDisplay, setDataToDisplay] = useState<
    | CourseInterface[]
    | ModuleInterface[]
    | ExamInterface[]
    | ExamResultInterface[]
    | ExamQuestionInterface[]
    | TaskInterface[]
    | TaskSubmissionInterface[]
  >([])

  useEffect(() => {
    // Carrega os dados iniciais conforme a seleção atual
    loadData(selectedOption)
  }, [selectedOption])

  const loadData = (option: DataType) => {
    switch (option) {
      case 'courseData':
        setDataToDisplay(courseData)
        break
      case 'moduleData':
        setDataToDisplay(moduleData)
        break
      case 'examData':
        setDataToDisplay(examStudentData)
        break
      case 'examQuestionsStudentData':
        setDataToDisplay(examQuestionsStudentData)
        break
      case 'examResultData':
        setDataToDisplay(examResultData)
        break
      case 'taskData':
        setDataToDisplay(taskStudentData)
        break
      case 'taskSubmissionsStudentData':
        setDataToDisplay(taskSubmissionsStudentData)
        break
      default:
        setDataToDisplay([])
    }
  }

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value as DataType)
  }

  const handleSaveData = async () => {
    switch (selectedOption) {
      case 'courseData':
        for (let item of dataToDisplay) {
          await CourseViewModel.create(item)
            .then(resultSubmit => {
              if (resultSubmit.error) {
                showToastBottom('error', resultSubmit.msg)
              } else {
                alert('Todos os dados foram salvos!')
                console.log(resultSubmit)
              }
            })
            .catch(err => {
              console.error(err)
            })
        }
        break
      case 'moduleData':
        for (let item of dataToDisplay) {
          await ModuleViewModel.create(item)
            .then(resultSubmit => {
              if (resultSubmit.error) {
                showToastBottom('error', resultSubmit.msg)
              } else {
                alert('Todos os dados foram salvos!')
                console.log(resultSubmit)
              }
            })
            .catch(err => {
              console.error(err)
            })
        }
        break
      case 'examData':
        for (let item of dataToDisplay) {
          await ExamViewModel.create(item)
            .then(resultSubmit => {
              if (resultSubmit.error) {
                showToastBottom('error', resultSubmit.msg)
              } else {
                alert('Todos os dados foram salvos!')
                console.log(resultSubmit)
              }
            })
            .catch(err => {
              console.error(err)
            })
        }
        break
      case 'examQuestionsStudentData':
        for (let item of dataToDisplay as any) {
          const dataToSave: ExamQuestionInterface = {
            ...item,
            options: item.options ? JSON.stringify(item.options) : ''
          }

          await ExamQuestionViewModel.create(dataToSave)
            .then(resultSubmit => {
              if (resultSubmit.error) {
                showToastBottom('error', resultSubmit.msg)
              } else {
                console.log(resultSubmit)
              }
            })
            .catch(err => {
              console.error(err)
            })
        }
        break
      case 'examResultData':
        for (let item of dataToDisplay) {
          await ExamResultViewModel.create(item)
            .then(resultSubmit => {
              if (resultSubmit.error) {
                showToastBottom('error', resultSubmit.msg)
              } else {
                console.log(resultSubmit)
              }
            })
            .catch(err => {
              console.error(err)
            })
        }
        break
      case 'taskData':
        for (let item of dataToDisplay) {
          await TaskViewModel.create(item)
            .then(resultSubmit => {
              if (resultSubmit.error) {
                showToastBottom('error', resultSubmit.msg)
              } else {
                console.log(resultSubmit)
              }
            })
            .catch(err => {
              console.error(err)
            })
        }
        break
      case 'taskSubmissionsStudentData':
        for (let item of dataToDisplay) {
          await TaskSubmissionViewModel.create(item)
            .then(resultSubmit => {
              if (resultSubmit.error) {
                showToastBottom('error', resultSubmit.msg)
              } else {
                console.log(resultSubmit)
              }
            })
            .catch(err => {
              console.error(err)
            })
        }
        break
    }
  }

  return (
    <div>
      <ToastContainer />

      <h1>Seleção e Envio de Dados</h1>
      <label htmlFor="dataSelect">Escolha o tipo de dado:</label>
      <select
        id="dataSelect"
        value={selectedOption}
        onChange={handleSelectChange}
      >
        <option value="courseData">Cursos</option>
        <option value="moduleData">Módulos</option>
        <option value="examData">Exames</option>
        <option value="examQuestionsStudentData">Questões do Exame</option>
        <option value="examResultData">Resultados dos Exames</option>
        <option value="taskData">Tarefas</option>
        <option value="taskSubmissionsStudentData">Tarefas Enviadas</option>
      </select>

      <h2>Dados Selecionados:</h2>
      <ul>
        {dataToDisplay.map(item => (
          <li key={item.id}>
            {item.id} - {item?.date_create}
          </li>
        ))}
      </ul>

      <button onClick={handleSaveData}>Salvar Dados</button>
    </div>
  )
}
