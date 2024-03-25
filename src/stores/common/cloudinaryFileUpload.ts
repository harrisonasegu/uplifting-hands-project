import axios from 'axios'
import { defineStore } from 'pinia'
import { cloudinaryBaseUrl } from '@/api/cloudinary-config'

import { useResponseMessageStore } from '@/stores/common/responseMessage'

const { updateResponse } = useResponseMessageStore()

export const useCloudinaryFileUploadStore = defineStore('cloudinaryFileUpload', () => {  
  // state
  const url: string = cloudinaryBaseUrl

  // actions
  const UploadApplicantProfilePhoto = async (payload: any) => {
    return await axios.post(url, payload)
      .then(response => {
        const responseData = response.data

        return responseData
      })
      .catch(error => {
        const errorMessage = error.message
        // update notification
        updateResponse('File Upload', 'error', errorMessage)

        return error
      })
  }

  return {
    UploadApplicantProfilePhoto
  }
})
