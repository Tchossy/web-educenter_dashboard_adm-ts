import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { CandidacyInterface } from '../interfaces/ICandidacy'

interface CandidacyState {
  currentEmployeeData: CandidacyInterface | null
  addEmployee: (employee: CandidacyInterface) => void
  removeEmployee: () => void
}
interface EmployeesSecretKeysStoreState {
  employeesSecretKeys: CandidacyInterface[]
  addEmployeeSecretKey: (employeeKeys: CandidacyInterface) => void
  removeEmployeeSecretKey: (employeeEmail: string) => void
  clearSecretKeys: () => void
}

export const useEmployeeStore = create<CandidacyState>()(
  devtools(
    persist(
      set => ({
        currentEmployeeData: null,

        addEmployee: employee => {
          set(state => ({ currentEmployeeData: employee }))
        },
        removeEmployee: () => {
          set(() => ({ currentEmployeeData: null }))
        }
      }),
      {
        name: 'employee-data-storage'
      }
    )
  )
)

export const useEmployeesSecretKeysStore =
  create<EmployeesSecretKeysStoreState>()(
    devtools(
      persist(
        set => ({
          employeesSecretKeys: [],

          addEmployeeSecretKey: employeeKeys => {
            set(state => ({
              employeesSecretKeys: [...state.employeesSecretKeys, employeeKeys]
            }))
          },
          removeEmployeeSecretKey: employeeEmail => {
            set(state => ({
              employeesSecretKeys: state.employeesSecretKeys.filter(
                employee => employee.email !== employeeEmail
              )
            }))
          },

          clearSecretKeys: () => {
            set(() => ({ employeesSecretKeys: [] }))
          }
        }),
        {
          name: 'employees-secret-keys-storage'
        }
      )
    )
  )
