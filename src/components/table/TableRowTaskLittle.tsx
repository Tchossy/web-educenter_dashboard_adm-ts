import React, { useEffect, useState } from 'react'

// lib
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
// interfaces
import { TaskInterface } from '../../interfaces/ITaskInterface'

interface TableRowProps {
  rowItem: TaskInterface
}

export const TableRowTaskLittle: React.FC<TableRowProps> = ({ rowItem }) => {
  const navigate = useNavigate()

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
          <div className="flex flex-col justify-center items-start">
            <span className="text-dark dark:text-light text-sm">
              {rowItem.name}
            </span>
          </div>
        </div>
      </td>
      <td className="px-3 py-3 min-w-[6rem] max-w-[20rem]">
        {rowItem.task_type}
      </td>
      <td className="px-3 py-3 min-w-[6rem] max-w-[20rem]">{rowItem.mark}%</td>
      <td className="px-3 py-3 min-w-[6rem] max-w-[20rem]">
        {rowItem.due_date}
      </td>
    </motion.tr>
  )
}
