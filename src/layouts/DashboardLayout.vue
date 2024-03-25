<script setup lang="ts">
import { watch } from 'vue'
import { NLayout, NLayoutContent, useNotification } from 'naive-ui'

import DashboardSidebar from '@/components/sidebars/dashboardSidebar.vue'
import DashboardHeader from '@/components/headers/dashboardHeader.vue'
// import DashboardFooter from '@/components/footers/dashboardFooter.vue'

import { useResponseNotification } from '@/composables/responseNotification'
import { useResponseMessageStore } from '@/stores/common/responseMessage'
import { useGlobalSpinnerStore } from '@/stores/common/globalSpinner'
import { useAuthenticationStore } from '@/stores/modules/authentication'
import { useToBase64 } from '@/composables/base64'

import type { Email_Interface } from '@/interface/authentication'

const notification = useNotification()
const responseMessageStore = useResponseMessageStore()
const globalSpinner = useGlobalSpinnerStore()
const authStore = useAuthenticationStore()

const isLogoutMenuClicked = authStore.getIsLogoutMenuClicked

const showNotification = (duration: number) => {
  useResponseNotification(
    notification,
    responseMessageStore.response.status,
    responseMessageStore.response.title,
    responseMessageStore.response.message,
    duration
  )
}

const handleLogout = async () => {
  const payload: Email_Interface = { email: useToBase64(authStore.getUser?.email) }

  // toggle global spinner
  globalSpinner.setSpinnerState(true)

  await authStore.Logout(payload)
    .then((response) => {
      if (response.responseCode !== '00') {
        // toggle global spinner
        globalSpinner.setSpinnerState(false)
        // toggle logout button click state
        authStore.updateIsLogoutMenuClicked(false)

        // show notification
        showNotification(5000)
      } else {
        // route to home page
        location.assign('/')
      }
    })
    .catch(() => {
      // toggle global spinner
      globalSpinner.setSpinnerState(false)
      // toggle logout button click state
      authStore.updateIsLogoutMenuClicked(false)

      // show notification
      showNotification(5000)
    })
}

watch(isLogoutMenuClicked, (value: boolean) => {
  if (value) handleLogout()
})
</script>

<template>
  <n-layout position="absolute" has-sider class="dashboard-layout">
    <DashboardSidebar />

    <n-layout class="dashboard-content">
      <DashboardHeader />
      
      <n-layout-content>
        <RouterView />
      </n-layout-content>

      <!-- <DashboardFooter /> -->
    </n-layout>
  </n-layout>
</template>

<style lang="scss" scoped>
.dashboard-layout {
  .dashboard-content {
    .n-layout-content {
      min-height: $layout-content-min-height;
      padding: 20px;
    }
  }
}
</style>