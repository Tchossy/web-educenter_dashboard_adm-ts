import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FiEdit } from 'react-icons/fi'
import { GrDocumentPerformance } from 'react-icons/gr'
import { AiFillDelete } from 'react-icons/ai'
import { BadgeAction } from '../badge/BadgeAction'
import { BadgeSimple } from '../badge/BadgeSimple'
import { StudentInterface } from '../../interfaces/IStudentInterface'
import { CourseInterface } from '../../interfaces/ICourseInterface'
import { ModuleInterface } from '../../interfaces/IModuleInterface'
import CourseViewModel from '../../services/ViewModel/CourseViewModel'
import ModuleViewModel from '../../services/ViewModel/ModuleViewModel'
import { showToast } from '../../utils/toasts'
import { useNavigate } from 'react-router-dom'
import { routsNameMain } from '../../data/routsName'

interface TableRowProps {
  rowItem: StudentInterface
}

export const TableRowPerformance: React.FC<TableRowProps> = ({ rowItem }) => {
  const navigate = useNavigate()

  const handleNavigation = (page: string) => {
    navigate(page)
  }

  const labelGender = rowItem.gender == 'male' ? 'Masculino' : 'Feminino'

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
      <td className="px-3 py-3 min-w-[6rem]">
        <p>#{rowItem.id}</p>
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
      <td className="px-3 py-3 min-w-[6rem]">{rowsCourseData?.name}</td>
      <td className="px-3 py-3 min-w-[6rem]">{rowsModuleData?.name}</td>
      <td className="px-3 py-3 min-w-[6rem]">
        <p>{rowItem.date_create}</p>
      </td>
      <td className="px-3 py-3 min-w-[6rem]">
        <div className="flex flex-row justify-start items-center gap-4">
          <BadgeAction
            color="blue"
            label="Ver Média Semanal"
            icon={GrDocumentPerformance}
            onclickBtn={() =>
              handleNavigation(
                `${routsNameMain.performance.weeklyStr}/${rowItem.id}`
              )
            }
          />
        </div>
      </td>
    </motion.tr>
  )
}
