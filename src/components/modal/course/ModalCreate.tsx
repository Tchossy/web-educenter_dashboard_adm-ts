import { useState } from 'react'

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
import CourseViewModel from '../../../services/ViewModel/CourseViewModel'

// Data
import { statusOptions } from '../../../data/selectOption'

// Component
import { CustomInput } from '../../input/InputLabel'
import { SelectCustomZod } from '../../selects/SelectCustomZod'
import { TextAreaLabel } from '../../input/TextAreaLabelZod'

// Style
import { customStylesModalCenter } from '../../../styles/custom/modals'

// Types
import { modalCreateType } from '../../../types/modal'

// Interfaces
import { CourseInterface } from '../../../interfaces/ICourseInterface'

// Utils
import { showToast } from '../../../utils/toasts'
import { ToastContainer } from 'react-toastify'

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
  duration: z.string({
    required_error: 'A duração é obrigatória!'
  }),
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

export function ModalCreateCourse({
  handleUpdateListing,
  modalCreateRowIsOpen,
  setModalCreateRowIsOpen
}: modalCreateType) {
  // Loading
  const [uploading, setUploading] = useState<boolean>(false)
  const [urlPhotoUploaded, setUrlPhotoUploaded] = useState<string | null>(null)
  const [isSend, setIsSend] = useState<boolean>(false)

  // Image
  const [selectedFile, setSelectedFile] = useState<string>('')
  const [imagesSelect, setImagesSelect] = useState<string>('')

  // Const
  const namePageSingular = 'curso'

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
    const image = e.target.files[0]
    setSelectedFile(image)
    setImagesSelect(URL.createObjectURL(file))
  }

  // Handle Select
  const handleStatusChange = (gender: string) => {
    console.log(`Selected State: ${gender}`)
  }

  // Function Upload
  async function handleUploadPhoto(): Promise<{
    urlPhoto: string
    msgUpload: string
  }> {
    console.log('Uploading...')

    setUploading(true)

    const formData = new FormData()
    formData.append('imageCourse', selectedFile)

    const result = await uploadViewModel.uploadCoursePhoto(formData)

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
    setIsSend(true)

    try {
      let urlToSave = urlPhotoUploaded ? urlPhotoUploaded : ''

      if (!urlPhotoUploaded) {
        // Primeiro, faz o upload da imagem
        const resUrl = await handleUploadPhoto()

        const { urlPhoto, msgUpload } = resUrl
        urlToSave = urlPhoto

        setUrlPhotoUploaded(urlPhoto)

        if (!urlPhoto) {
          showToast('error', msgUpload)
          setIsSend(false)
          return
        }
      }

      // Cria os dados para o admin
      const dataToSave: CourseInterface = {
        ...dataForm,
        image: urlToSave
      }

      // Tenta criar o admin com os dados salvos
      const resultSubmit = await CourseViewModel.create(dataToSave)

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

          <div className="w-full h-auto max-h-[90%] max-w-3xl flex flex-col items-center p-0  rounded-md overflow-y-auto bg-dark overflow-x-hidden scroll-smooth">
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

              <div className="w-full grid gap-6 md:grid-cols-1">
                <CustomInput
                  type="text"
                  htmlFor="name"
                  label="Nome do curso"
                  placeholder="Ex.: Desenvolvimento Web"
                  control={control}
                  error={errors.name}
                />
              </div>

              <div className="w-full grid gap-6 md:grid-cols-1">
                <TextAreaLabel
                  htmlFor="description"
                  label="Descrição"
                  placeholder="Ex.: Curso completo de Desenvolvimento Web com foco em HTML, CSS, JavaScript e frameworks modernos."
                  control={control}
                  error={errors.description}
                />
              </div>

              <div className="w-full grid gap-6 md:grid-cols-2">
                <CustomInput
                  type="number"
                  htmlFor="duration"
                  label="Duração em semanas"
                  placeholder="Ex.: 4"
                  control={control}
                  error={errors.duration}
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
