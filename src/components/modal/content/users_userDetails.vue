<script setup lang="ts">
import type { PropType } from 'vue'

import type { UserData_Interface } from '@/interface/authentication';

import { useFormatDateTime } from '@/composables/formatDateString';

defineProps({
  user: Object as PropType<UserData_Interface>
})
</script>

<template>
  <div class="modal-content-details">
    <div>
      <section class="modal-content-container">
        <!-- customer details -->
        <section class="customer-detail">
          <h4>Basic Information</h4>
          <div class="detail-row">
            <div class="detail-group">
              <span class="detail-label">Name:</span>
              <span class="detail-value">{{ user?.lastName}} {{ user?.middleName}} {{ user?.firstName }}</span>
            </div>
            <div class="detail-group">
              <span class="detail-label">Email:</span>
              <span class="detail-value">{{ user?.email }}</span>
            </div>
            <div class="detail-group">
              <span class="detail-label">Phone:</span>
              <span class="detail-value">{{ user?.phoneNumber }}</span>
            </div>
            <div class="detail-group">
              <span class="detail-label">NIN:</span>
              <span class="detail-value">{{ user?.nin ?? 'NA' }}</span>
            </div>
            <div class="detail-group">
              <span class="detail-label">Role:</span>
              <span class="detail-value">{{ user?.roleName }}</span>
            </div>
          </div>
        </section>

        <!-- Other details -->
        <section class="order-detail">
          <h4>Other Information</h4>
          <div class="detail-row">
            <div class="detail-group">
              <span class="detail-label">Date Created:</span>
              <span class="detail-value">{{ useFormatDateTime(user?.dateCreated) }}</span>
            </div>
            <div class="detail-group">
              <span class="detail-label">Created By:</span>
              <span class="detail-value">{{ user?.createdByUserEmail }}</span>
            </div>
            <div class="detail-group">
              <span class="detail-label">Last Login Date:</span>
              <span class="detail-value">{{ useFormatDateTime(user?.lastLoginDate) }}</span>
            </div>
            <div class="detail-group">
              <span class="detail-label">Logged In With IP Address:</span>
              <span class="detail-value">{{ user?.loggedInWithIPAddress ?? 'NA'  }}</span>
            </div>
            <div class="detail-group">
              <span class="detail-label">User Status:</span>
              <span class="detail-value">{{ user?.userStatus }}</span>
            </div>
            <div class="detail-group">
              <span class="detail-label">User Approved:</span>
              <span class="detail-value">{{ user?.isApproved }}</span>
            </div>
            <div class="detail-group">
              <span class="detail-label">Approved By:</span>
              <span class="detail-value">{{ user?.approvedByUserEmail ?? 'NA' }}</span>
            </div>
            <div class="detail-group">
              <span class="detail-label">User Disapproved:</span>
              <span class="detail-value">{{ user?.isDisapproved ?? 'NA' }}</span>
            </div>
            <div class="detail-group">
              <span class="detail-label">Disapproved By:</span>
              <span class="detail-value">{{ user?.disapprovedByUserEmail ?? 'NA' }}</span>
            </div>
            <div class="detail-group">
              <span class="detail-label">Disapproval Reason:</span>
              <span class="detail-value">{{ user?.disapprovedComment ?? 'NA' }}</span>
            </div>
            <div class="detail-group">
              <span class="detail-label">User Deactivated:</span>
              <span class="detail-value">{{ user?.isDeactivated ?? 'NA' }}</span>
            </div>
            <div class="detail-group">
              <span class="detail-label">Deactivated By:</span>
              <span class="detail-value">{{ user?.deactivatedByUserEmail ?? 'NA' }}</span>
            </div>
            <div class="detail-group">
              <span class="detail-label">Deactivation Reason:</span>
              <span class="detail-value">{{ user?.deactivatedComment ?? 'NA' }}</span>
            </div>
            <div class="detail-group">
              <span class="detail-label">User Locked Out:</span>
              <span class="detail-value">{{ user?.isLockedOut }}</span>
            </div>
          </div>
        </section>
      </section>
    </div>
  </div>
</template>

