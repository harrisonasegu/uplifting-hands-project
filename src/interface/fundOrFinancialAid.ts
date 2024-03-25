export interface ApplyAndSaveDraft_Interface {
  institutionTypeId: number | null
  institutionId: number | null
  degreeDescription: string
  enrolmentTypeId: number | null
  semesterId: number | null
  degreeStartYear: string | null
  degreeCompletionYear: string | null
  fundApplicationYear: string | null
  schoolContactNumber: string
  schoolContactEmail: string
  reasonsForFundRequest: string
  schoolOrExamEnrollmentFormDocument: string
  schoolOrExamFeesDocument: string
  institutionPaymentAccountNumber: string
  institutionPaymentAccountName: string
  institutionPaymentBankName: string
  requiredFundAmount: number | null
  heartFeltThankyouLetterToFundDonor: string
  providedInformationAccuracy: boolean
  termsAndConditionsAgreement: boolean
  channelId: number | null
  applicationId?: number | null
}

export interface SubmitApplication_Interface {
  applicationId: number
}

export interface ReviewApplication_Interface {
  applicationId: number
  review_Comments: string
}

export interface ApproveApplication_Interface {
  applicationId: number
  approval_Comments: string
}

export interface DeclineApplication_Interface {
  applicationId: number
  reasons_For_Decline: string
}

export interface DisburseApplication_Interface {
  applicationId: number
  disburse_Comments: string
  proofOfPaymentUpload: string
}

export interface FundApplicationSummary_Interface {
  allApplications: number,
  pendingApplications: number,
  approvedApplications: number,
  disbursedApplications: number
}

export interface FundApplication_Interface {
  applicationId: number
  userId: number
  applicantName: string
  nin: string
  institutionTypeId: number
  institutionType: string
  institutionId: number
  institutionName: string
  degreeDescription: string
  enrolmentTypeId: number
  enrolmentType: string
  semesterId: number
  semesterName: string
  degreeStartYear: string
  degreeCompletionYear: string
  fundApplicationYear: string
  schoolContactNumber: string
  schoolContactEmail: string
  reasonsForFundRequest: string
  institutionPaymentAccountNumber: string
  institutionPaymentAccountName: string
  institutionPaymentBankName: string
  requiredFundAmount: number
  heartFeltThankyouLetterToFundDonor: string
  providedInformationAccuracy: boolean
  termsAndConditionsAgreement: boolean
  statusId: number
  status: string
  created_Date: string
  created_By_User_Email: number
  isUpdated: boolean
  updated_Date: string
  updated_By_User_Email: string
  isSubmitted: boolean
  submmisionDate: string
  isReviewed: boolean
  review_Date: string
  reviewed_By_User_Email: string
  review_Comments: string
  isApproved: boolean
  approval_Date: string
  approved_By_User_Email: string
  approval_Comments: string
  isDisbursed: boolean
  disbursed_Date: string
  disbursed_By_User_Email: string
  disburse_Comments: string
  proofOfPaymentUpload: string
  isDeclined: boolean
  declined_Date: string
  declined_By_User_Email: string
  reasons_For_Decline: string
  channelId: number
  channel: string
}
