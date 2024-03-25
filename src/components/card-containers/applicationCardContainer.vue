<script setup lang="ts">
import { onBeforeMount } from 'vue'

import { BookOutline } from '@vicons/ionicons5'

import card from './card_applicationCard.vue'
import { useFundOrFinancialAidStore } from '@/stores/modules/fundOrFinancialAid'

defineProps({
  view: String,
  backgroundColor: {
    type: String,
    required: false
  }
})

const fundOrFinancialAidStore = useFundOrFinancialAidStore()
const applicationSummary = fundOrFinancialAidStore.getApplicationSummary

onBeforeMount(() => fundOrFinancialAidStore.GetApplicationSummary())
</script>

<template>
  <!-- cards container -->
  <div
    class="cards-container"
    :style="{ backgroundColor }"
  >
    <div
      :class="[
        'cards-wrap',
        view ? 'dashboard' : ''
      ]"
    >
      <!-- total -->
      <card
        summary-type="total"
        :iconComponent="BookOutline"
      >
        <template #cardName>Total</template>
        <template #count>{{ applicationSummary?.allApplications ?? 0 }}</template>
      </card>
    
      <!-- pending -->
      <card
        summary-type="pending"
        :iconComponent="BookOutline"
      >
        <template #cardName>Pending</template>
        <template #count>{{ applicationSummary?.pendingApplications ?? 0 }}</template>
      </card>
    
      <!-- successful -->
      <card
        summary-type="approved"
        :iconComponent="BookOutline"
      >
        <template #cardName>Approved</template>
        <template #count>{{ applicationSummary?.approvedApplications ?? 0 }}</template>
      </card>
    
      <!-- disbursed -->
      <card
        summary-type="disbursed"
        :iconComponent="BookOutline"
      >
        <template #cardName>Disbursed</template>
        <template #count>{{ applicationSummary?.disbursedApplications ?? 0 }}</template>
      </card>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// cards container
div.cards-container {
  width: 100%;
  overflow-x: hidden;

  div.cards-wrap {
    width: 100%;
    padding: 79px 50px;
    display: flex;
    flex-wrap: wrap;
    row-gap: 50px;
    column-gap: 31px;
    justify-content: center;

    // when used in dashboard
    &.dashboard {
      padding: 20px 0;
      column-gap: 31px;
      justify-content: space-evenly;
    }
  }
}


// MEDIA QUERY

// XX-SM (<251px)
@media (max-width: 250.9px) {
  // cards container
  div.cards-container {
    div.cards-wrap {
      padding: 30px 20px;

      // when used in dashboard
      &.dashboard {
        padding: 30px 0;
      }
    }
  }
}

// XX-SM
@media (min-width: 251px) and (max-width: 350.9px) {
  // cards container
  div.cards-container {
    div.cards-wrap {
      padding: 30px 20px;

      // when used in dashboard
      &.dashboard {
        padding: 30px 0;
      }
    }
  }
}

// X-SM
@media (min-width: 351px) and (max-width: 575.9px) {
  // cards container
  div.cards-container {
    div.cards-wrap {
      padding: 30px 20px;

      // when used in dashboard
      &.dashboard {
        padding: 30px 0;
      }
    }
  }
}

// SM
@media (min-width: 576px) and (max-width: 767.9px) {
  // cards container
  div.cards-container {
    div.cards-wrap {
      padding: 30px 20px;
    }
  }
}

// MD
@media (min-width: 768px) and (max-width: 991.9px) {
  // cards container
  div.cards-container {
    div.cards-wrap {
      padding: 30px 8px;

      // when used in dashboard
      &.dashboard {
        padding: 30px 0;
      }
    }
  }
}

// LG
@media (min-width: 992px) and (max-width: 1200.9px) {
  // cards container
  div.cards-container {
    div.cards-wrap {
      padding: 70px 30px;
      column-gap: 20px;

      // when used in dashboard
      &.dashboard {
        padding: 70px 0;
        column-gap: 20px;
      }
    }
  }
}

// XXL
@media (min-width: 1500px) {
  // cards container
  div.cards-container {
    div.cards-wrap {
      padding: 70px 165px;

      // when used in dashboard
      &.dashboard {
        padding: 50px 0;
      }
    }
  }
}
</style>
