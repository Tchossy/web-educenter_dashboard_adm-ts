import { useEffect, useState } from 'react'

// Lib
import Modal from 'react-modal'
import { Download, X } from 'lucide-react'

// Form
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// Component
import { CustomInput } from '../../input/InputLabel'

// Data
import { materialTypeOptions } from '../../../data/selectOption'

// Style
import { customStylesModalCenter } from '../../../styles/custom/modals'
import { SelectCustomZod } from '../../selects/SelectCustomZod'
import { modalEditeType } from '../../../types/modal'
import { TextAreaLabel } from '../../input/TextAreaLabelZod'
import { CourseInterface } from '../../../interfaces/ICourseInterface'
import { ModuleInterface } from '../../../interfaces/IModuleInterface'
import CourseViewModel from '../../../services/ViewModel/CourseViewModel'
import MaterialViewModel from '../../../services/ViewModel/MaterialViewModel'
import ModuleViewModel from '../../../services/ViewModel/ModuleViewModel'
import uploadViewModel from '../../../services/ViewModel/UploadViewModel'
import { OptionType } from '../../../types/option'
import { showToast } from '../../../utils/toasts'
import { MaterialInterface } from '../../../interfaces/IMaterialInterface'
import { ToastContainer } from 'react-toastify'
import { BeatLoader } from 'react-spinners'

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
  course_id: z.string({
    required_error: 'O Curso é obrigatória!'
  }),
  module_id: z.string({
    required_error: 'O Módulo é obrigatória!'
  }),
  material_type: z.string().refine(
    value => {
      return value != ''
    },
    {
      message: 'O tipo é obrigatória!'
    }
  )
})

type formType = z.infer<typeof formSchema>

