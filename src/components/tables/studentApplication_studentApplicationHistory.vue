<script setup lang="ts">
import { computed, ref } from '@vue/runtime-core'

import { NInput } from 'naive-ui'

import type { FundApplication_Interface } from '@/interface/fundOrFinancialAid'

import { useFundOrFinancialAidStore } from '@/stores/modules/fundOrFinancialAid'

import GlobalDataTable from '@/components/tables/globalDataTable.vue'

import { useFormatDate } from '@/composables/formatDateString'
import { useNumberToCurrency } from '@/composables/formatNumber'

// data table columns
import { studentApplicationHistoryDataTableColumn as dataTableColumns } from '@/table-columns/studentApplication_studentApplicationHistory'

defineProps({
  isLoading: {
    type: Boolean,
    required: true
  }
})

const fundOrFinancialAidStore = useFundOrFinancialAidStore()

const dataSource = fundOrFinancialAidStore.getAllFundApplicationsByStudent

const searchQuery = ref('')

const filterCB = (record: FundApplication_Interface) =>
  (record?.applicationId ?? '')?.toString().toLowerCase().indexOf(searchQuery.value.toLowerCase()) !== -1 ||
  (record?.applicantName ?? '')?.toString().toLowerCase().indexOf(searchQuery.value.toLowerCase()) !== -1 ||
  (record?.nin ?? '')?.toString().toLowerCase().indexOf(searchQuery.value.toLowerCase()) !== -1 ||
  (useFormatDate(record?.created_Date) ?? '')?.toString().toLowerCase().indexOf(searchQuery.value.toLowerCase()) !== -1 ||
  (useFormatDate(record?.created_Date) ?? '')?.toString().toLowerCase().indexOf(searchQuery.value.toLowerCase()) !== -1 ||
  (record?.institutionName ?? '')?.toString().toLowerCase().indexOf(searchQuery.value.toLowerCase()) !== -1 ||
  (record?.institutionPaymentAccountNumber ?? '')?.toString().toLowerCase().indexOf(searchQuery.value.toLowerCase()) !== -1 ||
  (record?.institutionPaymentAccountName ?? '')?.toString().toLowerCase().indexOf(searchQuery.value.toLowerCase()) !== -1 ||
  (record?.institutionPaymentBankName ?? '')?.toString().toLowerCase().indexOf(searchQuery.value.toLowerCase()) !== -1 ||
  (useNumberToCurrency(record?.requiredFundAmount, 'NGN') ?? '')?.toString().toLowerCase().indexOf(searchQuery.value.toLowerCase()) !== -1 ||
  (record?.status ?? '')?.toString().toLowerCase().indexOf(searchQuery.value.toLowerCase()) !== -1

const filteredDataSource = computed(() => dataSource.value?.filter(filterCB))
</script>

<template>
  <div class="search-and-table-container">
    <div class="btn-and-search-container">
      <div class="search-input-container">
        <!-- search bar -->
        <!-- <n-input
          v-if="dataSource?.length"
          type="text"
          v-model:value="searchQuery"
          placeholder="search record"
        /> -->
      </div>
    </div>

    <div class="global-data-table-container">
      <GlobalDataTable
        :loading="isLoading"
        :columns="dataTableColumns()"
        :data="filteredDataSource"
        :count="dataSource?.length"
        :rowKey="(row: any) => row?.id"
        :scrollX="1000"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
div.search-and-table-container {
  display: flex;
  flex-direction: column;
  row-gap: 20px;

  // button and search container
  &>div.btn-and-search-container {
    display: flex;
    row-gap: 10px;
    column-gap: 30px;

    &>div.search-input-container {
      width: 100%;
    }

    &>div.btn-container {
      width: 200px;
      display: flex;
      flex-wrap: wrap;
      row-gap: 5px;
      column-gap: 10px;

      button {
        height: 35px;
        display: flex;
        flex-direction: row;
        column-gap: 3px;
        align-items: center;
        box-sizing: border-box;
        border-radius: 5px;
        padding: 10px;
        font-weight: 500;
        line-height: 19px;
        transition: all 0.4s;

        // &:hover {
        //   box-shadow: 0 0 5px #519151;
        // }

        &:active {
          box-shadow: 0 0 5px transparent;
        }

        &:disabled {
          border-color: #C4C4C4;
          box-shadow: none;
          color: #C4C4C4;
          background-color: #FFFFFF;
        }

        // button icon
        &>*:first-child {
          font-size: 20px;
        }

        // button text
        &>*:last-child {
          font-size: 16px;
        }
      }
    }
  }
}

// MEDIA QUERY

// XX-SM (<251px)
@media (max-width: 250.9px) {
  div.search-and-table-container {

    // button and search container
    &>div.btn-and-search-container {
      flex-direction: column;

      &>div.btn-container {
        width: 100%;

        button {
          width: 100%;
          padding: 5px 10px;
          font-size: 14px;
        }
      }
    }
  }
}

// XX-SM
@media (min-width: 251px) and (max-width: 350.9px) {
  div.search-and-table-container {

    // button and search container
    &>div.btn-and-search-container {
      flex-direction: column;

      &>div.btn-container {
        width: 100%;

        button {
          width: 100%;
          // height: 30px;
          border-radius: 5px;
          padding: 5px 10px;
          font-size: 14px;
        }
      }
    }
  }
}

// X-SM
@media (min-width: 351px) and (max-width: 575.9px) {
  div.search-and-table-container {

    // button and search container
    &>div.btn-and-search-container {
      flex-direction: column;
      &>div.btn-container {
        width: 100%;
        
        button {
          padding: 5px 10px;
        }
      }
    }
  }
}

// SM
@media (min-width: 576px) and (max-width: 767.9px) {
  div.search-and-table-container {

    // button and search container
    &>div.btn-and-search-container {
      &>div.btn-container {
        button {
          padding: 5px 10px;
        }
      }
    }
  }
}

// MD
// @media (min-width: 768px) and (max-width: 991.9px) {}
// LG
// @media (min-width: 992px) and (max-width: 1200.9px) {}
// XL
</style>
@/table-columns/studentApplication_dashboardHistory