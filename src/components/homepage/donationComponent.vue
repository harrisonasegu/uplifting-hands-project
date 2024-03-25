<script setup lang="ts">
import { NButton, NSpace } from "naive-ui";
import { computed, ref, reactive } from "vue";

import Donation from "@/assets/Images/Home-Images/donation.png";

import { NForm, NFormItem, NInput, NCheckbox, useNotification } from "naive-ui";

import type {
  FormInst,
  FormItemRule,
  FormValidationError,
  FormRules,
} from "naive-ui";

import { useResponseNotification } from "@/composables/responseNotification";
import { RegEx } from "@/composables/regex/regex";

import { useResponseMessageStore } from "@/stores/common/responseMessage";
import { useSystemUtilsStore } from "@/stores/modules/systemUtils";

const notification = useNotification();

const responseMessageStore = useResponseMessageStore();
const systemUtilsStore = useSystemUtilsStore();

const isLoading = ref<boolean>(false);

const formRef = ref<FormInst | null>(null);

const model = reactive({
  fullName: "",
  email: "",
  amount: "",
  isAnonymous: false,
});

const inputRequired = computed(
  (): boolean =>
    (model.fullName === "" && model.email === "") || model.amount === ''
);

const rules: FormRules = {
  email: [
    {
      required: true,
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error("email is required");
        } else if (!RegEx.email.test(value)) {
          return new Error("email is invalid");
        }
        return true;
      },
      trigger: ["input", "blur"],
    },
  ],
};

function showNotification(duration: number) {
  useResponseNotification(
    notification,
    responseMessageStore.response.status,
    responseMessageStore.response.title,
    responseMessageStore.response.message,
    duration
  );
}

function loadingState(state: boolean) {
  isLoading.value = state;
}

const allowAmountInput = (amount: string) =>
  !amount || /[1-9][0-9]*$/.test(amount);

const formatAmount = (amount: number) => amount.toLocaleString("en-NG");

const handleAmountInput = () => {
  const numStr = model.amount?.split(",").join("");
  const num = Number(numStr);

  // update amount field
  model.amount = formatAmount(num);
};

const handleIsAnonymousChecked = () => {
  if (model.isAnonymous) {
    model.fullName = 'Anonymous'
    model.email = 'nype@test.com'
  } else {
    model.fullName = ''
    model.email = ''
  }
};

const formatAmountToNumber = () => Number(model.amount.split(",").join(""));

function clearInputFields() {
  model.fullName = "";
  model.email = "";
  model.amount = "";
  model.isAnonymous = false;
}

function handleValidateButtonClick(e: MouseEvent) {
  e.preventDefault();

  formRef.value?.validate((errors: Array<FormValidationError> | undefined) => {
    if (errors) return;

    // loading state
    loadingState(true);

    const payload = {
      donorName: model.fullName,
      donorEmail: model.email,
      donationAmount: formatAmountToNumber(),
      isAnonymous: true,
    };

    // proceed to make donation
    systemUtilsStore
      .MakeDonation(payload)
      .then(() => {
        // clear input
        clearInputFields();
        // loading state
        loadingState(false);
        // notification
        showNotification(8000);
      })
      .catch(() => {
        // loading state
        loadingState(false);
        // notification
        showNotification(3000);
      });
  });
}
</script>

