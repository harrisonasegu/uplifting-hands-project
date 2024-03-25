<script setup lang="ts">
import type { PropType } from 'vue'

import type { FundApplication_Interface } from '@/interface/fundOrFinancialAid';

import { useFormatDateTime } from '@/composables/formatDateString';

defineProps({
  application: Object as PropType<FundApplication_Interface>
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
              <span class="detail-label">Applicant Name:</span>
              <span class="detail-value">{{ application?.applicantName }}</span>
            </div>
            <div class="detail-group">
              <span class="detail-label">Applicant NIN:</span>
              <span class="detail-value">{{ application?.nin }}</span>
            </div>
            <div class="detail-group">
              <span class="detail-label">Institution Type:</span>
              <span class="detail-value">{{ application?.institutionType }}</span>
            </div>
            <div class="detail-group">
              <span class="detail-label">Institution Name:</span>
              <span class="detail-value">{{ application?.institutionName }}</span>
            </div>
            <div class="detail-group">
              <span class="detail-label">Degree Description:</span>
              <span class="detail-value">{{ application?.degreeDescription }}</span>
            </div>
            <div class="detail-group">
              <span class="detail-label">Enrolment Type:</span>
              <span class="detail-value">{{ application?.enrolmentType }}</span>
            </div>
            <div class="detail-group">
              <span class="detail-label">Semester Name:</span>
              <span class="detail-value">{{ application?.semesterName }}</span>
            </div>
            <div class="detail-group">
              <span class="detail-label">Fund Application Year:</span>
              <span class="detail-value">{{ application?.fundApplicationYear }}</span>
            </div>
            <div class="detail-group">
              <span class="detail-label">Degree Start Year:</span>
              <span class="detail-value">{{ application?.degreeStartYear }}</span>
            </div>
            <div class="detail-group">
              <span class="detail-label">Degree Completion Year:</span>
              <span class="detail-value">{{ application?.degreeCompletionYear }}</span>
            </div>
            <div class="detail-group">
              <span class="detail-label">School Contact Email:</span>
              <span class="detail-value">{{ application?.schoolContactEmail }}</span>
            </div>
            <div class="detail-group">
              <span class="detail-label">School Contact Number:</span>
              <span class="detail-value">{{ application?.schoolContactNumber }}</span>
            </div>
            <div class="detail-group">
              <span class="detail-label">Reasons For Fund Request:</span>
              <span class="detail-value">{{ application?.reasonsForFundRequest }}</span>
            </div>
            <div class="detail-group">
              <span class="detail-label">Application Status:</span>
              <span class="detail-value">{{ application?.status }}</span>
            </div>
          </div>
        </section>

        <!-- Other details -->
        <section class="order-detail">
          <h4>Other Information</h4>
          <div class="detail-row">
            <div class="detail-group">
              <span class="detail-label">Application Date:</span>
              <span class="detail-value">{{ useFormatDateTime(application?.created_Date) }}</span>
            </div>
            <div class="detail-group">
              <span class="detail-label">Created By:</span>
              <span class="detail-value">{{ application?.created_By_User_Email }}</span>
            </div>

            <div class="detail-group">
              <span class="detail-label">Application Submitted:</span>
              <span class="detail-value">{{ application?.isSubmitted ?? 'NA'  }}</span>
            </div>
            <div class="detail-group">
              <span class="detail-label">Submission Date:</span>
              <span class="detail-value">{{ useFormatDateTime(application?.submmisionDate) }}</span>
            </div>

            <div class="detail-group">
              <span class="detail-label">Application Reviewed:</span>
              <span class="detail-value">{{ application?.isReviewed ?? 'NA'  }}</span>
            </div>
            <div class="detail-group">
              <span class="detail-label">Review Date:</span>
              <span class="detail-value">{{ useFormatDateTime(application?.review_Date) }}</span>
            </div>
            <div class="detail-group">
              <span class="detail-label">Reviewed By:</span>
              <span class="detail-value">{{ application?.reviewed_By_User_Email ?? 'NA'  }}</span>
            </div>
            <div class="detail-group">
              <span class="detail-label">Review Comment:</span>
              <span class="detail-value">{{ application?.review_Comments ?? 'NA'  }}</span>
            </div>

            <div class="detail-group">
              <span class="detail-label">Application Approved:</span>
              <span class="detail-value">{{ application?.isApproved ?? 'NA'  }}</span>
            </div>
            <div class="detail-group">
              <span class="detail-label">Approval Date:</span>
              <span class="detail-value">{{ useFormatDateTime(application?.approval_Date) }}</span>
            </div>
            <div class="detail-group">
              <span class="detail-label">Approved By:</span>
              <span class="detail-value">{{ application?.approved_By_User_Email ?? 'NA'  }}</span>
            </div>
            <div class="detail-group">
              <span class="detail-label">Approval Comments:</span>
              <span class="detail-value">{{ application?.approval_Comments ?? 'NA'  }}</span>
            </div>

            <div class="detail-group">
              <span class="detail-label">Application Declined:</span>
              <span class="detail-value">{{ application?.isDeclined ?? 'NA' }}</span>
            </div>
            <div class="detail-group">
              <span class="detail-label">Declination Date:</span>
              <span class="detail-value">{{ useFormatDateTime(application?.declined_Date) }}</span>
            </div>
            <div class="detail-group">
              <span class="detail-label">Declined By:</span>
              <span class="detail-value">{{ application?.declined_By_User_Email ?? 'NA' }}</span>
            </div>
            <div class="detail-group">
              <span class="detail-label">Declination Comments:</span>
              <span class="detail-value">{{ application?.reasons_For_Decline ?? 'NA' }}</span>
            </div>

            <div class="detail-group">
              <span class="detail-label">Application Disbursed:</span>
              <span class="detail-value">{{ application?.isDisbursed ?? 'NA' }}</span>
            </div>
            <div class="detail-group">
              <span class="detail-label">Declination Date:</span>
              <span class="detail-value">{{ useFormatDateTime(application?.disbursed_Date) }}</span>
            </div>
            <div class="detail-group">
              <span class="detail-label">Disbursed By:</span>
              <span class="detail-value">{{ application?.disbursed_By_User_Email ?? 'NA' }}</span>
            </div>
            <div class="detail-group">
              <span class="detail-label">Declination Comments:</span>
              <span class="detail-value">{{ application?.disburse_Comments ?? 'NA' }}</span>
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
