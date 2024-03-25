<script setup lang="ts">
import {  NCard } from 'naive-ui'
import type { PropType } from 'vue'

defineProps({
    headerTitle: {
        type: String as PropType<string>
    }
})
</script>

<template>
    <n-card :title="headerTitle" hoverable>
      <slot />
    </n-card>
</template>

<style lang="scss" scoped>
.n-card {
    max-width: 350px;
}

@media (max-width: 575.9px) {
    .n-card {
        max-width: 100%;
    }
}
</style>
