export interface Gender_Interface {
  gender: string
  genderId: number
}

export interface MaritalStatus_Interface {
  maritalStatus: string
  maritalStatusId: number
}

export interface State_Interface {
  stateName: string
  stateOfOriginId: number
}

export interface InstitutionType_Interface {
  institutionType: string
  institutionTypeId: number
}

export interface Institution_Interface {
  institutionName: string
  institutionId: number
}

export interface InstitutionSemester_Interface {
  semesterName: string
  semesterId: number
  institutionTypeId: number

}

export interface EnrolmentType_Interface {
  enrolmentType: string
  enrolmentTypeId: number
}

export interface Channel_Interface {
  channel: string
  channelId: number
}

export interface UserRoles_Interface {
  roleName: string
  roleId: number
}

export interface ApplicationStatus_Interface {
  statusName: string
  statusDescription: string
  statusId: number
}

export interface CreatePost_Interface {
  postTypeId: number
  postType: string
  postMessage: string
}

export interface MakeDonation_Interface {
  donorName: string
  donorEmail: string
  donationAmount: number
  isAnonymous: boolean
}
