import { useState } from 'react'
import UploadViewModel from '../services/ViewModel/uploadViewModel'

interface UseUploadReturn {
  uploading: boolean
  uploadError: boolean
  uploadResponse: string
  resUrl: string | null
  handleUploadAdminPhoto: (data: any) => Promise<void>
}

export const useUpload = (): UseUploadReturn => {
  const [uploading, setUploading] = useState<boolean>(false)
  const [uploadError, setUploadError] = useState<boolean>(false)
  const [uploadResponse, setUploadResponse] = useState<string>('')
  const [resUrl, setResUrl] = useState<string | null>(null)

  const handleUploadAdminPhoto = async (file: any) => {
    setUploading(true)

    const formData = new FormData()
    formData.append('imageAdmin', file)

    try {
      const result = await UploadViewModel.uploadAdminPhoto(formData)

      if (result.error) {
        setUploadError(result.error)
      } else {
        setUploadError(result.error)
        setResUrl(result.data as string)
      }
      setUploadResponse(result.msg)
    } catch (err: any) {
      setUploadError(true)
      setUploadResponse(`An unexpected error occurred ${err}`)
    } finally {
      setUploading(false)
    }
  }

  return {
    uploading,
    uploadError,
    uploadResponse,
    resUrl,
    handleUploadAdminPhoto
  }
}