<template>
  <n-space vertical :size="40">
    <div id="donate" class="donation-page-wrap">
      <div class="donation-amount">
        <div class="donation">
          <img :src="Donation" alt="donation-picture" />
        </div>

        <div class="form-container">
          <h2>Donation</h2>

          <n-form ref="formRef" :model="model" :rules="rules">
            <n-form-item path="fullName">
              <div class="form-group">
                <n-input
                  class="input"
                  size="large"
                  placeholder="Full Name"
                  v-model:value="model.fullName"
                  :disabled="model.isAnonymous || isLoading"
                  @keydown.enter.prevent
                />
              </div>
            </n-form-item>

            <n-form-item path="email">
              <div class="form-group">
                <n-input
                  class="input"
                  size="large"
                  placeholder="Email Address"
                  v-model:value="model.email"
                  :disabled="model.isAnonymous || isLoading"
                  @keydown.enter.prevent
                />
              </div>
            </n-form-item>

            <n-form-item path="amount">
              <div class="form-group">
                <n-input
                  class="input"
                  size="large"
                  placeholder="Amount"
                  v-model:value="model.amount"
                  :allow-input="allowAmountInput"
                  :disabled="isLoading"
                  @input="handleAmountInput"
                  @keydown.enter.prevent
                />
              </div>
            </n-form-item>

            <n-form-item>
              <div class="form-group">
                <n-checkbox 
                  size="large"
                  v-model:checked="model.isAnonymous"
                  @update:checked="handleIsAnonymousChecked"
                >
                  <span class="check-box">Donate as anonymous</span>
                </n-checkbox>
              </div>
            </n-form-item>

            <div class="submit-btn-container">
              <n-button
                :disabled="true || inputRequired || isLoading"
                round
                type="primary"
                :loading="isLoading"
                @click="handleValidateButtonClick"
                >Submit</n-button
              >
            </div>
          </n-form>
        </div>
      </div>
    </div>
  </n-space>
</template>

<style lang="scss" scoped>
.donation-page-wrap {
  // border: 5px solid blue;
  & > .donation-amount {
    // border: 5px solid red;
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 91px;
    row-gap: 30px;
    padding-right: 50px;

    // donation
    & > .donation {
      // border: 2px solid red;
      display: flex;
      justify-content: center;
      align-items: center;

      // image
      img {
        // border: 2px solid red;
        width: 682px;
        height: 497px;
      }
    }

    // form container
    & > .form-container {
      border: 3px solid #f3f3f3;
      border-radius: 0 20% 20px 20px;
      padding: 60px 50px;
      display: flex;
      flex-direction: column;
      flex-direction: column;
      row-gap: 30px;
      color: $base-color;
      background-color: #fff;

      & > h2 {
        font-size: 30px;
        font-weight: 800;
        line-height: 21px;
        text-align: center;
      }

      & > h4 {
        font-size: 20px;
        font-weight: 600;
        line-height: 21px;
        letter-spacing: 0em;
      }

      & > .n-form {
        display: flex;
        flex-direction: column;

        & > .n-form-item {
          display: unset;

          div.form-group {
            width: 450px;
            display: flex;
            flex-direction: column;

            & > .input-info {
              padding-top: 10px;
            }

            & > label {
              width: 100%;
              margin-bottom: 10px;
              font-size: 18px;
              font-weight: 400;
            }

            & span.check-box,
            & a.auth-url {
              position: relative;
              top: -5px;
              left: 5px;
              line-height: 36px;
              color: $base-color;
            }

            & a.auth-url {
              position: static;
              margin-top: 10px;
            }

            & > .input {
              width: 450px;
              border: 1px solid $base-color;
              border-radius: 50px;
              display: flex;
              align-items: center;
            }
          }
        }

        & > div.submit-btn-container {
          display: flex;
          justify-content: flex-end;

          & > .n-button {
            width: 200px;
            height: 45px;
            border-radius: 20px;
            align-items: center;
            font-size: 18px;
            font-weight: 800 !important;
            line-height: 48px;
            color: #fff;
            background: $base-color;

            &:hover {
              color: #404058;
            }
          }
        }
      }
    }
  }
}

// Media Query
@media (max-width: 250.9px) {
  .donation-page-wrap {
    & > .donation-amount {
      padding: 0;
      flex-direction: column;

      .donation {
        width: 100% !important;

        img {
          width: 100% !important;
          height: auto;
        }
      }

      // form container
      & > .form-container {
        width: 100%;
        border-radius: unset;
        padding: 20px 10px;

        & > h2 {
          font-size: 18px;
        }

        & > h4 {
          font-size: 18px;
        }

        & > .n-form {
          & > .n-form-item {
            div.form-group {
              width: 100%;

              & > label {
                margin-bottom: 10px;
                font-size: 16px;
                font-weight: normal;
              }

              & > span.input-info {
                margin-top: 15px;
                font-size: 14px;
                font-weight: normal;
                line-height: 25px;
              }

              & span.check-box {
                top: 3px;
                left: -9px;
                font-size: 14px;
                font-weight: normal;
                line-height: 25px;
              }

              & > .input {
                width: 100%;
                border-radius: 7px;
                padding: 5px;
                font-size: 15px;
              }

              & > .n-checkbox {
                width: 100%;
                display: flex;
                flex-direction: column;
              }
            }
          }

          & > div.submit-btn-container {
            & > .n-button {
              width: 100%;
              height: 40px;
              border-radius: 7px;
              border-radius: 7px;
              font-size: 13px;
              line-height: 48px;
            }
          }
        }
      }
    }
  }
}

