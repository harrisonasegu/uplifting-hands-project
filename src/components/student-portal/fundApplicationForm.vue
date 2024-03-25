<script lang="ts" setup>
import { computed, onBeforeMount, reactive, ref } from 'vue'

import {
  NForm,
  NFormItem,
  NInput,
  NSelect,
  NDatePicker,
  NButton,
  NUpload,
  NCheckbox,
  useNotification,
type UploadFileInfo,
type FormValidationError,
type FormInst,
type FormRules,
type FormItemRule,
} from 'naive-ui'

import {
  cloudinaryApplicantSchoolFeeDocumentUploadFolder,
  cloudinaryApplicantSchoolFormDocumentUploadFolder,
  cloudinaryUnsignedUploadPreset
} from '@/api/cloudinary-config'

import { useResponseNotification } from '@/composables/responseNotification'

import { useStudentApplicationProgressStore } from '@/stores/modules/studentApplicationProgress'
import { useAuthenticationStore } from '@/stores/modules/authentication'
import { useResponseMessageStore } from '@/stores/common/responseMessage'
import { useFundOrFinancialAidStore } from '@/stores/modules/fundOrFinancialAid'
import { useSystemUtilsStore } from '@/stores/modules/systemUtils'
import { useCloudinaryFileUploadStore } from '@/stores/common/cloudinaryFileUpload'

import { RegEx } from '@/composables/regex/regex'

const notification = useNotification()

const studentApplicationProgressStore = useStudentApplicationProgressStore()
const userStore = useAuthenticationStore()
const responseMessageStore = useResponseMessageStore()
const fundOrFinancialAidStore = useFundOrFinancialAidStore()
const systemUtilsStore = useSystemUtilsStore()
const cloudinaryFileUploadStore = useCloudinaryFileUploadStore()

const fundApplication = fundOrFinancialAidStore.getActiveFundApplicationByUserId

const props = defineProps({
  hasFundApplication_: Boolean
})

const hasFundApplication = props.hasFundApplication_

const isApplicationComplete = false

const isEditButtonClicked = studentApplicationProgressStore.getIsEditFundApplicationButtonClicked

const isLoading = ref<boolean>(false)

const isDropdownLoading = ref<boolean>(false)

const formRef = ref<FormInst | null>(null)

const model = reactive({
  institutionType: '',
  institutionTypeId: null,
  institutionName: '',
  institutionId: null,
  degreeDescription: '',
  enrolmentType: '',
  enrolmentTypeId: null,
  semester: '',
  semesterId: null,
  degreeStartYear: Date.now(),
  degreeCompletionYear: new Date(new Date().setFullYear(new Date().getFullYear() + 4)).getTime(),
  fundApplicationYear: Date.now(),
  schoolContactNumber: '',
  schoolContactEmail: '',
  reasonsForFundRequest: '',
  schoolOrExamEnrollmentFormDocument: '',
  schoolOrExamFeesDocument: '',
  institutionPaymentBankName: '',
  institutionPaymentAccountNumber: '',
  institutionPaymentAccountName: '',
  requiredFundAmount: '',
  heartFeltThankyouLetterToFundDonor: '',
  channel: 'web',
  channelId: 1,
})

const termsAndConditionsAgreement = ref(false)
const providedInformationAccuracy = ref(false)

const schoolFormDocumentFileListRef = ref<UploadFileInfo[]>([])
const schoolFeesDocumentFileListRef = ref<UploadFileInfo[]>([])

const inputRequired = computed((): boolean =>
  model.institutionTypeId === null ||
  model.institutionId === null ||
  model.degreeDescription === '' ||
  model.enrolmentTypeId === null ||
  model.semesterId === null ||
  model.degreeStartYear === null ||
  model.degreeCompletionYear === null ||
  model.fundApplicationYear === null ||
  model.schoolContactNumber === '' ||
  model.schoolContactEmail === '' ||
  model.reasonsForFundRequest === '' ||
  model.schoolOrExamEnrollmentFormDocument === '' ||
  model.schoolOrExamFeesDocument === '' ||
  model.institutionPaymentBankName === '' ||
  model.institutionPaymentAccountNumber === '' ||
  model.institutionPaymentAccountName === '' ||
  model.requiredFundAmount === '' ||
  model.heartFeltThankyouLetterToFundDonor === '' ||
  !termsAndConditionsAgreement.value ||
  !providedInformationAccuracy.value
)

const rules: FormRules = {
  schoolContactEmail: [
    {
      required: true,
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error("email is required");
        } else if (!RegEx.email.test(value)) {
          return new Error("email is invalid");
        }
        return true;
      },
      trigger: ["input", "blur"],
    },
  ],
}

const showNotification = (duration: number) => {
  useResponseNotification(
    notification,
    responseMessageStore.response.status,
    responseMessageStore.response.title,
    responseMessageStore.response.message,
    duration
  )
}

const loadingState = (state: boolean) => {
  isLoading.value = state
}

const dropdownLoadingState = (state: boolean) => {
  isDropdownLoading.value = state
}

const toJsonData = (jsonStr: string) => JSON.parse(jsonStr)

const getAllDropdownOptions = () => {
  if (isEditButtonClicked.value) {
    const institutionTypeId = model?.institutionTypeId as unknown as number

    Promise.all([
      systemUtilsStore.GetInstitutionType(),
      systemUtilsStore.GetEnrolmentType(),
      systemUtilsStore.GetChannel(),
      systemUtilsStore.GetInstitutionbyInstitutionTypeId(institutionTypeId),
      systemUtilsStore.GetInstitutionSemester(institutionTypeId)
    ])
  } else {
    Promise.all([
      systemUtilsStore.GetInstitutionType(),
      systemUtilsStore.GetEnrolmentType(),
      systemUtilsStore.GetChannel()
    ])
  }
  
}

const getStudentFunApplicationDetails = async () => {
  const user = userStore.getUser

  return await fundOrFinancialAidStore.GetActiveFundApplicationByUserId(user?.userId)
}

const formatAmount = (amount: number) => amount.toLocaleString('en-NG')

const formatAmountToNumber = () => Number(model.requiredFundAmount.split(',').join(''))

const handleBackButtonClick = () => studentApplicationProgressStore.setIsCreateFundApplicationButtonClicked(false)

