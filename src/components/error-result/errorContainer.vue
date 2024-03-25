<script setup lang="ts">
import ErrorResult from '@/components/error-result/errorResult.vue'

defineProps({
  status: {
    type: String,
    required: false
  },
  title: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  }
})

function handleClickedButton() {
  location.reload()
}
</script>

<template>
  <div class="no-product">
    <ErrorResult 
      :status="status ?? '500'"
      :title="title ?? 'Oops! An error occured'"
      :description="description ?? 'Refresh Page'"
      size="small"
      @handleClickedButton="handleClickedButton"
    />
  </div>
</template>

<style lang="scss" scoped>
div.no-product {
  padding: 100px 0;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
}
</style>
