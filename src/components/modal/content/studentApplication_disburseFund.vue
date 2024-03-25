<script setup lang="ts">
import { computed, reactive, ref } from 'vue'

import {
    NForm,
    NFormItem,
    NUpload,
    NInput,
    NButton,
    useNotification
} from 'naive-ui'

import type {
    FormInst, UploadFileInfo
} from 'naive-ui'

import type { FundApplication_Interface } from '@/interface/fundOrFinancialAid'
import type { ReviewApplication_Interface } from '@/interface/fundOrFinancialAid'

import { useResponseNotification } from '@/composables/responseNotification'

import { useResponseMessageStore } from '@/stores/common/responseMessage'
import { useDataTableButtonClickStore } from '@/stores/common/dataTableButtonClick'
import { useFundOrFinancialAidStore } from '@/stores/modules/fundOrFinancialAid'

const props = defineProps({
    currentTab: Number
})
const emit = defineEmits(['actionCompleted'])

const notification = useNotification()

const responseMessageStore = useResponseMessageStore()
const dataTableButtonClickStore = useDataTableButtonClickStore()
const fundOrFinancialAidStore = useFundOrFinancialAidStore()

const dataTableClickedButtonProp = dataTableButtonClickStore.getClickedButtonProp

const isLoading = ref<boolean>(false)

const formRef = ref<FormInst | null>(null)

const model = reactive({
    comment: '',
    proofOfPayment: '',
})

const proofOfPaymentFileListRef = ref<UploadFileInfo[]>([])

const inputRequired = computed((): boolean =>
  model.comment === '' || model.proofOfPayment === ''
)

function showNotification(duration: number) {
    useResponseNotification(
        notification,
        responseMessageStore.response.status,
        responseMessageStore.response.title,
        responseMessageStore.response.message,
        duration
    )
}

function loadingState(state: boolean) {
    isLoading.value = state
}

async function handleBeforeProofOfPaymentDocumentUpload (data: { file: UploadFileInfo, fileList: UploadFileInfo[] }) {
    // file formats are .jpeg, .jpg and .png
    if (!['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'].includes(data.file.file?.type as any)) {

        // update response message
        responseMessageStore.updateResponse('Document Upload', 'error', 'Unsupported file format. Upload Image/PDF file.')
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

            fileReader.addEventListener('load', () => {
                const dataUrl = fileReader.result as string
                model.proofOfPayment = dataUrl as string
            })
        }
}

function handleRemoveSchoolFormDocument () {
    model.proofOfPayment = ''
}

function clearInputFields() {
  model.comment === ''
  model.proofOfPayment === ''
}

function disburseApplication() {
  // loading state
  loadingState(true)

  const data = dataTableClickedButtonProp.data as ReviewApplication_Interface

  const payload = {
    applicationId: data.applicationId,
    disburse_Comments: model.comment,
    proofOfPaymentUpload: model.proofOfPayment
  }

  // proceed to login
  fundOrFinancialAidStore.DisburseApplication(props.currentTab as number, payload)
    .then(response => {
      // show notification for login error
      if (response.responseCode === '00') {
        // clear input
        clearInputFields()
        // emit event to close main modal
        emit('actionCompleted')
      }

      // loading state
      loadingState(false)
      // notification
      showNotification(5000)
    })
    .catch(() => {
      // loading state
      loadingState(false)
      // notification
      showNotification(5000)
    })
}

function handleAuthButtonClick(e: MouseEvent) {
  // check specific button clicked
  switch (dataTableClickedButtonProp.buttonClicked) {
    case 'disburse fund':
      disburseApplication()
      break
  }
}
</script>

<template>
    <div class="form-container">
        <n-form ref="formRef">
            <n-form-item path="comment">
                <div class="form-group">
                    <n-input
                        type="textarea"
                        class="input"
                        :bordered="false"
                        size="medium"
                        placeholder="Enter reason for action"
                        v-model:value="model.comment"
                        :disabled="isLoading"
                        @keydown.enter.prevent
                    />
                </div>
            </n-form-item>

            <n-form-item path="file">
                <div class="form-group">
                    <b>Proof of payment document</b>
                    <div class="doc">
                        <n-upload
                            :max="1"
                            v-model:file-list="proofOfPaymentFileListRef"
                            @before-upload="handleBeforeProofOfPaymentDocumentUpload"
                            @remove="handleRemoveSchoolFormDocument"
                        >
                            <n-button size="medium" style="margin-top: 5px;">Upload</n-button>
                        </n-upload>
                    </div>
                </div>
            </n-form-item>

            <div class="submit-btn-container">
                <n-button
                    :disabled="inputRequired || isLoading"
                    round
                    type="primary" 
                    :loading="isLoading"
                    @click="handleAuthButtonClick"
                >Submit
                </n-button>
            </div>
        </n-form>
    </div>
