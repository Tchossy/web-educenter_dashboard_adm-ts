import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FiEdit } from 'react-icons/fi'
import { AiFillDelete } from 'react-icons/ai'
import { BadgeAction } from '../badge/BadgeAction'
import { BadgeSimple } from '../badge/BadgeSimple'
import { Eye } from 'lucide-react'
import { ModuleInterface } from '../../interfaces/IModuleInterface'
import { OptionType } from '../../types/option'
import CourseViewModel from '../../services/ViewModel/CourseViewModel'
import { showToast } from '../../utils/toasts'
import { CourseInterface } from '../../interfaces/ICourseInterface'

interface TableRowProps {
  rowItem: ModuleInterface
  handleDeleteRow: (action: string) => void
  openModalSeeRow: (action: any) => void
  openModalEditRow: (action: any) => void
}

const TableRowModule: React.FC<TableRowProps> = ({
  rowItem,
  openModalSeeRow,
  openModalEditRow,
  handleDeleteRow
}) => {
  const [rowsCourseData, setRowsCourseData] = useState<CourseInterface | null>(
    null
  )

  const labelStatus = rowItem.status == 'active' ? 'Ativo' : 'Desativo'

  // Function Course
  async function fetchCourseData() {
    // Clear
    setRowsCourseData(null)

    // Get
    await CourseViewModel.getOne(rowItem.course_id).then(response => {
      if (response.error) {
        showToast('error', response.msg as string)
        console.log('error', response.msg)
      } else {
        const arrayData = response.data as CourseInterface
        const listData = arrayData

        setRowsCourseData(listData)
      }
    })
  }
  useEffect(() => {
    fetchCourseData()
  }, [])

  return (
    <motion.tr className="border-b dark:border-gray-700 hover:bg-gray-100/40 dark:hover:bg-gray-700/40 transition-all duration-300 cursor-pointer">
      <td className="px-3 py-3 min-w-[6rem]">#{rowItem.id}</td>
      <td className="px-3 py-3 min-w-[6rem] max-w-[20rem]">{rowItem.name}</td>
      <td className="px-3 py-3 min-w-[6rem]">{rowsCourseData?.name}</td>
      <td className="px-3 py-3 min-w-[6rem]">
        <BadgeSimple color="blue" label={labelStatus} />
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

export default TableRowModule
