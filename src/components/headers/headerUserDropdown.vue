<script setup lang="ts">
import { h } from 'vue'
import { NDropdown } from 'naive-ui'

import { LogOutOutline } from '@vicons/ionicons5'

import imgUrl from '@/assets/images/icons/profile-image.png'

import type { UserData_Interface } from '@/interface/authentication'

import { useAuthenticationStore } from '@/stores/modules/authentication'
import { useToBase64 } from '@/composables/base64'
import { useRenderIcon } from '@/composables/renderIcon'

const userStore = useAuthenticationStore()

const user: UserData_Interface | null = userStore.getUser as UserData_Interface | null

const name: string|undefined = `${user?.firstName} ${user?.lastName}`

const emit = defineEmits(['logoutButtonClicked'])

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
  <!-- navigation and button container -->
  <section class="nav-indicator-container">
    <!-- profile section -->
    <div class="nb-profile">
      <!-- user image and name -->
      <div class="nb-user-info">
        <div class="nb-user-info-content">
          <span>{{ name }}</span>
          <n-dropdown
            trigger="hover"
            :options="userIconDropdownMenu"
            @select="handleSelect"
          >
            <div class="photo-name">
              <!-- <span>{{ name }}</span> -->
              <img :src="imgUrl" alt="User photo">
            </div>
          </n-dropdown>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
// navigation and button container
section.nav-indicator-container {
  height: inherit;
  display: flex;
  flex-flow: row wrap;
  row-gap: 20px;
  justify-content: space-between;
  align-items: center;

  // profile section
  &>div.nb-profile {
    width: fit-content;
    display: grid;
    align-items: center;

    // user container
    div.nb-user-info {
      &>div.nb-user-info-content {
        display: flex;
        column-gap: 10px;
        align-items: center;

        &>div.photo-name {
          display: flex;
          column-gap: 10px;
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
          }

          // photo
          &>img {
            width: 36px;
            height: 36px;
            border-radius: 100%;
          }
          // name of user
          &>span {
            font-size: 14px;
            transition: color 0.4s;
            color: #ffffff;
          }
        }

        // dropdown content
        &>div.nb-profile-menu {
          width: 192px;
          min-width: 10rem;
          height: auto;
          position: absolute;
          right: 0;
          margin-top: 20px;
          padding: .5rem 0;
          border-radius: .4375rem;
          box-shadow: 0 50px 100px rgba(50,50,93,.1),0 15px 35px rgba(50,50,93,.15),0 5px 15px rgba(0,0,0,.1);
          font-size: 1rem;
          text-align: left;
          background-color: #ffffff;
          color: #525f7f;

          &>div.profile-menu-caption {
            &>h6 {
              padding: 8px 16px;
            }
          }
          &>ul.profile-menu-box {
            list-style-type: none;

            &>li.profile-menu-item {
              padding: 10px 16px;

              &:hover {
                background-color: #f6f9fc;
              }

              &>a {
                display: flex;
                flex-flow: row wrap;
                align-items: center;
                font-size: 0.875rem;
                text-decoration: none;
                background-color: transparent;
                color: #16181b;

                // icon
                &>svg {
                  width: 16px;
                  height: 16px;
                  margin-right: 16px;
                }
                // text
                &>span {
                  font-size: 14px;
                }
              }
            }

            // divider
            &>div.dropdown-divider {
              height: 0;
              margin: .5rem 0;
              overflow: hidden;
              border-top: 1px solid #e9ecef;
            }
            // -------------------------
          }
        }
      }
    }
  }
}


// MEDIA QUERY

// XX-SM (<251px)
@media (max-width: 250.9px) {
  // navigation and button container
  section.nav-indicator-container {
    flex-flow: column wrap;
    align-items: flex-start;
    padding: 16px 3px;

    // nav box
    &>div.nav-box {
      flex-basis: 100%;

      // nav title
      &>h6 {
        font-size: 18px;
      }
      // nav list
      &>nav.nav-list {
        font-size: 13px;
      }
    }

    // profile section
    &>div.nb-profile {
      display: none;
    }
  }
}

// XX-SM
@media (min-width: 251px) and (max-width: 350.9px) {
  // navigation and button container
  section.nav-indicator-container {
    flex-flow: column wrap;
    align-items: flex-start;
    padding: 16px 3px;

    // nav box
    &>div.nav-box {
      flex-basis: 100%;

      // nav title
      &>h6 {
        font-size: 18px;
      }
      // nav list
      &>nav.nav-list {
        font-size: 13px;
      }
    }

    // profile section
    &>div.nb-profile {
      display: none;
    }
  }
}

// X-SM
@media (min-width: 351px) and (max-width: 575.9px) {
  // navigation and button container
  section.nav-indicator-container {
    padding: 16px 3px;

    // nav box
    &>div.nav-box {
      flex-basis: 55%;

      // nav title
      &>h6 {
        font-size: 20px;
      }
      // nav list
      &>nav.nav-list {
        font-size: 15px;
      }
    }
    // button box
    &>div.btn-box {
      flex-basis: 40%;
    }

    // profile section
    &>div.nb-profile {
      display: none;
    }
  }
}

// SM
@media (min-width: 576px) and (max-width: 767.9px) {
  // navigation and button container
  section.nav-indicator-container {
    padding: 16px 5px;

    // nav box
    &>div.nav-box {
      flex-basis: 55%;

      // nav title
      &>h6 {
        font-size: 20px;
      }
      // nav list
      &>nav.nav-list {
        font-size: 15px;
      }
    }
    // button box
    &>div.btn-box {
      flex-basis: 40%;
    }

    // profile section
    &>div.nb-profile {
      display: none;
    }
  }
}

// MD
@media (min-width: 768px) and (max-width: 991.9px) {
  section.nav-indicator-container {
    padding: 16px 5px;

    // profile section
    &>div.nb-profile {
      display: none;
    }
  }
}

// LG
@media (min-width: 992px) and (max-width: 1200.9px) {
   section.nav-indicator-container {
    padding: 16px 12px;
  }
}
</style>