</template>

<style lang="scss" scoped>
// form container
div.form-container {
    border-radius: 30px;
    padding: 10px 0;
    display: flex;
    flex-direction: column;
    flex-direction: column;
    row-gap: 30px;
    color: $base-color;
    // background-color: #FFF;

    &>h2 {
        font-size: 30px;
        font-weight: 800;
        line-height: 21px;
        text-align: center;
    }

    &>h4 {
        font-size: 20px;
        font-weight: 600;
        line-height: 21px;
        letter-spacing: 0em;
    }

    &>.n-form {
        display: flex;
        flex-direction: column;
        row-gap: 20px;

        &>.n-form-item {
            display: flex;

            div.form-group {
                width: 350px;
                display: flex;
                flex-direction: column;

                &>.input-info {
                    padding-top: 10px;
                }

                &>label {
                    width: 100%;
                    margin-bottom: 10px;
                    font-weight: 400;
                }

                & span.check-box,
                & a.auth-url {
                    position: relative;
                    top: -5px;
                    left: 5px;
                    line-height: 36px;
                    color: $base-color;
                }

                & a.auth-url {
                    position: static;
                    margin-top: 10px;
                }

                & .input {
                    width: 350px;
                    border: 1px solid $base-color;
                    // border-radius: 50px;
                    display: flex;
                    align-items: center;
                    overflow: hidden;
                }
            }
        }

        &>div.submit-btn-container {
            margin-top: 10px;
            display: flex;
            justify-content: flex-end;

            &>.n-button {
                width: fit-content;
                height: 42px;
                // border-radius: 20px;
                align-items: center;
                font-size: 16px;
                font-weight: 700 !important;
                line-height: 48px;
                color: #FFF;
                background: $base-color;

                &:hover {
                    color: #404058;
                }
            }
        }
    }
}

// MEDIA QUERY

// XX-SM (<251px)
@media (max-width: 250.9px) {
    // form container
    div.form-container {
        border-radius: unset;
        padding: 20px 0;

        &>h2 {
            font-size: 18px;
        }

        &>h4 {
            font-size: 18px;
        }

        &>.n-form {
            &>.n-form-item {
                div.form-group {
                    width: 100%;

                    &>label {
                        margin-bottom: 10px;
                        font-size: 16px;
                        font-weight: normal;
                    }

                    &>span.input-info {
                        margin-top: 15px;
                        font-size: 14px;
                        font-weight: normal;
                        line-height: 25px;
                    }

                    & span.check-box {
                        top: 3px;
                        left: -9px;
                        font-size: 14px;
                        font-weight: normal;
                        line-height: 25px;
                    }

                    &>.input {
                        width: 100%;
                        border-radius: 7px;
                        font-size: 15px;
                    }

                    &>.n-checkbox {
                        width: 100%;
                        display: flex;
                        flex-direction: column;
                    }
                }
            }

            &>div.submit-btn-container {
                &>.n-button {
                    width: 100%;
                    height: 40px;
                    border-radius: 7px;
                    border-radius: 7px;
                    font-size: 13px;
                    line-height: 48px;
                }
            }
        }
    }
}

// XX-SM
@media (min-width: 251px) and (max-width: 350.9px) {
    // form container
    div.form-container {
        border-radius: unset;
        padding: 20px 0;

        &>h2 {
            font-size: 18px;
        }

        &>h4 {
            font-size: 18px;
        }

        &>.n-form {
            &>.n-form-item {
                display: unset;

                div.form-group {
                    width: 100%;

                    &>label {
                        margin-bottom: 10px;
                        font-weight: normal;
                    }

                    &>span.input-info {
                        margin-top: 15px;
                        font-size: 14px;
                        font-weight: normal;
                        line-height: 25px;
                    }

                    & span.check-box {
                        top: 3px;
                        left: -9px;
                        font-size: 14px;
                        font-weight: normal;
                        line-height: 25px;
                    }

                    &>.input {
                        width: 100%;
                        border-radius: 7px;
                        font-size: 15px;
                    }

                    &>.n-checkbox {
                        width: 100%;
                        display: flex;
                        flex-direction: column;
                    }
                }
            }

            &>div.submit-btn-container {
                &>.n-button {
                    width: 100%;
                    height: 40px;
                    border-radius: 7px;
                    border-radius: 7px;
                    font-size: 13px;
                    line-height: 48px;
                }
            }
        }
    }
}

