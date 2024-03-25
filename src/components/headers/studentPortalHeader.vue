<script setup lang="ts">
import { computed, onBeforeMount } from 'vue'
import { NLayoutHeader } from 'naive-ui'
import { useRoute } from 'vue-router'

import StudentPortalHeaderNav from '@/components/headers/nav/studentPortalHeaderNav.vue'
import UserDropdown from '@/components/headers/nav/userDropdown.vue'
import MobileSidebarMenu from '@/components/drawers/sidebarDrawerMenu.vue'

import { useMobileSidebarMenu } from '@/stores/common/mobileSidebarMenu'

import { openLayoutNavMenu } from '@/menu/nav/open-layout-nav-menu'
import greaterThanIcon from '@/assets/images/icons/greater-than.png'

const route: string | any = useRoute()
const currentRoute = computed(() => {
    if (route?.name === 'student application history') {
        return route.name
    } else {
        return null
    }
})

const mobileSidebarStore = useMobileSidebarMenu()

const { setSideMenuState } = mobileSidebarStore

onBeforeMount(() => setSideMenuState(false))
</script>

<template>
    <n-layout-header>
        <div class="open-layout-header">
            <div class="current-route-container">
                <router-link to="/student-portal">Home</router-link>
                <span v-if="currentRoute" class="current-route">
                    <img :src="greaterThanIcon" />
                    <span>{{ currentRoute }}</span>
                </span>
            </div>

            <section>
                <!-- nav menu -->
                <div class="nav-menu">
                    <StudentPortalHeaderNav />
                </div>

                <!-- user dropdown icon -->
                <div class="user-icon">
                    <UserDropdown />
                </div>
            </section>
        </div>
    </n-layout-header>
    
    <!-- mobile sidebar menu -->
    <MobileSidebarMenu :nav-menu="openLayoutNavMenu" :has-footer="false" />
</template>

<style lang="scss" scoped>
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

.n-layout-header {
    padding: 20px;
    z-index: 1;
    background-color: $base-color;

    &>div.open-layout-header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        &>div.current-route-container {
            display: flex;
            row-gap: 10px;
            align-items: center;

            &>a {
                text-decoration: none;
                font-size: 16px;
                font-weight: 600;
                color: #ffffff;
                transition: all 0.5s;

                &:hover {
                    text-decoration: underline;
                }
            }

            &>span.current-route {
                display: flex;
                column-gap: 3px;
                align-items: center;

                &>img {
                    height: 23px;
                }

                &>span {
                    text-transform: capitalize;
                    font-size: 16px;
                    font-weight: 700;
                    color: #ffffff;
                }
            }
        }

        &>section {
            display: flex;
            column-gap: 10px;
            align-items: center;

            // nav menu
            // &>div.nav-menu {}

            // user dropdown icon
            // &>div.user-icon {}
        }
    }
}

// XX-SM (<251px)
@media (max-width: 250.9px) {
    .n-layout-header {
        padding: 20px 10px;

        &>div.open-layout-header {
            &>div.current-route-container {
                flex-direction: column;
                justify-content: flex-start;
                align-items: flex-start;
                row-gap: 5px;

                &>a {
                    font-size: 16px;
                }

                &>span.current-route {
                    &>img {
                        display: none;
                        // height: 15px;
                    }
                    &>span {
                        font-size: 10.5px;
                        font-weight: unset;
                    }
                }
            }

            &>section {
                // nav menu
                &>div.nav-menu {
                    display: none;
                }
                
                // user dropdown icon
                &>div.user-icon {
                    display: unset;
                }
            }
        }
    }
}

// XX-SM
@media (min-width: 251px) and (max-width: 350.9px) {
    .n-layout-header {
        padding: 20px 10px;

        &>div.open-layout-header {
            &>div.current-route-container {
                flex-direction: column;
                justify-content: flex-start;
                align-items: flex-start;
                row-gap: 5px;

                &>a {
                    font-size: 16px;
                }

                &>span.current-route {
                    &>img {
                        display: none;
                        // height: 15px;
                    }
                    &>span {
                        font-size: 10.5px;
                        font-weight: unset;
                    }
                }
            }

            &>section {
                // nav menu
                &>div.nav-menu {
                    display: none;
                }

                // user dropdown icon
                &>div.user-icon {
                    display: unset;
                }
            }
        }
    }
}

// X-SM
@media (min-width: 351px) and (max-width: 575.9px) {
    .n-layout-header {
        padding: 20px;

        &>div.open-layout-header {
            &>div.current-route-container {
                flex-direction: column;
                justify-content: flex-start;
                align-items: flex-start;
                row-gap: 5px;

                &>a {
                    font-size: 20px;
                }

                &>span.current-route {
                    &>img {
                        display: none;
                        // height: 15px;
                    }
                    &>span {
                        font-size: 13px;
                        font-weight: unset;
                    }
                }
            }

            &>section {
                // nav menu
                &>div.nav-menu {
                    display: none;
                }

                // user dropdown icon
                &>div.user-icon {
                    display: unset;
                }
            }
        }
    }
}

// SM
@media (min-width: 576px) and (max-width: 767.9px) {
    .n-layout-header {
        padding: 20px;

        &>div.open-layout-header {
            &>div.current-route-container {
                &>span.current-route {
                    &>img {
                        height: 17px;
                    }
                }
            }

            &>section {
                // nav menu
                &>div.nav-menu {
                    display: none;
                }

                // user dropdown icon
                &>div.user-icon {
                    display: unset;
                }
            }
        }
    }
}

// MD
@media (min-width: 768px) and (max-width: 991.9px) {
    .n-layout-header {
        padding: 20px;

        &>div.open-layout-header {
            display: flex;
            justify-content: space-between;
            align-items: center;

            &>section {
                // nav menu
                &>div.nav-menu {
                    display: block;
                }
            }
        }
    }
}

// desktop
@media (min-width: 992px) {
    .n-layout-header {
        padding: 20px 58px;

        &>div.open-layout-header {
            display: flex;
            justify-content: space-between;
            align-items: center;

            &>section {
                display: flex;
                align-items: center;

                // nav menu
                &>div.nav-menu {
                    display: block;
                }
            }
        }
    }
}

// xl desktops
@media (min-width: 1500px) {
    .n-layout-header {
        padding: 26px 200px;
    }
}
</style>
