import React from 'react'
import { motion } from 'framer-motion'
import { AiFillDelete } from 'react-icons/ai'
import { BadgeAction } from '../badge/BadgeAction'
import { BadgeSimple } from '../badge/BadgeSimple'
import { WeeklyAverageInterface } from '../../interfaces/IWeeklyAverageInterface'

interface TableRowProps {
  rowItem: WeeklyAverageInterface
  handleDeleteRow: (action: string) => void
}

export const TableRowWeeklyAverage: React.FC<TableRowProps> = ({
  rowItem,
  handleDeleteRow
}) => {
  const labelStatus = rowItem.status == 'approved' ? 'Aprovado' : 'Reprovado'
  const colorStatus = rowItem.status == 'approved' ? 'green' : 'red'

  return (
    <motion.tr className="border-b dark:border-gray-700 hover:bg-gray-100/40 dark:hover:bg-gray-700/40 transition-all duration-300 cursor-pointer">
      <td className="px-3 py-3 min-w-[6rem]">
        <p>#{rowItem.id}</p>
      </td>
      <td className="px-3 py-3 min-w-[6rem] max-w-[20rem]">
        <p>{rowItem.week_start}</p>
      </td>
      <td className="px-3 py-3 min-w-[6rem] max-w-[20rem]">
        <p>{rowItem.week_end}</p>
      </td>
      <td className="px-3 py-3 min-w-[6rem] max-w-[20rem]">
        <p>{rowItem.task_average}</p>
      </td>
      <td className="px-3 py-3 min-w-[6rem] max-w-[20rem]">
        <p>{rowItem.exam_grade}</p>
      </td>
      <td className="px-3 py-3 min-w-[6rem] max-w-[20rem]">
        <p>{rowItem.weekly_average}</p>
      </td>
      <td className="px-3 py-3 min-w-[6rem]">
        <BadgeSimple color={colorStatus} label={labelStatus} />
      </td>
      <td className="px-3 py-3 min-w-[6rem]">
        <div className="flex flex-row justify-start items-center gap-4">
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