const handleCloseButtonClick = () => studentApplicationProgressStore.setIsEditFundApplicationButtonClicked(false)

const disableAmountCounterButton = (btn: string) => {
  if (btn === '-') {
    // decrement button
    return !model.requiredFundAmount || Number(model.requiredFundAmount) === 0
  }
  // increment button
  else {
    return! model.requiredFundAmount
  }
}

const handleAmountInput = () => {
  const numStr = model.requiredFundAmount?.split(',').join('')
  const num = Number(numStr)

  // update amount field
  model.requiredFundAmount = formatAmount(num)
}

const handleAmountButtonClick = (btn: string) => {
  const num = model.requiredFundAmount?.split(',').join('')
  let amount = 0

  switch (btn) {
    case '-':
      amount = Number(num) - 1
      break

    case '+':
      amount = Number(num) + 1
      break
  }

  // update amount field
  model.requiredFundAmount = formatAmount(amount)
}

const handleInstitutionTypeSelect = async (json: string) => {
  dropdownLoadingState(true)

  const institutionType = toJsonData(json)

  model.institutionType = institutionType?.institutionType
  model.institutionTypeId = institutionType?.institutionTypeId

  await Promise.all([
    await systemUtilsStore.GetInstitutionbyInstitutionTypeId(institutionType?.institutionTypeId),
    await systemUtilsStore.GetInstitutionSemester(institutionType?.institutionTypeId)
  ])
    .then(() => dropdownLoadingState(false))
    .catch(() => dropdownLoadingState(false))
}

const handleInstitutionSelect = async (json: string) => {
  const institution = toJsonData(json)

  model.institutionName = institution?.institutionName
  model.institutionId = institution?.institutionId
}

const handleEnrollmentTypeSelect = (json: string) => {
  const enrolmentType = toJsonData(json)

  model.enrolmentType = enrolmentType?.enrolmentType
  model.enrolmentTypeId = enrolmentType?.enrolmentTypeId
}

const handleSemesterSelect = (json: string) => {
  const semester = toJsonData(json)

  model.semester = semester?.semesterName
  model.semesterId = semester?.semesterId
}

const allowAccountNumberInput = (accountNumber: string) => !accountNumber || /^\d{0,10}$/.test(accountNumber)

const allowAmountInput = (amount: string) => !amount || /^\d/.test(amount)

const handleBeforeSchoolFormDocumentUpload = async (data: { file: UploadFileInfo, fileList: UploadFileInfo[] }) => {
  // file formats are .jpeg, .jpg and .png
  if (!['image/jpeg', 'image/jpg', 'image/png'].includes(data.file.file?.type as any)) {

    // update response message
    responseMessageStore.updateResponse('Document Upload', 'error', 'Unsupported file format. Upload Image file.')
    // show response message
    showNotification(5000)
    return false
  } else
    if (Math.round((data.file.file?.size as number) / 1000) > 2000) {
      // update response message
      responseMessageStore.updateResponse('Document Upload', 'error', 'File size shouldn\'t exceed 2Mb.')
      // show response message
      showNotification(5000)
      return false
    } else {
      // update response message
      responseMessageStore.updateResponse('', '', '')

      const fileReader = new FileReader

      fileReader.readAsDataURL(data.file.file as any)

      fileReader.addEventListener('load', async () => {
        const dataUrl = fileReader.result as string
        // model.schoolOrExamEnrollmentFormDocument = dataUrl as string

        // upload to cloudinary
        const payload = {
          upload_preset: cloudinaryUnsignedUploadPreset,
          folder: cloudinaryApplicantSchoolFormDocumentUploadFolder,
          file: dataUrl
        }

        await cloudinaryFileUploadStore.UploadApplicantProfilePhoto(payload)
          .then(response => {
            model.schoolOrExamEnrollmentFormDocument = response.secure_url
          })
          .catch(() => {
            model.schoolOrExamEnrollmentFormDocument = ''

            // notification
            showNotification(5000)
          })
      })
    }
}

const handleBeforeSchoolFeesDocumentUpload = async (data: { file: UploadFileInfo, fileList: UploadFileInfo[] }) => {
  // file formats are .jpeg, .jpg and .png
  if (!['image/jpeg', 'image/jpg', 'image/png'].includes(data.file.file?.type as any)) {
    // update response message
    responseMessageStore.updateResponse('Document Upload', 'error', 'Unsupported file format. Upload Image file.')
    // show response message
    showNotification(5000)
    return false
  } else
    if (Math.round((data.file.file?.size as number) / 1000) > 2000) {
      // update response message
      responseMessageStore.updateResponse('Document Upload', 'error', 'File size shouldn\'t exceed 2Mb.')
      // show response message
      showNotification(5000)
      return false
    } else {
      // update response message
      responseMessageStore.updateResponse('', '', '')

      const fileReader = new FileReader

      fileReader.readAsDataURL(data.file.file as any)

      fileReader.addEventListener('load', async () => {
        const dataUrl = fileReader.result as string
        // model.schoolOrExamFeesDocument = dataUrl as string

        // upload to cloudinary
        const payload = {
          upload_preset: cloudinaryUnsignedUploadPreset,
          folder: cloudinaryApplicantSchoolFeeDocumentUploadFolder,
          file: dataUrl
        }

        await cloudinaryFileUploadStore.UploadApplicantProfilePhoto(payload)
          .then(response => {
            model.schoolOrExamFeesDocument = response.secure_url
          })
          .catch(() => {
            model.schoolOrExamFeesDocument = ''

            // notification
            showNotification(5000)
          })
      })
    }
}

const handleRemoveSchoolFormDocument = () => {
  model.schoolOrExamEnrollmentFormDocument = ''
}

const handleRemoveSchoolFeesDocument = () => {
  model.schoolOrExamFeesDocument = ''
}

