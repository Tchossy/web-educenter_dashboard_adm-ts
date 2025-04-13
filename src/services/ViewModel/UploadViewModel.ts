import { ApiResponse } from '../../interfaces/IApiResponse'
import ApiDAO from '../../modules/Api/Dao/ApiDAO'

class UploadViewModel {
  public async uploadAdminPhoto(
    formData: FormData
  ): Promise<ApiResponse<string | null>> {
    try {
      const response = await ApiDAO.post<ApiResponse<string | null>>(
        '/upload/image/admin',
        formData
      )

      if (response.error) {
        return {
          error: true,
          msg: response.msg || 'Error uploading photo',
          url: null
        }
      }

      return {
        error: false,
        msg: 'Photo uploaded successfully',
        url: response.url
      }
    } catch (error: any) {
      return {
        error: true,
        msg: error.message,
        url: null
      }
    }
  }
  public async uploadProfessorPhoto(
    formData: FormData
  ): Promise<ApiResponse<string | null>> {
    try {
      const response = await ApiDAO.post<ApiResponse<string | null>>(
        '/upload/image/professor',
        formData
      )

      if (response.error) {
        return {
          error: true,
          msg: response.msg || 'Error uploading photo',
          url: null
        }
      }

      return {
        error: false,
        msg: 'Photo uploaded successfully',
        url: response.url
      }
    } catch (error: any) {
      return {
        error: true,
        msg: error.message,
        url: null
      }
    }
  }
  public async uploadStudentPhoto(
    formData: FormData
  ): Promise<ApiResponse<string | null>> {
    try {
      const response = await ApiDAO.post<ApiResponse<string | null>>(
        '/upload/image/student',
        formData
      )

      if (response.error) {
        return {
          error: true,
          msg: response.msg || 'Error uploading photo',
          url: null
        }
      }

      return {
        error: false,
        msg: 'Photo uploaded successfully',
        url: response.url
      }
    } catch (error: any) {
      return {
        error: true,
        msg: error.message,
        url: null
      }
    }
  }
  public async uploadCoursePhoto(
    formData: FormData
  ): Promise<ApiResponse<string | null>> {
    try {
      const response = await ApiDAO.post<ApiResponse<string | null>>(
        '/upload/image/course',
        formData
      )

      if (response.error) {
        return {
          error: true,
          msg: response.msg || 'Error uploading photo',
          url: null
        }
      }

      return {
        error: false,
        msg: 'Photo uploaded successfully',
        url: response.url
      }
    } catch (error: any) {
      return {
        error: true,
        msg: error.message,
        url: null
      }
    }
  }
  public async uploadTaskImage(
    formData: FormData
  ): Promise<ApiResponse<string | null>> {
    try {
      const response = await ApiDAO.post<ApiResponse<string | null>>(
        '/upload/image/task',
        formData
      )

      if (response.error) {
        return {
          error: true,
          msg: response.msg || 'Error uploading image',
          url: null
        }
      }

      return {
        error: false,
        msg: 'Image uploaded successfully',
        url: response.url
      }
    } catch (error: any) {
      return {
        error: true,
        msg: error.message,
        url: null
      }
    }
  }
  public async uploadQuestionImage(
    formData: FormData
  ): Promise<ApiResponse<string | null>> {
    try {
      const response = await ApiDAO.post<ApiResponse<string | null>>(
        '/upload/image/question',
        formData
      )

      if (response.error) {
        return {
          error: true,
          msg: response.msg || 'Error uploading image',
          url: null
        }
      }

      return {
        error: false,
        msg: 'Image uploaded successfully',
        url: response.url
      }
    } catch (error: any) {
      return {
        error: true,
        msg: error.message,
        url: null
      }
    }
  }
  public async uploadMaterialPdf(
    formData: FormData
  ): Promise<ApiResponse<string | null>> {
    try {
      const response = await ApiDAO.post<ApiResponse<string | null>>(
        '/upload/pdf/material',
        formData
      )

      if (response.error) {
        return {
          error: true,
          msg: response.msg || 'Error uploading material',
          url: null
        }
      }

      return {
        error: false,
        msg: 'Material uploaded successfully',
        url: response.url
      }
    } catch (error: any) {
      return {
        error: true,
        msg: error.message,
        url: null
      }
    }
  }
  public async uploadTaskInstructionPdf(
    formData: FormData
  ): Promise<ApiResponse<string | null>> {
    try {
      const response = await ApiDAO.post<ApiResponse<string | null>>(
        '/upload/pdf/task/instruction',
        formData
      )

      if (response.error) {
        return {
          error: true,
          msg: response.msg || 'Error uploading instruction',
          url: null
        }
      }

      return {
        error: false,
        msg: 'Instruction uploaded successfully',
        url: response.url
      }
    } catch (error: any) {
      return {
        error: true,
        msg: error.message,
        url: null
      }
    }
  }
  public async uploadMaterialVideo(
    formData: FormData
  ): Promise<ApiResponse<string | null>> {
    try {
      const response = await ApiDAO.post<ApiResponse<string | null>>(
        '/upload/video/material',
        formData
      )

      if (response.error) {
        return {
          error: true,
          msg: response.msg || 'Error uploading material',
          url: null
        }
      }

      return {
        error: false,
        msg: 'Material uploaded successfully',
        url: response.url
      }
    } catch (error: any) {
      return {
        error: true,
        msg: error.message,
        url: null
      }
    }
  }
}

export default new UploadViewModel()
