import { OptionType } from '../types/option'

export const genderOptions: OptionType[] = [
  { value: 'male', label: 'Masculino' },
  { value: 'female', label: 'Feminino' }
]
export const statusOptions: OptionType[] = [
  { value: 'inactive', label: 'Inativo' },
  { value: 'active', label: 'Activo' }
]
export const materialTypeOptions: OptionType[] = [
  { value: 'video', label: 'Vídeo' },
  { value: 'pdf', label: 'Pdf' }
]
export const questionTypeOptions: OptionType[] = [
  { value: 'short_answer', label: 'Resposta Curta' },
  { value: 'multiple_choice', label: 'Múltipla Escolha' }
  // { value: 'image_upload', label: 'Upload de Imagem' }
]
export const trueFalseOptions: OptionType[] = [
  { value: 'true', label: 'Sim' },
  { value: 'false', label: 'Não' }
]
export const typeTaskOptions: OptionType[] = [
  { value: 'online', label: 'Resposta online' },
  { value: 'upload', label: 'Envio de arquivo' }
]