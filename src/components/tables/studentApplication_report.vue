<script setup lang="ts">
import { computed, reactive, ref, watch } from '@vue/runtime-core'

import { NButton, NInput, useNotification } from 'naive-ui'

import type { FundApplication_Interface } from '@/interface/fundOrFinancialAid'

import { useResponseNotification } from '@/composables/responseNotification'
import { useFormatDate } from '@/composables/formatDateString'
import { useNumberToCurrency } from '@/composables/formatNumber'
import { jsonToExcel } from '@/composables/xlsxExports'

import { useResponseMessageStore } from '@/stores/common/responseMessage'
import { useDataTableButtonClickStore } from '@/stores/common/dataTableButtonClick'
import { useFundOrFinancialAidStore } from '@/stores/modules/fundOrFinancialAid'

import GlobalDataTable from '@/components/tables/globalDataTable.vue'
import GlobalModal from '@/components/modal/globalModal.vue'
import ViewDetails from '@/components/modal/content/studentApplication_applicationDetails.vue'

// data table columns
import { reportDataTableColumn as dataTableColumns } from '@/table-columns/studentApplication_report'

const props = defineProps({
  isLoading: {
    type: Boolean,
    required: true
  },
  currentTab: Number
})

const notification = useNotification()

const responseMessageStore = useResponseMessageStore()
const dataTableButtonClickStore = useDataTableButtonClickStore()
const fundOrFinancialAidStore = useFundOrFinancialAidStore()

const isDataTableButtonClicked = dataTableButtonClickStore.getIsButtonClicked
const dataTableClickedButtonProp = dataTableButtonClickStore.getClickedButtonProp

const dataSource = fundOrFinancialAidStore.getAllFundAndFinancialAidApplications

const loading = ref<boolean>(false)
const isDownloading = ref(false)

const showMainModal = ref<boolean>(false)
const showConfirmModal = ref<boolean>(false)

const currentTabRef = computed(() => props.currentTab)

const searchQuery = ref('')

const modalAttrs = reactive({
  modalTitle: '',
  maskClosable: true,
  negativeText: '',
  positiveText: ''
})

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
  (record?.status ?? '')?.toString().toLowerCase().indexOf(searchQuery.value.toLowerCase()) !== -1 ||
  (record?.review_Comments ?? '')?.toString().toLowerCase().indexOf(searchQuery.value.toLowerCase()) !== -1 ||
  (record?.approval_Comments ?? '')?.toString().toLowerCase().indexOf(searchQuery.value.toLowerCase()) !== -1 ||
  (record?.reasons_For_Decline ?? '')?.toString().toLowerCase().indexOf(searchQuery.value.toLowerCase()) !== -1 ||
  (record?.disburse_Comments ?? '')?.toString().toLowerCase().indexOf(searchQuery.value.toLowerCase()) !== -1

const filteredDataSource = computed(() => dataSource.value?.filter(filterCB))
// --------------------------------------------------------

class DataTable {

  showNotification = (duration: number) => {
    useResponseNotification(
      notification,
      responseMessageStore.response.status,
      responseMessageStore.response.title,
      responseMessageStore.response.message,
      duration
    )
  }

  loadingState = (state: boolean) => {
    loading.value = state
  }

  downloadingState = (state: boolean) => {
    isDownloading.value = state
  }

  resetFilterInput = () => {
    searchQuery.value = ''
  }

  updateSearchQuery = (searchText: string) => {
    searchQuery.value = searchText
  }

  getApplicationStatusByCurrentTab = async (tab: number) => {
    loading.value = true
    
    await fundOrFinancialAidStore.GetAllFundsOrFinancialAidApplications(tab)
      .then(() => {
        loading.value = false
      })
      .catch(() => {
        loading.value = false
      })
  }

  clearModalProps = () => {
    modalAttrs.modalTitle = ''
    modalAttrs.maskClosable = true
    modalAttrs.negativeText = ''
    modalAttrs.positiveText = ''
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

  handleDownloadButtonClicked = async () => {
    console.log(dataSource.value);
    // start spinner
    this.downloadingState(true)

    const sheetColumns = ['applicationId'] // first column to be created from sheetRow(data)

    const sheetRows = dataSource.value
    const sheetName = 'StudentFundApplicationReport'
    const fileName = 'Student Fund Application Report'

    // download record in excel format
    jsonToExcel(sheetColumns, sheetRows, sheetName, fileName)

    // stop spinner
    this.downloadingState(false)
  }

  handleDataTableButtonClick = (isButtonClicked: boolean) => {
    if (!isButtonClicked) return

    // check specific button clicked
    switch (dataTableClickedButtonProp.buttonClicked) {
      case 'view details':
        // update modal prop
        modalAttrs.modalTitle = 'Application Information'
        modalAttrs.negativeText = 'Close'

        // show modal
        this.toggleModalState('main modal', true)
        break
    }
  }

  closeModal = () => {
    // clear modal attributes
    this.clearModalProps()

    // clear modal prop
    dataTableButtonClickStore.clearButtonProp()
    // // update modal state
    this.toggleModalState('main modal', false)
    this.toggleModalState('confirm modal', false)
  }
}

const dataTable = new DataTable()

watch(isDataTableButtonClicked, (isBtnClicked: boolean) => dataTable.handleDataTableButtonClick(isBtnClicked))
watch(currentTabRef, (tab) => dataTable.getApplicationStatusByCurrentTab(tab as number))
</script>

<template>
  <div class="search-and-table-container">
    <div
      v-if="dataSource?.length"
      class="btn-and-search-container"
    >
      <div class="search-input-container">
        <!-- search bar -->
        <n-input
          type="text"
          v-model:value="searchQuery"
          placeholder="search record"
          :disabled="isLoading || loading"
        />
      </div>

      <div class="btn-container">
        <n-button
          type="primary"
          :disabled="isLoading || loading || isDownloading"
          @click="dataTable.handleDownloadButtonClicked"
        >
          <icon icon="basil:download-outline" height="25" />
          &nbsp;
          <span>download</span>
        </n-button>
      </div>
    </div>

    <div class="global-data-table-container">
      <GlobalDataTable
        :loading="isLoading || loading"
        :columns="dataTableColumns()"
        :data="filteredDataSource"
        :count="dataSource?.length"
        :scrollX="1600"
      />
    </div>
  </div>

  <!-- modal -->
  <GlobalModal
    v-model:show="showMainModal"
    :modal-title="modalAttrs.modalTitle"
    :modal-prop="dataTableClickedButtonProp"
    :show-icon="false"
    :mask-closable="modalAttrs.maskClosable"
    :negative-text="modalAttrs.negativeText"
    :positive-text="modalAttrs.positiveText"
    @onNegativeClick="dataTable.closeModal"
    @closeModal="dataTable.closeModal"
  >
    <template #modalContent>
      <ViewDetails
        v-if="modalAttrs.modalTitle === 'Application Information'"
        :application="(dataTableClickedButtonProp?.data as FundApplication_Interface)"
      />
    </template>
  </GlobalModal>
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
      display: flex;
      flex-wrap: wrap;
      row-gap: 5px;
      column-gap: 10px;
      // justify-content: flex-end;

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
      flex-direction: column-reverse;

      &>div.btn-container {
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
      flex-direction: column-reverse;

      &>div.btn-container {
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
      &>div.btn-container {
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
