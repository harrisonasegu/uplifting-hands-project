<script setup lang="ts">
import { defineEmits, ref } from 'vue'
import { NButton, NInput, NSpace } from 'naive-ui'

const props = defineProps({
  disableAddButton: Boolean
})
const emits = defineEmits([
  'filterTableData',
  'addProductButtonClicked',
])

const filterInput = ref('')

class DataTableFilter {
  filterTableData = () => emits('filterTableData', filterInput.value)

  addProductButtonClicked = () => emits('addProductButtonClicked')
}

const dataTableFilter = new DataTableFilter()
</script>

<template>
  <n-space
    vertical
    :size="20"
    class="filter-container"
  >
    <n-space justify="space-between" class="download-btn-container">
      <div>
        <n-input
          v-model:value="filterInput"
          @input="dataTableFilter.filterTableData"
          placeholder="Filter record...."
        />
      </div>

      <div>
        <n-space>
          <n-button
            type="primary"
            :disabled="disableAddButton"
            @click="dataTableFilter.addProductButtonClicked"
          >
            <span>Add Product &nbsp;</span>
            <Icon icon="material-symbols:add" height="25" />
          </n-button>
        </n-space>
      </div>
    </n-space>
  </n-space>
</template>

<style lang="scss">
.filter-container {
  padding-bottom: 20px;

  // filter input section
  .filter-inputs-container {
    display: none !important;
  }

  // filter bar and download section
  .download-btn-container {
    &>div {
      // search filter
      &:first-child {
        width: calc(100% - 180px);

        .n-input {
          width: 100%;
        }
      }

      // download button
      &:last-child {
        width: max-content;

        .n-button {
          width: 100%;
        }
      }
    }
  }
}


@media (max-width: 767.9px) {
  .filter-container {
    .filter-inputs-container {
      // search input section
      .filter-input {
        width: 100%;
      }
    }

    // filter and download section
    .download-btn-container {
      &>div {
        width: 100%;

        // search filter
        &:first-child {
          width: 100%;
        }
      }
    }
  }
}

@media (min-width: 768px) and (max-width: 991.9px) {
  .filter-container {
    .filter-inputs-container {
      // search input section
      .filter-input {
        width: 100%;
      }
    }

    // filter and download section
    .download-btn-container {
      &>div {
        width: 100%;

        // search filter
        &:first-child {
          width: 100%;
        }
      }
    }
  }
}
</style>

