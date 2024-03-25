<script lang="ts" setup>
import { h } from 'vue'
import { NDropdown } from 'naive-ui'
import { LogOutOutline } from '@vicons/ionicons5'

import { useAuthenticationStore } from '@/stores/modules/authentication'

import { useRenderIcon } from '@/composables/renderIcon'
import userIcon from '@/assets/Images/icons/profile-image.png'

const authStore = useAuthenticationStore()

const userIconDropdownMenu: any[] = [
  {
    label: () => h('b', 'Logout'),
    key: 'logout',
    icon: useRenderIcon(LogOutOutline)
  }
]

const handleSelect = () => authStore.updateIsLogoutMenuClicked(true)
</script>

<template>
  <div class="nb-profile">
    <div class="nb-user-info">
      <div class="nb-user-info-content">
        <n-dropdown
          show-arrow
          trigger="hover"
          :options="userIconDropdownMenu"
          @select="handleSelect"
        >
          <div class="photo-name">
            <img :src="userIcon" alt="user icon" />
          </div>
        </n-dropdown>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
div.nb-profile {
  width: fit-content;
  height: 46px;
  display: grid;
  align-items: center;

  // user container
  div.nb-user-info {
    &>div.nb-user-info-content {
      &>div.photo-name {
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;

        &::after {
          content: '';
          width: 0;
          height: 0;
          border-left: 7px solid transparent;
          border-right: 7px solid transparent;
          border-top: 8px solid #ffffff;
          margin-left: 5px;
        }

        // photo
        &>img {
          width: 36px;
          height: 36px;
          border-radius: 100%;
        }
      }
    }
  }
}


// MEDIA QUERY

// XX-SM (<251px)
@media (max-width: 250.9px) {
  div.nb-profile {
    // user container
    div.nb-user-info {
      &>div.nb-user-info-content {
        &>div.photo-name {
          &::after {
            border-left: 5px solid transparent;
            border-right: 5px solid transparent;
            border-top: 6px solid #ffffff;
          }

          // photo
          &>img {
            width: 22px;
            height: 22px;
          }
        }
      }
    }
  }
}

// XX-SM
@media (min-width: 251px) and (max-width: 350.9px) {
  div.nb-profile {
    // user container
    div.nb-user-info {
      &>div.nb-user-info-content {
        &>div.photo-name {
          &::after {
            border-left: 5px solid transparent;
            border-right: 5px solid transparent;
            border-top: 6px solid #ffffff;
          }

          // photo
          &>img {
            width: 24px;
            height: 24px;
          }
        }
      }
    }
  }
}

// X-SM
@media (min-width: 351px) and (max-width: 575.9px) {
  div.nb-profile {
    // user container
    div.nb-user-info {
      &>div.nb-user-info-content {
        &>div.photo-name {
          &::after {
            border-left: 6px solid transparent;
            border-right: 6px solid transparent;
            border-top: 7px solid #ffffff;
          }

          // photo
          &>img {
            width: 35px;
            height: 35px;
          }
        }
      }
    }
  }
}

// hide user icon from bigger devices
@media (min-width: 768px) {
  div.nb-profile {
    display: none;
  }
}
</style>