const updateModel = (application_data: any) => {
  model.institutionType = application_data?.institutionType
  model.institutionTypeId = application_data?.institutionTypeId
  model.institutionName = application_data?.institutionName
  model.institutionId = application_data?.institutionId
  model.degreeDescription = application_data?.degreeDescription
  model.enrolmentType = application_data?.enrolmentType
  model.enrolmentTypeId = application_data?.enrolmentTypeId
  model.semester = application_data?.semesterName
  model.semesterId = application_data?.semesterId
  model.degreeStartYear = new Date(application_data?.degreeStartYear).getTime()
  model.degreeCompletionYear = new Date(application_data?.degreeCompletionYear).getTime()
  model.fundApplicationYear = new Date(application_data?.fundApplicationYear).getTime()
  model.schoolContactNumber = application_data?.schoolContactNumber
  model.schoolContactEmail = application_data?.schoolContactEmail
  model.institutionPaymentBankName = application_data?.institutionPaymentBankName
  model.institutionPaymentAccountNumber = application_data?.institutionPaymentAccountNumber
  model.institutionPaymentAccountName = application_data?.institutionPaymentAccountName
  model.requiredFundAmount = `${application_data?.requiredFundAmount}`
  model.reasonsForFundRequest = application_data?.reasonsForFundRequest
  model.heartFeltThankyouLetterToFundDonor = application_data?.heartFeltThankyouLetterToFundDonor

  termsAndConditionsAgreement.value = application_data?.termsAndConditionsAgreement
  providedInformationAccuracy.value = application_data?.providedInformationAccuracy
}

const handleSubmitButtonClick = async (e: MouseEvent) => {
  e.preventDefault()

  await formRef.value?.validate(
    async (errors: Array<FormValidationError> | undefined) => {
      if (errors) return

      // loading state
      loadingState(true)

      const payload = {
        institutionTypeId: model.institutionTypeId,
        institutionId: model.institutionId,
        degreeDescription: model.degreeDescription,
        enrolmentTypeId: model.enrolmentTypeId,
        semesterId: model.semesterId,
        degreeStartYear: `${new Date(model.degreeStartYear ?? '').getFullYear()}`,
        degreeCompletionYear: `${new Date(model.degreeCompletionYear ?? '').getFullYear()}`,
        fundApplicationYear: `${new Date(model.fundApplicationYear ?? '').getFullYear()}`,
        schoolContactNumber: model.schoolContactNumber,
        schoolContactEmail: model.schoolContactEmail,
        reasonsForFundRequest: model.reasonsForFundRequest,
        schoolOrExamEnrollmentFormDocument: model.schoolOrExamEnrollmentFormDocument,
        schoolOrExamFeesDocument: model.schoolOrExamFeesDocument,
        institutionPaymentAccountNumber: model.institutionPaymentAccountNumber,
        institutionPaymentAccountName: model.institutionPaymentAccountName,
        institutionPaymentBankName: model.institutionPaymentBankName,
        requiredFundAmount: formatAmountToNumber(),
        heartFeltThankyouLetterToFundDonor: model.heartFeltThankyouLetterToFundDonor,
        providedInformationAccuracy: providedInformationAccuracy.value,
        termsAndConditionsAgreement: termsAndConditionsAgreement.value,
        channelId: model.channelId,
      }
      
      // check if first time submission
      const request = !hasFundApplication
        ? fundOrFinancialAidStore.ApplyAndSaveDraft(payload)
        : fundOrFinancialAidStore.UpdateApplicationAndSaveDraft({
            ...payload,
            applicationId: fundApplication.value?.applicationId
          })

      await request
        .then(response => {
          // show notification for login error
          if (response.responseCode == '00') {
            // get user fund application data
            getStudentFunApplicationDetails()
              .then(() => {
                // loading state
                loadingState(false)
                // notification
                useResponseNotification(
                  notification,
                  responseMessageStore.response.status,
                  responseMessageStore.response.title,
                  'Fund application successfully updated',
                  5000
                )

                // close form
                studentApplicationProgressStore.getIsCreateFundApplicationButtonClicked.value
                  ? studentApplicationProgressStore.setIsCreateFundApplicationButtonClicked(false)
                  : studentApplicationProgressStore.setIsEditFundApplicationButtonClicked(false)

                // scroll to top
                window.scroll(0, 0)
              })
              .catch(() => {
                // loading state
                loadingState(false)
                // notification
                showNotification(5000)
              })
          } else {
            // loading state
            loadingState(false)
            // notification
            showNotification(5000)
          }
        })
        .catch(() => {
          // loading state
          loadingState(false)
          // notification
          showNotification(5000)
        })
    }
  )
}

onBeforeMount(() => {
  if (hasFundApplication) {
    // update user profile
    updateModel(fundApplication.value)
  }

  // fetch dropdown options
  getAllDropdownOptions()
})
</script>