<style lang="scss" scoped>
div.modal-content-details {
  width: 850px;

  // button style
  .action-btn {
    width: fit-content;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border: transparent;
    box-sizing: border-box;
    border-radius: 5px;
    padding: 9px 20px;
    transition: all 0.4s;
    text-decoration: none;
    background-color: transparent;
    cursor: pointer;

    &:hover {
      filter: brightness(0.97);
    }
    &:active {
      filter: brightness(1);
    }
    &:focus {
      outline: transparent;
    }

    // disabled action button
    &:disabled {
      background-color: rgb(190, 190, 190) !important;
      filter: none;
      cursor: not-allowed;
    }
  }
  // -----------------------------

  & > div {
    display: flex;
    flex-direction: column;
    row-gap: 15px;
    border: 0.5px solid #fafafa;
    background-color: #fffefe;

    &>section {
      background-color: $base-color;

      // modal header container
      &.modal-header-container {
        border-radius: 5px 5px 0 0;
        padding: 15px 10px;

        h2 {
          text-transform: uppercase;
          color: #ffffff;
        }
      }

      // modal content container
      &.modal-content-container {
        display: flex;
        flex-direction: column;
        row-gap: 20px;
        padding: 10px 10px;
        color: #575f6e;
        background-color: transparent;

        // customer and order detail
        section {
          display: flex;
          flex-direction: column;
          row-gap: 10px;

          &>h4 {
            text-transform: capitalize;
            font-size: 16px;
            font-weight: 800;
          }

          &>div.detail-row {
            display: flex;
            flex-flow: row wrap;
            row-gap: 12px;
            column-gap: 20px;

            div.detail-group {
              display: flex;
              flex-basis: 45%;
              flex-flow: row wrap;
              row-gap: 5px;
              column-gap: 10px;

              span {
                font-size: 14px;
                line-height: 17px;

                &.detail-label {
                  font-weight: 600;
                }
              }
            }
          }
        }
      }

      // modal action button container
      &.modal-action-btn-container {
        padding: 15px 10px;

        & > div.action-btn-rows {
          display: flex;
          flex-flow: row wrap-reverse;
          justify-content: flex-end;
          align-items: center;
          row-gap: 5px;
          column-gap: 20px;

          & > button {
            width: 100px;

            // close
            &.action-close {
              background: #f8f8f8;
              border: 1px solid #c4c4c4;
            }
            // submit
            &.action-submit {
              background: #ffffff;
              color: $base-color;

              &:disabled {
                color: #ffffff;
              }
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
  div.modal-content-details {
    width: 100%;
    
    & > div {
      &>section {
        // modal header container
        &.modal-header-container {
          border-radius: 0;
          padding: 15px 5px;

          h2 {
            font-size: 19px;
          }
        }

        // modal content container
        &.modal-content-container {
          // customer and order detail
          section {
            &>div.detail-row {
              div.detail-group {
                flex-basis: 100%;
              }
            }
          }
        }

        // modal action button container
        &.modal-action-btn-container {
          & > div.action-btn-rows {
            & > button {
              width: 100%;
            }
          }
        }
      }
    }
  }
}

// XX-SM
@media (min-width: 251px) and (max-width: 350.9px) {
  div.modal-content-details {
    width: 100%;
    
    & > div {
      &>section {
        // modal header container
        &.modal-header-container {
          border-radius: 0;
          padding: 15px 5px;

          h2 {
            font-size: 19px;
          }
        }

        // modal content container
        &.modal-content-container {
          // customer and order detail
          section {
            &>div.detail-row {
              div.detail-group {
                flex-basis: 100%;
              }
            }
          }
        }
      }
    }
  }
}

// X-SM
@media (min-width: 351px) and (max-width: 575.9px) {
  div.modal-content-details {
    width: 100%;
    
    & > div {
      &>section {
        // modal header container
        &.modal-header-container {
          border-radius: 0;

          h2 {
            font-size: 20px;
          }
        }

        // modal content container
        &.modal-content-container {
          // customer and order detail
          section {
            &>div.detail-row {
              div.detail-group {
                flex-basis: 100%;
              }
            }
          }
        }
      }
    }
  }
}

// SM
@media (min-width: 576px) and (max-width: 767.9px) {
  div.modal-content-details {
    width: 100%;

    & > div {
      &>section {
        // modal header container
        &.modal-header-container {
          border-radius: 0;
        }
      }
    }
  }
}

// MD
@media (min-width: 768px) and (max-width: 991.9px) {
  div.modal-content-details {
    width: 85%;
  }
}

// LG
// @media (min-width: 992px) and (max-width: 1200.9px) {}

// XL
// @media (max-width: 1201px) {}

</style>
