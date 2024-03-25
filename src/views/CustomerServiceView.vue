<script setup lang="ts">
import { NSpace, NButton } from 'naive-ui'
import { Icon } from '@iconify/vue';
import Carousel from '@/components/carousel/carousel.vue'
import { computed, ref, reactive } from 'vue'

import CustomerImage from '@/assets/Images/CustomerCare-image/customerCare-image.png'

import {
    NForm,
    NFormItem,
    NInput,
    NRow,
    NCol,
    useNotification
} from 'naive-ui'

import type {
    FormInst,
    FormItemRule,
    FormValidationError,
    FormRules
} from 'naive-ui'


import { useResponseNotification } from '@/composables/responseNotification'
import { RegEx } from '@/composables/regex/regex'

import { useResponseMessageStore } from '@/stores/common/responseMessage'
import { useAuthenticationStore } from '@/stores/modules/authentication'
import type { ContactUs_Interface } from '@/interface/authentication'

const notification = useNotification()

const responseMessageStore = useResponseMessageStore()
const userStore = useAuthenticationStore()

const isLoading = ref<boolean>(false)

const formRef = ref<FormInst | null>(null)

const model = reactive<ContactUs_Interface>({
    fullName: '',
    email: '',
    phone: '',
    message: ''
})


const rules: FormRules = {
    email: [
        {
            validator(rule: FormItemRule, value: string) {
                if (!value) {
                } else if (!RegEx.email.test(value)) {
                    return new Error('email is invalid')
                }
                return true
            },
            trigger: ['input', 'blur']
        }
    ],
    password: [
        {
        }
    ]
}

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

function clearInputFields() {
    model.fullName = ''
    model.email = ''
    model.phone = ''
    model.message = ''
}

function handleValidateButtonClick(e: MouseEvent) {
    e.preventDefault()

    formRef.value?.validate(
        (errors: Array<FormValidationError> | undefined) => {
            if (errors) return

            // loading state
            loadingState(true)

            // proceed to contact us
            userStore.ContactUs(model)
                .then(() => {
                    // clear input
                    clearInputFields()
                    // loading state
                    loadingState(false)
                    // notification
                    showNotification(8000)
                })
                .catch(() => {
                    // loading state
                    loadingState(false)
                    // notification
                    showNotification(3000)
                })
        }
    )
}

</script>

<template>
    <div class="page-view">
        <div class="customer-container">
            <!-- vision-mission -->
            <div class="container">
                <div class="caption">
                    <h2>Customer Services</h2>

                    <p>
                        Reach us by phone, email, fax or email
                    </p>
                </div>

                <div class="customerCare-image">
                    <img :src="CustomerImage" alt="studentMain-image">
                </div>
            </div>

        </div>

        <!-- Message us container -->
        <div class="message-us-container">
            <!-- vision-mission -->
            <div class="container">
                <div class="message-and-phone-container">
                    <div class="contact-info">
                        <div class="icon-and-caption">
                            <Icon class="icon" icon="ooui:message" color="#23233f" width="35" />
                            <h2>Message Us </h2>
                        </div>

                        <!-- form -->
                        <div class="form-input">
                            <n-form ref="formRef" :model="model" :rules="rules">

                                <n-form-item path="email" label="Email">
                                    <n-input 
                                        class="input"
                                        size="large"
                                        placeholder=""    
                                        :disabled="isLoading" 
                                        v-model:value="model.email"
                                        @keydown.enter.prevent 
                                    />
                                </n-form-item>

                                <n-form-item path="subject" label="Subject">
                                    <n-input 
                                        class="input"
                                        size="large"
                                        placeholder=""    
                                        :disabled="isLoading"
                                        v-model:value="model.fullName"
                                        @keydown.enter.prevent
                                    />
                                </n-form-item>

                                <n-form-item path="message" label="Message">
                                    <n-input 
                                        class="input"                                        
                                        placeholder=""  
                                        :disabled="isLoading"
                                        v-model:value="model.message"
                                        type="textarea"
                                        @keydown.enter.prevent 
                                    />
                                </n-form-item>

                                <div class="sumitbtn">
                                    <n-button
                                        :loading="isLoading"
                                        type="primary"
                                        @click="handleValidateButtonClick"
                                    >
                                        Send Message
                                    </n-button>
                                </div>
                            </n-form>
                        </div>
                    </div>

                    <div class="contact-info">
                        <div class="icon-and-caption">
                            <Icon class="icon" icon="ic:sharp-phone" color="#23233f" width="35" />
                            <h2> Phone </h2>
                        </div>

                        <div class="phone-numbers">
                            <div class="number">
                                080788888888
                            </div>

                            <div class="number">
                                080788888888
                            </div>

                            <div class="number">
                                080788888888
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>

        <!-- carousel-contents -->
        <div class="carousel-contents">
            <Carousel />
        </div>
    </div>
