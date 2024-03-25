import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { request } from '@/api/api-config'

import type {
  User_Interface,
  UserProfile_Interface,
  Login_Interface,
  Email_Interface,
  ChangePassword_Interface,
  ContactUs_Interface,
  SelfOnboarding_Interface,
  UpdateProfile_Interface,
  CreateUser_Interface,
  UserData_Interface,
  DisapproveUser_Interface,
  DeactivateUser_Interface,
  ReactivateUser_Interface
} from '@/interface/authentication'

import { useToBase64 } from '@/composables/base64'

import { useResponseMessageStore } from '@/stores/common/responseMessage'

const { updateResponse } = useResponseMessageStore()

export const useAuthenticationStore = defineStore('authentication', () => {
  // state
  const user = () => localStorage.getItem('@') as string
  const userProfile = ref<UserProfile_Interface | null>(null)
  const allUsers = ref<UserData_Interface[]>([])
  const allActiveUsers = ref<UserData_Interface[]>([])
  const allPendingUsers = ref<UserData_Interface[]>([])
  const isLoggedInAnotherDevice = ref<boolean>(false)
  const isLogoutMenuClicked = ref<boolean>(false)

  // getters
  const getToken = computed(() => user() ? JSON.parse((user()) as string)['#####'] : null)
  const getUser = computed(() => user() ? JSON.parse((user()) as string)['####'] : null)
  const getAllUsers = computed(() => allUsers)
  const getAllActiveUsers = computed(() => allActiveUsers)
  const getAllPendingUsers = computed(() => allPendingUsers)
  const getUserProfile = computed(() => userProfile)
  const getIsLoggedInAnotherDevice = computed(() => isLoggedInAnotherDevice)
  const getIsLogoutMenuClicked = computed(() => isLogoutMenuClicked)

  // actions
  function saveUserCredentials(data: User_Interface) {
    const user_json = JSON.stringify(data)

    // save user data
    localStorage.setItem('@', user_json)
  }

  function updateIsLogoutMenuClicked(state: boolean) {
    isLogoutMenuClicked.value = state
  }

  async function ApplicantSelfOnboarding(payload: SelfOnboarding_Interface) {
    return await request.post('Auth/ApplicantSelfOnboarding', payload)
      .then(response => {
        const responseData = response.data
        const { responseCode, responseMessage } = responseData

        switch (responseCode) {
          // successful logout
          case '00':
            // update notification
            updateResponse('Student Registration', 'success', responseMessage)
            break

          default:
            // update notification
            updateResponse('Student Registration', 'error', responseMessage)
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
          updateResponse('Student Registration', 'error', error.message)
        }
      })
  }

  async function CreateUser(payload: CreateUser_Interface) {
    return await request.post('Auth/CreateUser', payload)
      .then(response => {
        const responseData = response.data
        const { responseCode, responseMessage } = responseData

        switch (responseCode) {
          // successful logout
          case '00':
            // refresh record
            Promise.all([
              GetAllUsers(),
              GetAllActiveUsers(),
              GetAllUsersPendingApproval()
            ])
            // update notification
            updateResponse('Student Registration', 'success', responseMessage)
            break

          default:
            // update notification
            updateResponse('Student Registration', 'error', responseMessage)
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
          updateResponse('Student Registration', 'error', error.message)
        }
      })
  }

  async function UpdateUser(payload: CreateUser_Interface | UpdateProfile_Interface) {
    return await request.put('Auth/UpdateUser', payload)
      .then(response => {
        const responseData = response.data
        const { responseCode, responseMessage } = responseData

        switch (responseCode) {
          // successful
          case '00':
            // refresh record
            // Promise.all([
            //   GetAllUsers(),
            //   GetAllActiveUsers(),
            //   GetAllUsersPendingApproval()
            // ])
            // update notification
            updateResponse('Update Profile', 'success', responseMessage)
            break

          default:
            // update notification
            updateResponse('Update Profile', 'error', responseMessage)
            break
        }

        return responseData
      })
      .catch(error => {
        // unauthorized
        const errorCode = error.response.status
        const errorMessage = error.message

        console.log(error, errorCode, errorMessage)

        if (errorCode === 401) {
          Unauthorized(getUser.value?.email, errorMessage)
        } else {
          // update notification
          updateResponse('Update Profile', 'error', error.message)
        }
      })
  }

  async function ApproveUser(payload: Email_Interface) {
    return await request.put('Auth/ApproveUser', payload)
      .then(response => {
        const responseData = response.data
        const { responseCode, responseMessage } = responseData

        switch (responseCode) {
          // successful
          case '00':
            // refresh record
            Promise.all([
              GetAllUsers(),
              GetAllActiveUsers(),
              GetAllUsersPendingApproval()
            ])
            // update notification
            updateResponse('User Approval', 'success', responseMessage)
            break

          default:
            // update notification
            updateResponse('User Approval', 'error', responseMessage)
            break
        }

        return responseData
      })
      .catch(error => {
        // unauthorized
        const errorCode = error.response.status
        const errorMessage = error.message

        console.log(error, errorCode, errorMessage)

        if (errorCode === 401) {
          Unauthorized(getUser.value?.email, errorMessage)
        } else {
          // update notification
          updateResponse('User Approval', 'error', error.message)
        }
      })
  }

  async function DisapproveUser(payload: DisapproveUser_Interface) {
    return await request.put('Auth/DisapproveUser', payload)
      .then(response => {
        const responseData = response.data
        const { responseCode, responseMessage } = responseData

        switch (responseCode) {
          // successful
          case '00':
            // refresh record
            Promise.all([
              GetAllUsers(),
              GetAllActiveUsers(),
              GetAllUsersPendingApproval()
            ])
            // update notification
            updateResponse('User Disapproval', 'success', responseMessage)
            break

          default:
            // update notification
            updateResponse('User Disapproval', 'error', responseMessage)
            break
        }

        return responseData
      })
      .catch(error => {
        // unauthorized
        const errorCode = error.response.status
        const errorMessage = error.message

        console.log(error, errorCode, errorMessage)

        if (errorCode === 401) {
          Unauthorized(getUser.value?.email, errorMessage)
        } else {
          // update notification
          updateResponse('User Disapproval', 'error', error.message)
        }
      })
  }

  async function DeactivateUser(payload: DeactivateUser_Interface) {
    return await request.post('Auth/DeactivateUser', payload)
      .then(response => {
        const responseData = response.data
        const { responseCode, responseMessage } = responseData

        switch (responseCode) {
          // successful
          case '00':
            // refresh record
            Promise.all([
              GetAllUsers(),
              GetAllActiveUsers(),
              GetAllUsersPendingApproval()
            ])
            // update notification
            updateResponse('User Deactivation', 'success', responseMessage)
            break

          default:
            // update notification
            updateResponse('User Deactivation', 'error', responseMessage)
            break
        }

        return responseData
      })
      .catch(error => {
        // unauthorized
        const errorCode = error.response.status
        const errorMessage = error.message

        console.log(error, errorCode, errorMessage)

        if (errorCode === 401) {
          Unauthorized(getUser.value?.email, errorMessage)
        } else {
          // update notification
          updateResponse('User Deactivation', 'error', error.message)
        }
      })
  }

  async function ReactivateUser(payload: ReactivateUser_Interface) {
    return await request.post('Auth/Re-activateUser', payload)
      .then(response => {
        const responseData = response.data
        const { responseCode, responseMessage } = responseData

        switch (responseCode) {
          // successful
          case '00':
            // refresh record
            Promise.all([
              GetAllUsers(),
              GetAllActiveUsers(),
              GetAllUsersPendingApproval()
            ])
            // update notification
            updateResponse('User Activation', 'success', responseMessage)
            break

          default:
            // update notification
            updateResponse('User Activation', 'error', responseMessage)
            break
        }

        return responseData
      })
      .catch(error => {
        // unauthorized
        const errorCode = error.response.status
        const errorMessage = error.message

        console.log(error, errorCode, errorMessage)

        if (errorCode === 401) {
          Unauthorized(getUser.value?.email, errorMessage)
        } else {
          // update notification
          updateResponse('User Activation', 'error', error.message)
        }
      })
  }

  async function UnblockAccount(payload: Email_Interface) {
    return await request.post('Auth/UnblockAccount', payload)
      .then(response => {
        const responseData = response.data
        const { responseCode, responseMessage } = responseData

        switch (responseCode) {
          // successful
          case '00':
            // refresh record
            Promise.all([
              GetAllUsers(),
              GetAllActiveUsers(),
              GetAllUsersPendingApproval()
            ])
            // update notification
            updateResponse('Unblock User Account', 'success', responseMessage)
            break

          default:
            // update notification
            updateResponse('Unblock User Account', 'error', responseMessage)
            break
        }

        return responseData
      })
      .catch(error => {
        // unauthorized
        const errorCode = error.response.status
        const errorMessage = error.message

        console.log(error, errorCode, errorMessage)

        if (errorCode === 401) {
          Unauthorized(getUser.value?.email, errorMessage)
        } else {
          // update notification
          updateResponse('Unblock User Account', 'error', error.message)
        }
      })
  }

  async function Login(payload: Login_Interface) {
    return await request.post('Auth/Login', payload)
      .then(response => {
        const responseData = response.data
        const { responseCode, responseMessage } = responseData

        switch (responseCode) {
          // successful login
          case '00':
            saveUserCredentials({
              '#####': responseData.jwtToken,
              '####': responseData.data
            })
            break

          // logged in on another device
          case '09':
            // update notification
            updateResponse('Authentication', 'error', responseMessage)

            // update user loggen in another device
            isLoggedInAnotherDevice.value = true
            break

          default:
            // update notification
            updateResponse('Authentication', 'error', responseMessage)
            break
        }

        return responseData
      })
      .catch(error => {
        // update notification
        updateResponse('Authentication', 'error', error.message)
      })
  }

  async function Logout(payload: Email_Interface) {
    return await request.post('Auth/Logout', payload)
      .then(response => {
        const responseData = response.data
        const { responseCode, responseMessage } = responseData

        switch (responseCode) {
          // successful logout
          case '00':
            // clear ;ocal stroage
            localStorage.removeItem('@')
            // update user loggedIn in another device
            isLoggedInAnotherDevice.value = false

            // update notification
            updateResponse('Logout', 'success', responseMessage)
            break

          default:
            // update notification
            updateResponse('Logout', 'error', responseMessage)
            break
        }

        return responseData
      })
      .catch(error => {
        // update notification
        updateResponse('Logout', 'error', error.message)
      })
  }

  async function Unauthorized(email: string, errorMessage: string) {
    // update notification
    updateResponse('Session Timeout', 'error', errorMessage)

    // logout
    await Logout({ email: useToBase64(email) })
      .finally(() => {
        location.href = ('/login')
      })
  }

  async function SendEmailForPasswordChange(payload: Email_Interface) {
    return await request.post('Auth/SendEmailForPasswordChange', payload)
      .then(response => {
        const responseData = response.data
        const { responseCode, responseMessage } = responseData

        switch (responseCode) {
          // successful logout
          case '00':
            // update notification
            updateResponse('Reset Password', 'success', responseMessage)
            break

          default:
            // update notification
            updateResponse('Reset Password', 'error', responseMessage)
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
          updateResponse('Reset Password', 'error', error.message)
        }
      })
  }

  async function ChangePassword(payload: ChangePassword_Interface) {
    return await request.post('Auth/ChangePassword', payload)
      .then(response => {
        const responseData = response.data
        const { responseCode, responseMessage } = responseData

        switch (responseCode) {
          // successful
          case '00':
            // update notification
            updateResponse('Reset Password', 'success', responseMessage)
            break

          default:
            // update notification
            updateResponse('Reset Password', 'error', responseMessage)
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
          updateResponse('Reset Password', 'error', error.message)
        }
      })
  }

  async function ContactUs(payload: ContactUs_Interface) {
    return await request.post('Auth/ContactUs', payload)
      .then(response => {
        const responseData = response.data
        const { responseCode, responseMessage } = responseData

        switch (responseCode) {
          // successful
          case '00':
            // update notification
            updateResponse('Contact Us', 'success', responseMessage)
            break

          default:
            // update notification
            updateResponse('Contact Us', 'error', responseMessage)
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
          updateResponse('Contact Us', 'error', error.message)
        }
      })
  }

  async function GetAllUsers() {
    return await request.get('Auth/GetAllUsers')
      .then(response => {
        const responseData = response.data
        const { responseCode, responseMessage } = responseData

        switch (responseCode) {
          case '00':
            allUsers.value = responseData.data
            break

          default:
            // update notification
            updateResponse('Fetch Users', 'error', responseMessage)
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
          // update products
          updateResponse('Fetch Users', 'error', error.message)
        }
      })
  }

  async function GetAllActiveUsers() {
    return await request.get('Auth/GetAllActiveUsers')
      .then(response => {
        const responseData = response.data
        const { responseCode, responseMessage } = responseData

        switch (responseCode) {
          case '00':
            allActiveUsers.value = responseData.data
            break

          default:
            // update notification
            updateResponse('Fetch Users', 'error', responseMessage)
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
          // update products
          updateResponse('Fetch Users', 'error', error.message)
        }
      })
  }

  async function GetAllUsersPendingApproval() {
    return await request.get('Auth/GetAllUsersPendingApproval')
      .then(response => {
        const responseData = response.data
        const { responseCode, responseMessage } = responseData

        switch (responseCode) {
          case '00':
            allPendingUsers.value = responseData.data
            break

          default:
            // update notification
            updateResponse('Fetch Users', 'error', responseMessage)
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
          // update products
          updateResponse('Fetch Users', 'error', error.message)
        }
      })
  }

  async function GetUserProfile(email: string) {
    return await request.get(`Auth/GetUserByEmail?email=${email}`)
      .then(response => {
        const responseData = response.data
        const { responseCode, responseMessage } = responseData

        switch (responseCode) {
          case '00':
            userProfile.value = responseData.data
            break

          default:
            // update notification
            updateResponse('Fetch Users', 'error', responseMessage)
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
          // update products
          updateResponse('Fetch Users', 'error', error.message)
        }
      })
  }

  return {
    getToken,
    getUser,
    getAllUsers,
    getAllActiveUsers,
    getAllPendingUsers,
    getUserProfile,
    getIsLoggedInAnotherDevice,
    getIsLogoutMenuClicked,
    updateIsLogoutMenuClicked,
    ApplicantSelfOnboarding,
    CreateUser,
    Login,
    Logout,
    Unauthorized,
    UpdateUser,
    ApproveUser,
    DisapproveUser,
    DeactivateUser,
    ReactivateUser,
    UnblockAccount,
    SendEmailForPasswordChange,
    ChangePassword,
    ContactUs,
    GetAllUsers,
    GetAllActiveUsers,
    GetAllUsersPendingApproval,
    GetUserProfile
  }
})
