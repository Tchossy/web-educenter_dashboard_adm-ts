import { ModuleInterface } from '../../interfaces/IModuleInterface'
import { ApiResponse } from '../../interfaces/IApiResponse'
import ApiDAO from '../../modules/Api/Dao/ApiDAO'

class ModuleViewModel {
  public async create(data: any): Promise<ApiResponse<ModuleInterface | null>> {
    try {
      const response = await ApiDAO.post<ApiResponse<ModuleInterface | null>>(
        '/module/create',
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
        msg: response.msg || 'Professor created successfully',
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

  public async getAll(): Promise<ApiResponse<ModuleInterface[] | null>> {
    try {
      const response = await ApiDAO.get<ApiResponse<ModuleInterface[] | null>>(
        `/module/get/all`
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
        msg: response.msg || 'Professor retrieved successfully',
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

  public async getAllByCourse(
    id: string
  ): Promise<ApiResponse<[ModuleInterface] | null>> {
    try {
      const response = await ApiDAO.get<ApiResponse<[ModuleInterface] | null>>(
        `/module/get/all/by/course/${id}`
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
        msg: response.msg,
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

  public async getAllByTermData(
    term: string
  ): Promise<ApiResponse<[ModuleInterface] | null>> {
    try {
      const response = await ApiDAO.get<ApiResponse<[ModuleInterface] | null>>(
        `/module/search/all/${term}`
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
        msg: response.msg,
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

  public async getOne(
    id: string
  ): Promise<ApiResponse<ModuleInterface | null>> {
    try {
      const response = await ApiDAO.get<ApiResponse<ModuleInterface | null>>(
        `/module/get/one/${id}`
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
        msg: response.msg || 'Professor retrieved successfully',
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

  public async update(
    id: string,
    data: any
  ): Promise<ApiResponse<ModuleInterface | null>> {
    try {
      const response = await ApiDAO.put<ApiResponse<ModuleInterface | null>>(
        `/module/update/${id}`,
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
        msg: response.msg || 'Professor updated successfully',
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

  public async delete(id: string): Promise<ApiResponse<null>> {
    try {
      const response = await ApiDAO.delete<ApiResponse<null>>(
        `/module/delete/${id}`
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
        msg: response.msg || 'Professor deleted successfully',
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

export default new ModuleViewModel()
