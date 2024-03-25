<script lang="ts" setup>
import { useAuthenticationStore } from '@/stores/modules/authentication'

const authStore = useAuthenticationStore()

const handleClick = () => authStore.updateIsLogoutMenuClicked(true)
</script>

<template>
  <nav>
    <ul>
      <li>
        <span>Welcome, {{ authStore.getUser?.email }}</span>
      </li>
      <li>
        <a @click.prevent="handleClick" href="/logout">Log out</a>
      </li>
    </ul>
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

  &> ul {
    display: flex;
    column-gap: 30px;
    list-style-type: none;

    &>li {
      width: max-content;
      display: flex;
      position: relative;
      column-gap: 50px;
      align-items: center;

      // link
      &>* {
        text-decoration: none;
        font-style: normal;
        font-weight: 700;
        font-size: $header-font-size;
        color: #ffffff;
      }
    }
  }
}

// SM and MD
@media (max-width: 250.9px) {
  nav {
    & > ul {
      & > li * {
        font-size: 15px;
      }
    }
  }
}

// XX-SM
@media (min-width: 251px) and (max-width: 350.9px) {
  nav {
    & > ul {
      & > li * {
        font-size: 15px;
      }
    }
  }
}

// SM and MD
@media (min-width: 576px) and (max-width: 991.9px) {
  nav {
    & > ul {
      & > li * {
        font-size: 15px;
      }
    }
  }
}

// LG
// @media (min-width: 992px) and (max-width: 1200.9px) {}

// XXL
// @media (min-width: 1500px) {}
</style>