@media (min-width: 251px) and (max-width: 350.9px) {
  .donation-page-wrap {
    & > .donation-amount {
      padding: 0;
      flex-direction: column;

      .donation {
        width: 100% !important;

        img {
          width: 100% !important;
          height: auto;
        }
      }

      // form container
      & > .form-container {
        width: 100%;
        border-radius: unset;
        padding: 20px 10px;

        & > h2 {
          font-size: 18px;
        }

        & > h4 {
          font-size: 18px;
        }

        & > .n-form {
          & > .n-form-item {
            display: unset;

            div.form-group {
              width: 100%;

              & > label {
                margin-bottom: 10px;
                font-size: 16px;
                font-weight: normal;
              }

              & > span.input-info {
                margin-top: 15px;
                font-size: 14px;
                font-weight: normal;
                line-height: 25px;
              }

              & span.check-box {
                top: 3px;
                left: -9px;
                font-size: 14px;
                font-weight: normal;
                line-height: 25px;
              }

              & > .input {
                width: 100%;
                border-radius: 7px;
                font-size: 15px;
              }

              & > .n-checkbox {
                width: 100%;
                display: flex;
                flex-direction: column;
              }
            }
          }

          & > div.submit-btn-container {
            & > .n-button {
              width: 100%;
              height: 40px;
              border-radius: 7px;
              border-radius: 7px;
              font-size: 13px;
              line-height: 48px;
            }
          }
        }
      }
    }
  }
}

@media (min-width: 351px) and (max-width: 575.9px) {
  .donation-page-wrap {
    & > .donation-amount {
      padding: 0;
      flex-direction: column;

      .donation {
        width: 100% !important;

        img {
          width: 100% !important;
          height: auto;
        }
      }

      // form container
      & > .form-container {
        width: 100%;
        border-radius: 10px;
        padding: 30px;

        & > h2 {
          font-size: 22px;
        }

        & > h4 {
          font-size: 18px;
        }

        & > .n-form {
          & > .n-form-item {
            display: unset;

            div.form-group {
              width: 100%;

              & > label {
                margin-bottom: 10px;
                font-size: 17px;
              }

              & > span.input-info {
                margin-top: 15px;
                font-size: 14px;
                font-weight: normal;
                line-height: 25px;
              }

              & span.check-box {
                top: -3px;
                left: unset;
                font-size: 14px;
                font-weight: normal;
                line-height: 25px;
              }

              & > .input {
                width: 100%;
                border-radius: 7px;
                font-size: 16px;
              }

              & > .n-checkbox {
                width: 100%;
              }
            }
          }

          & > div.submit-btn-container {
            & > .n-button {
              width: 100%;
              height: 45px;
              border-radius: 7px;
              border-radius: 7px;
              font-size: 14px;
            }
          }
        }
      }
    }
  }
}

@media (min-width: 576px) and (max-width: 767.9px) {
  .donation-page-wrap {
    & > .donation-amount {
      padding: 0;
      flex-direction: column;

      .donation {
        width: 100% !important;

        img {
          width: 100% !important;
          height: auto;
        }
      }

      // form container
      & > .form-container {
        width: 100%;
        border-radius: 10px;
        padding: 50px;

        & > h2 {
          font-size: 24px;
        }

        & > h4 {
          font-size: 18px;
        }

        & > .n-form {
          & > .n-form-item {
            display: unset;

            div.form-group {
              width: 100%;

              & > label {
                margin-bottom: 10px;
                font-size: 18px;
              }

              & > span.input-info {
                margin-top: 15px;
                font-size: 15px;
                font-weight: normal;
                line-height: 25px;
              }

              & span.check-box {
                top: -3px;
                left: unset;
                font-size: 15px;
                font-weight: normal;
                line-height: 25px;
              }

              & > .input {
                width: 100%;
                border-radius: 7px;
                font-size: 16px;
              }

              & > .n-checkbox {
                width: 100%;
              }
            }
          }

          & > div.submit-btn-container {
            display: flex;
            justify-content: center;

            & > .n-button {
              width: 100%;
              border-radius: 7px;
              border-radius: 7px;
              font-size: 15px;
            }
          }
        }
      }
    }
  }
}

