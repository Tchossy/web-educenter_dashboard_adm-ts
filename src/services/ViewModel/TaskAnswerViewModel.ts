import { TaskSubmissionInterface } from '../../interfaces/ITaskSubmissionInterface'
import { ApiResponse } from '../../interfaces/IApiResponse'
import ApiDAO from '../../modules/Api/Dao/ApiDAO'

class TaskAnswerViewModel {
  public async create(
    data: any
  ): Promise<ApiResponse<TaskSubmissionInterface | null>> {
    try {
      const response = await ApiDAO.post<
        ApiResponse<TaskSubmissionInterface | null>
      >('/task/answer/create', data)

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
  public async getAll(): Promise<
    ApiResponse<TaskSubmissionInterface[] | null>
  > {
    try {
      const response = await ApiDAO.get<
        ApiResponse<TaskSubmissionInterface[] | null>
      >(`/task/answer/get/all`)

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

  public async getAllByTermData(
    term: string
  ): Promise<ApiResponse<[TaskSubmissionInterface] | null>> {
    try {
      const response = await ApiDAO.get<
        ApiResponse<[TaskSubmissionInterface] | null>
      >(`/task/answer/search/all/${term}`)

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
  ): Promise<ApiResponse<TaskSubmissionInterface | null>> {
    try {
      const response = await ApiDAO.get<
        ApiResponse<TaskSubmissionInterface | null>
      >(`/task/answer/get/one/${id}`)

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
  public async getAllByTaskAndStudent(
    taskId: string,
    studentId: string
  ): Promise<ApiResponse<TaskSubmissionInterface[] | null>> {
    try {
      const response = await ApiDAO.get<
        ApiResponse<TaskSubmissionInterface[] | null>
      >(`/task/answer/get/all/by/task/student/${taskId}/${studentId}`)

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
  ): Promise<ApiResponse<TaskSubmissionInterface | null>> {
    try {
      const response = await ApiDAO.put<
        ApiResponse<TaskSubmissionInterface | null>
      >(`/task/answer/update/${id}`, data)

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
        `/task/answer/delete/${id}`
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

export default new TaskAnswerViewModel()
