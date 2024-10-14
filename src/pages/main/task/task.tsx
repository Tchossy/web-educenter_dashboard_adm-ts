import { useState } from 'react'

// LIBS
import swal from 'sweetalert'
import { IoSearchSharp } from 'react-icons/io5'

// Data
import { routsNameMain } from '../../../data/routsName'
import { FileDown, Plus } from 'lucide-react'

// Table
import { TableRowTask } from '../../../components/table/TableRowTask'

// Components
import { SelectCustom } from '../../../components/selects/SelectCustom'
import { Breadcrumbs } from '../../../components/Breadcrumbs'
import { InputWithButton } from '../../../components/input/InputWithButton'

// Modals
import { taskData } from '../../../data/tableData'
import { Link } from 'react-router-dom'

export function Task() {
  // State
  const [modalEditRowIsOpen, setModalEditRowIsOpen] = useState<boolean>(false)
  const [modalSeeRowIsOpen, setModalSeeRowIsOpen] = useState<boolean>(false)
  const [modalCreateRowIsOpen, setModalCreateRowIsOpen] =
    useState<boolean>(false)
  const [rowSelect, setRowSelect] = useState<any | null>(null)
  const [selectedValue, setSelectedValue] = useState('8')

  // Consts
  const namePageUppercase = 'Tarefas'
  const namePageLowercase = 'tarefas'
  const namePageSingular = 'tarefa'

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
  const rowsTable = taskData.map((item, index) => {
    return (
      <TableRowTask
        key={index}
        rowItem={item}
        openModalSeeRow={openModalSeeRow} // Substitua pelo seu código real
        openModalEditRow={openModalEditRow} // Substitua pelo seu código real
        handleDeleteRow={handleDeleteRow} // Substitua pelo seu código real
      />
    )
  })

  // Function
  const fetchData = () => {
    // fetchData()
  }

  function handleDeleteRow(id: string) {
    swal({
      title: 'Tem certeza?',
      text: 'Uma vez excluído, você não poderá recuperar este usuario!',
      buttons: ['Cancelar', 'Confirmar'],
      icon: 'warning',
      dangerMode: true
    }).then(async willDelete => {
      if (willDelete) {
        try {
          // const response = await deleteEmployees(documentId)

          swal('Deletado com sucesso', {
            icon: 'success'
          })
        } catch (error) {
          swal(`Erro ao deletar registo: ${error}`, {
            icon: 'error'
          })
          console.error('', error)
        }
      } else {
        swal('O módulo está seguro!', {
          icon: 'error'
        })
      }
    })
  }
  const handleUpdateListing = () => {
    fetchData()
  }
  const handleSelectChange = (value: string) => {
    setSelectedValue(value)
  }

  // Modal
  function openModalEditRow(item: any) {
    setRowSelect(item)
    setModalEditRowIsOpen(true)
  }
  function openModalCreateRow(item: any) {
    setModalCreateRowIsOpen(true)
  }
  function openModalSeeRow(item: any) {
    setRowSelect(item)
    setModalSeeRowIsOpen(true)
  }

  return (
    <div className="w-full h-full flex flex-col justify-start items-start gap-6">
      <div className="w-full p-6 flex flex-col justify-start items-start gap-6 rounded-md bg-light dark:bg-dark">
        <Breadcrumbs items={itemsBreadcrumbs} />

        <h1 className="text-2xl font-bold text-dark dark:text-light ">
          {namePageUppercase}
        </h1>

        <div className="w-full flex flex-row items-center justify-between gap-2 ">
          <div className="flex flex-row items-center justify-between gap-4">
            <Link
              to={routsNameMain.task.create}
              className="py-2 px-4 rounded-lg bg-primary-200 text-white hover:bg-primary-500 active:bg-primary-700 flex flex-row items-center justify-center gap-4 transition-all duration-300 "
            >
              <Plus />
              Adicionar {namePageSingular}
            </Link>
            <button className="py-2 px-4 rounded-lg border-[1px] border-gray-200 dark:border-gray-600 hover:bg-gray-300/20 dark:hover:bg-gray-500/20 active:bg-gray-200 flex flex-row items-center justify-center gap-4 transition-all duration-300">
              <FileDown />
              Exportar
            </button>
          </div>

          <div className="w-full max-w-sm">
            <InputWithButton
              placeholder="Digite algo"
              // buttonText="Enviar"
              icon={<IoSearchSharp size={20} />}
              onButtonClick={() => {
                // Lógica a ser executada quando o botão é clicado
              }}
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
                  Nome
                </th>
                <th scope="col" className="px-3 py-3 min-w-[6rem]">
                  Curso
                </th>
                <th scope="col" className="px-3 py-3 min-w-[6rem]">
                  Módulo
                </th>
                <th scope="col" className="px-3 py-3 min-w-[6rem]">
                  Tipo de tarefa
                </th>
                <th scope="col" className="px-3 py-3 min-w-[6rem]">
                  Data de entrega
                </th>
                <th scope="col" className="px-3 py-3 min-w-[6rem]">
                  Ação
                </th>
              </tr>
            </thead>
            <tbody>{rowsTable}</tbody>
          </table>

          <div className="pt-4 flex flex-row justify-between items-center gap-1">
            <p className="text-xs flex flex-row justify-start items-center gap-1">
              Mostrando
              <strong className="text-dark dark:text-light font-semibold">
                1
              </strong>
              a
              <strong className="text-dark dark:text-light font-semibold">
                8
              </strong>
              de
              <strong className="text-dark dark:text-light font-semibold">
                21
              </strong>
              {namePageUppercase}
            </p>

            <div className="flex flex-row justify-center items-center gap-4 ">
              <div className="flex flex-row justify-center items-center gap-4 ">
                <span>Registos por página: </span>
                <SelectCustom
                  options={optionsRowPerPage}
                  selectedValue={selectedValue}
                  onChange={handleSelectChange}
                />
              </div>

              <button
                type="submit"
                className="sm:w-auto text-xs font-medium text-dark px-5 py-2.5 text-center flex flex-row justify-center items-center gap-2 bg-gray-50 rounded-lg  border border-gray-300 focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-light dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
