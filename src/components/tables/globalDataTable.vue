<script setup lang="ts">
import type { PropType } from 'vue';
import { NDataTable } from 'naive-ui'

defineProps({
  columns: {
    type: Array as PropType<any>,
    required: true
  },
  data: {
    type: Array as PropType<any>,
    required: true
  },
  count: {
    type: Number as PropType<number>,
    required: true
  },
  rowKey: [Function, String, Number] as PropType<any>,
  remote: Boolean,
  loading: Boolean,
  pagination: Object,
  scrollX: Number
})

const emit = defineEmits([
  'getCurrentPage',
  'getCurrentPageSize'
])

const getCurrentPage = (page: number|string) => emit('getCurrentPage', page)
const getCurrentPageSize = (pageSize: number | string) => emit('getCurrentPageSize', pageSize)
</script>

<template>
  <n-data-table
    :remote="remote"
    :loading="loading"
    :columns="columns"
    :data="data"
    :row-key="rowKey"
    :pagination="count < 10 ? false : {
      ...pagination,
      showSizePicker: true,
      pageSizes: [10, 20, 50, 100],
      itemCount: count,
      displayOrder: ['size-picker', 'pages']
    }"
    :scroll-x="scrollX"
    striped
    :on-update:page="getCurrentPage"
    :on-update:page-size="getCurrentPageSize"
  />
</template>
