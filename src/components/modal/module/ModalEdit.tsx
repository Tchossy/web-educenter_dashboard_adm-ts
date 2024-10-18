import { useEffect, useState } from 'react'
import { BeatLoader } from 'react-spinners'

// Lib
import Modal from 'react-modal'
import { ToastContainer } from 'react-toastify'
// Icon
import { X } from 'lucide-react'
// Form
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

// Services
import ModuleViewModel from '../../../services/ViewModel/ModuleViewModel'
// Interfaces
import { ModuleInterface } from '../../../interfaces/IModuleInterface'
// Type
import { modalEditeType } from '../../../types/modal'
// Data
import { genderOptions, statusOptions } from '../../../data/selectOption'
// Utils
import { showToast } from '../../../utils/toasts'

// Component
import { CustomInput } from '../../input/InputLabel'
import { SelectCustomZod } from '../../selects/SelectCustomZod'

// Style
import { customStylesModalCenter } from '../../../styles/custom/modals'
import { TextAreaLabel } from '../../input/TextAreaLabelZod'
import { OptionType } from '../../../types/option'
import CourseViewModel from '../../../services/ViewModel/CourseViewModel'
import { CourseInterface } from '../../../interfaces/ICourseInterface'

const formSchema = z.object({
  name: z
    .string({
      required_error: 'O nome é obrigatório!'
    })
    .min(3, 'O nome deve ter no mínimo 3 caracteres'),
  description: z
    .string({
      required_error: 'A descrição é obrigatório!'
    })
    .min(20, 'A descrição deve ter no mínimo 20 caracteres'),
  course_id: z.string().refine(
    value => {
      return value != ''
    },
    {
      message: 'O Curso é obrigatória!'
    }
  ),
  status: z.string().refine(
    value => {
      return value === 'inactive' || value === 'active'
    },
    {
      message: "Por favor, selecione uma opção válida: 'Ativo' ou 'Inativo'"
    }
  )
})

type formType = z.infer<typeof formSchema>

export function ModalEditModule({
  baseInfo,
  modalEditRowIsOpen,
  handleUpdateListing,
  setModalEditRowIsOpen
}: modalEditeType<ModuleInterface>) {
  // State
  const [isSend, setIsSend] = useState<boolean>(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const [rowsCourseData, setRowsCourseData] = useState<OptionType[]>([])

  // Const
  const namePageSingular = 'módulo'

  const initialValues: ModuleInterface = {
    name: baseInfo.name,
    description: baseInfo.description,
    course_id: baseInfo.course_id,
    status: baseInfo.status
  }

  // Form Zod
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<formType>({
    defaultValues: initialValues,
    resolver: zodResolver(formSchema)
  })

  // Modal
  function closeModal() {
    setModalEditRowIsOpen(false)
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  // Handle Select
  const handleStatusChange = (gender: string) => {
    console.log(`Selected State: ${gender}`)
  }

  // Function Course
  async function fetchCourseData() {
    // Clear
    setRowsCourseData([])

    // Get
    await CourseViewModel.getAll().then(response => {
      if (response.error) {
        showToast('error', response.msg as string)
      } else {
        const arrayData = response.data as CourseInterface[]

        const courseOptions: OptionType[] = arrayData?.map(obj => ({
          value: obj.id as string,
          label: obj.name as string
        }))

        setRowsCourseData(courseOptions)
      }
    })
  }

  // Function Submit Form
  async function handleSubmitForm(dataForm: any) {
    setIsSend(true)

    try {
      // Cria os dados
      const dataToSave: ModuleInterface = {
        ...dataForm
      }

      // Tenta criar com os dados salvos
      const resultSubmit = await ModuleViewModel.update(
        baseInfo?.id as string,
        dataToSave
      )

      if (resultSubmit.error) {
        showToast('error', resultSubmit.msg)
        setIsSend(false)
      } else {
        showToast('success', resultSubmit.msg)
        setTimeout(() => {
          setIsSend(false)
          closeModal()
        }, 4000)

        handleUpdateListing()
      }
    } catch (error) {
      showToast('error', String(error) as string)
      setIsSend(false)
    }
  }

  useEffect(() => {
    fetchCourseData()
  }, [])

  return (
    <>
      <Modal
        isOpen={modalEditRowIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        ariaHideApp={false}
        style={customStylesModalCenter}
        contentLabel="Example Modal"
      >
        <div className="w-full h-full flex items-center justify-center ">
          <ToastContainer />

          <div className="w-full h-auto max-h-[90%] max-w-3xl flex flex-col items-center p-0  rounded-md overflow-y-auto bg-dark overflow-x-hidden scroll-smooth">
            <div className="w-full py-4 px-5 flex flex-row justify-between items-center border-b-[1px] border-gray-600 ">
              <p className="text-xl font-medium text-light">
                Editar {namePageSingular}
              </p>

              <button
                onClick={closeModal}
                className="py-2 px-2 rounded-lg text-light hover:bg-gray-300/20 dark:hover:bg-gray-500/20 active:bg-gray-300 active:text-dark flex flex-row items-center justify-center gap-4 transition-all duration-300"
              >
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={handleSubmit(handleSubmitForm)}
              className="w-full p-6 flex flex-col justify-center items-center gap-6"
            >
              <div className="w-full grid gap-6 md:grid-cols-1">
                <CustomInput
                  type="text"
                  htmlFor="name"
                  label="Nome do módulo"
                  placeholder="Ex.: Fundamentos da Web"
                  control={control}
                  error={errors.name}
                />
              </div>

              <div className="w-full grid gap-6 md:grid-cols-1">
                <TextAreaLabel
                  htmlFor="description"
                  label="Descrição"
                  placeholder="Ex.: Módulo completo de Fundamentos da Web com foco em HTML, CSS, JavaScript e frameworks modernos."
                  control={control}
                  error={errors.description}
                />
              </div>

              <div className="w-full grid gap-6 md:grid-cols-2">
                <SelectCustomZod
                  name="course_id"
                  label="Curso"
                  control={control}
                  error={errors.course_id}
                  options={rowsCourseData}
                  onOptionChange={handleStatusChange}
                />
                <SelectCustomZod
                  name="status"
                  label="Estado"
                  control={control}
                  error={errors.status}
                  options={statusOptions}
                  onOptionChange={handleStatusChange}
                />
              </div>

              <div className="w-full pt-4 flex flex-row justify-between items-center border-t-[1px] border-gray-600 ">
                <button
                  type="submit"
                  disabled={isSend}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  {isSend && (
                    <>
                      <BeatLoader color="white" size={10} />
                    </>
                  )}

                  {!isSend && <span>Salvar alterações</span>}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </>
  )
}
