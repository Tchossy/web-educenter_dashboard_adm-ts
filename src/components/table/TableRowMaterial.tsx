import React from 'react'
import { motion } from 'framer-motion'
import { FiEdit } from 'react-icons/fi'
import { AiFillDelete } from 'react-icons/ai'
import { BadgeAction } from '../badge/BadgeAction'
import { BadgeSimple } from '../badge/BadgeSimple'
import { Eye } from 'lucide-react'
import { MaterialInterface } from '../../interfaces/IMaterialInterface'

interface TableRowMaterialProps {
  rowItem: MaterialInterface
  handleDeleteRow: (action: string) => void
  openModalSeeRow: (action: any) => void
  openModalEditRow: (action: any) => void
}

export const TableRowMaterial: React.FC<TableRowMaterialProps> = ({
  rowItem,
  openModalSeeRow,
  openModalEditRow,
  handleDeleteRow
}) => {
  return (
    <motion.tr className="border-b dark:border-gray-700 hover:bg-gray-100/40 dark:hover:bg-gray-700/40 transition-all duration-300 cursor-pointer">
      <td className="px-3 py-3 min-w-[6rem]">#{rowItem.id}</td>
      <td className="px-3 py-3 min-w-[6rem]">{rowItem.name}</td>
      <td className="px-3 py-3 min-w-[6rem]">{rowItem.course_id}</td>
      <td className="px-3 py-3 min-w-[6rem]">{rowItem.module_id}</td>
      <td className="px-3 py-3 min-w-[6rem]">{rowItem.material_type}</td>
      <td className="px-3 py-3 min-w-[6rem]">
        <a href={rowItem.module_id}>
          <BadgeSimple color="blue" label="Ver material" />
        </a>
      </td>
      <td className="px-3 py-3 min-w-[6rem]">{rowItem.date_create}</td>
      <td className="px-3 py-3 min-w-[6rem]">
        <div className="flex gap-4">
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
