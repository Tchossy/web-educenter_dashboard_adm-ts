import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { AiFillDelete } from 'react-icons/ai'
import { BadgeAction } from '../badge/BadgeAction'
import { BadgeSimple } from '../badge/BadgeSimple'
import { Eye, ListChecks } from 'lucide-react'
import { TaskSubmissionInterface } from '../../interfaces/ITaskSubmissionInterface'
import { useNavigate } from 'react-router-dom'
import { routsNameMain } from '../../data/routsName'
import { TaskInterface } from '../../interfaces/ITaskInterface'
import TaskViewModel from '../../services/ViewModel/TaskViewModel'
import { StudentInterface } from '../../interfaces/IStudentInterface'
import StudentViewModel from '../../services/ViewModel/StudentViewModel'

interface TableRowProps {
  rowItem: TaskSubmissionInterface
  handleDeleteRow: (action: string) => void
}

export const TableRowTaskSubmission: React.FC<TableRowProps> = ({
  rowItem,
  handleDeleteRow
}) => {
  const [rowsTaskData, setRowsTaskData] = useState<TaskInterface | null>(null)
  const [rowsStudentData, setRowsStudentData] =
    useState<StudentInterface | null>(null)

  const navigate = useNavigate()

  const handleNavigation = (page: string) => {
    navigate(page)
  }

  const labelStatus = rowItem.status == 'graded' ? 'Completo' : 'Pendente'
  const colorStatus = rowItem.status == 'graded' ? 'green' : 'orange'

  // Function Task
  async function fetchTaskData() {
    // Clear
    setRowsTaskData(null)

    // Get
    await TaskViewModel.getOne(rowItem?.task_id as string).then(response => {
      if (response.error) {
        console.log('error', response.msg)
      } else {
        const arrayData = response.data as TaskInterface
        const listData = arrayData

        setRowsTaskData(listData)
      }
    })
  }
  // Function Student
  async function fetchStudentData() {
    // Clear
    setRowsStudentData(null)

    // Get
    await StudentViewModel.getOne(rowItem?.student_id as string).then(
      response => {
        if (response.error) {
          console.log('error', response.msg)
        } else {
          const arrayData = response.data as StudentInterface
          const listData = arrayData

          setRowsStudentData(listData)
        }
      }
    )
  }

  useEffect(() => {
    fetchTaskData()
    fetchStudentData()
  }, [])

  return (
    <motion.tr className="border-b dark:border-gray-700 hover:bg-gray-100/40 dark:hover:bg-gray-700/40 transition-all duration-300 cursor-pointer">
      <td className="px-3 py-3 min-w-[6rem]">#{rowItem.id}</td>
      <td className="px-3 py-3 min-w-[12rem]">{rowsTaskData?.name}</td>
      <td className="px-3 py-3 min-w-[12rem] max-w-[20rem]">
        {`${rowsStudentData?.first_name} ${rowsStudentData?.last_name}`}
      </td>
      <td className="px-3 py-3 min-w-[6rem] max-w-[20rem]">{rowItem.grade}</td>
      <td className="px-3 py-3 min-w-[6rem]">
        <a href={rowItem.status}>
          <BadgeSimple color={colorStatus} label={labelStatus} />
        </a>
      </td>
      <td className="px-3 py-3 min-w-[6rem] max-w-[20rem]">
        {rowItem.date_create}
      </td>

      <td className="px-3 py-3 min-w-[6rem]">
        <div className="flex gap-4">
          <BadgeAction
            color="green"
            icon={ListChecks}
            onclickBtn={() =>
              handleNavigation(
                `${routsNameMain.task.checkString}/${rowItem.task_id}/${rowItem.id}`
              )
            }
          />
          <BadgeAction color="blue" icon={Eye} onclickBtn={() => null} />
          <BadgeAction
            color="red"
            icon={AiFillDelete}
            onclickBtn={() => handleDeleteRow(rowItem.id as string)}
          />
        </div>
      </td>
    </motion.tr>
  )
}
