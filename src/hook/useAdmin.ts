import { useState } from 'react'
import AdminViewModel from '../services/ViewModel/AdminViewModel'
import { AdminInterface } from '../interfaces/IAdmin'

interface UseAdminReturn {
  loading: boolean
  error: boolean
  response: string
  resData: AdminInterface | null
  signInWithEmail: (email: string, password: string) => Promise<void>
  createAdmin: (data: any) => Promise<void>
  getAdmin: (id: string) => Promise<void>
  updateAdmin: (id: string, data: any) => Promise<void>
  deleteAdmin: (id: string) => Promise<void>
}

export const useAdmin = (): UseAdminReturn => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [resData, setResData] = useState<AdminInterface | null>(null)
  const [response, setResponse] = useState<string>('')

  const createAdmin = async (data: any) => {
    setLoading(true)
    try {
      const result = await AdminViewModel.createAdmin(data)
      if (result.error) {
        setError(result.error)
      } else {
        setError(result.error)
        setResData(result.data) // Se for sucesso, salvar os dados da resposta
      }
      setResponse(result.msg)
    } catch (err: any) {
      setError(true)
      setResponse('An unexpected error occurred')
    } finally {
      setLoading(false) // Quando a operação for concluída, remover o estado de carregamento
    }
  }

  const signInWithEmail = async (email: string, password: string) => {
    setLoading(true)

    try {
      const result = await AdminViewModel.signInWithEmail(email, password)
      if (result.error) {
        setError(result.error) // Se houver erro, definir a mensagem de erro
        setResData(null)
      } else {
        setError(result.error) // Se houver erro, definir a mensagem de erro
        setResData(result.data) // Se for sucesso, salvar os dados da resposta
      }
      console.log(`========= ${result.data}`)
      setResponse(result.msg) // Se houver erro, definir a mensagem de erro
    } catch (err: any) {
      setError(true)
      setResponse('An unexpected error occurred')
    } finally {
      setLoading(false) // Quando a operação for concluída, remover o estado de carregamento
    }
  }

  const getAdmin = async (id: string) => {
    setLoading(true)
    try {
      const result = await AdminViewModel.getAdmin(id)
      if (result.error) {
        setError(result.error)
        setResData(null)
      } else {
        setError(result.error)
        setResData(result.data)
      }
      setResponse(result.msg)
    } catch (err: any) {
      setResponse('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  const updateAdmin = async (id: string, data: any) => {
    setLoading(true)
    try {
      const result = await AdminViewModel.updateAdmin(id, data)
      if (result.error) {
        setError(result.error)
        setResData(null)
      } else {
        setError(result.error)
        setResData(result.data)
      }
      setResponse(result.msg)
    } catch (err: any) {
      setResponse('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  const deleteAdmin = async (id: string) => {
    setLoading(true)
    try {
      const result = await AdminViewModel.deleteAdmin(id)
      if (result.error) {
        setError(result.error)
        setResData(null)
      } else {
        setError(result.error)
        setResData(null) // Admin deletado, então resposta é null
      }
      setResponse(result.msg)
    } catch (err: any) {
      setResponse('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    error,
    response,
    resData,
    signInWithEmail,
    createAdmin,
    getAdmin,
    updateAdmin,
    deleteAdmin
  }
}
