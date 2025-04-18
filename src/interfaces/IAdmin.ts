import { GenderType } from '../types/enum'

export interface AdminInterface {
  id?: string
  photo?: string
  first_name: string
  last_name: string
  phone: string
  email: string
  gender?: GenderType
  status: string
  password?: string
  date_create?: string
  date_update?: string
}
