<script setup lang="ts">
import { computed, reactive, ref, onBeforeMount, watch } from '@vue/runtime-core'

import { NInput, NSelect } from 'naive-ui'

import type { FundApplication_Interface } from '@/interface/fundOrFinancialAid'

import { useAuthenticationStore } from '@/stores/modules/authentication'
import { useFundOrFinancialAidStore } from '@/stores/modules/fundOrFinancialAid'

import GlobalDataTable from '@/components/tables/globalDataTable.vue'

import { useFormatDate } from '@/composables/formatDateString'
import { useNumberToCurrency } from '@/composables/formatNumber'

// data table columns
import { dashboardHistoryDataTableColumn as dataTableColumns } from '@/table-columns/studentApplication_dashboardHistory'

defineProps({
  isLoading: {
    type: Boolean,
    required: true
  }
})

const userStore = useAuthenticationStore()
const fundOrFinancialAidStore = useFundOrFinancialAidStore()

const user = userStore.getUser
const dataSource = fundOrFinancialAidStore.getAllFundAndFinancialAidApplications

const loading = ref<boolean>(false)
const showMainModal = ref<boolean>(false)
const showConfirmModal = ref<boolean>(false)

const currentStatus = reactive({
  id: 2,
  name: 'Pending'
}) // 2 is for pending applications
const dropdownStatusOptions = ref<{ label: string, value: number}[]>([])

const searchQuery = ref('')

const filterCB = (record: FundApplication_Interface) =>
  (record?.applicationId ?? '')?.toString().toLowerCase().indexOf(searchQuery.value.toLowerCase()) !== -1 ||
  (record?.applicantName ?? '')?.toString().toLowerCase().indexOf(searchQuery.value.toLowerCase()) !== -1 ||
  (useFormatDate(record?.created_Date) ?? '')?.toString().toLowerCase().indexOf(searchQuery.value.toLowerCase()) !== -1 ||
  (record?.nin ?? '')?.toString().toLowerCase().indexOf(searchQuery.value.toLowerCase()) !== -1 ||
  (useFormatDate(record?.created_Date) ?? '')?.toString().toLowerCase().indexOf(searchQuery.value.toLowerCase()) !== -1 ||
  (record?.institutionName ?? '')?.toString().toLowerCase().indexOf(searchQuery.value.toLowerCase()) !== -1 ||
  (record?.institutionPaymentAccountNumber ?? '')?.toString().toLowerCase().indexOf(searchQuery.value.toLowerCase()) !== -1 ||
  (record?.institutionPaymentAccountName ?? '')?.toString().toLowerCase().indexOf(searchQuery.value.toLowerCase()) !== -1 ||
  (record?.institutionPaymentBankName ?? '')?.toString().toLowerCase().indexOf(searchQuery.value.toLowerCase()) !== -1 ||
  (useNumberToCurrency(record?.requiredFundAmount, 'NGN') ?? '')?.toString().toLowerCase().indexOf(searchQuery.value.toLowerCase()) !== -1 ||
  (record?.status ?? '')?.toString().toLowerCase().indexOf(searchQuery.value.toLowerCase()) !== -1

const filteredDataSource = computed(() => dataSource.value?.filter(filterCB))
// --------------------------------------------------------

class DataTable {
  loadingState = (state: boolean) => {
    loading.value = state
  }

  resetFilterInput = () => {
    searchQuery.value = ''
  }

  handleDropdownSelect = (value: number) => {
    switch (value) {
      case 2:
        currentStatus.id = value
        currentStatus.name = 'Pending'
        break;

      case 3:
        currentStatus.id = value
        currentStatus.name = 'Reviewed'
        break;
      case 4:
        currentStatus.id = value
        currentStatus.name = 'Approved'
        break;

      case 5:
        currentStatus.id = value
        currentStatus.name = 'Declined'
        break;

      case 6:
        currentStatus.id = value
        currentStatus.name = 'Disbursed'
        break;
    }
  }

  updateCurrentStatusByUserRoleId = () => {
    const userRoleId = user.roleId

    switch (userRoleId) {
      case 4: // approval officer
        currentStatus.id = 3
        currentStatus.name = 'Reviewed'
        break;

      case 5: // disbursement officer
        currentStatus.id = 4
        currentStatus.name = 'Approved'
        break;
    }
  }