<template>
  <div class="student-portal-registration">
    <section class="header-footer">
      <section>
        <div class="caption">Fund Application</div>
        <div class="btn-container">
          <n-button
            v-if="!isEditButtonClicked"
            :disabled="isLoading"
            @click="handleBackButtonClick"
          >Back</n-button>
          <n-button
            v-else
            :disabled="isLoading"
            @click="handleCloseButtonClick"
          >Close</n-button>
        </div>
      </section>

      <section class="application-guide">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nulla eu auctor pulvinar, velit justo
          laoreet ex, ac aliquam sapien sem eu sapien. Nullam quis nulla libero. Nunc vel massa quis odio iaculis.
        </p>
      </section>
    </section>

    <section class="form-container">
      <n-form ref="formRef" :model="model" :rules="rules">
        <section>
          <h3>Academic Information</h3>

          <div class="form-item-row">
            <n-form-item>
              <div class="form-group">
                <label>Institution Type</label>
                <n-select
                  class="input"
                  size="large"
                  :bordered=" false"
                  :options="
                    systemUtilsStore.getInstitutionType?.map(institutionType => ({
                      label: institutionType?.institutionType,
                      value: JSON.stringify(institutionType)
                    }))
                  "
                  placeholder=""
                  v-model:value=" model.institutionType "
                  :disabled="isLoading || isApplicationComplete "
                  @update:value=" handleInstitutionTypeSelect"
                />
              </div>
            </n-form-item>
          </div>

          <div class="form-item-row">
            <n-form-item>
              <div class="form-group">
                <label>Search and select your school</label>
                <n-select
                  class="input"
                  size="large"
                  :bordered=" false"
                  :options="
                    systemUtilsStore.getInstitutions?.map(institution => ({
                      label: institution?.institutionName,
                      value: JSON.stringify(institution)
                    }))
                  "
                  placeholder=""
                  filterable
                  v-model:value=" model.institutionName "
                  :loading="isDropdownLoading"
                  :disabled="isLoading ||
                    !model.institutionType ||
                    isDropdownLoading ||
                    isApplicationComplete
                  "
                  @update:value=" handleInstitutionSelect"
                />
              </div>
            </n-form-item>
          </div>

          <div class="form-item-row">
            <n-form-item>
              <div class="form-group">
                <label>What kind of degree are you pursuing?</label>
                <n-input
                  class="input"
                  placeholder=""
                  size="large"
                  v-model:value="model.degreeDescription"
                  :disabled="isLoading ||isApplicationComplete"
                />
              </div>
            </n-form-item>
          </div>

          <div class="form-item-row">
            <n-form-item>
              <div class="form-group">
                <label>What is your enrollment type?</label>
                <n-select
                  class="input"
                  size="large"
                  :bordered=" false"
                  :options="
                    systemUtilsStore.getEnrolmentType?.map(enrolmentType => ({
                      label: enrolmentType?.enrolmentType,
                      value: JSON.stringify(enrolmentType)
                    }))
                  "
                  placeholder=""
                  v-model:value=" model.enrolmentType "
                  :disabled="isLoading ||isApplicationComplete "
                  @update:value=" handleEnrollmentTypeSelect"
                />
              </div>
            </n-form-item>
          </div>

          <div class="form-item-row">
            <n-form-item>
              <div class="form-group">
                <label>Select semester</label>
                <n-select
                  class="input"
                  size="large"
                  :bordered=" false"
                  :options="
                    systemUtilsStore.getInstitutionSemester?.map(semester => ({
                      label: semester?.semesterName,
                      value: JSON.stringify(semester)
                    }))
                  "
                  placeholder=""
                  v-model:value=" model.semester"
                  :loading="isDropdownLoading"
                  :disabled="isLoading ||
                    !model.institutionType ||
                    isDropdownLoading ||
                    isApplicationComplete
                  "
                  @update:value=" handleSemesterSelect"
                />
              </div>
            </n-form-item>
          </div>

          <div class="form-item-row col col-3">
            <n-form-item>
              <div class="form-group">
                <label>Degree start year</label>
                <n-date-picker
                  class="input"
                  size="large"
                  :bordered="false"
                  type="year"
                  clearable
                  placeholder=""
                  v-model:value="model.degreeStartYear"
                  :disabled="isLoading ||isApplicationComplete"
                />
              </div>
            </n-form-item>
            <n-form-item>
              <div class="form-group">
                <label>Degree completion year</label>
                <n-date-picker
                  class="input"
                  size="large"
                  :bordered="false"
                  type="year"
                  clearable
                  placeholder=""
                  v-model:value="model.degreeCompletionYear"
                  :disabled="isLoading ||isApplicationComplete"
                />
              </div>
            </n-form-item>
            <n-form-item>
              <div class="form-group">
                <label>Fund application year</label>
                <n-date-picker
                  class="input"
                  size="large"
                  :bordered="false"
                  type="year"
                  clearable
                  placeholder=""
                  v-model:value="model.fundApplicationYear"
                  :disabled="isLoading ||isApplicationComplete"
                />
              </div>
            </n-form-item>
          </div>

          <div class="form-item-row">
            <n-form-item>
              <div class="form-group">
                <label>School contact number</label>
                <n-input
                  class="input"
                  size="large"
                  :bordered="false"
                  placeholder=""
                  :allow-input="allowAccountNumberInput"
                  v-model:value="model.schoolContactNumber"
                  :disabled="isLoading ||isApplicationComplete"
                />
              </div>
            </n-form-item>
          </div>

          <div class="form-item-row">
            <n-form-item path="schoolContactEmail">
              <div class="form-group">
                <label>School email address</label>
                <n-input
                  class="input"
                  size="large"
                  :bordered="false"
                  placeholder=""
                  v-model:value="model.schoolContactEmail"
                  :disabled="isLoading ||isApplicationComplete"
                />
              </div>
            </n-form-item>
          </div>

          <div class="form-item-row col col-2 file-upload">
            <n-form-item>
              <div class="form-group">
                <label>School or exam enrollment form document</label>
                <div class="doc">
                  <n-upload
                    :max="1"
                    v-model:file-list="schoolFormDocumentFileListRef"
                    :file-list-style="{
                      backgroundColor: 'white'
                    }"
                    @before-upload="handleBeforeSchoolFormDocumentUpload"
                    @remove="handleRemoveSchoolFormDocument"
                  >
                    <n-button>
                      <div class="btn-text-container">
                        <span>
                          <Icon icon="ic:baseline-plus" />
                        </span>
                        <span>Select a file</span>
                      </div>
                    </n-button>
                  </n-upload>
                  <!-- <span class="file-name">{{ 'rebecca.jpg' }}</span> -->
                </div>
              </div>
            </n-form-item>
            <n-form-item>
              <div class="form-group">
                <!-- <label>Supporting attachment</label> -->
                <label>School or exam fees document</label>
                <div class="doc">
                  <n-upload
                    :max="1"
                    v-model:file-list="schoolFeesDocumentFileListRef"
                    :file-list-style="{
                      backgroundColor: 'white'
                    }"
                    @before-upload="handleBeforeSchoolFeesDocumentUpload"
                    @remove="handleRemoveSchoolFeesDocument"
                  >
                    <n-button>
                      <div class="btn-text-container">
                        <span>
                          <Icon icon="ic:baseline-plus" />
                        </span>
                        <span>Select a file</span>
                      </div>
                    </n-button>
                  </n-upload>
                  <!-- <span class="file-name">{{ 'rebecca.jpg' }}</span> -->
                </div>
              </div>
            </n-form-item>
          </div>
        </section>

        <section>
          <h3>School/Institution Account Information</h3>

          <div class="form-item-row col col-3">
            <n-form-item>
              <div class="form-group">
                <label>Bank Name</label>
                <n-input
                  class="input"
                  size="large"
                  :bordered="false"
                  placeholder=""
                  v-model:value="model.institutionPaymentBankName"
                  :disabled="isLoading ||isApplicationComplete"
                />
              </div>
            </n-form-item>
            <n-form-item>
              <div class="form-group">
                <label>Account number</label>
                <n-input
                  class="input"
                  size="large"
                  :bordered="false"
                  placeholder=""
                  :allow-input="allowAccountNumberInput"
                  v-model:value="model.institutionPaymentAccountNumber"
                  :disabled="isLoading ||isApplicationComplete"
                />
              </div>
            </n-form-item>
            <n-form-item>
              <div class="form-group">
                <label>Account Name </label>
                <n-input
                  class="input"
                  size="large"
                  :bordered="false"
                  placeholder=""
                  v-model:value="model.institutionPaymentAccountName"
                  :disabled="isLoading ||isApplicationComplete"
                />
              </div>
            </n-form-item>
          </div>

          <div class="form-item-row">
            <n-form-item>
              <div class="form-group">
                <label>Total Fund Amount</label>
                <label>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nulla eu auctor pulvinar, velit
                  justo laoreet ex, ac aliquam sapien sem eu sapien. Nullam quis nulla libero. Nunc vel massa quis odio
                  iaculis.
                </label>

                <div class="counter-container">
                  <div>
                    <n-button
                      text
                      :disabled="isLoading ||disableAmountCounterButton('-') || isApplicationComplete"
                      @click="handleAmountButtonClick('-')"
                    >
                      <span>
                        <Icon icon="ic:baseline-minus" />
                      </span>
                    </n-button>
                    <n-input
                      class="input"
                      size="large"
                      placeholder=""
                      :allow-input="allowAmountInput"
                      v-model:value="model.requiredFundAmount"
                      :disabled="isLoading ||isApplicationComplete"
                      @input="handleAmountInput"
                    />
                    <n-button
                      text
                        :disabled="isLoading ||disableAmountCounterButton('+') || isApplicationComplete"
                        @click="handleAmountButtonClick('+')"
                    >
                      <span>
                        <Icon icon="ic:baseline-plus" />
                      </span>
                    </n-button>
                  </div>
                </div>
              </div>
            </n-form-item>
          </div>
        </section>

        <section>
          <h3>Reflection Questions</h3>

          <div class="form-item-row">
            <n-form-item>
              <div class="form-group">
                <label>Reasons for fund request</label>
                <n-input
                  class="input textarea"
                  size="large"
                  :bordered="false"
                  type="textarea"
                  placeholder=""
                  v-model:value="model.reasonsForFundRequest"
                  :disabled="isLoading ||isApplicationComplete"
                />
              </div>
            </n-form-item>
          </div>

          <div class="form-item-row">
            <n-form-item>
              <div class="form-group">
                <label>Please write a heartfelt Thank you letter to our fund donor</label>
                <n-input
                  class="input textarea"
                  size="large"
                  :bordered="false"
                  type="textarea"
                  rows="8"
                  placeholder=""
                  v-model:value="model.heartFeltThankyouLetterToFundDonor"
                  :disabled="isLoading ||isApplicationComplete"
                />
              </div>
            </n-form-item>
          </div>
        </section>

        <section>
          <div class="form-item-row">
            <n-form-item>
              <div class="form-group">
                <n-checkbox
                  size="large"
                  v-model:checked="termsAndConditionsAgreement"
                  :disabled="isLoading"
                >
                  <span class="check-box">
                    I agree to the above waiver
                  </span>
                </n-checkbox>

                <n-checkbox
                  size="large"
                  v-model:checked="providedInformationAccuracy"
                  :disabled="isLoading"
                >
                  <span class="check-box">
                    I acknowledge that I have reviewed my entries and all information is accurate and complete. Once this info is submitted, I cannot make any changes to the application.
                  </span>
                </n-checkbox>
              </div>
            </n-form-item>
          </div>
        </section>
      </n-form>
    </section>

    <section class="header-footer">
      <section class="header-footer">
        <div class="btn-container">
          <n-button
            v-if="isEditButtonClicked"
            :disabled="isLoading"
            @click="handleCloseButtonClick"
          >Close</n-button>

          <n-button
            :loading="isLoading"
            :disabled="inputRequired || isLoading"
            @click="handleSubmitButtonClick"
          >Save Draft</n-button>
        </div>
      </section>
    </section>
  </div>
