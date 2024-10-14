import React from 'react'
import { motion } from 'framer-motion'
import { FiEdit } from 'react-icons/fi'
import { AiFillDelete } from 'react-icons/ai'
import { BadgeAction } from '../badge/BadgeAction'
import { BadgeSimple } from '../badge/BadgeSimple'
import { Eye } from 'lucide-react'
import { ProfessorInterface } from '../../interfaces/IProfessorInterface'

interface TableRowProps {
  rowItem: ProfessorInterface
  handleDeleteRow: (action: string) => void
  openModalSeeRow: (action: any) => void
  openModalEditRow: (action: any) => void
}

const TableRowProfessor: React.FC<TableRowProps> = ({
  rowItem,
  openModalSeeRow,
  openModalEditRow,
  handleDeleteRow
}) => {
  const labelStatus = rowItem.status == 'active' ? 'Ativo' : 'Desativo'
  const labelGender = rowItem.gender == 'male' ? 'Masculino' : 'Feminino'
  return (
    <motion.tr className="border-b dark:border-gray-700 hover:bg-gray-100/40 dark:hover:bg-gray-700/40 transition-all duration-300 cursor-pointer">
      <td className="px-3 py-3 min-w-[6rem]">
        <p className="flex flex-row justify-start items-center">
          #{rowItem.id}
        </p>
      </td>
      <td className="px-3 py-3 min-w-[6rem]">
        <div className="flex flex-row justify-start items-center gap-2">
          <div className="relative w-9 h-9 overflow-hidden">
            <img
              className="w-full h-full object-cover rounded-full"
              src={rowItem.photo}
              alt={rowItem.first_name}
            />
          </div>
          <div className="flex flex-col justify-center items-start">
            <span className="text-dark dark:text-light font-semibold text-sm">
              {rowItem.first_name + ' ' + rowItem.last_name}
            </span>
            <span className="text-xs">{rowItem.email}</span>
          </div>
        </div>
      </td>
      <td className="px-3 py-3 min-w-[6rem]">
        <p>{labelGender}</p>
      </td>
      <td className="px-3 py-3 min-w-[6rem]">
        <p>{rowItem.phone}</p>
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

export default TableRowProfessor
