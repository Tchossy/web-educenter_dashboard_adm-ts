// Lib
import Modal from 'react-modal'
import { X } from 'lucide-react'

// Form
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// Component
import { CustomInput } from '../../input/InputLabel'

// Data
import { genderOptions, statusOptions } from '../../../data/selectOption'

// Style
import { customStylesModalCenter } from '../../../styles/custom/modals'
import { SelectCustomZod } from '../../selects/SelectCustomZod'

// interface
import { modalSeeType } from '../../../types/modal'

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
  phone: z
    .string()
    .refine(value => /^\+?[0-9]+$/g.test(value), {
      message: 'Formato de número invalido'
    })
    .refine(value => value, {
      message: 'Por favor, preencha este campo.'
    }),
  email: z
    .string({
      required_error: 'O email é obrigatório!'
    })
    .email('Formato de email invalido')
    .toLowerCase()
    .trim(),
  status: z.string().refine(
    value => {
      return value === 'active' || value === 'inactive'
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
  password: z.string().trim(),
  confirm_password: z.string().trim()
})

type formType = z.infer<typeof formSchema>

export function ModalSeeProfessor({
  baseInfo,
  modalSeeRowIsOpen,
  setModalSeeRowIsOpen
}: modalSeeType) {
  // Photo
  const imagesSelect = baseInfo.photo as string

  // Const
  const namePageSingular = 'professor'

  const initialValues: any = {
    first_name: baseInfo.first_name,
    last_name: baseInfo.last_name,
    phone: baseInfo.phone,
    email: baseInfo.email,
    status: baseInfo.status,
    gender: baseInfo.gender
  }

  // Form Zod
  const {
    control,
    formState: { errors }
  } = useForm<formType>({
    defaultValues: initialValues,
    resolver: zodResolver(formSchema)
  })

  // Modal
  function closeModal() {
    setModalSeeRowIsOpen(false)
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  return (
    <>
      <Modal
        isOpen={modalSeeRowIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        ariaHideApp={false}
        style={customStylesModalCenter}
        contentLabel="Example Modal"
      >
        <div className="w-full h-full flex items-center justify-center ">
          <div className="w-full h-auto max-h-[85%] max-w-3xl flex flex-col items-center p-0  rounded-md overflow-y-auto bg-dark overflow-x-hidden scroll-smooth">
            <div className="w-full py-4 px-5 flex flex-row justify-between items-center border-b-[1px] border-gray-600 ">
              <p className="text-xl font-medium text-light">
                Detalhes do {namePageSingular}
              </p>

              <button
                onClick={closeModal}
                className="py-2 px-2 rounded-lg text-light hover:bg-gray-300/20 dark:hover:bg-gray-500/20 active:bg-gray-300 active:text-dark flex flex-row items-center justify-center gap-4 transition-all duration-300"
              >
                <X size={20} />
              </button>
            </div>

            <form className="w-full p-6 flex flex-col justify-center items-center gap-6">
              <div className="w-full flex flex-col items-start justify-start">
                <div className="w-full max-w-[14rem] flex items-start justify-start ">
                  <label className="w-full h-40 flex flex-col items-center justify-center border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-70 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-800 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 transition-all duration-300 relative overflow-hidden">
                    {imagesSelect && (
                      <img
                        className=" w-full h-full object-cover absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-300"
                        src={imagesSelect}
                        alt="Rafael Pilartes"
                      />
                    )}
                  </label>
                </div>
              </div>

              <div className="w-full grid gap-6 md:grid-cols-2">
                <CustomInput
                  isDisabled={true}
                  type="text"
                  htmlFor="first_name"
                  label="Primeiro nome"
                  placeholder="Ex.: Rafael"
                  control={control}
                  error={errors.first_name}
                />
                <CustomInput
                  isDisabled={true}
                  type="text"
                  htmlFor="last_name"
                  label="Ultimo nome"
                  placeholder="Ex.: Pilartes"
                  control={control}
                  error={errors.last_name}
                />
              </div>

              <div className="w-full grid gap-6 md:grid-cols-2">
                <CustomInput
                  isDisabled={true}
                  type="phone"
                  htmlFor="phone"
                  label="Phone number"
                  placeholder="Ex.: 923414621"
                  control={control}
                  error={errors.phone}
                />
                <CustomInput
                  isDisabled={true}
                  type="email"
                  htmlFor="email"
                  label="Email address"
                  placeholder="Ex.: geral@rafaelpilartes.com"
                  control={control}
                  error={errors.email}
                />
              </div>
              <div className="w-full grid gap-6 md:grid-cols-2">
                <SelectCustomZod
                  isDisabled={true}
                  name="gender"
                  label="Genero"
                  control={control}
                  error={errors.gender}
                  options={genderOptions}
                  onOptionChange={() => null}
                />
                <SelectCustomZod
                  isDisabled={true}
                  name="status"
                  label="Status"
                  control={control}
                  error={errors.status}
                  options={statusOptions}
                  onOptionChange={() => null}
                />
              </div>

              <div className="w-full pt-4 flex flex-row justify-between items-center border-t-[1px] border-gray-600 ">
                <button
                  onClick={closeModal}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Fechar
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </>
  )
}
