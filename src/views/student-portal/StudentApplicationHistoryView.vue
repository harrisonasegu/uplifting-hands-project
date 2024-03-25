<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue'

import { useAuthenticationStore } from '@/stores/modules/authentication'
import { useFundOrFinancialAidStore } from '@/stores/modules/fundOrFinancialAid'

import Preloader from '@/components/spinner/preloader.vue'
import ErrorContainer from '@/components/error-result/errorContainer.vue'
import StudentApplicationHistory from '@/components/tables/studentApplication_studentApplicationHistory.vue'

const userStore = useAuthenticationStore()
const fundOrFinancialAidStore = useFundOrFinancialAidStore()

const allFundApplicationsByStudent = fundOrFinancialAidStore.getAllFundApplicationsByStudent

const loading = ref<boolean>(false)
const loadingError = ref<boolean>(false)

const loadingState = (state: boolean) => {
  loading.value = state
}

onBeforeMount(async () => {
  if (allFundApplicationsByStudent.value?.length) return
  
  const user = userStore.getUser

  // preloader state
  loadingState(true)

  await fundOrFinancialAidStore.GetTopTenDisbursedApplicationByUserId(user?.userId)
    .then(response => {
      if (response.responseCode !== '00') {
        loadingError.value = true
      }

      loadingState(false)
    })
    .catch(() => {
      loadingError.value = true
      loadingState(false)
    })
})
</script>

<template>
  <section v-if="loading">
    <Preloader />
  </section>

  <section v-else-if="loadingError">
    <ErrorContainer />
  </section>

  <section v-else class="portal-container">
    <h3>Application History</h3>
    
    <div>
      <StudentApplicationHistory
       :isLoading="loading"
    />
    </div>
  </section>
</template>

<style lang="scss" scoped>
section.portal-container {
  border-top: 3px solid #ffffff;
  border-bottom: 3px solid #ffffff;
  padding: 60px 65px;
  display: flex;
  flex-direction: column;
  row-gap: 30px;
  background-color: $base-color;

  // caption
  &>h3 {
    text-align: center;
    font-size: 30px;
    font-weight: 800;
    color: #FFF;
  }

  &>div.application-level,
  &>div.application-level>section {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
  }
}

// MEDIA QUERY

// XX-SM (<251px)
@media (max-width: 250.9px) {
  section.portal-container {
    border-top: 1px solid #ffffff;
    border-bottom: 1px solid #ffffff;
    padding: 61px 10px 80px;
    row-gap: 61px;

    // caption
    &>h3 {
      font-size: 18px;
      font-weight: 600;
    }

    // &>div.application-level {
    //   &>section {}
    // }
  }
}

// XX-SM
@media (min-width: 251px) and (max-width: 350.9px) {
  section.portal-container {
    border-top: 1px solid #ffffff;
    border-bottom: 1px solid #ffffff;
    padding: 61px 10px 80px;
    row-gap: 61px;

    // caption
    &>h3 {
      font-size: 20px;
      font-weight: 600;
    }

    // &>div.application-level {
    //   &>section {}
    // }
  }
}

// X-SM
@media (min-width: 351px) and (max-width: 575.9px) {
  section.portal-container {
    border-top: 2px solid #ffffff;
    border-bottom: 2px solid #ffffff;
    padding: 61px 20px 80px;
    row-gap: 61px;

    // caption
    &>h3 {
      font-size: 22px;
      font-weight: 600;
    }

    // &>div.application-level {
    //   &>section {}
    // }
  }
}

// SM
@media (min-width: 576px) and (max-width: 767.9px) {
  section.portal-container {
    border-top: 2px solid #ffffff;
    border-bottom: 2px solid #ffffff;
    padding: 61px 20px 80px;
    row-gap: 61px;

    // caption
    &>h3 {
      font-size: 22px;
      font-weight: 600;
    }

    // &>div.application-level {
    //   &>section {}
    // }
  }
}

// MD
@media (min-width: 768px) and (max-width: 991.9px) {
  section.portal-container {
    border-top: 2px solid #ffffff;
    border-bottom: 2px solid #ffffff;
    padding: 80px 20px 100px;
    row-gap: 61px;

    // caption
    &>h3 {
      font-size: 22px;
      font-weight: 600;
    }

    // &>div.application-level {
    //   &>section {}
    // }
  }
}

// LG
@media (min-width: 992px) and (max-width: 1200.9px) {
  section.portal-container {
    // caption
    &>h3 {
      font-size: 30px;
      font-weight: 700;
    }

    // &>div.application-level {
    //   &>section {}
    // }
  }
}

// XL
// @media (min-width: 1201px) and (max-width: 1499.9px) {}

// XXL
@media (min-width: 1500px) {
  section.portal-container {
    padding: 60px 210px;
  }
}
</style>
