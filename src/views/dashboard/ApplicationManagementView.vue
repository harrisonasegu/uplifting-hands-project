<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'

import { useAuthenticationStore } from '@/stores/modules/authentication'
import { useFundOrFinancialAidStore } from '@/stores/modules/fundOrFinancialAid'

import Preloader from '@/components/spinner/preloader.vue'
import ErrorContainer from '@/components/error-result/errorContainer.vue'
import ApplicationButtonContainer from '@/components/tab/applicationButtonContainer.vue'

import ApplicationApproval from '@/components/tables/studentApplication_applicationApproval.vue'

const userStore = useAuthenticationStore()
const fundOrFinancialAidStore = useFundOrFinancialAidStore()

const user = userStore.getUser

const currentTab = ref<number>(2) // 2 is for pending applications

const loading = ref<boolean>(false)
const loadingError = ref<boolean>(false)

const handleTabButtonClick = (tabButton: number) => {
  currentTab.value = tabButton
}

const updateCurrentTabByUserRoleId = () => {
  const userRoleId = user.roleId

  switch (userRoleId) {
    case 4: // approval officer
      currentTab.value = 3
      break;

    case 5: // disbursement officer
      currentTab.value = 4
      break;
  }
}

const getApplicationStatusByUserRoleId = async () => {
  const userRoleId = user.roleId

  switch (userRoleId) {
    case 1: // super admin user
      return await fundOrFinancialAidStore.GetAllFundsOrFinancialAidApplications(currentTab.value)

    case 3: // review officer
      return await fundOrFinancialAidStore.GetAllFundsOrFinancialAidApplications(currentTab.value)

    case 4: // approval officer
      return await fundOrFinancialAidStore.GetAllFundsOrFinancialAidApplications(currentTab.value)

    case 5: // disbursement officer
      return await fundOrFinancialAidStore.GetAllFundsOrFinancialAidApplications(currentTab.value)

    case 6: // report user
      return await fundOrFinancialAidStore.GetAllFundsOrFinancialAidApplications(currentTab.value)
  }
}

onBeforeMount(async () => {
  // update current tab
  updateCurrentTabByUserRoleId()

  loading.value = true

  await getApplicationStatusByUserRoleId()
    .then(() => {
      loading.value = false
    })
    .catch(() => {
      loading.value = false
      loadingError.value = true
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
      <ApplicationButtonContainer 
        :current-tab="currentTab"
        @tab-button-clicked="handleTabButtonClick"
      />
    </section>

    <section>
      <ApplicationApproval
        :isLoading="loading"
        :currentTab="currentTab"
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
