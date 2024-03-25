<script setup lang="ts">
import { computed, ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

import {
  NForm,
  NFormItem,
  NInput,
  NCheckbox,
  NButton,
  useNotification
} from 'naive-ui'

import type {
  FormInst,
  FormItemInst,
  FormItemRule,
  FormValidationError,
  FormRules
} from 'naive-ui'

import type { SelfOnboarding_Interface } from '@/interface/authentication'

import { useResponseNotification } from '@/composables/responseNotification'
import { RegEx } from '@/composables/regex/regex'

import { useResponseMessageStore } from '@/stores/common/responseMessage'
import { useAuthenticationStore } from '@/stores/modules/authentication'

const router = useRouter()
const notification = useNotification()

const responseMessageStore = useResponseMessageStore()
const userStore = useAuthenticationStore()

const isLoading = ref<boolean>(false)

const formRef = ref<FormInst | null>(null)
const confirmPasswordFormItemRef = ref<FormItemInst | null>(null)

const model = reactive<SelfOnboarding_Interface>({
  email: '',
  password: '',
  confirmPassword: ''
})
const hasAgreedToTerms = ref<boolean>(false)

const inputRequired = computed((): boolean =>
  model.email === '' ||
  model.password === '' ||
  model.confirmPassword === '' ||
  !hasAgreedToTerms.value ||
  model.password !== model.confirmPassword
)

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
      validator: passwordRegexValidator,
      trigger: ['input', 'blur']
    }
  ],
  confirmPassword: [
    {
      required: true,
      message: 'Re-entered password is required',
      trigger: ['input', 'blur']
    },
    {
      required: true,
      validator: confirmPasswordValidator,
      message: 'passwords do not match',
      trigger: 'input'
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
  model.email = ''
  model.password = ''
  model.confirmPassword = ''
  hasAgreedToTerms.value = false
}

function passwordRegexValidator(rule: FormItemRule, value: string) {
  if (!value) {
    return new Error('password is required')
  } else
    if (value?.length < 8) {
      return new Error('password must be at least 8 characters')
    } else
      if (!RegEx.password.hasLowerCaseChar.test(value)) {
        return new Error('password must include at least 1 lower case character')
      } else
        if (!RegEx.password.hasUpperCaseChar.test(value)) {
          return new Error('password must include at least 1 upper character')
        } else
          if (!RegEx.password.hasNumberChar.test(value)) {
            return new Error('password must include at least 1 number character')
          } else
            if (!RegEx.password.hasSymbolChar.test(value)) {
              return new Error('password must include at least 1 symbol character')
            }

  return true
}

function confirmPasswordValidator(rule: FormItemRule, value: string): boolean {
  return (value === model.password)
}

function handlePasswordInput() {
  if (!model.confirmPassword) return
  confirmPasswordFormItemRef.value?.validate({ trigger: 'input' })
}

function handleCreateAccountButtonClick(e: MouseEvent) {
  e.preventDefault()

  formRef.value?.validate(
    (errors: Array<FormValidationError> | undefined) => {
      if (errors) return

      // loading state
      loadingState(true)

      // proceed to login
      userStore.ApplicantSelfOnboarding({
        email: model.email,
        password: model.password,
        confirmPassword: model.confirmPassword
      })
        .then(response => {
          // show notification for login error
          if (response.responseCode === '00') {
            // loading state
            loadingState(false)
            // clear input
            clearInputFields()
            // notification
            showNotification(5000)
            // route to login page
            router.replace('/login')
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
</script>

<template>
  <div class="page-view">
    <div class="auth-container">
      <section class="auth-row">
        <div class="form-info-container">
          <section class="description">
            <h3>Sign Up</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nulla eu auctor pulvinar, velit justo
              laoreet ex, ac aliquam sapien sem eu sapien.
            </p>
          </section>

          <section class="auth-form-switch">
            <span>Already have an account?</span>
            <router-link to="/login">Sign In</router-link>
          </section>
        </div>
        <div class="form-container">
          <n-form ref="formRef" :model="model" :rules="rules">
            <n-form-item path="email">
              <div class="form-group">
                <label>Email</label>
                <n-input
                  class="input" 
                  size="large"
                  placeholder=""
                  v-model:value="model.email"
                  :disabled="isLoading"
                  @keydown.enter.prevent
                />
              </div>
            </n-form-item>

            <n-form-item path="password">
              <div class="form-group">
                <label>Password</label>
                <n-input
                  class="input"
                  size="large"
                  placeholder=""
                  v-model:value="model.password"
                  :disabled="!model.email || isLoading"
                  type="password"
                  @keydown.enter.prevent
                />
                <span class="input-info">
                  Password must be 8 characters or more and must contain upper case alphabet, lower case alphabet, number
                  and symbol.
                </span>
              </div>
            </n-form-item>

            <n-form-item path="confirmPassword" first ref="confirmPasswordFormItemRef">
              <div class="form-group">
                <label>Confirm Password</label>
                <n-input
                  class="input"
                  size="large"
                  placeholder=""
                  v-model:value="model.confirmPassword"
                  :disabled="!model.password || isLoading"
                  type="password"
                  @input="handlePasswordInput"
                  @keydown.enter.prevent
                />
              </div>
            </n-form-item>

            <n-form-item path="agreeToTerms">
              <div class="form-group">
                <n-checkbox size="large" v-model:checked="hasAgreedToTerms" :disabled="isLoading">
                  <span class="check-box">
                    Agree to Terms of Use and Privacy Policy
                  </span>
                </n-checkbox>
              </div>
            </n-form-item>

            <div class="submit-btn-container">
              <n-button :disabled="inputRequired || isLoading" type="primary" :loading="isLoading"
                @click="handleCreateAccountButtonClick">CREATE ACCOUNT</n-button>
            </div>
          </n-form>
        </div>
      </section>
    </div>
  </div>
</template>

<style lang="scss" scoped>
div.page-view {
  &>.auth-container {
    border-top: 3px solid #FFF;
    border-bottom: 3px solid #FFF;
    background: #D9D9D9;
    color: #ffffff;

    &>.auth-row {
      padding: 50px 60px;
      display: flex;
      column-gap: 200px;
      background: $base-color;

      // form info container
      &>.form-info-container {
        width: 500px;
        display: flex;
        flex-direction: column;
        row-gap: 24px;

        &>section.description {
          display: flex;
          flex-direction: column;
          row-gap: 25px;

          &>h3 {
            font-size: 25px;
            font-weight: 800;
            color: #FFF;
          }

          &>p {
            font-size: 16px;
            color: #FFF;
          }
        }

        &>.auth-form-switch {
          width: 100%;
          padding: 12px 61px 12px;
          background: #D9D9D9;

          &>* {
            font-size: 20px;
            font-weight: 700;
            line-height: 35px;
            color: $base-color;
            transition: $transition;
          }
        }
      }

      // form container
      &>.form-container {
        border-radius: 30px;
        padding: 45px;
        display: flex;
        flex-direction: column;
        row-gap: 30px;
        color: $base-color;
        background-color: #FFF;

        &>.n-form {
          display: flex;
          flex-direction: column;

          &>.n-form-item {
            display: block;

            div.form-group {
              width: 450px;
              display: flex;
              flex-direction: column;

              &>.input-info {
                padding-top: 10px;
              }

              &>label {
                width: 100%;
                margin-bottom: 10px;
                font-size: 18px;
                font-weight: 800;
              }

              & span.check-box,
              & a.auth-url {
                position: relative;
                top: -5px;
                left: 5px;
                line-height: 36px;
              }

              & a.auth-url {
                position: static;
                margin-top: 10px;
              }

              &>.input {
                width: 450px;
                border: 1px solid $base-color;
                border-radius: 50px;
                display: flex;
                align-items: center;
              }
            }
          }

          &>div.submit-btn-container {
            margin-top: 15px;

            &>.n-button {
              width: 450px;
              height: 45px;
              border-radius: 20px;
              align-items: center;
              font-size: 18px;
              font-weight: 800 !important;
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
    }
  }
}

// MEDIA QUERY

// XX-SM (<251px)
@media (max-width: 250.9px) {
  div.page-view {
    &>.auth-container {
      border-left: transparent;
      border-right: transparent;
      border-top: 1px solid #FFF;
      border-bottom: 1px solid #FFF;
      padding: 0;

      &>.auth-row {
        border: transparent;
        padding: 50px 10px 60px;
        flex-direction: column;
        row-gap: 50px;

        // form info container
        &>div.form-info-container {
          width: 100%;

          &>.description {
            row-gap: 25px;

            &>h3 {
              font-size: 18px;
            }

            &>p {
              // padding: 0;
              font-size: 15px;
              font-weight: normal;
              line-height: 25px;
            }
          }

          &>.auth-form-switch {
            width: 100%;
            padding: 10px;
            display: flex;
            flex-direction: column;

            &>* {
              font-size: 15px;
              font-weight: 700;
              line-height: 25px;
            }
          }
        }

        // form container
        &>.form-container {
          border-radius: unset;
          padding: 20px 10px;

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
    }
  }
}

// XX-SM
@media (min-width: 251px) and (max-width: 350.9px) {
  div.page-view {
    &>.auth-container {
      border-left: transparent;
      border-right: transparent;
      border-top: 1px solid #FFF;
      border-bottom: 1px solid #FFF;
      padding: 0;

      &>.auth-row {
        border: transparent;
        padding: 50px 20px 60px;
        flex-direction: column;
        row-gap: 50px;

        // form info container
        &>div.form-info-container {
          width: 100%;

          &>.description {
            row-gap: 25px;

            &>h3 {
              font-size: 20px;
            }

            &>p {
              // padding: 0;
              font-size: 15px;
              font-weight: normal;
              line-height: 25px;
            }
          }

          &>.auth-form-switch {
            width: 100%;
            padding: 10px;
            display: flex;
            flex-direction: column;

            &>* {
              font-size: 15px;
              font-weight: 700;
              line-height: 25px;
            }
          }
        }

        // form container
        &>.form-container {
          border-radius: unset;
          padding: 20px 10px;

          &>.n-form {
            &>.n-form-item {
              display: unset;

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
    }
  }
}

// X-SM
@media (min-width: 351px) and (max-width: 575.9px) {
  div.page-view {
    &>.auth-container {
      border-left: transparent;
      border-right: transparent;
      border-top: 1px solid #FFF;
      border-bottom: 1px solid #FFF;
      padding: 0;

      &>.auth-row {
        border: transparent;
        padding: 60px 10px 70px;
        flex-direction: column;
        row-gap: 50px;

        // form info container
        &>div.form-info-container {
          width: 100%;

          &>.description {
            row-gap: 25px;

            &>h3 {
              font-size: 24px;
            }

            &>p {
              // padding: 0;
              font-size: 16px;
              line-height: 30px;
            }
          }

          &>.auth-form-switch {
            width: 100%;
            padding: 21px 20px 28px;
            display: flex;
            flex-direction: column;

            &>* {
              font-size: 16px;
              line-height: 30px;
            }
          }
        }

        // form container
        &>.form-container {
          border-radius: 10px;
          padding: 30px;

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
                  font-size: 16px;
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
    }
  }
}

// SM
@media (min-width: 576px) and (max-width: 767.9px) {
  div.page-view {
    &>.auth-container {
      border-left: transparent;
      border-right: transparent;
      border-top: 1px solid #FFF;
      border-bottom: 1px solid #FFF;
      padding: 0;

      &>.auth-row {
        border: transparent;
        padding: 60px 20px 70px;
        flex-direction: column;
        row-gap: 50px;

        // form info container
        &>div.form-info-container {
          width: 100%;

          &>.description {
            row-gap: 25px;

            &>h3 {
              font-size: 27px;
            }

            &>p {
              // padding: 0;
              font-size: 18px;
              line-height: 30px;
            }
          }

          &>.auth-form-switch {
            width: 100%;
            padding: 21px 20px 28px;
            display: flex;
            flex-direction: column;

            &>* {
              font-size: 18px;
              line-height: 30px;
            }
          }
        }

        // form container
        &>.form-container {
          border-radius: 10px;
          padding: 50px;

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
                  font-size: 16px;
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
    }
  }
}

// MD
@media (min-width: 768px) and (max-width: 991.9px) {
  div.page-view {
    &>.auth-container {
      border-left: transparent;
      border-right: transparent;
      border-top: 1px solid #FFF;
      border-bottom: 1px solid #FFF;
      padding: 0;

      &>.auth-row {
        border: transparent;
        padding: 65px 20px 70px;
        column-gap: 40px;

        // form info container
        &>div.form-info-container {
          width: 100%;

          &>.description {
            row-gap: 25px;

            &>h3 {
              font-size: 22px;
            }

            &>p {
              // padding: 0;
              font-size: 16px;
              line-height: 30px;
            }
          }

          &>.auth-form-switch {
            width: 100%;
            padding: 21px 20px 28px;
            display: flex;
            flex-direction: column;

            &>* {
              font-size: 18px;
              line-height: 30px;
            }
          }
        }

        // form container
        &>.form-container {
          width: 100%;
          border-radius: 10px;

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
                  font-size: 16px;
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
                width: 100%;
                border-radius: 7px;
                border-radius: 7px;
                font-size: 15px;
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
    &>.auth-container {
      border-left: transparent;
      border-right: transparent;
      border-top: 1px solid #FFF;
      border-bottom: 1px solid #FFF;
      padding: 0;

      &>.auth-row {
        border: transparent;
        padding: 60px 58px;
        column-gap: 60px;

        // form info container
        &>.form-info-container {
          width: 100%;

          &>.auth-form-switch {
            width: 100%;
            padding: 21px 30px 28px;
            display: flex;
            flex-direction: column;
          }
        }

        // form container
        &>.form-container {
          width: 100%;
          border-radius: 20px;

          &>.n-form {
            &>.n-form-item {
              .form-group {
                width: 100%;

                // &>label {}

                &>span.input-info {
                  margin-top: 15px;
                  font-size: 15px;
                  line-height: 27px;
                }

                & span.check-box {
                  // font-size: 14px;
                  line-height: 25px;
                }

                // &>.input {}

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
    }
  }
}

// XL
// @media (min-width: 1201px) and (max-width: 1499.9px) {}

// XXL
@media (min-width: 1500px) {
  div.page-view {
    &>.auth-container {
      padding: 86px 200px;

      &>.auth-row {
        padding: 100px 50px;
        justify-content: center;
      }
    }
  }
}
</style>
