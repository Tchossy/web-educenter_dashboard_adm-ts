import axios, { AxiosResponse } from 'axios'
import { ApiDFCenter } from '../api.dfcenter'
// import { ApiDFCenter } from '../api.dfcenter'

class ApiDAO {
  private baseUrl: string

  constructor() {
    // this.baseUrl = 'http://localhost:8000' // Defina a URL base da API
    this.baseUrl = ApiDFCenter // Defina a URL base da API
  }

  private async request<T>(
    method: string,
    url: string,
    data?: any
  ): Promise<T> {
    try {
      const response: AxiosResponse<T> = await axios({
        method,
        url: `${this.baseUrl}${url}`,
        data
      })
      return response.data
    } catch (error: any) {
      if (error.response) {
        // A resposta foi recebida, mas o servidor retornou um erro
        throw new Error(error.response.data?.msg || 'Unknown error')
      } else if (error.request) {
        // A requisição foi feita, mas não houve resposta
        throw new Error('No response from server')
      } else {
        // Algo aconteceu ao configurar a requisição
        throw new Error('Error in request setup')
      }
    }
  }

  public async get<T>(url: string): Promise<T> {
    return this.request<T>('GET', url)
  }

  public async post<T>(url: string, data: any): Promise<T> {
    return this.request<T>('POST', url, data)
  }

  public async put<T>(url: string, data: any): Promise<T> {
    return this.request<T>('PUT', url, data)
  }

  public async delete<T>(url: string): Promise<T> {
    return this.request<T>('DELETE', url)
  }
}

export default new ApiDAO()
