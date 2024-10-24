import { useEffect, useState } from 'react'

// Lib
import Modal from 'react-modal'
import { X } from 'lucide-react'
import { BeatLoader } from 'react-spinners'

// Form
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// Services
import uploadViewModel from '../../../services/ViewModel/uploadViewModel'
import StudentViewModel from '../../../services/ViewModel/StudentViewModel'

// Data
import { genderOptions, statusOptions } from '../../../data/selectOption'

// Component
import { CustomInput } from '../../input/InputLabel'
import { SelectCustomZod } from '../../selects/SelectCustomZod'

// Style
import { customStylesModalCenter } from '../../../styles/custom/modals'

// Types
import { modalCreateType } from '../../../types/modal'

// Interfaces
import { StudentInterface } from '../../../interfaces/IStudentInterface'

// Utils
import { showToast } from '../../../utils/toasts'
import { CourseInterface } from '../../../interfaces/ICourseInterface'
import { ModuleInterface } from '../../../interfaces/IModuleInterface'
import CourseViewModel from '../../../services/ViewModel/CourseViewModel'
import ModuleViewModel from '../../../services/ViewModel/ModuleViewModel'
import { OptionType } from '../../../types/option'
import { ToastContainer } from 'react-toastify'

const formSchema = z.object({
  first_name: z
    .string({
      required_error: 'O nome é obrigatório!'
    })
    .min(3, 'O nome completo tem de no mínimo 3 caracteres')
    .refine(value => value, {
      message: 'Por favor, preencha este campo'
    }),
  last_name: z
    .string({
      required_error: 'O nome é obrigatório!'
    })
    .min(3, 'O nome completo tem de no mínimo 3 caracteres')
    .refine(value => value, {
      message: 'Por favor, preencha este campo'
    }),
  phone: z.string({
    required_error: 'Por favor, preencha este campo!'
  }),
  email: z
    .string({
      required_error: 'O email é obrigatório!'
    })
    .email('Formato de email invalido')
    .toLowerCase()
    .trim(),
  date_of_birth: z.string().refine(
    value => {
      return value != ''
    },
    {
      message: 'Por favor, informe hora de fim'
    }
  ),
  status: z.string().refine(
    value => {
      return value === 'inactive' || value === 'active'
    },
    {
      message: "Por favor, selecione uma opção válida: 'Ativo' ou 'Inativo'"
    }
  ),
  gender: z.string().refine(
    value => {
      return value === 'male' || value === 'female'
    },
    {
      message:
        "Por favor, selecione uma opção válida: 'masculino' ou 'feminino'"
    }
  ),
  course_id: z
    .string({
      required_error: 'O curso é obrigatório!'
    })
    .refine(value => value, {
      message: 'Por favor, selecione uma opção válida'
    }),
  module_id: z
    .string({
      required_error: 'O módulo é obrigatório!'
    })
    .refine(value => value, {
      message: 'Por favor, selecione uma opção válida'
    }),
  password: z
    .string({
      required_error: 'A palavra-passe é obrigatório!'
    })
    .min(6, 'A palavra-passe tem de no mínimo 6 caracteres')
    .trim()
    .refine(value => value, {
      message: 'Por favor, preencha este campo.'
    }),
  confirm_password: z
    .string({
      required_error: 'A palavra-passe é obrigatório!'
    })
    .min(6, 'A palavra-passe tem de no mínimo 6 caracteres')
    .trim()
    .refine(value => value, {
      message: 'Por favor, preencha este campo.'
    })
})
type formType = z.infer<typeof formSchema>