export function ModalEditMaterial({
  baseInfo,
  handleUpdateListing,
  modalEditRowIsOpen,
  setModalEditRowIsOpen
}: modalEditeType<MaterialInterface>) {
  //  Loading
  const [isSend, setIsSend] = useState<boolean>(false)

  const [typeMaterial, setTypeMaterial] = useState<'video' | 'pdf' | ''>(
    baseInfo.material_type
  )

  const [rowsCourseData, setRowsCourseData] = useState<OptionType[]>([])
  const [rowsModuleData, setRowsModuleData] = useState<OptionType[]>([])

  // Pdf
  const [selectedPdfFile, setSelectedPdfFile] = useState<string>('')
  const [urlPdfUploaded, setUrlPdfUploaded] = useState<string | null>(null)
  // Video
  const [selectedVideoFile, setSelectedVideoFile] = useState<string>('')
  const [urlVideoUploaded, setUrlVideoUploaded] = useState<string | null>(null)

  // Const
  const namePageSingular = 'módulo'

  const initialValues: MaterialInterface = {
    name: baseInfo.name,
    description: baseInfo.description,
    course_id: baseInfo.course_id,
    module_id: baseInfo.module_id,
    file_url: baseInfo.file_url,
    material_type: baseInfo.material_type
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

  // PDF
  const onPdfChange = (e: any) => {
    const pdf = e.target.files[0]
    setSelectedPdfFile(pdf)
  }
  // Video
  const onVideoChange = (e: any) => {
    const video = e.target.files[0]
    setSelectedVideoFile(video)
  }

  // Handle Select
  const handleCourseChange = (course: string) => {
    console.log(`Selected course: ${course}`)
    fetchModuleData(course)
  }
  const handleModuleChange = (module: string) => {
    console.log(`Selected module: ${module}`)
  }
  const handleTypeMaterialChange = (type: 'video' | 'pdf' | '') => {
    setTypeMaterial(type)
  }

  // Function Upload
  async function handleUploadPdf(): Promise<{
    urlMaterial: string
    msgUpload: string
  }> {
    console.log('Uploading pdf...')

    const formData = new FormData()
    formData.append('pdfMaterial', selectedPdfFile)

    const result = await uploadViewModel.uploadMaterialPdf(formData)

    if (result.error) {
      throw new Error(result.msg)
    }

    const urlMaterial = result.url as string
    const msgUpload = result.msg as string
    return {
      urlMaterial,
      msgUpload
    }
  }
  async function handleUploadVideo(): Promise<{
    urlMaterial: string
    msgUpload: string
  }> {
    console.log('Uploading video...')

    const formData = new FormData()
    formData.append('videoMaterial', selectedVideoFile)

    const result = await uploadViewModel.uploadMaterialVideo(formData)

    if (result.error) {
      throw new Error(result.msg)
    }

    const urlMaterial = result.url as string
    const msgUpload = result.msg as string
    return {
      urlMaterial,
      msgUpload
    }
  }

  // Function Submit Form
  async function handleSubmitForm(dataForm: any) {
    setIsSend(true)

    try {
      let urlToSave = urlVideoUploaded
        ? urlVideoUploaded
        : urlPdfUploaded
        ? urlPdfUploaded
        : ''

      if (typeMaterial === 'video') {
        if (selectedVideoFile) {
          if (!urlVideoUploaded) {
            const resUrl = await handleUploadVideo()

            const { urlMaterial, msgUpload } = resUrl
            urlToSave = urlMaterial

            setUrlVideoUploaded(urlMaterial)

            if (!urlMaterial) {
              showToast('error', msgUpload)
              setIsSend(false)
              return
            }
          }
        }
      }

      if (typeMaterial === 'pdf') {
        if (selectedPdfFile) {
          if (!urlPdfUploaded) {
            const resUrl = await handleUploadPdf()

            const { urlMaterial, msgUpload } = resUrl
            urlToSave = urlMaterial

            setUrlPdfUploaded(urlMaterial)

            if (!urlMaterial) {
              showToast('error', msgUpload)
              setIsSend(false)
              return
            }
          }
        }
      }

      const dataToSave: CourseInterface = {
        ...dataForm,
        file_url: urlToSave
      }

      const resultSubmit = await MaterialViewModel.update(
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
    fetchModuleData(baseInfo.course_id)
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
              {typeMaterial === 'video' &&
                !selectedVideoFile &&
                baseInfo.material_type === 'video' && (
                  <video
                    controls
                    controlsList="nodownload"
                    className="w-full h-80 max-w-full border border-gray-200 rounded-lg dark:border-gray-700"
                  >
                    <source src={baseInfo.file_url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
              {typeMaterial === 'pdf' &&
                !selectedPdfFile &&
                baseInfo.material_type === 'pdf' && (
                  <div className="w-full">
                    <a
                      href={baseInfo.file_url}
                      className={`w-[11rem] px-4 py-2 rounded-lg text-white text-sm  flex flex-row items-center justify-center gap-2 transition-all duration-300 bg-blue-500 hover:bg-blue-600 active:bg-blue-900`}
                    >
                      <Download size={20} />
                      Baixar material
                    </a>
                  </div>
                )}

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
                  onOptionChange={handleCourseChange}
                />
                <SelectCustomZod
                  name="module_id"
                  label="Módulo"
                  control={control}
                  error={errors.module_id}
                  options={rowsModuleData}
                  onOptionChange={handleModuleChange}
                />
              </div>

              <div className="w-full grid gap-6 md:grid-cols-2">
                <SelectCustomZod
                  name="material_type"
                  label="Tipo de material"
                  control={control}
                  error={errors.material_type}
                  options={materialTypeOptions}
                  onOptionChange={e => handleTypeMaterialChange(e as any)}
                />
              </div>

              {typeMaterial == 'pdf' && (
                <div className="w-full grid gap-6 md:grid-cols-1">
                  <div className="h-full">
                    <label
                      className="block mb-2 text-sm font-medium text-light"
                      htmlFor="file_input"
                    >
                      Pdf do Material
                    </label>
                    <input
                      id="file_input"
                      type="file"
                      accept="application/pdf"
                      onChange={onPdfChange}
                      className="w-full bg-gray-700/60 border border-gray-500/60 text-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block"
                    />
                    <p
                      className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                      id="file_input_help"
                    >
                      PDF (MAX. 10MB).
                    </p>
                  </div>
                </div>
              )}
              {typeMaterial == 'video' && (
                <div className="w-full grid gap-6 md:grid-cols-1">
                  <div className="h-full">
                    <label
                      className="block mb-2 text-sm font-medium text-light"
                      htmlFor="file_input"
                    >
                      Material em video
                    </label>
                    <input
                      id="file_input"
                      type="file"
                      accept="file"
                      onChange={onVideoChange}
                      className="w-full bg-gray-700/60 border border-gray-500/60 text-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block"
                    />
                    <p
                      className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                      id="file_input_help"
                    >
                      Video (MAX. 100MB).
                    </p>
                  </div>
                </div>
              )}

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
