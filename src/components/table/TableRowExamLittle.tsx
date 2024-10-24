import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ExamInterface } from '../../interfaces/IExamInterface'
import { ModuleInterface } from '../../interfaces/IModuleInterface'
import ModuleViewModel from '../../services/ViewModel/ModuleViewModel'
import { convertTimeToMinutes, fullTime } from '../../utils/date'

interface TableRowProps {
  rowItem: ExamInterface
}

export const TableRowExamLittle: React.FC<TableRowProps> = ({ rowItem }) => {
  const currentDate = new Date()
  const examDate = new Date(rowItem.date_exam)

  // Convertendo ambos os horários para minutos totais
  const fullTimeInMinutes = convertTimeToMinutes(fullTime)
  const endTimeInMinutes = convertTimeToMinutes(
    rowItem?.end_time ? rowItem?.end_time : ''
  )

  const examIsAlreadyPassedTime = fullTimeInMinutes > endTimeInMinutes
  const isExamToday = examDate.toDateString() === currentDate.toDateString()
  const isExamInTheFuture = examDate > currentDate
  const isExamInThePast = examDate < currentDate

  const [rowsModuleData, setRowsModuleData] = useState<ModuleInterface | null>(
    null
  )

  // Function Module
  async function fetchModuleData() {
    // Clear
    setRowsModuleData(null)

    // Get
    await ModuleViewModel.getOne(rowItem?.module_id as string).then(
      response => {
        if (response.error) {
          alert(response.msg as string)
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
    fetchModuleData()
  }, [])

  return (
    <motion.tr className="border-b dark:border-gray-700 hover:bg-gray-100/40 dark:hover:bg-gray-700/40 transition-all duration-300 cursor-pointer">
      <td className="px-3 py-3 min-w-[6rem] max-w-[20rem]">
        <div className="flex flex-row justify-start items-center gap-2">
          <div className="flex flex-col justify-center items-start">
            <span className="text-dark dark:text-light text-sm">
              {rowItem.name}
            </span>
          </div>
        </div>
      </td>
      <td className="px-3 py-3 min-w-[6rem] max-w-[20rem]">
        {rowItem.start_time}
      </td>
      <td className="px-3 py-3 min-w-[6rem] max-w-[20rem]">
        {rowItem.end_time}
      </td>
      <td className="px-3 py-3 min-w-[6rem] max-w-[20rem]">{rowItem.mark}</td>
      <td className="px-3 py-3 min-w-[6rem] max-w-[20rem]">
        {rowItem.date_exam}
      </td>
    </motion.tr>
  )
}