</template>

<style lang="scss" scoped>
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

// over-all page view that covers everything
.page-view {
    .customer-container {
        border-top: 2px solid white;
        border-bottom: 2px solid white;
        padding: 0;
        background-color: $base-color;

        .container {
            position: relative;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            column-gap: 150px;
            row-gap: 10px;

            &>.caption {
                color: #fff;

                h2 {
                    font-style: normal;
                    font-weight: 700;
                    font-size: 38px;
                }

                p {
                    font-style: normal;
                    font-weight: 700;
                    font-size: 16px;
                }
            }

            &>.customerCare-image {
                img {
                    height: 520px;
                }
            }
        }
    }

    // Message Us Container
    &>.message-us-container {
        background-color: #D9D9D9;
        padding-top: 50px;
        padding-bottom: 70px;

        .container {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;

            .message-and-phone-container {
                width: 100%;
                display: flex;
                justify-content: center;
                flex-wrap: wrap;
                column-gap: 150px;
                width: 100%;
                row-gap: 50px;
                color: $base-color;

                .contact-info {
                    display: flex;
                    flex-direction: column;
                    row-gap: 20px;

                    // icon and caption 
                    .icon-and-caption {
                        padding-bottom: 15px;
                        display: flex;
                        column-gap: 50px;
                        align-items: center;
                        font-style: normal;
                        font-weight: 800;
                        line-height: 45px;

                        &>.icon {
                            font-size: 20px;
                        }

                        &>h2 {
                            font-size: 20px;
                            line-height: 25px;
                        }
                    }

                    // Form inputs for customer service page
                    .form-input {
                        .n-form {
                            width: 482px;
                            display: flex;
                            flex-direction: column;
                            flex-wrap: wrap;
                        }

                        .sumitbtn {
                            width: fit-content;


                            button {
                                margin-top: 10px;
                                border-radius: 20px;
                                padding: 23px 25px;
                                font-style: normal;
                                font-weight: 700;
                                font-size: 16px;
                                line-height: 36px;
                                word-wrap: break-word;
                                color: #FFFFFF;
                                background-color: $base-color;
                            }
                        }
                    }

                    // contact phone numbers
                    &>.phone-numbers {
                        // width: 100%;
                        font-style: normal;
                        font-weight: 700;
                        line-height: 18px;
                        word-wrap: break-word;

                        &>.number {
                            margin-bottom: 5px;
                            font-size: 18px;
                        }
                    }
                }
            }
        }
    }
}

// MEDIA QUERY---
@media (max-width: 250.9px) {
    .page-view {
        .customer-container {
            border-top: 1px solid white;
            border-bottom: 1px solid white;
            padding: 0;

            .container {
                flex-direction: column;

                // caption
                .caption {
                    padding: 5px;
                    position: absolute;
                    top: 20%;
                    text-align: center;
                    z-index: 1;

                    h2 {
                        margin-bottom: 10px;
                        font-size: 17px;
                    }

                    p {
                        font-size: 12px;
                        font-weight: unset;
                    }
                }
            }

            .customerCare-image {
                width: 100%;
                overflow: hidden;

                img {
                    width: 120%;
                    height: auto !important;
                    position: relative;
                    left: -20px;
                }
            }
        }

        // Message Us Container
        .message-us-container {
            padding: 0 10px 50px;

            .container {
                .message-and-phone-container {
                    .contact-info {
                        width: 100%;
                        display: flex;
                        flex-direction: column;
                        row-gap: 20px;

                        // icon and caption 
                        .icon-and-caption {
                            &>.icon {
                                display: none;
                            }

                            &>h2 {
                                font-size: 16px;
                            }
                        }

                        // Form inputs for customer service page
                        .form-input {
                            .n-form {
                                width: 100%;
                            }

                            .sumitbtn {
                                width: 100%;

                                button {
                                    width: 100%;
                                    border-radius: 5px;
                                    padding: 5px;
                                    font-size: 16px;
                                }
                            }
                        }

                        // contact phone numbers
                       &>.phone-numbers {
                            font-weight: normal !important;

                            &>.number {
                                font-size: 15px;
                            }
                        }
                    }
                }
            }
        }
    }
}

