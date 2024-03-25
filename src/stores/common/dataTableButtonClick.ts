import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'

import type { DataTablebuttonClickProp_Interface } from '@/interface/dataTableButtonClickProp'

export const useDataTableButtonClickStore = defineStore('dataTableButtonClick', () => {
  // state
  const isButtonClicked = ref<boolean>(false)
  const clickedButtonProp = reactive<DataTablebuttonClickProp_Interface>({
    buttonClicked: '',
    data: null
  })

  // getters
  const getIsButtonClicked = computed(() => isButtonClicked)
  const getClickedButtonProp = computed(() => clickedButtonProp)

  // actions
  const setIsButtonClicked = (data: boolean) => {
    isButtonClicked.value = data
  }

  const setClickedButtonProp = (prop: DataTablebuttonClickProp_Interface) => {
    clickedButtonProp.buttonClicked = prop.buttonClicked
    clickedButtonProp.data = prop.data
  }

  const clearButtonProp = () => {
    // toggle modal display
    setIsButtonClicked(false)
    // update modal prop
    setClickedButtonProp({
      buttonClicked: '',
      data: null
    })
  }

  return {
    getIsButtonClicked,
    getClickedButtonProp,
    setIsButtonClicked,
    setClickedButtonProp,
    clearButtonProp
  }
})
