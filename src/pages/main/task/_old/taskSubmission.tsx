import { useEffect, useState } from 'react'

// LIBS
import swal from 'sweetalert'
import { IoSearchSharp } from 'react-icons/io5'

// Icon
import { Plus } from 'lucide-react'

// Data
import { routsNameMain } from '../../../../data/routsName'

// Services
import TaskSubmissionViewModel from '../../../../services/ViewModel/TaskSubmissionViewModel'

// Table
import { TableRowTaskSubmission } from '../../../../components/table/TableRowTaskSubmission'

// Components
import { SelectCustom } from '../../../../components/selects/SelectCustom'
import { Breadcrumbs } from '../../../../components/Breadcrumbs'
import { InputWithButton } from '../../../../components/input/InputWithButton'
import ExportToExcel from '../../../../components/ExportToExcel'

// Interface
import { TaskSubmissionInterface } from '../../../../interfaces/ITaskSubmissionInterface'
import { showToast } from '../../../../utils/toasts'
import { converter } from '../../../../utils/converter'

export function TaskSubmission() {
  // State
  const [rowsData, setRowsData] = useState<TaskSubmissionInterface[] | null>(
    null
  )
  const [dataToExport, setDataToExport] = useState<any[]>([])

  const [selectedValue, setSelectedValue] = useState('8')

  // Search
  const [termForSearch, setTermForSearch] = useState<string>('')

  const [docsPerPage, setDocsPerPage] = useState<string>('8')
  const [totalDocs, setTotalDocs] = useState<number>(0)

  // Consts
  const namePageUppercase = 'Tarefas enviadas'
  const namePageLowercase = 'tarefas enviadas'

  // List Array
  const itemsBreadcrumbs = [
    { label: 'Inicio', to: routsNameMain.home },
    { label: namePageUppercase, to: routsNameMain.task.index },
    { label: 'Listagem' }
  ]

  const optionsRowPerPage = [
    { value: '8', label: '8' },
    { value: '14', label: '14' },
    { value: '18', label: '18' },
    { value: '22', label: '22' },
    { value: '26', label: '26' },
    { value: '30', label: '30' },
    { value: 'Todos', label: 'Todos' }
  ]
  const rowsTable = rowsData?.map((item, index) => {
    return (
      <TableRowTaskSubmission
        key={index}
        rowItem={item}
        handleDeleteRow={handleDeleteRow} // Substitua pelo seu código real
      />
    )
  })

  // Function
  async function fetchData(limit: string) {
    // Clear
    setRowsData(null)

    // Get
    await TaskSubmissionViewModel.getAll().then(response => {
      if (response.error) {
        showToast('error', response.msg as string)
      } else {
        const arrayData = response.data as TaskSubmissionInterface[]
        setTotalDocs(arrayData.length)
        console.log(response)

        const listData = arrayData.slice(0, Number(limit))

        setRowsData(listData as TaskSubmissionInterface[])
      }
    })
  }

  // Get more data
  function fetchMoreData() {
    const sumTotal =
      converter.stringToNumber(docsPerPage) +
      converter.stringToNumber(docsPerPage)
    const str = converter.numberToString(sumTotal)
    fetchData(str)
  }

  // Search data
  async function searchDocs() {
    if (termForSearch == '') {
      fetchData(docsPerPage)
    } else {
      TaskSubmissionViewModel.getAllByTermData(termForSearch).then(response => {
        setRowsData(response?.data as TaskSubmissionInterface[])
      })
    }
  }

  // Delete row
  function handleDeleteRow(id: string) {
    swal({
      title: 'Tem certeza?',
      text: 'Uma vez excluído, você não poderá recuperar!',
      buttons: ['Cancelar', 'Confirmar'],
      icon: 'warning',
      dangerMode: true
    }).then(async willDelete => {
      if (willDelete) {
        await TaskSubmissionViewModel.delete(id).then(response => {
          console.log(response)

          if (response.error) {
            swal(`Erro ao deletar registo: ${response.msg}`, {
              icon: 'error'
            })
            console.error('', response.msg)
          } else {
            swal('Deletado com sucesso', {
              icon: 'success'
            })

            fetchData(docsPerPage)
          }
        })
      } else {
        swal('O registo está seguro!', {
          icon: 'error'
        })
      }
    })
  }

  // Change rows per page
  const handleSelectChange = (value: string) => {
    setSelectedValue(value)
    setDocsPerPage(value)
    fetchData(value)
  }

  useEffect(() => {
    fetchData(docsPerPage)
  }, [])

  useEffect(() => {
    const newData = rowsData?.map(doc => ({
      Id: `${doc.id}`,
      Tarefa: doc.task_id,
      Estudante: doc.student_id,
      Tarefa_Enviada: doc.submission_url,
      Texto: doc.submission_text,
      Resultado: doc.result,
      Feedback: doc.feedback,
      Data_de_envio: doc.submission_date,
      Nota: doc.grade,
      Status: doc.status,
      Data_de_criacao: doc.date_create,
      Ultima_atualização: doc.date_update
    }))

    setDataToExport(newData as any)
  }, [rowsData])

  return (
    <div className="w-full h-full flex flex-col justify-start items-start gap-6">
      <div className="w-full p-6 flex flex-col justify-start items-start gap-6 rounded-md bg-light dark:bg-dark">
        <Breadcrumbs items={itemsBreadcrumbs} />

        <h1 className="text-2xl font-bold text-dark dark:text-light ">
          {namePageUppercase}
        </h1>

        <div className="w-full flex flex-row max-w-s-960:flex-col items-center max-w-s-960:items-start justify-between gap-2 ">
          <div className="flex flex-row max-w-s-640:flex-col items-center max-w-s-640:items-start justify-between gap-4">
            <ExportToExcel
              data={dataToExport}
              filename="exam_result_data"
              sheetName="Exame"
              titlePage="Lista de resultados do exame"
              imageSrc="http://localhost:5173/logo.png"
              orientation="landscape"
              scale={0.8}
            />
          </div>

          <div className="w-full max-w-sm">
            <InputWithButton
              onChange={e => setTermForSearch(e.target.value)}
              placeholder="Digite algo"
              icon={<IoSearchSharp size={20} />}
              onButtonClick={searchDocs}
            />
          </div>
        </div>
      </div>

      <div className="w-full p-6 flex flex-col justify-start items-start gap-6 rounded-md bg-light dark:bg-dark">
        <h1 className="text-xl font-bold text-dark dark:text-light ">
          Listagem de {namePageLowercase}
        </h1>

        <div className="relative w-full overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-sm font-thin bg-gray-300/40 dark:bg-gray-500/40">
              <tr className="border-b dark:border-gray-700">
                <th scope="col" className="px-3 py-3 w-[0rem]">
                  Id
                </th>
                <th scope="col" className="px-3 py-3 min-w-[6rem]">
                  Tarefa
                </th>
                <th scope="col" className="px-3 py-3 min-w-[6rem]">
                  Estudante
                </th>
                <th scope="col" className="px-3 py-3 min-w-[6rem]">
                  Nota
                </th>
                <th scope="col" className="px-3 py-3 min-w-[6rem]">
                  Status
                </th>
                <th scope="col" className="px-3 py-3 min-w-[6rem]">
                  Data de envio
                </th>
                <th scope="col" className="px-3 py-3 min-w-[6rem]">
                  Ação
                </th>
              </tr>
            </thead>
            <tbody>{rowsTable}</tbody>
          </table>

          <div className="pt-4 flex flex-row max-w-s-960:flex-col justify-between items-center max-w-s-960:items-start gap-1 max-w-s-960:gap-3">
            <p className="text-xs flex flex-row justify-start items-center gap-1 whitespace-nowrap">
              Mostrando
              <strong className="text-dark dark:text-light font-semibold">
                {rowsData?.length !== undefined ? '1' : '0'}
              </strong>
              a
              <strong className="text-dark dark:text-light font-semibold">
                {rowsData?.length !== undefined ? rowsData?.length : '0'}
              </strong>
              de
              <strong className="text-dark dark:text-light font-semibold">
                {totalDocs}
              </strong>
              {namePageUppercase}
            </p>

            <div className="flex flex-row justify-center items-center gap-4 mb-3 max-w-s-640:flex-wrap">
              <div className="flex-1 flex flex-row justify-start items-center gap-4 max-w-s-520:flex-wrap">
                <span className="">Registos por página: </span>

                <span className="max-w-24">
                  <SelectCustom
                    options={optionsRowPerPage}
                    selectedValue={selectedValue}
                    onChange={handleSelectChange}
                  />
                </span>
              </div>

              <button
                onClick={fetchMoreData}
                type="submit"
                className="w-full sm:w-auto text-xs font-medium text-dark px-5 py-2.5 text-center flex flex-row justify-center items-center gap-2 bg-gray-50 rounded-lg  border border-gray-300 focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-light dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <Plus size={16} /> Listar mais registos
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
