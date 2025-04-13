import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { AiFillDelete } from 'react-icons/ai'
import { BadgeAction } from '../badge/BadgeAction'
import { BadgeSimple } from '../badge/BadgeSimple'
import { ListChecks } from 'lucide-react'
import { ExamResultInterface } from '../../interfaces/IExamResultInterface'
import { routsNameMain } from '../../data/routsName'
import { Link } from 'react-router-dom'
import { ExamInterface } from '../../interfaces/IExamInterface'
import ExamViewModel from '../../services/ViewModel/ExamViewModel'
import { showToast } from '../../utils/toasts'
import StudentViewModel from '../../services/ViewModel/StudentViewModel'
import { StudentInterface } from '../../interfaces/IStudentInterface'

interface TableRowProps {
  rowItem: ExamResultInterface
  handleDeleteRow: (action: string) => void
}

export const TableRowResult: React.FC<TableRowProps> = ({
  rowItem,
  handleDeleteRow
}) => {
  const [rowExamData, setRowExamData] = useState<ExamInterface | null>(null)
  const [rowStudentData, setRowStudentData] = useState<StudentInterface | null>(
    null
  )

  const labelStatus =
    rowItem.status == 'checked'
      ? 'Corrigida'
      : rowItem.status == 'expired'
      ? 'Não finalizada'
      : rowItem.status == 'sent'
      ? 'Enviada'
      : 'Pendente'

  const colorStatus =
    rowItem.status == 'checked'
      ? 'green'
      : rowItem.status == 'expired'
      ? 'red'
      : rowItem.status == 'sent'
      ? 'blue'
      : 'orange'

  const resultStatus =
    rowItem.result == 'approved'
      ? 'Aprovado'
      : rowItem.result == 'pending'
      ? 'Processando'
      : 'Falhou'
  const resultColorStatus =
    rowItem.result == 'approved'
      ? 'green'
      : rowItem.result == 'pending'
      ? 'orange'
      : 'red'
  // Function Exam
  async function fetchExamData() {
    // Clear
    setRowExamData(null)

    // Get
    await ExamViewModel.getOne(rowItem?.exam_id as string).then(response => {
      if (response.error) {
        showToast('error', response.msg as string)
        console.log('error', response.msg)
      } else {
        const arrayData = response.data as ExamInterface
        const listData = arrayData

        setRowExamData(listData)
      }
    })
  }
  // Function Student
  async function fetchStudentData() {
    // Clear
    setRowStudentData(null)

    // Get
    await StudentViewModel.getOne(rowItem?.student_id as string).then(
      response => {
        if (response.error) {
          showToast('error', response.msg as string)
          console.log('error', response.msg)
        } else {
          const arrayData = response.data as StudentInterface
          const listData = arrayData

          setRowStudentData(listData)
        }
      }
    )
  }
  useEffect(() => {
    fetchExamData()
    fetchStudentData()
  }, [])
  return (
    <motion.tr className="border-b dark:border-gray-700 hover:bg-gray-100/40 dark:hover:bg-gray-700/40 transition-all duration-300 cursor-pointer">
      <td className="px-3 py-3 min-w-[6rem]">#{rowItem.id}</td>
      <td className="px-3 py-3 min-w-[14rem] max-w-[20rem]">
        {rowExamData?.name}
      </td>
      <td className="px-3 py-3 min-w-[12rem] max-w-[20rem]">
        {`${rowStudentData?.first_name} ${rowStudentData?.last_name}`}
      </td>
      <td className="px-3 py-3 min-w-[6rem] max-w-[20rem]">
        {rowItem.status == 'checked' ? `${rowItem.score}%` : '-----'}
      </td>
      <td className="px-3 py-3 min-w-[6rem]">
        <BadgeSimple color={resultColorStatus} label={resultStatus} />
      </td>
      <td className="px-3 py-3 min-w-[6rem]">
        <BadgeSimple color={colorStatus} label={labelStatus} />
      </td>
      <td className="px-3 py-3 min-w-[6rem] max-w-[20rem]">
        {rowItem.submission_date}
      </td>
      <td className="px-3 py-3 min-w-[6rem]">
        <div className="flex gap-4">
          <Link to={`${routsNameMain.exam.checkString}/${rowItem.id}`}>
            <BadgeAction
              color="green"
              icon={ListChecks}
              onclickBtn={() => null}
            />
          </Link>
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
