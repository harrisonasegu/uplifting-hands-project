<script setup lang="ts">
import { ref } from 'vue'
import {
    useNotification,
    NButton
} from 'naive-ui'

import { useResponseNotification } from '@/composables/responseNotification'

import { useStudentApplicationProgressStore } from '@/stores/modules/studentApplicationProgress'
import { useAuthenticationStore } from '@/stores/modules/authentication'
import { useResponseMessageStore } from '@/stores/common/responseMessage'
import { useSystemUtilsStore } from '@/stores/modules/systemUtils'
import { useFundOrFinancialAidStore } from '@/stores/modules/fundOrFinancialAid'

const notification = useNotification()

const studentApplicationProgressStore = useStudentApplicationProgressStore()
const userStore = useAuthenticationStore()
const responseMessageStore = useResponseMessageStore()
const systemUtilsStore = useSystemUtilsStore()
const fundOrFinancialAidStore = useFundOrFinancialAidStore()

const fundApplication = fundOrFinancialAidStore.getActiveFundApplicationByUserId

const statusList = systemUtilsStore.getApplicationStatus?.map(status => status?.statusName)

const fundApplicationStatusListIndex = statusList?.indexOf(fundApplication.value?.status as string)

const fundApplicationStatusItem = systemUtilsStore.getApplicationStatus[fundApplicationStatusListIndex]
const fundApplicationDescription = fundApplicationStatusItem?.statusDescription.replace('\'', '')

const isLoading = ref<boolean>(false)

