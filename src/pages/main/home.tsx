import { useEffect, useState } from 'react'

// Icon
import { GraduationCap, LibraryBig, BookMarked } from 'lucide-react'
import { LiaChalkboardTeacherSolid } from 'react-icons/lia'
// Component
import { TableRowExamLittle } from '../../components/table/TableRowExamLittle'
import { TableRowResultLittle } from '../../components/table/TableRowResultLittle'
import { Breadcrumbs } from '../../components/Breadcrumbs'
// Data
import { routsNameMain } from '../../data/routsName'
// UseStores
import { useAdminStore } from '../../stores/adminStore'
import { getGreeting, getGreetingMsg } from '../../utils/getGreeting'

export function Home() {
  const { currentAdminData } = useAdminStore()

  const [rowsDataUser, setRowsDataUser] = useState<any[] | null>(null)
  const [rowsDataExams, setRowsDataExams] = useState<any[] | null>(null)
  const [rowsDataResults, setRowsDataResults] = useState<any[] | null>(null)

  const itemsBreadcrumbs = [
    { label: 'Painel', to: routsNameMain.home },
    { label: 'Painel de administração' }
  ]

  const rowsTableExams = rowsDataExams?.map((item, index) => {
    return (
      <TableRowExamLittle
        key={index}
        rowItem={item}
        openModalSeeRow={() => null} // Substitua pelo seu código real
        openModalEditRow={() => null} // Substitua pelo seu código real
        handleDeleteRow={() => null} // Substitua pelo seu código real
      />
    )
  })
  const rowsTableResults = rowsDataResults?.map((item, index) => {
    return (
      <TableRowResultLittle
        key={index}
        rowItem={item}
        openModalSeeRow={() => null} // Substitua pelo seu código real
        openModalEditRow={() => null} // Substitua pelo seu código real
        handleDeleteRow={() => null} // Substitua pelo seu código real
      />
    )
  })

  function fetchDataUser(limit: string) {
    // Clear
    setRowsDataUser(null)

    // Get
  }
  function fetchDataExam(limit: string) {
    // Clear
    setRowsDataExams(null)

    // Get
  }
  function fetchDataResult(limit: string) {
    // Clear
    setRowsDataResults(null)

    // Get
  }

  useEffect(() => {
    fetchDataUser('6')
    fetchDataExam('6')
    fetchDataResult('6')
  }, [])

  return (
    <div className="w-full h-full flex flex-col justify-start items-start gap-6 overflow-x-hidden ">
      <Breadcrumbs items={itemsBreadcrumbs} />
      {/* Pacientes */}
      <div className="relative w-full flex flex-row justify-between items-start rounded-md bg-light dark:bg-dark shadow-3xl  ">
        <div className="w-full my-14 mx-6 flex flex-col justify-start items-start gap-2">
          <span className="text-2xl font-semibold ">
            {getGreeting()},{' '}
            <span className="text-primary-200 ">
              Sr{currentAdminData?.gender == 'male' ? '' : '(a)'} .{' '}
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

      <div className="w-full grid grid-cols-4 gap-6">
        {/* Professores */}
        <div className="w-full p-6 flex flex-col justify-start items-start gap-3 rounded-md bg-light dark:bg-dark shadow-3xl ">
          <span className="text-blue-600 ">
            <LiaChalkboardTeacherSolid size={36} />
          </span>
          <span className="font-normal text-base ">Total de Professores</span>
          <span className="text-3xl font-semibold ">
            {' 126 '}
            {rowsDataUser?.length}{' '}
          </span>
          {/* <span className="text-xs flex flex-row items-center justify-center gap-[6px] ">
            <span className="text-green-500 font-medium flex flex-row items-center justify-center gap-1 ">
              <LiaChalkboardTeacherSolid size={16} /> +2,5%
            </span>
            do que na semana passada
          </span> */}
        </div>

        {/* Estudantes */}
        <div className="w-full p-6 flex flex-col justify-start items-start gap-3 rounded-md bg-light dark:bg-dark shadow-3xl ">
          <span className="text-green-500 ">
            <GraduationCap size={36} />
          </span>
          <span className="font-normal text-base ">Total de Estudantes</span>
          <span className="text-3xl font-semibold ">
            {' 46 '}
            {rowsDataExams?.length}{' '}
          </span>
          {/* <span className="text-xs flex flex-row items-center justify-center gap-[6px] ">
            <span className="text-red-400 font-medium flex flex-row items-center justify-center gap-1 ">
              <TrendingDown size={16} /> -1,4%
            </span>
            do que na semana passada
          </span> */}
        </div>

        {/* Cursos */}
        <div className="w-full p-6 flex flex-col justify-start items-start gap-3 rounded-md bg-light dark:bg-dark shadow-3xl ">
          <span className="text-red-400 ">
            <LibraryBig size={36} />
          </span>
          <span className="font-normal text-base ">Total de Cursos</span>
          <span className="text-3xl font-semibold ">
            {' 17 '}
            {rowsDataResults?.length}
          </span>
          {/* <span className="text-xs flex flex-row items-center justify-center gap-[6px] ">
            <span className="text-green-500 font-medium flex flex-row items-center justify-center gap-1 ">
              <TrendingUp size={16} /> +2,8%
            </span>
            do que na semana passada
          </span> */}
        </div>

        {/* Exames Ativos */}
        <div className="w-full p-6 flex flex-col justify-start items-start gap-3 rounded-md bg-light dark:bg-dark shadow-3xl ">
          <span className="text-yellow-400 ">
            <BookMarked size={36} />
          </span>
          <span className="font-normal text-base ">Total de Exames Ativos</span>
          <span className="text-3xl font-semibold ">
            {' 17 '}
            {rowsDataResults?.length}
          </span>
          {/* <span className="text-xs flex flex-row items-center justify-center gap-[6px] ">
            <span className="text-green-500 font-medium flex flex-row items-center justify-center gap-1 ">
              <TrendingUp size={16} /> +2,8%
            </span>
            do que na semana passada
          </span> */}
        </div>
      </div>

      <div className="w-full grid grid-cols-2 gap-6">
        <div className="w-full p-6 flex flex-col justify-start items-start gap-6 rounded-md bg-light dark:bg-dark">
          <h1 className="text-xl font-bold text-dark dark:text-light ">
            Listagem de resultados recentes
          </h1>

          <div className="relative w-full overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-sm font-thin bg-gray-300/40 dark:bg-gray-500/40 ">
                <tr className="border-b dark:border-gray-700">
                  <th scope="col" className="px-3 py-3 min-w-[6rem] ">
                    Id
                  </th>

                  <th scope="col" className="px-3 py-3 min-w-[6rem] ">
                    Estudante
                  </th>
                  <th scope="col" className="px-3 py-3 min-w-[6rem] ">
                    Exame
                  </th>
                  <th scope="col" className="px-3 py-3 min-w-[6rem] ">
                    Pontuação
                  </th>
                  <th scope="col" className="px-3 py-3 min-w-[6rem] ">
                    Data
                  </th>
                </tr>
              </thead>

              <tbody>{rowsTableResults}</tbody>
            </table>
          </div>
        </div>

        <div className="w-full p-6 flex flex-col justify-start items-start gap-6 rounded-md bg-light dark:bg-dark">
          <h1 className="text-xl font-bold text-dark dark:text-light ">
            Listagem exames recentes
          </h1>

          <div className="relative w-full overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-sm font-thin bg-gray-300/40 dark:bg-gray-500/40 ">
                <tr className="border-b dark:border-gray-700">
                  <th scope="col" className="px-3 py-3 min-w-[6rem] ">
                    Nome do Exame
                  </th>
                  <th scope="col" className="px-3 py-3 min-w-[6rem] ">
                    Curso Vinculado
                  </th>
                  <th scope="col" className="px-3 py-3 min-w-[6rem] ">
                    Especialidade Vinculada
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
