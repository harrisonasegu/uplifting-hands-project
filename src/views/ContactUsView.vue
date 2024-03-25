<script setup lang="ts">
import { computed, ref, reactive } from 'vue'
import { NSpace, NButton } from 'naive-ui'

import { Icon } from '@iconify/vue';

import Carousel from '@/components/carousel/carousel.vue'

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

const inputRequired = computed((): boolean => model.fullName === '' && model.email === '' || model.phone === '' && model.message === '')

const rules: FormRules = {
  email: [
    {
      required: true,
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error('email is required')
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
      required: true,
      message: 'password is required'
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
    <n-space vertical>
      <div class="customer-page-view">

        <div class="customer-container">
          <!-- vision-mission -->
          <div class="container">
            <div class="caption-picture">
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

        </div>

        <!-- Message us container -->
        <div class="message-us-container">
          <!-- vision-mission -->
          <div class="container">
            <div class="caption-message">
              <div class="caption">
                <div class="messageUs">
                  <Icon icon="ooui:message" color="#23233f" width="50" />
                  <br>
                  <h2>Message Us </h2>
                </div>

                <!-- form -->
                <div class="form-input">
                  <n-form ref="formRef" :model="model" :rules="rules">

                    <n-form-item path="email" label="Email">
                      <n-input class="input" :disabled="isLoading" v-model:value="model.email" @keydown.enter.prevent />
                    </n-form-item>

                    <n-form-item path="subject" label="Subject">
                      <n-input class="input" :disabled="isLoading" v-model:value="model.fullName"
                        @keydown.enter.prevent />
                    </n-form-item>

                    <n-form-item path="message" label="Message">
                      <n-input class="input" style="height: 266px; width: 482px;" :disabled="isLoading"
                        v-model:value="model.message" type="textarea" @keydown.enter.prevent />
                    </n-form-item>

                    <n-row :gutter="[0, 24]">
                      <n-col :span="24">
                        <div class="sumitbtn" style="display: flex; justify-content: flex-end">
                          <n-button :loading="isLoading" :disabled="inputRequired" type="primary"
                            @click="handleValidateButtonClick">
                            Send Message
                          </n-button>
                        </div>
                      </n-col>
                    </n-row>
                  </n-form>
                </div>
              </div>

              <div class="customerCare-contacts">
                <div class="icon-contact">
                  <Icon icon="ic:sharp-phone" color="#23233f" width="50" />
                  <br>
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
    </n-space>
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

  // border: 2px solid red;
  .customer-page-view {
    // border: 12px solid red;

    .customer-container {
      // border: 12px solid red;
      border-top: 2px solid white;
      background-color: $base-color;
      padding-bottom: 30px;

      .container {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        .caption-picture {
          //   border: 5px solid red;
          display: flex;
          justify-content: space-between;
          align-items: center;
          column-gap: 150px;
          width: 100%;
          row-gap: 50px;
          padding-left: 50px;

          // caption
          &>.caption {
            // border: 2px solid blue;
            display: flex;
            flex-direction: column;
            color: #fff;

            h2 {
              font-style: normal;
              font-weight: 700;
              font-size: 48px;
              line-height: 58px;
              margin-bottom: 10px;
            }

            p {
              // border: 2px solid blue;
              width: 418px;
              font-style: normal;
              font-weight: 700;
              font-size: 33px;
              line-height: 40px;
            }
          }

          // paragraphy
          &>.customerCare-image {

            // border: 2px solid blue;
            img {
              // border: 2px solid blue;
              width: 784px;
              height: auto;
              padding-right: 100px;
            }
          }
        }
      }
    }

    // Message Us Container
    &>.message-us-container {
      // border: 12px solid rgb(33, 5, 177);
      background-color: #D9D9D9;
      padding-top: 181px;
      padding-bottom: 181px;

      .container {
        // border: 2px solid white;
        display: flex;
        justify-content: center;
        align-items: center;

        .caption-message {
          //   border: 5px solid red;
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          column-gap: 150px;
          width: 100%;
          row-gap: 50px;
          color: $base-color;

          .caption {
            //   border: 5px solid red;
            display: flex;
            flex-direction: column;
            row-gap: 20px;

            // message
            .messageUs {
              // border: 1px solid red;
              padding-bottom: 20px;
              font-style: normal;
              font-weight: 800;
              font-size: 48px;
              line-height: 58px;
            }

            // Form inputs for customer service page
            .form-input {
              // border: 1px solid red;


              .n-form {
                // border: 1px solid red;
                display: flex;
                flex-direction: column;
                flex-wrap: wrap;

                .input {
                  // border: 1px solid red;
                  padding: 11px;
                  font-size: 25px;
                }
              }

              .sumitbtn {
                // border: 5px solid red;
                width: fit-content;


                button {
                  // border: 5px solid red;
                  background-color: $base-color;
                  border-radius: 20px;
                  font-style: normal;
                  font-weight: 700;
                  font-size: 30px;
                  line-height: 36px;
                  margin-top: 10px;
                  color: #FFFFFF;
                  padding: 35px 30px;
                }
              }
            }
          }


          // paragraphy
          &>.customerCare-contacts {
            // border: 2px solid blue;

            &>.icon-contact {
              // border: 2px solid blue;
              font-style: normal;
              font-weight: 800;
              font-size: 48px;
              line-height: 58px;
            }

            &>.phone-numbers {
              // border: 2px solid blue;
              margin-top: 50px;
              font-style: normal;
              font-weight: 700;
              font-size: 30px;
              line-height: 36px;
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

    // border: 2px solid red;
    // This page is for the first section with customer service write up and a picture
    .customer-page-view {
      .customer-container {
        // border: 12px solid red;
        justify-content: center;
        background-color: $base-color;
        padding-top: 50px;
        padding-bottom: 50px;
        display: flex;
        color: #fff;

        .container {
          // border: 2px solid white;

          .caption-picture {
            // border: 5px solid red;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            row-gap: 50px;
            padding-left: 0 !important;

            // caption
            .caption {
              // border: 2px solid blue;
              width: 300px !important;
              display: flex;
              justify-content: center;
              align-items: center;
              text-align: center;
              padding-left: 50px;
              word-wrap: break-word;

              h2 {
                //   border: 2px solid blue;
                font-weight: 600;
                font-size: 18.5px !important;
                margin-bottom: 30px;
                padding-right: 50px;
              }

              p {
                // border: 2px solid blue;
                width: 230px !important;
                font-size: 16px !important;
                margin-top: 0px !important;
                padding-right: 50px;
                line-height: 21px !important;
                text-align: center;
              }
            }
          }
        }

        // paragraphy
        .customerCare-image {
          // border: 2px solid blue;

          img {
            // border: 2px solid blue;
            width: 100% !important;
            height: auto;
          }
        }
      }
    }

    // -------------------------------------------------------
    // border: 2px solid red;
    // This page is for the second section with message us details
    .message-us-container {

      // border: 5px solid green;
      justify-content: center;
      background-color: #D9D9D9;
      padding-top: 50px !important;
      padding-bottom: 50px !important;
      display: flex;
      color: #fff;
      padding: 0px 20px;

      .container {
        // border: 2px solid white;

        .caption-message {
          // border: 5px solid red;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          column-gap: 50px;
          row-gap: 50px;


          // caption
          &>.caption {
            // border: 2px solid blue;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-self: flex-start;
            flex-wrap: wrap;
            word-break: break-all;
            width: 100%;

            .messageUs {
              display: none;
            }

            h2 {
              // border: 1px solid red;
              font-style: normal;
              font-weight: 700;
              font-size: 35px;
              line-height: 35px;
            }

            .n-form-item {
              width: 100% !important;

              .n-input {
                //  border: 5px solid red;
                padding: 5px 0px !important;
                font-size: 16px !important;
              }
            }

            .n-button {
              // border: 2px solid red;
              width: fit-content;
              padding: 25px 10px !important;
              font-size: 16px !important;
            }
          }
        }
      }

      .customerCare-contacts {
        width: 100%;
        // border: 2px solid blue;
        display: flex;
        flex-direction: column;
        align-self: flex-start;

        &>.icon-contact {
          // border: 1px solid red;
          font-style: normal;
          font-weight: 700;
          font-size: 25px !important;
          line-height: 35px;
          display: none;
        }

        &>.phone-numbers {
          // border: 1px solid red;
          font-size: 16px !important;
          line-height: 21px;

          &>.number {
            font-size: 16px !important;
            line-height: 21px;
          }
        }
      }
    }
  }
}

@media (min-width: 251px) and (max-width: 350.9px) {

  .page-view {

    // border: 2px solid red;
    // This page is for the first section with customer service write up and a picture
    .customer-page-view {
      .customer-container {
        // border: 12px solid red;
        justify-content: center;
        background-color: $base-color;
        padding-top: 50px;
        padding-bottom: 50px;
        display: flex;
        color: #fff;

        .container {
          // border: 2px solid white;

          .caption-picture {
            // border: 5px solid red;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            row-gap: 50px;
            padding-left: 0 !important;

            // caption
            .caption {
              // border: 2px solid blue;
              width: 300px !important;
              display: flex;
              justify-content: center;
              align-items: center;
              text-align: center;
              padding-left: 50px;
              word-wrap: break-word;

              h2 {
                //   border: 2px solid blue;
                font-weight: 600;
                font-size: 18.5px !important;
                margin-bottom: 30px;
                padding-right: 50px;
              }

              p {
                // border: 2px solid blue;
                width: 230px !important;
                font-size: 16px !important;
                margin-top: 0px !important;
                padding-right: 50px;
                line-height: 21px !important;
                text-align: center;
              }
            }
          }
        }

        // paragraphy
        .customerCare-image {
          // border: 2px solid blue;

          img {
            // border: 2px solid blue;
            width: 100% !important;
            height: auto;
          }
        }
      }
    }

    // -------------------------------------------------------
    // border: 2px solid red;
    // This page is for the second section with message us details
    .message-us-container {

      // border: 5px solid green;
      justify-content: center;
      background-color: #D9D9D9;
      padding-top: 50px !important;
      padding-bottom: 50px !important;
      display: flex;
      color: #fff;
      padding: 0px 20px;

      .container {
        // border: 2px solid white;

        .caption-message {
          // border: 5px solid red;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          column-gap: 50px;
          row-gap: 50px;


          // caption
          &>.caption {
            // border: 2px solid blue;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-self: flex-start;
            flex-wrap: wrap;
            word-break: break-all;
            width: 100%;

            .messageUs {
              display: none;
            }

            h2 {
              // border: 1px solid red;
              font-style: normal;
              font-weight: 700;
              font-size: 35px;
              line-height: 35px;
            }

            .n-form-item {
              width: 100% !important;

              .n-input {
                //  border: 5px solid red;
                padding: 5px 0px !important;
                font-size: 16px !important;
              }
            }

            .n-button {
              // border: 2px solid red;
              width: fit-content;
              padding: 25px 10px !important;
              font-size: 16px !important;
            }
          }
        }
      }

      .customerCare-contacts {
        width: 100%;
        // border: 2px solid blue;
        display: flex;
        flex-direction: column;
        align-self: flex-start;

        &>.icon-contact {
          // border: 1px solid red;
          font-style: normal;
          font-weight: 700;
          font-size: 25px !important;
          line-height: 35px;
          display: none;
        }

        &>.phone-numbers {
          // border: 1px solid red;
          font-size: 16px !important;
          line-height: 21px;

          &>.number {
            font-size: 16px !important;
            line-height: 21px;
          }
        }
      }
    }
  }
}

@media (min-width: 351px) and (max-width: 575.9px) {

  .page-view {

    // border: 2px solid red;
    // This page is for the first section with customer service write up and a picture
    .customer-page-view {
      .customer-container {
        // border: 12px solid red;
        justify-content: center;
        background-color: $base-color;
        padding-top: 50px;
        padding-bottom: 50px;
        display: flex;
        color: #fff;

        .container {
          // border: 2px solid white;

          .caption-picture {
            // border: 5px solid red;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            row-gap: 50px;
            padding-left: 0 !important;

            // caption
            .caption {
              // border: 2px solid blue;
              width: 300px !important;
              display: flex;
              justify-content: center;
              align-items: center;
              text-align: center;
              padding-left: 50px;
              word-wrap: break-word;

              h2 {
                //   border: 2px solid blue;
                font-weight: 600;
                font-size: 18.5px !important;
                margin-bottom: 30px;
                padding-right: 50px;
              }

              p {
                // border: 2px solid blue;
                width: 230px !important;
                font-size: 16px !important;
                margin-top: 0px !important;
                padding-right: 50px;
                line-height: 21px !important;
                text-align: center;
              }
            }
          }
        }

        // paragraphy
        .customerCare-image {
          // border: 2px solid blue;

          img {
            // border: 2px solid blue;
            width: 100% !important;
            height: auto;
          }
        }
      }
    }

    // -------------------------------------------------------
    // border: 2px solid red;
    // This page is for the second section with message us details
    .message-us-container {

      // border: 5px solid green;
      justify-content: center;
      background-color: #D9D9D9;
      padding-top: 50px !important;
      padding-bottom: 50px !important;
      display: flex;
      color: #fff;
      padding: 0px 20px;

      .container {
        // border: 2px solid white;

        .caption-message {
          // border: 5px solid red;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          column-gap: 50px;
          row-gap: 50px;


          // caption
          &>.caption {
            // border: 2px solid blue;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-self: flex-start;
            flex-wrap: wrap;
            word-break: break-all;
            width: 100%;

            .messageUs {
              display: none;
            }

            h2 {
              // border: 1px solid red;
              font-style: normal;
              font-weight: 700;
              font-size: 35px;
              line-height: 35px;
            }

            .n-form-item {
              width: 100% !important;

              .n-input {
                //  border: 5px solid red;
                padding: 5px 0px !important;
                font-size: 16px !important;
              }
            }

            .n-button {
              // border: 2px solid red;
              width: fit-content;
              padding: 25px 10px !important;
              font-size: 16px !important;
            }
          }
        }
      }

      .customerCare-contacts {
        width: 100%;
        // border: 2px solid blue;
        display: flex;
        flex-direction: column;
        align-self: flex-start;

        &>.icon-contact {
          // border: 1px solid red;
          font-style: normal;
          font-weight: 700;
          font-size: 25px !important;
          line-height: 35px;
          display: none;
        }

        &>.phone-numbers {
          // border: 1px solid red;
          font-size: 16px !important;
          line-height: 21px;

          &>.number {
            font-size: 16px !important;
            line-height: 21px;
          }
        }
      }
    }
  }
}

@media (max-width: 576px) and (max-width: 767.9px) {

  .page-view {

    // border: 2px solid red;
    // This page is for the first section with customer service write up and a picture
    .customer-page-view {
      .customer-container {
        // border: 12px solid red;
        justify-content: center;
        background-color: $base-color;
        padding-top: 50px;
        padding-bottom: 50px;
        display: flex;
        color: #fff;

        .container {
          // border: 2px solid white;

          .caption-picture {
            // border: 5px solid red;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            row-gap: 50px;

            // caption
            .caption {
              // border: 2px solid blue;
              text-align: center;

              h2 {
                //   border: 2px solid blue;
                font-style: normal;
                font-weight: 600;
                font-size: 25px;
                line-height: 28px;
                margin-bottom: 30px;
              }

              p {
                // border: 2px solid blue;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                flex-wrap: wrap;
                font-size: 25px;
                line-height: 28px;
                margin-top: 15px;
              }
            }
          }
        }

        // paragraphy
        .customerCare-image {
          // border: 2px solid blue;

          img {
            // border: 2px solid blue;
            width: 100% !important;
            height: auto;
            padding-right: 0 !important;
          }
        }
      }
    }

    // -------------------------------------------------------
    // border: 2px solid red;
    // This page is for the second section with message us details
    .message-us-container {

      // border: 5px solid green;
      justify-content: center;
      background-color: #D9D9D9;
      padding-top: 50px;
      padding-bottom: 50px;
      display: flex;
      color: #fff;
      padding: 0px 20px;

      .container {
        // border: 2px solid white;

        .caption-message {
          // border: 5px solid red;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          column-gap: 50px;
          row-gap: 50px;

          // caption
          &>.caption {
            // border: 2px solid blue;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-self: flex-start;
            flex-wrap: wrap;
            word-break: break-all;
            width: 100%;

            h2 {
              // border: 1px solid red;
              font-style: normal;
              font-weight: 700;
              font-size: 35px;
              line-height: 35px;
              margin-bottom: 30px;
            }
          }
        }
      }

      .customerCare-contacts {
        width: 100%;
        // border: 2px solid blue;
        display: flex;
        flex-direction: column;
        align-self: flex-start;

        &>.icon-contact {
          // border: 1px solid red;
          font-style: normal;
          font-weight: 700;
          font-size: 25px !important;
          line-height: 35px;
        }

        &>.phone-numbers {
          // border: 1px solid red;
          font-style: normal;
          font-weight: 700;
          font-size: 25px !important;
          line-height: 35px;
        }
      }
    }
  }
}

@media (max-width: 768px) and (max-width: 991.9px) {

  .page-view {

    // border: 2px solid red;
    // This page is for the first section with customer service write up and a picture
    .customer-page-view {
      .customer-container {
        // border: 12px solid red;
        justify-content: center;
        background-color: $base-color;
        padding-top: 50px;
        padding-bottom: 50px;
        display: flex;
        color: #fff;

        .container {
          // border: 2px solid white;

          .caption-picture {
            // border: 5px solid red;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            row-gap: 50px;

            // caption
            .caption {
              // border: 2px solid blue;
              text-align: center;

              h2 {
                //   border: 2px solid blue;
                font-style: normal;
                font-weight: 600;
                font-size: 25px;
                line-height: 28px;
                margin-bottom: 30px;
              }

              p {
                // border: 2px solid blue;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                flex-wrap: wrap;
                font-size: 25px;
                line-height: 28px;
                margin-top: 15px;
              }
            }
          }
        }

        // paragraphy
        .customerCare-image {
          // border: 2px solid blue;

          img {
            // border: 2px solid blue;
            width: 100% !important;
            height: auto;
            padding-right: 0 !important;
          }
        }
      }
    }

    // -------------------------------------------------------
    // border: 2px solid red;
    // This page is for the second section with message us details
    .message-us-container {

      // border: 5px solid green;
      justify-content: center;
      background-color: #D9D9D9;
      padding-top: 50px;
      padding-bottom: 50px;
      display: flex;
      color: #fff;
      padding: 0px 20px;

      .container {
        // border: 2px solid white;

        .caption-message {
          // border: 5px solid red;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          column-gap: 50px;
          row-gap: 50px;

          // caption
          &>.caption {
            // border: 2px solid blue;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-self: flex-start;
            flex-wrap: wrap;
            word-break: break-all;
            width: 100%;

            h2 {
              // border: 1px solid red;
              font-style: normal;
              font-weight: 700;
              font-size: 35px;
              line-height: 35px;
              margin-bottom: 30px;
            }
          }
        }
      }

      .customerCare-contacts {
        width: 100%;
        // border: 2px solid blue;
        display: flex;
        flex-direction: column;
        align-self: flex-start;

        &>.icon-contact {
          // border: 1px solid red;
          font-style: normal;
          font-weight: 700;
          font-size: 25px !important;
          line-height: 35px;
        }

        &>.phone-numbers {
          // border: 1px solid red;
          font-style: normal;
          font-weight: 700;
          font-size: 25px !important;
          line-height: 35px;
        }
      }
    }
  }
}

@media (max-width: 992px) and (max-width: 1200.9px) {

  .page-view {

    // border: 2px solid red;
    // This page is for the first section with customer service write up and a picture
    .customer-page-view {
      .customer-container {
        // border: 12px solid red;
        justify-content: center;
        background-color: $base-color;
        padding-top: 50px;
        padding-bottom: 50px;
        display: flex;
        color: #fff;

        .container {
          // border: 2px solid white;

          .caption-picture {
            // border: 5px solid red;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            row-gap: 50px;

            // caption
            .caption {
              // border: 2px solid blue;
              text-align: center;

              h2 {
                //   border: 2px solid blue;
                font-style: normal;
                font-weight: 600;
                font-size: 25px;
                line-height: 28px;
                margin-bottom: 30px;
              }

              p {
                // border: 2px solid blue;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                flex-wrap: wrap;
                font-size: 25px;
                line-height: 28px;
                margin-top: 15px;
              }
            }
          }
        }

        // paragraphy
        .customerCare-image {
          // border: 2px solid blue;

          img {
            // border: 2px solid blue;
            width: 100% !important;
            height: auto;
            padding-right: 0 !important;
          }
        }
      }
    }

    // -------------------------------------------------------
    // border: 2px solid red;
    // This page is for the second section with message us details
    .message-us-container {

      // border: 5px solid green;
      justify-content: center;
      background-color: #D9D9D9;
      padding-top: 50px;
      padding-bottom: 50px;
      display: flex;
      color: #fff;
      padding: 0px 20px;

      .container {
        // border: 2px solid white;

        .caption-message {
          // border: 5px solid red;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          column-gap: 50px;
          row-gap: 50px;

          // caption
          &>.caption {
            // border: 2px solid blue;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-self: flex-start;
            flex-wrap: wrap;
            word-break: break-all;
            width: 100%;

            h2 {
              // border: 1px solid red;
              font-style: normal;
              font-weight: 700;
              font-size: 35px;
              line-height: 35px;
              margin-bottom: 30px;
            }
          }
        }
      }

      .customerCare-contacts {
        width: 100%;
        // border: 2px solid blue;
        display: flex;
        flex-direction: column;
        align-self: flex-start;

        &>.icon-contact {
          // border: 1px solid red;
          font-style: normal;
          font-weight: 700;
          font-size: 25px !important;
          line-height: 35px;
        }

        &>.phone-numbers {
          // border: 1px solid red;
          font-style: normal;
          font-weight: 700;
          font-size: 25px !important;
          line-height: 35px;
        }
      }
    }
  }
}

@media (max-width: 1201px) and (max-width: 1499.9px) {

  .page-view {

    // border: 2px solid red;
    // This page is for the first section with customer service write up and a picture
    .customer-page-view {
      .customer-container {
        // border: 12px solid red;
        justify-content: center;
        background-color: $base-color;
        padding-top: 50px;
        padding-bottom: 50px;
        display: flex;
        color: #fff;

        .container {
          // border: 2px solid white;

          .caption-picture {
            // border: 5px solid red;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            row-gap: 50px;

            // caption
            .caption {
              // border: 2px solid blue;
              text-align: center;

              h2 {
                //   border: 2px solid blue;
                font-style: normal;
                font-weight: 600;
                font-size: 25px;
                line-height: 28px;
                margin-bottom: 30px;
              }

              p {
                // border: 2px solid blue;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                flex-wrap: wrap;
                font-size: 25px;
                line-height: 28px;
                margin-top: 15px;
              }
            }
          }
        }

        // paragraphy
        .customerCare-image {
          // border: 2px solid blue;

          img {
            // border: 2px solid blue;
            width: 100% !important;
            height: auto;
            padding-right: 0 !important;
          }
        }
      }
    }

    // -------------------------------------------------------
    // border: 2px solid red;
    // This page is for the second section with message us details
    .message-us-container {

      // border: 5px solid green;
      justify-content: center;
      background-color: #D9D9D9;
      padding-top: 50px;
      padding-bottom: 50px;
      display: flex;
      color: #fff;
      padding: 0px 20px;

      .container {
        // border: 2px solid white;

        .caption-message {
          // border: 5px solid red;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          column-gap: 50px;
          row-gap: 50px;

          // caption
          &>.caption {
            // border: 2px solid blue;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-self: flex-start;
            flex-wrap: wrap;
            word-break: break-all;
            width: 100%;

            h2 {
              // border: 1px solid red;
              font-style: normal;
              font-weight: 700;
              font-size: 35px;
              line-height: 35px;
              margin-bottom: 30px;
            }
          }
        }
      }

      .customerCare-contacts {
        width: 100%;
        // border: 2px solid blue;
        display: flex;
        flex-direction: column;
        align-self: flex-start;

        &>.icon-contact {
          // border: 1px solid red;
          font-style: normal;
          font-weight: 700;
          font-size: 25px !important;
          line-height: 35px;
        }

        &>.phone-numbers {
          // border: 1px solid red;
          font-style: normal;
          font-weight: 700;
          font-size: 25px !important;
          line-height: 35px;
        }
      }
    }
  }
}

@media (min-width: 1500px) {
  .page-view {
    .customer-container {
      padding-left: 150px;

      img {
        padding-right: 0 !important;
      }
    }
  }
}
</style>