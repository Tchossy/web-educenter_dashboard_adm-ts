import { useEffect, useState } from 'react'

// Icon
import { GraduationCap, LibraryBig, BookMarked } from 'lucide-react'
// Component
import { TableRowExamLittle } from '../../components/table/TableRowExamLittle'
import { TableRowTaskLittle } from '../../components/table/TableRowTaskLittle'
import { Breadcrumbs } from '../../components/Breadcrumbs'
// Data
import { routsNameMain } from '../../data/routsName'
// UseStores
import { useAdminStore } from '../../stores/adminStore'
import { getGreeting, getGreetingMsg } from '../../utils/getGreeting'
import { ExamInterface } from '../../interfaces/IExamInterface'
import { TaskInterface } from '../../interfaces/ITaskInterface'
import { StudentInterface } from '../../interfaces/IStudentInterface'
import ExamViewModel from '../../services/ViewModel/ExamViewModel'
import TaskViewModel from '../../services/ViewModel/TaskViewModel'
import StudentViewModel from '../../services/ViewModel/StudentViewModel'

export function Home() {
  const { currentAdminData } = useAdminStore()

  // Student data
  const [rowsDataStudents, setRowsDataStudents] = useState<
    StudentInterface[] | null
  >(null)
  // Exam data
  const [rowsDataExams, setRowsDataExams] = useState<ExamInterface[] | null>(
    null
  )
  // Task data
  const [rowsDataTasks, setRowsDataTasks] = useState<TaskInterface[] | null>(
    null
  )

  const itemsBreadcrumbs = [
    { label: 'Painel', to: routsNameMain.home },
    { label: 'Painel de administração' }
  ]

  const rowsTableExams = rowsDataExams?.map((item, index) => {
    return <TableRowExamLittle key={index} rowItem={item} />
  })
  const rowsTableResults = rowsDataTasks?.map((item, index) => {
    return <TableRowTaskLittle key={index} rowItem={item} />
  })

  async function fetchDataStudent() {
    // Clear
    setRowsDataStudents(null)

    // Get
    await StudentViewModel.getAll().then(response => {
      if (response.error) {
        console.error('error: ', response.msg as string)
      } else {
        const arrayData = response.data as StudentInterface[]

        // Definir a lista completa de exames
        setRowsDataStudents(arrayData as StudentInterface[])
      }
    })
  }

  // Fetch Exam
  async function fetchDataExam() {
    // Clear
    setRowsDataExams(null)

    // Get
    await ExamViewModel.getAll().then(response => {
      if (response.error) {
        console.error('error: ', response.msg as string)
      } else {
        const arrayData = response.data as unknown as ExamInterface[]

        // Ordenar exames pela data (mais recente primeiro)
        const sortedExams = arrayData.sort(
          (a, b) =>
            new Date(b.date_exam).getTime() - new Date(a.date_exam).getTime()
        )

        // Filtrar todos os exames com status 'checked'
        const examsChecked = sortedExams.filter(
          exam => exam.status === 'scheduled'
        )

        // Limitar a quantidade a 3 exames
        const limitedExams = examsChecked.slice(0, 3)

        setRowsDataExams(limitedExams as ExamInterface[])
      }
    })
  }

  // Fetch Task
  async function fetchDataTask() {
    // Clear
    setRowsDataTasks(null)

    // Get
    await TaskViewModel.getAll().then(response => {
      if (response.error) {
        console.error('error: ', response.msg as string)
      } else {
        const arrayData = response.data as unknown as TaskInterface[]

        const examsScheduled = arrayData.filter(exam => exam.status === 'open')

        setRowsDataTasks(examsScheduled as TaskInterface[])
      }
    })
  }

  useEffect(() => {
    // Student
    fetchDataStudent()
    // Exam
    fetchDataExam()
    // Task
    fetchDataTask()
  }, [])

  return (
    <div className="w-full h-full flex flex-col justify-start items-start gap-6 overflow-x-hidden ">
      <Breadcrumbs items={itemsBreadcrumbs} />
      {/* Header */}
      <div className="relative w-full flex flex-row justify-between items-start rounded-md bg-light dark:bg-dark shadow-3xl  ">
        <div className="w-full my-14 mx-6 flex flex-col justify-start items-start gap-2">
          <span className="text-2xl font-semibold ">
            {getGreeting()},{' '}
            <span className="text-primary-200 ">
              Professor{currentAdminData?.gender == 'male' ? '' : '(a)'}{' '}
              {currentAdminData?.first_name} {currentAdminData?.last_name}
            </span>
          </span>
          <span className="font-normal text-base ">{getGreetingMsg()}</span>
        </div>

        <div className="w-full h-full relative z-[1] max-w-s-840:hidden ">
          <img
            src="/illustration/morning-img-01.png"
            alt=""
            className="absolute top-[-4.6rem] right-40 z-[1] max-w-s-960:right-10 "
          />
        </div>

        <img
          src="/background/bg-home.png"
          alt=""
          className="absolute bottom-0 right-0 h-full "
        />
      </div>

      <div className="w-full grid grid-cols-4 max-w-s-1030:grid-cols-2 max-w-s-520:grid-cols-1 gap-6">
        {/* Professores */}
        {/* <div className="w-full p-6 flex flex-col justify-start items-start gap-3 rounded-md bg-light dark:bg-dark shadow-3xl ">
          <span className="text-blue-600 ">
            <LiaChalkboardTeacherSolid size={36} />
          </span>
          <span className="font-normal text-base ">Total de Professores</span>
          <span className="text-3xl font-semibold ">
            {rowsDataProfessors?.length}{' '}
          </span>
        </div> */}

        {/* Estudantes */}
        <div className="w-full p-6 flex flex-col justify-start items-start gap-3 rounded-md bg-light dark:bg-dark shadow-3xl ">
          <span className="text-green-500 ">
            <GraduationCap size={36} />
          </span>
          <span className="font-normal text-base ">Total de Estudantes</span>
          <span className="text-3xl font-semibold ">
            {rowsDataStudents?.length}{' '}
          </span>
        </div>

        {/* Cursos */}
        <div className="w-full p-6 flex flex-col justify-start items-start gap-3 rounded-md bg-light dark:bg-dark shadow-3xl ">
          <span className="text-red-400 ">
            <LibraryBig size={36} />
          </span>
          <span className="font-normal text-base ">
            Total de Exames Marcados
          </span>
          <span className="text-3xl font-semibold ">
            {rowsDataExams?.length}
          </span>
        </div>

        {/* Tarefa Ativos */}
        <div className="w-full p-6 flex flex-col justify-start items-start gap-3 rounded-md bg-light dark:bg-dark shadow-3xl ">
          <span className="text-yellow-400 ">
            <BookMarked size={36} />
          </span>
          <span className="font-normal text-base ">
            Total de Tarefa abertas
          </span>
          <span className="text-3xl font-semibold ">
            {rowsDataTasks?.length}
          </span>
        </div>
      </div>

      <div className="w-full grid grid-cols-2 max-w-s-1030:grid-cols-1 gap-6">
        <div className="w-full p-6 flex flex-col justify-start items-start gap-6 rounded-md bg-light dark:bg-dark">
          <h1 className="text-xl font-bold text-dark dark:text-light ">
            Listagem de tarefas recentes
          </h1>

          <div className="relative w-full overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-sm font-thin bg-gray-300/40 dark:bg-gray-500/40 ">
                <tr className="border-b dark:border-gray-700">
                  <th scope="col" className="px-3 py-3 min-w-[6rem] ">
                    Tarefa
                  </th>
                  <th scope="col" className="px-3 py-3 min-w-[6rem] ">
                    Tipo de tarefa
                  </th>
                  <th scope="col" className="px-3 py-3 min-w-[6rem] ">
                    Valor
                  </th>
                  <th scope="col" className="px-3 py-3 min-w-[6rem] ">
                    Data de entrega
                  </th>
                </tr>
              </thead>

              <tbody>{rowsTableResults}</tbody>
            </table>
          </div>
        </div>

        <div className="w-full p-6 flex flex-col justify-start items-start gap-6 rounded-md bg-light dark:bg-dark">
          <h1 className="text-xl font-bold text-dark dark:text-light ">
            Proximos exames
          </h1>

          <div className="relative w-full overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-sm font-thin bg-gray-300/40 dark:bg-gray-500/40 ">
                <tr className="border-b dark:border-gray-700">
                  <th scope="col" className="px-3 py-3 min-w-[6rem] ">
                    Exame
                  </th>
                  <th scope="col" className="px-3 py-3 min-w-[6rem] ">
                    início
                  </th>
                  <th scope="col" className="px-3 py-3 min-w-[6rem] ">
                    Fim
                  </th>
                  <th scope="col" className="px-3 py-3 min-w-[6rem] ">
                    Nota (%)
                  </th>
                  <th scope="col" className="px-3 py-3 min-w-[6rem] ">
                    Data
                  </th>
                </tr>
              </thead>

              <tbody>{rowsTableExams}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
