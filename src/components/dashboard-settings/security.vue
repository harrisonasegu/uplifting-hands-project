<script setup lang="ts">
import { computed, ref, reactive } from 'vue'

import {
  NForm,
  NFormItem,
  NInput,
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

import type { ChangePasswordModel_Interface } from '@/interface/authentication'

import { useResponseNotification } from '@/composables/responseNotification'
import { RegEx } from '@/composables/regex/regex'

import { useResponseMessageStore } from '@/stores/common/responseMessage'
import { useAuthenticationStore } from '@/stores/modules/authentication'

const notification = useNotification()

const responseMessageStore = useResponseMessageStore()
const userStore = useAuthenticationStore()

const isLoading = ref<boolean>(false)

const formRef = ref<FormInst | null>(null)
const reenteredPasswordFormItemRef = ref<FormItemInst | null>(null)

const model = reactive<ChangePasswordModel_Interface>({
  oldPassword: '',
  newPassword: '',
  reenteredPassword: ''
})

const inputRequired = computed((): boolean =>
  model.oldPassword === '' ||
  model.newPassword === '' ||
  model.reenteredPassword === ''
)

const rules: FormRules = {
  newPassword: [
    {
      required: true,
      validator: passwordRegexValidator,
      trigger: ['input', 'blur']
    }
  ],
  reenteredPassword: [
    {
      required: true,
      message: 'Re-entered password is required',
      trigger: ['input', 'blur']
    },
    {
      required: true,
      validator: reenteredPasswordValidator,
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
  model.oldPassword = ''
  model.newPassword = ''
  model.reenteredPassword = ''
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

function reenteredPasswordValidator(rule: FormItemRule, value: string): boolean {
  return (value === model.newPassword)
}

function handlePasswordInput() {
  if (!model.reenteredPassword) return
  reenteredPasswordFormItemRef.value?.validate({ trigger: 'input' })
}

function handleButtonClick(e: MouseEvent) {
  e.preventDefault()

  formRef.value?.validate(
    (errors: Array<FormValidationError> | undefined) => {
      if (errors) return

      // loading state
      loadingState(true)

      // proceed to login
      userStore.ChangePassword({
        email: userStore.getUser.email,
        oldPassword: model.oldPassword,
        newPassword: model.newPassword
      })
        .then(response => {
          // show notification for login error
          if (response.responseCode === '00') {
            // clear input
            clearInputFields()
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
  )
}
</script>

<template>
  <div class="form-container">
    <n-form ref="formRef" :model="model" :rules="rules">
      <n-form-item path="oldPassword">
        <div class="form-group">
          <label>Old Password</label>
          <n-input
            class="input"
            size="large"
            placeholder=""
            v-model:value="model.oldPassword"
            :disabled="isLoading"
            type="password"
            @keydown.enter.prevent
          />
        </div>
      </n-form-item>

      <n-form-item path="newPassword">
        <div class="form-group">
          <label>New Password</label>
          <n-input
            class="input"
            size="large"
            placeholder=""
            v-model:value="model.newPassword"
            :disabled="!model.oldPassword || isLoading"
            type="password"
            @keydown.enter.prevent
          />
          <!-- <span class="input-info">
            Password must be 8 characters or more and must contain upper case alphabet, lower case alphabet, number
            and symbol.
          </span> -->
        </div>
      </n-form-item>

      <n-form-item path="reenteredPassword" first ref="reenteredPasswordFormItemRef">
        <div class="form-group">
          <label>Confirm Password</label>
          <n-input
            class="input"
            size="large"
            placeholder=""
            v-model:value="model.reenteredPassword"
            :disabled="!model.newPassword || isLoading"
            type="password"
            @input="handlePasswordInput"
            @keydown.enter.prevent
          />
        </div>
      </n-form-item>

      <div class="submit-btn-container">
        <n-button :disabled="inputRequired || isLoading" type="primary" :loading="isLoading"
          @click="handleButtonClick">SUBMIT</n-button>
      </div>
    </n-form>
  </div>
</template>

<style lang="scss" scoped>
div.form-container {
  color: $base-color;

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
          padding-top: 0;
        }

        &>label {
          width: 100%;
          // margin-bottom: 10px;
          font-size: 16px;
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
        width: 250px;
        height: 45px;
        border-radius: 50px;
        align-items: center;
        font-size: 18px;
        font-weight: 600 !important;
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
  div.form-container {
    border-radius: unset;

    &>.n-form {
      &>.n-form-item {
        div.form-group {
          width: 100%;

          &>label {
            margin-bottom: 10px;
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
  div.form-container {
    &>.n-form {
      &>.n-form-item {
        display: unset;

        div.form-group {
          width: 100%;

          &>label {
            margin-bottom: 10px;
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
  div.form-container {
    padding: 0 0 20px;

    &>.n-form {
      &>.n-form-item {
        display: unset;

        div.form-group {
          width: 100%;

          &>label {
            margin-bottom: 10px;
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
          // width: 100%;
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
  div.form-container {
    padding: 0 40px 20px;

    &>.n-form {
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
        &>.n-button {
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
  div.form-container {
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
          border-radius: 7px;
          border-radius: 7px;
          font-size: 15px;
        }
      }
    }
  }
}

// LG
// @media (min-width: 992px) and (max-width: 1200.9px) {}

// XL
// @media (min-width: 1201px) and (max-width: 1499.9px) {}

// XXL
// @media (min-width: 1500px) {}
</style>
