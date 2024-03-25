import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { request } from '@/api/api-config'

import type {
  ApplyAndSaveDraft_Interface,
  ApproveApplication_Interface,
  DeclineApplication_Interface,
  DisburseApplication_Interface,
  FundApplicationSummary_Interface,
  FundApplication_Interface,
  ReviewApplication_Interface,
  SubmitApplication_Interface,
} from "@/interface/fundOrFinancialAid";

import { useAuthenticationStore } from '@/stores/modules/authentication'
import { useResponseMessageStore } from '@/stores/common/responseMessage'

const { getUser, Unauthorized } = useAuthenticationStore()
const { updateResponse } = useResponseMessageStore()

export const useFundOrFinancialAidStore = defineStore('fundOrFinancialAid', () => {
  // state
  const applicationSummary = ref<FundApplicationSummary_Interface | null>(null)
  const allFundApplicationsByStudent = ref<FundApplication_Interface[]>([])
  const allFundApplications = ref<FundApplication_Interface[]>([])
  const activeFundApplicationByUserId = ref<FundApplication_Interface | null>(null)
  const fundApplicationByFundApplicationId = ref<FundApplication_Interface | null>(null)

  // getters
  const getApplicationSummary = computed(() => applicationSummary)
  const getAllFundApplicationsByStudent = computed(() => allFundApplicationsByStudent)
  const getAllFundAndFinancialAidApplications = computed(() => allFundApplications)
  const getActiveFundApplicationByUserId = computed(() => activeFundApplicationByUserId)
  const getFundApplication = computed(() => fundApplicationByFundApplicationId)

  // actions
  async function ApplyAndSaveDraft(payload: ApplyAndSaveDraft_Interface) {
    return await request.post('FundorFinancialAid/ApplyAndSaveDraft', payload)
      .then(response => {
        const responseData = response.data
        const { responseCode, responseMessage } = responseData

        switch (responseCode) {
          // successful logout
          case '00':
            // update notification
            updateResponse('Fund Application', 'success', responseMessage)
            break

          default:
            // update notification
            updateResponse('Fund Application', 'error', responseMessage)
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
          updateResponse('Fund Application', 'error', error.message)
        }
      })
  }

  async function UpdateApplicationAndSaveDraft(payload: ApplyAndSaveDraft_Interface) {
    return await request.put('FundorFinancialAid/UpdateApplicationAndSaveDraft', payload)
      .then(response => {
        const responseData = response.data
        const { responseCode, responseMessage } = responseData

        switch (responseCode) {
          // successful logout
          case '00':
            // update notification
            updateResponse('Fund Application', 'success', responseMessage)
            break

          default:
            // update notification
            updateResponse('Fund Application', 'error', responseMessage)
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
          updateResponse('Fund Application', 'error', error.message)
        }
      })
  }

  async function SubmitApplication(payload: SubmitApplication_Interface) {
    return await request.put('FundorFinancialAid/SubmitApplication', payload)
      .then(response => {
        const responseData = response.data
        const { responseCode, responseMessage } = responseData

        switch (responseCode) {
          // successful logout
          case '00':
            // refressh application status
            GetActiveFundApplicationByUserId(getUser?.userId)
            // refresh student applicstion history
            GetTopTenDisbursedApplicationByUserId(getUser?.userId)
            
            // update notification
            updateResponse('Fund Application', 'success', responseMessage)
            break

          default:
            // update notification
            updateResponse('Fund Application', 'error', responseMessage)
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
          updateResponse('Fund Application', 'error', error.message)
        }
      })
  }

  async function ReviewApplication(currentTab: number, payload: ReviewApplication_Interface) {
    return await request.put('FundorFinancialAid/ReviewApplication', payload)
      .then(response => {
        const responseData = response.data
        const { responseCode, responseMessage } = responseData

        switch (responseCode) {
          // successful logout
          case '00':
            // refresh records
            GetAllFundsOrFinancialAidApplications(currentTab)
            // update notification
            updateResponse('Fund Application', 'success', responseMessage)
            break

          default:
            // update notification
            updateResponse('Fund Application', 'error', responseMessage)
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
          updateResponse('Fund Application', 'error', error.message)
        }
      })
  }

  async function ApproveApplication(currentTab: number, payload: ApproveApplication_Interface) {
    return await request.put('FundorFinancialAid/ApproveApplication', payload)
      .then(response => {
        const responseData = response.data
        const { responseCode, responseMessage } = responseData

        switch (responseCode) {
          // successful logout
          case '00':
            // refresh records
            GetAllFundsOrFinancialAidApplications(currentTab)
            // update notification
            updateResponse('Fund Application', 'success', responseMessage)
            break

          default:
            // update notification
            updateResponse('Fund Application', 'error', responseMessage)
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
          updateResponse('Fund Application', 'error', error.message)
        }
      })
  }

  async function DeclineApplication(currentTab: number, payload: DeclineApplication_Interface) {
    return await request.put('FundorFinancialAid/DeclineApplication', payload)
      .then(response => {
        const responseData = response.data
        const { responseCode, responseMessage } = responseData

        switch (responseCode) {
          // successful logout
          case '00':
            // refresh records
            GetAllFundsOrFinancialAidApplications(currentTab)
            // update notification
            updateResponse('Fund Application', 'success', responseMessage)
            break

          default:
            // update notification
            updateResponse('Fund Application', 'error', responseMessage)
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
          updateResponse('Fund Application', 'error', error.message)
        }
      })
  }

  async function DisburseApplication(currentTab: number, payload: DisburseApplication_Interface) {
    return await request.put('FundorFinancialAid/DisburseApplication', payload)
      .then(response => {
        const responseData = response.data
        const { responseCode, responseMessage } = responseData

        switch (responseCode) {
          // successful logout
          case '00':
            // refresh records
            GetAllFundsOrFinancialAidApplications(currentTab)
            // update notification
            updateResponse('Fund Application', 'success', responseMessage)
            break

          default:
            // update notification
            updateResponse('Fund Application', 'error', responseMessage)
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
          updateResponse('Fund Application', 'error', error.message)
        }
      })
  }

  async function GetApplicationSummary() {
    return await request.get('FundorFinancialAid/GetDashboardDetails')
      .then(response => {
        const responseData = response.data
        const { responseCode, responseMessage } = responseData

        switch (responseCode) {
          case '00':
            applicationSummary.value = responseData.data
            break

          default:
            // update notification
            updateResponse('Fund Application', 'error', responseMessage)
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
          updateResponse('Fund Application', 'error', error.message)
        }
      })
  }

  async function GetAllFundsOrFinancialAidApplications(id: number) {
    return await request.get(`FundorFinancialAid/GetAllFundsOrFinancialAidApplications?statusId=${id}`)
      .then(response => {
        const responseData = response.data
        const { responseCode, responseMessage } = responseData

        switch (responseCode) {
          case '00':
            allFundApplications.value = responseData.data
            break

          default:
            // return empty list
            allFundApplications.value = []

            // update notification
            updateResponse('Fund Application', 'error', responseMessage)
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
          updateResponse('Fund Application', 'error', error.message)
        }
      })
  }

  async function GetActiveFundApplicationByUserId(id: number) {
    return await request.get(`FundorFinancialAid/GetActiveFundApplicationByUserId?userId=${id}`)
      .then(response => {
        const responseData = response.data
        const { responseCode, responseMessage } = responseData

        switch (responseCode) {
          case '00':
            activeFundApplicationByUserId.value = responseData.data
            break

          default:
            // update notification
            updateResponse('Fund Application', 'error', responseMessage)
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
          updateResponse('Fund Application', 'error', error.message)
        }
      })
  }

  async function GetTopTenDisbursedApplicationByUserId(id: number) {
    return await request.get(`FundorFinancialAid/GetTopTenDisbursedApplicationByUserId?userId=${id}`)
      .then(response => {
        const responseData = response.data
        const { responseCode, responseMessage } = responseData

        switch (responseCode) {
          case '00':
            allFundApplicationsByStudent.value = responseData.data
            break

          default:
            // update notification
            updateResponse('Fund Application', 'error', responseMessage)
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
          updateResponse('Fund Application', 'error', error.message)
        }
      })
  }

  async function GetFundsApplicationsByFundAppLicationId(id: number) {
    return await request.get(`FundorFinancialAid/GetFundsApplicationsByFundAppLicationId?applicationId=${id}`)
      .then(response => {
        const responseData = response.data
        const { responseCode, responseMessage } = responseData

        switch (responseCode) {
          case '00':
            fundApplicationByFundApplicationId.value = responseData.data
            break

          default:
            // update notification
            updateResponse('Fund Application', 'error', responseMessage)
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
          updateResponse('Fund Application', 'error', error.message)
        }
      })
  }

  return {
    getApplicationSummary,
    getAllFundApplicationsByStudent,
    getAllFundAndFinancialAidApplications,
    getActiveFundApplicationByUserId,
    getFundApplication,
    // -----------------------------------------------------
    ApplyAndSaveDraft,
    UpdateApplicationAndSaveDraft,
    SubmitApplication,
    ReviewApplication,
    ApproveApplication,
    DeclineApplication,
    DisburseApplication,
    GetApplicationSummary,
    GetAllFundsOrFinancialAidApplications,
    GetActiveFundApplicationByUserId,
    GetTopTenDisbursedApplicationByUserId,
    GetFundsApplicationsByFundAppLicationId
  }
})
