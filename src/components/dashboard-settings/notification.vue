
<script lang="ts" setup>
import { NSwitch } from 'naive-ui'
</script>

<template>
  <div class="notification-container">
    <div class="caption">
      <h2>Push Notification</h2>
      <div class="content-switch">
        <span>Get new notifications for your transactions</span>
        <n-switch />
      </div>
    </div>
    <div class="caption">
      <h2>Email Notification</h2>
      <div class="content-switch">
        <span>Receive email notifications for your transactions</span>
        <n-switch />
      </div>
    </div>
    <div class="caption">
      <h2>SMS Notification</h2>
      <div class="content-switch">
        <span>Receive sms notifications for your transactions</span>
        <n-switch />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
div.notification-container {
  width: 503px;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  color: $base-color;

  &>.caption {
    width: 100%;
    line-height: 25px;

    h2 {
      font-size: 15px;
    }

    .content-switch {
      display: flex;
      justify-content: space-between;
      column-gap: 20px;

      span {
        font-size: 15px;
      }
    }
  }
}

// MEDIA QUERY
// XX-SM (<251px)
@media (max-width: 250.9px) {
  div.notification-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 30px;
    color: $base-color;

    &>.caption {
      width: 100%;
      line-height: 25px;

      h2 {
        font-size: 15px;
      }

      .content-switch {
        // border: 2px solid red;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;

        span {
          font-size: 15px;
        }
      }
    }
  }
}

// XX-SM
@media (min-width: 251px) and (max-width: 350.9px) {
  div.notification-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 30px;
    color: $base-color;

    &>.caption {
      width: 100%;
      line-height: 25px;

      h2 {
        font-size: 15px;
      }

      .content-switch {
        // border: 2px solid red;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;

        span {
          font-size: 15px;
        }
      }
    }
  }
}

// X-SM
@media (min-width: 351px) and (max-width: 575.9px) {
  div.notification-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 25px;
    color: $base-color;

    &>.caption {
      width: 100%;
      line-height: 25px;

      h2 {
        font-size: 15px;
      }

      .content-switch {
        justify-content: space-between;
        column-gap: 50px;

        span {
          font-size: 15px;
        }
      }
    }
  }
}
</style>
