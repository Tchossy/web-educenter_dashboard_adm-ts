import { useEffect, useState } from 'react'

// LIBS
import swal from 'sweetalert'
import { IoSearchSharp } from 'react-icons/io5'

// Data
import { routsNameMain } from '../../data/routsName'
import { Plus } from 'lucide-react'

// Table
import TableRow from '../../components/table/TableRowProfessor'

// Components
import { SelectCustom } from '../../components/selects/SelectCustom'
import { Breadcrumbs } from '../../components/Breadcrumbs'
import { InputWithButton } from '../../components/input/InputWithButton'

// Modals
import { ModalEditProfessor } from '../../components/modal/professor/ModalEdit'
import { ModalCreateProfessor } from '../../components/modal/professor/ModalCreate'
import { ModalSeeProfessor } from '../../components/modal/professor/ModalSee'

// Interface
import { ProfessorInterface } from '../../interfaces/IProfessorInterface'
import ProfessorViewModel from '../../services/ViewModel/ProfessorViewModel'
import { showToast } from '../../utils/toasts'
import ExportToExcel from '../../components/ExportToExcel'
import { converter } from '../../utils/converter'

export function Professor() {
  // State
  const [rowsData, setRowsData] = useState<ProfessorInterface[] | null>(null)
  const [dataToExport, setDataToExport] = useState<any[]>([])

  // Modal
  const [modalEditRowIsOpen, setModalEditRowIsOpen] = useState<boolean>(false)
  const [modalSeeRowIsOpen, setModalSeeRowIsOpen] = useState<boolean>(false)
  const [modalCreateRowIsOpen, setModalCreateRowIsOpen] =
    useState<boolean>(false)

  const [rowSelect, setRowSelect] = useState<any | null>(null)
  const [selectedValue, setSelectedValue] = useState('8')

  // Search
  const [termForSearch, setTermForSearch] = useState<string>('')

  const [docsPerPage, setDocsPerPage] = useState<string>('8')
  const [totalDocs, setTotalDocs] = useState<number>(0)

  // Const
  const namePageUppercase = 'Professores'
  const namePageLowercase = 'professores'
  const namePageSingular = 'professor'

  // List Array
  const itemsBreadcrumbs = [
    { label: 'Inicio', to: routsNameMain.home },
    { label: namePageUppercase, to: routsNameMain.professor },
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
      <TableRow
        key={index}
        rowItem={item}
        openModalSeeRow={openModalSeeRow} // Substitua pelo seu código real
        openModalEditRow={openModalEditRow} // Substitua pelo seu código real
        handleDeleteRow={handleDeleteRow} // Substitua pelo seu código real
      />
    )
  })

  // Function
  async function fetchData(limit: string) {
    // Clear
    setRowsData(null)

    // Get
    await ProfessorViewModel.getAll().then(response => {
      if (response.error) {
        showToast('error', response.msg as string)
      } else {
        const arrayData = response.data as unknown as ProfessorInterface[]
        setTotalDocs(arrayData.length)
        console.log(arrayData)

        const listData = arrayData.slice(0, Number(limit))

        setRowsData(listData as ProfessorInterface[])
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
      ProfessorViewModel.getAllByTermData(termForSearch).then(response => {
        setRowsData(response.data as ProfessorInterface[])
      })
    }
  }

  // Update Listing
  const handleUpdateListing = () => {
    fetchData(docsPerPage)
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
        await ProfessorViewModel.delete(id).then(response => {
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

  // Modal
  function openModalEditRow(item: any) {
    setRowSelect(item)
    setModalEditRowIsOpen(true)
  }
  function openModalCreateRow() {
    setModalCreateRowIsOpen(true)
  }
  function openModalSeeRow(item: any) {
    setRowSelect(item)
    setModalSeeRowIsOpen(true)
  }

  useEffect(() => {
    fetchData(docsPerPage)
  }, [])

  useEffect(() => {
    const newData = rowsData?.map(doc => ({
      Id: `${doc.id}`,
      Nome: doc.first_name,
      Sobrenome: doc.last_name,
      Telemovel: doc.phone,
      Email: doc.email,
      Genero: doc.gender,
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
            <button
              onClick={openModalCreateRow}
              className="py-2 px-4 rounded-lg bg-primary-200 text-white hover:bg-primary-500 active:bg-primary-700 flex flex-row items-center justify-center gap-4 transition-all duration-300 "
            >
              <Plus />
              Adicionar {namePageSingular}
            </button>

            <ExportToExcel
              data={dataToExport}
              filename="admin_data"
              sheetName="Admin"
              titlePage="Lista de admins"
              imageSrc="http://localhost:5173/logo.png"
              orientation="landscape"
              scale={0.8}
            />
          </div>

          <div className="w-full max-w-sm">
            <InputWithButton
              onChange={e => setTermForSearch(e.target.value)}
              placeholder="Digite algo"
              // buttonText="Enviar"
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
            <thead className="text-sm font-thin bg-gray-300/40 dark:bg-gray-500/40 ">
              <tr className="border-b dark:border-gray-700">
                <th scope="col" className="px-3 py-3 w-[0rem] ">
                  Id
                </th>
                <th scope="col" className="px-3 py-3 min-w-[6rem] ">
                  Nome
                </th>

                <th scope="col" className="px-3 py-3 min-w-[6rem] ">
                  Genero
                </th>
                <th scope="col" className="px-3 py-3 min-w-[6rem] ">
                  Número
                </th>
                <th scope="col" className="px-3 py-3 min-w-[6rem] ">
                  Conta
                </th>
                <th scope="col" className="px-3 py-3 min-w-[6rem] ">
                  Registo
                </th>
                <th scope="col" className="px-3 py-3 min-w-[6rem] ">
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

      {modalCreateRowIsOpen && (
        <ModalCreateProfessor
          handleUpdateListing={handleUpdateListing}
          modalCreateRowIsOpen={modalCreateRowIsOpen}
          setModalCreateRowIsOpen={setModalCreateRowIsOpen}
        />
      )}
      {modalEditRowIsOpen && (
        <ModalEditProfessor
          baseInfo={rowSelect}
          handleUpdateListing={handleUpdateListing}
          modalEditRowIsOpen={modalEditRowIsOpen}
          setModalEditRowIsOpen={setModalEditRowIsOpen}
        />
      )}
      {modalSeeRowIsOpen && (
        <ModalSeeProfessor
          baseInfo={rowSelect}
          handleUpdateListing={handleUpdateListing}
          modalSeeRowIsOpen={modalSeeRowIsOpen}
          setModalSeeRowIsOpen={setModalSeeRowIsOpen}
        />
      )}
    </div>
  )
}
