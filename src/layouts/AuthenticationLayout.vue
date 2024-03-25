<script setup lang="ts">
import { NLayout, NLayoutContent } from 'naive-ui'

import AuthenticationLayoutHeader from '@/components/headers/authenticationHeader.vue'
</script>

<template>
  <n-layout class="open-layout">
    <n-layout class="open-layout-content">

      <AuthenticationLayoutHeader />
      
      <n-layout-content>
        <RouterView />
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<style lang="scss" scoped>
.open-layout {
  .open-layout-content {
    .n-layout-content {
      min-height: $layout-content-min-height;
    }
  }
}
</style>
