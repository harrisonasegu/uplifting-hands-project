<script setup lang="ts">
import { computed, reactive, ref, watch } from '@vue/runtime-core'

import { NButton, NInput, NModal, useNotification } from 'naive-ui'

import type { UserData_Interface } from '@/interface/authentication'

import { useResponseNotification } from '@/composables/responseNotification'

import { useResponseMessageStore } from '@/stores/common/responseMessage'
import { useDataTableButtonClickStore } from '@/stores/common/dataTableButtonClick'
import { useAuthenticationStore } from '@/stores/modules/authentication'

import GlobalDataTable from '@/components/tables/globalDataTable.vue'
import GlobalModal from '@/components/modal/globalModal.vue'
import RecordDetails from '@/components/modal/content/users_userDetails.vue'
import ActionComment from '@/components/modal/content/users_actionComment.vue'

// data table columns
import { pendingUsersDataTableColumn as dataTableColumns } from '@/table-columns/users_pending'

defineProps({
  isLoading: {
    type: Boolean,
    required: true
  }
})

const notification = useNotification()

const responseMessageStore = useResponseMessageStore()
const dataTableButtonClickStore = useDataTableButtonClickStore()
const userStore = useAuthenticationStore()

const isDataTableButtonClicked = dataTableButtonClickStore.getIsButtonClicked
const dataTableClickedButtonProp = dataTableButtonClickStore.getClickedButtonProp

const dataSource = userStore.getAllPendingUsers

const loading = ref<boolean>(false)
const showMainModal = ref<boolean>(false)
const showConfirmModal = ref<boolean>(false)

const searchQuery = ref('')

const modalAttrs = reactive({
  modalTitle: '',
  maskClosable: true,
  negativeText: '',
  positiveText: ''
})

const filterCB = (record: UserData_Interface) =>
(record?.firstName ?? '')?.toString().toLowerCase().indexOf(searchQuery.value.toLowerCase()) !== -1 ||
(record?.middleName ?? '')?.toString().toLowerCase().indexOf(searchQuery.value.toLowerCase()) !== -1 ||
(record?.lastName ?? '')?.toString().toLowerCase().indexOf(searchQuery.value.toLowerCase()) !== -1 ||
(record?.email ?? '')?.toString().toLowerCase().indexOf(searchQuery.value.toLowerCase()) !== -1 ||
(record?.phoneNumber ?? '')?.toString().toLowerCase().indexOf(searchQuery.value.toLowerCase()) !== -1 ||
// (record?.roleName ?? '')?.toString().toLowerCase().indexOf(searchQuery.value.toLowerCase()) !== -1 ||
(record?.userStatus ?? '')?.toString().toLowerCase().indexOf(searchQuery.value.toLowerCase()) !== -1

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

  resetFilterInput = () => {
    searchQuery.value = ''
  }

  updateSearchQuery = (searchText: string) => {
    searchQuery.value = searchText
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

  approveUser = () => {
    // loading state
    this.loadingState(true)

    const data = dataTableClickedButtonProp.data as UserData_Interface

    const payload = {
      email: data.email
    }

    userStore.ApproveUser(payload)
      .then((response) => {
        // close modal
        this.closeModal()
        // loading state
        this.loadingState(false)
        // notification
        this.showNotification(5000)
      })
      .catch(() => {
        // loading state
        this.loadingState(false)
        // notification
        this.showNotification(5000)
      })
  }

  handleAddUserButtonClicked = () => {
    // update modal prop
    modalAttrs.modalTitle = 'New User Creation'
    modalAttrs.maskClosable = false

    // show modal
    this.toggleModalState('main modal', true)
  }

  handleDataTableButtonClick = (isButtonClicked: boolean) => {
    if (!isButtonClicked) return

    // check specific button clicked
    switch (dataTableClickedButtonProp.buttonClicked) {
      case 'view details':
        // update modal prop
        modalAttrs.modalTitle = 'User Information'
        modalAttrs.negativeText = 'Close'

        // show modal
        this.toggleModalState('main modal', true)
        break

      case 'approve user':
        // update modal prop
        modalAttrs.modalTitle = 'Are you sure ?'
        modalAttrs.negativeText = 'Close'
        modalAttrs.positiveText = 'Approve user'

        // show modal
        this.toggleModalState('confirm modal', true)
        break

      case 'disapprove user':
        // update modal prop
        modalAttrs.modalTitle = 'Disapprove User'
        modalAttrs.maskClosable = false

        // show modal
        this.toggleModalState('main modal', true)
        break
    }
  }

  handleConfirmModalPositiveClick = () => {
    // check specific button clicked
    switch (dataTableClickedButtonProp.buttonClicked) {
      case 'approve user':
        this.approveUser()
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
</script>

<template>
  <div class="search-and-table-container">
    <div class="btn-and-search-container">
      <div class="search-input-container">
        <!-- search bar -->
        <n-input
          v-if="dataSource?.length"
          type="text"
          v-model:value="searchQuery"
          placeholder="search record"
          :disabled="isLoading || loading"
        />
      </div>
    </div>

    <div class="global-data-table-container">
      <GlobalDataTable
        :loading="isLoading || loading"
        :columns="dataTableColumns()"
        :data="filteredDataSource"
        :count="dataSource?.length"
        :scrollX="1200"
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
      <RecordDetails
        v-if="modalAttrs.modalTitle === 'User Information'"
        :user="(dataTableClickedButtonProp?.data as UserData_Interface)"
      />

      <ActionComment
        v-if="modalAttrs.modalTitle === 'Disapprove User'"
        @action-completed="dataTable.closeModal"
      />
    </template>
  </GlobalModal>

  <!-- confirm modal -->
  <n-modal
    v-model:show="showConfirmModal"
    :loading="loading"
    :closable="false"
    :show-icon="false"
    :mask-closable="true"
    preset="dialog"
    :title="modalAttrs.modalTitle"
    :negative-text="modalAttrs.negativeText"
    :positive-text="modalAttrs.positiveText"
    @positive-click="dataTable.handleConfirmModalPositiveClick"
    @negative-click="dataTable.closeModal"
    @closeModal="dataTable.closeModal"
    @esc="dataTable.closeModal"
    @after-leave="dataTable.closeModal"
  />
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
