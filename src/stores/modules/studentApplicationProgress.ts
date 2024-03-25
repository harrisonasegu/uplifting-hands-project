import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useStudentApplicationProgressStore = defineStore('studentApplicationProgress', () => {
  // state
  const isCreateProfileButtonClicked = ref<boolean>(false)
  const isCreateFundApplicationButtonClicked = ref<boolean>(false)
  const isEditFundApplicationButtonClicked = ref<boolean>(false)
  const isFundApplicationHistoryButtonClicked = ref<boolean>(false)

  // getters
  const getIsCreateProfileButtonClicked = computed(() => isCreateProfileButtonClicked)
  const getIsCreateFundApplicationButtonClicked = computed(() => isCreateFundApplicationButtonClicked)
  const getIsEditFundApplicationButtonClicked = computed(() => isEditFundApplicationButtonClicked)
  const getIsFundApplicationHistoryButtonClicked = computed(() => isFundApplicationHistoryButtonClicked)

  // actions
  function setIsCreateProfileButtonClicked(state: boolean) {
    isCreateProfileButtonClicked.value = state
  }
  function setIsCreateFundApplicationButtonClicked(state: boolean) {
    isCreateFundApplicationButtonClicked.value = state
  }
  function setIsEditFundApplicationButtonClicked(state: boolean) {
    isEditFundApplicationButtonClicked.value = state
  }
  function setIsFundApplicationHistoryButtonClicked(state: boolean) {
    isFundApplicationHistoryButtonClicked.value = state
  }

  return {
    getIsCreateProfileButtonClicked,
    getIsCreateFundApplicationButtonClicked,
    getIsEditFundApplicationButtonClicked,
    getIsFundApplicationHistoryButtonClicked,
    setIsCreateProfileButtonClicked,
    setIsCreateFundApplicationButtonClicked,
    setIsEditFundApplicationButtonClicked,
    setIsFundApplicationHistoryButtonClicked
  }
})
