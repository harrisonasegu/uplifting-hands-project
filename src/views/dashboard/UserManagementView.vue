<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'

import { useAuthenticationStore } from '@/stores/modules/authentication'
import { useSystemUtilsStore } from '@/stores/modules/systemUtils'

import Preloader from '@/components/spinner/preloader.vue'
import ErrorContainer from '@/components/error-result/errorContainer.vue'
import GlobalButtonContainer from '@/components/tab/globalButtonContainer.vue'

import AllUsers from '@/components/tables/users_all.vue'
import ActiveUsers from '@/components/tables/users_active.vue'
import PendingUsers from '@/components/tables/users_pending.vue'

const userStore = useAuthenticationStore()
const systemUtilsStore = useSystemUtilsStore()

const buttonNames = ['All Users', 'Active Users', 'Pending Users']

const currentTab = ref<number>(1)

const loading = ref<boolean>(false)
const loadingError = ref<boolean>(false)

const handleTabButtonClick = (buttonIndex: number) => {
  currentTab.value = buttonIndex
}

onBeforeMount(async () => {
  loading.value = true

  await Promise.all([
    userStore.GetAllUsers(),
    userStore.GetAllActiveUsers(),
    userStore.GetAllUsersPendingApproval(),
    systemUtilsStore.GetUserRoles()
  ])
    .then(response => {
      if (
        response[0].responseCode !== '00'
      ) {
        loadingError.value = true
      }
      loading.value = false
    })
    .catch(() => {
      loading.value = false
    })
})
</script>

<template>
  <Preloader v-if="loading" />

  <section v-else-if="loadingError">
    <ErrorContainer />
  </section>

  <div v-else class="page-view">
    <section>
      <GlobalButtonContainer 
        :button-names="buttonNames"
        :current-tab="currentTab"
        @tab-button-clicked="handleTabButtonClick"
      />
    </section>

    <section>
      <AllUsers
        v-if="currentTab === 1"
        :isLoading="loading"
      />
      <ActiveUsers
        v-else-if="currentTab === 2"
        :isLoading="loading"
      />
      <PendingUsers
        v-else
        :isLoading="loading"
      />
    </section>
  </div>
</template>

<style lang="scss" scoped>
div.page-view {
  display: flex;
  flex-direction: column;
  row-gap: 50px;
}
</style>
