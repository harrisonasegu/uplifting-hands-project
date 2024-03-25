<script setup lang="ts">
import {
  NTabs,
  NTabPane
} from 'naive-ui'

import ProfileTabContent from './profile.vue'
import SecurityTabContent from './security.vue'
import NotificationTabContent from './notification.vue'
</script>

<template>
  <div class="settings-container">
    <n-tabs default-value="profile" size="large">
      <n-tab-pane name="profile" tab="Profile">
        <ProfileTabContent />
      </n-tab-pane>

      <n-tab-pane name="security" tab="Security">
        <SecurityTabContent />
      </n-tab-pane>

      <!-- <n-tab-pane name="notification" tab="Notification">
        <NotificationTabContent />
      </n-tab-pane> -->
    </n-tabs>
  </div>
</template>

<style lang="scss" scoped>
div.settings-container {
  .n-tabs {
    padding: 10px 40px;

    .n-tab-pane {
      border: 1px solid $base-color;
      border-radius: 10px;
      margin-top: 40px;
      padding: 30px;
      display: flex;
      flex-direction: column;
      row-gap: 5px;
    }
  }
}

// MEDIA QUERY
// XX-SM (<251px)
@media (max-width: 250.9px) {
  div.settings-container {
    .n-tabs {
      padding: 0;

      .n-tab-pane {
        border: transparent;
        padding: 0;

        &>.form-item-row {
          row-gap: 0;

          &.col {
            flex-direction: column;
          }

          .n-form-item {
            .form-group {
              width: 100%;

              // input label
              &>label {
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
}

// XX-SM
@media (min-width: 251px) and (max-width: 350.9px) {
  div.settings-container {
    .n-tabs {
      padding: 0;

      .n-tab-pane {
        border: transparent;
        padding: 0;
      }
    }
  }
}

// X-SM
@media (min-width: 351px) and (max-width: 575.9px) {
  div.settings-container {
    .n-tabs {
      padding: 0;

      .n-tab-pane {
        border: transparent;
        padding: 0;
      }
    }
  }
}

// SM
@media (min-width: 576px) and (max-width: 767.9px) {
  div.settings-container {
    .n-tabs {
      padding: 0;

      .n-tab-pane {
        border: transparent;
        padding: 0;
      }
    }
  }
}

// MD
@media (min-width: 768px) and (max-width: 991.9px) {
  div.settings-container {
    .n-form {
      .n-tabs {
        padding: 10px;

        .n-tab-pane {
          padding: 30px;
        }
      }
    }
  }
}

// LG
@media (min-width: 992px) and (max-width: 1200.9px) {
  div.settings-container {
    .n-tabs {
      padding: 10px 30px;
    }
  }
}
</style>
