import React from 'react'
import { motion } from 'framer-motion'
import { FiEdit } from 'react-icons/fi'
import { AiFillDelete } from 'react-icons/ai'
import { BadgeAction } from '../badge/BadgeAction'
import { BadgeSimple } from '../badge/BadgeSimple'
import { Eye } from 'lucide-react'
import { CourseInterface } from '../../interfaces/ICourseInterface'

interface TableRowProps {
  rowItem: CourseInterface
  handleDeleteRow: (action: string) => void
  openModalSeeRow: (action: any) => void
  openModalEditRow: (action: any) => void
}

const TableRowCourse: React.FC<TableRowProps> = ({
  rowItem,
  openModalSeeRow,
  openModalEditRow,
  handleDeleteRow
}) => {
  const labelStatus = rowItem.status == 'active' ? 'Ativo' : 'Inativo'

  return (
    <motion.tr className="border-b dark:border-gray-700 hover:bg-gray-100/40 dark:hover:bg-gray-700/40 transition-all duration-300 cursor-pointer">
      <td className="px-3 py-3 min-w-[6rem]">
        <p>#{rowItem.id}</p>
      </td>
      <td className="px-3 py-3 min-w-[6rem]">
        <div className="flex flex-row justify-start items-center gap-2">
          <div className="relative w-9 h-9 overflow-hidden">
            <img
              className="w-full h-full object-cover rounded-full"
              src={rowItem.image}
              alt={rowItem.name}
            />
          </div>
          <div className="w-72 flex flex-col justify-center items-start">
            <span className="flex-wrap">{rowItem.name}</span>
          </div>
        </div>
      </td>
      <td className="w-72 flex flex-col justify-center items-start relative overflow-hidden">
        <p className="line-clamp-2">{rowItem.description}</p>
      </td>
      <td className="px-3 py-3 min-w-[6rem]">
        <BadgeSimple
          color={rowItem.status == 'active' ? 'blue' : 'red'}
          label={labelStatus}
        />
      </td>
      <td className="px-3 py-3 min-w-[6rem]">
        <p>{rowItem.date_create}</p>
      </td>
      <td className="px-3 py-3 min-w-[6rem]">
        <div className="flex flex-row justify-start items-center gap-4">
          <BadgeAction
            color="green"
            icon={FiEdit}
            onclickBtn={() => openModalEditRow(rowItem)}
          />
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

export default TableRowCourse
