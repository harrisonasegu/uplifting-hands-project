<script setup lang="ts">
// import { onBeforeMount, ref } from 'vue'

// import { useFundOrFinancialAidStore } from '@/stores/modules/fundOrFinancialAid'

// import Preloader from '@/components/spinner/preloader.vue'
// import ErrorContainer from '@/components/error-result/errorContainer.vue'
import SettinsContainer from '@/components/dashboard-settings/settingsContainer.vue'

// const fundOrFinancialAidStore = useFundOrFinancialAidStore()

// const loading = ref<boolean>(false)
// const loadingError = ref<boolean>(false)

// onBeforeMount(async () => {
//   loading.value = true

//   await Promise.all([
//     fundOrFinancialAidStore.GetAllFundsOrFinancialAidApplications(2)
//   ])
//     .then(() => {
//       loading.value = false
//     })
//     .catch(() => {
//       loading.value = false
//     })
// })
</script>

<template>
  <!-- <Preloader v-if="loading" />

  <section v-else-if="loadingError">
    <ErrorContainer />
  </section>

  <div v-else class="page-view"> -->
  <div class="page-view">
    <SettinsContainer />
  </div>
</template>
