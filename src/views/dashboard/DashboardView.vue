<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { NH3 } from 'naive-ui'

import { useFundOrFinancialAidStore } from '@/stores/modules/fundOrFinancialAid'

import Preloader from '@/components/spinner/preloader.vue'
import ErrorContainer from '@/components/error-result/errorContainer.vue'

import CardContainer from '@/components/card-containers/applicationCardContainer.vue'
import DashboardboardHistory from '@/components/tables/studentApplication_dashboardHistory.vue'

const fundOrFinancialAidStore = useFundOrFinancialAidStore()

const loading = ref<boolean>(false)
const loadingError = ref<boolean>(false)

onBeforeMount(async () => {
  loading.value = true

  await Promise.all([
    fundOrFinancialAidStore.GetAllFundsOrFinancialAidApplications(2)
  ])
    .then(response => {
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
    <CardContainer
      view="dashboard"
    />

    <n-h3>Application History</n-h3>

    <DashboardboardHistory
      :isLoading="loading"
    />
  </div>
</template>

<style lang="scss" scoped>
.page-view {
  .n-h3 {
    font-weight: 700;
  }
}
</style>