@media (min-width: 768px) and (max-width: 991.9px) {
  .donation-page-wrap {
    & > .donation-amount {
      padding-right: 20px;
      align-items: flex-start;
      column-gap: 30px;

      .donation {
        width: 100% !important;

        img {
          width: 100% !important;
        }
      }

      // form container
      & > .form-container {
        width: 60%;
        border-radius: 10px;
        padding: 50px 20px 80px;

        & > h2 {
          font-size: 26px;
        }

        & > h4 {
          font-size: 17.5px;
        }

        & > .n-form {
          row-gap: 0;

          & > .n-form-item {
            display: unset;

            div.form-group {
              width: 100%;

              & > label {
                margin-bottom: 10px;
              }

              & > span.input-info {
                margin-top: 15px;
                font-size: 15px;
                font-weight: normal;
                line-height: 25px;
              }

              & span.check-box {
                top: -3px;
                left: unset;
                font-size: 15px;
                font-weight: normal;
                line-height: 25px;
              }

              & > .input {
                width: 100%;
                border-radius: 7px;
                font-size: 16px;
              }

              & > .n-checkbox {
                width: 100%;
              }
            }
          }

          & > div.submit-btn-container {
            & > .n-button {
              width: 100%;
              border-radius: 7px;
              font-size: 15px;
            }
          }
        }
      }
    }
  }
}

@media (min-width: 992px) and (max-width: 1200.9px) {
  .donation-page-wrap {
    & > .donation-amount {
      padding-right: 20px;
      align-items: flex-start;
      column-gap: 30px;

      .donation {
        width: 100% !important;

        img {
          width: 100% !important;
        }
      }

      // form container
      & > .form-container {
        max-width: 450px;
        border-radius: 20px;

        & > .n-form {
          & > .n-form-item {
            .form-group {
              & > span.input-info {
                margin-top: 15px;
                font-size: 15px;
                line-height: 27px;
              }

              & span.check-box {
                // font-size: 14px;
                line-height: 25px;
              }

              & > .input {
                width: 100% !important;
              }

              & > .n-checkbox {
                width: 100%;
              }
            }
          }

          & > .submit-btn-container {
            display: flex;
            justify-content: flex-start;

            & > .n-button {
              width: 100%;
              font-size: 15px !important;
            }
          }
        }
      }
    }
  }
}

@media (min-width: 1201) and (max-width: 1499.9px) {
  .donation-page-wrap {
    & > .donation-amount {
      .donation {
        width: 100% !important;
      }

      // form container
      & > .form-container {
        max-width: 450px;
        border-radius: 20px;

        & > .n-form {
          & > .n-form-item {
            .form-group {
              & > span.input-info {
                margin-top: 15px;
                font-size: 15px;
                line-height: 27px;
              }

              & span.check-box {
                // font-size: 14px;
                line-height: 25px;
              }

              & > .input {
                width: 100% !important;
              }

              & > .n-checkbox {
                width: 100%;
              }
            }
          }

          & > .submit-btn-container {
            display: flex;
            justify-content: flex-start;

            & > .n-button {
              width: 100%;
              font-size: 15px !important;
            }
          }
        }
      }
    }
  }
}

@media (min-width: 1500px) {
  .donation-page-wrap {
    & > .donation-amount {
      justify-content: space-evenly;
      align-items: flex-start;
      padding: 0 200px;

      .donation {
        width: 60%;

        img {
          // border: 3px solid red;
          width: 100%;
        }
      }

      & > .form-container {
        // width: 40%;
        // border-top-right-radius: 50%;
      }
    }
  }
}
</style>
