<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { NEl } from 'naive-ui'

import HeaderUserDropdown from '@/components/headers/headerUserDropdown.vue'
import type { PropType } from 'vue';

const route = computed(() => useRoute()?.name?.toString().toUpperCase())

defineProps({
    tag: {
        type: String as PropType<string>,
        required: false
    }
})
</script>

<template>
    <div class="route-title-container">
        <n-el :tag="tag">{{ route }}</n-el>

        <HeaderUserDropdown />
    </div>
</template>

<style lang="scss" scoped>
.route-title-container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #ffffff;
}
</style>
