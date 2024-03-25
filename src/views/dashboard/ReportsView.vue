<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'

import { useFundOrFinancialAidStore } from '@/stores/modules/fundOrFinancialAid'

import Preloader from '@/components/spinner/preloader.vue'
import ErrorContainer from '@/components/error-result/errorContainer.vue'
import ReportButtonContainer from '@/components/tab/reportButtonContainer.vue'

import ReportsDataTable from '@/components/tables/studentApplication_report.vue'

const fundOrFinancialAidStore = useFundOrFinancialAidStore()

const currentTab = ref<number>(2) // 2 is for pending applications

const loading = ref<boolean>(false)
const loadingError = ref<boolean>(false)

const handleTabButtonClick = (tabButton: number) => {
  currentTab.value = tabButton
}

const getPendingFinancialApplicationReport = async () => {
  loading.value = true

  await fundOrFinancialAidStore.GetAllFundsOrFinancialAidApplications(2) // pending = 2
    .then(() => {
      loading.value = false
    })
    .catch(() => {
      loading.value = false
      loadingError.value = true
    })
}

onBeforeMount(() => getPendingFinancialApplicationReport())
</script>

<template>
  <Preloader v-if="loading" />

  <section v-else-if="loadingError">
    <ErrorContainer />
  </section>

  <div v-else class="page-view">
    <section>
      <ReportButtonContainer 
        :current-tab="currentTab"
        @tab-button-clicked="handleTabButtonClick"
      />
    </section>

    <section>
      <ReportsDataTable
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
