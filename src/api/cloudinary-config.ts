import { Cloudinary } from '@cloudinary/url-gen'

export const cloudName = import.meta.env.VITE_CLOUD_NAME as string
export const cloudinaryUnsignedUploadPreset = import.meta.env.VITE_CLOUDINARY_UNSIGNED_UPLOAD_PRESET as string
export const cloudinaryUserProfilePhotoUploadFolder = import.meta.env.VITE_CLOUDINARY_USER_PROFILE_PHOTO_UPLOAD_FOLDER as string
export const cloudinaryApplicantSchoolFormDocumentUploadFolder = import.meta.env.VITE_CLOUDINARY_APPLICANT_SCHOOL_FORM_DOCUMENT_UPLOAD_FOLDER as string
export const cloudinaryApplicantSchoolFeeDocumentUploadFolder = import.meta.env.VITE_CLOUDINARY_APPLICANT_SCHOOL_FEE_DOCUMENT_UPLOAD_FOLDER as string
export const cloudinaryBaseUrl = import.meta.env.VITE_CLOUDINARY_API_BASE_URL as string

export const cloudinary_ = new Cloudinary({
  cloud: {
    cloudName
  }
})
