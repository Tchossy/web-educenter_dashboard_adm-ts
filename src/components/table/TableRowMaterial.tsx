import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FiEdit } from 'react-icons/fi'
import { AiFillDelete } from 'react-icons/ai'
import { BadgeAction } from '../badge/BadgeAction'
import { BadgeSimple } from '../badge/BadgeSimple'
import { Eye } from 'lucide-react'
import { MaterialInterface } from '../../interfaces/IMaterialInterface'
import { CourseInterface } from '../../interfaces/ICourseInterface'
import { ModuleInterface } from '../../interfaces/IModuleInterface'
import CourseViewModel from '../../services/ViewModel/CourseViewModel'
import { showToast } from '../../utils/toasts'
import ModuleViewModel from '../../services/ViewModel/ModuleViewModel'

interface TableRowMaterialProps {
  rowItem: MaterialInterface
  handleDeleteRow: (action: string) => void
  openModalEditRow: (action: any) => void
}

const TableRowMaterial: React.FC<TableRowMaterialProps> = ({
  rowItem,
  openModalEditRow,
  handleDeleteRow
}) => {
  const [rowsCourseData, setRowsCourseData] = useState<CourseInterface | null>(
    null
  )
  const [rowsModuleData, setRowsModuleData] = useState<ModuleInterface | null>(
    null
  )

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
  // Function Module
  async function fetchModuleData() {
    // Clear
    setRowsModuleData(null)

    // Get
    await ModuleViewModel.getOne(rowItem.module_id).then(response => {
      if (response.error) {
        showToast('error', response.msg as string)
        console.log('error', response.msg)
      } else {
        const arrayData = response.data as ModuleInterface
        const listData = arrayData

        setRowsModuleData(listData)
      }
    })
  }

  useEffect(() => {
    fetchCourseData()
    fetchModuleData()
  }, [])
  return (
    <motion.tr className="border-b dark:border-gray-700 hover:bg-gray-100/40 dark:hover:bg-gray-700/40 transition-all duration-300 cursor-pointer">
      <td className="px-3 py-3 min-w-[6rem]">#{rowItem.id}</td>
      <td className="px-3 py-3 min-w-[6rem]">{rowItem.name}</td>
      <td className="px-3 py-3 min-w-[6rem]">{rowsCourseData?.name}</td>
      <td className="px-3 py-3 min-w-[6rem]">{rowsModuleData?.name}</td>
      <td className="px-3 py-3 min-w-[6rem]">{rowItem.material_type}</td>
      <td className="px-3 py-3 min-w-[6rem]">{rowItem.date_create}</td>
      <td className="px-3 py-3 min-w-[6rem]">
        <div className="flex gap-4">
          <BadgeAction
            color="green"
            icon={FiEdit}
            onclickBtn={() => openModalEditRow(rowItem)}
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

export default TableRowMaterial
