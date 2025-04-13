import React, { useEffect, useState } from 'react'

// Lib
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

// Icon
import { FiEdit } from 'react-icons/fi'
import { AiFillDelete } from 'react-icons/ai'

// Component
import { BadgeAction } from '../badge/BadgeAction'
// interfaces
import { TaskInterface } from '../../interfaces/ITaskInterface'
import { CourseInterface } from '../../interfaces/ICourseInterface'
import { ModuleInterface } from '../../interfaces/IModuleInterface'
// services
import CourseViewModel from '../../services/ViewModel/CourseViewModel'
import ModuleViewModel from '../../services/ViewModel/ModuleViewModel'
// utils
import { showToast } from '../../utils/toasts'
// Data
import { routsNameMain } from '../../data/routsName'
import { BadgeSimple } from '../badge/BadgeSimple'

interface TableRowProps {
  rowItem: TaskInterface
  handleDeleteRow: (action: string) => void
}

export const TableRowTask: React.FC<TableRowProps> = ({
  rowItem,
  handleDeleteRow
}) => {
  const navigate = useNavigate()

  const handleNavigation = (page: string) => {
    navigate(page) // Navega para a página "/about"
  }

  const labelStatus =
    rowItem.status === 'open'
      ? 'Aberto'
      : rowItem.status === 'closed'
      ? 'Fechado'
      : 'Pendente'
  const colorStatus =
    rowItem.status == 'open'
      ? 'green'
      : rowItem.status == 'pending'
      ? 'orange'
      : 'red'

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
    await ModuleViewModel.getOne(rowItem?.module_id as string).then(
      response => {
        if (response.error) {
          showToast('error', response.msg as string)
          console.log('error', response.msg)
        } else {
          const arrayData = response.data as ModuleInterface
          const listData = arrayData

          setRowsModuleData(listData)
        }
      }
    )
  }

  useEffect(() => {
    fetchCourseData()
    fetchModuleData()
  }, [])

  return (
    <motion.tr className="border-b dark:border-gray-700 hover:bg-gray-100/40 dark:hover:bg-gray-700/40 transition-all duration-300 cursor-pointer">
      <td className="px-3 py-3 min-w-[6rem]">#{rowItem.id}</td>
      <td className="px-3 py-3 min-w-[16rem] max-w-[20rem]">
        <div className="flex flex-row justify-start items-center gap-2">
          <div className="relative w-9 min-w-9 h-9 overflow-hidden">
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
      <td className="px-3 py-3 min-w-[13rem] max-w-[20rem]">
        {rowsCourseData?.name}
      </td>
      <td className="px-3 py-3 min-w-[13rem] max-w-[20rem]">
        {rowsModuleData?.name}
      </td>
      <td className="px-3 py-3 min-w-[6rem] max-w-[20rem]">
        {rowItem.task_type}
      </td>
      <td className="px-3 py-3 min-w-[6rem] max-w-[20rem]">
        <BadgeSimple color={colorStatus} label={labelStatus} />
      </td>
      <td className="px-3 py-3 min-w-[10rem] max-w-[20rem]">
        {rowItem.due_date}
      </td>

      <td className="px-3 py-3 min-w-[6rem]">
        <div className="flex gap-4">
          <BadgeAction
            color="green"
            icon={FiEdit}
            onclickBtn={() =>
              handleNavigation(`${routsNameMain.task.editStr}/${rowItem.id}`)
            }
          />
          {/* <BadgeAction color="blue" icon={Eye} onclickBtn={() => null} /> */}
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
