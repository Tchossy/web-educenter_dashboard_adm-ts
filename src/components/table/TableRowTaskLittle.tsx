import React from 'react'

// lib
import { motion } from 'framer-motion'
// interfaces
import { TaskInterface } from '../../interfaces/ITaskInterface'

interface TableRowProps {
  rowItem: TaskInterface
}

export const TableRowTaskLittle: React.FC<TableRowProps> = ({ rowItem }) => {
  return (
    <motion.tr className="border-b dark:border-gray-700 hover:bg-gray-100/40 dark:hover:bg-gray-700/40 transition-all duration-300 cursor-pointer">
      <td className="px-3 py-3 min-w-[6rem] max-w-[20rem]">
        <div className="flex flex-row justify-start items-center gap-2">
          <div className="relative w-9 h-9 overflow-hidden">
            <img
              className="w-full h-full object-cover rounded-full"
              src={rowItem.image}
              alt={rowItem.name}
            />
          </div>
          <span className="text-dark dark:text-light text-sm whitespace-nowrap">
            {rowItem.name}
          </span>
        </div>
      </td>
      <td className="px-3 py-3 min-w-[6rem] max-w-[20rem]">
        {rowItem.task_type}
      </td>
      <td className="px-3 py-3 min-w-[6rem] max-w-[20rem]">{rowItem.mark}%</td>
      <td className="px-3 py-3 min-w-[6rem] max-w-[20rem] whitespace-nowrap">
        {rowItem.due_date}
      </td>
    </motion.tr>
  )
}
