import React from 'react'
import { motion } from 'framer-motion'
import { FiEdit } from 'react-icons/fi'
import { AiFillDelete } from 'react-icons/ai'
import { BadgeAction } from '../badge/BadgeAction'
import { BadgeSimple } from '../badge/BadgeSimple'
import { Eye, ListChecks } from 'lucide-react'
import { ExamResultInterface } from '../../interfaces/IExamResultInterface'
import { routsNameMain } from '../../data/routsName'
import { Link } from 'react-router-dom'

interface TableRowProps {
  rowItem: ExamResultInterface
  handleDeleteRow: (action: string) => void
  openModalSeeRow: (action: any) => void
  openModalEditRow: (action: any) => void
}

export const TableRowResult: React.FC<TableRowProps> = ({
  rowItem,
  openModalSeeRow,
  openModalEditRow,
  handleDeleteRow
}) => {
  const labelStatus = rowItem.status == 'checked' ? 'Corrigida' : 'Pendente'
  const colorStatus = rowItem.status == 'checked' ? 'blue' : 'orange'
  const resultStatus =
    rowItem.result == 'approved'
      ? 'Aprovado'
      : rowItem.result == 'pending'
      ? 'Processando'
      : 'Falhou'
  const resultColorStatus =
    rowItem.result == 'approved'
      ? 'green'
      : rowItem.result == 'pending'
      ? 'orange'
      : 'red'

  return (
    <motion.tr className="border-b dark:border-gray-700 hover:bg-gray-100/40 dark:hover:bg-gray-700/40 transition-all duration-300 cursor-pointer">
      <td className="px-3 py-3 min-w-[6rem]">#{rowItem.id}</td>
      <td className="px-3 py-3 min-w-[6rem] max-w-[20rem]">
        {rowItem.exam_id}
      </td>
      <td className="px-3 py-3 min-w-[6rem] max-w-[20rem]">
        {rowItem.student_id}
      </td>
      <td className="px-3 py-3 min-w-[6rem] max-w-[20rem]">
        {rowItem.status == 'checked' ? `${rowItem.score}%` : '-----'}
      </td>
      <td className="px-3 py-3 min-w-[6rem]">
        <BadgeSimple color={resultColorStatus} label={resultStatus} />
      </td>
      <td className="px-3 py-3 min-w-[6rem]">
        <BadgeSimple color={colorStatus} label={labelStatus} />
      </td>
      <td className="px-3 py-3 min-w-[6rem] max-w-[20rem]">
        {rowItem.submission_date}
      </td>
      <td className="px-3 py-3 min-w-[6rem]">
        <div className="flex gap-4">
          <Link
            to={`${routsNameMain.exam.checkString}/${rowItem.student_id}/${rowItem.exam_id}`}
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
