<script setup lang="ts">
import { computed, reactive, ref } from 'vue'

import {
  useNotification,
  NButton,
  NForm,
  NFormItem,
  NInput ,
  NRow,
  NCol
} from 'naive-ui'

import type {
  FormInst,
  FormItemInst,
  FormItemRule,
  FormValidationError,
  FormRules
} from 'naive-ui'

import { useResponseNotification } from '@/composables/responseNotification'

import FormCard from '@/components/form/formCard.vue'

import type { ChangePasswordModel_Interface, UserData_Interface } from '@/interface/authentication'

import { useResponseMessageStore } from '@/stores/common/responseMessage'
import { useAuthenticationStore } from '@/stores/modules/authentication'

const notification = useNotification()

const responseMessageStore = useResponseMessageStore()
const userStore = useAuthenticationStore()

const user: UserData_Interface | null = userStore.getUser as UserData_Interface | null

const isLoading = ref<boolean>(false)

const formRef = ref<FormInst | null>(null)
const rPasswordFormItemRef = ref<FormItemInst | null>(null)

const model = reactive<ChangePasswordModel_Interface>({
  oldPassword: '',
  newPassword: '',
  reenteredPassword: ''
})

const inputRequired = computed(() => (model.oldPassword === '' || model.newPassword === '' || model.reenteredPassword === '' || (model.newPassword !== model.reenteredPassword)))

const rules: FormRules = {
  oldPassword: [
    {
      required: true,
      message: 'password is required'
    }
  ],
  newPassword: [
    {
      required: true,
      message: 'new password is required'
    }
  ],
  reenteredPassword: [
    {
      required: true,
      message: 'confirm new password',
      trigger: ['input', 'blur']
    },
    {
      validator: validatePasswordStartWith,
      message: 'password mismatch',
      trigger: 'input'
    },
    {
      validator: validatePasswordSame,
      message: 'password mismatch',
      trigger: ['input', 'blur']
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

function validatePasswordStartWith (
  rule: FormItemRule,
  value: string
): boolean {
  return (
    !!model.newPassword &&
    model.newPassword?.startsWith(value)
  )
}

function validatePasswordSame (rule: FormItemRule, value: string): boolean {
  return value === model.newPassword
}

function handlePasswordInput () {
  if (!model.reenteredPassword) return
  rPasswordFormItemRef.value?.validate({ trigger: 'input' })
}

function handleValidateButtonClick (e: MouseEvent) {
  e.preventDefault()
  formRef.value?.validate(
    (errors: Array<FormValidationError> | undefined) => {
      if (errors) return

      // loading state
      loadingState(true)

      // proceed to retrieve password
      userStore.ChangePassword({
        email: user?.email,
        oldPassword: model.oldPassword,
        newPassword: model.newPassword
      })
        .then(() => {
          // clear input
          clearInputFields()
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
  <div class="page-view">
    <FormCard header-title="Create New Password">
      <n-form ref="formRef" :model="model" :rules="rules">
        <n-form-item
          path="oldPassword"
          label="Old Password"
        >
          <n-input
            v-model:value="model.oldPassword"
            :disabled="isLoading"
            type="password"
            @keydown.enter.prevent
          />
        </n-form-item>
        <n-form-item
          path="newPassword"
          label="New Password"
        >
          <n-input
            v-model:value="model.newPassword"
            :disabled="!model.oldPassword || isLoading"
            type="password"
            @keydown.enter.prevent
          />
        </n-form-item>
        <n-form-item
          ref="rPasswordFormItemRef"
          first
          path="reenteredPassword"
          label="Confirm Password"
        >
          <n-input
            v-model:value="model.reenteredPassword"
            :disabled="!model.newPassword || isLoading"
            type="password"
            @input="handlePasswordInput"
            @keydown.enter.prevent
          />
        </n-form-item>

        <n-row :gutter="[0, 24]">
          <n-col :span="24">
            <div style="display: flex; justify-content: flex-end">
              <n-button
                round
                type="primary"
                :loading="isLoading"
                :disabled="inputRequired || isLoading"
                @click="handleValidateButtonClick"
              >
                Submit
              </n-button>
            </div>
          </n-col>
        </n-row>
      </n-form>
    </FormCard>
  </div>
</template>

<style lang="scss" scoped>
.page-view {
  padding: 50px 20px;
  display: flex;
  justify-content: center;
}
</style>
