<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue'

import { useStudentApplicationProgressStore } from '@/stores/modules/studentApplicationProgress'
import { useAuthenticationStore } from '@/stores/modules/authentication'
import { useFundOrFinancialAidStore } from '@/stores/modules/fundOrFinancialAid'
import { useSystemUtilsStore } from '@/stores/modules/systemUtils'

import CreateButton from '@/components/student-portal/createButton.vue'
import ApplicationHistoryButton from '@/components/student-portal/applicationHistoryButton.vue'
import CreateProfileForm from '@/components/student-portal/createProfileForm.vue'
import FundApplicationForm from '@/components/student-portal/fundApplicationForm.vue'
import FundApplicationSaved from '@/components/student-portal/savedApplicationStatus.vue'
import FundApplicationGlobalStatus from '@/components/student-portal/globalApplicationStatus.vue'

import Preloader from '@/components/spinner/preloader.vue'
import ErrorContainer from '@/components/error-result/errorContainer.vue'

const studentApplicationProgressStore = useStudentApplicationProgressStore()
const userStore = useAuthenticationStore()
const fundOrFinancialAidStore = useFundOrFinancialAidStore()
const systemUtilsStore = useSystemUtilsStore()

const isCreateProfileButtonClicked = studentApplicationProgressStore.getIsCreateProfileButtonClicked
const isCreateFundApplicationButtonClicked = studentApplicationProgressStore.getIsCreateFundApplicationButtonClicked
const isEditFundApplicationButtonClicked = studentApplicationProgressStore.getIsEditFundApplicationButtonClicked
const isFundApplicationHistoryButtonClicked = studentApplicationProgressStore.getIsFundApplicationHistoryButtonClicked

const userProfile = userStore.getUserProfile
const allFundApplicationsByStudent = fundOrFinancialAidStore.getAllFundApplicationsByStudent
const fundApplication = fundOrFinancialAidStore.getActiveFundApplicationByUserId

const isProfileLoading = ref<boolean>(false)
const loadingError = ref<boolean>(false)

const profileLoadingState = (state: boolean) => {
  isProfileLoading.value = state
}

const getUserProfile = async () => {
  const user = userStore.getUser

  return await userStore.GetUserProfile(user?.email)
}

onBeforeMount(async () => {
  const user = userStore.getUser

  // preloader state
  profileLoadingState(true)

  await Promise.all([
    await getUserProfile(),
    await systemUtilsStore.GetApplicationStatus(),
    await fundOrFinancialAidStore.GetTopTenDisbursedApplicationByUserId(user?.userId),
    await fundOrFinancialAidStore.GetActiveFundApplicationByUserId(user?.userId)
  ])
    .then(response => {
      if (
        response[0].responseCode !== '00' ||
        response[1].responseCode !== '00'
      ) {
        loadingError.value = true
      }

      profileLoadingState(false)
    })
    .catch(() => {
      loadingError.value = true
      profileLoadingState(false)
    })
})
</script>

<template>
  <section v-if="isProfileLoading">
    <Preloader />
  </section>

  <section v-else-if="loadingError">
    <ErrorContainer />
  </section>

  <section v-else class="portal-container">
    <!-- student profile and fund application buttons -->
    <h3>
      {{ (!fundApplication)
        ? 'Welcome to Student Fund Portal!'
        : 'Application Status' }}
    </h3>
    
    <div>
      <div class="application-level">
        <!-- student profile -->
        <section
          v-if="!userProfile?.isProfileComplete"
          class="student-profile"
        >
          <!-- create profile button component -->
          <CreateButton
            v-if="!isCreateProfileButtonClicked"
            button-label="Create a profile to get started"
          />

          <!-- create profile component -->
          <CreateProfileForm v-else />
        </section>

        <!-- fund application -->
        <section
          v-else-if="userProfile?.isProfileComplete"
          class="student-profile"
        >
          <!-- create fund application button -->
          <CreateButton
            v-if="!fundApplication && !isCreateFundApplicationButtonClicked"
            button-label="Fund Application"
          />

          <!-- fund application form -->
          <FundApplicationForm
            v-if="isCreateFundApplicationButtonClicked || isEditFundApplicationButtonClicked"
            :hasFundApplication_="fundApplication ? true : false"
          />

          <!-- saved fund application -->
          <FundApplicationSaved
            v-if="(
              (fundApplication && fundApplication?.status?.toLowerCase() === 'saved') &&
              !isEditFundApplicationButtonClicked
            )"
          />

          <!-- fund application status -->
          <FundApplicationGlobalStatus
            v-if="fundApplication && fundApplication?.status?.toLowerCase() !== 'saved'"
          />
        </section>
      </div>
    </div>
    
    <!-- application history button -->
    <div 
      v-if="!isCreateFundApplicationButtonClicked && allFundApplicationsByStudent.length"
    >
      <ApplicationHistoryButton
        button-label="Application History"
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
