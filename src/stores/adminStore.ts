import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { AdminInterface } from '../interfaces/IAdmin'

interface AdminState {
  currentAdminData: AdminInterface | null
  addAdmin: (admin: AdminInterface) => void
  removeAdmin: () => void
}

export const useAdminStore = create<AdminState>()(
  devtools(
    persist(
      set => ({
        currentAdminData: null,

        addAdmin: admin => {
          set({ currentAdminData: admin })
        },
        removeAdmin: () => {
          set(() => ({ currentAdminData: null }))
        }
      }),
      {
        name: 'admin-data-storage'
      }
    )
  )
)
