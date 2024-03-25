<script lang="ts" setup>
import { useStudentApplicationProgressStore } from '@/stores/modules/studentApplicationProgress'
import { useAuthenticationStore } from '@/stores/modules/authentication'
import { useFundOrFinancialAidStore } from '@/stores/modules/fundOrFinancialAid'

const studentApplicationProgressStore = useStudentApplicationProgressStore()
const userStore = useAuthenticationStore()
const fundOrFinancialAidStore = useFundOrFinancialAidStore()

defineProps({
  buttonLabel: String 
})

const handleButtonClick = () => {
  const isProfileComplete = userStore.getUserProfile.value?.isProfileComplete
  const hasFundApplication = fundOrFinancialAidStore.getActiveFundApplicationByUserId.value

  if (!isProfileComplete) {
    // toggle create profile button state
    studentApplicationProgressStore.setIsCreateProfileButtonClicked(true)
  } else {
    // toggle create fund application button state
    studentApplicationProgressStore.setIsCreateFundApplicationButtonClicked(true)
  }  
}
</script>

<template>
  <div class="button-container">
    <a @click.prevent="handleButtonClick">
      <div class="btn-content">
        <span class="btn-label">{{ buttonLabel }}</span>
        <span class="btn-icon">
          <Icon icon="ic:baseline-plus" />
        </span>
      </div>
    </a>
  </div>
</template>

<style lang="scss" scoped>
div.button-container {
  display: flex;
  flex-direction: column;
  row-gap: 61px;
  align-items: center;

  &>a {
    width: 965px;
    height: 100px;
    border: 3px dashed #FFF;
    display: flex;
    justify-content: center;
    text-decoration: none;
    background: transparent;
    cursor: pointer;

    &>div.btn-content {
      width: fit-content;
      display: inline-flex;
      row-gap: 20px;
      column-gap: 197px;
      align-items: center;

      font-weight: 700;
      color: #FFF;

      &>span:first-child {
        font-size: 25px;
      }

      &>span:last-child>* {
        font-size: 50px;
      }
    }
  }
}

// MEDIA QUERY

// XX-SM (<251px)
@media (max-width: 250.9px) {
  div.button-container {
    &>a {
      width: 100%;
      height: fit-content;
      border: 1px dashed #FFF;
      border-radius: 5px;
      justify-content: center;

      &>div.btn-content {
        padding: 20px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;

        &>span:first-child {
          font-size: 15.5px;
        }

        &>span:last-child>* {
          font-size: 40px;
        }
      }
    }
  }
}

// XX-SM
@media (min-width: 251px) and (max-width: 350.9px) {
  div.button-container {
    &>a {
      width: 100%;
      height: fit-content;
      border: 1px dashed #FFF;
      border-radius: 5px;
      justify-content: center;

      &>div.btn-content {
        padding: 20px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;

        &>span:first-child {
          font-size: 15.5px;
        }

        &>span:last-child>* {
          font-size: 40px;
        }
      }
    }
  }
}

// X-SM
@media (min-width: 351px) and (max-width: 575.9px) {
  div.button-container {
    &>a {
      width: 85%;
      height: fit-content;
      border: 1px dashed #FFF;
      border-radius: 5px;
      justify-content: center;

      &>div.btn-content {
        padding: 20px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;

        &>span:first-child {
          font-size: 18px;
        }

        &>span:last-child>* {
          font-size: 40px;
        }
      }
    }
  }
}

// SM
@media (min-width: 576px) and (max-width: 767.9px) {
  div.button-container {
    &>a {
      width: 80%;
      border: 1px dashed #FFF;
      justify-content: center;

      &>div.btn-content {
        width: fit-content;
        padding: 20px;
        column-gap: 30px;

        &>span:first-child {
          font-size: 18px;
        }

        &>span:last-child>* {
          font-size: 40px;
        }
      }
    }
  }
}

// MD
@media (min-width: 768px) and (max-width: 991.9px) {
  div.button-container {
    &>a {
      width: 75%;
      border:2px dashed #FFF;

      &>div.btn-content {
        width: fit-content;
        padding: 20px;
        column-gap: 30px;

        &>span:first-child {
          font-size: 18px;
        }

        &>span:last-child>* {
          font-size: 45px;
        }
      }
    }
  }
}

// LG
@media (min-width: 992px) and (max-width: 1200.9px) {
  div.button-container {
    &>a {
      width: 700px;
      height: 120px;

      &>div.btn-content {
        padding: 20px;
        column-gap: 30px;

        &>span:first-child {
          font-size: 24px;
        }

        &>span:last-child>* {
          font-size: 55px;
        }
      }
    }
  }
}

// XL
// @media (min-width: 1201px) and (max-width: 1499.9px) {}

// XXL
// @media (min-width: 1500px) {}
</style>
