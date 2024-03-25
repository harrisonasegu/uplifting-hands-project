<script setup lang="ts">
import { computed, onBeforeMount } from 'vue'
import { NLayoutHeader } from 'naive-ui'

import GuestHeaderNav from '@/components/headers/nav/guestHeaderNav.vue'
import MobileSidebarMenu from '@/components/drawers/sidebarDrawerMenu.vue'

import { useMobileSidebarMenu } from '@/stores/common/mobileSidebarMenu'

import { openLayoutNavMenu } from '@/menu/nav/open-layout-nav-menu'

const store = useMobileSidebarMenu()
const { setSideMenuState } = store

const sidebarState = computed<boolean>(() => store.getSideMenuState)
const toggleSidebarMenu = () => setSideMenuState(true)

onBeforeMount(() => setSideMenuState(false))
</script>

<template>
    <n-layout-header>
        <div class="open-layout-header">
            <router-link to="/">
                <img src="../../assets/logo.jpg" alt="app logo">
            </router-link>

            <section>
                <!-- nav menu -->
                <div class="nav-menu">
                    <GuestHeaderNav />
                </div>

                <!-- toggle button -->
                <div class="side-menu-toggle" @click="toggleSidebarMenu">
                    <div :class="['sb-nav-toggle', sidebarState ? 'sb-is-active' : '']">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </section>
        </div>
    </n-layout-header>
    
    <!-- mobile sidebar menu -->
    <MobileSidebarMenu :nav-menu="openLayoutNavMenu" :has-footer="false" />
</template>

<style lang="scss" scoped>
    .n-layout-header {
        padding: 5px 10px 0;
        z-index: 1;
        background-color: $base-color;

        &>div.open-layout-header {
            display: flex;
            justify-content: space-between;
            align-items: center;

            // logo
            &>a> img {
                height: 25px;
            }

            &>section {
                display: flex;
                align-items: center;

                // nav menu
                &>div.nav-menu {
                    display: none;
                }

                // toggle button
                &>div.side-menu-toggle {

                    // sidebar toggle button
                    div.sb-nav-toggle{
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
        }
    }

    // small and tabs
    @media (min-width: 576px) and (max-width: 991.9px) {
        .n-layout-header {
            padding: 5px 20px 0;

            &>div.open-layout-header {
                display: flex;
                justify-content: space-between;
                align-items: center;

                // logo
                &>a> img {
                    width: 70px;
                    height: auto;
                }

                &>section {
                    display: flex;
                    column-gap: 70px;
                    align-items: center;

                    // nav menu
                    &>div.nav-menu {
                        display: block;
                    }


                    // toggle button
                    // &>div.side-menu-toggle {}
                }
            }
        }
    }

    // desktop
    @media (min-width: 992px) {
        .n-layout-header {
            padding: 5px 58px 0;

            &>div.open-layout-header {
                display: flex;
                justify-content: space-between;
                align-items: center;

                // logo
                &>a> img {
                    height: 60px;
                }

                &>section {
                    display: flex;
                    align-items: center;

                    // nav menu
                    &>div.nav-menu {
                        display: block;
                    }


                    // toggle button
                    &>div.side-menu-toggle {
                        display: none;
                    }
                }
            }
        }
    }

    // xl desktops
    @media (min-width: 1500px) {
        .n-layout-header {
            padding: 5px 200px 0;
        }
    }
</style>
