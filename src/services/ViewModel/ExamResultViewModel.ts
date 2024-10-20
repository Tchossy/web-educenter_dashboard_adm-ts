import { ExamResultInterface } from '../../interfaces/IExamResultInterface'
import { ApiResponse } from '../../interfaces/IApiResponse'
import ApiDAO from '../../modules/Api/Dao/ApiDAO'

class ExamResultViewModel {
  public async create(
    data: any
  ): Promise<ApiResponse<ExamResultInterface | null>> {
    try {
      const response = await ApiDAO.post<
        ApiResponse<ExamResultInterface | null>
      >('/exam/result/create', data)

      if (response.error) {
        return {
          error: true,
          msg: response.msg || 'Unknown error occurred',
          data: null
        }
      }

      return {
        error: false,
        msg: response.msg || 'Result created successfully',
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
  public async getAll(): Promise<ApiResponse<ExamResultInterface[] | null>> {
    try {
      const response = await ApiDAO.get<
        ApiResponse<ExamResultInterface[] | null>
      >(`/exam/result/get/all`)

      if (response.error) {
        return {
          error: true,
          msg: response.msg || 'Unknown error occurred',
          data: null
        }
      }

      return {
        error: false,
        msg: response.msg || 'Result retrieved successfully',
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
  ): Promise<ApiResponse<ExamResultInterface[] | null>> {
    try {
      const response = await ApiDAO.get<
        ApiResponse<ExamResultInterface[] | null>
      >(`/exam/result/get/all/by/student/${id}`)

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
  ): Promise<ApiResponse<[ExamResultInterface] | null>> {
    try {
      const response = await ApiDAO.get<
        ApiResponse<[ExamResultInterface] | null>
      >(`/exam/result/search/all/${term}`)

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
  ): Promise<ApiResponse<ExamResultInterface | null>> {
    try {
      const response = await ApiDAO.get<
        ApiResponse<ExamResultInterface | null>
      >(`/exam/result/get/one/${id}`)

      if (response.error) {
        return {
          error: true,
          msg: response.msg || 'Unknown error occurred',
          data: null
        }
      }

      return {
        error: false,
        msg: response.msg || 'Result retrieved successfully',
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
  public async getByExamAndStudent(
    examId: string,
    studentId: string
  ): Promise<ApiResponse<ExamResultInterface | null>> {
    try {
      const response = await ApiDAO.get<
        ApiResponse<ExamResultInterface | null>
      >(`/exam/result/get/one/by/exam/student/${examId}/${studentId}`)

      if (response.error) {
        return {
          error: true,
          msg: response.msg || 'Unknown error occurred',
          data: null
        }
      }

      return {
        error: false,
        msg: response.msg || 'Result retrieved successfully',
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
  ): Promise<ApiResponse<ExamResultInterface | null>> {
    try {
      const response = await ApiDAO.put<
        ApiResponse<ExamResultInterface | null>
      >(`/exam/result/update/${id}`, data)

      if (response.error) {
        return {
          error: true,
          msg: response.msg || 'Unknown error occurred',
          data: null
        }
      }

      return {
        error: false,
        msg: response.msg || 'Result updated successfully',
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
        `/exam/result/delete/${id}`
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
        msg: response.msg || 'Result deleted successfully',
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

export default new ExamResultViewModel()
