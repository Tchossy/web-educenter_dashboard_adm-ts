import { useState } from 'react'

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
import { materialTypeOptions, statusOptions } from '../../../data/selectOption'

// Style
import { customStylesModalCenter } from '../../../styles/custom/modals'
import { SelectCustomZod } from '../../selects/SelectCustomZod'

// interface
import { modalSeeType } from '../../../types/modal'
import { TextAreaLabel } from '../../input/TextAreaLabelZod'

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
  module_id: z.string().refine(
    value => {
      return value != ''
    },
    {
      message: 'O Módulo é obrigatória!'
    }
  ),
  material_type: z.string().refine(
    value => {
      return value != ''
    },
    {
      message: 'O tipo é obrigatória!'
    }
  ),
  file_url: z
    .string({
      required_error: 'A URL do arquivo é obrigatória!'
    })
    .url('Formato de URL inválido')
})

type formType = z.infer<typeof formSchema>

export function ModalSeeMaterial({
  baseInfo,
  modalSeeRowIsOpen,
  setModalSeeRowIsOpen
}: modalSeeType) {
  // Const
  const namePageSingular = 'módulo'

  const initialValues: any = {
    name: baseInfo.name,
    description: baseInfo.description,
    duration: baseInfo.duration,
    state: baseInfo.state,
    status: baseInfo.status
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
                  options={statusOptions}
                  onOptionChange={() => {
                    null
                  }}
                />
                <SelectCustomZod
                  name="module_id"
                  label="Módulo"
                  control={control}
                  error={errors.module_id}
                  options={statusOptions}
                  onOptionChange={() => {
                    null
                  }}
                />
              </div>

              <div className="w-full grid gap-6 md:grid-cols-2">
                <SelectCustomZod
                  name="material_type"
                  label="Tipo de material"
                  control={control}
                  error={errors.material_type}
                  options={materialTypeOptions}
                  onOptionChange={() => {
                    null
                  }}
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
