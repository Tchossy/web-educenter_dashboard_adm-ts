import { WeeklyAverageInterface } from '../../interfaces/IWeeklyAverageInterface'
import { ApiResponse } from '../../interfaces/IApiResponse'
import ApiDAO from '../../modules/Api/Dao/ApiDAO'

class WeeklyAverageViewModel {
  public async create(
    data: any
  ): Promise<ApiResponse<WeeklyAverageInterface | null>> {
    try {
      const response = await ApiDAO.post<
        ApiResponse<WeeklyAverageInterface | null>
      >('/weekly/average/create', data)

      if (response.error) {
        return {
          error: true,
          msg: response.msg || 'Unknown error occurred',
          data: null
        }
      }

      return {
        error: false,
        msg: response.msg || 'Student created successfully',
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

  public async getAll(): Promise<ApiResponse<WeeklyAverageInterface[] | null>> {
    try {
      const response = await ApiDAO.get<
        ApiResponse<WeeklyAverageInterface[] | null>
      >(`/weekly/average/get/all`)

      if (response.error) {
        return {
          error: true,
          msg: response.msg || 'Unknown error occurred',
          data: null
        }
      }

      return {
        error: false,
        msg: response.msg || 'Student retrieved successfully',
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
  ): Promise<ApiResponse<[WeeklyAverageInterface] | null>> {
    try {
      const response = await ApiDAO.get<
        ApiResponse<[WeeklyAverageInterface] | null>
      >(`/weekly/average/search/all/${term}`)

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

  public async getAllByStudent(
    id: string
  ): Promise<ApiResponse<[WeeklyAverageInterface] | null>> {
    try {
      const response = await ApiDAO.get<
        ApiResponse<[WeeklyAverageInterface] | null>
      >(`/weekly/average/get/all/by/student/${id}`)

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
  ): Promise<ApiResponse<WeeklyAverageInterface | null>> {
    try {
      const response = await ApiDAO.get<
        ApiResponse<WeeklyAverageInterface | null>
      >(`/weekly/average/get/one/${id}`)

      if (response.error) {
        return {
          error: true,
          msg: response.msg || 'Unknown error occurred',
          data: null
        }
      }

      return {
        error: false,
        msg: response.msg || 'Student retrieved successfully',
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
  ): Promise<ApiResponse<WeeklyAverageInterface | null>> {
    try {
      const response = await ApiDAO.put<
        ApiResponse<WeeklyAverageInterface | null>
      >(`/weekly/average/update/${id}`, data)

      console.log('==============')
      console.log(response)

      if (response.error) {
        return {
          error: true,
          msg: response.msg || 'Unknown error occurred',
          data: null
        }
      }

      return {
        error: false,
        msg: response.msg || 'Student updated successfully',
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
        `/weekly/average/delete/${id}`
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
        msg: response.msg || 'Student deleted successfully',
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

export default new WeeklyAverageViewModel()
