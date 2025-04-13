import { TaskQuestionInterface } from '../../interfaces/ITaskQuestionInterface'
import { ApiResponse } from '../../interfaces/IApiResponse'
import ApiDAO from '../../modules/Api/Dao/ApiDAO'

class TaskQuestionViewModel {
  public async create(
    data: any
  ): Promise<ApiResponse<TaskQuestionInterface | null>> {
    try {
      const response = await ApiDAO.post<
        ApiResponse<TaskQuestionInterface | null>
      >('/task/question/create', data)

      if (response.error) {
        return {
          error: true,
          msg: response.msg || 'Unknown error occurred',
          data: null
        }
      }

      return {
        error: false,
        msg: response.msg || 'Question created successfully',
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
  public async getAll(): Promise<ApiResponse<TaskQuestionInterface[] | null>> {
    try {
      const response = await ApiDAO.get<
        ApiResponse<TaskQuestionInterface[] | null>
      >(`/task/question/get/all`)

      if (response.error) {
        return {
          error: true,
          msg: response.msg || 'Unknown error occurred',
          data: null
        }
      }

      return {
        error: false,
        msg: response.msg || 'Question retrieved successfully',
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
  ): Promise<ApiResponse<[TaskQuestionInterface] | null>> {
    try {
      const response = await ApiDAO.get<
        ApiResponse<[TaskQuestionInterface] | null>
      >(`/task/question/search/all/${term}`)

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
  ): Promise<ApiResponse<TaskQuestionInterface | null>> {
    try {
      const response = await ApiDAO.get<
        ApiResponse<TaskQuestionInterface | null>
      >(`/task/question/get/one/${id}`)

      if (response.error) {
        return {
          error: true,
          msg: response.msg || 'Unknown error occurred',
          data: null
        }
      }

      return {
        error: false,
        msg: response.msg || 'Question retrieved successfully',
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
  ): Promise<ApiResponse<TaskQuestionInterface | null>> {
    try {
      const response = await ApiDAO.put<
        ApiResponse<TaskQuestionInterface | null>
      >(`/task/question/update/${id}`, data)

      if (response.error) {
        return {
          error: true,
          msg: response.msg || 'Unknown error occurred',
          data: null
        }
      }

      return {
        error: false,
        msg: response.msg || 'Question updated successfully',
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
        `/task/question/delete/${id}`
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
        msg: response.msg || 'Question deleted successfully',
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

export default new TaskQuestionViewModel()