@media (min-width: 251px) and (max-width: 350.9px) {

    .page-view {
        .customer-container {
            border-top: 1px solid white;
            border-bottom: 1px solid white;
            padding: 0;

            .container {
                flex-direction: column;

                // caption
                .caption {
                    position: absolute;
                    top: 40%;
                    text-align: center;
                    z-index: 1;

                    h2 {
                        margin-bottom: 10px;
                        font-size: 20px;
                    }

                    p {
                        font-size: 12px;
                        font-weight: unset;
                    }
                }
            }

            .customerCare-image {
                width: 100%;
                overflow: hidden;

                img {
                    width: 130%;
                    height: auto !important;
                    position: relative;
                    left: -20px;
                }
            }
        }

        // Message Us Container
        .message-us-container {
            padding: 50px 10px;

            .container {
                .message-and-phone-container {
                    .contact-info {
                        width: 100%;
                        display: flex;
                        flex-direction: column;
                        row-gap: 20px;

                        // icon and caption 
                        .icon-and-caption {
                            column-gap: 10px;

                            &>.icon {
                                height: 20px;
                            }

                            &>h2 {
                                font-size: 16px;
                            }
                        }

                        // Form inputs for customer service page
                        .form-input {
                            .n-form {
                                width: 100%;
                            }

                            .sumitbtn {
                                width: 100%;

                                button {
                                    border-radius: 5px;
                                    padding: 15px 10px;
                                    font-size: 16px;
                                }
                            }
                        }

                        // contact phone numbers
                       &>.phone-numbers {
                            font-weight: normal !important;

                            &>.number {
                                font-size: 15px;
                            }
                        }
                    }
                }
            }
        }
    }
}

@media (min-width: 351px) and (max-width: 575.9px) {
    .page-view {
        .customer-container {
            border-top: 1px solid white;
            border-bottom: 1px solid white;
            padding: 0;

            .container {
                flex-direction: column;

                // caption
                .caption {
                    position: absolute;
                    top: 40%;
                    text-align: center;
                    z-index: 1;

                    h2 {
                        font-size: 25px;
                    }

                    p {
                        font-size: 14px;
                        font-weight: unset;
                    }
                }
            }

            .customerCare-image {
                width: 100%;
                height: max-content;
                overflow: hidden;

                img {
                    width: 110%;
                    height: auto !important;
                    position: relative;
                    left: -20px;
                }
            }
        }

        // Message Us Container
        .message-us-container {
            padding: 50px 10px;

            .container {
                .message-and-phone-container {
                    .contact-info {
                        width: 100%;
                        display: flex;
                        flex-direction: column;
                        row-gap: 20px;

                        // icon and caption 
                        .icon-and-caption {
                            column-gap: 10px;

                            &>.icon {
                                height: 27px;
                            }

                            &>h2 {
                                font-size: 18px;
                            }
                        }

                        // Form inputs for customer service page
                        .form-input {
                            .n-form {
                                width: 100%;
                            }

                            .sumitbtn {
                                width: 100%;

                                button {
                                    border-radius: 5px;
                                    padding: 15px 10px;
                                    font-size: 16px;
                                }
                            }
                        }

                        // contact phone numbers
                       &>.phone-numbers {
                            &>.number {
                                font-size: 15px;
                            }
                        }
                    }
                }
            }
        }
    }
}