// X-SM
@media (min-width: 351px) and (max-width: 575.9px) {
    // form container
    div.form-container {
        border-radius: 10px;
        padding: 30px 0;

        &>h2 {
            font-size: 22px;
        }

        &>h4 {
            font-size: 18px;
        }

        &>.n-form {
            &>.n-form-item {
                display: unset;

                div.form-group {
                    width: 100%;

                    &>label {
                        margin-bottom: 10px;
                        font-size: 17px;
                    }

                    &>span.input-info {
                        margin-top: 15px;
                        font-size: 14px;
                        font-weight: normal;
                        line-height: 25px;
                    }

                    & span.check-box {
                        top: -3px;
                        left: unset;
                        font-size: 14px;
                        font-weight: normal;
                        line-height: 25px;
                    }

                    &>.input {
                        width: 100%;
                        border-radius: 7px;
                    }

                    &>.n-checkbox {
                        width: 100%;
                    }
                }
            }

            &>div.submit-btn-container {
                &>.n-button {
                    width: 100%;
                    height: 45px;
                    border-radius: 7px;
                    border-radius: 7px;
                    font-size: 14px;
                }
            }
        }
    }
}

// SM
@media (min-width: 576px) and (max-width: 767.9px) {
    // form container
    div.form-container {
        border-radius: 10px;
        padding: 50px;

        &>h2 {
            font-size: 24px;
        }

        &>h4 {
            font-size: 18px;
        }

        &>.n-form {
            &>.n-form-item {
                display: unset;

                div.form-group {
                    width: 100%;

                    &>label {
                        margin-bottom: 10px;
                        font-size: 18px;
                    }

                    &>span.input-info {
                        margin-top: 15px;
                        font-size: 15px;
                        font-weight: normal;
                        line-height: 25px;
                    }

                    & span.check-box {
                        top: -3px;
                        left: unset;
                        font-size: 15px;
                        font-weight: normal;
                        line-height: 25px;
                    }

                    &>.input {
                        width: 100%;
                        border-radius: 7px;
                    }

                    &>.n-checkbox {
                        width: 100%;
                    }
                }
            }

            &>div.submit-btn-container {
                display: flex;
                justify-content: center;

                &>.n-button {
                    width: 80%;
                    border-radius: 7px;
                    border-radius: 7px;
                    font-size: 15px;
                }
            }
        }
    }
}

// MD
@media (min-width: 768px) and (max-width: 991.9px) {
    // form container
    div.form-container {
        // width: 100%;
        border-radius: 10px;

        &>h2 {
            font-size: 26px;
        }

        &>h4 {
            font-size: 17.5px;
        }


        &>.n-form {
            row-gap: 0;

            &>.n-form-item {
                display: unset;

                div.form-group {
                    width: 100%;

                    &>label {
                        margin-bottom: 10px;
                    }

                    &>span.input-info {
                        margin-top: 15px;
                        font-size: 15px;
                        font-weight: normal;
                        line-height: 25px;
                    }

                    & span.check-box {
                        top: -3px;
                        left: unset;
                        font-size: 15px;
                        font-weight: normal;
                        line-height: 25px;
                    }

                    &>.input {
                        width: 100%;
                        border-radius: 7px;
                    }

                    &>.n-checkbox {
                        width: 100%;
                    }
                }
            }

            &>div.submit-btn-container {
                &>.n-button {
                    width: 100%;
                    border-radius: 7px;
                    font-size: 15px;
                }
            }
        }
    }
}

// LG
@media (min-width: 992px) and (max-width: 1200.9px) {
    // form container
    div.form-container {
        // max-width: 350px;
        border-radius: 20px;

        &>.n-form {
            &>.n-form-item {
                .form-group {
                    &>span.input-info {
                        margin-top: 15px;
                        font-size: 15px;
                        line-height: 27px;
                    }

                    & span.check-box {
                        // font-size: 14px;
                        line-height: 25px;
                    }

                    &>.input {
                        width: 100% !important;
                    }

                    &>.n-checkbox {
                        width: 100%;
                    }
                }
            }

            &>.submit-btn-container {
                display: flex;
                justify-content: flex-start;

                &>.n-button {
                    width: 100%;
                    font-size: 15px !important;
                }
            }
        }
    }
}

// XL
// @media (min-width: 1201px) and (max-width: 1499.9px) {}

// XXL
// @media (min-width: 1500px) {}
</style>
