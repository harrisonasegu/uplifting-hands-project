<script setup lang="ts">
import { onBeforeMount, reactive } from "vue";

import { NForm, NFormItem, NInput, NDatePicker } from "naive-ui";

import { useAuthenticationStore } from "@/stores/modules/authentication";

const userStore = useAuthenticationStore();

const userProfile = userStore.getUser

const model = reactive({
  firstName: '',
  middleName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  dateCreated: 0,
});

const updateModel = () => {
  if (userProfile) {
    model.firstName = userProfile?.firstName;
    model.middleName = userProfile?.middleName;
    model.lastName = userProfile?.lastName;
    model.email = userProfile?.email;
    model.phoneNumber = userProfile?.phoneNumber;
    model.dateCreated = new Date(userProfile?.dateCreated)?.getTime()
  }
}

onBeforeMount(() => updateModel());
</script>

<template>
  <div class="profile-container">
    <n-form ref="formRef">
      <div class="form-item-row col col-3">
        <n-form-item path="phone_number">
          <div class="form-group">
            <label>Administrator's First Name</label>
            <n-input
              class="input"
              :bordered="false"
              placeholder=""
              size="large"
              v-model:value="model.firstName"
              disabled
            />
          </div>
        </n-form-item>

        <n-form-item path="phone_number">
          <div class="form-group">
            <label>Administrator's First Name</label>
            <n-input
              class="input"
              :bordered="false"
              placeholder=""
              size="large"
              v-model:value="model.middleName"
              disabled
            />
          </div>
        </n-form-item>
        <n-form-item path="nin">
          <div class="form-group">
            <label>Administrator's Last Name</label>
            <n-input
              class="input"
              :bordered="false"
              placeholder=""
              size="large"
              v-model:value="model.lastName"
              disabled
              />
          </div>
        </n-form-item>
      </div>

      <div class="form-item-row col col-3">
        <n-form-item path="nin">
          <div class="form-group">
            <label>Email Address</label>
            <n-input
              class="input"
              :bordered="false"
              placeholder=""
              size="large"
              v-model:value="model.email"
              disabled
              />
          </div>
        </n-form-item>

        <n-form-item path="phone_number">
          <div class="form-group">
            <label>Phone number</label>
            <n-input
              class="input"
              :bordered="false"
              placeholder=""
              size="large"
              v-model:value="model.phoneNumber"
              disabled
              />
          </div>
        </n-form-item>

        <n-form-item path="nin">
          <div class="form-group">
            <label>Date Created</label>
            <n-date-picker
              class="input"
              size="large"
              type="date"
              :bordered="false"
              placeholder=""
              v-model:value="model.dateCreated"
              disabled
              />
          </div>
        </n-form-item>
      </div>
    </n-form>
  </div>
</template>

<style lang="scss" scoped>
div.profile-container {
  .n-form {
    color: $base-color;

    .form-item-row {
      display: flex;

      &.col {
        flex-direction: row;

        &.col-2 {
          column-gap: 77px;
        }

        &.col-3 {
          column-gap: 19px;
        }
      }

      .n-form-item {
        width: 100%;
        display: block;

        .form-group {
          width: 100%;
          display: flex;
          flex-direction: column;

          // input label
          & > label {
            margin-bottom: 10px;
            font-size: 16px;
            font-weight: 500;
          }

          // input info guide
          & > span.input-info {
            margin-top: 23px;
            font-size: 18px;
            font-weight: 800;
            line-height: 30.26px;
          }

          // input (checkbox)
          & span.check-box {
            position: relative;
            top: -5px;
            left: 15px;
            font-size: 32px;
            font-weight: 800;
            line-height: 36px;
            color: #ffffff;
          }

          // input
          & .input {
            border: 1px solid $base-color;
            width: 100%;
            border-radius: 50px;
            display: flex;
            align-items: center;
            color: $base-color;
            // background: #ffffff;
            overflow: hidden;

            &.textarea {
              height: unset;
              border-radius: 10px;
            }
          }

          // input (file upload)
          & > .doc {
            display: flex;
            justify-content: flex-start;
            row-gap: 10px;
            column-gap: 19px;
            align-items: center;

            .n-upload {
              width: fit-content;

              .n-button {
                width: 287px;
                height: 55px;
                background: #d9d9d9;

                .btn-text-container {
                  margin-left: -20px;
                  display: flex;
                  justify-content: flex-start;
                  row-gap: 10px;
                  align-items: center;
                  font-weight: 700;
                  color: $base-color;

                  & > span:first-child > * {
                    font-size: 30px;
                  }

                  & > span:last-child {
                    font-size: 18px;
                  }
                }
              }
            }

            .file-name {
              // border: 2px solid red;
              width: 611px;
              height: fit-content;
              padding: 10px 20px;
              background: #848383;
              font-size: 25px;
            }
          }
        }
      }
    }
  }
}

// MEDIA QUERY
// XX-SM (<251px)
@media (max-width: 250.9px) {
  div.profile-container {
    .n-form {
      & > .form-item-row {
        row-gap: 0;

        &.col {
          flex-direction: column;
        }

        .n-form-item {
          .form-group {
            width: 100%;

            // input label
            & > label {
              font-size: 14px;
              font-weight: normal;
            }

            // input
            & .input {
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

// XX-SM
@media (min-width: 251px) and (max-width: 350.9px) {
  div.profile-container {
    .n-form {
      & > .form-item-row {
        row-gap: 0;

        &.col {
          flex-direction: column;
        }

        .n-form-item {
          .form-group {
            width: 100%;

            // input label
            & > label {
              font-size: 15px;
              font-weight: normal;
            }

            // input
            & .input {
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

// X-SM
@media (min-width: 351px) and (max-width: 575.9px) {
  div.profile-container {
    .n-form {
      & > .form-item-row {
        row-gap: 0;

        &.col {
          flex-direction: column;
        }

        .n-form-item {
          .form-group {
            width: 100%;

            // input label
            & > label {
              font-size: 15px;
              font-weight: normal;
            }

            // input
            & .input {
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

// SM
@media (min-width: 576px) and (max-width: 767.9px) {
  div.profile-container {
    .n-form {
      & > .form-item-row {
        row-gap: 0;

        &.col {
          flex-direction: column;
        }

        .n-form-item {
          .form-group {
            width: 100%;

            // input label
            & > label {
              font-weight: normal;
            }

            // input
            & .input {
              width: 100%;
              border-radius: 7px;
            }
          }
        }
      }
    }
  }
}

// MD
@media (min-width: 768px) and (max-width: 991.9px) {
  div.profile-container {
    .n-form {
      & > .form-item-row {
        row-gap: 10px;

        &.col {
          &.col-2 {
            column-gap: 20px;
          }
        }

        .n-form-item {
          .form-group {
            width: 100%;

            // input
            & .input {
              width: 100%;
              border-radius: 7px;
            }
          }
        }
      }
    }
  }
}

// LG
@media (min-width: 992px) and (max-width: 1200.9px) {
  div.profile-container {
    .n-form {
      & > .form-item-row {
        &.col {
          &.col-2 {
            column-gap: 30px;
          }
        }

        .n-form-item {
          .form-group {
            width: 100%;

            // input
            & .input {
              width: 100%;
            }
          }
        }
      }
    }
  }
}
</style>
