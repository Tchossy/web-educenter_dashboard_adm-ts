import { CourseInterface } from '../../interfaces/ICourseInterface'
import { ApiResponse } from '../../interfaces/IApiResponse'
import ApiDAO from '../../modules/Api/Dao/ApiDAO'

class CourseViewModel {
  public async create(data: any): Promise<ApiResponse<CourseInterface | null>> {
    try {
      const response = await ApiDAO.post<ApiResponse<CourseInterface | null>>(
        '/course/create',
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

  public async getAll(): Promise<ApiResponse<CourseInterface[] | null>> {
    try {
      const response = await ApiDAO.get<ApiResponse<CourseInterface[] | null>>(
        `/course/get/all`
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

  public async getAllByTermData(
    term: string
  ): Promise<ApiResponse<[CourseInterface] | null>> {
    try {
      const response = await ApiDAO.get<ApiResponse<[CourseInterface] | null>>(
        `/course/search/all/${term}`
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
  ): Promise<ApiResponse<CourseInterface | null>> {
    try {
      const response = await ApiDAO.get<ApiResponse<CourseInterface | null>>(
        `/course/get/one/${id}`
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
  ): Promise<ApiResponse<CourseInterface | null>> {
    try {
      const response = await ApiDAO.put<ApiResponse<CourseInterface | null>>(
        `/course/update/${id}`,
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
        `/course/delete/${id}`
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

export default new CourseViewModel()