@media (min-width: 576px) and (max-width: 767.9px) {
    .page-view {
        .customer-container {
            border-top: 1px solid white;
            border-bottom: 1px solid white;
            padding: 0;

            .container {
                flex-direction: column;

                // caption
                .caption {
                    position: absolute;
                    top: 40%;
                    text-align: center;
                    z-index: 1;

                    h2 {
                        font-size: 25px;
                    }

                    p {
                        font-weight: unset;
                    }
                }
            }

            .customerCare-image {
                width: 100%;
                height: 400px;
                overflow: hidden;

                img {
                    width: 110%;
                    height: auto !important;
                    position: relative;
                    top: -20px;
                    left: -20px;
                }
            }
        }

        // Message Us Container
        .message-us-container {
            padding: 50px 10px;

            .container {
                .message-and-phone-container {
                    flex-direction: column;
                    row-gap: 50px;

                    .contact-info {
                        // icon and caption 
                        .icon-and-caption {
                            column-gap: 15px;

                            &>.icon {
                                height: 32px;
                            }

                            &>h2 {
                                font-size: 20px;
                            }
                        }

                        // Form inputs for customer service page
                        .form-input {
                            width: 100%;

                            .n-form {
                                width: 100%;
                            }

                            .sumitbtn {
                                width: 100%;

                                button {
                                    border-radius: 5px;
                                    padding: 20px;
                                    font-size: 16px;
                                }
                            }
                        }

                        // contact phone numbers
                       &>.phone-numbers {
                            width: 100%;

                            &>.number {
                                font-size: 16px;
                            }
                        }
                    }
                }
            }
        }
    }
}

@media (min-width: 768px) and (max-width: 991.9px) {
    .page-view {
        .customer-container {
            border-top: 1px solid white;
            border-bottom: 1px solid white;
            padding-left: 10px;

            .container {
                column-gap: 100px;

                // caption
                .caption {
                    h2 {
                        font-size: 30px;
                    }
                    p {
                        font-size: 14px;
                    }
                }
            }

            .customerCare-image {
                width: 50%;
                overflow: hidden;

                img {
                    width: 100%;
                    height: auto !important;
                }
            }
        }

        // Message Us Container
        .message-us-container {
            padding: 50px 10px;

            .container {
                .message-and-phone-container {
                    row-gap: 50px;
                    column-gap: 100px;

                    .contact-info {
                        // icon and caption 
                        .icon-and-caption {
                            column-gap: 15px;

                            &>.icon {
                                height: 32px;
                            }

                            &>h2 {
                                font-size: 20px;
                            }
                        }

                        // Form inputs for customer service page
                        .form-input {
                            width: 400px;

                            .n-form {
                                width: 100%;
                            }

                            .sumitbtn {
                                width: 100%;

                                button {
                                    border-radius: 5px;
                                    padding: 20px;
                                    font-size: 16px;
                                }
                            }
                        }

                        // contact phone numbers
                       &>.phone-numbers {
                            width: 100%;

                            &>.number {
                                font-size: 16px;
                            }
                        }
                    }
                }
            }
        }
    }
}

@media (min-width: 992px) and (max-width: 1200.9px) {

    .page-view {
        .customer-container {
            border-top: 1px solid white;
            border-bottom: 1px solid white;
            padding-left: 10px;

            .container {
                column-gap: 100px;

                // caption
                .caption {
                    h2 {
                        font-size: 30px;
                    }
                    p {
                        font-size: 16px;
                    }
                }
            }

            .customerCare-image {
                width: 50%;
                overflow: hidden;

                img {
                    width: 100%;
                    height: auto !important;
                }
            }
        }

        // Message Us Container
        .message-us-container {
            padding: 50px 10px;

            .container {
                .message-and-phone-container {
                    column-gap: 100px;

                    .contact-info {
                        // icon and caption 
                        .icon-and-caption {
                            column-gap: 25px;

                            &>.icon {
                                height: 32px;
                            }
                        }

                        // Form inputs for customer service page

                        // contact phone numbers
                       &>.phone-numbers {
                            &>.number {
                                font-size: 17px;
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
