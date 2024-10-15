import { AdminInterface } from '../../interfaces/IAdmin'
import { ApiResponse } from '../../interfaces/IApiResponse'
import ApiDAO from '../../modules/Api/Dao/ApiDAO'

class AdminViewModel {
  public async createAdmin(
    data: any
  ): Promise<ApiResponse<AdminInterface | null>> {
    try {
      const response = await ApiDAO.post<ApiResponse<AdminInterface | null>>(
        '/admin/create',
        data
      )

      if (response.error) {
        return {
          error: true,
          msg: response.msg || 'Unknown error occurred',
          data: null
        }
      }

      return {
        error: false,
        msg: response.msg || 'Admin created successfully',
        data: response.data
      }
    } catch (error: any) {
      return {
        error: true,
        msg: error.message,
        data: null
      }
    }
  }
  public async signInWithEmail(
    email: string,
    password: string
  ): Promise<ApiResponse<AdminInterface | null>> {
    const data = {
      email,
      password
    }

    try {
      const response = await ApiDAO.post<ApiResponse<AdminInterface | null>>(
        '/admin/login',
        data
      )

      if (response.error) {
        return {
          error: true,
          msg: response.msg || 'Unknown error occurred',
          data: null
        }
      }

      return {
        error: false,
        msg: response.msg || 'Admin created successfully',
        data: response.data
      }
    } catch (error: any) {
      return {
        error: true,
        msg: error.message,
        data: null
      }
    }
  }

  public async getAdmin(
    id: string
  ): Promise<ApiResponse<AdminInterface | null>> {
    try {
      const response = await ApiDAO.get<ApiResponse<AdminInterface | null>>(
        `/admin/get/one/${id}`
      )

      if (response.error) {
        return {
          error: true,
          msg: response.msg || 'Unknown error occurred',
          data: null
        }
      }

      return {
        error: false,
        msg: response.msg || 'Admin retrieved successfully',
        data: response.data
      }
    } catch (error: any) {
      return {
        error: true,
        msg: error.message,
        data: null
      }
    }
  }

  public async updateAdmin(
    id: string,
    data: any
  ): Promise<ApiResponse<AdminInterface | null>> {
    try {
      const response = await ApiDAO.put<ApiResponse<AdminInterface | null>>(
        `/admin/update/${id}`,
        data
      )

      if (response.error) {
        return {
          error: true,
          msg: response.msg || 'Unknown error occurred',
          data: null
        }
      }

      return {
        error: false,
        msg: response.msg || 'Admin updated successfully',
        data: response.data
      }
    } catch (error: any) {
      return {
        error: true,
        msg: error.message,
        data: null
      }
    }
  }

  public async deleteAdmin(id: string): Promise<ApiResponse<null>> {
    try {
      const response = await ApiDAO.delete<ApiResponse<null>>(
        `/admin/delete/${id}`
      )

      if (response.error) {
        return {
          error: true,
          msg: response.msg || 'Unknown error occurred',
          data: null
        }
      }

      return {
        error: false,
        msg: response.msg || 'Admin deleted successfully',
        data: null
      }
    } catch (error: any) {
      return {
        error: true,
        msg: error.message,
        data: null
      }
    }
  }
}

export default new AdminViewModel()
