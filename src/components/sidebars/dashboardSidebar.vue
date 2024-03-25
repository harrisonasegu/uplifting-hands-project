<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { NLayoutSider, NMenu, NSpace, type GlobalTheme } from 'naive-ui'

import { dashboardNavMenu } from '@/menu/nav/dashboard-nav-menu'

import { useThemeModeStore } from '@/stores/common/themeMode'

import DashboardLogo from './dashboardLogo.vue'

const route: string | any = useRoute()

const themeStore = useThemeModeStore()

const hasDarkTheme = themeStore.getThemeMode as never as GlobalTheme

const activeRoute = computed(() => route?.name)
</script>

<template>
    <n-layout-sider
        bordered
        show-trigger
        collapse-mode="width"
        :collapsed-width="64"
        :width="240"
        :native-scrollbar="false"
        :class="hasDarkTheme ? 'dark-theme' : ''"
    >
        <n-space vertical :size="40">
            <!-- logo -->
            <DashboardLogo />

            <n-menu
                :collapsed-width="64"
                :collapsed-icon-size="22"
                :options="dashboardNavMenu"
                :default-value="activeRoute"
                inverted
            />
        </n-space>    
    </n-layout-sider>
</template>

<style lang="scss" scoped>
.n-layout-sider {
    background-color: $base-color;
    // background-color: $banner-bg;
    // background-color: #f8f8f7;
       
    // dark theme mode color
    &.dark-theme {
        background-color: $dark-theme;
    }
}

@media (max-width: 991.9px) {
    .n-layout-sider {
        display: none;
    }
}
</style>
