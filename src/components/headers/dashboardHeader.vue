<script setup lang="ts">
import { computed, onBeforeMount } from 'vue'
import { NLayoutHeader, type GlobalTheme } from 'naive-ui'

import MobileSidebarMenu from '@/components/drawers/sidebarDrawerMenu.vue'
import DashboardRouteTitle from '@/components/headers/dashboardRouteTitle.vue'
import ThemeModeSwitch from '@/components/theme/themeModeSwitch.vue'

import { useMobileSidebarMenu } from '@/stores/common/mobileSidebarMenu'
import { useAuthenticationStore } from '@/stores/modules/authentication'

import { useThemeModeStore } from '@/stores/common/themeMode'
import { dashboardNavMenu } from '@/menu/nav/dashboard-nav-menu'

import imgUrl from '@/assets/logo.jpg'

const themeStore = useThemeModeStore()
const sidebarStore = useMobileSidebarMenu()
const authStore = useAuthenticationStore()

const hasDarkTheme = themeStore.getThemeMode as never as GlobalTheme

const sidebarState = computed<boolean>(() => sidebarStore.getSideMenuState)

const toggleSidebarMenu = () => sidebarStore.setSideMenuState(true)

const handleLogoutButtonClick = () => authStore.updateIsLogoutMenuClicked(true)

onBeforeMount(() => sidebarStore.setSideMenuState(false))
</script>

<template>
    <n-layout-header :class="hasDarkTheme ? 'dark-theme' : ''">
        <!-- mobile header -->
        <div class="mobile-header">
            <img :src="imgUrl" alt="app logo">

            <div class="side-menu-toggle">
                <div class="icon-container">
                    <a
                        href="/logout"
                        @click.prevent="handleLogoutButtonClick"
                    >
                        <Icon
                            icon="lucide:power"
                        />
                    </a>
                </div>
                <div :class="['sb-nav-toggle', sidebarState ? 'sb-is-active' : '']" @click="toggleSidebarMenu">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>

        <!-- desktop header -->
        <div class="desktop-header">
            <DashboardRouteTitle tag="h4" />
            <ThemeModeSwitch position="absolute" />
        </div>
    </n-layout-header>
    
    <!-- mobile sidebar menu -->
    <MobileSidebarMenu :nav-menu="dashboardNavMenu" :has-footer="true" />
</template>

<style lang="scss" scoped>
    .n-layout-header {
        border-bottom: 0.5px solid #99999996;
        padding: 10px 20px;
        display: flex;
        flex-direction: column;
        row-gap: 10px;
        position: sticky;
        top: 0;
        z-index: 3;
        background-color: $base-color;
       
        // dark theme mode color
        &.dark-theme {
            background-color: $dark-theme;
        }

        // mobile header
        &>div:first-child {
            display: flex;
            column-gap: 20px;
            justify-content: space-between;
            align-items: center;

            // logo
            &>img {
                height: 40px;
            }

            // toggle button
            div.side-menu-toggle {
                display: flex;
                row-gap: 7px;
                column-gap: 20px;
                align-items: center;

                // icon container
                div.icon-container {
                    display: flex;
                    row-gap: 7px;
                    column-gap: 20px;
                    align-items: center;

                    & * {
                        height: 25px;
                        font-size: 22px;
                        color: $declined;
                    }
                }

                // sidebar toggle button
                div.sb-nav-toggle {
                    width: 20px;
                    height: 18px;
                    display: grid;
                    grid-template: auto auto auto  / 90%;
                    justify-content: center;
                    align-items: center;
                    row-gap: 3px;
                    transform: rotateY(180deg);
                    cursor: pointer;

                    // when sidebar toggled
                    &.sb-is-active {
                        span:not(span:nth-child(even)) {
                            width: 60%;
                        }
                    }

                    span {
                        width: 100%;
                        height: 3px;
                        background-color: #ffffff;
                        transition: width 0.3s;
                    }
                }
            }
        }

        // desktop header
        &>div:last-child {
            height: 45px;
            border-top: 0.5px solid #e8e8e80e;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }

    // desktop
    @media (min-width: 992px) {
        .n-layout-header {
            // mobile header
            &>div:first-child {
                display: none;
            }

            // desktop header
            &>div:last-child {
                height: 45px;
                border-top: transparent;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
        }
    }

    // @media (min-width: 1500px) {
    //     .n-layout-header {
    //         padding: 10px 300px;
    //     }
    // }
</style>
