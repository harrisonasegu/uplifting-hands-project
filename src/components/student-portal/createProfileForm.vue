<script lang="ts" setup>
import { computed, onBeforeMount, reactive, ref } from 'vue'
import {
  NForm,
  NFormItem,
  NInput,
  NSelect,
  NButton,
  NUpload,
  useNotification,
  type UploadFileInfo
} from 'naive-ui'

import {
  cloudinaryUnsignedUploadPreset,
  cloudinaryUserProfilePhotoUploadFolder
} from '@/api/cloudinary-config'

import { useFromBase64 } from '@/composables/base64'
import { useResponseNotification } from '@/composables/responseNotification'

import { useStudentApplicationProgressStore } from '@/stores/modules/studentApplicationProgress'
import { useResponseMessageStore } from '@/stores/common/responseMessage'
import { useAuthenticationStore } from '@/stores/modules/authentication'
import { useSystemUtilsStore } from '@/stores/modules/systemUtils'
import { useCloudinaryFileUploadStore } from '@/stores/common/cloudinaryFileUpload'

const notification = useNotification()

const studentApplicationProgressStore = useStudentApplicationProgressStore()
const responseMessageStore = useResponseMessageStore()
const userStore = useAuthenticationStore()
const systemUtilsStore = useSystemUtilsStore()
const cloudinaryFileUploadStore = useCloudinaryFileUploadStore()

const userProfile = userStore.getUserProfile

const isLoading = ref<boolean>(false)

const model = reactive({
  firstName: '',
  middleName: '',
  lastName: '',
  email: '',
  fileInBase64: '',
  street: '',
  address2: '',
  stateName: '',
  stateId: null,
  phoneNumber: '',
  genderName: '',
  genderId: null,
  maritalStatusName: '',
  maritalStatusId: null,
  nin: ''
})

const fileListRef = ref<UploadFileInfo[]>([])

const inputRequired = computed((): boolean =>
  model.firstName === '' ||
  model.middleName === '' ||
  model.lastName === '' ||
  model.email === '' ||
  model.fileInBase64 === '' ||
  model.street === '' ||
  model.address2 === '' ||
  model.stateId === null ||
  model.phoneNumber === '' ||
  model.genderId === null ||
  model.maritalStatusId === null ||
  model.nin === ''
)

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

const toJsonData = (jsonStr: string) => JSON.parse(jsonStr)

const allowNumberInput = (number: string) => !number || /^\d{0,11}$/.test(number)
const allowNinInput = (value: string) => !value || /^.{0,11}$/.test(value)

const updateModel = (user_data: any) => {
  model.firstName = user_data?.firstName
  model.middleName = user_data?.middleName
  model.lastName = user_data?.lastName
  model.email = user_data?.email
  model.fileInBase64 = user_data?.fileInBase64
  model.street = user_data?.address1
  model.address2 = user_data?.address2
  model.stateName = user_data?.stateName
  model.phoneNumber = user_data?.phoneNumber
  model.genderName = user_data?.gender
  model.maritalStatusName = user_data?.maritalStatus
  model.nin = useFromBase64(user_data?.nin ?? '')
}

const getUserProfile = async () => {
  const user = userStore.getUser

  return await userStore.GetUserProfile(user?.email)
}

const getProfileUtils = async () => {
  // update model
  updateModel(userProfile.value)

  const hasUtilsData = (
    systemUtilsStore.getGender.length &&
    systemUtilsStore.getMaritalStatus.length &&
    systemUtilsStore.getStateOfOrigin.length
  )

  if (!hasUtilsData) {
    // fetch dropdown data(state, gender, marital status)
    Promise.all([
      systemUtilsStore.GetStateOfOrigin(),
      systemUtilsStore.GetGender(),
      systemUtilsStore.GetMaritalStatus()
    ])
  }
}

const handleBackButtonClick = () => studentApplicationProgressStore.setIsCreateProfileButtonClicked(false)

const handleStateSelect = (json: string) => {
  const state = toJsonData(json)

  // update state params
  model.stateName = state?.stateName
  model.stateId = state?.stateOfOriginId
}

const handleGenderSelect = (json: string) => {
  const gender = toJsonData(json)

  // update gender params
  model.genderName = gender?.genderName
  model.genderId = gender?.genderId
}