const loadingState = (state: boolean) => {
    isLoading.value = state
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

const handleEditButtonClick = () => studentApplicationProgressStore.setIsEditFundApplicationButtonClicked(true)

const getStudentFunApplicationDetails = async () => {
    const user = userStore.getUser

    return await fundOrFinancialAidStore.GetActiveFundApplicationByUserId(user?.userId)
}

const handleSubmitButtonClick = async () => {
    // preloader state
    loadingState(true)

    const applicationId = fundApplication.value?.applicationId as number

    await fundOrFinancialAidStore.SubmitApplication({ applicationId })
        .then(response => {
          // show notification for login error
            if (response.responseCode == '00') {
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
</script>

<template>
    <div class="page-view">
        <div class="application-container">
            <div class="contents">
                <div class="caption-sumit-btn">
                    <div class="caption">
                        <h2>{{ fundApplication?.applicantName }}</h2>
                        <p>
                            {{ fundApplicationDescription }}
                        </p>
                    </div>
                    <div class="sumit-application">
                        <div class="submit-application-btn">
                            <n-button
                                :loading="isLoading"
                                :disabled="isLoading"
                                @click="handleSubmitButtonClick"
                            >Submit Application</n-button>
                        </div>
                    </div>
                </div>

                <div class="complete-edit-content">
                    <h2>Fund Application</h2>

                    <div class="complete-edit">
                        <div class="complete">
                            <h3>{{ fundApplication?.status }}</h3>
                        </div>
                        <div class="edit-btn">
                            <n-button
                                @click="handleEditButtonClick"
                            >Edit</n-button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
div.page-view {
    &>.application-container {
        // padding: 50px 60px;
        padding:  1.5px;
        background-color: #D9D9D9;

        // Content
        &>.contents {
            display: flex;flex-direction: column;
            row-gap: 30px;
            background-color: $base-color;

            // caption-sumit-btn
            &>.caption-sumit-btn {
                padding: 30px;
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                row-gap: 30px;

                // caption
                .caption {
                    width: 631px;
                    color: #fff;

                    h2 {
                        margin-bottom: 10px;
                        font-size: 28px;
                        font-weight: 700;
                        line-height: 48px;
                        letter-spacing: 0em;
                        text-align: left;
                    }

                    p {
                        font-size: 16px;
                        font-weight: 700;
                        line-height: unset;
                        text-align: left;
                    }
                }

                &>.sumit-application {
                    &>.submit-application-btn {
                        // padding-top: 30px;

                        .n-button {
                            width: fit-content;
                            height: 45px;
                            border-radius: 20px;
                            font-size: 17px;
                            font-weight: 800;
                            line-height: 36px;
                            text-align: center;
                            color: $base-color;
                            background-color: #fff;
                        }
                    }
                }
            }


            &>.complete-edit-content {
                padding: 30px;
                display: flex;
                flex-wrap: wrap;
                row-gap: 10px;
                justify-content: space-between;
                align-items: center;
                background-color: #fff;

                h2 {
                    width: fit-content;
                    text-align: center;
                    font-size: 30px;
                    font-weight: 800;
                }

                &>.complete-edit {
                    width: fit-content;
                    display: flex;
                    row-gap: 20px;
                    column-gap: 30px;
                    justify-content: center;
                    align-items: center;

                    &>.complete {
                        h3 {
                            font-size: 24px;
                            font-weight: 700;
                            line-height: 36px;
                        }
                    }

                    &>.edit-btn {
                        .n-button {
                            width: 120px;
                            height: 45px;
                            font-size: 18px;
                            font-weight: 700;
                            line-height: 30px;
                            border-radius: 50px;
                            text-align: left;
                            color: #fff;
                            background-color: $base-color;

                            &:hover {
                                color: #404058;
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
    div.page-view {
        &>.application-container {
            padding: 0;

            // Content
            &>.contents {
                row-gap: 40px;

                // caption-sumit-btn
                &>.caption-sumit-btn {
                    justify-content: center;

                    // caption
                    .caption {
                        width: 100%;

                        h2 {
                            text-align: center;
                            font-size: 20px;
                        }

                        p {
                            text-align: center;
                            font-size: 15px;
                            font-weight: unset;
                        }
                    }

                    &>.sumit-application {
                        &>.submit-application-btn {
                            width: 100%;

                            .n-button {
                                width: 100%;
                                height: 45px;
                                border-radius: 8px;
                                padding: 5px 10px;
                                display: flex;
                                font-size: 15px;
                            }
                        }
                    }
                }


                &>.complete-edit-content {
                    padding: 30px 10px;
                    justify-content: center;

                    h2 {
                        font-size: 18px;
                        font-weight: 700;
                    }

                    &>.complete-edit {
                        width: 100%;
                        display: flex;
                        flex-direction: column;
                        align-items: center;

                        &>.complete {
                            h3 {
                                font-size: 16px;
                            }
                        }

                        &>.edit-btn {
                            width: 100%;
                            .n-button {
                                width: 100%;
                                height: 45px;
                                border-radius: 8px;
                                padding: 5px;
                                font-size: 15px;
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
    div.page-view {
        &>.application-container {
            padding: 0;

            // Content
            &>.contents {
                row-gap: 40px;

                // caption-sumit-btn
                &>.caption-sumit-btn {
                    justify-content: center;

                    // caption
                    .caption {
                        width: 100%;

                        h2 {
                            text-align: center;
                            font-size: 20px;
                        }

                        p {
                            text-align: center;
                            font-size: 15px;
                            font-weight: unset;
                        }
                    }

                    &>.sumit-application {
                        &>.submit-application-btn {
                            width: 100%;

                            .n-button {
                                width: 170px;
                                height: 45px;
                                border-radius: 8px;
                                padding: 5px 10px;
                                display: flex;
                                font-size: 15px;
                            }
                        }
                    }
                }


                &>.complete-edit-content {
                    padding: 30px 10px;
                    justify-content: center;

                    h2 {
                        font-size: 18px;
                        font-weight: 700;
                    }

                    &>.complete-edit {
                        width: 100%;
                        padding: 30px 10px 40px;
                        display: flex;
                        flex-direction: column;
                        align-items: center;

                        &>.complete {
                            h3 {
                                font-size: 18px;
                            }
                        }

                        &>.edit-btn {
                            .n-button {
                                height: 45px;
                                border-radius: 8px;
                                padding: 5px;
                                font-size: 15px;
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
    div.page-view {
        &>.application-container {
            padding: 0;

            // Content
            &>.contents {
                row-gap: 40px;

                // caption-sumit-btn
                &>.caption-sumit-btn {
                    justify-content: center;

                    // caption
                    .caption {
                        width: 100%;

                        h2 {
                            text-align: center;
                            font-size: 22px;
                        }

                        p {
                            text-align: center;
                            font-size: 16px;
                            font-weight: unset;
                        }
                    }

                    &>.sumit-application {
                        &>.submit-application-btn {
                            width: 100%;

                            .n-button {
                                width: 200px;
                                height: 45px;
                                border-radius: 8px;
                                padding: 5px 10px;
                                display: flex;
                                font-size: 16px;
                            }
                        }
                    }
                }


                &>.complete-edit-content {
                    padding: 30px 10px;
                    justify-content: center;

                    h2 {
                        font-size: 22px;
                    }

                    &>.complete-edit {
                        width: 100%;
                        display: flex;
                        flex-direction: column;
                        align-items: center;

                        &>.complete {
                            h3 {
                                font-size: 18px;
                            }
                        }

                        &>.edit-btn {
                            .n-button {
                                height: 45px;
                                border-radius: 8px;
                                padding: 5px;
                                font-size: 16px;
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
    div.page-view {
        &>.application-container {
            // padding: 0;

            // Content
            &>.contents {
                row-gap: 40px;

                // caption-sumit-btn
                &>.caption-sumit-btn {
                    justify-content: center;

                    // caption
                    .caption {
                        width: 100%;

                        h2 {
                            text-align: center;
                            font-size: 22px;
                        }

                        p {
                            padding: 0 10px;
                            text-align: center;
                            font-size: 16px;
                            font-weight: unset;
                        }
                    }

                    &>.sumit-application {
                        &>.submit-application-btn {
                            width: 100%;

                            .n-button {
                                width: 200px;
                                height: 45px;
                                border-radius: 8px;
                                padding: 5px 10px;
                                display: flex;
                                font-size: 16px;
                            }
                        }
                    }
                }


                &>.complete-edit-content {
                    padding-left: 10px;
                    padding-right: 10px;

                    h2 {
                        font-size: 22px;
                    }

                    &>.complete-edit {
                        &>.complete {
                            h3 {
                                font-size: 18px;
                            }
                        }

                        &>.edit-btn {
                            .n-button {
                                height: 45px;
                                border-radius: 8px;
                                padding: 5px;
                                font-size: 16px;
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
    div.page-view {
        &>.application-container {
            // padding: 0;

            // Content
            &>.contents {
                row-gap: 40px;

                // caption-sumit-btn
                &>.caption-sumit-btn {
                    padding: 13px;

                    // caption
                    .caption {
                        width: 500px;

                        h2 {
                            font-size: 24px;
                        }

                        p {
                            font-size: 16px;
                            font-weight: unset;
                        }
                    }

                    &>.sumit-application {
                        &>.submit-application-btn {

                            .n-button {
                                height: 45px;
                                border-radius: 8px;
                                padding: 5px 10px;
                                display: flex;
                                font-size: 16px;
                            }
                        }
                    }
                }


                &>.complete-edit-content {
                    padding-left: 20px;
                    padding-right: 20px;

                    h2 {
                        font-size: 25px;
                    }

                    &>.complete-edit {
                        &>.complete {
                            h3 {
                                font-size: 18px;
                            }
                        }

                        &>.edit-btn {
                            .n-button {
                                height: 45px;
                                border-radius: 8px;
                                padding: 5px;
                                font-size: 16px;
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
    div.page-view {
        &>.application-container {
            // Content
            &>.contents {
                row-gap: 40px;

                // caption-sumit-btn
                &>.caption-sumit-btn {
                    padding: 10px 20px;

                    // caption
                    .caption {
                        width: 600px;

                        h2 {
                            font-size: 26px;
                        }

                        p {
                            font-size: 16px;
                        }
                    }
                }


                &>.complete-edit-content {
                    padding-left: 20px;
                    padding-right: 20px;

                    h2 {
                        font-size: 26px;
                    }

                    &>.complete-edit {
                        &>.complete {
                            h3 {
                                font-size: 18px;
                            }
                        }
                    }
                }

            }
        }
    }
}

// @media (min-width: 1201px) and (max-width: 1499.9px) {}

// @media (min-width: 1500px) {}
</style>