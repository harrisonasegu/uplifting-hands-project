<script setup lang="ts">
import { NScrollbar } from 'naive-ui'

import { useAuthenticationStore } from '@/stores/modules/authentication'

defineProps({
  currentTab: Number
})

const userStore = useAuthenticationStore()

const userRoleId = userStore.getUser.roleId

const emit = defineEmits(['tabButtonClicked'])

const handleTabButtonClick = (tabButton: number) => emit('tabButtonClicked', tabButton)
</script>

<template>
  <n-scrollbar x-scrollable>
    <div class="btn-container">
      <!-- <button
        v-if="[1, 3, 6].includes(userRoleId)" -->
      <button
        size="large"
        :class="currentTab === (2) ? 'active-tab' : ''"
        @click="handleTabButtonClick(2)"
      >Pending Applications</button>

      <!-- <button
        v-if="[1, 4, 6].includes(userRoleId)" -->
      <button
        size="large"
        :class="currentTab === (3) ? 'active-tab' : ''"
        @click="handleTabButtonClick(3)"
      >Reviewed Applications</button>

      <!-- <button
        v-if="[1, 5, 6].includes(userRoleId)" -->
      <button
        size="large"
        :class="currentTab === (4) ? 'active-tab' : ''"
        @click="handleTabButtonClick(4)"
      >Approved Applications</button>

      <!-- <button
        v-if="[1, 5, 6].includes(userRoleId)" -->
      <button
        size="large"
        :class="currentTab === (5) ? 'active-tab' : ''"
        @click="handleTabButtonClick(5)"
      >Declined Applications</button>

      <!-- <button
        v-if="[1, 5, 6].includes(userRoleId)" -->
      <button
        size="large"
        :class="currentTab === (6) ? 'active-tab' : ''"
        @click="handleTabButtonClick(6)"
      >Disbursed Applications</button>
    </div>
  </n-scrollbar>
</template>

<style lang="scss" scoped>
div.btn-container {
  padding: 10px 0;
  display: flex;
  column-gap: 20px;

  &>button {
    width: 220px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid $base-color;
    box-sizing: border-box;
    border-radius: 5px;
    padding: 10px 20px;
    font-size: 15px;
    font-weight: 600;
    transition: all 0.3s;
    background: #f9fcf9;
    color: #575f6e;
    cursor: pointer;

    &:not(.active-tab):hover {
      opacity: 0.8;
    }

    // active buttons
    &.active-tab {
      background: $base-color;
      color: #ffffff;
    }
  }
}

// MEDIA QUERY

// XX-SM (<251px)
@media (max-width: 250.9px) {
  div.btn-container {
    &>button {
      width: max-content;
      column-gap: 10px;
      padding: 10px;
      font-size: 14px;
      font-weight: unset;
    }
  }
}

// XX-SM
@media (min-width: 251px) and (max-width: 350.9px) {
  div.btn-container {
    &>button {
      width: max-content;
      padding: 10px 20px;
      font-size: 14px;
      font-weight: unset;
    }
  }
}

// X-SM
@media (min-width: 351px) and (max-width: 575.9px) {
   div.btn-container {
    &>button {
      font-size: 14px;
      font-weight: unset;
    }
  }
}

// SM
@media (min-width: 576px) and (max-width: 767.9px) {
  div.btn-container {
    &>button {
      font-size: 15px;
      font-weight: unset;
    }
  }
}
</style>
