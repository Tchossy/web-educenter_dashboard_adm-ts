import React from 'react'
import { motion } from 'framer-motion'
import { ExamInterface } from '../../interfaces/IExamInterface'

interface TableRowProps {
  rowItem: ExamInterface
}

export const TableRowExamLittle: React.FC<TableRowProps> = ({ rowItem }) => {
  return (
    <motion.tr className="border-b dark:border-gray-700 hover:bg-gray-100/40 dark:hover:bg-gray-700/40 transition-all duration-300 cursor-pointer">
      <td className="px-3 py-3 min-w-[6rem] max-w-[20rem]">
        <div className="flex flex-row justify-start items-center gap-2">
          <span className="text-dark dark:text-light text-sm whitespace-nowrap">
            {rowItem.name}
          </span>
        </div>
      </td>
      <td className="px-3 py-3 min-w-[6rem] max-w-[20rem]">
        {rowItem.start_time}
      </td>
      <td className="px-3 py-3 min-w-[6rem] max-w-[20rem]">
        {rowItem.end_time}
      </td>
      <td className="px-3 py-3 min-w-[6rem] max-w-[20rem]">{rowItem.mark}</td>
      <td className="px-3 py-3 min-w-[6rem] max-w-[20rem] whitespace-nowrap">
        {rowItem.date_exam}
      </td>
    </motion.tr>
  )
}
