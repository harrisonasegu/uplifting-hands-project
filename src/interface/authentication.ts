export interface UserData_Interface {
  userId: number
  firstName: string
  middleName: string
  lastName: string
  email: string
  phoneNumber: string
  address1: string
  address2: string
  stateName: string
  gender: string
  maritalStatus: string
  userPicture: string
  isProfileComplete: boolean
  nin: string
  roleId: number
  roleName: string
  createdByUserEmail: number
  dateCreated: string | null
  isModified: boolean
  lastModifiedByUserEmail: number
  dateModified: string | null
  isLogin: boolean
  isActive: boolean
  lastLoginDate: string | null
  lastLoginAttemptAt: string
  loginFailedAttemptsCount: number
  loggedInWithIPAddress: string
  isApproved: boolean
  approvedByUserEmail: number
  dateApproved: string
  isDisapproved: boolean
  disapprovedComment: string | null
  disapprovedByUserEmail: number | null
  dateDisapproved: string | null
  isDeactivated: boolean
  deactivatedComment: string | null
  deactivatedByUserEmail: number | null
  dateDeactivated: string | null
  isResubmited: boolean
  resubmitedComment: string | null
  resubmitedByUserEmail: number | null
  dateReSubmited: string | null
  userStatus: any
  userStatusId: number
  isLockedOut: boolean
}

export interface UserProfile_Interface {
  userId: number
  firstName: string
  middleName: string
  lastName: string
  email: string
  phoneNumber: string
  address1: string
  address2: string
  stateName: string
  gender: string
  maritalStatus: string
  userPicture: string
  isProfileComplete: boolean
  nin: string
  roleId: number
}

export interface User_Interface {
  '#####': string
  '####': string
}

export interface SelfOnboarding_Interface {
  email: string
  password: string
  confirmPassword: string
}

export interface UpdateProfile_Interface {
  email: string
  firstName: string
  lastName: string
  middleName: string
  phoneNumber: string
  address1: string
  address2: string
  stateOfOriginId: number|null
  genderId: number|null
  maritalStatusId: number|null
  userPicture: string
  nin: string
  roleId: number | null
}

export interface CreateUser_Interface {
  firstName: string
  lastName: string
  middleName: string
  email: string
  phoneNumber: string
  roleId?: number | null
}

export interface Login_Interface {
  email: string
  password: string
}

export interface Email_Interface {
  email: string | undefined
}

export interface DisapproveUser_Interface {
  email: string
  disapprovedComment: string
}

export interface ReactivateUser_Interface {
  email: string
  reactivatedComment: string
}

export interface DeactivateUser_Interface {
  email: string
  deactivatedComment: string
}

export interface DisapproveUser_Interface {
  email: string
  disapprovedComment: string
}

export interface ChangePassword_Interface {
  email: string|undefined
  oldPassword: string
  newPassword: string
}

export interface ChangePasswordModel_Interface {
  oldPassword: string
  newPassword: string
  reenteredPassword: string
}

export interface ContactUs_Interface {
  fullName: string
  email: string
  phone: string
  message: string
}