const handleMaritalStatusSelect = (json: string) => {
  const maritalStatus = toJsonData(json)

  // update marital status params
  model.maritalStatusName = maritalStatus?.maritalStatus
  model.maritalStatusId = maritalStatus?.maritalStatusId
}

const handleBeforeUpload = async (data: { file: UploadFileInfo, fileList: UploadFileInfo[] }) => {
  // file formats are .jpeg, .jpg and .png
  if (!['image/jpeg', 'image/jpg', 'image/png'].includes(data.file.file?.type as any)) {
    // update response message
    responseMessageStore.updateResponse('Product Upload', 'error', 'Unsupported file format.')
    // show response message
    showNotification(5000)
    return false
  } else
    if (Math.round((data.file.file?.size as number) / 1000) > 2000) {
      // update response message
      responseMessageStore.updateResponse('Product Upload', 'error', 'File size shouldn\'t exceed 2Mb.')
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
        // model.fileInBase64 = dataUrl as string

        // upload to cloudinary
        const payload = {
          upload_preset: cloudinaryUnsignedUploadPreset,
          folder: cloudinaryUserProfilePhotoUploadFolder,
          file: dataUrl
        }
        
        await cloudinaryFileUploadStore.UploadApplicantProfilePhoto(payload)
          .then(response => {
            model.fileInBase64 = response.secure_url
          })
          .catch(() => {
            model.fileInBase64 = ''
            
            // notification
            showNotification(5000)
          })
      })
    }
}

const handleRemoveFile = () => {
  model.fileInBase64 = ''
}

