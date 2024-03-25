<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useRoute, type RouteLocationNormalizedLoaded } from 'vue-router'
import { NDropdown } from 'naive-ui'

import { openLayoutHelpCenterNavDropdown } from '@/menu/nav/open-layout-nav-menu'

const route = useRoute()

const path = ref('/customer-service')

const updatePath = (route_name: string) => {
  // routes not in dropdown nav menu
  if (!['customer service', 'application help'].includes(route_name)) return
  // ------------------------------------

  if (route_name === 'customer service') {
    path.value = '/customer-service'
  } else if (route_name === 'application help') {
    path.value = '/application-help'
  }
}

watch(route, (name: RouteLocationNormalizedLoaded) => updatePath(name?.name as string))
</script>

<template>
  <nav>
    <ul>
      <li>
        <router-link to="/about-us">About Us</router-link>
      </li>
      <li>
        <router-link to="/student">Student</router-link>
      </li>
        <li>
        <n-dropdown
          trigger="hover"
          :show-arrow="true"
          :options="openLayoutHelpCenterNavDropdown"
        >
          <a
            class="dropdown" 
            :href="'/help-center'"
            @click.prevent
          >Help Center</a>
        </n-dropdown>
      </li>
    </ul>
    <div>
      <a
        v-if="route.name === 'home'"
        href="/#donate"
      >Donate</a>
      <router-link to="/apply">Apply</router-link>
      <router-link to="/sign-in">Sign In</router-link>
    </div>
  </nav>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

nav {
  display: flex;
  column-gap: 50px;

  // nav and button containers
  &> ul, div {
    display: flex;

    & a {
      text-decoration: none;

      &.router-link-exact-active {
        color: #FFFFFF80 !important;
      }
    }
  }
  // ------------------------

  &> ul {
    display: flex;
    // column-gap: 50px;
    column-gap: 30px;
    list-style-type: none;

    &>li {
      width: max-content;
      display: flex;
      position: relative;
      column-gap: 50px;
      align-items: center;
      }

      // link
      a {
        font-style: normal;
        font-weight: 600;
        font-size: $header-font-size;
        color: #ffffff;

        &.dropdown {
          &::after {
            position: absolute;
            top: 40%;
            content: "";
            width: 0;
            height: 0;
            border-left: 8px solid transparent;
            border-right: 8px solid transparent;
            border-top: 9px solid #ffffff;
            margin-left: 9px;
          }
        }
    }
  }

  &> div {
    column-gap: 25px;

    &> a {
      width: 100px;
      height: 40px;
      border: 1px solid #FFFFFF;
      border-radius: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 600;
      font-size: $header-font-size;
      background: #23233F;
      color: #ffffff;
    }
  }
}

// SM and MD
@media (min-width: 576px) and (max-width: 991.9px) {
  nav {
    // nav and button containers
    & > ul, div {
      column-gap: 10px;
    }

    & > ul {
      // hide nav menu on current screen
      display: none;

      & > li a {
        font-size: 15px;
      }
    }

    & > div > a {
      width: 80px;
      height: 40px;
      font-size: 15px;
    }
  }
}

// LG
@media (min-width: 992px) and (max-width: 1200.9px) {
  nav {
    // nav and button containers
    & > ul, div {
      column-gap: 20px;
    }

    & > ul > li a {
      font-size: 16px;
    }

    & > div > a {
      width: 80px;
      height: 40px;
      font-size: 15px;
    }
  }
}

// XXL
// @media (min-width: 1500px) {}
</style>