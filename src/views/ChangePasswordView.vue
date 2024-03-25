<script setup lang="ts">
import { computed, reactive, ref, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import {
  useNotification,
  NButton,
  NForm,
  NFormItem,
  NInput ,
  NRow,
  NCol,
  NA
} from 'naive-ui'

import type {
  FormInst,
  FormItemInst,
  FormItemRule,
  FormValidationError,
  FormRules
} from 'naive-ui'

import Spinner from '@/components/spinner/pageSpinner.vue'
import ErrorResult from '@/components/error-result/errorResult.vue'
import FormCard from '@/components/form/formCard.vue'

import { useResponseNotification } from '@/composables/responseNotification'

import { useResponseMessageStore } from '@/stores/common/responseMessage'
import { useAuthenticationStore } from '@/stores/modules/authentication'

const router = useRouter()
const query = useRoute().query

const notification = useNotification()

const responseMessageStore = useResponseMessageStore()
const userStore = useAuthenticationStore()

const isLoading = ref<boolean>(false)
const isValidatingChangePasswordUrl = ref(false)
const isInvalidChangePasswordUrl = ref(false)
const isChangePasswordSuccessful = ref(false)

const btnText = ref('')

const formRef = ref<FormInst | null>(null)
const rPasswordFormItemRef = ref<FormItemInst | null>(null)

const model = reactive<{
  newPassword: string,
  reenteredPassword: string
}>({
  newPassword: '',
  reenteredPassword: ''
})

const inputRequired = computed(() => (model.newPassword === '' || model.reenteredPassword === '' || (model.newPassword !== model.reenteredPassword)))

const rules: FormRules = {
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

function handleClickedButton() {
  router.push('/')
}

function handleClickedLink() {
  router.push('/login')
}

function clearInputFields() {
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
        email: query.a as string,
        oldPassword: query.k as string,
        newPassword: model.newPassword
      })
        .then(response => {
          const { responseCode } = response

          switch (responseCode) {
            // successful
            case '00':
              isChangePasswordSuccessful.value = true
              // clear input
              clearInputFields()
              // logout user
              userStore.Logout({ email: query.a as string })
              break
          }

          // loading state
          loadingState(false)
          // notification
          showNotification(5000)

          // logout user
        })
        .catch(() => {
          isChangePasswordSuccessful.value = false

          // loading state
          loadingState(false)
          // notification
          showNotification(5000)
        })
    }
  )
}

async function validateChangePasswordUrl () {
  // url validation state
  isValidatingChangePasswordUrl.value = true

  // background user login
  await userStore.Login({
    email: query.a as string,
    password: query.k as string
  })
    .then(response => {
      const { responseCode } = response
      
      switch (responseCode) {
        // successful login
        case '00':
          isInvalidChangePasswordUrl.value = false
          break

        // unsuccessful login
        default:
          isInvalidChangePasswordUrl.value = true
          break
      }

      // url validation state
      isValidatingChangePasswordUrl.value = false
    })
    .catch(() => {
      // url validation state
      isValidatingChangePasswordUrl.value = false

      isInvalidChangePasswordUrl.value = true
    })
}

onBeforeMount(() => {
  // redirect to not found if no query is found in current route
  if (!query.a) router.push('/not-found')
  else validateChangePasswordUrl()
})
</script>

<template>
  <div class="page-view">
    <!-- spinner -->
    <Spinner v-if="isValidatingChangePasswordUrl" />

    <!-- invalid reset password url -->
    <ErrorResult
      v-else-if="isInvalidChangePasswordUrl"
      status="404"
      title="Server Error"
      description="This link is broken or does not exist on our server"
      size="huge"
      :btnText="btnText"
      @handleClickedButton="handleClickedButton"
    >
      <n-button
        @click="handleClickedButton"
      >Go To Home Page</n-button>
    </ErrorResult>

    <!-- password reset form for valid reset password url -->
    <FormCard
      v-else
      :header-title="isChangePasswordSuccessful ? 'Login to continue' : 'Create New Password'"
    >
      <!-- successful password change -->
      <n-a
        v-if="isChangePasswordSuccessful"
        class="login-and-forgot-password"
        @click.prevent="handleClickedLink"
        href="/login"
      ><strong>user login</strong></n-a>

      <!-- form to change password -->
      <n-form
        v-else
        ref="formRef"
        :model="model"
        :rules="rules"
      >
        <n-form-item
          path="newPassword"
          label="New Password"
        >
          <n-input
            v-model:value="model.newPassword"
            :disabled="isLoading"
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