export function ModalCreateStudent({
  handleUpdateListing,
  modalCreateRowIsOpen,
  setModalCreateRowIsOpen
}: modalCreateType<any>) {
  // Loading
  const [uploading, setUploading] = useState<boolean>(false)
  const [isSend, setIsSend] = useState<boolean>(false)

  const [rowsCourseData, setRowsCourseData] = useState<OptionType[]>([])
  const [rowsModuleData, setRowsModuleData] = useState<OptionType[]>([])

  // Image
  const [selectedFile, setSelectedFile] = useState<string>('')
  const [imagesSelect, setImagesSelect] = useState<string>('')

  // Const
  const namePageSingular = 'estudante'

  // Form Zod
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<formType>({
    resolver: zodResolver(formSchema)
  })

  // Modal
  function closeModal() {
    setModalCreateRowIsOpen(false)
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  // Image
  const onImageChange = (e: any) => {
    const [file] = e.target.files
    const photo = e.target.files[0]
    setSelectedFile(photo)
    setImagesSelect(URL.createObjectURL(file))
  }

  // Handle Select
  const handleGenderChange = (gender: string) => {
    console.log(`Selected Gender: ${gender}`)
  }
  const handleStatusChange = (gender: string) => {
    console.log(`Selected State: ${gender}`)
  }
  const handleCourseChange = (course: string) => {
    console.log(`Selected course: ${course}`)
    fetchModuleData(course)
  }
  const handleModuleChange = (module: string) => {
    console.log(`Selected module: ${module}`)
  }

  // Function Upload Photo
  async function handleUploadPhoto(): Promise<{
    urlPhoto: string
    msgUpload: string
  }> {
    console.log('Uploading photo...')

    setUploading(true)

    const formData = new FormData()
    formData.append('imageStudent', selectedFile)

    const result = await uploadViewModel.uploadStudentPhoto(formData)

    if (result.error) {
      throw new Error(result.msg)
    }

    const urlPhoto = result.url as string
    const msgUpload = result.msg as string
    return {
      urlPhoto,
      msgUpload
    }
  }

  // Function Submit Form
  async function handleSubmitForm(dataForm: any) {
    if (dataForm.password !== dataForm.confirm_password) {
      showToast('error', 'As palavras pass não convidem')
      return
    }

    setIsSend(true)

    try {
      // Primeiro, faz o upload da imagem
      const resUrl = await handleUploadPhoto()

      const { urlPhoto, msgUpload } = resUrl

      if (!urlPhoto) {
        showToast('error', msgUpload)
        setIsSend(false)
        return
      }

      // Cria os dados para o admin
      const dataToSave: StudentInterface = {
        ...dataForm,
        photo: urlPhoto
      }

      // Tenta criar o admin com os dados salvos
      const resultSubmit = await StudentViewModel.create(dataToSave)

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
  // Function Module
  async function fetchModuleData(course_id: string) {
    // Clear
    setRowsModuleData([])

    // Get
    await ModuleViewModel.getAllByCourse(course_id)
      .then(response => {
        if (response.error) {
          showToast('error', response.msg as string)
        } else {
          const arrayData = response.data as ModuleInterface[]

          const moduleOptions: OptionType[] = arrayData?.map(obj => ({
            value: obj.id as string,
            label: obj.name as string
          }))

          setRowsModuleData(moduleOptions)
        }
      })
      .catch(err => {
        showToast('error', err as string)
      })
  }

  useEffect(() => {
    fetchCourseData()
  }, [])
  return (
    <>
      <Modal
        isOpen={modalCreateRowIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        ariaHideApp={false}
        style={customStylesModalCenter}
        contentLabel="Example Modal"
      >
        <div className="w-full h-full flex items-center justify-center ">
          <ToastContainer />

          <div className="w-full h-auto max-h-[100%] max-w-3xl flex flex-col items-center p-0  rounded-md overflow-y-auto bg-dark overflow-x-hidden scroll-smooth">
            <div className="w-full py-4 px-5 flex flex-row justify-between items-center border-b-[1px] border-gray-600 ">
              <p className="text-xl font-medium text-light">
                Criar {namePageSingular}
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
              <div className="w-full flex flex-col items-start justify-start">
                <div className="w-full max-w-[14rem] flex items-start justify-start ">
                  <label
                    htmlFor="dropzone-file"
                    className="w-full h-40 flex flex-col items-center justify-center border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-70 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-800 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 transition-all duration-300 relative overflow-hidden"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>{' '}
                        {/* or drag and drop */}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        PNG, JPG or JPEG (MAX. 3Mb)
                      </p>
                    </div>

                    {imagesSelect && (
                      <img
                        className=" w-full h-full object-cover absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-300"
                        src={imagesSelect}
                        alt="Rafael Pilartes"
                      />
                    )}
                    <input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      onChange={onImageChange}
                    />
                  </label>
                </div>
              </div>

              <div className="w-full grid gap-6 md:grid-cols-2">
                <CustomInput
                  type="text"
                  htmlFor="first_name"
                  label="Primeiro nome"
                  placeholder="Ex.: Rafael"
                  control={control}
                  error={errors.first_name}
                />

                <CustomInput
                  type="text"
                  htmlFor="last_name"
                  label="Ultimo nome"
                  placeholder="Ex.: Pilartes"
                  control={control}
                  error={errors.last_name}
                />
              </div>

              <CustomInput
                type="email"
                htmlFor="email"
                label="Endereço de email"
                placeholder="Ex.: geral@rafaelpilartes.com"
                control={control}
                error={errors.email}
              />

              <div className="w-full grid gap-6 md:grid-cols-2">
                <CustomInput
                  type="number"
                  htmlFor="phone"
                  label="Número de telefone"
                  placeholder="Ex.: 923414621"
                  control={control}
                  error={errors.phone}
                />

                <CustomInput
                  type="date"
                  htmlFor="date_of_birth"
                  label="Data de aniversario"
                  control={control}
                  error={errors.date_of_birth}
                />
              </div>

              <div className="w-full grid gap-6 md:grid-cols-2">
                <SelectCustomZod
                  name="gender"
                  label="Género"
                  control={control}
                  error={errors.gender}
                  options={genderOptions}
                  onOptionChange={handleGenderChange}
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

              <div className="w-full grid gap-6 md:grid-cols-2">
                <SelectCustomZod
                  name="course_id"
                  label="Curso"
                  control={control}
                  error={errors.course_id}
                  options={rowsCourseData}
                  onOptionChange={handleCourseChange}
                />
                <SelectCustomZod
                  name="module_id"
                  label="Modulo"
                  control={control}
                  error={errors.module_id}
                  options={rowsModuleData}
                  onOptionChange={handleModuleChange}
                />
              </div>

              <div className="w-full grid gap-6 md:grid-cols-2">
                <CustomInput
                  type="password"
                  htmlFor="password"
                  label="Palavra Pass"
                  placeholder="•••••••••"
                  control={control}
                  error={errors.password}
                />
                <CustomInput
                  type="password"
                  htmlFor="confirm_password"
                  label="Confirme a Palavra Pass"
                  placeholder="•••••••••"
                  control={control}
                  error={errors.confirm_password}
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

                  {!isSend && <span>Criar</span>}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </>
  )
}