  updateDropdownStatusOptionsByUserRoleId = () => {
    dropdownStatusOptions.value[0] = { label: 'Pending', value: 2 }
    dropdownStatusOptions.value[1] = { label: 'Reviewed', value: 3 }
    dropdownStatusOptions.value[3] = { label: 'Approved', value: 4 }
    dropdownStatusOptions.value[4] = { label: 'Declined', value: 5 }
    dropdownStatusOptions.value[5] = { label: 'Disbursed', value: 6 }
    // const userRoleId = user.roleId

    // switch (userRoleId) {
    //   case 1: // super admin user
    //     dropdownStatusOptions.value[0] = { label: 'Pending', value: 2 }
    //     dropdownStatusOptions.value[1] = { label: 'Reviewed', value: 3 }
    //     dropdownStatusOptions.value[3] = { label: 'Approved', value: 4 }
    //     dropdownStatusOptions.value[4] = { label: 'Declined', value: 5 }
    //     dropdownStatusOptions.value[5] = { label: 'Disbursed', value: 6 }
    //     break;

    //   case 3: // review officer
    //     dropdownStatusOptions.value[0] = { label: 'Pending', value: 2 }
    //     break;

    //   case 4: // approval officer
    //     dropdownStatusOptions.value[0] = { label: 'Reviewed', value: 3 }
    //     break;

    //   case 5: // disbursement officer
    //     dropdownStatusOptions.value[0] = { label: 'Approved', value: 4 }
    //     dropdownStatusOptions.value[1] = { label: 'Declined', value: 5 }
    //     dropdownStatusOptions.value[5] = { label: 'Disbursed', value: 6 }
    //     break;

    //   case 6: // report user
    //     dropdownStatusOptions.value[0] = { label: 'Pending', value: 2 }
    //     dropdownStatusOptions.value[1] = { label: 'Reviewed', value: 3 }
    //     dropdownStatusOptions.value[3] = { label: 'Approved', value: 4 }
    //     dropdownStatusOptions.value[4] = { label: 'Declined', value: 5 }
    //     dropdownStatusOptions.value[5] = { label: 'Disbursed', value: 6 }
    //     break;
    // }
  }

  getApplicationStatusByUserRoleId = async () => {
    const userRoleId = user.roleId

    switch (userRoleId) {
      case 1: // super admin user
        return await fundOrFinancialAidStore.GetAllFundsOrFinancialAidApplications(currentStatus.id)

      case 3: // review officer
        return await fundOrFinancialAidStore.GetAllFundsOrFinancialAidApplications(currentStatus.id)

      case 4: // approval officer
        return await fundOrFinancialAidStore.GetAllFundsOrFinancialAidApplications(currentStatus.id)

      case 5: // disbursement officer
        return await fundOrFinancialAidStore.GetAllFundsOrFinancialAidApplications(currentStatus.id)

      case 6: // report user
        return await fundOrFinancialAidStore.GetAllFundsOrFinancialAidApplications(currentStatus.id)
    }
  }

  getAllFundsOrFinancialAidApplications = async () => {
    loading.value = true

    await this.getApplicationStatusByUserRoleId()
      .then(() => {
        loading.value = false
      })
      .catch(() => {
        loading.value = false
      })
  }

  updateSearchQuery = (searchText: string) => {
    searchQuery.value = searchText
  }

  toggleModalState = (modal: string, state: boolean) => {
    switch (modal) {
      case 'main modal':
        showMainModal.value = state
        break;

      case 'confirm modal':
        showConfirmModal.value = state
        break;
    }
  }
}

const dataTable = new DataTable()

onBeforeMount(async () => {
  // update current tab
  dataTable.updateCurrentStatusByUserRoleId()
  // update dropdown options
  dataTable.updateDropdownStatusOptionsByUserRoleId()
})

watch(currentStatus, () => dataTable.getAllFundsOrFinancialAidApplications())
</script>

<template>
  <div class="search-and-table-container">
    <div class="btn-and-search-container">
      <div class="btn-container">
        <n-select
          :options="dropdownStatusOptions"
          :disabled="isLoading"
          :placeholder="currentStatus.name"
          @update:value="dataTable.handleDropdownSelect"
        />
      </div>

      <div class="search-input-container">
        <!-- search bar -->
        <n-input
          type="text"
          v-model:value="searchQuery"
          placeholder="search record"
          :disabled="isLoading || loading || !dataSource?.length"
        />
      </div>
    </div>

    <div class="global-data-table-container">
      <GlobalDataTable
        :loading="isLoading || loading"
        :columns="dataTableColumns()"
        :data="filteredDataSource"
        :count="dataSource?.length"
        :rowKey="(row: any) => row?.id"
        :scrollX="1600"
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