</template>

<style lang="scss" scoped>
div.student-portal-registration {
  padding: 50px 60px 80px;
  display: flex;
  flex-direction: column;
  row-gap: 30px;
  background-color: #ffffff;

  &>section {
    // header and footer
    &.header-footer {
      display: flex;
      flex-direction: column;
      row-gap: 30px;

      &>section:first-child {
        display: flex;
        row-gap: 20px;
        font-weight: 700;
        color: $base-color;

        // header
        &:first-child {
          justify-content: space-between;
        }

        // footer
        &:last-child {
          justify-content: flex-end;
        }

        // ----------------------------------------

        .caption {
          font-size: 25px;
        }

        .btn-container {
          display: flex;
          flex-flow: row wrap;
          row-gap: 8px;
          column-gap: 31px;
          align-items: center;

          .n-button {
            width: fit-content;
            height: 40px;
            border-radius: 20px;
            padding: 5px 20px;
            font-size: 16px;
            font-weight: 700 !important;
            // color: #ffffff;
            // background: $base-color;

            &:first-child {
              border: 1px solid $base-color;
              color: $base-color;
              background: #ffffff;
            }

            &:last-child {
              color: #ffffff;
              background: $base-color;
            }
          }
        }

      }

      // application guide
      &>section:last-child {
        &.application-guide {
          width: 768px;

          &>p {
            font-size: 16px;
            font-weight: 700;
            color: $base-color;
            line-height: 25px;
          }
        }
      }
    }

    // form container
    &.form-container {
      padding: 50px 40px;
      background: $base-color;

      &>.n-form {
        display: flex;
        flex-direction: column;
        row-gap: 30px;
        color: #ffffff;

        &>section {
          display: flex;
          flex-direction: column;
          row-gap: 10px;

          &>h3 {
            margin-bottom: 10px;
            font-size: 20px;
            font-weight: 800;
          }

          &>.form-item-row {
            display: flex;
            row-gap: 25px;

            &.col {
              flex-direction: row;

              &.col-2 {
                column-gap: 77px;

                &.file-upload {
                  display: flex;
                  justify-content: space-evenly;

                  .n-form-item {
                    width: fit-content;

                    .form-group  {
                      margin: 0 auto;
                    }
                  }
                }
              }

              &.col-3 {
                column-gap: 19px;
              }
            }

            .n-form-item {
              width: 100%;
              display: block;

              .form-group {
                width: 100%;
                display: flex;
                flex-direction: column;

                // input label
                &>label {
                  margin-bottom: 10px;
                  font-size: 16px;
                  font-weight: 700;
                  word-wrap: normal !important;
                }

                // input info guide

                &>.n-radio:not(&:last-child),
                &>.n-checkbox:not(&:last-child) {
                  margin-bottom: 10px;
                }

                // input (radio and checkbox)
                & span.radio,
                & span.check-box {
                  position: relative;
                  left: 15px;
                  font-size: 16px;
                  font-weight: normal;
                  line-height: 25px;
                  color: #ffffff;
                }

                // input (checkbox)
                & span.check-box {
                  max-width: 948px;
                  display: inline-block;
                  // top: -5px;
                }

                // input
                & .input {
                  width: 100%;
                  border-radius: 50px;
                  height: unset;
                  display: flex;
                  align-items: center;
                  font-size: 16px;
                  color: $base-color;
                  background: #ffffff;
                  overflow: hidden;

                  &.textarea {
                    height: unset;
                    border-radius: 10px;
                  }
                }

                // input (file upload)
                &>.doc {
                  display: flex;
                  justify-content: flex-start;
                  row-gap: 10px;
                  column-gap: 19px;
                  align-items: center;

                  .n-upload {
                    width: fit-content;

                    .n-button {
                      width: 287px;
                      height: 55px;
                      background: #D9D9D9;

                      .btn-text-container {
                        margin-left: -20px;
                        display: flex;
                        justify-content: flex-start;
                        row-gap: 10px;
                        align-items: center;
                        font-weight: 700;
                        color: $base-color;

                        &>span:first-child>* {
                          font-size: 30px;
                        }

                        &>span:last-child {
                          font-size: 18px;
                        }
                      }
                    }
                  }

                  .file-name {
                    // border: 2px solid red;
                    width: 611px;
                    height: fit-content;
                    padding: 10px 20px;
                    background: #848383;
                    font-size: 25px;
                  }
                }

                // counter container
                & .counter-container {
                  width: 965px;
                  margin: 0 auto;
                  padding: 50px 108px;
                  border: 2px solid $base-color;
                  background: #D9D9D9;

                  &>div {
                    display: flex;
                    row-gap: 20px;
                    column-gap: 108px;
                    align-items: center;

                    .n-button {
                      & span {
                        font-size: 30px;
                        font-weight: 700;
                      }
                    }

                    .n-input {
                      width: 365px;
                      border: 1px solid #23233F;
                      border-radius: 0;
                      display: flex;
                      align-items: center;
                      font-size: 16px;
                      background: #D9D9D9;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

// MEDIA QUERY

// XX-SM (<251px)
@media (max-width: 250.9px) {
  div.student-portal-registration {
    padding: 40px 10px;
    row-gap: 30px;

    &>section {

      // header and footer
      &.header-footer {
        flex-direction: column;
        row-gap: 40px;

        &>section:first-child {
          display: flex;
          flex-direction: column;
          row-gap: 20px;
          // ----------------------------------------

          .caption {
            font-size: 20px;
          }

          .btn-container {
            .n-button {
              width: 100%;
              height: 40px;
              border-radius: 8px;
              font-size: 15px;
              font-weight: normal !important;
            }
          }
        }

        // application guide
        &>section:last-child {
          &.application-guide {
            width: 100%;

            &>p {
              font-size: 16px;
              font-weight: normal;
              line-height: 25px;
            }
          }
        }
      }

      // form container
      &.form-container {
        padding: 50px 8px;

        &>.n-form {
          row-gap: 20px;

          &>section {
            row-gap: 10px;

            &>h3 {
              margin-bottom: 20px;
              font-size: 18px;
            }

            &>.form-item-row {
              row-gap: 10px;

              &.col {
                flex-direction: column;
              }

              .n-form-item {
                .form-group {
                  width: 100%;

                  // input label
                  &>label {
                    margin-bottom: 10px;
                    font-size: 16px;
                    font-weight: normal;
                  }

                  // input info guide
                  &>span.input-info {
                    margin-top: 15px;
                    font-size: 14px;
                    font-weight: normal;
                    line-height: 25px;
                  }

                  // input (radio and checkbox)
                  & span.radio,
                  & span.check-box {
                    font-size: 13px;
                    font-weight: normal;
                    line-height: 25px;
                  }

                  // input (radio)
                  & span.radio {
                    left: 0;
                  }

                  // input (checkbox)
                  & span.check-box {
                    top: unset;
                    left: unset;
                  }

                  // input
                  & .input {
                    width: 100%;
                    border-radius: 7px;
                    font-size: 15px;
                  }

                  // input (file upload)
                  &>.doc {
                    flex-direction: column;
                    row-gap: 10px;
                    align-items: flex-start;

                    .n-upload {
                      width: 100%;

                      .n-button {
                        width: 100%;
                        height: 40px;

                        .btn-text-container {
                          margin-left: unset;
                          font-weight: normal;

                          &>span:first-child>* {
                            font-size: 30px;
                          }

                          &>span:last-child {
                            font-size: 16px;
                          }
                        }
                      }
                    }

                    .file-name {
                      width: fit-content;
                      padding: 5px 10px;
                      font-size: 14px;
                    }
                  }

                  // counter container
                  & .counter-container {
                    width: 100%;
                    margin: 20px auto 0;
                    padding: 10px;
                    border: 1px solid $base-color;

                    &>div {
                      flex-wrap: wrap;
                      column-gap: 10%;
                      justify-content: center;


                      .n-button {
                        border: 1px solid $base-color;
                        width: 40%;
                        padding: 2px 5px;
                        order: 1;

                        & span {
                          font-size: 16px;
                          font-weight: 700;
                        }
                      }

                      .n-input {
                        width: 100%;
                        height: 45px;
                        border: 1px solid #23233F;
                        font-size: 15px;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

// XX-SM
@media (min-width: 251px) and (max-width: 350.9px) {
  div.student-portal-registration {
    padding: 40px 10px;
    row-gap: 30px;

    &>section {

      // header and footer
      &.header-footer {
        flex-direction: column;
        row-gap: 40px;

        &>section:first-child {
          display: flex;
          flex-direction: column;
          row-gap: 20px;
          // ----------------------------------------

          .caption {
            font-size: 20px;
          }

          .btn-container {
            .n-button {
              width: 100%;
              height: 40px;
              border-radius: 8px;
              font-size: 15px;
              font-weight: normal !important;
            }
          }
        }

        // application guide
        &>section:last-child {
          &.application-guide {
            width: 100%;

            &>p {
              font-size: 16px;
              font-weight: normal;
              line-height: 25px;
            }
          }
        }
      }

      // form container
      &.form-container {
        padding: 50px 8px;

        &>.n-form {
          row-gap: 20px;

          &>section {
            row-gap: 10px;

            &>h3 {
              margin-bottom: 20px;
              font-size: 18px;
            }

            &>.form-item-row {
              row-gap: 10px;

              &.col {
                flex-direction: column;
              }

              .n-form-item {
                .form-group {
                  width: 100%;

                  // input label
                  &>label {
                    margin-bottom: 10px;
                    font-size: 16px;
                    font-weight: normal;
                  }

                  // input info guide
                  &>span.input-info {
                    margin-top: 15px;
                    font-size: 14px;
                    font-weight: normal;
                    line-height: 25px;
                  }

                  // input (radio and checkbox)
                  & span.radio,
                  & span.check-box {
                    font-size: 13px;
                    font-weight: normal;
                    line-height: 25px;
                  }

                  // input (radio)
                  & span.radio {
                    left: 0;
                  }

                  // input (checkbox)
                  & span.check-box {
                    top: unset;
                    left: unset;
                  }

                  // input
                  & .input {
                    width: 100%;
                    border-radius: 7px;
                    font-size: 15px;
                  }

                  // input (file upload)
                  &>.doc {
                    flex-direction: column;
                    row-gap: 10px;
                    align-items: flex-start;

                    .n-upload {
                      width: 100%;

                      .n-button {
                        width: 100%;
                        height: 40px;

                        .btn-text-container {
                          margin-left: unset;
                          font-weight: normal;

                          &>span:first-child>* {
                            font-size: 30px;
                          }

                          &>span:last-child {
                            font-size: 16px;
                          }
                        }
                      }
                    }

                    .file-name {
                      width: fit-content;
                      padding: 5px 10px;
                      font-size: 14px;
                    }
                  }

                  // counter container
                  & .counter-container {
                    width: 100%;
                    margin: 20px auto 0;
                    padding: 30px 10px;
                    border: 1px solid $base-color;

                    &>div {
                      flex-wrap: wrap;
                      column-gap: 10%;
                      justify-content: center;


                      .n-button {
                        border: 1px solid $base-color;
                        width: 40%;
                        padding: 5px;
                        order: 1;

                        & span {
                          font-size: 17px;
                          font-weight: 700;
                        }
                      }

                      .n-input {
                        width: 100%;
                        height: 45px;
                        border: 1px solid #23233F;
                        font-size: 15px;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

// X-SM
@media (min-width: 351px) and (max-width: 575.9px) {
  div.student-portal-registration {
    padding: 50px 20px;
    row-gap: 40px;

    section {
      &>h3 {
        font-weight: 800;
      }

      // header and footer
      &.header-footer {
        flex-direction: column;
        row-gap: 40px;

        &>section:first-child {
          display: flex;
          flex-direction: column;
          row-gap: 20px;
          // ----------------------------------------

          .btn-container {
            .n-button {
              width: 40%;
              height: 45px;
              border-radius: 8px;
              font-size: 15px;
            }
          }
        }

        // application guide
        &>section:last-child {
          &.application-guide {
            width: 100%;

            &>p {
              font-size: 16px;
              line-height: 25px;
            }
          }
        }
      }

      // form container
      &.form-container {
        padding: 50px 8px;

        &>.n-form {
          row-gap: 20px;

          &>section {
            row-gap: 10px;


            &>.form-item-row {
              row-gap: 10px;

              &.col {
                flex-direction: column;
              }

              .n-form-item {
                .form-group {
                  width: 100%;

                  // input label
                  &>label {
                    margin-bottom: 10px;
                    font-weight: normal;
                  }

                  // input info guide
                  &>span.input-info {
                    margin-top: 15px;
                    font-size: 14px;
                    font-weight: normal;
                    line-height: 25px;
                  }

                  // input (radio and checkbox)
                  & span.radio,
                  & span.check-box {
                    font-size: 13px;
                    font-weight: normal;
                    line-height: 25px;
                  }

                  // input (radio)
                  & span.radio {
                    left: 0;
                  }

                  // input (checkbox)
                  & span.check-box {
                    top: unset;
                    left: unset;
                  }

                  // input
                  & .input {
                    width: 100%;
                    border-radius: 7px;
                    font-size: 15px;
                  }

                  // input (file upload)
                  &>.doc {
                    flex-direction: column;
                    row-gap: 10px;
                    align-items: flex-start;

                    .n-upload {
                      width: 100%;

                      .n-button {
                        width: 100%;
                        height: 45px;

                        .btn-text-container {
                          margin-left: unset;
                          font-weight: normal;

                          &>span:first-child>* {
                            font-size: 30px;
                          }

                          &>span:last-child {
                            font-size: 17px;
                          }
                        }
                      }
                    }

                    .file-name {
                      width: fit-content;
                      padding: 5px 10px;
                      font-size: 15px;
                    }
                  }

                  // counter container
                  & .counter-container {
                    width: 100%;
                    border: 1px solid $base-color;
                    border-radius: 7px;
                    margin: 20px auto 0;
                    padding: 40px 20px;

                    &>div {
                      flex-wrap: wrap;
                      column-gap: 10%;
                      justify-content: center;


                      .n-button {
                        border: 1px solid $base-color;
                        width: 30%;
                        height: 45px;
                        border-radius: 5px;
                        padding: 10px;
                        order: 1;

                        & span {
                          font-size: 20px;
                        }
                      }

                      .n-input {
                        width: 100%;
                        height: 55px;
                        border: 1px solid #23233F;
                        font-size: 18px;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

// SM
@media (min-width: 576px) and (max-width: 767.9px) {
  div.student-portal-registration {
    padding: 50px 20px 70px;
    row-gap: 40px;

    &>section {

      // header and footer
      &.header-footer {
        flex-direction: column;
        row-gap: 40px;

        &>section:first-child {
          display: flex;
          flex-direction: column;
          row-gap: 20px;
          // ----------------------------------------


          .btn-container {
            .n-button {
              border-radius: 8px;
              font-size: 16px;
            }
          }
        }

        // application guide
        &>section:last-child {
          &.application-guide {
            width: 100%;
          }
        }
      }

      // form container
      &.form-container {
        padding: 50px 8px;

        &>.n-form {
          row-gap: 20px;

          &>section {
            row-gap: 10px;


            &>.form-item-row {
              row-gap: 10px;

              &.col {
                flex-direction: column;
              }

              .n-form-item {
                .form-group {
                  width: 100%;

                  // input info guide
                  &>span.input-info {
                    margin-top: 15px;
                    font-size: 14px;
                    font-weight: normal;
                    line-height: 25px;
                  }

                  // input (radio and checkbox)
                  & span.radio,
                  & span.check-box {
                    font-size: 14px;
                    font-weight: normal;
                    line-height: 25px;
                  }

                  // input (radio)
                  & span.radio {
                    left: 0;
                  }

                  // input (checkbox)
                  & span.check-box {
                    top: unset;
                    left: unset;
                  }

                  // input
                  & .input {
                    width: 100%;
                    border-radius: 7px;
                    font-size: 15px;
                  }

                  // input (file upload)
                  &>.doc {
                    flex-direction: column;
                    row-gap: 10px;
                    align-items: flex-start;

                    .n-upload {
                      width: 100%;

                      .n-button {
                        width: 100%;
                        height: 45px;

                        .btn-text-container {
                          margin-left: unset;
                        }
                      }
                    }

                    .file-name {
                      width: fit-content;
                      padding: 5px 10px;
                      font-size: 16px;
                    }
                  }

                  // counter container
                  & .counter-container {
                    width: 100%;
                    border: 1px solid $base-color;
                    border-radius: 7px;
                    margin: 20px auto 0;
                    padding: 50px 20px;

                    &>div {
                      flex-wrap: wrap;
                      column-gap: 10%;
                      justify-content: center;


                      .n-button {
                        border: 1px solid $base-color;
                        width: 30%;
                        height: 50px;
                        border-radius: 5px;
                        padding: 10px;
                        order: 1;

                        & span {
                          font-size: 30px;
                        }
                      }

                      .n-input {
                        width: 100%;
                        height: 55px;
                        font-size: 18px;
                        border: 1px solid #23233F;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

// MD
@media (min-width: 768px) and (max-width: 991.9px) {
  div.student-portal-registration {
    padding: 50px 20px 70px;
    row-gap: 40px;

    &>section {

      // header and footer
      &.header-footer {
        flex-direction: column;
        row-gap: 40px;

        &>section:first-child {

          .btn-container {
            .n-button {
              border-radius: 8px;
              font-size: 16px;
            }
          }
        }

        // application guide
        &>section:last-child {
          &.application-guide {
            width: 100%;
          }
        }
      }

      // form container
      &.form-container {
        padding: 50px 20px;

        &>.n-form {
          row-gap: 20px;

          &>section {
            row-gap: 10px;

            &>.form-item-row {
              row-gap: 10px;

              &.col {
                &.col-2 {
                  column-gap: 20px;
                }
              }

              .n-form-item {
                .form-group {
                  width: 100%;

                  // input info guide
                  &>span.input-info {
                    margin-top: 15px;
                    font-size: 15px;
                    font-weight: normal;
                    line-height: 25px;
                  }

                  // input (radio and checkbox)
                  & span.radio,
                  & span.check-box {
                    font-size: 15px;
                    font-weight: normal;
                    line-height: 25px;
                  }

                  // input (radio)
                  & span.radio {
                    left: 0;
                  }

                  // input (checkbox)
                  & span.check-box {
                    top: unset;
                    left: unset;
                  }

                  // input
                  & .input {
                    width: 100%;
                    border-radius: 7px;
                    font-size: 15px;
                  }

                  // input (file upload)
                  &>.doc {
                    flex-direction: column;
                    row-gap: 10px;
                    align-items: flex-start;

                    .n-upload {
                      width: 100%;

                      .n-button {
                        width: 100%;
                        height: 45px;

                        .btn-text-container {
                          margin-left: unset;
                        }
                      }
                    }

                    .file-name {
                      width: fit-content;
                      padding: 5px 10px;
                    }
                  }

                  // counter container
                  & .counter-container {
                    width: 100%;
                    border-radius: 7px;
                    margin: 20px auto 0;
                    padding: 80px 20px;

                    &>div {
                      flex-wrap: wrap;
                      column-gap: 10%;
                      justify-content: center;


                      .n-button {
                        height: 50px;
                        padding: 20px 10px;
                      }

                      .n-input {
                        height: 70px;
                        border: 2px solid #23233F;
                        font-size: 18px;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

// LG
@media (min-width: 992px) and (max-width: 1200.9px) {
  div.student-portal-registration {
    padding: 70px 50px 80px;
    row-gap: 50px;

    &>section {

      // header and footer


      // form container
      &.form-container {
        padding: 60px 30px;

        &>.n-form {
          row-gap: 40px;

          &>section {
            row-gap: 20px;

            &>.form-item-row {
              row-gap: 10px;

              &.col {
                &.col-2 {
                  column-gap: 20px;
                }
              }

              .n-form-item {
                .form-group {
                  width: 100%;

                  // input info guide
                  &>span.input-info {
                    margin-top: 15px;
                    font-size: 15px;
                    line-height: 27px;
                  }

                  // input
                  & .input {
                    width: 100%;
                    font-size: 20px;
                  }

                  // counter container
                  & .counter-container {
                    width: 100%;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

// XL
// @media (min-width: 1201px) and (max-width: 1499.9px) {}

// XXL
// @media (min-width: 1500px) {
//   div.student-portal-registration {
//     padding: 90px 200px 118px;
//   }
// }
</style>

