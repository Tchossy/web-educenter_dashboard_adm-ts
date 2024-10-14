import React from 'react'
import { motion } from 'framer-motion'
import { FiEdit } from 'react-icons/fi'
import { AiFillDelete } from 'react-icons/ai'
import { BadgeAction } from '../badge/BadgeAction'
import { BadgeSimple } from '../badge/BadgeSimple'
import { Eye, ListChecks } from 'lucide-react'
import { TaskSubmissionInterface } from '../../interfaces/ITaskSubmissionInterface'
import { Link } from 'react-router-dom'
import { routsNameMain } from '../../data/routsName'

interface TableRowProps {
  rowItem: TaskSubmissionInterface
  handleDeleteRow: (action: string) => void
  openModalSeeRow: (action: any) => void
  openModalEditRow: (action: any) => void
}

export const TableRowTaskSubmission: React.FC<TableRowProps> = ({
  rowItem,
  openModalSeeRow,
  openModalEditRow,
  handleDeleteRow
}) => {
  const labelStatus = rowItem.status == 'graded' ? 'Completo' : 'Pendente'
  const colorStatus = rowItem.status == 'graded' ? 'green' : 'orange'

  return (
    <motion.tr className="border-b dark:border-gray-700 hover:bg-gray-100/40 dark:hover:bg-gray-700/40 transition-all duration-300 cursor-pointer">
      <td className="px-3 py-3 min-w-[6rem]">#{rowItem.id}</td>
      <td className="px-3 py-3 min-w-[6rem]">{rowItem.task_id}</td>
      <td className="px-3 py-3 min-w-[6rem] max-w-[20rem]">
        {rowItem.student_id}
      </td>
      <td className="px-3 py-3 min-w-[6rem] max-w-[20rem]">{rowItem.grade}</td>
      <td className="px-3 py-3 min-w-[6rem] max-w-[20rem]">
        {rowItem.submission_date}
      </td>
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
          <Link
            to={`${routsNameMain.task.checkString}/${rowItem.student_id}/${rowItem.task_id}`}
          >
            <BadgeAction
              color="green"
              icon={ListChecks}
              onclickBtn={() => openModalEditRow(rowItem)}
            />
          </Link>
          <BadgeAction
            color="blue"
            icon={Eye}
            onclickBtn={() => openModalSeeRow(rowItem)}
          />
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
