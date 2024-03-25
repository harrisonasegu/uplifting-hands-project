import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { request } from '@/api/api-config'

import type {
  Gender_Interface,
  MaritalStatus_Interface,
  State_Interface,
  InstitutionType_Interface,
  Institution_Interface,
  InstitutionSemester_Interface,
  EnrolmentType_Interface,
  Channel_Interface,
  ApplicationStatus_Interface,
  UserRoles_Interface,
  MakeDonation_Interface
} from '@/interface/systemUtils'

import { useAuthenticationStore } from '@/stores/modules/authentication'
import { useResponseMessageStore } from '@/stores/common/responseMessage'

const { getUser, Unauthorized } = useAuthenticationStore()
const { updateResponse } = useResponseMessageStore()

export const useSystemUtilsStore = defineStore('systemUtils', () => {
  // state
  const gender = ref<Gender_Interface[]>([])
  const maritalStatus = ref<MaritalStatus_Interface[]>([])
  const stateOfOrigin = ref<State_Interface[]>([])
  // -----------------------------------------------------
  const institutionType = ref<InstitutionType_Interface[]>([])
  const institutions = ref<Institution_Interface[]>([])
  const institutionSemester = ref<InstitutionSemester_Interface[]>([])
  const enrolmentType = ref<EnrolmentType_Interface[]>([])
  const channel = ref<Channel_Interface[]>([])
  const userRoles = ref<UserRoles_Interface[]>([])
  const applicationStatus = ref<ApplicationStatus_Interface[]>([])

  // getters
  const getGender = computed(() => gender.value)
  const getMaritalStatus = computed(() => maritalStatus.value)
  const getStateOfOrigin = computed(() => stateOfOrigin.value)
  // -----------------------------------------------------
  const getInstitutionType = computed(() => institutionType.value)
  const getInstitutions = computed(() => institutions.value)
  const getInstitutionSemester = computed(() => institutionSemester.value)
  const getEnrolmentType = computed(() => enrolmentType.value)
  const getChannel = computed(() => channel.value)
  const getUserRoles = computed(() => userRoles)
  const getApplicationStatus = computed(() => applicationStatus.value)

  // actions
  async function MakeDonation(payload: MakeDonation_Interface) {
    return await request.post('SystemUtils/MakeDonation', payload)
      .then(response => {
        const responseData = response.data
        const { responseCode, responseMessage } = responseData

        switch (responseCode) {
          // successful logout
          case '00':
            // update notification
            updateResponse('Donation', 'success', responseMessage)
            break

          default:
            // update notification
            updateResponse('Donation', 'error', responseMessage)
            break
        }

        return responseData
      })
      .catch(error => {
        // unauthorized
        const errorCode = error.response.status
        const errorMessage = error.message

        if (errorCode === 401) {
          Unauthorized(getUser.value?.email, errorMessage)
        } else {
          // update notification
          updateResponse('Donation', 'error', error.message)
        }
      })
  }

  async function GetGender() {
    return await request.get('SystemUtils/GetGender')
      .then(response => {
        const responseData = response.data
        const { responseCode, responseMessage } = responseData

        switch (responseCode) {
          case '00':
            gender.value = responseData.data
            break

          default:
            // update notification
            updateResponse('System Utils', 'error', responseMessage)
            break
        }

        return responseData
      })
      .catch(error => {
        // unauthorized
        const errorCode = error.response.status
        const errorMessage = error.message

        if (errorCode === 401) {
          Unauthorized(getUser.email, errorMessage)
        } else {
          // update products
          updateResponse('System Utils', 'error', error.message)
        }
      })
  }

  async function GetMaritalStatus() {
    return await request.get('SystemUtils/GetMaritalStatus')
      .then(response => {
        const responseData = response.data
        const { responseCode, responseMessage } = responseData

        switch (responseCode) {
          case '00':
            maritalStatus.value = responseData.data
            break

          default:
            // update notification
            updateResponse('System Utils', 'error', responseMessage)
            break
        }

        return responseData
      })
      .catch(error => {
        // unauthorized
        const errorCode = error.response.status
        const errorMessage = error.message

        if (errorCode === 401) {
          Unauthorized(getUser.email, errorMessage)
        } else {
          // update products
          updateResponse('System Utils', 'error', error.message)
        }
      })
  }

  async function GetStateOfOrigin() {
    return await request.get('SystemUtils/GetStateOfOrigin')
      .then(response => {
        const responseData = response.data
        const { responseCode, responseMessage } = responseData

        switch (responseCode) {
          case '00':
            stateOfOrigin.value = responseData.data
            break

          default:
            // update notification
            updateResponse('System Utils', 'error', responseMessage)
            break
        }

        return responseData
      })
      .catch(error => {
        // unauthorized
        const errorCode = error.response.status
        const errorMessage = error.message

        if (errorCode === 401) {
          Unauthorized(getUser.email, errorMessage)
        } else {
          // update products
          updateResponse('System Utils', 'error', error.message)
        }
      })
  }

  async function GetInstitutionType() {
    return await request.get('SystemUtils/GetInstitutionType')
      .then(response => {
        const responseData = response.data
        const { responseCode, responseMessage } = responseData

        switch (responseCode) {
          case '00':
            institutionType.value = responseData.data
            break

          default:
            // update notification
            updateResponse('System Utils', 'error', responseMessage)
            break
        }

        return responseData
      })
      .catch(error => {
        // unauthorized
        const errorCode = error.response.status
        const errorMessage = error.message

        if (errorCode === 401) {
          Unauthorized(getUser.email, errorMessage)
        } else {
          // update products
          updateResponse('System Utils', 'error', error.message)
        }
      })
  }

  async function GetInstitutionbyInstitutionTypeId(id: number | string) {
    return await request.get(`SystemUtils/GetInstitutionbyInstitutionTypeId?InstitutionTypeId=${id}`)
      .then(response => {
        const responseData = response.data
        const { responseCode, responseMessage } = responseData

        switch (responseCode) {
          case '00':
            institutions.value = responseData.data
            break

          default:
            // update notification
            updateResponse('System Utils', 'error', responseMessage)
            break
        }

        return responseData
      })
      .catch(error => {
        // unauthorized
        const errorCode = error.response.status
        const errorMessage = error.message

        if (errorCode === 401) {
          Unauthorized(getUser.email, errorMessage)
        } else {
          // update products
          updateResponse('System Utils', 'error', error.message)
        }
      })
  }

  async function GetInstitutionSemester(id: number | string) {
    return await request.get(`SystemUtils/GetInstitutionSemester?InstitutionTypeId=${id}`)
      .then(response => {
        const responseData = response.data
        const { responseCode, responseMessage } = responseData

        switch (responseCode) {
          case '00':
            institutionSemester.value = responseData.data
            break

          default:
            // update notification
            updateResponse('System Utils', 'error', responseMessage)
            break
        }

        return responseData
      })
      .catch(error => {
        // unauthorized
        const errorCode = error.response.status
        const errorMessage = error.message

        if (errorCode === 401) {
          Unauthorized(getUser.email, errorMessage)
        } else {
          // update products
          updateResponse('System Utils', 'error', error.message)
        }
      })
  }

  async function GetEnrolmentType() {
    return await request.get('SystemUtils/GetEnrolmentType')
      .then(response => {
        const responseData = response.data
        const { responseCode, responseMessage } = responseData

        switch (responseCode) {
          case '00':
            enrolmentType.value = responseData.data
            break

          default:
            // update notification
            updateResponse('System Utils', 'error', responseMessage)
            break
        }

        return responseData
      })
      .catch(error => {
        // unauthorized
        const errorCode = error.response.status
        const errorMessage = error.message

        if (errorCode === 401) {
          Unauthorized(getUser.email, errorMessage)
        } else {
          // update products
          updateResponse('System Utils', 'error', error.message)
        }
      })
  }

  async function GetChannel() {
    return await request.get('SystemUtils/GetChannel')
      .then(response => {
        const responseData = response.data
        const { responseCode, responseMessage } = responseData

        switch (responseCode) {
          case '00':
            channel.value = responseData.data
            break

          default:
            // update notification
            updateResponse('System Utils', 'error', responseMessage)
            break
        }

        return responseData
      })
      .catch(error => {
        // unauthorized
        const errorCode = error.response.status
        const errorMessage = error.message

        if (errorCode === 401) {
          Unauthorized(getUser.email, errorMessage)
        } else {
          // update products
          updateResponse('System Utils', 'error', error.message)
        }
      })
  }

  async function GetUserRoles() {
    return await request.get('SystemUtils/GetSystemRoles')
      .then(response => {
        const responseData = response.data
        const { responseCode, responseMessage } = responseData

        switch (responseCode) {
          case '00':
            userRoles.value = responseData.data
            break

          default:
            // update notification
            updateResponse('System Utils', 'error', responseMessage)
            break
        }

        return responseData
      })
      .catch(error => {
        // unauthorized
        const errorCode = error.response.status
        const errorMessage = error.message

        if (errorCode === 401) {
          Unauthorized(getUser.email, errorMessage)
        } else {
          // update products
          updateResponse('System Utils', 'error', error.message)
        }
      })
  }

  async function GetApplicationStatus() {
    return await request.get('SystemUtils/GetSystemStatus')
      .then(response => {
        const responseData = response.data
        const { responseCode, responseMessage } = responseData

        switch (responseCode) {
          case '00':
            applicationStatus.value = responseData.data
            break

          default:
            // update notification
            updateResponse('System Utils', 'error', responseMessage)
            break
        }

        return responseData
      })
      .catch(error => {
        // unauthorized
        const errorCode = error.response.status
        const errorMessage = error.message

        if (errorCode === 401) {
          Unauthorized(getUser.email, errorMessage)
        } else {
          // update products
          updateResponse('System Utils', 'error', error.message)
        }
      })
  }

  return {
    getGender,
    getMaritalStatus,
    getStateOfOrigin,
    // -----------------------------------------------------
    getInstitutionType,
    getInstitutions,
    getInstitutionSemester,
    getEnrolmentType,
    getChannel,
    getUserRoles,
    getApplicationStatus,
    // -----------------------------------------------------
    MakeDonation,
    GetGender,
    GetMaritalStatus,
    GetStateOfOrigin,
    GetInstitutionType,
    GetInstitutionbyInstitutionTypeId,
    GetInstitutionSemester,
    GetEnrolmentType,
    GetChannel,
    GetUserRoles,
    GetApplicationStatus
  }
})
