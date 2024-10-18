import { MaterialInterface } from '../../interfaces/IMaterialInterface'
import { ApiResponse } from '../../interfaces/IApiResponse'
import ApiDAO from '../../modules/Api/Dao/ApiDAO'

class MaterialViewModel {
  public async create(
    data: any
  ): Promise<ApiResponse<MaterialInterface | null>> {
    try {
      const response = await ApiDAO.post<ApiResponse<MaterialInterface | null>>(
        '/material/create',
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
  public async getAll(): Promise<ApiResponse<MaterialInterface[] | null>> {
    try {
      const response = await ApiDAO.get<
        ApiResponse<MaterialInterface[] | null>
      >(`/material/get/all`)

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

  public async getAllByTermData(
    term: string
  ): Promise<ApiResponse<[MaterialInterface] | null>> {
    try {
      const response = await ApiDAO.get<
        ApiResponse<[MaterialInterface] | null>
      >(`/material/search/all/${term}`)

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
  ): Promise<ApiResponse<MaterialInterface | null>> {
    try {
      const response = await ApiDAO.get<ApiResponse<MaterialInterface | null>>(
        `/material/get/one/${id}`
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
  ): Promise<ApiResponse<MaterialInterface | null>> {
    try {
      const response = await ApiDAO.put<ApiResponse<MaterialInterface | null>>(
        `/material/update/${id}`,
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
        `/material/delete/${id}`
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

export default new MaterialViewModel()