const handleSubmitButtonClick = () => {
  // loading state
  loadingState(true)

  const payload = {
    email: model.email,
    firstName: model.firstName,
    lastName: model.lastName,
    middleName: model.middleName,
    phoneNumber: model.phoneNumber,
    address1: model.street,
    address2: model.address2,
    stateOfOriginId: model.stateId,
    genderId: model.genderId,
    maritalStatusId: model.maritalStatusId,
    userPicture: model.fileInBase64,
    nin: model.nin,
    roleId: userStore.getUser?.roleId
  }
  

  // update user profile
  userStore.UpdateUser(payload)
    .then(response => {
      if (response.responseCode == '00') {
        // get user data
        getUserProfile()
          .then(() => {
            // loading state
            loadingState(false)
            // notification
            showNotification(5000)
            
            // close form
            studentApplicationProgressStore.setIsCreateProfileButtonClicked(false)
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

// watch changes in user profile
onBeforeMount(() => getProfileUtils())
</script>

<template>
  <div class="student-portal-registration">
    <section class="header-footer">
      <div class="caption">Profile</div>
      <div class="btn-container">
        <n-button
          :disabled="isLoading"
          @click="handleBackButtonClick"
        >Back</n-button>
      </div>
    </section>

    <section class="form-container">
      <n-form ref="formRef">

        <div class="form-item-row col col-3">
          <n-form-item path="first_name">
            <div class="form-group">
              <label>First name</label>
              <n-input
                class="input"
                placeholder=""
                v-model:value="model.firstName"
                size="large"
                :disabled="isLoading || userProfile?.isProfileComplete"
               />
            </div>
          </n-form-item>

          <n-form-item path="middle_name">
            <div class="form-group">
              <label>Middle name</label>
              <n-input
                class="input"
                placeholder=""
                v-model:value="model.middleName"
                size="large"
                :disabled="isLoading || userProfile?.isProfileComplete"
              />
            </div>
          </n-form-item>

          <n-form-item path="last_name">
            <div class="form-group">
              <label>Last name</label>
              <n-input
                class="input" placeholder=""
                v-model:value="model.lastName"
                size="large"
                :disabled="isLoading || userProfile?.isProfileComplete"
              />
            </div>
          </n-form-item>
        </div>

        <div class="form-item-row col col-2">
          <n-form-item path="email">
            <div class="form-group">
              <label>Primary Email</label>
              <n-input
                class="input"
                placeholder=""
                v-model:value="model.email"
                size="large"
                disabled
              />
            </div>
          </n-form-item>

          <n-form-item path="state">
            <div class="form-group">
              <label>State of origin</label>
              <n-select
                class="input"
                size="large"
                :bordered="false"
                :options="systemUtilsStore.getStateOfOrigin?.map(state => ({
                  label: state?.stateName,
                  value: JSON.stringify(state)
                }))"
                placeholder=""
                filterable v-model:value="model.stateName" :disabled="isLoading || userProfile?.isProfileComplete"
                @update:value="handleStateSelect"
              />
            </div>
          </n-form-item>
        </div>

        <div class="form-item-row col col-2">
          <n-form-item path="gender">
            <div class="form-group">
              <label>Gender</label>
              <n-select
                class="input"
                size="large"
                :bordered="false"
                :options="systemUtilsStore.getGender?.map(gender => ({
                  label: gender?.gender,
                  value: JSON.stringify(gender)
                }))"
                placeholder=""
                v-model:value="model.genderName" :disabled="isLoading || userProfile?.isProfileComplete"
                @update:value="handleGenderSelect"
              />
            </div>
          </n-form-item>

          <n-form-item path="marital_status">
            <div class="form-group">
              <label>Marital Status</label>
              <n-select
                class="input"
                size="large"
                :bordered="false" :options="systemUtilsStore.getMaritalStatus?.map(maritalStatus => ({
                  label: maritalStatus?.maritalStatus,
                  value: JSON.stringify(maritalStatus)
                }))"
                placeholder=""
                v-model:value="model.maritalStatusName" :disabled="isLoading || userProfile?.isProfileComplete"
                @update:value="handleMaritalStatusSelect"
              />
            </div>
          </n-form-item>
        </div>

        <div class="form-item-row col col-2">
          <n-form-item path="phone_number">
            <div class="form-group">
              <label>Cellphone number</label>
              <n-input
                class="input"
                placeholder=""
                size="large"
                :allow-input="allowNumberInput"
                v-model:value="model.phoneNumber"
                :disabled="isLoading || userProfile?.isProfileComplete"
              />
            </div>
          </n-form-item>

          <n-form-item path="nin">
            <div class="form-group">
              <label>NIN</label>
              <n-input
                class="input"
                placeholder=""
                size="large"
                :allow-input="allowNinInput"
                v-model:value="model.nin"
                :disabled="isLoading || userProfile?.isProfileComplete"
              />
            </div>
          </n-form-item>
        </div>

        <div v-if="!userProfile?.isProfileComplete" class="form-item-row">
          <n-form-item path="file">
            <div class="form-group">
              <label>Picture upload</label>
              <div class="doc">
                <n-upload
                  :max="1"
                  v-model:file-list="fileListRef"
                  :file-list-style="{
                    backgroundColor: 'white'
                  }"
                  @before-upload="handleBeforeUpload"
                  @remove="handleRemoveFile"
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

        <div class="form-item-row">
          <n-form-item path="street">
            <div class="form-group">
              <label>Address 1</label>
              <n-input
                class="input textarea"
                type="textarea"
                rows="2"
                placeholder=""
                size="large"
                v-model:value="model.street"
                :disabled="isLoading || userProfile?.isProfileComplete"
              />
            </div>
          </n-form-item>
        </div>

        <div class="form-item-row">
          <n-form-item path="address2">
            <div class="form-group">
              <label>Address 2</label>
              <n-input
                class="input textarea"
                type="textarea"
                rows="2"
                placeholder=""
                size="large"
                v-model:value="model.address2"
                :disabled="isLoading || userProfile?.isProfileComplete"
              />
            </div>
          </n-form-item>
        </div>
      </n-form>
    </section>

    <section v-if="!userProfile?.isProfileComplete" class="header-footer">
      <div class="btn-container">
        <n-button
          :loading="isLoading"
          :disabled="inputRequired || isLoading"
          @click="handleSubmitButtonClick"
        >Submit</n-button>
      </div>
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
      flex-wrap: wrap;
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
          font-size: 18px;
          font-weight: 700 !important;
          color: $base-color;
          background: $base-color;

          // &:first-child {
          //   visibility: hidden;
          //   background: #ffffff;
          // }

          &:last-child {
            color: #ffffff;
          }
        }
      }
    }

    // form container
    &.form-container {
      padding: 60px 47px 80px;
      background: $base-color;

      &>.n-form {
        display: flex;
        flex-direction: column;
        // row-gap: 30px;
        color: #ffffff;

        &>.form-item-row {
          display: flex;
          // row-gap: 54px;
          row-gap: 25px;

          &.col {
            flex-direction: row;

            &.col-2 {
              column-gap: 77px;
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
                font-size: 18px;
                font-weight: 700;
              }

              // input info guide
              &>span.input-info {
                margin-top: 23px;
                font-size: 18px;
                font-weight: 800;
                line-height: 30.26px;
              }

              // input (checkbox)
              & span.check-box {
                position: relative;
                top: -5px;
                left: 15px;
                font-size: 32px;
                font-weight: 800;
                line-height: 36px;
                color: #ffffff;
              }

              // input
              & .input {
                width: 100%;
                border-radius: 50px;
                height: unset;
                display: flex;
                align-items: center;
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
    row-gap: 0px;

    &>section {

      // header and footer
      &.header-footer {
        margin-bottom: 2pc;

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

      // form container
      &.form-container {
        padding: 50px 8px;

        &>.n-form {
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

                // input (checkbox)
                & span.check-box {
                  top: 3px;
                  left: -9px;
                  font-size: 12px;
                  font-weight: normal;
                  line-height: 25px;
                }

                // input
                & .input {
                  width: 100%;
                  border-radius: 7px;
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
    row-gap: 0px;

    &>section {

      // header and footer
      &.header-footer {
        margin-bottom: 2pc;

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

      // form container
      &.form-container {
        padding: 50px 8px;

        &>.n-form {
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

                // input (checkbox)
                & span.check-box {
                  top: 3px;
                  left: -9px;
                  font-size: 12px;
                  font-weight: normal;
                  line-height: 25px;
                }

                // input
                & .input {
                  width: 100%;
                  border-radius: 7px;
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
    row-gap: 0px;

    &>section {

      // header and footer
      &.header-footer {
        margin-bottom: 2pc;

        .caption {
          font-size: 24px;
        }

        .btn-container {
          .n-button {
            height: 45px;
            border-radius: 8px;
            font-size: 15px;
          }
        }
      }

      // form container
      &.form-container {
        padding: 50px 8px;

        &>.n-form {
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
                  font-size: 17px;
                }

                // input info guide
                &>span.input-info {
                  margin-top: 15px;
                  font-size: 14px;
                  font-weight: normal;
                  line-height: 25px;
                }

                // input (checkbox)
                & span.check-box {
                  top: 3px;
                  left: -9px;
                  font-size: 12px;
                  font-weight: normal;
                  line-height: 25px;
                }

                // input
                & .input {
                  width: 100%;
                  border-radius: 7px;
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

                        &>span:first-child>* {
                          font-size: 25px;
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

// SM
@media (min-width: 576px) and (max-width: 767.9px) {
  div.student-portal-registration {
    padding: 50px 20px 70px;
    row-gap: 40px;

    &>section {

      // header and footer
      &.header-footer {

        .btn-container {
          .n-button {
            border-radius: 8px;
            font-size: 16px;
          }
        }
      }

      // form container
      &.form-container {
        padding: 50px 8px;

        &>.n-form {
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
                }

                // input info guide
                &>span.input-info {
                  margin-top: 15px;
                  font-size: 14px;
                  font-weight: normal;
                  line-height: 25px;
                }

                // input (checkbox)
                & span.check-box {
                  top: 3px;
                  left: -9px;
                  font-size: 12px;
                  font-weight: normal;
                  line-height: 25px;
                }

                // input
                & .input {
                  width: 100%;
                  border-radius: 7px;
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

                        &>span:first-child>* {
                          font-size: 25px;
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
                    font-size: 16px;
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

        .btn-container {
          .n-button {
            border-radius: 8px;
            font-size: 16px;
          }
        }
      }

      // form container
      &.form-container {
        padding: 50px 20px;

        &>.n-form {
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

                // input (checkbox)
                & span.check-box {
                  top: -3px;
                  left: unset;
                  font-size: 14px;
                  font-weight: normal;
                  line-height: 25px;
                }

                // input
                & .input {
                  width: 100%;
                  border-radius: 7px;
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
    padding: 50px 60px 80px;

    &>section {

      // header and footer

      // form container
      &.form-container {
        padding: 60px 30px;

        &>.n-form {
          row-gap: 30px;

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

                // input label

                // input info guide
                &>span.input-info {
                  margin-top: 15px;
                  font-size: 15px;
                  line-height: 27px;
                }

                // input (checkbox)
                &>.n-checkbox {
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

// XL
// @media (min-width: 1201px) and (max-width: 1499.9px) {}

// XXL
// @media (min-width: 1500px) {
//   div.student-portal-registration {
//     padding: 50px 200px 100px;
//   }
// }
</style>
